import { createContext } from "react";

const INITIAL_STATE = {
  coordinates: {},
  setCoordinates: () => {},
  bounds: {},
  setBounds: () => {},
  places: [],
  setPlaces: () => {},
  childClicked: null,
  setChildClicked: () => {},
  elRefs: [],
  setElRefs: () => {},
  type: "restaurants",
  setType: () => {},
  rating: "",
  setRating: () => {},
  filteredPlaces: [],
  setFilteredPlaces: () => {},
};

const authContext = createContext(INITIAL_STATE);

export default authContext;
