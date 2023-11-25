import { useAtom } from "jotai";
import { itemFormDataAtom, updateItemFormDataAtom } from "@/utils/atoms";
import React, { useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotatingLines } from  'react-loader-spinner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MapPicker from "react-google-map-picker";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";


const DefaultLocation = { lat: 39.32002111110655, lng: -101.0586845610812 };
const DefaultZoom = 5;


type Props = {
    isUpdate?: boolean;
  };
const Location: React.FC<Props> = ({ isUpdate = false }) => {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [itemData, setItemData] = useAtom(itemFormDataAtom);
    const [isZipcodeFetching,setIsZipcodeFetching]= useState(false)
    const [updateItemData, setUpdateItemData] = useAtom(updateItemFormDataAtom);
    const [locationFetched, setLocationFetched] = useState(false);
    const [location, setLocation] = useState(DefaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);
    const [addresses, setAddresses] = useState({
      shortAddress: "",
      longAddress: "",
    });

    function handleChangeLocation(lat: number, lng: number) {
        setLocation({ lat: lat, lng: lng });
      }
    
      function handleChangeZoom(newZoom: number) {
        setZoom(newZoom);
      }
    
      function handleResetLocation() {
        setLocation({ ...DefaultLocation });
        setZoom(DefaultZoom);
      }
      const [zipCodeError, setZipCodeError] = useState<string | null>(null);
    
      async function fetchAddressFromZip(zip: string) {
        try {
            setIsZipcodeFetching(true)
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=AIzaSyAC1zTJy_NTO4dbq253Pv1VOSz_MB8YRTI`
          );
          const data = response.data;
          
          if (data.status === "OK") {
            const shortAddress = `${
              data.results[0].address_components[2].short_name
            }, ${
              data.results[0].address_components[
                data.results[0].address_components.length - 1
              ].short_name
            }`;
            const longAddress = data.results[0].formatted_address;
            console.log({ shortAddress, longAddress });
            isUpdate
              ? setUpdateItemData({
                  ...updateItemData!,
                  fullAddress: longAddress,
                  shortAddress: shortAddress,
                  locationLat: data.results[0].geometry.location.lat,
                  locationLng: data.results[0].geometry.location.lng,
                  zipCode: zip,
                })
              : setItemData({
                  ...itemData,
                  fullAddress: longAddress,
                  shortAddress: shortAddress,
                  locationLat: data.results[0].geometry.location.lat,
                  locationLng: data.results[0].geometry.location.lng,
                  zipcode: zip,
                });
            setLocationFetched(true);
            setIsZipcodeFetching(false)
            setZipCodeError(null);
            // console.log("successfully loaded")
          } else {
            // Handle incorrect zip code
            setZipCodeError("Invalid zip code. Please enter a valid one.");
            setIsZipcodeFetching(false);
            setLocationFetched(false);
            // console.log("successfully denied access")

          }
        } catch (error) {
          // Handle errors during the API call
          setZipCodeError("Error fetching address from ZIP. Please try again.");
          setIsZipcodeFetching(false);
          console.error("Error fetching address from ZIP:", error);
        }
      }
    
      async function fetchAddressFromLatLong(lat: string, lng: string) {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAC1zTJy_NTO4dbq253Pv1VOSz_MB8YRTI`
          );
          const data = response.data;
          if (data.status === "OK") {
            const addressComponents = data.results[0].address_components;
            const shortAddress = `${addressComponents[2].short_name}, ${addressComponents[addressComponents.length - 1].short_name}`;
            const longAddress = data.results[0].formatted_address;
            const postalCode = addressComponents.find((component : {types: String[]}) => component.types.includes('postal_code')).long_name;
            console.log({ shortAddress, longAddress });
            isUpdate
              ? setUpdateItemData({
                  ...updateItemData!,
                  fullAddress: longAddress,
                  shortAddress: shortAddress,
                  locationLat: data.results[0].geometry.location.lat,
                  locationLng: data.results[0].geometry.location.lng,
                  zipCode: postalCode,
                })
              : setItemData({
                  ...itemData,
                  fullAddress: longAddress,
                  shortAddress: shortAddress,
                  locationLat: data.results[0].geometry.location.lat,
                  locationLng: data.results[0].geometry.location.lng,
                  zipcode: postalCode,
                });
            setLocationFetched(true);
          }
        } catch (error) {
          console.error("Error fetching address from lat-long:", error);
        }
      }
    
      function handleZipChange() {
        fetchAddressFromZip(isUpdate ? updateItemData!.zipCode : itemData.zipcode);
      }
    
      function handleGetCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            fetchAddressFromLatLong(lat.toString(), lng.toString());
          },
          (error) => {
            console.error("Error getting current location:", error);
          }
        );
      }
    
      function handleMapLocationChange(lat: number, lng: number) {
        fetchAddressFromLatLong(lat.toString(), lng.toString());
      }
    
      const mapContainerStyle = {
        width: "900px",
        height: "600px",
      };
    
      const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyAC1zTJy_NTO4dbq253Pv1VOSz_MB8YRTI",
      });
    
      const [map, setMap] = React.useState<any>(null);
    
      const onLoad = React.useCallback(function callback(map: any) {
        const bounds = new window.google.maps.LatLngBounds(DefaultLocation);
        setLocation({
          lat: DefaultLocation.lat,
          lng: DefaultLocation.lng,
        });
        setMap(map);
      }, []);
    
      const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null);
      }, []);
    
      const changeMarkerPosition = () => {
        const newCenter = map.getCenter();
        setLocation({
          lat: newCenter.lat(),
          lng: newCenter.lng(),
        });
        // fetchAddressFromLatLong(
        //   newCenter.lat().toString(),
        //   newCenter.lng().toString()
        // );
      };
      function handleMapClick(event: any) {
        const clickedLat = event.latLng.lat();
        const clickedLng = event.latLng.lng();
        setLocation({
          lat: clickedLat,
          lng: clickedLng,
        });
        // fetchAddressFromLatLong(clickedLat.toString(), clickedLng.toString());
      }
    
      function handleZoomChange() {
        if (map) {
          const currentZoom = map.getZoom();
          setZoom(currentZoom);
        }
      }
    
  return (
   <>
 <div className="grid w-full max-w-md gap-1.5">
        <Label htmlFor="zip-code">Zip Code</Label>
        <div className="flex items-center gap-2 border border-gray rounded-3xl p-2 ">
          <Input
            type="text"
            id="zip-code"
            placeholder="Zip Code"
            className="font-medium outline-none border-none placeholder:text-gray placeholder:font-medium"
            value={
              isUpdate ? updateItemData!.zipCode : itemData.zipcode.toString()
            }
            onChange={(e) =>
              isUpdate
                ? setUpdateItemData({
                    ...updateItemData!,
                    zipCode: e.target.value,
                  })
                  
                : setItemData({
                    ...itemData,
                    zipcode: e.target.value,
                  })
            }
          />
          <div className="px-4 inline-flex items-center justify-center">
{itemData.zipcode.length >= 1 && (
  <>
    {isZipcodeFetching ? (
      <RotatingLines
        strokeColor="#62C3FE"
        strokeWidth="5"
        animationDuration="0.75"
        width="20"
        visible={true}
      />
    ) : (
      <p
        className="  text-sm font-medium focus-visible:outline-none focus-visible:ring-2  cursor-pointer text-blue-500 hover:text-blue-700 "
        onClick={handleZipChange}
      >
        Apply
      </p>
    )}
    
  </>
)}
</div>




        </div>
        
      </div>
      <p className="text-sm text-red-500 mt-2">{zipCodeError}</p>

      <p className="text-xl text-center text-gray-200">OR</p>
      <div className="flex w-full max-w-md gap-1.5">
        <Button
          variant="outline"
          // className="border text-primary border-primary"
          className="inline-flex items-center justify-center rounded-3xl text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-1/2 transition-colors duration-300 ease-in-out bg-white border border-primary text-primary hover:bg-gray-50"
          onClick={handleGetCurrentLocation}
        >
          Get my current Location
        </Button>
        <Dialog open={isMapOpen} onOpenChange={(e) => setIsMapOpen(e)}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              // className=" max-w-md border text-primary border-primary"
              className="inline-flex items-center justify-center rounded-3xl text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-1/2 transition-colors duration-300 ease-in-out bg-white border border-primary text-primary hover:bg-gray-50"
            >
              Pick Location From Map
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[59rem]">
            <DialogHeader>
              <DialogTitle>Pick Location From Map</DialogTitle>
              <DialogDescription>
                Pick your location to let interested buyers know where you are
              </DialogDescription>
            </DialogHeader>
            <div>
              {/* <MapPicker
              defaultLocation={location}
              zoom={zoom}
              style={{ height: "600px", width: "900px" }}
              onChangeLocation={(lat, lng) => {
                handleChangeLocation(lat, lng);
              }}
              onChangeZoom={handleChangeZoom}
              apiKey="AIzaSyAC1zTJy_NTO4dbq253Pv1VOSz_MB8YRTI"
            /> */}
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={location} // Use the location state as the center
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onDragEnd={changeMarkerPosition}
                onClick={handleMapClick}
                onZoomChanged={handleZoomChange}
              >
                <Marker position={location} />{" "}
                {/* Add a marker at the center */}
              </GoogleMap>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  handleMapLocationChange(location.lat, location.lng);
                  setIsMapOpen(false);
                }}
              >
                Get Location
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {locationFetched && (
        <div className="mt-4">
          <p className="text-base font-medium">
            {isUpdate ? updateItemData!.fullAddress : itemData.fullAddress}
            {/* ({location.lat.toFixed(3)},{location.lng.toFixed(3)}) */}
          </p>
        </div>
      )}
   </>
  )
}

export default Location