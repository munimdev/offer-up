import React from "react";
import "./stepper.css";

type Props = {
  tabs: string[];
  activeTab?: number;
};

const Stepper: React.FC<Props> = ({ tabs, activeTab = 1 }) => {
  return (
    <ul className="w-full flex gap-8 sm:gap-14 mb-2 sm:mb-5 justify-center">
      {tabs.map((tab, idx) => {
        const isCurrentStep = idx + 1 === activeTab;
        const isPreviousStep = idx + 1 < activeTab;

        return (
          <li
            className={`text-lg flex items-center flex-col ${
              isCurrentStep || isPreviousStep ? "text-white" : "text-gray-500"
            }`}
            key={idx}
          >
            <span
              className={`stepper flex text-sm sm:text-lg items-center font-normal justify-center relative w-6 h-6 border  ${
                isCurrentStep || isPreviousStep ? "border-primary bg-primary " : "border-gray-500"
              } rounded-full shrink-0 ${isPreviousStep ? "previous-step" : ""}`}
            >
              {idx + 1}
            </span>
            <span>
              <h3
                className={`font-medium text-sm sm:text-lg leading-tight ${
                  isCurrentStep || isPreviousStep ? "text-primary" : "text-gray-500"
                }`}
              >
                {tab}
              </h3>
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default Stepper;
