import React from "react";

const ContactUs = () => {
  return (
    <div className="text-center">
        <h3 className="page-title">Contact Us</h3>
        <div className="contact-us-container">
      <p className="contact-us-text">
        If you have any <strong className="contact-us-strong">questions</strong>,
        <strong className="contact-us-strong"> feedback</strong>, or
        <strong className="contact-us-strong"> inquiries</strong>, please feel free to reach out to us. Our dedicated team is here to assist you.
      </p>
      <p className="contact-us-methods">
        You can contact us through the following methods:
        <ul className="contact-us-list">
          <li>
            <a href="mailto:info@shenfurniture.com" className="contact-us-link">Email: info@shenfurniture.com</a>
          </li>
          <li>
            <a href="tel:123-456-789" className="contact-us-link">Phone: 123-456-7890</a>
          </li>
          <li>
            <a href="https://www.shenfurniture.com/contact-us" className="contact-us-link">Address: 123 ShenFurniture Street, City, Country</a>
          </li>
        </ul>
      </p>
      <p className="contact-us-feedback">
        We value your <strong className="contact-us-strong">feedback</strong> and
        <strong className="contact-us-strong"> suggestions</strong>. Let us know how we can serve you better.
      </p>
    </div>
    </div>
    
  );
};

export default ContactUs;
