import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useGlobalContext from "../../../hooks/use-context";
import { selectProducts } from "../../../redux/features/product-slice";
import ProductModal from "../modal/product-modal";
import ProductGrid from "./product-grid";
import ProductList from "./product-list";
import ShopSidebar from "./shop-sidebar";

import axios from "axios";
import { useRouter } from "next/router";
import jwtState from "../../../states/jwt";
import { useRecoilState } from "recoil";

const nav_tabs = [
  { id: "grid", active: true, icon: "fas fa-th" },
  { id: "list", icon: "fas fa-list-ul" },
];

async function getProducts(category, jwt) {
  const options = {
    method: "GET",
    url: "/api/products/" + category,
    headers: {
      Authorization: jwt,
    },
  };
  // console.log(options);
  try {
    const response = await axios(options);
    console.log(response.data);
    // return response.data;
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getRecommendProducts(category, jwt) {
  const options = {
    method: "GET",
    url: "/api/recommend/" + category,
    headers: {
      Authorization: jwt,
    },
  };

  try {
    const response = await axios(options);
    console.log(response.data);
    // return response.data;
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

const ShopProduct = ({ shop_right }) => {
  const [jwt, setJwt] = useRecoilState(jwtState);
  const router = useRouter();
  const [category, setCategory] = useState(router.query.category);
  console.log("test");
  console.log(router.query);

  const [items, setItems] = useState([]);
  const [loadCheck, setLoadCheck] = useState(0);
  // useEffect(() => {
  async function fetchData(category) {
    // if (!items) {
    if (category === "top" || category === "pants") {
      const res = await getProducts(category, jwt);
      setItems(res);
      console.log(res);
    } else if (category === "rtop" || category === "rpants") {
      const res = await getRecommendProducts(category, jwt);
      setItems(res);
      console.log(res);
    }

    // console.log(res);
    // }
  }
  if (category !== router.query.category) {
    setCategory(router.query.category);
    fetchData(router.query.category);
  }
  // }, []);

  // console.log(items);
  // const { items, handleSelectChange } = useGlobalContext();
  const { handleSelectChange } = useGlobalContext();
  const [showing, setShowing] = useState(0);
  const [isActive, setIsActive] = useState("grid");
  const [listShowing, setListShowing] = useState(0);
  const allProducts = useSelector(selectProducts)
    .map((item) => item.product)
    .flat();
  // console.log(items);
  // console.log(allProducts);

  const handleActive = (list) => {
    setIsActive(list);
  };

  return (
    <>
      <section className="shop__area pt-100 pb-100 shop_products">
        <div className="container">
          <div className="row">
            {!shop_right && (
              <div className="col-xl-3 col-lg-3 col-md-4">
                <ShopSidebar />
              </div>
            )}
            <div className="col-xl-9 col-lg-9 col-md-8">
              <div className="shop__content-area">
                <div className="shop__header d-sm-flex justify-content-between align-items-center mb-40">
                  <div className="shop__header-left">
                    <div className="show-text">
                      <span>
                        Showing 1–{isActive === "grid" ? showing : listShowing}{" "}
                        of 36 results
                      </span>
                    </div>
                  </div>
                  <div className="shop__header-right d-flex align-items-center justify-content-between justify-content-sm-end">
                    <div className="sort-wrapper mr-30 pr-25 p-relative">
                      <select onChange={handleSelectChange}>
                        <option defaultValue="1">Default Sorting</option>
                        <option defaultValue="2">Short by new</option>
                        <option defaultValue="3">Short by featured</option>
                        <option defaultValue="4">Short by price</option>
                      </select>
                    </div>
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                      {nav_tabs.map((tab, i) => {
                        return (
                          <li
                            key={i}
                            className="nav-item"
                            onClick={() => handleActive(tab.id)}
                          >
                            <a
                              className={`nav-link ${
                                tab.active ? "active" : ""
                              }`}
                              id={`pills-${tab.id}-tab`}
                              data-bs-toggle="pill"
                              href={`#pills-${tab.id}`}
                              role="tab"
                              aria-controls={`pills-${tab.id}`}
                              aria-selected={tab.active ? "true" : "false"}
                            >
                              <i className={tab.icon}></i>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-grid"
                    role="tabpanel"
                    aria-labelledby="pills-grid-tab"
                  >
                    <div className="row custom-row-10">
                      <ProductGrid
                        itemsPerPage={12}
                        items={items}
                        setShowing={setShowing}
                      />
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="pills-list"
                    role="tabpanel"
                    aria-labelledby="pills-list-tab"
                  >
                    <ProductList
                      itemsPerPage={5}
                      items={items}
                      setShowing={setListShowing}
                    />
                  </div>
                </div>
              </div>
            </div>

            {shop_right && (
              <div className="col-xl-3 col-lg-3 col-md-4">
                <ShopSidebar />
              </div>
            )}
          </div>
        </div>
      </section>
      {/* product modal start */}

      <ProductModal />
      {/* product modal end */}
    </>
  );
};

export default ShopProduct;
