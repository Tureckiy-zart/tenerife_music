import { NextRequest, NextResponse } from 'next/server';
import { runAffiliateRefresh } from '../../../../lib/jobs/refresh_affiliates';

// POST /api/affiliates/refresh - Manually trigger affiliate data refresh
export async function POST(request: NextRequest) {
  try {
    // In production, you might want to add authentication/authorization here
    // const authHeader = request.headers.get('authorization');
    // if (!authHeader || !isValidAuth(authHeader)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    console.log('Manual affiliate refresh triggered');
    
    // Run the refresh job
    await runAffiliateRefresh();

    return NextResponse.json({
      success: true,
      message: 'Affiliate data refresh completed successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Affiliate refresh error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to refresh affiliate data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET /api/affiliates/refresh - Get refresh status (for monitoring)
export async function GET(request: NextRequest) {
  try {
    // In a real implementation, you might want to check the last refresh time
    // from a database or cache
    
    return NextResponse.json({
      success: true,
      message: 'Affiliate refresh endpoint is available',
      lastRefresh: 'Not implemented yet', // Would come from database
      nextScheduledRefresh: 'Daily at 3:00 AM UTC', // Would come from cron config
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Affiliate refresh status error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get refresh status'
      },
      { status: 500 }
    );
  }
}
