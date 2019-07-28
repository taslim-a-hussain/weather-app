const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const darkskyAccessKey = '798639d09810df4d38ae59f6f54109ee';
const mapboxAccessToken = 'pk.eyJ1IjoicmVsYXhtYW4iLCJhIjoiY2p5azZpeHJpMGJiMzNncHE3d3J1NDA1eCJ9.W1pC-t8ppVSYXyk1dwlf0A';

function weatherOption(latitude, longitude, units = 'si') {
    const weatherUrl = 'https://api.darksky.net/forecast/'+ darkskyAccessKey + '/' + latitude + ',' + longitude + '?units=' + units;
    return {
        url: weatherUrl,
        json: true
    };
}

function geoOpt(place) {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(place) + '.json?access_token=' + mapboxAccessToken;
    return {
        url: geoUrl,
        json: true
    };
}



const location = process.argv[2];

if (location) {

    geocode(geoOpt(location[2]), (error, codinate) => {

        if (error) {
            return console.log('Error', error);      
            } 
                forecast(weatherOption(codinate.latitude, codinate.longitude), (error, data) => {
                if (error) {
                    return console.log('Error', error);   
                } 
                    console.log(codinate.place);
                    console.log('It is currently ' + data.current_temp + ' degrees out.');
                    console.log('There is a ' + data.current_precipProb + '% chance of rain.');
                });
        
    });
    
} else {
    console.log('Location is required!');
}