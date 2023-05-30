import "./item.css";

const Item = ({ place, setChildClicked, index }) => {
  return (
    <div className="mapItemContainer" onClick={() => setChildClicked(index)}>
      <div className="mapMidContainer">
        <small className="mapItemTitle">{place.name}</small>
        <img
          src={
            place.photo ? place.photo.images.large.url : "/img/placeholder.jpg"
          }
          alt=""
        />
      </div>
    </div>
  );
};

export default Item;
