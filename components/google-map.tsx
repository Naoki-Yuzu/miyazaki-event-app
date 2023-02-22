import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import GoogleMapReact, { Coords } from 'google-map-react';
import { Location } from '../types/location';

const GoogleMap = ({className, setLocation, setLocationError, eventLocation}: {className: string | undefined, setLocation: Dispatch<SetStateAction<Location | undefined>> | null, setLocationError: Dispatch<SetStateAction<boolean>> | null, eventLocation:  Location | undefined | null;}) => {
  const [map, setMap] = useState<any>(null);
  const [maps, setMaps] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  let defaultLocation : Coords;

  if (eventLocation) {
    defaultLocation = {
      // イベント会場
      lat: eventLocation.lat, //緯度
      lng: eventLocation.lng, //経度
    };
  } else {
    defaultLocation = {
      // 宮崎駅
      lat: 31.915999212325794, //緯度
      lng: 131.43204464722203, //経度
    };
  }

  const getLocation = ({lat, lng} : {lat: number, lng: number}) => {
    if (eventLocation != null) {
    } else {
      if (marker) {
        marker.setMap(null);
      }
      const location = {
        lat,
        lng
      }
      setLocation!({
        lat,
        lng,
      });
      setLocationError!(false);
      setMarker(new maps.Marker({
        map,
        position: location,
      }));
    }

  }

  const handleApiLoaded = (object: any) => {
    if (eventLocation != null) {
      new object.maps.Marker({
            map: object.map,
            position: defaultLocation as Coords,
          });
    } else {
      setMap(object.map);
      setMaps(object.maps);
    }
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