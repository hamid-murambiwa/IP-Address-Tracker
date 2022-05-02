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
  await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=70a2845e234b433c99c9186e4535c36d&ip=${ipAddress}`)
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
