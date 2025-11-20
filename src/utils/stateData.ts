/**
 * State data utilities for Stand for Hemp
 * Provides access to state-specific hemp industry impact data
 */

import stateHempData from '../data/state_hemp_data.json';

export interface StateData {
  state_name: string;
  revenue_annual?: string;
  revenue_loss_potential?: string;
  revenue_loss_actual?: string;
  revenue_loss_projected?: string;
  jobs_current?: number | string;
  jobs_at_risk?: number | string;
  jobs_lost?: string;
  hemp_businesses?: number | string;
  businesses_closed?: string;
  tax_revenue?: string;
  tax_revenue_loss?: string;
  ban_status?: string;
  ban_type?: string;
  data_year?: number;
  data_source?: string;
  notes?: string;
  hemp_acreage_2023?: number;
  [key: string]: any;
}

export interface NationalTotals {
  total_jobs_at_risk: number;
  total_revenue_2025: string;
  total_market_value: string;
  data_source: string;
  notes: string;
}

/**
 * Get state data by state abbreviation (e.g., 'TX', 'CA')
 */
export function getStateData(stateAbbr: string): StateData | null {
  const upperStateAbbr = stateAbbr.toUpperCase();
  return (stateHempData.states as Record<string, StateData>)[upperStateAbbr] || null;
}

/**
 * Get state data by full state name (e.g., 'Texas', 'California')
 */
export function getStateDataByName(stateName: string): StateData | null {
  const states = stateHempData.states as Record<string, StateData>;
  const entry = Object.entries(states).find(
    ([_, data]) => data.state_name.toLowerCase() === stateName.toLowerCase()
  );
  return entry ? entry[1] : null;
}

/**
 * Get national totals
 */
export function getNationalTotals(): NationalTotals {
  return stateHempData.national_totals as NationalTotals;
}

/**
 * Get all states sorted by impact (jobs at risk)
 */
export function getStatesSortedByImpact(): Array<{ abbr: string; data: StateData }> {
  const states = stateHempData.states as Record<string, StateData>;

  // Helper function to parse job count from number or string
  const parseJobCount = (data: StateData): number => {
    if (typeof data.jobs_at_risk === 'number') {
      return data.jobs_at_risk;
    } else if (typeof data.jobs_current === 'number') {
      return data.jobs_current;
    } else {
      // Parse from string like "estimated 3,000-5,000" or "3000+"
      const jobsStr = String(data.jobs_at_risk || data.jobs_current || '0');
      const match = jobsStr.match(/[\d,]+/);
      if (match) {
        return parseInt(match[0].replace(/,/g, ''));
      }
      return 0;
    }
  };

  return Object.entries(states)
    .map(([abbr, data]) => ({ abbr, data }))
    .sort((a, b) => {
      const aJobs = parseJobCount(a.data);
      const bJobs = parseJobCount(b.data);
      return bJobs - aJobs;
    });
}

/**
 * Format jobs number for display
 */
export function formatJobs(jobs: number | string | undefined): string {
  if (!jobs) return 'N/A';
  if (typeof jobs === 'string') return jobs;
  return jobs.toLocaleString();
}

/**
 * Format revenue for display
 */
export function formatRevenue(revenue: string | undefined): string {
  if (!revenue) return 'N/A';
  return revenue;
}

/**
 * Get impact level for color coding (used for map visualization)
 */
export function getImpactLevel(stateData: StateData): 'critical' | 'high' | 'medium' | 'low' {
  // California has already banned - critical
  if (stateData.ban_status) return 'critical';

  // Parse jobs from number or string (handle "estimated X-Y" format)
  let jobs = 0;

  if (typeof stateData.jobs_at_risk === 'number') {
    jobs = stateData.jobs_at_risk;
  } else if (typeof stateData.jobs_current === 'number') {
    jobs = stateData.jobs_current;
  } else {
    // Parse from string like "estimated 3,000-5,000" or "3000+"
    const jobsStr = String(stateData.jobs_at_risk || stateData.jobs_current || '0');
    // Extract first number from the string
    const match = jobsStr.match(/[\d,]+/);
    if (match) {
      jobs = parseInt(match[0].replace(/,/g, ''));
    }
  }

  if (jobs >= 10000) return 'critical';
  if (jobs >= 2000) return 'high';
  if (jobs >= 500) return 'medium';
  return 'low';
}

/**
 * Get color for impact level
 */
export function getImpactColor(level: 'critical' | 'high' | 'medium' | 'low'): string {
  const colors = {
    critical: '#dc2626', // red-600
    high: '#ea580c',    // orange-600
    medium: '#ca8a04',  // yellow-600
    low: '#65a30d'      // lime-600
  };
  return colors[level];
}
