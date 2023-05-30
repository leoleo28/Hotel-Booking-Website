import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";

const Reserve = ({ setOpen, hotelId, dates, options, price, hotel }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const curorder = {
        name: JSON.parse(localStorage.getItem("user")).username,
        hotelId: hotelId,
        hotelname: hotel.name,
        hotelimg: hotel.photos ? hotel.photos[0] : "",
        startDate: format(dates[0].startDate, "yyyy/MM/dd"),
        endDate: format(dates[0].endDate, "yyyy/MM/dd"),
        adult: options.adult,
        children: options.children,
        room: options.room,
        price: price,
      };

      await axios.post(`${process.env.REACT_APP_SERVER}/api/order/`, curorder, {
        headers: {
          xauthtoken: JSON.parse(localStorage.getItem("user-token")),
        },
      });
      setOpen(false);
      toast("Added Hotel to your list");
      navigate("/book");
    } catch (err) {
      if (err.message === "Invalid time value")
        toast("Please select reservation date first");
      else console.log(err.message);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
