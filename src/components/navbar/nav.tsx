// @ts-nocheck
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useFetchCategories } from "@/hooks";

const SubNav = () => {
  const { data, isLoading } = useFetchCategories();
  const [visibleOptions, setVisibleOptions] = useState<typeof data>([]);
  const [hiddenOptions, setHiddenOptions] = useState<typeof data>([]);
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

  // Function to show/hide options based on hover
  const handleMouseEnter = (id: number) => {
    setHoveredItemId(id);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  // useEffect to update visible and hidden options on data change
  useEffect(() => {
    if (!data) {
      setVisibleOptions([]);
      setHiddenOptions([]);
      return;
    }

    // Assuming data is an array of objects with a 'children' property
    const visible = data.filter((category) => category.children.length > 0);
    const hidden = data.filter((category) => category.children.length === 0);
    setVisibleOptions(visible);
    setHiddenOptions(hidden);
  }, [data]);

  return (
    <nav style={{ display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap" }}>
      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "row" }}>
        {visibleOptions.map((category) => (
          <li
            key={category.id}
            onMouseEnter={() => handleMouseEnter(category.id)}
            onMouseLeave={handleMouseLeave}
            style={{ margin: "0 8px", position: "relative" }}
          >
            <Link href={`/category/${category.id}`}>
              <p className={hoveredItemId === category.id ? "active" : ""} style={{ fontSize: "0.9rem" }}>
                {category.name}
              </p>
            </Link>
            {hoveredItemId === category.id && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#ffffff",
                minWidth: "250px", // Set a minimum width
                boxShadow: "0 0 5px rgba(0,0,0,0.5)", // Add a box shadow for a better visual separation
                border: "1px solid #ccc", // Add a border
              }}>
                {category.children.map((subCategory) => (
                  <Link key={subCategory.id} href={`/subcategory/${subCategory.id}`} style={{ padding: "5px", }}>
                    <p>{subCategory.name}</p>
                  </Link>
                ))}
              </div>
            )}
          </li>
        ))}

        <li>
          <Link href={`/category/`}>
            <p>More</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SubNav;
