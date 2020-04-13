
const request=require('request');

const forecast=(latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/1e53e07357a49a2b7406d3a81f79290c/'+latitude+','+longitude+'?units=si';
    request({url,json:true},(error,{body})=>{
      if(error){
        callback('unable to connect to weather services',undefined)
      }
      else if(body.error){
        callback('unable to find location',undefined);
      }
      else{
        callback(undefined,body.daily.data[0].summary + "It is currently " + body.currently.temperature + " degrees out.There is " + body.currently.precipProbability + "% chances of rain")
      }
    })
  }

  module.exports=forecast