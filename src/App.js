import './App.css';
import Header from './components/header'
import Content from './components/content'
import { createContext, useLayoutEffect, useState } from 'react';
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
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&APPID=6573ed0b8c8d4a642450eba6bcf8009a`
    const urlDefault = `https://api.openweathermap.org/data/2.5/weather?q=kon tum&units=imperial&APPID=6573ed0b8c8d4a642450eba6bcf8009a`

    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(urlDefault);
                const data = await response.json();
                setWeatherData(data)
                setQuery('')
            }
            catch (error) {
                console.log(error);
            }
        };

        fetchData();

    }, [urlDefault])

    const search = (e) => {
        if (e.key === 'Enter') {
            const fetchData = async () => {
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    e.preventDefault();
                    setWeatherData(data)
                    setQuery('')
                }
                catch (error) {
                    console.log(error);
                }
            }
            fetchData()
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
