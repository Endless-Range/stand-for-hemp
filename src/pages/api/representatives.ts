/**
 * Who Is My Representative API - Representative Lookup
 * Fetches representatives (House + Senators) for a given zip code
 * Using free API (no key required) - server-side to avoid CORS
 */

import type { APIRoute } from 'astro';

const REPS_API_URL = 'https://whoismyrepresentative.com/getall_mems.php';

export const GET: APIRoute = async ({ request, url, params }) => {
  // Try multiple ways to get the zip parameter
  const zip = url.searchParams.get('zip') || params.zip || new URL(request.url).searchParams.get('zip');

  console.log('API called with request.url:', request.url);
  console.log('url object:', url);
  console.log('params:', params);
  console.log('Zip parameter:', zip);
  console.log('URL searchParams:', Object.fromEntries(url.searchParams));
  console.log('Request URL searchParams:', Object.fromEntries(new URL(request.url).searchParams));

  if (!zip) {
    return new Response(
      JSON.stringify({ error: 'Zip code parameter is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Validate zip code format
  if (!/^\d{5}$/.test(zip)) {
    return new Response(
      JSON.stringify({ error: 'Invalid zip code format. Must be 5 digits.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Fetch from Who Is My Representative API
    const apiUrl = `${REPS_API_URL}?zip=${encodeURIComponent(zip)}&output=json`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch representatives' }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();

    // Transform the data to a simpler format for the frontend
    const representatives = transformRepData(data);

    return new Response(
      JSON.stringify({ representatives }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching representatives:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

/**
 * Transform Who Is My Representative API response
 * API returns: {results: [{name, state, district, phone, office, link}]}
 */
function transformRepData(data: any) {
  if (!data.results || data.results.length === 0) {
    return [];
  }

  const representatives: any[] = [];

  for (const rep of data.results) {
    // Determine if Senator or Representative based on district
    // Senators have district as state name, Reps have numbered districts
    const isSenator = !rep.district || isNaN(rep.district);
    const role = isSenator ? 'Senator' : 'Representative';

    representatives.push({
      name: rep.name,
      role,
      party: rep.party || 'Unknown', // API may not provide party
      office: isSenator ? `U.S. Senate - ${rep.state}` : `U.S. House District ${rep.district}`,
      phone: rep.phone || null,
      email: null, // API doesn't provide email
      contactForm: rep.link || null,
      photoUrl: null, // API doesn't provide photos
      address: rep.office || null,
      socialMedia: {
        twitter: null,
        facebook: null,
      }
    });
  }

  // Sort: Senators first, then Representatives
  representatives.sort((a, b) => {
    if (a.role === 'Senator' && b.role !== 'Senator') return -1;
    if (a.role !== 'Senator' && b.role === 'Senator') return 1;
    return 0;
  });

  return representatives;
}
