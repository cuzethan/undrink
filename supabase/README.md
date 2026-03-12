# Supabase setup

## Step 1: Create a project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. **New project** → pick org, name (e.g. `undrink`), database password, region.
3. After the project is ready, open **Project Settings** → **API** and copy:
   - **Project URL**
   - **anon public** key

You’ll use these in the mobile app as `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_KEY`.

## Step 2: Run the schema

1. In the dashboard, open **SQL Editor**.
2. Paste the contents of `schema.sql` and run it.

This creates:

- `public.profiles` (optional; one row per user, auto-created on signup)
- `public.drinks` (id, user_id, beverage_type, amount, logged_at, created_at)
- Row Level Security so users only see and edit their own data
