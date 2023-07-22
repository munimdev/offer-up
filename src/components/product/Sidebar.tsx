import Rating from "@/components/misc/Rating";
import Meter from "@/components/icons/Meter";
import Fuel from "@/components/icons/Fuel";
import Message from "@/components/icons/Message";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Heart,
  Share2,
  MapPin,
  Globe,
  CalendarDays,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-2 p-5">
      <h3 className="text-3xl font-bold text-black">2020 BMW 7 Series Sedan</h3>
      <h3 className="text-3xl font-bold text-black">$53,500</h3>
      <div className="flex gap-2">
        <div className="flex items-ceneter">
          <Meter /> <span>32,764 Miles</span>
        </div>
        <div className="flex items-center">
          <Fuel /> <span>17/25 MPG</span>
        </div>
      </div>
      <div className="flex flex-wrap">
        <Badge className="mx-1 text-black bg-gray-300">Used</Badge>
        <Badge className="mx-1 text-black bg-gray-300">Used</Badge>
        <Badge className="mx-1 text-black bg-gray-300">Used</Badge>
        <Badge className="mx-1 text-black bg-gray-300">Used</Badge>
        <Badge className="mx-1 text-black bg-gray-300">Used</Badge>
      </div>
      <p>
        <span className="font-semibold">VIN</span> WBA7U2C05LCD52147
      </p>
      <p>Posted 24 days ago in Laurence Harbor, NJ</p>
      <p>Condition: Good</p>
      <p>Vehicles - Cars & Trucks</p>
      <Button className="rounded-full bg-primary hover:bg-primary">
        <Phone fill="#fff" size={18} className="mr-2" /> Call for Details
      </Button>
      <Button className="bg-white border rounded-full text-primary border-primary hover:bg-white">
        <Message className="mr-2" /> Chat
      </Button>
      <div className="flex justify-between text-primary">
        <span className="cursor-pointer">
          <Heart size={20} className="inline-block mr-2" /> Save
        </span>
        <span className="cursor-pointer">
          <Share2 className="inline-block mr-2" />
          Share
        </span>
      </div>
      <div className="flex gap-4 py-4 my-4 border-y">
        <div>
          <img src="images/Dealership.png" className="rounded-full" alt="" />
        </div>
        <div>
          <p className="font-bold text-black">Unique Auto Part</p>
          <div className="flex gap-1 text-xs">
            <span>3.8</span>
            <Rating rating={3.8} />
            <span>(Google Reviews)</span>
          </div>
          <p>Verified Auto Dealer</p>
        </div>
      </div>
      <div>
        <p className="text-primary">
          <MapPin className="inline" size={24} /> 2090 NJ-35, South Amboy, NJ
          08879, USA
        </p>
        <p className="mt-2 text-primary">
          <Globe className="inline" size={24} /> https://www.uniqueautomall.com/
        </p>
        <p className="mt-2">
          <Phone className="inline" />
          (732) 707-3223
        </p>
        <div className="mt-2">
          <CalendarDays className="inline" size={24} />{" "}
          <span className="inline-flex flex-col">
            <p className="font-semibold">Open tomorrow</p>
            <p>Hours 9:00 AM – 8:00 PM</p>
            <p className="font-semibold text-primary">See hours of operation</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
