import { useEffect, useState } from 'react'
import './App.css'
import * as CONST from './helpers/consts.js'
import Utils from './helpers/Utils.jsx'
import ActivityList from './components/ActivityList.jsx'

function App() {
  //retrieve access token from .env.local file
  const accessToken = import.meta.env.VITE_STRAVA_ACCESS_TOKEN || ''
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(Boolean(accessToken))
  const [error, setError] = useState(
    accessToken
      ? ''
      : 'Add VITE_STRAVA_ACCESS_TOKEN to your .env.local file to load your latest activity.',
  )

  useEffect(() => {
    if (!accessToken) {
      return
    }

    fetch(CONST.STRAVA_API_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to fetch your Strava activity right now.')
        }

        return response.json()
      })
      .then((data) => {
        setActivities(Array.isArray(data) ? data : [])
        setError('')
      })
      .catch(() => {
        setError('Could not load the latest Strava activity. Check your token and API access.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [accessToken])

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-16">
        <article className="w-full rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur md:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Strava dashboard</p>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">Latest activity</h1>
          <p className="mt-3 max-w-2xl text-slate-300">This page fetches your most recent Strava activity and shows the key stats on the screen.</p>

          {loading && (
            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-800/70 p-6 text-slate-200">Loading your latest activity…</div>
          )}

          {error && !loading && (
            <div className="mt-8 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-rose-100">{error}</div>
          )}

          {!loading && activities.length > 0 && <ActivityList activities={activities} />}

          {!loading && activities.length === 0 && !error && (
            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-800/70 p-6 text-slate-200">No recent activity was returned from Strava.</div>
          )}
        </article>
      </section>
    </main>
  )
}

export default App
