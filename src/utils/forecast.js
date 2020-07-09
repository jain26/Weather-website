const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=19b790b9b8a3c4d389a61c46144699ff&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)

    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Not able to connect to weather service',undefined)
        }
        else if (body.error) {
            callback('Unable to find location',undefined)
        }
        else {
            callback(undefined,body.current.weather_descriptions[0] + ', The temperature is currently ' + body.current.temperature + ' and it feels like ' + body.current.feelslike+'.The Humidity is '+body.current.humidity+' percent.')
        }
    })
}

module.exports=forecast