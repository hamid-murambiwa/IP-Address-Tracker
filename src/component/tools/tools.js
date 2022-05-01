import L from "leaflet";
import axios from 'axios';

function getIcon(_iconSize, iconType) {
    return L.icon({
      iconUrl: require(`../../style/icons/${ iconType }.png`),
      iconSize: [_iconSize],
    });
}


async function fetchData(ipAddress, setData, setMlat, setMlong) {
    await axios.get(`http://api.ipapi.com/${ipAddress}?access_key=82068fc4a6e4e8b1946186d3bea35f82`)
    .then(function (response) {
      console.log(response.data);
      setData(response);
      setMlat(response.data.latitude);
      setMlong(response.data.longitude);
    }).catch(function (error) {
      console.log(error);
    })
}

export default getIcon;
export { fetchData };