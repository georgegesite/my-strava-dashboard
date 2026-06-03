import * as CONST from './consts.js'

class Utils {

    static formatDistance(meters) {
        return `${(meters / 1000).toFixed(1)} km`
    }

    static formatDuration(seconds) {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
    }

    static formatDate(value) {
        return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    static formatPace(averageSpeedMetersPerSecond) {
        if (!Number.isFinite(averageSpeedMetersPerSecond) || averageSpeedMetersPerSecond <= 0) {
            return '—'
        }

        const paceMinutesPerKm = 60 / (averageSpeedMetersPerSecond * 3.6)
        const minutes = Math.floor(paceMinutesPerKm)
        const seconds = Math.round((paceMinutesPerKm - minutes) * 60)

        return `${minutes}:${String(seconds).padStart(2, '0')}/km`
    }
}

export default Utils
