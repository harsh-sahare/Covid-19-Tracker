import React, { useContext } from "react";
import "./card.css";
import CountUp from "react-countup";
import { Context } from "../";

export default function Card(attr) {
  const [{ case_type }, dispatch] = useContext(Context);
  const value = attr.title.replace(" Cases", "").toLowerCase();
  return (
    <>
      <div
        className="card"
        onClick={() => {
          dispatch({
            type: "SET_CASE_TYPE",
            value: value
          });
        }}
      >
        <div className="card_title">{attr.title}</div>
        <div className="num">
          <CountUp end={attr.value} duration={2} />
        </div>
      </div>
    </>
  );
}
