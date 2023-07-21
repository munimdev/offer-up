"use client";

import React from "react";
import Slider from "@/components/product/Slider";
import Sidebar from "@/components/product/Sidebar";
import Description from "@/components/product/Description";
import { Badge } from "@/components/ui/badge";
import { Check, Heart, Flag, Share2 } from "lucide-react";

type TDashboard = {};

const description =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. In necessitatibus harum inventore corrupti dolorem natus assumenda laudantium atque sunt rerum error sint facere iste quidem eius ex, provident facilis cum, voluptatibus excepturi neque similique earum culpa? Rerum veritatis architecto aut assumenda non recusandae odio provident, totam dignissimos, dolores error quasi delectus, animi nihil autem veniam eaque ducimus voluptate. Vitae, tempora eveniet. Temporibus quae quaerat aut amet blanditiis recusandae facere facilis optio, veniam eos eveniet officiis iste dicta rerum odit mollitia? Eveniet maiores placeat quam modi ipsa ipsum vero vel ab voluptates possimus accusamus eligendi neque iure, nobis, molestiae debitis mollitia ratione nam atque temporibus deleniti? Aliquid temporibus officiis modi doloribus, consectetur iste atque nihil. Quos laborum, ad explicabo voluptatibus praesentium saepe quibusdam fugit, incidunt cumque tempora asperiores quas modi, corrupti temporibus magnam. Maxime a ratione similique excepturi beatae laudantium quas saepe eaque! Unde voluptatibus facere blanditiis eligendi natus. Sit quas ea consectetur est ducimus dolore id tempore fugiat ipsam nulla neque natus, dolorem distinctio minima amet libero facere veniam voluptas facilis, et, dicta accusamus autem itaque perferendis? Eaque aliquid impedit a porro reiciendis maxime non quis, temporibus deserunt, fugit, unde nemo corrupti voluptatum. Eligendi repudiandae tempora architecto repellat hic alias sed excepturi ratione, in reprehenderit laudantium earum eveniet ipsam dolores nostrum perferendis illo, minus vel. Rerum earum unde optio? Ea dolore eveniet vitae modi, molestiae, ipsum nisi esse doloribus voluptatem iure repudiandae? Dolores placeat cum perspiciatis, quibusdam voluptatibus, vel amet natus, recusandae quia nostrum possimus provident quidem atque repudiandae. Laborum, necessitatibus quis reiciendis laboriosam incidunt vitae pariatur itaque excepturi, aliquid exercitationem omnis saepe culpa ipsa ex officiis ad. Nulla aliquam explicabo fugiat nam amet consectetur alias odit quasi quaerat minima. Quasi tenetur eos quod eligendi consequatur itaque autem esse distinctio quas, labore beatae voluptas adipisci. Magni, libero! Natus exercitationem repudiandae in saepe eaque rem eum. Voluptates quos possimus quam tenetur non atque maiores natus doloremque porro, odit ea ad delectus perferendis aspernatur illo, nisi sit placeat! Cum delectus dolorem sed voluptates? Voluptatem labore amet dolorem, sequi, laborum repudiandae fugit quis vitae perferendis neque optio, quibusdam id earum dicta praesentium nostrum vel repellendus cum modi cumque aliquid! Eligendi possimus quas omnis mollitia vel, optio rem tempora quo et deserunt repellendus, fuga veniam dolorum dolor! Modi at excepturi velit saepe, dolorem similique cupiditate est iusto enim mollitia doloribus temporibus quis soluta minus, cum ab. Sed, corporis dolor, sequi consequatur assumenda placeat, fuga maiores quidem quas nemo aperiam nihil beatae in corrupti perspiciatis aliquam tenetur minima? Suscipit recusandae quaerat animi fuga voluptas nobis, tempora porro quidem beatae excepturi reprehenderit doloremque temporibus sequi quae quo fugit saepe esse in! Tempora obcaecati, quisquam, consequatur explicabo fugiat repellat, velit provident soluta corrupti voluptatibus dicta illo iusto esse commodi minus nemo aliquid possimus. Ducimus nulla dignissimos cum, reiciendis nam voluptatibus nesciunt sequi! Illo similique laudantium quae in quibusdam rem adipisci doloremque reiciendis, accusantium obcaecati possimus deleniti? Ad a commodi, eligendi ipsa reiciendis neque porro, quod ullam, pariatur nam est illum assumenda qui repudiandae distinctio. Veniam, provident eos?";

const Product: React.FC<TDashboard> = ({}) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-8/12 lg:w-9/12">
          <div>
            <Slider />
          </div>

          <div className="border-y p-4 my-4">
            <h3 className="text-3xl text-black font-bold">
              Vehicle History Report
            </h3>
            <div className="pl-3">
              <img src="images/Dealership.png" alt="" />
            </div>
          </div>
          <div className="border-b p-4 my-4">
            <h3 className="text-3xl text-black font-bold">Typical Features</h3>
            <p className="my-3">
              Contact the seller to confirm vehicle details
            </p>
            <div className="flex gap-10 flex-wrap">
              <p>
                {" "}
                <Check className="inline" /> AC
              </p>
              <p>
                {" "}
                <Check className="inline" /> Alloy Wheels
              </p>
              <p>
                {" "}
                <Check className="inline" /> Rims
              </p>
              <p>
                {" "}
                <Check className="inline" /> Hybrid
              </p>
              <p>
                {" "}
                <Check className="inline" /> 4x4
              </p>
            </div>
          </div>
          <div className="border-b p-4 my-4">
            <Description data={description} />
          </div>
          <div className="border-b p-4 my-4">
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-gray-300 text-black mx-1 cursor-pointer hover:text-white">
                <Heart className="inline mr-2" size={16} /> Save
              </Badge>
              <Badge className="bg-gray-300 text-black mx-1  cursor-pointer hover:text-white">
                <Flag className="inline mr-2" size={16} /> Report
              </Badge>
              <Badge className="bg-gray-300 text-black mx-1  cursor-pointer hover:text-white">
                <Share2 className="inline mr-2" size={16} /> Share
              </Badge>
            </div>
          </div>
        </div>
        <div className="w-full md:w-6/12 lg:w-3/12">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Product;
