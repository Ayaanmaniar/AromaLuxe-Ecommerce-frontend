import React from "react";
import "./Contact.css";

function Contact() {
    return (
        <>
            {/* Banner */}
            <section className="contact-banner">
                <div className="overlay">
                    <div className="container text-center">
                        <h1>Contact Us</h1>
                        <p>
                            We'd love to hear from you. Send us your questions,
                            feedback, or fragrance inquiries.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section py-5">
                <div className="container">
                    <div className="row align-items-center g-5">

                        {/* Left */}
                        <div className="col-lg-5">
                            <div className="contact-info">

                                <h2>Get In Touch</h2>

                                <p>
                                    Have questions about our perfumes or need
                                    assistance? Our team is always ready to help
                                    you find the perfect fragrance.
                                </p>

                                <div className="info-item">
                                    <i className="fa-solid fa-location-dot"></i>
                                    <div>
                                        <h6>Address</h6>
                                        <span>Karachi, Pakistan</span>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <i className="fa-solid fa-phone"></i>
                                    <div>
                                        <h6>Phone</h6>
                                        <span>+92 300 1234567</span>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <i className="fa-solid fa-envelope"></i>
                                    <div>
                                        <h6>Email</h6>
                                        <span>info@perfume.com</span>
                                    </div>
                                </div>

                                <div className="social-icons">
                                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#"><i className="fab fa-instagram"></i></a>
                                    <a href="#"><i className="fab fa-whatsapp"></i></a>
                                    <a href="#"><i className="fab fa-youtube"></i></a>
                                </div>

                            </div>
                        </div>

                        {/* Right */}
                        <div className="col-lg-7">

                            <div className="contact-form">

                                <h2>Send a Message</h2>

                                <form>

                                    <div className="row">

                                        <div className="col-md-6 mb-4">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Your Name"
                                            />
                                        </div>

                                        <div className="col-md-6 mb-4">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Email Address"
                                            />
                                        </div>

                                    </div>

                                    <div className="mb-4">
                                        <textarea
                                            rows="6"
                                            className="form-control"
                                            placeholder="Write your message..."
                                        ></textarea>
                                    </div>

                                    <button className="send-btn">
                                        Send Message
                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>
                </div>
            </section>

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.78757042915!2d67.0772630758689!3d24.905226643463877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f5ba1db4061%3A0xad2c7a2c189158d0!2sAptech%20Gulshan%202!5e0!3m2!1sen!2s!4v1783579971732!5m2!1sen!2s" width="100%" height="500px" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>

        </>
    );
}

export default Contact;