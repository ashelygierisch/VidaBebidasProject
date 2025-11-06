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
      .find({}, "	Date_Time__c,Name,Guess_Count__c, Client__c, Package__c, Status__c,	Total_Cost__c, Client__r.Name, Client__r.Event_Address__c, Client__r.Email__c, Client__r.Phone__c, Client__r.Company__c ");

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
    const { email, Date_Time__c, Name, Guess_Count__c, Package__c, Status__c, Message__c, Total_Cost__c, Event_Address__c, Phone__c, Event_Name__c} = body;
    
    // Debug: Log the Event_Name__c value to verify it's being received
    console.log("Received Event_Name__c:", Event_Name__c);
    console.log("Full request body:", JSON.stringify(body, null, 2));

    // Step 2: Connect to Salesforce
    console.log("Attempting to connect to Salesforce...");
    await conn.login(USERNAME, PASSWORD);
    console.log("Successfully connected to Salesforce!");

    // Step 3: Check if an Event already exists at the same Date/Time
    // This prevents double-booking at the same time slot
    console.log("Checking for existing events at the same date/time...");
    // Use raw SOQL query for dateTime field to ensure proper formatting
    // Convert the string to ISO 8601 format with timezone for Salesforce
    // Note: Salesforce dateTime values should NOT be enclosed in quotes in SOQL
    const dateTimeValue = new Date(Date_Time__c).toISOString();
    const soql = `SELECT Id, Date_Time__c, Name FROM Event__c WHERE Date_Time__c = ${dateTimeValue}`;
    const queryResult = await conn.query(soql);
    const existingEvents = queryResult.records;

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
          Phone__c: Phone__c
        });
      
      console.log("New client created:", newClient);
      clientId = newClient.id;
    }

    // Step 6: Get the package price and ID from Salesforce
    // Query the Package__c object to get the price and ID based on the package name
    console.log("Fetching package details for:", Package__c);
    let totalCost = 0;
    let packageId = null;
    
    // The frontend sends names like "SilverPackage", "ReposadoPackage", "AñejoPackage"
    // Salesforce might have "Silver Package", "Reposado Package", "Añejo Package" (with spaces)
    // Try multiple name variations to find the package
    try {
      // First, try exact match
      let packageRecord = await conn
        .sobject("Package__c")
        .find({ Name: Package__c }, "Id, Name, Currency__c")
        .limit(1);
      
      // If not found, try with space before "Package" (e.g., "SilverPackage" -> "Silver Package")
      if (!packageRecord || packageRecord.length === 0) {
        const nameWithSpace = Package__c.replace(/Package$/, ' Package');
        packageRecord = await conn
          .sobject("Package__c")
          .find({ Name: nameWithSpace }, "Id, Name, Currency__c")
          .limit(1);
      }
      
      // If still not found, try with space between camelCase words (e.g., "ReposadoPackage" -> "Reposado Package")
      if (!packageRecord || packageRecord.length === 0) {
        const nameWithSpace = Package__c.replace(/([a-z])([A-Z])/g, '$1 $2');
        packageRecord = await conn
          .sobject("Package__c")
          .find({ Name: nameWithSpace }, "Id, Name, Currency__c")
          .limit(1);
      }
      
      // If still not found, try case-insensitive search using SOQL
      if (!packageRecord || packageRecord.length === 0) {
        const soql = `SELECT Id, Name, Currency__c FROM Package__c WHERE Name LIKE '%${Package__c.replace(/Package$/, '')}%' LIMIT 1`;
        const queryResult = await conn.query(soql);
        if (queryResult.records && queryResult.records.length > 0) {
          packageRecord = queryResult.records;
        }
      }
      
      if (packageRecord && packageRecord.length > 0) {
        packageId = packageRecord[0].Id;
        totalCost = packageRecord[0].Currency__c || 0;
        console.log("Found package:", packageRecord[0].Name, "ID:", packageId, "Price:", totalCost);
      } else {
        // Fallback: If Package__c is already an ID, try querying by ID
        try {
          const packageById = await conn
            .sobject("Package__c")
            .retrieve(Package__c, "Id, Name, Currency__c");
          
          if (packageById) {
            packageId = packageById.Id;
            totalCost = packageById.Currency__c || 0;
            console.log("Found package by ID:", packageById.Name, "Price:", totalCost);
          } else {
            console.warn("Package not found, using default price of 0");
          }
        } catch (idError) {
          console.warn("Package not found by name or ID, using default price of 0");
        }
      }
    } catch (packageError) {
      console.error("Error fetching package details:", packageError);
      // Continue with default values if package lookup fails
    }

    // Step 7: Validate that we found a package
    if (!packageId) {
      console.error("Package not found for:", Package__c);
      return Response.json(
        {
          error: "Invalid package selected. Please choose a valid package.",
          details: `Package "${Package__c}" was not found in the system.`
        },
        { status: 400 }
      );
    }

    // Step 8: Create the Event record with the Client reference
    // Status__c is set to "Submitted" by default
    // Note: Total_Cost__c is likely a formula/read-only field that calculates automatically
    // from the Package relationship, so we don't set it manually
    console.log("Creating new event with client ID:", clientId, "and package ID:", packageId);
    console.log("Package price found:", totalCost, "(Total_Cost__c will be calculated automatically)");
    console.log("Event_Name__c value being saved:", Event_Name__c);
    
    const eventData = {
      Date_Time__c: Date_Time__c,
      Event_Name__c: Event_Name__c,
      Guess_Count__c: Guess_Count__c,
      Client__c: clientId, // Link to the client (existing or new)
      Package__c: packageId, // Use the Package ID (lookup field requires ID, not name)
      Status__c: "Submitted", // Default status when event is created
      Message__c: Message__c
      // Total_Cost__c is not set here - it's likely a formula field that calculates automatically
    };
    
    console.log("Event data being sent to Salesforce:", JSON.stringify(eventData, null, 2));
    const newEvent = await conn
      .sobject("Event__c")
      .create(eventData);

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