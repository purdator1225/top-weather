const WEATHER_KEY= '7EK2B7T5PGQ9LJGRF6TT264ZW'

const reqUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline'


const form = document.querySelector('form')
const button = document.querySelector('button')
const responseDiv = document.getElementById('responseDiv')
const searchString = document.getElementById('searchString')
const loading = document.getElementById('loading-text')
const errorDiv = document.getElementById('error-div')

async function jsonProcessor(promise){
    
    let promiseRes = await promise.json()

    let {currentConditions, resolvedAddress} = promiseRes

    return {currentConditions, resolvedAddress}
    
}

function appendDOM(currentConditions, location){
   

    let currentConditionsDiv = document.createElement('div')


    currentConditionsDiv.textContent = 'The current Condition is ' + currentConditions

    let locationDiv = document.createElement('div')

    locationDiv.textContent = 'You searched for ' + location

    responseDiv.append(locationDiv,currentConditionsDiv)
}

async function getWeather(location){

    errorDiv.style.display='none'
    loading.style.display = 'block'
      responseDiv.innerHTML = ''


    try{

        let weatherRes = await fetch(`${reqUrl}/${location}?unitGroup=metric&key=${WEATHER_KEY}&contentType=json`)

        let weatherJSON = await jsonProcessor(weatherRes)

        appendDOM(weatherJSON.currentConditions.conditions, weatherJSON.resolvedAddress)

 loading.style.display = 'none'



    }

    catch(error){

        console.log(error.message)
        loading.style.display = 'none'
        errorDiv.style.display= 'block'

        errorDiv.textContent= 'API Error ' + error.message

        throw new Error(error.message)

    
    }



}

form.onsubmit = (event) => {
    event.preventDefault();

    if (searchString.value){
        console.log(searchString.value)

        getWeather(searchString.value)

    }

    else alert('Please enter a Location')

    
}


