"use client"
import { useCallback, useMemo, useState } from "react"
import { useSearchParams } from 'next/navigation'
import { AQX_P_432, F_D0047_009 } from './types';
import { formatDateTime } from "./utils";

export default function Page() {
  const searchParams = useSearchParams()
 
  const cwaApiKey = searchParams.get('cwaApiKey')
  const moenvApiKey = searchParams.get('moenvApiKey')
  const [weatherResponse, setWeatherResponse] = useState<F_D0047_009 | null>(null)
  const [aqiResponse, setAQIResponse] = useState<AQX_P_432 | null>(null)

  const fetchCWAData = useCallback(async () => {
    const res = await fetch(
      `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-009?Authorization=${cwaApiKey}&ElementName=3%E5%B0%8F%E6%99%82%E9%99%8D%E9%9B%A8%E6%A9%9F%E7%8E%87,%E6%BA%AB%E5%BA%A6,%E9%A2%A8%E9%80%9F,%E7%9B%B8%E5%B0%8D%E6%BF%95%E5%BA%A6,%E9%AB%94%E6%84%9F%E6%BA%AB%E5%BA%A6`, 
    )
    const data = await res.json()
    setWeatherResponse(data)
  }, [cwaApiKey]);

  const fetchAQI = useCallback(async () => {
    const res = await fetch(
      `https://data.moenv.gov.tw/api/v2/aqx_p_432?api_key=${moenvApiKey}`, 
    )
    const data = await res.json()
    setAQIResponse(data)
  }, [moenvApiKey]);

  const weather = useMemo(() => {
    return weatherResponse?.records.Locations[0].Location.find(location => location.LocationName === '竹北市')?.WeatherElement
  }, [weatherResponse])

  const aqi = useMemo(() => {
    return aqiResponse?.records.find(site => site.sitename === '新竹');
  }, [aqiResponse])

  return (
    <>
      <button onClick={() => {fetchCWAData(); fetchAQI();}}>Fetch</button>
      <div>{cwaApiKey}</div>
      <div>{moenvApiKey}</div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        {weather?.map((weatherElement, i) => {
          switch (weatherElement.ElementName) {
            case '溫度':
              return (
                <div key={i}>
                  <div>{weatherElement.ElementName}</div>
                  {weatherElement.Time.slice(0, 24).map((time, j) => <div key={`${i}-${j}`}>{`${formatDateTime(time.DataTime)} ${time.ElementValue[0].Temperature}`}&#176;C</div>)}
                </div>
              )
            case '體感溫度':
              return (
                <div key={i}>
                  <div>{weatherElement.ElementName}</div>
                  {weatherElement.Time.slice(0, 24).map((time, j) => <div key={`${i}-${j}`}>{`${time.ElementValue[0].ApparentTemperature}`}&#176;C</div>)}
                </div>
              )
            case '相對濕度':
              return (
                <div key={i}>
                  <div>{weatherElement.ElementName}</div>
                  {weatherElement.Time.slice(0, 24).map((time, j) => <div key={`${i}-${j}`}>{`${time.ElementValue[0].RelativeHumidity}%`}</div>)}
                </div>
              )
          }
        })}
      </div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        {weather?.map((weatherElement, i) => {
          switch (weatherElement.ElementName) {
            case '風速':
              return (
                <div key={i}>
                  <div>{weatherElement.ElementName}</div>
                  {weatherElement.Time.slice(0, 8).map((time, j) => <div key={`${i}-${j}`}>{`${formatDateTime(time.DataTime)} ${time.ElementValue[0].BeaufortScale}`}</div>)}
                </div>
              )
            case '3小時降雨機率':
              return (
                <div key={i}>
                  <div>{weatherElement.ElementName}</div>
                  {weatherElement.Time.slice(0, 8).map((time, j) => <div key={`${i}-${j}`}>{`${time.ElementValue[0].ProbabilityOfPrecipitation}%`}</div>)}
                </div>
              )
          }
        })}
      </div>
      <div>AQI</div>
      <div>{`${aqi?.aqi} ${aqi?.status}`}</div>
    </>
  )
}
