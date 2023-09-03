import React, { useState } from "react";
import { Form, Input, Button } from "antd";

const AddProductTab = ({
  handleSubmit,
  isEditing,
  title,
  handleTitleChange,
  price,
  handlePriceChange,
  handleImageChange,
  previewImage
}) => {
  const { TextArea } = Input;

  const inputStyles = {
    height: "40px",
    fontSize: "24px", // Adjust the height value as per your requirement
  };

  const buttonLabel = isEditing ? "Edit Product" : "Add Product";

  return (
    <div className="user-form">
      <div className="form-content">
        <Form name="basic" className="add-form" layout="vertical" autoComplete="off">
          <Form.Item
            label="Title"
            name="title"
            initialValue={isEditing ? title : ""}
          >
            <Input value={title} style={inputStyles} onChange={handleTitleChange} />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            initialValue={isEditing ? price : ""}
          >
            <Input value={price} type="Number" style={inputStyles} onChange={handlePriceChange} />
          </Form.Item>

          <Form.Item
            label="Upload"
            name="upload"
            valuePropName="fileList"
          >
            <div>
              <input type="file" id="image-upload" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="preview-container">
              {previewImage && <img src={previewImage} alt="Product Thumbnail" />}
            </div>
          </Form.Item>

          <Form.Item>
            <Button className="primary-btn" onClick={handleSubmit} style={{ width: "30%" }}>
              {buttonLabel}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddProductTab;
