const request = require('request')

const forecast = (longitude, latitude , callback) => {
    const url = 'https://api.darksky.net/forecast/fb5dc1e467c7983acc412de35002a552/' + latitude + ',' + longitude + '?units=si'

    request({url, json: true }, (error, {body}) => {

        if(error){
            callback('Unable to connact weather services!', undefined)
        }else if(body.code === 400){
            callback('Unable to find location! ', undefined)
        }else{
            callback(undefined, body.daily.data[0].summary +'\nIt is currently ' + body.currently.temperature + ' degrees out.\nThere is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}


module.exports = forecast


