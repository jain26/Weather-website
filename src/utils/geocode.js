const request=require('request')

const geocode=(address,callback) => {
    const geo='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiamFpbjI2IiwiYSI6ImNrYnN4dTNpNjA0a3oydHN3OHB4MnJxM2IifQ.To4I57_P6x2yct-06GYwXg&limit=1'

    request({url : geo,json : true},(error,{body}={})=> {
        if(error){
            callback('Unable to connect to Location services',undefined)
        }
        else if(body.features.length==0){
            callback('Not able to find Location,try another search',undefined)
        }
        else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports=geocode