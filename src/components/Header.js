import { Link } from "react-router-dom";
import { Space } from "antd";
import { Nav, Navbar } from "react-bootstrap";
import UserMenu from "./UserMenu";

const Header = (props) => {
  const isAdmin = props.user && props.user.role === "Admin";

  return (
    <Navbar
      bg="light"
      expand="lg"
      style={{ padding: "10px 40px", backgroundColor: "#ad5389" }}
      className="navigation-bar"
    >
      <Link to={"/"} className="no-link">
        <div className="navbar-logo">ShenFurniture</div>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link to="/products" className="no-link" style={{ marginRight: "20px" }}>
            All Furnitures
          </Link>
          <Link to="/about-us" className="no-link" style={{ marginRight: "20px" }}>
            About Us
          </Link>
          <Link to="/contact-us" className="no-link" style={{ marginRight: "20px" }}>
            Contact Us
          </Link>
          {isAdmin && (
            <Link to="/admin" className="no-link" style={{ marginRight: "20px" }}>
              Admin
            </Link>
          )}
        </Nav>
        <Navbar.Text>
          {props.user ? (
            <UserMenu user={props.user} />
          ) : (
            <>
              <Space wrap>
                <Link to={"/login"}>
                  <button className="nav-button">Login</button>
                </Link>
                <Link to={"/register"}>
                  <button className="nav-button">Register</button>
                </Link>
              </Space>
            </>
          )}
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
