import React, { useContext } from "react";
import { WeatherContext } from "../App";
import './content.scss'
function Content() {
    const data = useContext(WeatherContext)
    return (
        <div className="content">
            <div className="content-location-box">
                <div className="box-location">{data.weatherData.name}</div>
                <div className="box-date">{data.dateBuilder(new Date())}</div>
            </div>
            <div className="content-weather-box">
                <div className="temp">
                    {data.weatherData.main ? <p>{data.weatherData.main.temp}ºF</p> : null}
                </div>
                <div className="weather">
                    {data.weatherData.weather ? <p>{data.weatherData.weather[0].main}</p> : null}
                </div>
                {data.weatherData.cod === '404' ? (
                    <p style={{ fontSize: '25px', color: 'crimson', fontWeight: '500' }}>{data.weatherData.message}</p>
                ) : (
                    <>
                    </>
                )}
                <div className="content-weather-another">
                    <div className="another-1">
                        <p>Wind Speed:</p> {data.weatherData.main ? <p style={{ marginLeft: 10 }}> {data.weatherData.wind.speed} Km/h</p> : null}
                    </div>
                    <div className="another-2">
                        <p>Humidity:</p> {data.weatherData.main ? <p style={{ marginLeft: 10 }}> {data.weatherData.main.humidity} g/m3</p> : null}
                    </div>
                </div>
                <div className="content-weather-another">
                    <div className="another-1">
                        <p>Country:</p> {data.weatherData.main ? <p style={{ marginLeft: 10 }}>{data.weatherData.sys.country}</p> : null}
                    </div>
                    <div className="another-2">
                        <p>Pressure:</p> {data.weatherData.main ? <p style={{ marginLeft: 10 }}> {data.weatherData.main.pressure}</p> : null}
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Content