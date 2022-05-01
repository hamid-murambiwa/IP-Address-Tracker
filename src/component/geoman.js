import { useEffect } from 'react';
import { useLeafletContext } from '@react-leaflet/core';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

const Geoman = () => {
  const context = useLeafletContext();

  useEffect(() => {
    const leafletContainer = context.layerContainer || context.map;

    leafletContainer.pm.addControls({
      drawMarker: false,
    });

    leafletContainer.pm.setGlobalOptions({ pmIgnore: false });

    leafletContainer.on('pm:create', (e) => {
      if (e.layer && e.layer.pm) {
        const shape = e;
        // eslint-disable-next-line
        console.log(e);

        shape.layer.pm.enable();

        // eslint-disable-next-line
        console.log(`object created: ${shape.layer.pm.getShape()}`);
        leafletContainer.pm
          .getGeomanLayers(true)
          .bindPopup('i am whole')
          .openPopup();
        leafletContainer.pm
          .getGeomanLayers()
          .map((layer, index) => layer.bindPopup(`I am figure N° ${index}`));
      }
    });

    leafletContainer.on('pm:remove', () => {
      // eslint-disable-next-line
      console.log('object removed');
    });

    return () => {
      leafletContainer.pm.removeControls();
      leafletContainer.pm.setGlobalOptions({ pmIgnore: true });
    };
  }, [context]);

  return null;
};

export default Geoman;
