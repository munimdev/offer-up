import { useAtom } from "jotai";
import { itemFormDataAtom, updateItemFormDataAtom } from "@/utils/atoms";
import React, { useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

const PriceLocation: React.FC<Props> = ({ isUpdate = false }) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [itemData, setItemData] = useAtom(itemFormDataAtom);
  const [updateItemData, setUpdateItemData] = useAtom(updateItemFormDataAtom);

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

  async function fetchAddressFromZip(zip: string) {
    try {
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
      }
    } catch (error) {
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
              zipCode: data.results[0].address_components[0].short_name,
            })
          : setItemData({
              ...itemData,
              fullAddress: longAddress,
              shortAddress: shortAddress,
              locationLat: data.results[0].geometry.location.lat,
              locationLng: data.results[0].geometry.location.lng,
              zipcode: data.results[0].address_components[0].short_name,
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

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(DefaultLocation);
    setLocation({
      lat: DefaultLocation.lat,
      lng: DefaultLocation.lng,
    });
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const changeMarkerPosition = () => {
    const newCenter = map.getCenter();
    setLocation({
      lat: newCenter.lat(),
      lng: newCenter.lng(),
    });
    fetchAddressFromLatLong(
      newCenter.lat().toString(),
      newCenter.lng().toString()
    );
  };

  const [locationFetched, setLocationFetched] = useState(false);
  function handleMapClick(event: any) {
  const clickedLat = event.latLng.lat();
  const clickedLng = event.latLng.lng();
  setLocation({
    lat: clickedLat,
    lng: clickedLng,
  });
  fetchAddressFromLatLong(clickedLat.toString(), clickedLng.toString());
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
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          placeholder="Price of the item"
          className="font-medium border-gray placeholder:text-gray placeholder:font-medium"
          value={isUpdate ? updateItemData!.price : itemData.price}
          onChange={(e) =>
            isUpdate
              ? setUpdateItemData({
                  ...updateItemData!,
                  price: parseInt(e.target.value),
                })
              : setItemData({ ...itemData, price: parseInt(e.target.value) })
          }
        />
      </div>
      <div className="flex items-center w-full max-w-md gap-1.5">
        <Label htmlFor="fix-price">Is Price Fixed</Label>
        <Switch
          checked={
            isUpdate ? updateItemData!.isPriceFixed : itemData.isPriceFixed
          }
          onCheckedChange={(e) =>
            isUpdate
              ? setUpdateItemData({
                  ...updateItemData!,
                  isPriceFixed: e,
                })
              : setItemData({ ...itemData, isPriceFixed: e })
          }
        />
      </div>
      <div className="grid w-full max-w-md gap-1.5">
        <Button
          variant="outline"
          className="border text-primary border-primary"
          onClick={handleGetCurrentLocation}
        >
          Get my current Location
        </Button>
        <p className="text-xl text-center text-gray-200">OR</p>
        <Label htmlFor="zip-code">Zip Code</Label>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            id="zip-code"
            placeholder="Zip Code"
            className="font-medium border-gray placeholder:text-gray placeholder:font-medium"
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
          <Button onClick={handleZipChange}>Fetch Address</Button>
        </div>
      </div>
      <p className="text-xl text-center text-gray-200">OR</p>
      <Dialog open={isMapOpen} onOpenChange={(e) => setIsMapOpen(e)}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full max-w-md border text-primary border-primary"
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
              <Marker position={location} /> {/* Add a marker at the center */}
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
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {locationFetched && (
        <div className="mt-4">
          <p className="text-base font-medium">
            {isUpdate ? updateItemData!.fullAddress : itemData.fullAddress} 
            {/* ({location.lat.toFixed(3)},{location.lng.toFixed(3)}) */}
          </p>
        </div>
      )}
    </>
  );
};

export default PriceLocation;
