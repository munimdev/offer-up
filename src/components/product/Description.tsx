import React, { useState } from "react";

type Props = {
  data: string;
};

const Description: React.FC<Props> = ({ data }) => {
  const [isSeeMore, setIsSeeMore] = useState(data.length > 200);
  return (
    <div>
      <h3 className="text-3xl text-black font-bold">Description</h3>
      <p className="mt-3 overflow-hidden">
        {isSeeMore ? data.slice(0, 800) + "..." : data}
      </p>
      {isSeeMore ? (
        <div className="relative">
          <div className="absolute -top-5 left-0 w-full h-full bg-gradient-to-b from-transparent to-white"></div>
          <p
            className="text-primary font-semibold cursor-pointer"
            onClick={() => setIsSeeMore(false)}
          >
            See More
          </p>
        </div>
      ) : (
        <div className="relative">
          <p
            className="text-primary font-semibold cursor-pointer"
            onClick={() => setIsSeeMore(true)}
          >
            See Less
          </p>
        </div>
      )}
    </div>
  );
};

export default Description;
