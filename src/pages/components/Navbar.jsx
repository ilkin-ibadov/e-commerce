import React from "react";
import { filterProducts } from "../Products";
import { useProducts } from "../../hooks/useProducts";
import { addActiveCategory } from "../../redux/activeCategorySlice";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addActiveCurrency } from "../../redux/activeCurrencySlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { toggleMiniCart } from "../../redux/toggleMiniCartSlice";

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { error, loading, data } = useProducts();
  const dispatch = useDispatch();
  const activeCurrency = useSelector((state) => state.activeCurrency.currency);
  const miniCartState = useSelector((state) => state.miniCartState.class);
  const cart = useSelector((state) => state.cart.cartProducts);
  const quantity = cart.reduce((total, { quantity }) => total + quantity, 0);
  const [currencyToggle, setCurrencyToggle] = useState("");

  const toggleCurrency = () => {
    if (currencyToggle === "") {
      setCurrencyToggle("active");
    } else if (currencyToggle === "active") {
      setCurrencyToggle("");
    }
  };

  // according to miniCartState, it will add classes to configure cart component's content to fit in minicart

  if (!loading) {
    let categories = [];
    let unique = [];
    data.category.products.map((product, index) => {
      categories.push(product.category);
      unique = [...new Set(categories)];
    });
    let symbol;
    let label;

    return (
      <div className="navContainer">
        <div className="container">
          <div className="Categories">
            <a
              href="#"
              onClick={() => {
                dispatch(addActiveCategory("all"));
                navigate("/");
              }}
            >
              all
            </a>
            {unique.map((category) => {
              return (
                <a
                  href="#"
                  onClick={() => {
                    dispatch(addActiveCategory(category));
                    navigate("/");
                  }}
                >
                  {category}
                </a>
              );
            })}
          </div>
          <div
            className="HomeIcon"
            onClick={() => {
              navigate("/");
            }}
          ></div>
          <div className="widthFix">
            <div className="Controls">
              <div
                onClick={toggleCurrency}
                className={`currency ${currencyToggle}`}
              >
                <input
                  placeholder={activeCurrency}
                  readOnly
                  className="currentOpt"
                  type="text"
                />
                <i class="fa-solid fa-chevron-down"></i>
                <div className="options">
                  {data.category.products[0].prices.map((price) => {
                    symbol = price.currency.symbol;
                    return (
                      <div
                        className="option"
                        onClick={() => {
                          dispatch(addActiveCurrency(price.currency.symbol));
                        }}
                      >
                        <div className="flexStart">
                          {symbol} {price.currency.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="cartIcon">
                <button
                  onClick={() => {
                    if (miniCartState === "" && pathname === '/') {
                      dispatch(toggleMiniCart("active"));
                    } else if (miniCartState === "active") {
                      dispatch(toggleMiniCart(""));
                    }

                    // navigate("/cart");
                  }}
                >
                  <i class="fa-solid fa-cart-shopping"></i>
                </button>
                {cart.length ? <div className="badge">{quantity}</div> : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
