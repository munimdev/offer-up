// @ts-nocheck
// "use client";
import React, { useState, useEffect, useCallback } from 'react';

import Link from "next/link";
import { useFetchCategories } from "@/hooks";

const SubNav = () => {
  const { data, isLoading } = useFetchCategories();
  const [visibleOptions, setVisibleOptions] = useState<typeof data>([]);
  const [hiddenOptions, setHiddenOptions] = useState<typeof data>([]);
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
const [index,setIndex] = useState<number | null>(6);
  const handleMouseEnter = useCallback((id: number) => {
    setHoveredItemId(id);
  }, [setHoveredItemId]);
  const handleMouseLeave = useCallback(() => {
    setHoveredItemId(null);
  }, [setHoveredItemId]);
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let index;
      if(screenWidth < 1050){
        index=0
      }
      else if (screenWidth < 1250) {
        index = 5;
      } else if (screenWidth >= 1250 && screenWidth <= 1500) {
        index = 6;
      } else if (screenWidth >= 1500 && screenWidth <= 1750)  {
        index = 7;
      }else{
        index=8
      }
  
      setIndex(index);
    };
  
    handleResize(); 
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoading, data]);


  return (
<nav className='md:flex md:flex-row md:justify-center md:flex-wrap hidden z-100 border-b border-gray-300' >


      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "row" }}>
      {index!==0&&data&&data
  // .filter((category) => category.children.length > 0)
  .slice(0, index)
  .map((category) => (
    <li
      key={category.id}
      onMouseEnter={() => handleMouseEnter(category.id)}
      onMouseLeave={handleMouseLeave}
      style={{ padding: "1rem 1.5rem", position: "relative",borderBottom: hoveredItemId === category.id ? "4px solid #63C3FE" : "none", }}
    >
      <Link href={`/search?category=${category.id}`}>
      <p className={`text-sm font-semibold text-gray-700 ${hoveredItemId === category.id ? 'active' : ''}`}>
  {category.name}
</p>

      </Link>
      {hoveredItemId === category.id && (
        <div style={{
          position: "absolute",
          top: "110%",
          display: "flex",
          flexDirection: "column",
          zIndex:150,
          // marginTop:'20px',
          backgroundColor: "#ffffff",
          minWidth: "250px", // Set a minimum width
          boxShadow: "0 0 5px rgba(0,0,0,0.5)", // Add a box shadow for a better visual separation
          border: "1px solid #ccc", // Add a border
        }}>
          {category.children.map((subCategory) => (
            <Link key={subCategory.id}href={`/search?category=${category.id}&child=${subCategory.id}`}  style={{ padding: "10px" }} className="p-3 hover:bg-gray-100">
              <p>{subCategory.name}</p>
            </Link>
          ))}
        </div>
      )}
    </li>
  ))}


       {index!==0&&data&& <li  
      //  style={{ margin: "1rem 1.5rem", position: "relative" }}
      style={{ padding: "1rem 1.5rem", position: "relative",borderBottom: hoveredItemId === 199 ? "4px solid #63C3FE" : "none", }}
         key={199}
         onMouseEnter={() => handleMouseEnter(199)}
         onMouseLeave={handleMouseLeave}
        >
          
          <Link   href={`/`}>
            <p className='text-sm font-semibold text-gray-700'>More</p>
          </Link>
          {hoveredItemId === 199 && (
              <div style={{
                position: "absolute",
                top: "110%",
                left: -160,
                display: "flex",
                flexDirection: "column",
                justifyContent:"center",
                
                backgroundColor: "#ffffff",
                minWidth: "250px", // Set a minimum width
                boxShadow: "0 0 5px rgba(0,0,0,0.5)", // Add a box shadow for a better visual separation
                border: "1px solid #ccc", // Add a border
              }}>
                 {data&&data
  // .filter((category) => category.children.length== 0)
  .slice(index,data.length)
  .map((category) => (
                  <Link key={category.id} href={`/search?category=${category.id}`} style={{ padding: "10px", }} className="p-3 hover:bg-gray-100">
                    <p>{category.name}</p>
                  </Link>
                ))}
              </div>
            )}
        </li>}
      </ul>
    </nav>
  );
};

export default SubNav;
