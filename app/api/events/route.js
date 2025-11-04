import jsforce from "jsforce";

const SF_LOGIN_URL = process.env.SF_LOGIN_URL || 'https://login.salesforce.com';

const conn = new jsforce.Connection({
  loginUrl: SF_LOGIN_URL,
});

const USERNAME = process.env.SF_USERNAME;
const PASSWORD = process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN;

export async function GET(req) {
  try {
    console.log("Attempting to connect to Salesforce...");
    await conn.login(USERNAME, PASSWORD);
    console.log("Successfully connected to Salesforce!");

    console.log("Fetching events from Salesforce...");
    
    const events = await conn
      .sobject("Event__c")
      .find({}, "	Date_Time__c,Name,Guess_Count__c, Client__c, Package__c, Status__c,	Total_Cost__c, Client__r.Name, Client__r.Event_Address__c, CLient___r.email_c, Client__r.Phone_c, Client__r.Company_c ");

    console.log("Events fetched and client details:", events);
    return Response.json(events);

  } catch (error) {
    console.error("Error connecting to Salesforce or fetching events:", error);
    return Response.json({ 
      error: "Unable to fetch Events", 
      details: error.message 
    }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    // Step 1: Parse the incoming request body to extract the data
    // In Next.js App Router, req.body is a stream, so we need to parse it as JSON
    const body = await req.json();
    const { email, Date_Time__c, Name, Guess_Count__c, Package__c, Status__c, Message__c, Total_Cost__c, Event_Address__c, Phone__c, Company__c } = body;

    // Step 2: Connect to Salesforce
    console.log("Attempting to connect to Salesforce...");
    await conn.login(USERNAME, PASSWORD);
    console.log("Successfully connected to Salesforce!");

    // Step 3: Check if an Event already exists at the same Date/Time
    // This prevents double-booking at the same time slot
    console.log("Checking for existing events at the same date/time...");
    const existingEvents = await conn
      .sobject("Event__c")
      .find({ Date_Time__c: Date_Time__c }, "Id, Date_Time__c, Name");

    if (existingEvents && existingEvents.length > 0) {
      console.log("Event already exists at this date/time:", existingEvents);
      return Response.json(
        {
          error: "This time slot is already booked. Please choose another date/time.",
          conflict: "date_time"
        },
        { status: 409 }
      );
    }

    // Step 4: Check if a Client with this email already exists
    // We'll query the Client__c object to see if this email is already in the system
    console.log("Checking for existing client with email:", email);
    const existingClients = await conn
      .sobject("Client__c")
      .find({ Email__c: email }, "Id, Name, Email__c");

    let clientId;

    if (existingClients && existingClients.length > 0) {
      // Step 5a: Client exists - use the existing client ID
      console.log("Found existing client:", existingClients[0]);
      clientId = existingClients[0].Id;
    } else {
      // Step 5b: Client doesn't exist - create a new client record first
      console.log("Creating new client record...");
      const newClient = await conn
        .sobject("Client__c")
        .create({
          Name: Name,
          Email__c: email,
          Event_Address__c: Event_Address__c,
          Phone__c: Phone__c,
          Company__c: Company__c
        });
      
      console.log("New client created:", newClient);
      clientId = newClient.id;
    }

    // Step 6: Get the package price from Salesforce
    // Query the Package__c object to get the price based on the package name/ID
    console.log("Fetching package price for:", Package__c);
    let totalCost = 0;
    
    // If Package__c is a lookup field (ID), query by ID
    // If Package__c is a text field (name), query by name
    // Adjust the field name based on your Salesforce schema (e.g., Price__c, Amount__c, etc.)
    try {
      const packageRecord = await conn
        .sobject("Package__c")
        .find({ Name: Package__c }, "Id, Name, Price__c")
        .limit(1);
      
      if (packageRecord && packageRecord.length > 0) {
        totalCost = packageRecord[0].Price__c || 0;
        console.log("Found package price:", totalCost);
      } else {
        // Fallback: If Package__c is already an ID, try querying by ID
        const packageById = await conn
          .sobject("Package__c")
          .retrieve(Package__c, "Id, Name, Price__c");
        
        if (packageById) {
          totalCost = packageById.Price__c || 0;
          console.log("Found package price by ID:", totalCost);
        } else {
          console.warn("Package not found, using default price of 0");
        }
      }
    } catch (packageError) {
      console.error("Error fetching package price:", packageError);
      // Continue with default price of 0 if package lookup fails
    }

    // Step 7: Create the Event record with the Client reference
    // Status__c is set to "Submitted" by default
    // Total_Cost__c is set from the package price we just fetched
    console.log("Creating new event with client ID:", clientId);
    const newEvent = await conn
      .sobject("Event__c")
      .create({
        Date_Time__c: Date_Time__c,
        Name: Name,
        Guess_Count__c: Guess_Count__c,
        Client__c: clientId, // Link to the client (existing or new)
        Package__c: Package__c,
        Status__c: "Submitted", // Default status when event is created
        Total_Cost__c: totalCost, // Set from package price
        Message__c: Message__c
      });

    console.log("New event created successfully:", newEvent);
    return Response.json({
      success: true,
      event: newEvent,
      clientId: clientId,
      message: "Event created successfully"
    });

  } catch (error) {
    console.error("Error connecting to Salesforce or creating event:", error);
    return Response.json(
      {
        error: "Unable to create Event",
        details: error.message
      },
      { status: 500 }
    );
  }
}