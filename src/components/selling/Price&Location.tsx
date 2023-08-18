import { useAtom } from "jotai";
import { itemFormDataAtom } from "@/utils/atoms";

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
import { useState } from "react";

const DefaultLocation = { lat: 10, lng: 106 };
const DefaultZoom = 10;

const PriceLocation = () => {
  const [itemData, setItemData] = useAtom(itemFormDataAtom);
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

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
      <Button variant="outline" className="border text-primary border-primary">Get my current Location</Button>
      <p className="text-xl text-center text-gray-200">OR</p>
        <Label htmlFor="price">Zip Code</Label>
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
      </div>
      <p className="text-xl text-center text-gray-200">OR</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full max-w-md border text-primary border-primary">Pick Location From Map</Button>
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
              onChangeLocation={handleChangeLocation}
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
