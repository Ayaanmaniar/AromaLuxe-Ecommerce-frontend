import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {

  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });


  // ==========================================
  // LOAD / UPDATE CART
  // ==========================================

  useEffect(() => {

    const updateCart = () => {

      const updatedCart =
        JSON.parse(localStorage.getItem("cart")) || [];

      setCart(updatedCart);

    };

    window.addEventListener(
      "cartUpdated",
      updateCart
    );

    return () => {

      window.removeEventListener(
        "cartUpdated",
        updateCart
      );

    };

  }, []);


  // ==========================================
  // SAVE CART
  // ==========================================

  const saveCart = (updatedCart) => {

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

  };


  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const increaseQuantity = (id) => {

    const updatedCart = cart.map((item) => {

      if (item.id === id) {

        return {
          ...item,
          quantity: Number(item.quantity || 0) + 1
        };

      }

      return item;

    });

    saveCart(updatedCart);

  };


  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const decreaseQuantity = (id) => {

    const updatedCart = cart
      .map((item) => {

        if (item.id === id) {

          const newQuantity =
            Number(item.quantity || 0) - 1;

          return {
            ...item,
            quantity: newQuantity
          };

        }

        return item;

      })
      .filter(
        (item) => Number(item.quantity || 0) > 0
      );

    saveCart(updatedCart);

  };


  // ==========================================
  // DELETE PRODUCT
  // ==========================================

  const deleteProduct = (id) => {

    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    saveCart(updatedCart);

  };


  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // ==========================================
  // PRICE HELPER
  // ==========================================

  const getPrice = (price) => {

    return Number(
      String(price).replace(/[^0-9]/g, "")
    );

  };


  // ==========================================
  // TOTALS
  // ==========================================

  const subtotal = cart.reduce(
    (total, item) => {

      const price = getPrice(item.price);

      return (
        total +
        price * Number(item.quantity || 0)
      );

    },
    0
  );


  const deliveryCharges =
    cart.length > 0 ? 250 : 0;


  const total =
    subtotal + deliveryCharges;


  // ==========================================
  // TOTAL ITEMS
  // ==========================================

  const totalItems = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );


  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handlePlaceOrder = (e) => {

    e.preventDefault();


    if (cart.length === 0) {

      alert("Your cart is empty.");

      navigate("/");

      return;

    }


    alert(
      "Order placed successfully! Your order will be delivered through Cash on Delivery."
    );


    // Clear cart after order

    localStorage.removeItem("cart");

    window.dispatchEvent(
      new Event("cartUpdated")
    );


    navigate("/");

  };


  return (
    <div className="checkout-page">

      {/* =====================================
          CHECKOUT HEADER
      ===================================== */}

      <div className="checkout-heading">

        <div className="container">

          <h1>
            Checkout
          </h1>

          <p>
            Home <span>/</span> Checkout
          </p>

        </div>

      </div>


      {/* =====================================
          EMPTY CART
      ===================================== */}

      {cart.length === 0 ? (

        <div className="container">

          <div className="empty-checkout">

            <div className="empty-cart-icon">

              <i className="fa-solid fa-cart-shopping"></i>

            </div>

            <h2>
              Your Cart is Empty
            </h2>

            <p>
              You don't have any products in your cart yet.
            </p>

            <Link
              to="/"
              className="continue-shopping-btn"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      ) : (

        /* =====================================
           CHECKOUT CONTENT
        ===================================== */

        <div className="container checkout-container">

          <div className="row g-4">


            {/* =================================
                CUSTOMER INFORMATION
            ================================= */}

            <div className="col-lg-7">

              <div className="checkout-box">

                <div className="checkout-box-title">

                  <div className="checkout-title-icon">

                    <i className="fa-regular fa-user"></i>

                  </div>

                  <div>

                    <h3>
                      Delivery Information
                    </h3>

                    <p>
                      Enter your delivery details
                    </p>

                  </div>

                </div>


                <form
                  onSubmit={handlePlaceOrder}
                >

                  {/* NAME */}

                  <div className="row">

                    <div className="col-md-12">

                      <div className="checkout-field">

                        <label>
                          Full Name
                        </label>

                        <input
                          type="text"
                          name="fullname"
                          value={formData.fullname}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          required
                        />

                      </div>

                    </div>


                    {/* PHONE */}

                    <div className="col-md-6">

                      <div className="checkout-field">

                        <label>
                          Phone Number
                        </label>

                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+92 300 1234567"
                          required
                        />

                      </div>

                    </div>


                    {/* EMAIL */}

                    <div className="col-md-6">

                      <div className="checkout-field">

                        <label>
                          Email Address
                        </label>

                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="example@email.com"
                          required
                        />

                      </div>

                    </div>


                    {/* ADDRESS */}

                    <div className="col-md-12">

                      <div className="checkout-field">

                        <label>
                          Delivery Address
                        </label>

                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Enter your complete delivery address"
                          rows="4"
                          required
                        ></textarea>

                      </div>

                    </div>


                    {/* CITY */}

                    <div className="col-md-6">

                      <div className="checkout-field">

                        <label>
                          City
                        </label>

                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Enter your city"
                          required
                        />

                      </div>

                    </div>


                    {/* POSTAL CODE */}

                    <div className="col-md-6">

                      <div className="checkout-field">

                        <label>
                          Postal Code
                        </label>

                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          placeholder="Postal code"
                        />

                      </div>

                    </div>

                  </div>


                  {/* =================================
                      PAYMENT METHOD
                  ================================= */}

                  <div className="payment-section">

                    <h3>
                      Payment Method
                    </h3>


                    <div className="payment-option active">

                      <div className="payment-radio">

                        <input
                          type="radio"
                          checked
                          readOnly
                        />

                      </div>


                      <div className="payment-icon">

                        <i className="fa-solid fa-money-bill-wave"></i>

                      </div>


                      <div className="payment-content">

                        <strong>
                          Cash on Delivery
                        </strong>

                        <span>
                          Pay when your order arrives
                        </span>

                      </div>

                    </div>

                  </div>


                  {/* PLACE ORDER */}

                  <button
                    type="submit"
                    className="place-order-btn"
                  >

                    Place Order

                    <i className="fa-solid fa-arrow-right"></i>

                  </button>

                </form>

              </div>

            </div>


            {/* =================================
                ORDER SUMMARY
            ================================= */}

            <div className="col-lg-5">

              <div className="order-summary">

                <div className="summary-header">

                  <h3>
                    Order Summary
                  </h3>

                  <span>
                    {totalItems} Items
                  </span>

                </div>


                {/* =================================
                    PRODUCTS
                ================================= */}

                <div className="summary-products">

                  {cart.map((item) => (

                    <div
                      className="summary-product"
                      key={item.id}
                    >

                      {/* PRODUCT IMAGE */}

                      <div className="summary-product-image">

                        <img
                          src={item.image}
                          alt={item.title}
                        />

                      </div>


                      {/* PRODUCT INFO */}

                      <div className="summary-product-info">

                        <h4>
                          {item.title}
                        </h4>


                        <p>
                          Rs.{" "}
                          {getPrice(
                            item.price
                          ).toLocaleString()}
                        </p>


                        {/* =================================
                            QUANTITY CONTROLS
                        ================================= */}

                        <div className="checkout-quantity-controls">

                          {/* MINUS */}

                          <button
                            type="button"
                            className="checkout-quantity-btn"
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            aria-label="Decrease quantity"
                          >

                            <i className="fa-solid fa-minus"></i>

                          </button>


                          {/* QUANTITY */}

                          <span className="checkout-quantity-number">

                            {item.quantity}

                          </span>


                          {/* PLUS */}

                          <button
                            type="button"
                            className="checkout-quantity-btn"
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            aria-label="Increase quantity"
                          >

                            <i className="fa-solid fa-plus"></i>

                          </button>

                        </div>

                      </div>


                      {/* PRODUCT PRICE */}

                      <div className="summary-product-price">

                        <button
                          type="button"
                          className="checkout-delete-btn"
                          onClick={() =>
                            deleteProduct(item.id)
                          }
                          aria-label={`Remove ${item.title}`}
                          title="Remove product"
                        >

                          <i className="fa-solid fa-trash"></i>

                        </button>


                        Rs.{" "}

                        {(
                          getPrice(item.price) *
                          Number(item.quantity || 0)
                        ).toLocaleString()}

                      </div>

                    </div>

                  ))}

                </div>


                {/* =================================
                    TOTALS
                ================================= */}

                <div className="summary-calculation">

                  <div>

                    <span>
                      Subtotal
                    </span>

                    <strong>
                      Rs. {subtotal.toLocaleString()}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Delivery Charges
                    </span>

                    <strong>
                      Rs. {deliveryCharges.toLocaleString()}
                    </strong>

                  </div>


                  <div className="summary-total">

                    <span>
                      Total
                    </span>

                    <strong>
                      Rs. {total.toLocaleString()}
                    </strong>

                  </div>

                </div>


                {/* COD NOTE */}

                <div className="cod-note">

                  <i className="fa-solid fa-shield-halved"></i>

                  <div>

                    <strong>
                      Cash on Delivery
                    </strong>

                    <p>
                      Your order will be confirmed after
                      submitting your details.
                    </p>

                  </div>

                </div>

              </div>


              {/* BACK TO CART */}

              <Link
                to="/cart"
                className="back-cart-btn"
              >

                <i className="fa-solid fa-arrow-left"></i>

                Back to Cart

              </Link>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Checkout;
