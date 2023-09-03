import { Avatar, Card, Rate } from "antd";
import { Link } from "react-router-dom";
import thumb from "../assets/images/thumbnail.jpg";

const { Meta } = Card;
const ProductCard = (props) => {
  const publicFolder = "http://localhost:5000/image/";

  const calculateAverageRating = () => {
    const reviews = props.data.reviews;
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    const ratings = reviews.map((review) => review.rating);
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return sum / ratings.length;
  };
  

  const averageRating = calculateAverageRating();

  return (
    <Link to={`/products/${props.data._id}`} className="no-link">
      <Card className="card-img" cover={<img src={props.data.image ? publicFolder + props.data.image : thumb} alt="Thumbnail" />} hoverable>
        <Meta
          className="meta-description"
          title={
            <>
              {props.data.title}
              <div className="ratings">
                <Rate allowHalf defaultValue={averageRating} disabled 
                style={{ 
                  color: "#F49723",
                  fontSize: "16px"
                  }} />
                  {averageRating > 0 && <span className="rating-count" style={{fontSize: "16px", marginLeft: "0.5rem"}}>({props.data.reviews.length})</span>}
              </div>
            </>
          }
          description={
            <div>
              <span className="rs">Rs.</span>
              <span className="price">{props.data.price}</span>
            </div>
          }
        />
      </Card>
    </Link>
  );
};

export default ProductCard;
