// @ts-nocheck
"use client";
import React, { useEffect,useState } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

import { useSearchParams } from "next/navigation";


import { useFetch } from "@/hooks";
import * as Queries from "@/utils/queries";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { RotatingLines } from  'react-loader-spinner'
import { useAtom, useAtomValue } from "jotai/react";
import { preferredDistanceAtom, locationAtom, zipCodeAtom,  locationNameAtom } from "@/utils/atoms";
console.log(locationAtom,'locationAtom')
// Define your map component
const MapComponent = withGoogleMap(props => {
  const mapOptions = {
    zoomControl: true, // Enable zoom control
    mapTypeControl: false, // Disable map type control
    streetViewControl: false, // Disable street view control
    fullscreenControl: false, // Disable fullscreen control
  };
  return(
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: props.location.lat, lng: props.location.lng }}
    defaultOptions={mapOptions}
  >
    {/* Add markers for each object in the markers array */}
    {props.markers.map(marker => (
      <Marker
        key={marker.id}
        position={{ lat: marker.locationLat, lng: marker.locationLng }}
        onMouseOver={() => {props.onMarkerHover(marker.id);console.log("onMouseOver")}}
      >
        {props.activeMarker === marker.id && (
         <InfoWindow onCloseClick={() => props.onMarkerHover(null)} onMouseOut={() => {console.log("working");props.onMarkerHover(null)}} options={{ pixelOffset: new window.google.maps.Size(0, -10) }}>
         <div style={{ width: '250px', height: '150px',textDecoration: 'none', border: 'none'  }}  >
         <Link href={`/product/${marker.id}`} style={{textDecoration: 'none', border: 'none' }}>
           <div style={{ height: '100px',textDecoration: 'none', border: 'none' }}>
             <img src={marker.images[0].imagePath} alt="" style={{ width: '250px', maxHeight: '100px' }} onMouseOut={(e) => e.stopPropagation()} />
           </div>
       
           <div style={{ padding: '5px', fontSize: '18px', fontWeight: 'bold' }} onMouseOut={(e) => e.stopPropagation()}>
             <h3>{marker.name}</h3>
             <p>${marker.price}</p>
           </div>
           </Link>
         </div>
       </InfoWindow>

        )}
      </Marker>
    ))}
  </GoogleMap>
)});

// Your main React component as a functional component
const MyMap = () => {
  const [activeMarker, setActiveMarker] = useState(null);
  const searchParams = useSearchParams();
  const condition = searchParams.get("condition");
  const priceFrom = searchParams.get("priceFrom");
  const priceTo = searchParams.get("priceTo");
  const category = searchParams.get("category");
  const childCategory = searchParams.get("child");
  const subCategory = searchParams.get("sub");
  const [locationName, setLocationName] = useAtom(locationNameAtom);
  const [location, setLocation] = useAtom(locationAtom);
  const preferredDistance = useAtomValue(preferredDistanceAtom);
  const [paginatedItems, setPaginatedItems] = useState<any>();
  const query = {
    searchKeyword: "",
    categoryId: category ? parseInt(category) : 0,
    ...childCategory && { childCategoryId: parseInt(childCategory) },
    ...subCategory && { subCategoryId: parseInt(subCategory) },
    distance: preferredDistance[0],
    locationLat: location.lat,
    locationLng: location.lng,
    conditionLookupId: condition ? condition.split(",").map(str => parseInt(str)) : [],
    priceFrom: priceFrom ? parseInt(priceFrom) : 0,
    priceTo: priceTo ? parseInt(priceTo) : 999999,
    // sortByLookupId: 0,
    pageSize: 50,
    pageIndex: 0,
  }

  const { data,isLoading, refetch } = useFetch({
    key: ["search-products", JSON.stringify(query)],
    fn: () =>
      Queries.searchItems(query),
  });

  useEffect(() => {
    if (data?.dataObject) {
      setPaginatedItems(data.dataObject)
    }
  }, [
    data
  ])

  const handleMarkerHover = (markerId) => {
    setActiveMarker(markerId);
  };


  return (
    <>
    {isLoading===true?<div className="flex justify-center">
        <RotatingLines
          strokeColor="#62C3FE"
          strokeWidth="5"
          animationDuration="0.75"
          width="56"
          visible={true}
        />
      </div>:  <MapComponent
    containerElement={<div style={{ height: '640px' }} />}
    mapElement={<div style={{ height: '100%' }} />}
    markers={data?.dataObject?.data} // Pass the markers array to the MapComponent
    activeMarker={activeMarker}
    onMarkerHover={handleMarkerHover}
    location={location}
  />}
  </>
  )
};

export default MyMap;
