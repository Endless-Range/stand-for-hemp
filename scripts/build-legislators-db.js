/**
 * Build Legislators Database
 * Converts the unitedstates/congress-legislators YAML data into a searchable JSON format
 * Also includes ZIP code to congressional district mapping
 */

import fs from 'fs';
import https from 'https';
import yaml from 'yaml';

const LEGISLATORS_URL = 'https://raw.githubusercontent.com/unitedstates/congress-legislators/main/legislators-current.yaml';
const SOCIAL_MEDIA_URL = 'https://raw.githubusercontent.com/unitedstates/congress-legislators/main/legislators-social-media.yaml';
const ZIP_DISTRICTS_URL = 'https://raw.githubusercontent.com/OpenSourceActivismTech/us-zipcodes-congress/master/zccd.csv';
const OUTPUT_FILE = './src/data/legislators.json';
const ZIP_MAP_FILE = './src/data/zip-districts.json';

async function downloadFile(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
  });
}

async function buildDatabase() {
  console.log('Downloading legislators data...');
  const yamlData = await downloadFile(LEGISLATORS_URL);

  console.log('Downloading social media data...');
  const socialYamlData = await downloadFile(SOCIAL_MEDIA_URL);

  console.log('Parsing YAML...');
  const legislators = yaml.parse(yamlData);
  const socialMedia = yaml.parse(socialYamlData);

  // Create a map of bioguideId to social media
  const socialMap = {};
  for (const entry of socialMedia) {
    if (entry.id?.bioguide) {
      socialMap[entry.id.bioguide] = entry.social;
    }
  }

  console.log(`Processing ${legislators.length} legislators...`);

  const processedData = {
    lastUpdated: new Date().toISOString(),
    senators: {},
    representatives: {}
  };

  for (const legislator of legislators) {
    // Get most recent term
    const currentTerm = legislator.terms[legislator.terms.length - 1];

    // Skip if term has ended
    if (new Date(currentTerm.end) < new Date()) {
      continue;
    }

    // Get social media for this legislator
    const social = socialMap[legislator.id.bioguide] || {};

    const record = {
      name: legislator.name.official_full || `${legislator.name.first} ${legislator.name.last}`,
      firstName: legislator.name.first,
      lastName: legislator.name.last,
      party: currentTerm.party,
      state: currentTerm.state,
      phone: currentTerm.phone || null,
      contactForm: currentTerm.contact_form || currentTerm.url || null,
      website: currentTerm.url || null,
      office: currentTerm.office || currentTerm.address || null,
      bioguideId: legislator.id.bioguide,
      social: {
        twitter: social.twitter || null,
        facebook: social.facebook || null,
        youtube: social.youtube || null,
        instagram: social.instagram || null
      }
    };

    if (currentTerm.type === 'sen') {
      // Senator
      if (!processedData.senators[currentTerm.state]) {
        processedData.senators[currentTerm.state] = [];
      }
      processedData.senators[currentTerm.state].push(record);
    } else if (currentTerm.type === 'rep') {
      // Representative
      const key = `${currentTerm.state}-${currentTerm.district}`;
      processedData.representatives[key] = record;
    }
  }

  // Create data directory if it doesn't exist
  const dir = './src/data';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(processedData, null, 2));

  console.log(`✓ Database written to ${OUTPUT_FILE}`);
  console.log(`  - Senators: ${Object.keys(processedData.senators).length} states`);
  console.log(`  - Representatives: ${Object.keys(processedData.representatives).length} districts`);

  // Build ZIP code mapping
  console.log('\nDownloading ZIP code mapping...');
  const zipCsvData = await downloadFile(ZIP_DISTRICTS_URL);

  console.log('Processing ZIP code mapping...');
  const zipMap = {};
  const lines = zipCsvData.trim().split('\n');

  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const [state_fips, state_abbr, zcta, cd] = lines[i].split(',');

    if (!zipMap[zcta]) {
      zipMap[zcta] = [];
    }

    // Add this district if not already present (trim to remove \r and whitespace)
    const cleanState = state_abbr?.trim();
    const cleanDistrict = cd?.trim();

    const district = {
      state: cleanState,
      district: cleanDistrict
    };

    // Avoid duplicates
    if (!zipMap[zcta].find(d => d.state === cleanState && d.district === cleanDistrict)) {
      zipMap[zcta].push(district);
    }
  }

  fs.writeFileSync(ZIP_MAP_FILE, JSON.stringify(zipMap, null, 2));

  console.log(`✓ ZIP mapping written to ${ZIP_MAP_FILE}`);
  console.log(`  - ${Object.keys(zipMap).length} ZIP codes mapped`);
}

buildDatabase().catch(console.error);
