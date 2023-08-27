import './App.css';
import Header from './components/header'
import Content from './components/content'
import { createContext, useLayoutEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import axios from 'axios'
export const WeatherContext = createContext(null)
function App() {
    const queryClient = useQueryClient();

    const dateBuilder = (d) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        let day = days[d.getDay()]
        let date = d.getDate()
        let month = months[d.getMonth()]
        let year = d.getFullYear()
        return `${day} ${date} ${month} ${year} `
    }

    const [country, setCountry] = useState('')

    const fetchData = async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=6573ed0b8c8d4a642450eba6bcf8009a`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const { isLoading, data: weatherData } = useQuery({
        queryFn: () => fetchData(),
        queryKey: ["weatherData"],
        staleTime: Infinity,
        cacheTime: 0
    })


    const updateWeatherData = async (newCity) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=imperial&APPID=6573ed0b8c8d4a642450eba6bcf8009a`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred');
        }
    };

    // Sử dụng useMutation

    const mutation = useMutation(updateWeatherData, {
        onSuccess: (data) => {
            queryClient.setQueryData(["weatherData"], data); // Cập nhật dữ liệu trong cache
        },
    });

    const search = (e) => {
        if (e.key === 'Enter') {
            // Gọi mutation để thay đổi dữ liệu
            mutation.mutate(country);
            setCountry('');
        }
    };

    console.log(weatherData);

    const value = {
        dateBuilder,
        search,
        country,
        setCountry,
        weatherData
    }

    if (isLoading) {
        return <span>Loading...</span>

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
