const request = require('request')
const geoApiBaseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const geoApiAccessToken = 'pk.eyJ1IjoiYml6YXJyZSIsImEiOiJjano4cDdrc2owMWt4M2htbXVjbXNyNDg4In0.0Qm1mGrtlR9ZYkUW6b7Nzg'

const geoCode = (searchKey, callback) => {
    const url = geoApiBaseUrl + encodeURIComponent(searchKey) + '.json?access_token=' + geoApiAccessToken + '&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service.')
        } else if (body.features.length === 0) {
            callback('Unable to find place. Please search with different search term')
        } else {
            const data = body.features[0]
            callback(undefined, {
                longitude: data.center[0],
                latitude: data.center[1],
                location: data.place_name
            })
        }
    })
}

module.exports = geoCode