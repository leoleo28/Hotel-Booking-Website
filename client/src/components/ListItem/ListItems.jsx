import Rating from "@material-ui/lab/Rating";
import { faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./listitems.css";

const Listitems = ({ place, selected, refProp }) => {
  if (selected) {
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="ListitemContainer" ref={refProp}>
      <img
        src={
          place.photo ? place.photo.images.large.url : "/img/placeholder.jpg"
        }
        alt=""
      />
      <div className="title">{place?.name}</div>
      <div className="Listitemproperty">
        <div>Rating</div>
        <Rating
          name="Rating Label"
          value={Number(Math.floor(place.rating))}
          size="small"
          readOnly
          style={{ fontSize: "12px" }}
        />
      </div>
      <div className="Listitemproperty">
        <div>Price</div>
        <div>{place.price_level}</div>
      </div>
      <div className="Listitemproperty">
        <div>Ranking</div>
        <div>{place.ranking}</div>
      </div>
      <div className="Listitemcuisine">
        {place?.cuisine?.map(({ name }) => (
          <span className="cuisinetype" key={name}>
            {name}
          </span>
        ))}
      </div>
      {place?.phone && (
        <div className="Listitemproperty">
          <FontAwesomeIcon icon={faPhone} />
          <div>{place.phone}</div>
        </div>
      )}
      {place?.address && (
        <div className="Listitemproperty">
          <FontAwesomeIcon
            icon={faLocationDot}
            style={{ marginRight: "5px" }}
          />
          <div>{place.address}</div>
        </div>
      )}
      <button
        className="Listitembtn"
        onClick={() => window.open(place.web_url, "_blank")}
      >
        Trip Advisor
      </button>
      <button
        className="Listitembtn"
        onClick={() => window.open(place.website, "_blank")}
      >
        Website
      </button>
    </div>
  );
};

export default Listitems;
