const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZXZnZW55MTMiLCJhIjoiY2sxZXYzcmpoMDdiOTNtcWw4cjl0dDBwaCJ9.yFoCDG0zosMnfYEGyFo27w&limit=1'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connact weather services!', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location! ', undefined)
        }else{
            
            const coords = body.features[0].center
            const location = body.features[0].place_name
            callback(undefined, {
                longitude: coords[0],
                latitude: coords[1],
                location
            })
        }
    })
}

module.exports = geocode