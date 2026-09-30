# Supabase setup

LisBran uses Supabase for supplier listings, passwordless seller sign-in and the admin approval queue. The anon key is public by design: **Row Level Security (RLS) is what protects the data**, so the migration below must be applied before launch.

## 1. Create the project and connect it

1. Create a project at [supabase.com](https://supabase.com) (region close to Kenya, e.g. `eu-west` or `af-south` if available).
2. Copy **Project URL** and the **anon public** key from *Project Settings → API* into your environment:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

   Never put the `service_role` key in this app or any `NEXT_PUBLIC_` variable.

## 2. Apply the schema and security rules

Run [`supabase/migrations/20260930000000_vendors_rls.sql`](../supabase/migrations/20260930000000_vendors_rls.sql) in *SQL Editor* (or `supabase db push` with the CLI). It is safe to re-run. It:

- creates `vendors` and `admin_notifications` if missing, and adds `city`, `turnaround`, `budget`, `price_from` to `vendors`;
- enables RLS and adds these policies:

| Who | vendors | admin_notifications |
| --- | --- | --- |
| Anyone | read **verified** rows; insert new rows only with `verified = false` | insert a `new_vendor` notice |
| Signed-in seller | read their own row (matched on email or phone) | — |
| Admin | read, update (approve) and delete (reject) any row | full access |

## 3. Auth settings

*Authentication → Providers*

- **Email**: enabled. Sellers sign in with a 6-digit code, so set the magic-link/OTP email template to include `{{ .Token }}`.
- **Phone** (optional): enable an SMS provider (e.g. Twilio or Africa's Talking via a hook) if you want phone sign-in for sellers.

*Authentication → URL configuration*: set **Site URL** to your production domain.

## 4. Create an admin

Admins sign in at `/admin` with email and password, and must carry `app_metadata.role = "admin"`. Users cannot set `app_metadata` themselves.

1. *Authentication → Users → Add user*: enter the admin's email and a strong password (tick *Auto confirm*).
2. In *SQL Editor*, grant the role:

   ```sql
   update auth.users
   set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin"}'
   where email = 'admin@lisbranmarketing.com';
   ```

3. The admin signs out and in again so their session carries the new claim.

To remove access, delete the `role` key from `raw_app_meta_data` (or delete the user).

## 5. Check it

- Visit `/seller/onboarding`, list a test business, and confirm a row appears in `vendors` with `verified = false`.
- As an anonymous visitor, `select * from vendors` through the API should return only verified rows.
- Sign in at `/admin`, approve the test row, and confirm it now appears on `/search/all`.
