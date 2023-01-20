import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

const GoogleMap = ({className}: {className: string | undefined}) => {
  const [map, setMap] = useState<any>(null);
  const [maps, setMaps] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);

  const defaultLocation = {
    // 宮崎駅
    lat: 31.915999212325794, //緯度
    lng: 131.43204464722203, //経度
  };

  const getLocation = ({lat, lng} : {lat: number, lng: number}) => {
    if (marker) {
      marker.setMap(null);
    }
    const location = {
      lat,
      lng
    }
    setMarker(new maps.Marker({
      map,
      position: location,
    }));
    console.log(location);
  }

  // const handleApiLoaded = ({map, maps} : {map: any, maps: any}) => {
  //   new maps.Marker({
  //     map,
  //     position: undefined,
  //   });
  // }

  const handleApiLoaded = (object: any) => {
    setMap(object.map);
    setMaps(object.maps);
  };

  return (
    <div className={`${className}`}>
      <GoogleMapReact 
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string }}
        defaultCenter={defaultLocation}
        defaultZoom={14}
        onClick={getLocation}
        onGoogleApiLoaded={handleApiLoaded}
      >
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;