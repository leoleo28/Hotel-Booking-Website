import { useState, useContext } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import _ from "lodash";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Pagination from "../../components/pagination/Pagination";
import Skeleton from "../../components/skeleton/Skeleton";
import { SearchContext } from "../../context/SearchContext";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const {
    city: search_city,
    dates: search_dates,
    options: search_options,
  } = useContext(SearchContext);
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState(search_city);
  const [dates, setDates] = useState(search_dates);
  const [options, setOptions] = useState(search_options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [curpage, setCurpage] = useState(1);
  const [sortcol, setSortcol] = useState({
    path: "name",
    order: "asc",
  });
  const [distance, setDistance] = useState(undefined);
  const [features, setFeatures] = useState({
    wifi: false,
    housekeeping: false,
    transport: false,
  });

  const pagesize = 15;

  const get_features = () => {
    let res = "";
    if (features.wifi) res += "&wifi=true";
    if (features.housekeeping) res += "&housekeeping=true";
    if (features.transport) res += "&transport=true";
    return res;
  };
  let url = `${
    process.env.REACT_APP_SERVER
  }/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`;
  const { data, loading, error, reFetch } = useFetch(url);

  const handleClick = () => {
    url = `${process.env.REACT_APP_SERVER}/api/hotels?city=${destination}&min=${
      min || 0
    }&max=${max || 999}&dist=${distance || 999}${get_features()}`;
    reFetch(url);
  };

  const handlechangepage = (page) => {
    setCurpage(page);
  };

  const handlesort = (col) => {
    const newsort = { ...sortcol };
    if (newsort.path === col) {
      newsort.order = newsort.order === "asc" ? "desc" : "asc";
    } else {
      newsort.path = col;
      newsort.order = "asc";
    }
    setSortcol(newsort);
  };

  const renderIcon = (col) => {
    if (sortcol.path !== col) return null;
    if (sortcol.order === "asc") return <FontAwesomeIcon icon={faSortUp} />;
    return <FontAwesomeIcon icon={faSortDown} />;
  };

  const paginate = (items, curpage, pagesize) => {
    const sortitems = _.orderBy(items, [sortcol.path], [sortcol.order]);
    const startIndex = (curpage - 1) * pagesize;
    return _(sortitems).slice(startIndex).take(pagesize).value();
  };

  const handlecb = (e) => {
    setFeatures({
      ...features,
      [e.target.name]: !features[e.target.name],
    });
  };

  return (
    <>
      <Navbar />
      <Header type="list" />
      {error && (
        <div style={{ color: "white" }}>
          {toast.error("Something went wrong")}
        </div>
      )}
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                placeholder={destination}
                type="text"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                new Date(dates[0].startDate),
                "MM/dd/yyyy"
              )} to ${format(new Date(dates[0].endDate), "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <div className="lsItem">
              <h4>Distence from City Center</h4>
              {distance && (
                <div style={{ textAlign: "center" }}>{distance} km</div>
              )}
              <div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={distance ? distance : 0}
                  step="1"
                  className="listslider"
                  onChange={(e) => {
                    setDistance(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="checkbox">
              <small>Free Wi-Fi in all rooms!</small>
              <input
                type="checkbox"
                name="wifi"
                onChange={(e) => handlecb(e)}
              />
            </div>
            <div className="checkbox">
              <small>Daily housekeeping</small>
              <input
                type="checkbox"
                name="housekeeping"
                onChange={(e) => handlecb(e)}
              />
            </div>
            <div className="checkbox">
              <small>Close to public transportation</small>
              <input
                type="checkbox"
                name="transport"
                onChange={(e) => handlecb(e)}
              />
            </div>
            <button
              className="headerBtn"
              onClick={handleClick}
              disabled={loading}
            >
              Search
            </button>
          </div>
          <div className="listResult">
            {loading ? (
              <Skeleton type="circular" />
            ) : (
              <>
                <div className="sort">
                  <h3>Sorted by </h3>
                  <div
                    onClick={() => handlesort("name")}
                    className="sortchoice"
                  >
                    A-Z {renderIcon("name")}
                  </div>
                  <div
                    onClick={() => handlesort("cheapestPrice")}
                    className="sortchoice"
                  >
                    Price {renderIcon("cheapestPrice")}
                  </div>
                  <div
                    onClick={() => handlesort("rating")}
                    className="sortchoice"
                  >
                    Rating {renderIcon("rating")}
                  </div>
                </div>

                {paginate(data, curpage, pagesize).map((item) => (
                  <SearchItem
                    item={item}
                    key={item._id}
                    dates={dates}
                    options={options}
                  />
                ))}
                <Pagination
                  total={data.length}
                  pagesize={pagesize}
                  st={{ destination, dates, options }}
                  currentpage={curpage}
                  changepage={handlechangepage}
                  className="pagination"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
