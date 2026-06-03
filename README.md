# My Strava Dashboard

This React + Vite + Tailwind app fetches your latest Strava activity and displays the key stats on the page.

## Setup

1. Create a Strava API application at https://www.strava.com/settings/api.
2. Copy the client ID and secret, then generate an access token for your athlete account.
3. Create a `.env.local` file from `.env.example` and add your token:

   VITE_STRAVA_ACCESS_TOKEN=your_access_token_here

4. Start the app:

   npm install
   npm run dev

The page will fetch your most recent activity from the Strava API and show it on the homepage.