# Cloudflare D1 Setup Guide

This guide will help you set up the Cloudflare D1 database for tracking user actions on Stand for Hemp.

## Prerequisites

- Cloudflare account
- Wrangler CLI installed (`npm install -g wrangler`)
- Logged into Wrangler (`wrangler login`)

## Step 1: Create the D1 Database

Run this command to create your D1 database:

```bash
wrangler d1 create stand-for-hemp-db
```

This will output something like:

```
✅ Successfully created DB 'stand-for-hemp-db'!

[[d1_databases]]
binding = "DB"
database_name = "stand-for-hemp-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

## Step 2: Update wrangler.toml

Copy the `database_id` from the output above and update your `wrangler.toml` file:

```toml
[[d1_databases]]
binding = "DB"
database_name = "stand-for-hemp-db"
database_id = "YOUR_DATABASE_ID_HERE"  # Replace with the actual ID from step 1
```

## Step 3: Initialize the Database Schema

Run this command to create the tables:

```bash
wrangler d1 execute stand-for-hemp-db --file=./schema.sql
```

This will create the `actions` and `page_visits` tables with all necessary indexes.

## Step 4: Test Locally (Optional)

To test with a local D1 database during development:

```bash
# Create local database
wrangler d1 execute stand-for-hemp-db --local --file=./schema.sql

# Run dev server with local bindings
npm run dev
```

## Step 5: Deploy to Cloudflare Pages

### Option A: Deploy via Wrangler

```bash
npm run build
wrangler pages deploy dist
```

### Option B: Deploy via Cloudflare Dashboard

1. Go to your Cloudflare Dashboard
2. Navigate to Pages > Your Project > Settings > Functions
3. Under "D1 database bindings", add a binding:
   - Variable name: `DB`
   - D1 database: Select `stand-for-hemp-db`
4. Deploy your site as usual

## Step 6: Verify It's Working

After deploying, you can test the API endpoints:

### Test Stats Endpoint
```bash
curl https://standforhemp.com/api/stats
```

Should return:
```json
{
  "success": true,
  "stats": {
    "overall": {
      "total_actions": 0,
      "total_emails": 0,
      "total_calls": 0,
      "states_represented": 0,
      "unique_users": 0
    },
    ...
  }
}
```

### Test Track Action Endpoint
```bash
curl -X POST https://standforhemp.com/api/track-action \
  -H "Content-Type: application/json" \
  -d '{"action_type": "email", "zip_code": "90210", "state": "California"}'
```

Should return:
```json
{
  "success": true,
  "action_id": 1,
  "stats": {...}
}
```

## Useful Commands

### View all data
```bash
wrangler d1 execute stand-for-hemp-db --command "SELECT * FROM actions"
```

### Get action counts
```bash
wrangler d1 execute stand-for-hemp-db --command "SELECT action_type, COUNT(*) as count FROM actions GROUP BY action_type"
```

### Clear all data (for testing)
```bash
wrangler d1 execute stand-for-hemp-db --command "DELETE FROM actions"
```

### Export data
```bash
wrangler d1 execute stand-for-hemp-db --command "SELECT * FROM actions" --json > actions-export.json
```

## Troubleshooting

### "Database not configured" error

If you see this error when calling the API:
1. Make sure `wrangler.toml` has the correct `database_id`
2. Ensure the D1 binding is configured in Cloudflare Pages dashboard (Settings > Functions > D1 database bindings)
3. Redeploy your site after updating the bindings

### Schema changes

If you need to modify the schema:
1. Update `schema.sql`
2. Run: `wrangler d1 execute stand-for-hemp-db --file=./schema.sql`

### Local development

For local development, always use the `--local` flag:
```bash
wrangler d1 execute stand-for-hemp-db --local --file=./schema.sql
```

## Cost

D1 is very affordable:
- **Free tier**: 5GB storage, 5M reads/day, 100K writes/day
- **Paid**: $0.50 per million reads after free tier
- For your use case (tracking contact confirmations), you'll likely stay within the free tier

## Security Notes

- IP addresses are hashed (SHA-256) before storage for privacy
- No personally identifiable information is stored
- Only aggregate statistics and zip codes are tracked
