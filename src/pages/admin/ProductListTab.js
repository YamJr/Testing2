import React, { useState } from "react";
import { Table, Modal, Button } from "antd";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import thumb from "../../assets/images/thumbnail.jpg";

const ProductListTab = ({ products, handleEdit, handleDelete }) => {
  const publicFolder = "http://localhost:5000/image/";

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Flag variable to track modal visibility

  const handleDeleteClick = (productId, e) => {
    e.stopPropagation();
    setSelectedProductId(productId);
    setDeleteModalVisible(true);
    setIsModalOpen(true); // Set the flag to true when the modal opens
  };

  const handleDeleteConfirm = () => {
    handleDelete(selectedProductId);
    setDeleteModalVisible(false);
    setIsModalOpen(false); // Set the flag to false when the modal closes
  };

  const handleDeleteCancel = () => {
    setSelectedProductId(null);
    setDeleteModalVisible(false);
    setIsModalOpen(false); // Set the flag to false when the modal closes
  };

  const handleRowClick = (record) => {
    if (!isModalOpen) {
      handleEdit(record._id);
    }
  };

  const productColumns = [
    {
      title: "SN",
      dataIndex: "",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <div
          className="table-row"
          onClick={() => handleRowClick(record)}
        >
          <img  
            src={image ? publicFolder + image : thumb}
            alt="Product"
            style={{ width: "50px" }}
          />
        </div>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Actions",
      dataIndex: "",
      render: (text, record) => (
        <>
          <Button
            danger
            onClick={(e) => handleDeleteClick(record._id, e)}
          >
            Delete
          </Button>
          <Modal
            title="Delete Product"
            visible={deleteModalVisible && selectedProductId === record._id}
            onOk={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
            style={{ top: "50%", transform: "translateY(-50%)" }}
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
            <p>Are you sure you want to delete this product?</p>
          </Modal>
        </>
      ),
    },
  ];

  return (
    <Table
      dataSource={products}
      columns={productColumns}
      pagination={{
        pageSize: 5,
      }}
      onRow={(record) => ({
        onClick: () => handleRowClick(record),
      })}
    />
  );
};

export default ProductListTab;
