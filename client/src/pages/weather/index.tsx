import { TinyArea } from '@ant-design/charts';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import { BsDropletFill } from "react-icons/bs"

const config = {
  xField: 'timePeriod',
  yField: 'value',
  smooth: true,
  height: 90,
  autoFit: true,
  // style: { padding: 12 },
  xAxis: {
    range: [0, 1],
  },
  yAxis: {
    range: [0, 1],
  },
  areaStyle: () => {
    return {
      fill: 'l(270) 0:rgba(255, 255, 255, 0.1) 0.4:rgba(126, 194, 243, 1) 1:#1890ff',
    };
  },
  // tooltip: {
  //   customContent: (title: any, items: any) => {
  //     return (
  //       <>
  //         <h5 style={{ marginTop: 16 }}>{title}</h5>sdsdds
  //         <ul style={{ paddingLeft: 0 }}>
  //           {items?.map((item: any, index: number) => {
  //             const { name, value, color } = item;
  //             return (
  //               <li
  //                 key={item.year}
  //                 className="g2-tooltip-list-item"
  //                 data-index={index}
  //                 style={{ marginBottom: 4, display: 'flex', alignItems: 'center' }}
  //               >
  //                 <span className="g2-tooltip-marker" style={{ backgroundColor: color }}>sd</span>
  //                 <span
  //                   style={{ display: 'inline-flex', flex: 1, justifyContent: 'space-between' }}
  //                 >
  //                   <span style={{ marginRight: 16 }}>{name}:</span>
  //                   <span className="g2-tooltip-list-item-value">{value}</span>
  //                 </span>
  //               </li>
  //             );
  //           })}
  //         </ul>
  //       </>
  //     );
  //   },
  // },
};

const Weather: React.FC = (): JSX.Element => {
  const [location, setLocation] = useState<{ lat: number, long: number }>();
  const [currentDay, setCurrentDay] = useState(0)
  const [selectDay, setSelectDay] = useState()

  const { isLoading, isFetching, isError, error, data } = useQuery({
    queryKey: ['get-all-users'],
    queryFn: () => {
      return axios.get("https://api.openweathermap.org/data/2.5/weather?q=tashkent&units=metric&appid=0f5ff8e3e16421b28a1e8c1dc7d270d3")
    },
  })


  // get current, hourly, minutly, dayly weather
  const { isFetching: loading, data: alldata } = useQuery({
    queryKey: ['get-all-weather', location],
    queryFn: () => {
      return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${location?.lat}&lon=${location?.long}&appid=4a61705f478c86cbfb898c0a02fc1b6c&units=metric&lang=en`)
    },
    onSuccess: (res) => {
      setCurrentDay(res?.data?.current?.dt)
      setSelectDay(res?.data?.current?.dt)
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
    getMyLocation();

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
    <div className="p-4 flex flex-col gap-8">
      {/* <div className="e-card w-1/3 mx-auto mt-5 p-4">
        <p>{data?.data?.name}</p>
        <div className="d-f">
          <h1>{Math.floor(data?.data?.main?.temp)} c</h1>
          <img src={`http://openweathermap.org/img/wn/${data?.data?.weather[0]?.icon}@4x.png`} className='w-25' alt={data?.data?.weather[0]?.main} />
        </div>
        <p>windy: {data?.data?.wind?.speed} m/s</p>
      </div> */}

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 e-card min-h-[280px] text-start p-4 py-6">
          <div className="font-bold text-xl">{alldata?.data?.timezone}</div>
          <div className="text-sm text-gray-500">{dayjs(currentDay * 1000).format("dddd DD MMM YYYY")}</div>

          <div className="d-f gap-6">
            <img src={`http://openweathermap.org/img/wn/${alldata?.data?.current?.weather[0]?.icon}@4x.png`} alt="" />
            <h2 className='text-7xl'>{Math.floor(alldata?.data?.current?.temp)}°C</h2>
            <div className="">
              <h3 className='font-semibold text-2xl' >{alldata?.data?.current?.weather[0]?.main}</h3>
              <p>Feels like: <b>{alldata?.data?.current?.feels_like}</b></p>
            </div>
          </div>

          <p>{alldata?.data?.current?.weather[0]?.description}</p>

          <div className="flex-between mt-4">
            <div className="">
              <p>Wind</p>
              <b>{alldata?.data?.current?.wind_speed} km/h</b>
            </div>
            <div className="">
              <p>Pressure</p>
              <b>{alldata?.data?.current?.pressure} mb</b>
            </div>
            <div className="">
              <p>Humidity</p>
              <b>{alldata?.data?.current?.humidity} %</b>
            </div>
            <div className="">
              <p>Dew pion</p>
              <b>{alldata?.data?.current?.dew_point}°</b>
            </div>
            <div className="">
              <p>Visibility</p>
              <b>{alldata?.data?.current?.visibility} km</b>
            </div>
          </div>


        </div>

        <div className="e-card min-h-[280px]">

        </div>
      </div>

      <div className="">
        <div className="d-f gap-4 mb-4 overflow-x-auto pb-2">
          {/* <div className="grid grid-cols-7 grid-rows-1 gap-4 mb-4 overflow-x-auto"> */}
          {
            alldata?.data?.daily?.map((e: any, i: number) => {
              const active = dayjs(((selectDay ?? currentDay) ?? 0) * 1000).format("MMM DD") === dayjs(e?.dt * 1000).format("MMM DD");
              return (
                <div onClick={() => setSelectDay(e?.dt)} className={`e-card min-h-[120px] cursor-pointer ${active ? "e-border min-w-[240px]" : "min-w-[140px]"}`}>
                  <p>{dayjs(e?.dt * 1000).format("MMM DD")}</p>
                  <div className={`flex-between pe-4 ps-1 mt-4`}>
                    <div className={`flex-between ${active ? "justify-start" : "w-full"}`}>
                      <img src={`http://openweathermap.org/img/wn/${e?.weather[0]?.icon}@4x.png`} alt="" className='w-14' />
                      <div className=""><p className='font-bold'>{Math.floor(e?.temp?.day)}</p><p className='font-bold'>{Math.floor(e?.temp?.night)}</p></div>
                    </div>
                    {active ? <div><h3 className='font-semibold text-xl' >{e?.weather[0]?.main}</h3>
                      <p className='d-f gap-1' ><BsDropletFill /> <b>%</b></p></div> : null}
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="e-card min-h-[320px] text-start p-4">
          <p className='text-lg font-semibold mb-3'>Hourly</p>
          <TinyArea  {...config} data={alldata?.data?.hourly?.map((e: any) => e?.temp)?.filter((e: any, i: number) => i < 24)} />
          <div className="flex-between">
            {
              alldata?.data?.hourly?.filter((e: any, i: number) => i < 24)?.map((e: any) => <span>{dayjs(e?.dt * 1000)?.format("H:mm")}</span>)
            }
          </div>
        </div>
      </div>


      <div className="grid grid-cols-4 gap-4">
        <div className=""><div className="e-card min-h-[240px]"></div></div>
        <div className=""><div className="e-card min-h-[240px]"></div></div>
        <div className=""><div className="e-card min-h-[240px]"></div></div>
        <div className=""><div className="e-card min-h-[240px]"></div></div>
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
