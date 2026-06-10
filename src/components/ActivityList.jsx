import Utils from '../helpers/Utils.jsx'

function ActivityList({ activities }) {
  return (
    <div className="mt-8 grid gap-6">
      <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Showing {activities.length} recent activities</p>
      <div className="grid gap-6">
        {activities.map((activity) => (
          <article
            key={activity.id}
            className="grid gap-6 rounded-3xl border border-cyan-500/20 bg-linear-to-br from-slate-800 to-slate-900 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Workout</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">{activity.name}</h2>
              <p className="mt-2 text-slate-300">{Utils.formatDate(activity.start_date_local)} • {activity.sport_type}</p>
              <p className="mt-6 text-slate-200 flex items-center gap-2">
                <span aria-hidden="true">❤️</span>
                <span>{activity.kudos_count ?? 0}</span>
              </p>
            </div>

            <div className="grid gap-4 rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-slate-100">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Distance</p>
                <p className="mt-1 text-3xl font-semibold text-cyan-300">{Utils.formatDistance(activity.distance, activity.sport_type)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Moving time</p>
                <p className="mt-1 text-3xl font-semibold text-cyan-300">{Utils.formatDuration(activity.moving_time)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{activity.sport_type === 'Run' ? 'Pace' : 'Average Speed'}</p>
                <p className="mt-1 text-3xl font-semibold text-cyan-300">{Utils.formatAverageSpeed(activity.average_speed, activity.sport_type)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Average Heart Rate</p>
                <p className="mt-1 text-3xl font-semibold text-cyan-300">{activity.average_heartrate ?? '—'}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default ActivityList
