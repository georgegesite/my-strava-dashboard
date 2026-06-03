import { useEffect, useState } from 'react'
import './App.css'
import * as CONST from './helpers/consts.js'
import Utils from './helpers/Utils.jsx'

function App() {
  //retrieve access token from .env.local file
  const accessToken = import.meta.env.VITE_STRAVA_ACCESS_TOKEN || ''
  const [activity, setActivity] = useState(null)
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
        setActivity(data[0] ?? null)
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
        <article className="w-full rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur md:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Strava dashboard</p>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">Latest activity</h1>
          <p className="mt-3 max-w-2xl text-slate-300">This page fetches your most recent Strava activity and shows the key stats on the screen.</p>

          {loading && (
            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-800/70 p-6 text-slate-200">Loading your latest activity…</div>
          )}

          {error && !loading && (
            <div className="mt-8 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-rose-100">{error}</div>
          )}

          {!loading && activity && (
            <div className="mt-8 grid gap-6 rounded-3xl border border-cyan-500/20 bg-linear-to-br from-slate-800 to-slate-900 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Most recent Workout</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">{activity.name}</h2>
                <p className="mt-2 text-slate-300">{Utils.formatDate(activity.start_date_local)} • {activity.sport_type}</p>
                <p className="mt-6 text-slate-200">{activity.description || 'A fresh Strava activity is ready to be shown here.'}</p>
              </div>

              <div className="grid gap-4 rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-slate-100">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Distance</p>
                  <p className="mt-1 text-3xl font-semibold text-cyan-300">{Utils.formatDistance(activity.distance)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Moving time</p>
                  <p className="mt-1 text-3xl font-semibold text-cyan-300">{Utils.formatDuration(activity.moving_time)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{activity.sport_type === 'Run' ? 'Pace' : 'Average Speed'}</p>
                  <p className="mt-1 text-3xl font-semibold text-cyan-300">{activity.sport_type === 'Run' ? Utils.formatPace(activity.average_speed) : `${(activity.average_speed ?? 0).toFixed(2)} m/s`}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Average Heart Rate</p>
                  <p className="mt-1 text-3xl font-semibold text-cyan-300">{activity.average_heartrate ?? '—'}</p>
                </div>
              </div>
            </div>
          )}

          {!loading && !activity && !error && (
            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-800/70 p-6 text-slate-200">No recent activity was returned from Strava.</div>
          )}
        </article>
      </section>
    </main>
  )
}

export default App
