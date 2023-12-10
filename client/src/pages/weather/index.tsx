import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Weather: React.FC = (): JSX.Element => {
  const [location, setLocation] = useState<{lat: number, long: number}>()

  const { isLoading, isFetching, isError, error, data } = useQuery({
    queryKey: ['get-all-users'],
    queryFn: () => {
      return axios.get("https://api.openweathermap.org/data/2.5/weather?q=tashkent&units=metric&appid=0f5ff8e3e16421b28a1e8c1dc7d270d3")
    },
  })


  // get current, hourly, minutly, dayly weather
  const { isFetching: loading, data: alldata } = useQuery({
    queryKey: ['get-all-weather'],
    queryFn: () => {
      return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${location?.lat}&lon=${location?.long}&appid=4a61705f478c86cbfb898c0a02fc1b6c&units=metric&lang=en`)
    },
    enabled: !!location?.lat && !!location.long
  })


  // search regions
  const { isFetching: isloading, data: regiondata } = useQuery({
    queryKey: ['get-all-weather'],
    queryFn: () => {
      return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/tashkent.json?access_token=pk.eyJ1IjoiemV2YWd1aWxsbyIsImEiOiJjbDZ3b2Y3MHMyZGQwM2tvZGs5ZHJoZDQ5In0.FtaNhsbnq0Y1aEWZo7IAxg&language=es&limit=5`)
    },
  })

useEffect(() => {
getMyLocation()
}, []);



function getMyLocation() {
  const location = window.navigator && window.navigator.geolocation

  if (location) {
    location.getCurrentPosition((position) => {
      console.log("latitude:", position.coords.latitude,
          "longitude:", position.coords.longitude,);

      setLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      })
    }, (error) => {
      // this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
    })
  }
}

console.log(alldata);


  return (
    <div className="">
      <div className="e-card w-1/3 mx-auto mt-5 p-4">
        <p>{data?.data?.name}</p>
        <div className="d-f">
          <h1>{Math.floor(data?.data?.main?.temp)} c</h1>
          <img src={`http://openweathermap.org/img/wn/${data?.data?.weather[0]?.icon}@4x.png`} className='w-25' alt={data?.data?.weather[0]?.main} />
        </div>
        <p>windy: {data?.data?.wind?.speed} m/s</p>

      </div>
    </div>
  );
};

export default Weather;

// 0f5ff8e3e16421b28a1e8c1dc7d270d3


// haftalik ob-havo
// https://api.openweathermap.org/data/2.5/forecast/daily?lat=41.250358&lon=69.3230355&appid=20571ab45c74dc2a1897b60c5b8047a1

// hozigi aftalik soatlik ob-havo
// https://api.open-meteo.com/v1/forecast?latitude=41.6941&longitude=44.8337&hourly=temperature_2m,rain,is_day&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,windspeed_10m_max&current_weather=true&windspeed_unit=mph&timezone=GMT



// `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&units=metric&appid=${appid}`
// `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${NUMBER_OF_DAYS=10}&units=metric&appid=${appid}`
// `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&cnt=${HOURS=23}&units=metric&appid=${appid}`
