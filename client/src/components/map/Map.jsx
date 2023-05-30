import { useEffect, createRef, useContext } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import Item from "../item/Item";
import MapContext from "../../context/MapContext";

export default function Map({ lat, lng }) {
  const {
    places,
    setPlaces,
    setCoordinates,
    bounds,
    setBounds,
    setFetchingData,
    setChildClicked,
    setElRefs,
    type,
    filteredPlaces,
    setFilteredPlaces,
    rating,
  } = useContext(MapContext);

  const defaultProps = {
    center: {
      lat: lat,
      lng: lng,
    },
    zoom: 12,
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    if (bounds.sw && bounds.ne) {
      const getPlacesData = async () => {
        setFetchingData(true);
        try {
          const {
            data: { data },
          } = await axios.get(
            `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
            {
              params: {
                bl_latitude: bounds.sw?.lat,
                tr_latitude: bounds.ne?.lat,
                bl_longitude: bounds.sw?.lng,
                tr_longitude: bounds.ne?.lng,
              },
              headers: {
                "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
                "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
              },
              cancelToken: cancelToken.token,
            }
          );

          const res = data?.filter(
            (place) => place.name && Number(place.rating) >= Number(rating)
          );
          setPlaces(res);
          setFilteredPlaces(res);
          setChildClicked(0);
        } catch (error) {
          console.log(error.message);
        }
        setFetchingData(false);
      };
      getPlacesData();
    }

    return () => {
      cancelToken.cancel();
    };
  }, [bounds, type, rating]);

  useEffect(() => {
    let refs = [];
    if (places && places.length > 0) {
      refs = Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef());
    }

    if (filteredPlaces.length > 0) {
      refs = Array(filteredPlaces.length)
        .fill()
        .map((_, i) => refs[i] || createRef());
    }
    setElRefs(refs);
  }, [places, filteredPlaces.length]);

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLEMAP_API_KEY,
            language: "en",
          }}
          zoom={defaultProps.zoom}
          center={defaultProps.center}
          defaultCenter={defaultProps.center}
          margin={[50, 50, 50, 50]}
          options={""}
          onChange={(e) => {
            setCoordinates({ lat: e.center.lat, lng: e.center.lng });
            setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          }}
        >
          {(Number(rating) > 0 ? filteredPlaces : places).map((place, i) => (
            <Item
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
              place={place}
              text="My Marker"
              setChildClicked={setChildClicked}
              index={i}
            />
          ))}
        </GoogleMapReact>
      </div>
    </>
  );
}
