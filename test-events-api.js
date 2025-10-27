// Test script for the events API endpoint
const https = require('https');
const http = require('http');

async function testEventsAPI() {
  console.log('🚀 Testing Events API Endpoint...\n');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const apiUrl = `${baseUrl}/api/events`;

  console.log(`📡 Testing endpoint: ${apiUrl}\n`);

  try {
    console.log('📤 Sending GET request...');
    
    const response = await new Promise((resolve, reject) => {
      const url = new URL(apiUrl);
      const options = {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: url.pathname + url.search,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const client = url.protocol === 'https:' ? https : http;
      const req = client.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            statusText: res.statusMessage,
            ok: res.statusCode >= 200 && res.statusCode < 300,
            text: () => Promise.resolve(data)
          });
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.end();
    });

    console.log(`📊 Response Status: ${response.status} ${response.statusText}`);

    const responseText = await response.text();
    console.log('📄 Response Body:');
    
    try {
      const jsonData = JSON.parse(responseText);
      console.log(JSON.stringify(jsonData, null, 2));
      
      if (response.ok) {
        console.log('\n✅ API test successful!');
        if (Array.isArray(jsonData)) {
          console.log(`📅 Found ${jsonData.length} events`);
        }
      } else {
        console.log('\n❌ API test failed!');
      }
    } catch (parseError) {
      console.log('Raw response (not JSON):');
      console.log(responseText);
    }

  } catch (error) {
    console.error('❌ Error testing API endpoint:');
    console.error('Error type:', error.name);
    console.error('Error message:', error.message);
    
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure your Next.js development server is running (npm run dev)');
    console.log('2. Check if the API route file exists at app/api/events/route.js');
    console.log('3. Verify your environment variables are set correctly');
    console.log('4. Check the server console for any error messages');
  }
}

// Run the test
testEventsAPI()
  .then(() => {
    console.log('\n✨ API test completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Unexpected error:', error);
    process.exit(1);
  });
