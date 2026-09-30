import React, { useEffect, useState } from "react";
import "./Home.css";

function Home() {

  // ==========================================
  // PRODUCTS STATE
  // ==========================================

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ==========================================
  // FAVORITES STATE
  // ==========================================

  const [favorites, setFavorites] = useState(() => {

    try {

      const savedFavorites =
        localStorage.getItem("favorites");

      return savedFavorites
        ? JSON.parse(savedFavorites)
        : [];

    } catch (error) {

      console.error(
        "Favorites loading error:",
        error
      );

      return [];

    }

  });


  // ==========================================
  // FETCH PRODUCTS FROM API
  // ==========================================

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await fetch(
          "https://inside-dev.com/api/fragrance"
        );

        if (!response.ok) {

          throw new Error(
            `HTTP Error: ${response.status}`
          );

        }

        const data = await response.json();


        // ========================================
        // API RESPONSE
        // ========================================

        const allProducts = Array.isArray(data)
          ? data
          : Array.isArray(data.products)
            ? data.products
            : [];


        // ========================================
        // PREMIUM 8 PRODUCTS
        // ========================================

        const premiumProductNames = [

          "janan leather",

          "all-rounder | shoaib malik",

          "wasim akram 502 platinum",

          "janan sport - 100ml",

          "zarar fire",

          "luminous pour homme",

          "dark star",

          "smash | sania mirza",

        ];


        // ========================================
        // FILTER ONLY 8 PRODUCTS
        // ========================================

        const premiumProducts =
          allProducts.filter((product) =>
            premiumProductNames.includes(
              product.title?.toLowerCase()
            )
          );


        setProducts(
          premiumProducts.slice(0, 8)
        );

      } catch (error) {

        console.error(
          "Products fetching error:",
          error
        );

        setError(
          "Unable to load products. Please try again."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchProducts();

  }, []);


  // ==========================================
  // TOGGLE FAVORITE
  // ==========================================

  const toggleFavorite = (product) => {

    setFavorites((currentFavorites) => {

      const alreadyFavorite =
        currentFavorites.some(
          (item) =>
            String(item.id) ===
            String(product.id)
        );


      let updatedFavorites;


      // ========================================
      // REMOVE FAVORITE
      // ========================================

      if (alreadyFavorite) {

        updatedFavorites =
          currentFavorites.filter(
            (item) =>
              String(item.id) !==
              String(product.id)
          );

      }


      // ========================================
      // ADD FAVORITE
      // ========================================

      else {

        updatedFavorites = [
          ...currentFavorites,
          product,
        ];

      }


      // ========================================
      // SAVE TO LOCAL STORAGE
      // ========================================

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );


      // Notify other components
      window.dispatchEvent(
        new Event("favoritesUpdated")
      );


      return updatedFavorites;

    });

  };


  // ==========================================
  // CHECK IF PRODUCT IS FAVORITE
  // ==========================================

  const isFavorite = (productId) => {

    return favorites.some(
      (item) =>
        String(item.id) ===
        String(productId)
    );

  };


  // ==========================================
  // GET CART
  // ==========================================

  const getCart = () => {

    try {

      const savedCart =
        localStorage.getItem("cart");


      if (!savedCart) {

        return [];

      }


      const parsedCart =
        JSON.parse(savedCart);


      return Array.isArray(parsedCart)
        ? parsedCart
        : [];

    } catch (error) {

      console.error(
        "Cart loading error:",
        error
      );

      return [];

    }

  };


  // ==========================================
  // ADD TO CART
  // ==========================================

  const addToCart = (product) => {

    const cart = getCart();


    const existingProductIndex =
      cart.findIndex(
        (item) =>
          String(item.id) ===
          String(product.id)
      );


    let updatedCart;


    // ========================================
    // PRODUCT ALREADY EXISTS
    // ========================================

    if (existingProductIndex !== -1) {

      updatedCart = cart.map(
        (item, index) => {

          if (
            index ===
            existingProductIndex
          ) {

            return {

              ...item,

              quantity:
                Number(
                  item.quantity || 0
                ) + 1,

            };

          }


          return item;

        }
      );

    }


    // ========================================
    // NEW PRODUCT
    // ========================================

    else {

      updatedCart = [

        ...cart,

        {

          ...product,

          quantity: 1,

        },

      ];

    }


    // ========================================
    // SAVE CART
    // ========================================

    try {

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );


      window.dispatchEvent(
        new Event("cartUpdated")
      );


      window.dispatchEvent(
        new Event("openCartDrawer")
      );


    } catch (error) {

      console.error(
        "Cart saving error:",
        error
      );

      alert(
        "Unable to add product to cart."
      );

    }

  };


  // ==========================================
  // FORMAT PRICE
  // ==========================================

  const formatPrice = (price) => {

    return `Rs. ${Number(
      price
    ).toLocaleString()}`;

  };


  // ==========================================
  // RATING STARS
  // ==========================================

  const renderStars = (rating) => {

    const roundedRating =
      Math.round(rating || 0);


    return Array.from(
      { length: 5 },
      (_, index) => (

        <i
          key={index}
          className={
            index < roundedRating
              ? "fa-solid fa-star"
              : "fa-regular fa-star"
          }
        ></i>

      )
    );

  };


  return (
    <>

      {/* ==========================================
          HERO CAROUSEL
      ========================================== */}

      <div
        id="carouselExampleIndicators"
        className="carousel slide"
      >

        <div className="carousel-indicators">

          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>


          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>


          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>

        </div>


        <div className="carousel-inner">

          <div className="carousel-item active">

            <img
              src="/images/Perfume-4.jpg"
              className="d-block w-100"
              alt="Men's Fragrance"
            />

          </div>


          <div className="carousel-item">

            <img
              src="/images/Perfume-2.jpg"
              className="d-block w-100"
              alt="Women's Fragrance"
            />

          </div>


          <div className="carousel-item">

            <img
              src="/images/Perfume-3.jpg"
              className="d-block w-100"
              alt="Luxury Perfume"
            />

          </div>

        </div>


        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >

          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>

          <span className="visually-hidden">
            Previous
          </span>

        </button>


        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >

          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>

          <span className="visually-hidden">
            Next
          </span>

        </button>

      </div>


      {/* ==========================================
          FEATURED PRODUCTS
      ========================================== */}

      <section className="featured-products py-5">

        <div className="container">

          <h2 className="section-title text-center mb-5">
            Featured Products
          </h2>


          {/* ========================================
              LOADING
          ======================================== */}

          {loading && (

            <div className="text-center py-5">

              <div
                className="spinner-border"
                role="status"
              >

                <span className="visually-hidden">
                  Loading...
                </span>

              </div>

              <p className="mt-3">
                Loading premium products...
              </p>

            </div>

          )}


          {/* ========================================
              ERROR
          ======================================== */}

          {!loading && error && (

            <div
              className="alert alert-danger text-center"
              role="alert"
            >

              {error}

            </div>

          )}


          {/* ========================================
              PRODUCTS
          ======================================== */}

          {!loading &&
            !error &&
            products.length > 0 && (

              <div className="row g-4">

                {products.map((product) => {

                  const favorite =
                    isFavorite(product.id);


                  return (

                    <div
                      className="col-lg-3 col-md-6"
                      key={product.id}
                    >

                      <div className="product-card">


                        {/* PRODUCT IMAGE */}

                        <div className="image-wrapper">

                          <img
                            src={product.image}
                            alt={product.title}
                            className="img-fluid"
                          />


                          {/* =================================
                              WORKING HEART
                          ================================= */}

                          <button
                            className={`wishlist-btn ${
                              favorite
                                ? "active"
                                : ""
                            }`}
                            type="button"
                            onClick={() =>
                              toggleFavorite(product)
                            }
                            aria-label={
                              favorite
                                ? "Remove from favorites"
                                : "Add to favorites"
                            }
                          >

                            <i
                              className={
                                favorite
                                  ? "fa-solid fa-heart"
                                  : "fa-regular fa-heart"
                              }
                            ></i>

                          </button>

                        </div>


                        {/* PRODUCT INFO */}

                        <div className="product-info">

                          <h5>
                            {product.title}
                          </h5>


                          {/* BRAND */}

                          <p className="product-brand">
                            {product.brand}
                          </p>


                          {/* RATING */}

                          <div className="rating">

                            {renderStars(
                              product.rating?.rate
                            )}

                            <span>
                              (
                              {
                                product.rating?.rate
                                  ?.toFixed(1)
                              }
                              )
                            </span>

                          </div>


                          {/* PRICE */}

                          <div className="price">

                            {formatPrice(
                              product.price
                            )}

                          </div>


                          {/* ADD TO CART */}

                          <button
                            className="cart-btn"
                            type="button"
                            onClick={() =>
                              addToCart(product)
                            }
                          >

                            Add To Cart

                          </button>

                        </div>

                      </div>

                    </div>

                  );

                })}

              </div>

            )}


          {/* ========================================
              NO PRODUCTS
          ======================================== */}

          {!loading &&
            !error &&
            products.length === 0 && (

              <div className="text-center py-5">

                <p>
                  No premium products found.
                </p>

              </div>

            )}

        </div>

      </section>

    </>
  );
}

export default Home;
