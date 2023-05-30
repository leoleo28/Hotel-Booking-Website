import axios from "axios";
import { toast } from "react-toastify";
import {
  faCalendarDays,
  faSackDollar,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./book.css";
import Navbar from "../../components/navbar/Navbar";
import Skeleton from "../../components/skeleton/Skeleton";
import Header from "../../components/header/Header";
import useFetch from "../../hooks/useFetch";

const Book = () => {
  const { data, loading, error, reFetch } = useFetch(
    `${process.env.REACT_APP_SERVER}/api/order/`,
    JSON.parse(localStorage.getItem("user-token"))
  );

  const handleClick = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER}/api/order/${id}`);
      reFetch();
      toast.success("Hotel has been removed");
    } catch (err) {}
  };

  return (
    <>
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
          data.map((d, i) => (
            <div className="searchItem" key={i}>
              <img src={d.hotelimg} alt="" className="siImg" />
              <div className="siDesc">
                <h1 className="siTitle">{d.hotelname}</h1>
                <div className="feature">
                  <div className="featureitem">
                    <span className="icon">
                      <FontAwesomeIcon icon={faCalendarDays} />
                    </span>
                    <span className="siTaxiOp">
                      {d.startDate} to {d.endDate}
                    </span>
                  </div>
                </div>
                <div className="featureitem">
                  <span className="icon2">
                    <FontAwesomeIcon icon={faBed} />
                  </span>
                  <span className="siCancelOpSubtitle">
                    {d.adult} adults · {d.children} childern · {d.room} rooms
                  </span>
                </div>

                <div className="featureitem">
                  <span className="icon2">
                    <FontAwesomeIcon icon={faSackDollar} />
                  </span>
                  <span className="siCancelOpSubtitle">
                    Total price ${d.price}
                  </span>
                </div>

                <span className="siCancelOp">
                  <button
                    className="siCheckButton"
                    onClick={() => handleClick(d._id)}
                  >
                    Cancel
                  </button>{" "}
                  Free cancellation
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Book;
