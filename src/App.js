import './App.css';
import Header from './components/header'
import Content from './components/content'
import { createContext, useState } from 'react';
export const WeatherContext = createContext(null)
function App() {

    const dateBuilder = (d) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        let day = days[d.getDay()]
        let date = d.getDate()
        let month = months[d.getMonth()]
        let year = d.getFullYear()
        return `${day} ${date} ${month} ${year} `
    }

    const [query, setQuery] = useState('')
    const [weatherData, setWeatherData] = useState({})

    const search = (e) => {
        if (e.key === 'Enter') {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&APPID=6573ed0b8c8d4a642450eba6bcf8009a`)
                .then(res => res.json())
                .then(
                    data => {
                        setWeatherData(data)
                        setQuery('')
                    }
                )
        }
    }

    const value = {
        dateBuilder,
        search,
        query,
        setQuery,
        weatherData
    }
    return (
        <WeatherContext.Provider value={value}>
            <div className={
                (typeof weatherData.main != 'undefined') ? ((weatherData.main.temp > 70) ? 'app hot' : 'app') : 'app'
            }>
                <main>
                    <Header />
                    <Content />
                </main>
            </div>
        </WeatherContext.Provider>
    )
}

export default App;
