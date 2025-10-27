// OAuth2 Salesforce connection test
require('dotenv').config();
const jsforce = require('jsforce');

async function testOAuth2() {
  console.log('🔐 Testing OAuth2 Connection...\n');

  const SF_LOGIN_URL = process.env.SF_LOGIN_URL || 'https://login.salesforce.com';
  const USERNAME = process.env.SF_USERNAME;
  const PASSWORD = process.env.SF_PASSWORD;
  const CLIENT_ID = process.env.SF_CLIENT_ID; // You might need this
  const CLIENT_SECRET = process.env.SF_CLIENT_SECRET;

  console.log(`Username: ${USERNAME}`);
  console.log(`Client Secret Length: ${CLIENT_SECRET ? CLIENT_SECRET.length : 'Not set'}`);
  console.log(`Client ID: ${CLIENT_ID ? 'Set' : 'Not set'}\n`);

  try {
    // Try OAuth2 Username-Password flow
    console.log('🔄 Attempting OAuth2 Username-Password flow...');
    
    const conn = new jsforce.Connection({
      oauth2: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        redirectUri: 'http://localhost:3000/callback'
      },
      loginUrl: SF_LOGIN_URL
    });

    // This requires a security token appended to password
    const userInfo = await conn.login(USERNAME, PASSWORD);
    console.log('✅ OAuth2 Success!');
    console.log(`👤 User ID: ${userInfo.id}`);
    console.log(`🏢 Organization ID: ${userInfo.organizationId}`);
    
    return true;
    
  } catch (error) {
    console.log(`❌ OAuth2 Failed: ${error.message}`);
    
    if (error.errorCode === 'INVALID_CLIENT_ID') {
      console.log('💡 You need to set SF_CLIENT_ID in your .env file');
    }
    
    return false;
  }
}

async function testUsernamePasswordWithSecurityToken() {
  console.log('\n🔑 Testing Username-Password with Security Token...\n');
  
  const SF_LOGIN_URL = process.env.SF_LOGIN_URL || 'https://login.salesforce.com';
  const USERNAME = process.env.SF_USERNAME;
  const PASSWORD = process.env.SF_PASSWORD;
  
  console.log('📋 To test this, you need to:');
  console.log('1. Log into Salesforce web interface');
  console.log('2. Go to Setup → My Personal Information → Reset My Security Token');
  console.log('3. Get the 24-character security token from your email');
  console.log('4. Update your .env file:');
  console.log('   SF_PASSWORD=your_password');
  console.log('   SF_SECURITY_TOKEN=your_24_char_token');
  console.log('5. Then run: node test-salesforce-connection.js');
}

async function main() {
  const oauth2Success = await testOAuth2();
  
  if (!oauth2Success) {
    await testUsernamePasswordWithSecurityToken();
  }
}

main()
  .then(() => {
    console.log('\n✨ OAuth2 test completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Unexpected error:', error);
    process.exit(1);
  });
