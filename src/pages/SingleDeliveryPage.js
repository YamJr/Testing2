  import axios from "axios";
  import { useContext, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import { CartContext } from "../components/CartContext";
  import { ToastContainer, toast } from "react-toastify";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";

  const SingleDeliveryPage = () => {
      const location = useLocation()
      const [city, setCity] = useState('')
      const [area, setArea] = useState('')
      const [landmark, setLandmark]= useState('')
      const [contact, setContact] = useState('')
      const path = location.pathname.split("/")[2];
      const queryParams = new URLSearchParams(location.search);
      const quantity = parseInt(queryParams.get("quantity"));
      const price = parseFloat(queryParams.get("totalPrice"));
      const navigate = useNavigate();
      const totalPrice = quantity * price;

      const handleCityChange = (e) => {
        setCity(e.target.value);
      };
    
      const handleAreaChange = (e) => {
        setArea(e.target.value);
      };
    
      const handleLandmarkChange = (e) => {
        setLandmark(e.target.value);
      };
    
      const handleContactChange = (e) => {
        setContact(e.target.value);
      };

      const handleDeliverySubmit = () => {
        if (city && area && landmark && contact) {
          if (contact.length === 10) {
            const deliveryData = {
              city,
              area,
              landmark,
              contactNo: parseInt(contact),
              totalPrice,
              products: [
                {
                  productId: sessionStorage.getItem("productId"),
                  quantity: quantity,
                },
              ],
            };
        
            try {
              console.log(deliveryData);
              sessionStorage.setItem("deliveryData", JSON.stringify(deliveryData));
              navigate(`/delivery/payment`);
            } catch (error) {
              console.log(`the path is ${path}`);
              console.log(error);
            }
          } else {
            toast.error('Contact number must be 10 characters long. ')
            document.getElementById("contact").classList.add("invalid-field");
          }
        } else {
          // Display an error message or perform any desired action
          toast.error('Please fill in all the fields.');
          if (!city) document.getElementById("city").classList.add("invalid-field");
          if (!area) document.getElementById("area").classList.add("invalid-field");
          if (!landmark)
            document.getElementById("landmark").classList.add("invalid-field");
          if (!contact) document.getElementById("contact").classList.add("invalid-field");
          }
      };

      const handleGoBack = () => {
        navigate(-1); // Navigate back to the previous page
      };
      
      return (
          <>
          <div className="text-center">
        <h2>Delivery Address</h2>
        <div className="user-form">
        <div className="sort-class" style={{display: "flex", flexDirection: "row-reverse", marginRight: "10rem"}}>
          <Button
            danger
            icon={<ArrowLeftOutlined />}
            style={{ marginBottom: "1rem" }}
            onClick={handleGoBack}
          >
            Back
          </Button>
        </div>
          <div className="form-content">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                required="required"
                value={city}
                onChange={handleCityChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="area">Area</label>
              <input
                type="text"
                id="area"
                name="area"
                required="required"
                value={area}
                onChange={handleAreaChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="landmark">Landmark</label>
              <input
                type="text"
                id="landmark"
                name="landmark"
                required="required"
                value={landmark}
                onChange={handleLandmarkChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact">Contact no.</label>
              <input
                type="text"
                id="contact"
                name="contact"
                required="required"
                value={contact}
                onChange={handleContactChange}
              />
            </div>
            <div className="btn-group">
                <button className="deliver primary-btn" onClick={handleDeliverySubmit} >Proceed to Pay</button>
              </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
          </>
      )
  }

  export default SingleDeliveryPage;