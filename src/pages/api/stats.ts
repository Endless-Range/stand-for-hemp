/**
 * Stats API
 * Returns current action statistics
 * GET /api/stats
 */

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals, url }) => {
  try {
    // Access D1 database from Cloudflare Pages runtime
    const db = (locals.runtime?.env as any)?.DB;

    if (!db) {
      console.error('D1 database not available. Make sure D1 binding is configured in wrangler.toml');
      return new Response(
        JSON.stringify({ error: 'Database not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get overall stats
    const overallStats = await db
      .prepare(
        `SELECT
          COUNT(*) as total_actions,
          SUM(CASE WHEN action_type = 'email' THEN 1 ELSE 0 END) as total_emails,
          SUM(CASE WHEN action_type = 'call' THEN 1 ELSE 0 END) as total_calls,
          COUNT(DISTINCT state) as states_represented,
          COUNT(DISTINCT ip_hash) as unique_users
         FROM actions`
      )
      .first();

    // Get state breakdown
    const stateBreakdown = await db
      .prepare(
        `SELECT
          state,
          COUNT(*) as actions,
          SUM(CASE WHEN action_type = 'email' THEN 1 ELSE 0 END) as emails,
          SUM(CASE WHEN action_type = 'call' THEN 1 ELSE 0 END) as calls
         FROM actions
         WHERE state IS NOT NULL
         GROUP BY state
         ORDER BY actions DESC`
      )
      .all();

    // Get recent activity (last 24 hours)
    const oneDayAgo = Math.floor(Date.now() / 1000) - (24 * 60 * 60);
    const recentStats = await db
      .prepare(
        `SELECT COUNT(*) as actions_24h
         FROM actions
         WHERE created_at >= ?`
      )
      .bind(oneDayAgo)
      .first();

    // Get hourly activity for the last 7 days (for charts)
    const sevenDaysAgo = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60);
    const hourlyActivity = await db
      .prepare(
        `SELECT
          strftime('%Y-%m-%d %H:00:00', datetime(created_at, 'unixepoch')) as hour,
          COUNT(*) as actions
         FROM actions
         WHERE created_at >= ?
         GROUP BY hour
         ORDER BY hour DESC
         LIMIT 168`
      )
      .bind(sevenDaysAgo)
      .all();

    return new Response(
      JSON.stringify({
        success: true,
        stats: {
          overall: overallStats,
          recent: recentStats,
          by_state: stateBreakdown.results,
          hourly: hourlyActivity.results
        },
        updated_at: new Date().toISOString()
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60' // Cache for 1 minute
        }
      }
    );

  } catch (error) {
    console.error('Error fetching stats:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
