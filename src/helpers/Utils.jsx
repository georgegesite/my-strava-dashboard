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

    static formatAverageSpeed(averageSpeedMetersPerSecond, sportType) {
        if (!Number.isFinite(averageSpeedMetersPerSecond) || averageSpeedMetersPerSecond <= 0) {
            return '—'
        }

        if (sportType === 'Run') {
            return this.formatPace(averageSpeedMetersPerSecond)
        }

        if (sportType === 'Ride') {
            return `${(averageSpeedMetersPerSecond * 3.6).toFixed(1)} km/h`
        }

        if (sportType === 'Swim') {
            const totalSeconds = 100 / averageSpeedMetersPerSecond
            const minutes = Math.floor(totalSeconds / 60)
            const seconds = Math.round(totalSeconds % 60)

            return `${minutes}:${String(seconds).padStart(2, '0')}/100m`
        }

        return `${averageSpeedMetersPerSecond.toFixed(2)} m/s`
    }
}

export default Utils
