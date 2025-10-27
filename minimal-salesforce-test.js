// Minimal Salesforce connection test
require('dotenv').config();
const jsforce = require('jsforce');

async function minimalTest() {
  console.log('🔬 Minimal Salesforce Connection Test\n');

  // Test with different login URLs
  const loginUrls = [
    'https://login.salesforce.com',
    'https://test.salesforce.com',
    'https://login.salesforce.com/services/oauth2/token'
  ];

  const USERNAME = process.env.SF_USERNAME;
  const PASSWORD = process.env.SF_PASSWORD;
  const SECURITY_TOKEN = process.env.SF_CLIENT_SECRET; // Assuming this is your security token

  console.log(`Testing with username: ${USERNAME}`);
  console.log(`Password length: ${PASSWORD.length}`);
  console.log(`Security token length: ${SECURITY_TOKEN.length}\n`);

  for (const loginUrl of loginUrls) {
    console.log(`🌐 Testing login URL: ${loginUrl}`);
    
    try {
      const conn = new jsforce.Connection({
        loginUrl: loginUrl,
      });

      // Try with password + security token
      const fullPassword = PASSWORD + SECURITY_TOKEN;
      console.log(`🔑 Using password + security token (${fullPassword.length} chars)`);
      
      const userInfo = await conn.login(USERNAME, fullPassword);
      console.log('✅ SUCCESS!');
      console.log(`👤 User ID: ${userInfo.id}`);
      console.log(`🏢 Organization ID: ${userInfo.organizationId}`);
      console.log(`🌐 Instance URL: ${conn.instanceUrl}`);
      
      return; // Exit on success
      
    } catch (error) {
      console.log(`❌ Failed: ${error.message}`);
      if (error.errorCode) {
        console.log(`   Error Code: ${error.errorCode}`);
      }
    }
    console.log(''); // Empty line for readability
  }

  console.log('💡 Next steps:');
  console.log('1. Verify your Salesforce username and password');
  console.log('2. Check if SF_CLIENT_SECRET is actually your security token');
  console.log('3. Try logging into Salesforce web interface to verify credentials');
  console.log('4. Check if your IP is whitelisted in Salesforce');
  console.log('5. Consider using OAuth2 flow instead of username/password');
}

minimalTest()
  .then(() => {
    console.log('\n✨ Minimal test completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Unexpected error:', error);
    process.exit(1);
  });
