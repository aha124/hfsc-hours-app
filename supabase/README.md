# Supabase Setup for HFSC Coach Hours Tracker

This guide will help you set up the Supabase backend for the HFSC Coach Hours Tracker application.

## Step 1: Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign in or create an account
2. Create a new project
3. Choose a name for your project (e.g., "hfsc-coach-hours")
4. Choose a secure password for the database
5. Select a region closest to your users
6. Wait for the project to be created (this may take a few minutes)

## Step 2: Set Up Database Tables and Policies

1. In your Supabase project, go to the "SQL Editor" section
2. Create a new query
3. Copy and paste the contents of the `schema.sql` file in this directory
4. Run the query to create the necessary tables, functions, and policies

## Step 3: Configure Authentication

1. Go to the "Authentication" section in your Supabase dashboard
2. Under "Settings" > "Email Templates", customize the email templates for your organization:
   - Customize the "Confirm signup" email
   - Customize the "Reset password" email
   - Update the email sender name and address

3. Under "Settings" > "URL Configuration", set your site URLs:
   - Set the Site URL to your production URL (e.g., "https://your-app.vercel.app")
   - Set the Redirect URLs to include both your production and local development URLs

## Step 4: Get the Supabase Connection Details

1. Go to the "Settings" section (gear icon) in your Supabase dashboard
2. Click on "API" in the sidebar
3. You'll find two important keys:
   - **Project URL**: Copy the URL under "Project URL"
   - **anon/public key**: Copy the key labeled "anon/public"

## Step 5: Update Environment Variables

1. Create or update the `.env.local` file in your project root with the Supabase connection details:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. If you're deploying to Vercel, add these environment variables in your Vercel project settings.

## Step 6: Additional Configuration (Optional)

### Email Authentication (Optional)

By default, Supabase enables email authentication. If you want to configure additional settings:

1. Go to "Authentication" > "Providers" in your Supabase dashboard
2. Configure the "Email" provider settings as needed

### Social Login Providers (Optional)

To enable login with Google, Microsoft, or other providers:

1. Go to "Authentication" > "Providers" in your Supabase dashboard
2. Find the provider you want to enable (e.g., Google)
3. Toggle it on and follow the instructions to set it up

### Database Backups (Recommended)

To ensure your data is safe:

1. Go to "Project Settings" > "Database"
2. Configure the backup schedule according to your needs

## Step 7: Test Your Configuration

Once you've completed the setup, test your application to ensure everything is working correctly:

1. Run your application locally or deploy it
2. Try to sign up and sign in
3. Create, read, update, and delete coach hours entries
4. Export data to Excel

## Troubleshooting

If you encounter issues:

1. Check the browser console for errors
2. Verify your environment variables are set correctly
3. Check the Supabase dashboard for auth and database logs
4. Ensure your Row Level Security policies are set up correctly

For detailed logs and debugging:

1. Go to "Database" > "Logs" in your Supabase dashboard
2. Go to "Authentication" > "Users" to see user sign-up and authentication details 