import { Modal, Rate, Form, Input, Button, Alert } from "antd";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Review = ({ visible, onCancel, token }) => {
  const location = useLocation();
  const [form] = Form.useForm();
  const path = location.pathname.split("/")[2];
  const [review, setReview] = useState();
  const [rating, setRating] = useState(1);
  const [error, setError] = useState(null);
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const onFinish = async () => {
    try {
      console.log(`Bearer token is ${config.headers.Authorization}`);
      const newReview = {
        body: review,
        rating: rating,
      };
      await axios.post(`/products/${path}/reviews`, newReview, config);
      toast.success("Review submitted successfully");
      setTimeout(() => {
        window.location.replace(`/products/${path}`);
      }, 2000);
    } catch (error) {
      console.error("Failed to submit review:", error);
      toast.error("Failed to submit review. Please try again later.");
    }
  };

  const handleChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <>
    <Modal open={visible} title="Rate Product" onCancel={onCancel} footer={null} centered>
      {error && <Alert message={error} type="error" />}
      <Form form={form} onFinish={onFinish} onChange={handleChange}>
        <Form.Item
          name="rating"
          label="Rate"
          rules={[{ required: true, message: "Please rate the product" }]}
        >
          <Rate onChange={handleRatingChange} style={{ color: "#F49723" }} />
        </Form.Item>
        <Form.Item
          name="comments"
          label="Review"
          rules={[
            { max: 1000, message: "Review cannot exceed 1000 characters" },
          ]}
        >
          <Input.TextArea name="review" autoSize={{ minRows: 4, maxRows: 8 }} />
        </Form.Item>
        <Form.Item>
          <Button
            style={{ backgroundColor: "#289A43", color: "white" }}
            htmlType="submit"
            disabled={!form.isFieldsTouched()}
          >
            Submit Rating
          </Button>
        </Form.Item>
      </Form>
    </Modal>
    <ToastContainer/>
    </>
  );
};

export default Review;
