import { useRouter } from "next/router";
import React from "react";
import useGlobalContext from "../../../hooks/use-context";

const categoryData = [
  { title: "Top", link: "/shop/top" },
  { title: "Pants", link: "/shop/pants" },
  { title: "Recommend Top", link: "/shop/rtop" },
  { title: "Recommend Pants", link: "/shop/rpants" },
  // {title:"Music"},
  // {title:"Decoration"},
  // {title:"Chair"},
  // {title:"Lighting"},
];

const ProductCategories = () => {
  const { handleCategoryChange, categoryActive } = useGlobalContext();
  const router = useRouter();

  return (
    <>
      <div className="sidebar__widget mb-55">
        <div className="sidebar__widget-title mb-25">
          <h3>Product Categories</h3>
        </div>
        <div className="sidebar__widget-content">
          <div className="categories">
            <div className="categories__list">
              <ul>
                {categoryData.map((category, index) => (
                  <li
                    className={
                      categoryActive === category.title ? "active" : ""
                    }
                    onClick={() => {
                      handleCategoryChange(category.title);
                      router.push({
                        pathname: `${category.link}`,
                      });
                    }}
                    key={index}
                  >
                    {category.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCategories;
