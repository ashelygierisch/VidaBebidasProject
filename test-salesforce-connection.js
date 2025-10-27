const jsforce = require('jsforce');
require('dotenv').config();

// Test script to verify JSForce connection and events query
async function testSalesforceConnection() {
  console.log('🚀 Starting Salesforce Connection Test...\n');

  // Check environment variables
  console.log('📋 Checking environment variables:');
  console.log(`SF_LOGIN_URL: ${process.env.SF_LOGIN_URL || 'https://login.salesforce.com'}`);
  console.log(`SF_USERNAME: ${process.env.SF_USERNAME ? '✅ Set' : '❌ Missing'}`);
  console.log(`SF_PASSWORD: ${process.env.SF_PASSWORD ? '✅ Set' : '❌ Missing'}`);
  console.log(`SF_SECURITY_TOKEN: ${process.env.SF_SECURITY_TOKEN ? '✅ Set' : '❌ Missing'}\n`);

  if (!process.env.SF_USERNAME || !process.env.SF_PASSWORD || !process.env.SF_SECURITY_TOKEN) {
    console.error('❌ Missing required environment variables!');
    console.log('Please set the following in your .env file:');
    console.log('- SF_USERNAME');
    console.log('- SF_PASSWORD');
    console.log('- SF_SECURITY_TOKEN');
    return;
  }

  const SF_LOGIN_URL = process.env.SF_LOGIN_URL || 'https://login.salesforce.com';
  const conn = new jsforce.Connection({
    loginUrl: SF_LOGIN_URL,
  });

  const USERNAME = process.env.SF_USERNAME;
  const PASSWORD = process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN;

  try {
    // Test connection
    console.log('🔐 Attempting to connect to Salesforce...');
    const userInfo = await conn.login(USERNAME, PASSWORD);
    console.log('✅ Successfully connected to Salesforce!');
    console.log(`👤 User ID: ${userInfo.id}`);
    console.log(`🏢 Organization ID: ${userInfo.organizationId}\n`);

    // Test events query
    console.log('📅 Testing Events query...');
    const events = await conn
      .sobject("Event__c")
      .find({}, "Id, Date_Time__c, Name, Guess_Count__c, Client__c, Package__c, Status__c, Total_Cost__c");

    console.log(`✅ Successfully fetched ${events.length} events`);
    
    if (events.length > 0) {
      console.log('\n📊 Sample event data:');
      console.log(JSON.stringify(events[0], null, 2));
    } else {
      console.log('ℹ️  No events found in the system');
    }

    // Test connection status
    console.log('\n🔍 Connection details:');
    console.log(`Instance URL: ${conn.instanceUrl}`);
    console.log(`Access Token: ${conn.accessToken ? '✅ Present' : '❌ Missing'}`);
    console.log(`Session ID: ${conn.sessionId ? '✅ Present' : '❌ Missing'}`);

  } catch (error) {
    console.error('❌ Error during Salesforce connection test:');
    console.error('Error type:', error.name);
    console.error('Error message:', error.message);
    
    if (error.errorCode) {
      console.error('Salesforce Error Code:', error.errorCode);
    }
    
    console.error('\n🔧 Troubleshooting tips:');
    console.error('1. Verify your Salesforce credentials are correct');
    console.error('2. Check if your IP is whitelisted in Salesforce');
    console.error('3. Ensure the Event__c custom object exists');
    console.error('4. Verify field names are correct (Name__c, Guess_Count__c, etc.)');
  }
}

// Run the test
testSalesforceConnection()
  .then(() => {
    console.log('\n✨ Test completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Unexpected error:', error);
    process.exit(1);
  });
