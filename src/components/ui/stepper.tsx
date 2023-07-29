import React from "react";

type Props = {
  tabs: string[];
  activeTab?: number;
};

const Stepper: React.FC<Props> = ({ tabs, activeTab }) => {
  return (
    <ol className="w-full sm:flex sm:justify-between mb-5">
      {tabs.map((tab, idx) => (
        <li
          className={`text-lg flex items-center ${
            idx + 1 === activeTab ? "text-primary" : "text-gray-500"
          } space-x-2.5`}
        >
          <span
            className={`flex items-center justify-center w-6 h-6 border ${
              idx + 1 === activeTab ? "border-primary" : "border-gray-500"
            } rounded-full shrink-0`}
          >
            {idx + 1}
          </span>
          <span>
            <h3 className="font-medium leading-tight">{tab}</h3>
          </span>
        </li>
      ))}
    </ol>
  );
};

export default Stepper;
