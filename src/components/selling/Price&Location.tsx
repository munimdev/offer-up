import { useAtom } from "jotai";
import { itemFormDataAtom } from "@/utils/atoms";
import { useState, useEffect } from "react";
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

const DefaultLocation = { lat: 10, lng: 106 };
const DefaultZoom = 10;

const PriceLocation = () => {
  const [itemData, setItemData] = useAtom(itemFormDataAtom);
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);
  const [addresses, setAddresses] = useState({
    shortAddress: "",
    longAddress: "",
  });

  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  function handleResetLocation() {
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  }

  async function fetchAddressFromZip(zip) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=AIzaSyAC1zTJy_NTO4dbq253Pv1VOSz_MB8YRTI`
      );
      const data = response.data;
      if (data.status === "OK") {
        const shortAddress = `${data.results[0].address_components[2].short_name}, ${data.results[0].address_components[5].short_name}`;
        const longAddress = data.results[0].formatted_address;
        console.log({ shortAddress, longAddress });
        setAddresses({ shortAddress, longAddress });
      }
    } catch (error) {
      console.error("Error fetching address from ZIP:", error);
    }
  }

  async function fetchAddressFromLatLong(lat, lng) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAC1zTJy_NTO4dbq253Pv1VOSz_MB8YRTI`
      );
      const data = response.data;
      if (data.status === "OK") {
        const shortAddress = `${data.results[0].address_components[2].short_name}, ${data.results[0].address_components[5].short_name}`;
        const longAddress = data.results[0].formatted_address;
        // You can set these to state or use them as needed
        console.log({ shortAddress, longAddress });
        setAddresses({ shortAddress, longAddress });
      }
    } catch (error) {
      console.error("Error fetching address from lat-long:", error);
    }
  }

  function handleZipChange() {
    fetchAddressFromZip(itemData.zipcode);
  }

  function handleGetCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        fetchAddressFromLatLong(lat, lng);
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  }

  function handleMapLocationChange(lat, lng) {
    fetchAddressFromLatLong(lat, lng);
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
          value={itemData.price}
          onChange={(e) =>
            setItemData({ ...itemData, price: parseInt(e.target.value) })
          }
        />
      </div>
      <div className="flex items-center w-full max-w-md gap-1.5">
        <Label htmlFor="fix-price">Is Price Fixed</Label>
        <Switch
          checked={itemData.isPriceFixed}
          onCheckedChange={(e) => setItemData({ ...itemData, isPriceFixed: e })}
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
            value={itemData.zipcode}
            onChange={(e) =>
              setItemData({ ...itemData, zipcode: e.target.value })
            }
          />
          <Button onClick={handleZipChange}>Fetch Address</Button>
        </div>
      </div>
      <p className="text-xl text-center text-gray-200">OR</p>
      <Dialog>
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
            <MapPicker
              defaultLocation={defaultLocation}
              zoom={zoom}
              mapTypeId={"roadmap"}
              style={{ height: "600px", width: "900px" }}
              onChangeLocation={(lat, lng) => {
                handleChangeLocation(lat, lng);
                handleMapLocationChange(lat, lng);
              }}
              onChangeZoom={handleChangeZoom}
              apiKey="AIzaSyAC1zTJy_NTO4dbq253Pv1VOSz_MB8YRTI"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PriceLocation;
