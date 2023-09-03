import React, { useState } from "react";
import { Table, Button, Modal } from "antd";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";

const OrdersTab = ({ deliveries, handleDeliveryStatusChange, handleOrderDelete }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleDeleteClick = (orderId) => {
    setSelectedOrderId(orderId);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    handleOrderDelete(selectedOrderId);
    setDeleteModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setSelectedOrderId(null);
    setDeleteModalVisible(false);
  };

  const deliveryColumns = [
    {
      title: "SN",
      dataIndex: "",
      render: (text, record, index) => index + 1,
    },
    {
      title: "City",
      dataIndex: "city",
    },
    {
      title: "Area",
      dataIndex: "area",
    },
    {
      title: "Landmark",
      dataIndex: "landmark",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
    },
    {
      title: "Products",
      dataIndex: "products",
      render: (products) => (
        <ul>
          {products.map((product) => (
            <li key={product.productId}>
              {product.productId ? (
                <>
                  {product.productId.title} - Quantity: {product.quantity}
                </>
              ) : (
                "NA"
              )}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      render: (status, record) => (
        <div
          style={{
            backgroundColor: status === "Delivered" ? "green" : "yellow",
            color: status === "Delivered" ? "white" : "black",
            padding: "4px",
            borderRadius: "4px",
          }}
        >
          <span>{status}</span>
          <span style={{marginLeft: "2rem"}}>
            {status === "Ongoing" ? (
            
            <Button
              onClick={() => handleDeliveryStatusChange(record._id, "Delivered")}
            >
              Mark as Delivered
            </Button>
          ) : (
            <Button
              onClick={() => handleDeliveryStatusChange(record._id, "Ongoing")}
            >
              Mark as Ongoing
            </Button>
          )}
            </span>
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "",
      render: (text, record) => (
        <>
          <Button danger onClick={() => handleDeleteClick(record._id)}>
            Delete
          </Button>
          <Modal
  title="Delete Order"
  visible={deleteModalVisible && selectedOrderId === record._id}
  onOk={handleDeleteConfirm}
  onCancel={handleDeleteCancel}
  style={{ top: "50%", transform: "translateY(-50%)" }}
  okButtonProps={{ className: "ok-button" }}
  cancelButtonProps={{ className: "delete-button" }}
  footer={[
    <Button
      key="cancel"
      onClick={handleDeleteCancel}
      className="delete-button"
    >
      <DeleteOutlined />
      Cancel
    </Button>,
    <Button key="ok" onClick={handleDeleteConfirm} className="ok-button">
      <ExclamationCircleFilled />
      Delete
    </Button>,
  ]}
>
  <p>Are you sure you want to delete this order?</p>
</Modal>
        </>
      ),
    },
  ];

  return (
    <Table
      dataSource={deliveries}
      columns={deliveryColumns}
      className="responsive-table"
      pagination={{
        pageSize: 5,
      }}
    />
  );
};

export default OrdersTab;
