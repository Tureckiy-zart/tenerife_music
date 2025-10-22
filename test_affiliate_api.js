// Simple test script for affiliate API endpoints
const BASE_URL = 'http://localhost:3000';

async function testAffiliateAPI() {
  console.log('🧪 Testing Affiliate API Integration...\n');

  try {
    // Test 1: GET /api/affiliates
    console.log('1. Testing GET /api/affiliates...');
    const eventsResponse = await fetch(`${BASE_URL}/api/affiliates`);
    const eventsData = await eventsResponse.json();
    
    if (eventsData.success) {
      console.log(`✅ Events fetched successfully: ${eventsData.data.length} events`);
      console.log(`   Pagination: ${eventsData.pagination.total} total events`);
    } else {
      console.log(`❌ Failed to fetch events: ${eventsData.error}`);
    }

    // Test 2: POST /api/affiliates/track
    console.log('\n2. Testing POST /api/affiliates/track...');
    const trackResponse = await fetch(`${BASE_URL}/api/affiliates/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_id: 'test_event_123',
        affiliate_code: 'tenerife_music'
      })
    });
    const trackData = await trackResponse.json();
    
    if (trackData.success) {
      console.log('✅ Click tracking successful');
    } else {
      console.log(`❌ Click tracking failed: ${trackData.error}`);
    }

    // Test 3: GET /api/affiliates/refresh
    console.log('\n3. Testing GET /api/affiliates/refresh...');
    const statusResponse = await fetch(`${BASE_URL}/api/affiliates/refresh`);
    const statusData = await statusResponse.json();
    
    if (statusData.success) {
      console.log('✅ Refresh status endpoint working');
      console.log(`   Next scheduled refresh: ${statusData.nextScheduledRefresh}`);
    } else {
      console.log(`❌ Refresh status failed: ${statusData.error}`);
    }

    // Test 4: Test affiliate code appending
    console.log('\n4. Testing affiliate code appending...');
    if (eventsData.data && eventsData.data.length > 0) {
      const firstEvent = eventsData.data[0];
      if (firstEvent.ticket_url && firstEvent.ticket_url.includes('aff=tenerife_music')) {
        console.log('✅ Affiliate codes properly appended to ticket URLs');
      } else {
        console.log('❌ Affiliate codes not found in ticket URLs');
      }
    }

    console.log('\n🎉 All tests completed!');

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
}

// Run the test
testAffiliateAPI();
