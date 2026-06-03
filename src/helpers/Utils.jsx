import * as CONST from './consts'

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
        return new Date(value).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric',})
    }

}

export default Utils;
