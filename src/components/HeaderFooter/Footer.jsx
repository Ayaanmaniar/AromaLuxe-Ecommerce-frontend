import React from "react";

function Footer() {
  return (
    <>
      <footer className="footer-section">
        <div className="container">
          <div className="row gy-4">

            {/* Company Info */}
            <div className="col-lg-4 col-md-6">
              <h3 className="footer-logo">
                Aroma<span>Luxe</span>
              </h3>

              <p className="footer-description">
                Discover luxury fragrances crafted to leave a lasting
                impression. Premium scents designed for elegance,
                confidence, and sophistication.
              </p>

              <div className="footer-social">
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

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <h5 className="footer-title">Quick Links</h5>

              <ul className="footer-links">
                <li>
                  <a href="/">Home</a>
                </li>

                <li>
                  <a href="/products">Products</a>
                </li>

                <li>
                  <a href="/about">About Us</a>
                </li>

                <li>
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </div>

            {/* Customer Support */}
            <div className="col-lg-3 col-md-6">
              <h5 className="footer-title">Customer Support</h5>

              <ul className="footer-links">
                <li>
                  <a href="#">Shipping Policy</a>
                </li>

                <li>
                  <a href="#">Returns & Refunds</a>
                </li>

                <li>
                  <a href="#">Privacy Policy</a>
                </li>

                <li>
                  <a href="#">Terms & Conditions</a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-lg-3 col-md-6">
              <h5 className="footer-title">Contact Us</h5>

              <div className="footer-contact">
                <p>
                  <i className="fa-solid fa-location-dot"></i>
                  Karachi, Pakistan
                </p>

                <p>
                  <i className="fa-solid fa-phone"></i>
                  +92 300 1234567
                </p>

                <p>
                  <i className="fa-solid fa-envelope"></i>
                  info@aromaluxe.com
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <p>
              © 2026 AromaLuxe. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;