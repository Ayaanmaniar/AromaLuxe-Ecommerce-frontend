import React, { useEffect, useState } from "react";
import "./HeaderFooter.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  // ==========================================
  // GET USER FROM LOCAL STORAGE
  // ==========================================

  const getUserFromStorage = () => {

    try {

      const savedUser =
        localStorage.getItem("loginUser");

      if (!savedUser) {
        return null;
      }

      return JSON.parse(savedUser);

    } catch (error) {

      console.error(
        "Unable to read login user:",
        error
      );

      return null;

    }

  };


  // ==========================================
  // GET CART FROM LOCAL STORAGE
  // ==========================================

  const getCartFromStorage = () => {

    try {

      const savedCart =
        localStorage.getItem("cart");

      if (!savedCart) {
        return [];
      }

      const parsedCart =
        JSON.parse(savedCart);

      if (!Array.isArray(parsedCart)) {
        return [];
      }

      return parsedCart;

    } catch (error) {

      console.error(
        "Unable to read cart:",
        error
      );

      return [];

    }

  };


  // ==========================================
  // USER STATE
  // ==========================================

  const [user, setUser] = useState(() => {
    return getUserFromStorage();
  });


  // ==========================================
  // CART STATE
  // ==========================================

  const [cart, setCart] = useState(() => {
    return getCartFromStorage();
  });


  // ==========================================
  // CART OPEN STATE
  // ==========================================

  const [cartOpen, setCartOpen] =
    useState(false);


  // ==========================================
  // REFRESH CART
  // ==========================================

  const refreshCart = () => {

    const latestCart =
      getCartFromStorage();

    setCart(latestCart);

  };


  // ==========================================
  // REFRESH USER
  // ==========================================

  const refreshUser = () => {

    const latestUser =
      getUserFromStorage();

    setUser(latestUser);

  };


  // ==========================================
  // ALL EVENTS
  // ==========================================

  useEffect(() => {

    // Initial load
    refreshCart();
    refreshUser();


    // ========================================
    // CART UPDATED EVENT
    // ========================================

    const handleCartUpdated = () => {

      refreshCart();

    };


    // ========================================
    // OPEN CART EVENT
    // ========================================

    const handleOpenCart = () => {

      refreshCart();

      setCartOpen(true);

    };


    // ========================================
    // LOGIN USER UPDATED EVENT
    // ========================================

    const handleLoginUserUpdated = () => {

      refreshUser();

    };


    // ========================================
    // LOGOUT EVENT
    // ========================================

    const handleLogout = () => {

      refreshUser();

    };


    // ========================================
    // BROWSER STORAGE EVENT
    // ========================================

    const handleStorage = (event) => {

      // Cart changed
      if (event.key === "cart") {

        refreshCart();

      }


      // Login user changed
      if (event.key === "loginUser") {

        refreshUser();

      }

    };


    // ========================================
    // ADD EVENT LISTENERS
    // ========================================

    window.addEventListener(
      "cartUpdated",
      handleCartUpdated
    );

    window.addEventListener(
      "openCartDrawer",
      handleOpenCart
    );

    window.addEventListener(
      "loginUserUpdated",
      handleLoginUserUpdated
    );

    window.addEventListener(
      "logoutUser",
      handleLogout
    );

    window.addEventListener(
      "storage",
      handleStorage
    );


    // ========================================
    // CLEANUP
    // ========================================

    return () => {

      window.removeEventListener(
        "cartUpdated",
        handleCartUpdated
      );

      window.removeEventListener(
        "openCartDrawer",
        handleOpenCart
      );

      window.removeEventListener(
        "loginUserUpdated",
        handleLoginUserUpdated
      );

      window.removeEventListener(
        "logoutUser",
        handleLogout
      );

      window.removeEventListener(
        "storage",
        handleStorage
      );

    };

  }, []);


  // ==========================================
  // SAVE CART
  // ==========================================

  const saveCart = (updatedCart) => {

    try {

      // Save cart
      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );


      // Update state
      setCart(updatedCart);


      // Notify other components
      window.dispatchEvent(
        new Event("cartUpdated")
      );

    } catch (error) {

      console.error(
        "Unable to save cart:",
        error
      );

    }

  };


  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const increaseQuantity = (id) => {

    const updatedCart = cart.map(
      (item) => {

        if (
          String(item.id) ===
          String(id)
        ) {

          return {
            ...item,

            quantity:
              Number(item.quantity || 0) + 1
          };

        }

        return item;

      }
    );


    saveCart(updatedCart);

  };


  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const decreaseQuantity = (id) => {

    const updatedCart = cart
      .map((item) => {

        if (
          String(item.id) ===
          String(id)
        ) {

          return {
            ...item,

            quantity:
              Number(item.quantity || 0) - 1
          };

        }

        return item;

      })
      .filter(
        (item) =>
          Number(item.quantity || 0) > 0
      );


    saveCart(updatedCart);

  };


  // ==========================================
  // DELETE PRODUCT
  // ==========================================

  const deleteProduct = (id) => {

    const updatedCart =
      cart.filter(
        (item) =>
          String(item.id) !==
          String(id)
      );


    saveCart(updatedCart);

  };


  // ==========================================
  // CART COUNT
  // ==========================================

  const cartCount = cart.reduce(
    (total, item) => {

      return (
        total +
        Number(item.quantity || 0)
      );

    },
    0
  );


  // ==========================================
  // CART TOTAL
  // ==========================================

  const cartTotal = cart.reduce(
    (total, item) => {

      const price = Number(
        String(item.price || "")
          .replace(/[^0-9]/g, "")
      );


      const quantity =
        Number(item.quantity || 0);


      return (
        total +
        price * quantity
      );

    },
    0
  );


  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {

    // Remove logged-in user
    localStorage.removeItem(
      "loginUser"
    );


    // Update Header immediately
    setUser(null);


    // Notify other components
    window.dispatchEvent(
      new Event("logoutUser")
    );


    alert(
      "Logout successfully"
    );


    navigate("/login");

  };


  // ==========================================
  // CHECKOUT
  // ==========================================

  const proceedToCheckout = () => {

    if (cart.length === 0) {

      alert(
        "Your cart is empty."
      );

      return;

    }


    setCartOpen(false);

    navigate("/checkout");

  };


  // ==========================================
  // RETURN
  // ==========================================

  return (
    <>

      {/* ======================================
          TOP BAR
      ====================================== */}

      <div className="top-bar">

        <div className="container">

          <div className="row align-items-center">

            <div className="col-md-6 top-contact">

              <span>

                <i className="fa-solid fa-envelope"></i>

                {" "}info@aromaluxe.com

              </span>


              <span className="ms-4">

                <i className="fa-solid fa-phone"></i>

                {" "}+92 300 1234567

              </span>

            </div>


            <div className="col-md-6 text-end social-icons">

              <a href="#">

                <i className="fab fa-facebook-f"></i>

              </a>


              <a href="#">

                <i className="fab fa-instagram"></i>

              </a>


              <a href="#">

                <i className="fab fa-x-twitter"></i>

              </a>


              <a href="#">

                <i className="fab fa-youtube"></i>

              </a>

            </div>

          </div>

        </div>

      </div>


      {/* ======================================
          NAVBAR
      ====================================== */}

      <nav className="navbar navbar-expand-lg luxury-navbar sticky-top">

        <div className="container">


          {/* LOGO */}

          <Link
            className="navbar-brand brand-logo"
            to="/"
          >

            Aroma<span>Luxe</span>

          </Link>


          {/* MOBILE BUTTON */}

          <button
            className="navbar-toggler bg-warning"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >

            <span className="navbar-toggler-icon"></span>

          </button>


          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarContent"
          >


            {/* NAV LINKS */}

            <ul className="navbar-nav mx-auto">

              <li className="nav-item">

                <Link
                  className="nav-link active"
                  to="/"
                >

                  Home

                </Link>

              </li>


              <li className="nav-item">

                <Link
                  className="nav-link"
                  to="/product"
                >

                  Products

                </Link>

              </li>


              <li className="nav-item">

                <Link
                  className="nav-link"
                  to="/contact"
                >

                  Contact

                </Link>

              </li>

            </ul>


            {/* =================================
                NAV ICONS
            ================================= */}

            <div className="nav-icons">


              {/* SEARCH */}

              <a
                href="#"
                aria-label="Search"
              >

                <i className="fa-solid fa-magnifying-glass"></i>

              </a>


              {/* WISHLIST */}

              <a
                href="#"
                aria-label="Wishlist"
              >

                <i className="fa-regular fa-heart"></i>

              </a>


              {/* =================================
                  CART
              ================================= */}

              <button
                type="button"
                className="header-cart-btn"
                onClick={() => {

                  refreshCart();

                  setCartOpen(true);

                }}
                aria-label="Open shopping cart"
              >

                <i className="fa-solid fa-cart-shopping"></i>


                {cartCount > 0 && (

                  <span className="cart-count">

                    {cartCount}

                  </span>

                )}

              </button>


              {/* =================================
                  USER
              ================================= */}

              {user ? (

                <div className="m-2 dropdown d-inline-block">

                  <button
                    className="btn btn-warning text-dark dropdown-toggle text-uppercase"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >

                    👤 {user.fullname}

                  </button>


                  <ul className="dropdown-menu dropdown-menu-end">

                    <li>

                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={logout}
                      >

                        Logout

                      </button>

                    </li>

                  </ul>

                </div>

              ) : (

                <Link
                  to="/login"
                  aria-label="Login"
                >

                  <i className="fa-regular fa-user"></i>

                </Link>

              )}

            </div>

          </div>

        </div>

      </nav>


      {/* ======================================
          CART OVERLAY
      ====================================== */}

      {cartOpen && (

        <div
          className="cart-overlay"
          onClick={() =>
            setCartOpen(false)
          }
        ></div>

      )}


      {/* ======================================
          CART DRAWER
      ====================================== */}

      <div
        className={
          `cart-drawer ${
            cartOpen
              ? "cart-drawer-show"
              : ""
          }`
        }
      >


        {/* ==================================
            DRAWER HEADER
        ================================== */}

        <div className="cart-drawer-header">

          <div>

            <h3>
              Shopping Cart
            </h3>

            <span>
              {cartCount} Item(s)
            </span>

          </div>


          <button
            type="button"
            className="cart-close-btn"
            onClick={() =>
              setCartOpen(false)
            }
            aria-label="Close cart"
          >

            <i className="fa-solid fa-xmark"></i>

          </button>

        </div>


        {/* ==================================
            DRAWER BODY
        ================================== */}

        <div className="cart-drawer-body">

          {cart.length === 0 ? (

            <div className="drawer-empty">

              <i className="fa-solid fa-cart-shopping"></i>

              <h4>
                Your Cart is Empty
              </h4>

              <p>
                Add products to your cart to continue.
              </p>

            </div>

          ) : (

            cart.map((item) => (

              <div
                className="drawer-product"
                key={item.id}
              >


                {/* PRODUCT IMAGE */}

                <div className="drawer-product-image">

                  <img
                    src={item.image}
                    alt={item.title}
                  />

                </div>


                {/* PRODUCT INFO */}

                <div className="drawer-product-info">

                  <h4>
                    {item.title}
                  </h4>


                  {/* SINGLE PRICE */}

                  <p>

                    Rs.{" "}

                    {Number(
                      String(item.price || "")
                        .replace(
                          /[^0-9]/g,
                          ""
                        )
                    ).toLocaleString()}

                  </p>


                  {/* =================================
                      QUANTITY CONTROLS
                  ================================= */}

                  <div className="drawer-quantity-controls">


                    {/* MINUS */}

                    <button
                      type="button"
                      className="quantity-btn"
                      onClick={() =>
                        decreaseQuantity(
                          item.id
                        )
                      }
                    >

                      <i className="fa-solid fa-minus"></i>

                    </button>


                    {/* QUANTITY */}

                    <span className="quantity-number">

                      {item.quantity}

                    </span>


                    {/* PLUS */}

                    <button
                      type="button"
                      className="quantity-btn"
                      onClick={() =>
                        increaseQuantity(
                          item.id
                        )
                      }
                    >

                      <i className="fa-solid fa-plus"></i>

                    </button>

                  </div>


                  {/* PRODUCT TOTAL */}

                  <strong>

                    Rs.{" "}

                    {(
                      Number(
                        String(
                          item.price || ""
                        ).replace(
                          /[^0-9]/g,
                          ""
                        )
                      ) *
                      Number(
                        item.quantity || 0
                      )
                    ).toLocaleString()}

                  </strong>

                </div>


                {/* =================================
                    DELETE
                ================================= */}

                <button
                  type="button"
                  className="drawer-delete-btn"
                  onClick={() =>
                    deleteProduct(
                      item.id
                    )
                  }
                  title="Remove product"
                  aria-label="Remove product"
                >

                  <i className="fa-solid fa-trash"></i>

                </button>

              </div>

            ))

          )}

        </div>


        {/* ==================================
            DRAWER FOOTER
        ================================== */}

        {cart.length > 0 && (

          <div className="cart-drawer-footer">


            {/* SUBTOTAL */}

            <div className="drawer-subtotal">

              <span>
                Subtotal
              </span>


              <strong>

                Rs.{" "}

                {cartTotal.toLocaleString()}

              </strong>

            </div>


            {/* CHECKOUT */}

            <button
              type="button"
              className="drawer-checkout-btn"
              onClick={
                proceedToCheckout
              }
            >

              Proceed To Checkout

              <i className="fa-solid fa-arrow-right"></i>

            </button>


            {/* CONTINUE SHOPPING */}

            <button
              type="button"
              className="drawer-shopping-btn"
              onClick={() =>
                setCartOpen(false)
              }
            >

              Continue Shopping

            </button>

          </div>

        )}

      </div>

    </>
  );
}

export default Header;
