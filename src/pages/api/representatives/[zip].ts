/**
 * Who Is My Representative API - Representative Lookup
 * Fetches representatives (House + Senators) for a given zip code
 * Using free API (no key required) - server-side to avoid CORS
 *
 * Using dynamic route params instead of query strings
 * Call with: /api/representatives/90210
 */

import type { APIRoute } from 'astro';

const REPS_API_URL = 'https://whoismyrepresentative.com/getall_mems.php';

// Disable prerendering so this works at runtime with any zip code
export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const zip = params.zip;

  console.log('API called with zip param:', zip);

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

    console.log('Fetching from external API:', apiUrl);

    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch representatives' }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();

    console.log('Got data for', zip, ':', data.results?.length, 'representatives');

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
      party: rep.party || 'Unknown',
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

  // Filter to only include Senators and the FIRST House Representative
  // (Some zip codes span multiple districts, but we only want to show one rep)
  const senators = representatives.filter(r => r.role === 'Senator');
  const houseReps = representatives.filter(r => r.role === 'Representative');

  // Return senators + first house rep only
  return [...senators, ...(houseReps.length > 0 ? [houseReps[0]] : [])];
}
