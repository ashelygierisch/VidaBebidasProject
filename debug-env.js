// Debug script to check environment variables (without exposing sensitive data)
require('dotenv').config();

console.log('🔍 Environment Variables Debug:');
console.log(`SF_LOGIN_URL: ${process.env.SF_LOGIN_URL || 'Not set'}`);
console.log(`SF_USERNAME: ${process.env.SF_USERNAME ? 'Set (length: ' + process.env.SF_USERNAME.length + ')' : 'Not set'}`);
console.log(`SF_PASSWORD: ${process.env.SF_PASSWORD ? 'Set (length: ' + process.env.SF_PASSWORD.length + ')' : 'Not set'}`);
console.log(`SF_CLIENT_SECRET: ${process.env.SF_CLIENT_SECRET ? 'Set (length: ' + process.env.SF_CLIENT_SECRET.length + ')' : 'Not set'}`);

// Check if password contains security token (usually 24 characters)
if (process.env.SF_PASSWORD) {
  const passwordLength = process.env.SF_PASSWORD.length;
  console.log(`\n📊 Password Analysis:`);
  console.log(`Password length: ${passwordLength} characters`);
  
  if (passwordLength > 20) {
    console.log('⚠️  Password seems long - might already include security token');
  } else {
    console.log('ℹ️  Password seems short - might need security token appended');
  }
}

// Test the concatenation
if (process.env.SF_PASSWORD && process.env.SF_CLIENT_SECRET) {
  const fullPassword = process.env.SF_PASSWORD + process.env.SF_CLIENT_SECRET;
  console.log(`\n🔗 Full Password Length: ${fullPassword.length} characters`);
}
