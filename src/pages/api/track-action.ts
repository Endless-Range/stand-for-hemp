/**
 * Track Action API
 * Records when a user confirms they contacted their legislators
 * POST /api/track-action
 */

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { action_type, zip_code, state } = body;

    // Validate required fields
    if (!action_type || !['email', 'call'].includes(action_type)) {
      return new Response(
        JSON.stringify({ error: 'Invalid action_type. Must be "email" or "call"' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get user info for deduplication
    const userAgent = request.headers.get('user-agent') || '';
    const cfConnectingIP = request.headers.get('cf-connecting-ip');

    // Hash IP for privacy (simple hash, not cryptographic)
    const ipHash = cfConnectingIP ? await simpleHash(cfConnectingIP) : null;

    // Access D1 database from Cloudflare Pages runtime
    // In Cloudflare Pages with Astro, the D1 binding is accessed via locals.runtime.env
    const db = (locals.runtime?.env as any)?.DB;

    if (!db) {
      console.error('D1 database not available. Make sure D1 binding is configured in wrangler.toml');
      return new Response(
        JSON.stringify({ error: 'Database not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Insert action record
    const result = await db
      .prepare(
        `INSERT INTO actions (action_type, zip_code, state, user_agent, ip_hash)
         VALUES (?, ?, ?, ?, ?)`
      )
      .bind(action_type, zip_code || null, state || null, userAgent, ipHash)
      .run();

    // Get updated stats
    const stats = await db
      .prepare(
        `SELECT
          COUNT(*) as total,
          SUM(CASE WHEN action_type = 'email' THEN 1 ELSE 0 END) as emails,
          SUM(CASE WHEN action_type = 'call' THEN 1 ELSE 0 END) as calls,
          COUNT(DISTINCT state) as states_represented
         FROM actions`
      )
      .first();

    return new Response(
      JSON.stringify({
        success: true,
        action_id: result.meta.last_row_id,
        stats
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error tracking action:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// Simple hash function for IP addresses (not cryptographically secure, just for deduplication)
async function simpleHash(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex.substring(0, 16); // First 16 chars is enough for deduplication
}
