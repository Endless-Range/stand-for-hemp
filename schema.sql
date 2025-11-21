-- Cloudflare D1 Database Schema for Stand for Hemp Action Tracking
-- This schema tracks user actions, confirmations, and provides analytics

-- Table: actions
-- Tracks every contact action (email or call) confirmed by users
CREATE TABLE IF NOT EXISTS actions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action_type TEXT NOT NULL CHECK(action_type IN ('email', 'call')),
  zip_code TEXT,
  state TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  user_agent TEXT,
  ip_hash TEXT -- Store hashed IP for deduplication without storing actual IPs
);

-- Table: page_visits
-- Track unique visitors for conversion rate calculations
CREATE TABLE IF NOT EXISTS page_visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page TEXT NOT NULL,
  zip_code TEXT,
  state TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  session_id TEXT,
  user_agent TEXT
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_actions_created_at ON actions(created_at);
CREATE INDEX IF NOT EXISTS idx_actions_state ON actions(state);
CREATE INDEX IF NOT EXISTS idx_actions_type ON actions(action_type);
CREATE INDEX IF NOT EXISTS idx_page_visits_created_at ON page_visits(created_at);
CREATE INDEX IF NOT EXISTS idx_page_visits_session ON page_visits(session_id);
