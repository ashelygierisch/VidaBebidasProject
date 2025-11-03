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