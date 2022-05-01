import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import getIcon from './tools/tools.js';
import { fetchData } from './tools/tools.js';
import img from "./../style/images/next.png";
import './../style/page.css';

function Page() {
    const [latitude, setLatitude] = useState(51.505);
    const [longitude, setLongitude] = useState(-0.09);
    const [mLat, setMlat] = useState(51.505);
    const [mLong, setMlong] = useState(-0.09);
    const [data, setData] = useState({
      data: {latitude: 52.505, longitude: -0.09, city: 'London', country: 'UK', continent_name: 'Europe', region_name: 'Europe', zip: 645748}
    });
    const [query, setQuery] = useState('');
    const [ipAddress, setIpAddress] = useState('');
  
    console.log(data);
  
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setMlat(position.coords.latitude);
        setMlong(position.coords.longitude);
      });
      if (!query) return;
  
      fetchData(ipAddress, setData, setMlat, setMlong);
    }, [latitude, longitude, query, ipAddress]);
    
    const handleSubmit = (e) => {
      e.preventDefault();
      setQuery(true);
      setIpAddress(document.getElementById('ip-input').value);
    };
  
      return (
        <section id='main-con'>
          <div className="seacrh-container">
            <div className='title-container'>
              <h1>IP Address Tracker</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <input placeholder="Search for any IP Address or domain" id="ip-input" type="text" />
              <div className='btn-container'>
                <button type="submit" className="btn-sub"><img src={img} alt="Next" id='next' /></button>
              </div>
            </form>
            {data.data.zip !== 645748 ? (
              <div className='ip-info'>
                <div className="ip-info-container">
                  <p>COUNTRY FLAG</p>
                  <div className="ip-info-img-con">
                    <img src={data.data.location.country_flag} className="flag" alt="flag" />
                  </div>
                </div>
                <div className="ip-info-container">
                  <p>IP ADDRESS</p>
                  <h1>{data.data.ip}</h1>
                </div>
                <div className="ip-info-container">
                  <p>LOCATION</p>
                  <h1>{`${data.data.continent_name},`} {`${data.data.country_name},`} {`${data.data.region_name},`} {data.data.city}</h1>
                </div>
                <div className="ip-info-container zip">
                  <p>ZIP</p>
                  <h1>{data.data.zip}</h1>
                </div>
              </div>
            ) : null}
          </div>
          <div className="map-container">
            <MapContainer key={JSON.stringify([mLat, mLong])} id='map' center={[mLat, mLong]} zoom={15} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]} icon={getIcon(40, 'cur_loc')}>
              <Tooltip className='labelstyle' permanent position={[latitude, longitude]}>
                <div className="info-icon-container">
                  <h1 id='info-icon'>
                    &#8505; 
                  </h1>
                </div>
                <h2>Your current location</h2>
                <ul className='pop-info'>
                  <li>
                    <p>latitude: </p><h>{mLat}</h>
                  </li>
                  <li>
                    <p>longitude: </p><h>{mLong}</h>
                  </li>
                </ul>
              </Tooltip>
            </Marker>
            if (data) {
              <Marker position={[data.data.latitude, data.data.longitude]} icon={getIcon(40, 'ip_loc')}>
                <Tooltip className='labelstyle' permanent position={[data.data.latitude, data.data.longitude]}>
                <div className="info-icon-container">
                  <h1 id='info-icon'>
                    &#8505; 
                  </h1>
                </div>
                  <h1>IP ADDRESS LOCATION:</h1>
                  <ul className='pop-info'>
                    <li>
                      <p>Region: </p><h3>{data.data.region_name}</h3>
                    </li>
                    <li>
                      <p>City: </p><h3>{data.data.city}</h3>
                    </li>
                    <li>
                      <p>latitude: </p><h3>{data.data.latitude}</h3>
                    </li>
                    <li>
                      <p>longitude: </p><h3>{data.data.longitude}</h3>
                    </li>
                  </ul>
                </Tooltip>
              </Marker>
            }
            </MapContainer>
          </div>
        </section>
      );
}

export default Page;