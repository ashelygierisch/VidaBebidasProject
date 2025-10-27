// Test different password combinations
require('dotenv').config();
const jsforce = require('jsforce');

async function testPasswordCombinations() {
  console.log('🧪 Testing Different Password Combinations...\n');

  const SF_LOGIN_URL = process.env.SF_LOGIN_URL || 'https://login.salesforce.com';
  const USERNAME = process.env.SF_USERNAME;

  // Test different password combinations
  const combinations = [
    {
      name: 'Password only',
      password: process.env.SF_PASSWORD
    },
    {
      name: 'Password + Client Secret',
      password: process.env.SF_PASSWORD + process.env.SF_CLIENT_SECRET
    },
    {
      name: 'Password + Client Secret (first 24 chars)',
      password: process.env.SF_PASSWORD + process.env.SF_CLIENT_SECRET.substring(0, 24)
    }
  ];

  for (const combo of combinations) {
    console.log(`\n🔍 Testing: ${combo.name}`);
    console.log(`Password length: ${combo.password.length}`);
    
    try {
      const conn = new jsforce.Connection({
        loginUrl: SF_LOGIN_URL,
      });

      await conn.login(USERNAME, combo.password);
      console.log('✅ SUCCESS! This combination works!');
      console.log(`👤 User ID: ${conn.userInfo.id}`);
      console.log(`🏢 Organization ID: ${conn.userInfo.organizationId}`);
      
      // Test the events query
      console.log('📅 Testing Events query...');
      const events = await conn
        .sobject("Event__c")
        .find({}, "Id, Name__c, Guess_Count__c, Package__c, Status__c, Total_Cost__c");
      
      console.log(`✅ Found ${events.length} events`);
      return; // Exit on first success
      
    } catch (error) {
      console.log(`❌ Failed: ${error.message}`);
    }
  }
  
  console.log('\n💡 Recommendations:');
  console.log('1. Check if SF_CLIENT_SECRET is actually your security token');
  console.log('2. Verify your Salesforce username is correct');
  console.log('3. Check if your IP is whitelisted in Salesforce');
  console.log('4. Try resetting your security token in Salesforce');
}

testPasswordCombinations()
  .then(() => {
    console.log('\n✨ Test completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Unexpected error:', error);
    process.exit(1);
  });
