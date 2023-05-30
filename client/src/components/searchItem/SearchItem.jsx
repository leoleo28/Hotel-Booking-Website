import { useNavigate } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/hotels/${item._id}`);
  };

  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.address}</span>
        <div className="feature">
          {item.flist?.map((feature, i) => (
            <div className="featureitem" key={i}>
              <span className="siTaxiOp">{feature}</span>
            </div>
          ))}
        </div>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <Rating
            name="Rating Label"
            value={Number(item.rating)}
            size="small"
            readOnly
          />
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button onClick={handleSearch} className="siCheckButton">
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
