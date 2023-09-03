import React, { useContext, useState } from "react";
import { CartContext } from "../components/CartContext";
import thumb from "../assets/images/thumbnail.jpg";
import { ArrowDownOutlined, ArrowLeftOutlined, CloseOutlined, DeleteOutlined, ExclamationCircleOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Empty } from "antd";

const { confirm } = Modal;

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateCartItemQuantity } = useContext(CartContext);
  const publicFolder = "http://localhost:5000/image/";
  const navigate = useNavigate();
  const [clearCartModalVisible, setClearCartModalVisible] = useState(false);

  const handleCheckout = () => {
    const queryParams = cartItems.map((item) => `quantity=${item.quantity}`);
    const totalPrice = calculateTotal();
    queryParams.push(`total=${totalPrice}`);
    navigate(`/delivery?${queryParams.join("&")}`);
  };

  const showClearCartModal = () => {
    setClearCartModalVisible(true);
  };

  const handleClearCart = () => {
    clearCart();
    setClearCartModalVisible(false);
  };

  const handleCancelClearCart = () => {
    setClearCartModalVisible(false);
  };

  const showDeleteConfirmation = (productId) => {
    confirm({
      title: "Are you sure you want to remove this item from your cart?",
      icon: null,
      centered: true, // Center the modal on the screen
      okButtonProps: {
        className: "ok-button",
        icon: <DeleteOutlined/>
      },
      cancelButtonProps: {
        className: "delete-button",
      },
      okText: "Yes",
      cancelText: "No",
      onOk() {
        removeFromCart(productId);
      },
    });
  };

  // Calculate the total of the cart
  const calculateTotal = () => {
    let total = 0;
    for (const item of cartItems) {
      total += item.price * item.quantity;
    }
    return total;
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const increaseQuantity = (productId) => {
    updateCartItemQuantity(productId, 1);
  };

  const decreaseQuantity = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    if (item.quantity === 1) {
      return; // Quantity is already 1, no further decrease allowed
    }
    updateCartItemQuantity(productId, -1);
  };
  

  return (
    <div className="text-center">
      <h3 style={{ marginTop: "2rem" }}>My Cart</h3>
      <div className="sort-class-parent">
        <div className="sort-class">
          <Button
            danger
            icon={<ArrowLeftOutlined />}
            style={{ marginBottom: "1rem" }}
            onClick={handleGoBack}
          >
            Back
          </Button>
        </div>
      </div>
      <div className="cart-content">
        <div className="cart-body">
          {cartItems.length > 0 ? (
            <div>
              {cartItems.map((product) => (
                <div className="cart-list" key={product.id}>
                  <div className="cart-item-left">
                    <img
                      src={publicFolder + product.image}
                      alt=""
                      className="product-image"
                      style={{
                        width: "100px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="cart-name">{product.name}</div>
                  </div>
                  <div className="cart-item-right">
                    {/* <div className="cart-quantity">
                      <button
                        className="quantity-button"
                        onClick={() => decreaseQuantity(product.id)}
                      >
                        -
                      </button>
                      <div className="cart-price">{product.quantity} kg</div>
                      <button
                        className="quantity-button"
                        onClick={() => increaseQuantity(product.id)}
                      >
                        +
                      </button>
                    </div> */}
                    <div className="increment-row" style={{paddingRight: "2rem"}}>
                      <div className="increment-btn">
                        <MinusOutlined onClick={() => decreaseQuantity(product.id)} />
                        <span>{product.quantity} piece</span>
                        <PlusOutlined onClick={() => increaseQuantity(product.id)} />
                      </div>
                    </div>
                    <div className="cart-price">Rs.{product.price * product.quantity}</div>
                    <DeleteOutlined
                      className="delete-icon"
                      onClick={() => showDeleteConfirmation(product.id)}
                    />
                  </div>
                </div>
              ))}
              <div className="cart-total">Total: Rs.{calculateTotal()}</div>
            </div>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span style={{ color: '#888', fontWeight: 'bold', fontSize: '18px' }}>No items in your cart</span>}
              style={{
                margin: '20px 0',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "300px"
              }}
            />
          )}
          {cartItems.length > 0 && (
            <div className="btn-group cart-btn-group">
              <button
                className="clear-cart-button"
                onClick={showClearCartModal}
              >
                Clear Cart
              </button>
              <button className="primary-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
      <Modal
        title="Clear Cart"
        visible={clearCartModalVisible}
        onOk={handleClearCart}
        onCancel={handleCancelClearCart}
        centered // Center the modal on the screen
        okButtonProps={{ className: "ok-button" }}
        cancelButtonProps={{ className: "delete-button" }}
        footer={[
          <Button
            key="cancel"
            onClick={handleCancelClearCart}
            className="delete-button"
          >
            Cancel
          </Button>,
          <Button
            key="ok"
            onClick={handleClearCart}
            className="ok-button"
          >
            <DeleteOutlined />
            Clear
          </Button>,
        ]}
      >
        <p>Are you sure you want to clear your cart?</p>
      </Modal>
    </div>
  );
};

export default Cart;
