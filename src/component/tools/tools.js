import L from 'leaflet';
import axios from 'axios';

function getIcon(_iconSize, iconType) {
  return L.icon({
    // eslint-disable-next-line
    iconUrl: require(`../../style/icons/${iconType}.png`),
    iconSize: [_iconSize],
  });
}

async function fetchData(ipAddress, setData, setMlat, setMlong) {
  await axios.get(`http://api.ipapi.com/${ipAddress}?access_key=82068fc4a6e4e8b1946186d3bea35f82`)
    .then((response) => {
      setData(response);
      setMlat(response.data.latitude);
      setMlong(response.data.longitude);
    }).catch((error) => {
    // eslint-disable-next-line
      console.log(error);
    });
}

export default getIcon;
export { fetchData };
