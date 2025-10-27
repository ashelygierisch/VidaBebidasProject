// Script to discover the correct field names for Event__c object
require('dotenv').config();
const jsforce = require('jsforce');

async function discoverEventFields() {
  console.log('🔍 Discovering Event__c Field Names...\n');

  const SF_LOGIN_URL = process.env.SF_LOGIN_URL || 'https://login.salesforce.com';
  const conn = new jsforce.Connection({
    loginUrl: SF_LOGIN_URL,
  });

  const USERNAME = process.env.SF_USERNAME;
  const PASSWORD = process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN;

  try {
    console.log('🔐 Connecting to Salesforce...');
    await conn.login(USERNAME, PASSWORD);
    console.log('✅ Connected successfully!\n');

    console.log('📋 Describing Event__c object...');
    const describe = await conn.sobject('Event__c').describe();
    
    console.log(`📊 Event__c Object Info:`);
    console.log(`   Label: ${describe.label}`);
    console.log(`   Name: ${describe.name}`);
    console.log(`   Total Fields: ${describe.fields.length}\n`);

    console.log('🏷️  Available Fields:');
    describe.fields.forEach((field, index) => {
      console.log(`   ${index + 1}. ${field.name} (${field.type}) - ${field.label}`);
    });

    console.log('\n💡 Suggested Query Fields:');
    const suggestedFields = describe.fields
      .filter(field => 
        field.name.includes('Name') || 
        field.name.includes('Count') || 
        field.name.includes('Package') || 
        field.name.includes('Status') || 
        field.name.includes('Cost') ||
        field.name === 'Id'
      )
      .map(field => field.name);

    console.log('   Suggested fields for your query:');
    suggestedFields.forEach(field => {
      console.log(`   - ${field}`);
    });

    console.log('\n📝 Updated Query:');
    console.log(`   const events = await conn.sobject("Event__c").find({}, "${suggestedFields.join(', ')}");`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

discoverEventFields()
  .then(() => {
    console.log('\n✨ Field discovery completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Unexpected error:', error);
    process.exit(1);
  });
