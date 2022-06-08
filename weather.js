const key = 'a133d33063e72dabb91994629fb365ff';
const key2 = 'bdc_7a30b2d9101343c2a7e960520764f90f';

const getCity = async (city) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?';
    const apiKey = `q=${city}&units=metric&appid=${key}`
    const response = await fetch(url + apiKey)
    const data = await response.json()
    return data
}

const getWeather = async (lat,  lon) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?';
    const apiKey = `lat=${lat}&lon=${lon}&daily&units=metric&exclude=hourly,minutely&appid=${key}`
    const response = await fetch(url + apiKey)
    const data = await response.json()
    return data
}

const userAddress = async (lat,  lon) => {
    const url = 'https://api.bigdatacloud.net/data/reverse-geocode?';
    const apiKey = `latitude=${lat}&longitude=${lon}&localityLanguage=en&key=${key2}`
    const response = await fetch(url + apiKey)
    const data = await response.json()
    return data
}

getCity('mumbai').then(data => {
    console.log('city',data)
    let lat = data.coord.lat
    let lon = data.coord.lon
    return getWeather(lat, lon) 
}).then(data => {
    console.log('onecall',data)
})