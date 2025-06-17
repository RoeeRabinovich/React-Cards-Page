import { GoogleMap, Marker } from "@react-google-maps/api";
import { useState, useCallback } from "react";
import { useGoogleMaps } from "../../hooks/useGoogleMaps";

interface MapViewProps {
  address: {
    street: string;
    houseNumber: string | number;
    city: string;
    country: string;
    state: string;
    zip: string | number;
  };
}

const MapView = ({ address }: MapViewProps) => {
  const isLoaded = useGoogleMaps();
  const [center, setCenter] = useState({
    lat: 32.0853,
    lng: 34.7818,
  });
  const [isLoading, setIsLoading] = useState(true);

  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const handleLoad = useCallback(
    (map: google.maps.Map) => {
      const fullAddress = `${address.street} ${address.houseNumber}, ${address.city}, ${address.country}`;
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address: fullAddress }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const location = results[0].geometry.location;
          const newCenter = {
            lat: location.lat(),
            lng: location.lng(),
          };
          setCenter(newCenter);
          map.setCenter(newCenter);
        }
        setIsLoading(false);
      });
    },
    [address],
  );

  if (!isLoaded) {
    return (
      <div className="flex h-[400px] items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div className="text-gray-600 dark:text-gray-300">
          Loading Google Maps...
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      {isLoading && (
        <div className="bg-opacity-75 dark:bg-opacity-75 absolute inset-0 z-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-gray-600 dark:text-gray-300">Loading map...</div>
        </div>
      )}
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={center}
        onLoad={handleLoad}
      >
        {!isLoading && (
          <Marker
            position={center}
            title={`${address.street} ${address.houseNumber}, ${address.city}`}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapView;
