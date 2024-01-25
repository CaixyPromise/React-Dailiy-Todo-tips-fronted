import {ApiWeather} from "./Api";
import React, {useEffect, useState} from "react";
import "./Weather.css";
import AirIcon from '@mui/icons-material/Air';
import moment from "moment/moment";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WeatherBlock from "./WeatherBlock";

interface WeatherProps
{
    country?: string,
    countryName?: string,
    Time?: string,
    temp?: string,
    wind?: string,
    humidity?: string,
    icon?: string,
    status?: string,
    lastUpdated?: string
    block?: boolean
}

export default function Weather()
{
    const [ state, setState ] = useState<WeatherProps>({
        country: "",
        countryName: "",
        Time: "",
        temp: "",
        wind: "",
        humidity: "",
        icon: "",
        status: "",
        block: false
    })

    const weatherDescriptions: {
        [key: string]: string;
    } = {
        "Clear": "晴朗",
        "Partly cloudy": "局部多云",
        "Cloudy": "多云",
        "Overcast": "阴天",
        "Mist": "薄雾",
        "Fog": "雾",
        "Freezing fog": "冻雾",
        "Light rain shower": "小阵雨",
        "Moderate or heavy rain shower": "中到大阵雨",
        "Light sleet showers": "小雨夹雪",
        "Moderate or heavy sleet showers": "中到大雨夹雪",
        "Light snow showers": "小雪",
        "Moderate or heavy snow showers": "中到大雪",
        "Patchy light rain with thunder": "零星小雨，有雷声",
        "Moderate or heavy rain with thunder": "中到大雨，有雷声",
        "Patchy light snow with thunder": "零星小雪，有雷声",
        "Moderate or heavy snow with thunder": "中到大雪，有雷声"
    };
    useEffect(() =>
    {
        ApiWeather().then(response =>
        {
            const responseState: WeatherProps = {};
            if (response)
            {
                const weather = response.current?.condition?.text;
                responseState.country = response.location.country;
                responseState.countryName = response.location.name;
                responseState.Time = response.location.localtime;
                responseState.temp = response.current.temp_c;
                responseState.wind = response.current.wind_kph;
                responseState.humidity = response.current.humidity;
                responseState.lastUpdated = response.current.last_updated
                responseState.icon = response.current.condition.icon;
                responseState.status =  weatherDescriptions[weather] || weather;
                console.log(responseState)
                setState(responseState)
            }
            else
            {
                responseState.block = true;
                setState(responseState)
            }
        })
    }, [])

    return (
        <>
            {(() =>
            {
                if (!state.block)
                {
                    return (
                        <section className="weather-container">
                            <div className="container-top">
                                <div>
                                    <h1 className="weather-title text-white">今日</h1>
                                    <p className="paragraph" style={{ color: "#6D28D9" }}>
                                        {moment(state.Time).format("YYYY-MM-DD")}
                                    </p>
                                </div>
                                <div>
                                    <p className="font-bold" style={{ color: "#6D28D9", paddingLeft: "20px" }}>
                                        {`当地时间: ${moment(state.Time).format("HH:mm")}`}
                                    </p>
                                    <p className="font-bold" style={{ color: "#6D28D9", paddingLeft: "20px" }}>
                                        上次更新时间: <span>{moment(state.lastUpdated).format("HH:mm")}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="container-mid">
        <span className="weather-temp-main text-violet-700">
          <span className="weather-tepm text-slate-800"  title="气温">{state.temp}</span>°C
        </span>
                                <img
                                    width="220"
                                    height="220"
                                    src={state.icon}
                                    alt={`时区昼夜情况 ${state.country} ${state.countryName}`}
                                />
                            </div>
                            <div className="container-bot">
                                <p className="paragraph winds" title="天气定位">
                                    <LocationOnIcon className="iconsWeather"/>{state.countryName}
                                </p>

                            </div>
                            <div className="container-bot">
                                <p className="paragraph winds" title="天气">
                                    <AcUnitIcon className="iconsWeather"/>{state.status}
                                </p>
                            </div>
                            <div className="container-bot">
                                <p className="paragraph winds" title="风力">
                                    <AirIcon className="iconsWeather"/> {state.wind}
                                </p>
                            </div>
                            <div className="container-bot">
                                <p className="paragraph winds" title="湿度">
                                    <WaterDropIcon className="iconsWeather"/> {state.humidity}
                                </p>
                            </div>
                        </section>
                    )
                }
                else
                {
                    return (
                        <WeatherBlock/>
                    )
                }
            })()}
        </>
    )
}
