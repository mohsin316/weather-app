const button = document.querySelector('form button');
const form = document.querySelector('form');
const country = document.querySelector('.country')
const temperature = document.querySelector('.temperature p')
const weatherType = document.querySelector('.status')
const icon = document.querySelector('.weather_img img')
const dates = document.querySelector('.date')


const windSpd = document.querySelector('.wind')
const uvi = document.querySelector('.uvi')
const clouds = document.querySelector('.clouds')
const humid = document.querySelector('.humid')


const next = document.querySelector('.next')
const before = document.querySelector('.before')

let click = 0
let city = ''

icon.classList.add('hide')
country.classList.add('hide')
temperature.classList.add('hide')
weatherType.classList.add('hide')
windSpd.classList.add('hide')
uvi.classList.add('hide')
clouds.classList.add('hide')
humid.classList.add('hide')
dates.classList.add('hide')

window.navigator.geolocation
.getCurrentPosition(test => {
    console.log('lat', test.coords.latitude, 'lon', test.coords.longitude)
    userAddress(test.coords.latitude, test.coords.longitude)
        .then(data => {
            console.log('testing',data.city)
            city = data.city
            updateCity(data.city)
                .then(data => updateUI(data,click))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

},console.log);


const address = async (lat, lon) => {
    const city = await test(lat,lon)
    return city
}

const updateCity = async city => {
    console.log('test',city)
    const data = await getCity(city)
    const weather = await getWeather(data.coord.lat,data.coord.lon)
    return {data, weather}
}

const updateUI = (info, count) => {
    const {data, weather} = info;
    const regionNames = new Intl.DisplayNames(['en'], {type: 'region'});

    let today = new Date();
    let nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+count);
    const date = new Date(nextweek.setMilliseconds(0))
    const dateTime = date.toLocaleDateString('en-GB')
    

    const dayNames={
        0:'Sun',
        1:'Mon',
        2:'Tue',
        3:'Wed',
        4:'Thu',
        5:'Fri',
        6:'Sat',}

    const NumDay = today.getDay()+count;

    icon.classList.remove('unhide')
    icon.classList.add('hide')

    country.classList.remove('unhide')
    country.classList.add('hide')

    temperature.classList.remove('unhide')
    temperature.classList.add('hide')

    weatherType.classList.remove('unhide')
    weatherType.classList.add('hide')

    windSpd.classList.remove('unhide')
    windSpd.classList.add('hide')

    uvi.classList.remove('unhide')
    uvi.classList.add('hide')

    clouds.classList.remove('unhide')
    clouds.classList.add('hide')

    humid.classList.remove('unhide')
    humid.classList.add('hide')

    dates.classList.remove('unhide')
    dates.classList.add('hide')

    
    if(count === 0){
        setTimeout(() => {
            icon.setAttribute('src', `http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`)
            country.innerHTML = 
            `${data.name}, ${regionNames.of(data.sys.country)}`
            temperature.innerHTML = 
            `${Math.floor(weather.current.temp)}&#176`
            weatherType.innerHTML = 
            `${weather.current.weather[0].description}`
        
            windSpd.innerHTML = 
            `${((weather.current.wind_speed*3600)/1000).toFixed(2)}<span>km/hr</span>`
        
            uvi.innerHTML = 
            `${weather.current.uvi}`
        
            clouds.innerHTML = 
            `${weather.current.clouds}<span>%</span>`
        
            humid.innerHTML = 
            `${weather.current.humidity}<span>%</span>`

            dates.innerHTML = `Today, ${dateTime.slice(0,5)}`
        }, 250);
        setTimeout(() => {
            icon.classList.add('unhide')
            icon.classList.remove('hide')

            country.classList.add('unhide')
            country.classList.remove('hide')

            temperature.classList.add('unhide')
            temperature.classList.remove('hide')

            weatherType.classList.add('unhide')
            weatherType.classList.remove('hide')

            windSpd.classList.add('unhide')
            windSpd.classList.remove('hide')

            uvi.classList.add('unhide')
            uvi.classList.remove('hide')

            clouds.classList.add('unhide')
            clouds.classList.remove('hide')
            
            humid.classList.add('unhide')
            humid.classList.remove('hide')

            dates.classList.add('unhide')
            dates.classList.remove('hide')
        }, 300);
    }else{

        setTimeout(() => {
            if (NumDay>6){
                switch (NumDay){
                    case 7:
                        dates.innerHTML =`${dayNames[0]}, ${dateTime.slice(0,5)}`
                        break
                    case 8:
                        dates.innerHTML =`${dayNames[1]}, ${dateTime.slice(0,5)}`
                        break
                    case 9:
                        dates.innerHTML =`${dayNames[2]}, ${dateTime.slice(0,5)}`
                        break
                    case 10:
                        dates.innerHTML =`${dayNames[3]}, ${dateTime.slice(0,5)}`
                        break
                    case 11:
                        dates.innerHTML =`${dayNames[4]}, ${dateTime.slice(0,5)}`
                        break
                    case 12:
                        dates.innerHTML =`${dayNames[5]}, ${dateTime.slice(0,5)}`
                        break
                    case 13:
                        dates.innerHTML =`${dayNames[6]}, ${dateTime.slice(0,5)}`
                        break
                }
            }else{
                dates.innerHTML =`${dayNames[NumDay]}, ${dateTime.slice(0,5)}`
        
            }
        },250)
        
        avgTemp = (weather.daily[count].temp.max + weather.daily[count].temp.max)/2

        setTimeout(() => {
            icon.setAttribute('src', `http://openweathermap.org/img/wn/${weather.daily[count].weather[0].icon}@2x.png`)
            country.innerHTML = 
            `${data.name}, ${regionNames.of(data.sys.country)}`
            temperature.innerHTML = 
            `${Math.floor(avgTemp)}&#176`
            weatherType.innerHTML = 
            `${weather.daily[count].weather[0].description}`
        
            windSpd.innerHTML = 
            `${((weather.daily[count].wind_speed*3600)/1000).toFixed(2)}<span>km/hr</span>`
        
            uvi.innerHTML = 
            `${weather.daily[count].uvi}`
        
            clouds.innerHTML = 
            `${weather.daily[count].clouds}<span>%</span>`
        
            humid.innerHTML = 
            `${weather.daily[count].humidity}<span>%</span>`
        }, 250);

        
        setTimeout(() => {
            icon.classList.add('unhide')
            icon.classList.remove('hide')

            country.classList.add('unhide')
            country.classList.remove('hide')

            temperature.classList.add('unhide')
            temperature.classList.remove('hide')
            
            weatherType.classList.add('unhide')
            weatherType.classList.remove('hide')

            windSpd.classList.add('unhide')
            windSpd.classList.remove('hide')

            uvi.classList.add('unhide')
            uvi.classList.remove('hide')

            clouds.classList.add('unhide')
            clouds.classList.remove('hide')

            humid.classList.add('unhide')
            humid.classList.remove('hide')
            
            dates.classList.add('unhide')
            dates.classList.remove('hide')
        }, 300);

    }
}

form.addEventListener('submit', e => {
    e.preventDefault();
    city = form.city.value.trim();
    form.reset();
    updateCity(city)
        .then(data => updateUI(data,click))
        .catch(err => console.log(err));
})


next.disabled = false; 

next.addEventListener('click', ( ) => { 
    click++
    if (click >= 7){
        next.disabled = true;
    }

    if (click >= 0){
        before.disabled = false;
    }
    updateCity(city)
        .then(data => updateUI(data,click))
        .catch(err => console.log(err));
})

before.addEventListener('click', ( ) => { 
    click--
    if (click <= 7){
        next.disabled = false;
    }
    if (click <= 0){
        before.disabled = true;
    }
    console.log(click)
    if(click===-1){
        updateCity(city)
            .then(data => updateUI(data,0))
            .catch(err => console.log(err));
        
    }else{
        updateCity(city)
            .then(data => updateUI(data,click))
            .catch(err => console.log(err));
    }
})      