/**
 * Representatives Lookup API v2 - Using Local Database
 * Fetches representatives from our curated database built from official sources
 * Data sources:
 * - unitedstates/congress-legislators (GitHub) - Official legislator data
 * - OpenSourceActivismTech/us-zipcodes-congress (GitHub) - ZIP to district mapping
 *
 * Using dynamic route params: /api/representatives-v2/90210
 */

import type { APIRoute } from 'astro';
import legislatorsData from '../../../data/legislators.json';
import zipDistrictsData from '../../../data/zip-districts.json';
import { getStateData } from '../../../utils/stateData';

// Disable prerendering so this works at runtime with any zip code
export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const zip = params.zip;

  console.log('API v2 called with zip param:', zip);

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
    // Look up congressional district(s) for this ZIP code
    const districts = zipDistrictsData[zip];

    if (!districts || districts.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No congressional district found for this ZIP code.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get the first/primary district (some ZIPs span multiple districts)
    const primaryDistrict = districts[0];
    const state = primaryDistrict.state;
    const districtNum = primaryDistrict.district;

    console.log(`ZIP ${zip} maps to ${state}-${districtNum}`);

    // Get senators for this state
    const senators = legislatorsData.senators[state] || [];

    // Get representative for this district
    const districtKey = `${state}-${districtNum}`;
    const representative = legislatorsData.representatives[districtKey];

    // Build response
    const representatives = [];

    // Add senators first
    for (const senator of senators) {
      representatives.push({
        name: senator.name,
        role: 'Senator',
        party: senator.party,
        office: senator.office || `U.S. Senate - ${state}`,
        phone: senator.phone,
        contactForm: senator.contactForm,
        website: senator.website,
        photoUrl: null, // We don't have photos in the database
        social: senator.social,
        termEnd: senator.termEnd,
        senateClass: senator.senateClass,
      });
    }

    // Add house representative
    if (representative) {
      representatives.push({
        name: representative.name,
        role: 'Representative',
        party: representative.party,
        office: representative.office || `U.S. House District ${districtNum}`,
        phone: representative.phone,
        contactForm: representative.contactForm,
        website: representative.website,
        photoUrl: null,
        social: representative.social,
        termEnd: representative.termEnd,
      });
    }

    if (representatives.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No representatives found for this location.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Returning ${representatives.length} representatives for ${zip}`);

    // Get state-specific hemp impact data
    const stateData = getStateData(state);

    return new Response(
      JSON.stringify({
        representatives,
        state: state,
        stateData: stateData
      }),
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
