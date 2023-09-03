import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Pagination, Empty, Spin } from "antd";
import ProductCard from "../components/ProductCard";
import searchBG from "../assets/images/search-bg.jpg";
import Search from "antd/es/input/Search";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("products");
        console.log(res.data);
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleSearch = (searchTerm) => {
    navigate(`/products?search=${searchTerm}`);
  };

  const recentlyAddedProducts = products
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
  const mostPopularProducts = products
    .slice()
    .sort((a, b) => b.purchaseCount - a.purchaseCount)
    .slice(0, 3);

  const handleViewMore = (filter) => {
    navigate(`/products?filter=${filter}`);
  };

  return (
    <>
      <Row className="search-row" gutter={[16, 16]} style={{ margin: 0 }}>
        <Col className="img-col" span={24}>
          <div
            className="searchImg-container"
            style={{
              backgroundImage: `url(${searchBG})`,
              backgroundSize: "cover",
            }}
          >
            <Search
              enterButton
              className="dash-search"
              onSearch={handleSearch}
            />
          </div>
        </Col>
      </Row>
      <div className="text-center">
        <h2>Recently Added</h2>
        <div className="sort-class-parent">
          <div
            className="view-more-button sort-class"
            onClick={() => handleViewMore("uploadDate")}
          >
            View more
          </div>
        </div>
        {loading ? (
          <Spin size="large" />
        ) : recentlyAddedProducts.length > 0 ? (
          <Row className="card-row" gutter={[16, 24]} style={{ margin: 0 }}>
            {recentlyAddedProducts.map((product) => (
              <Col className="card-col" span={4} key={product._id}>
                <ProductCard data={product} />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty description="No recently added products" />
        )}
        <h2>Most Popular</h2>
        <div className="sort-class-parent">
          <div
            className="view-more-button sort-class"
            onClick={() => handleViewMore("purchaseCount")}
          >
            View more
          </div>
        </div>
        {loading ? (
          <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Spin size="large" />
        </div>
        ) : mostPopularProducts.length > 0 ? (
          <Row className="card-row" gutter={[16, 24]} style={{ margin: 0 }}>
            {mostPopularProducts.map((product) => (
              <Col className="card-col" span={4} key={product._id}>
                <ProductCard data={product} />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span style={{ color: '#888', fontWeight: 'bold', fontSize: '18px' }}>No products found</span>}
              style={{
                margin: '20px 0',
              }}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
