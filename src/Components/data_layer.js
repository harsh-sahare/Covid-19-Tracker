import React, { createContext, useReducer } from "react";

export const Context = createContext();

export default function DataLayer(attr) {
  return (
    <Context.Provider value={useReducer(attr.re, attr.sta)}>
      {attr.children}
    </Context.Provider>
  );
}
