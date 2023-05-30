import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import Skeleton from "../../components/skeleton/Skeleton";
import Map from "../../components/map/Map";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import MapContext from "../../context/MapContext";
import Listitems from "./../../components/ListItem/ListItems";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const { dates, options } = useContext(SearchContext);
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({
    lat: 40.73061,
    lng: -73.935242,
  });
  const [bounds, setBounds] = useState({});
  const [fetchingdata, setFetchingData] = useState(false);
  const [childClicked, setChildClicked] = useState(null);
  const [elRefs, setElRefs] = useState([]);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("0");
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const days = dayDifference(
    new Date(dates[0].endDate),
    new Date(dates[0].startDate)
  );

  useEffect(() => {
    const filtered = places.filter(
      (place) => Number(place.rating) >= Number(rating)
    );
    setFilteredPlaces(filtered);
  }, [rating, places]);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
    setChildClicked(null);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setChildClicked(null);
    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
      setChildClicked(null);
    } else {
      toast("Please login first");
    }
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setChildClicked(0);
  };

  const handleRateChange = (e) => {
    setRating(e.target.value);
    setChildClicked(0);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {error && (
        <div style={{ color: "white" }}>
          {toast.error("Something went wrong")}
        </div>
      )}
      {loading ? (
        <Skeleton type="progress" />
      ) : (
        <div className="hotelContainer">
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            Restaurants and Attractions around you
          </div>
          <div className="hotel-mapcontainer">
            <MapContext.Provider
              value={{
                places: places,
                setPlaces: setPlaces,
                coordinates: coordinates,
                setCoordinates: setCoordinates,
                bounds: bounds,
                setBounds: setBounds,
                fetchingdata: fetchingdata,
                setFetchingData: setFetchingData,
                childClicked: childClicked,
                setChildClicked: setChildClicked,
                elRefs: elRefs,
                setElRefs: setElRefs,
                type: type,
                setType: setType,
                rating: rating,
                setRating: setRating,
                filteredPlaces: filteredPlaces,
                setFilteredPlaces: setFilteredPlaces,
              }}
            >
              <div className="hoteol-listcontainer">
                <div
                  style={{
                    marginTop: "10px",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "center",
                    position: "sticky",
                    top: "0px",
                    backgroundColor: "#DCDCDC",
                    padding: "5px 10px",
                    borderRadius: "50px",
                    boxShadow: "3px 3px 1px #aaaaaa",
                  }}
                >
                  <span>Type</span>
                  <select onChange={(e) => handleTypeChange(e)}>
                    <option value="restaurants">Restaurants</option>
                    <option value="attractions">Attractions</option>
                  </select>
                  <span>Rating</span>
                  <select onChange={(e) => handleRateChange(e)}>
                    <option value="0">All</option>
                    <option value="3">Above 3.0</option>
                    <option value="4">Above 4.0</option>
                    <option value="5">Above 5.0</option>
                  </select>
                </div>
                {!fetchingdata ? (
                  (Number(rating) > 0 ? filteredPlaces : places).map(
                    (place, i) => (
                      <Listitems
                        key={i}
                        place={place}
                        selected={childClicked === i}
                        refProp={elRefs[i]}
                      />
                    )
                  )
                ) : (
                  <Skeleton type="map" />
                )}
              </div>
              <div className="hoteol-map">
                <Map lat={data.latitude} lng={data.longtitude} />
              </div>
            </MapContext.Provider>
          </div>
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => {
                  setOpen(false);
                  setChildClicked(null);
                }}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow" onClick={handleClick}>
              Reserve or Book Now!
            </button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelDistance">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veniam consequuntur harum suscipit fugiat, amet assumenda,
                  quas placeat laboriosam, ipsa ratione est eos? Aspernatur
                  ipsam eaque blanditiis. Quod reprehenderit iure atque?
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>
                    ${(days * data.cheapestPrice * options.room).toFixed(2)}
                  </b>{" "}
                  ({days} nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && (
        <Reserve
          setOpen={setOpenModal}
          hotelId={id}
          dates={dates}
          hotel={data}
          options={options}
          price={(days * data.cheapestPrice * options.room).toFixed(2)}
        />
      )}
    </div>
  );
};

export default Hotel;
