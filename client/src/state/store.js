import React, { createContext, useReducer } from "react";
import { SET_USER, SET_COORDINATES } from "./types";

const user = localStorage.getItem("user");
const coordinates = localStorage.getItem("coordinates");
const initialState = {
  user: JSON.parse(user),
  coordinates: JSON.parse(coordinates),
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case SET_USER:
        return {
          ...state,
          user: { ...action.payload },
        };
      case SET_COORDINATES:
        return {
          ...state,
          coordinates: { ...action.payload },
        };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
