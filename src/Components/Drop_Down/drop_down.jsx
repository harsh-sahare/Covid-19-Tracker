import React, { useEffect, useState, useContext } from "react";
import "./drop_down.css";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { Context } from "../";

export default function DropDown(attr) {
  const [{ country_name }, dispatch] = useContext(Context);
  const [data, set_data] = useState();
  const [selected_item, set_selected_item] = useState(attr.current_selection);
  const [show_div, set_show_div] = useState(false);
  useEffect(() => {
    set_selected_item(attr.current_selection);
  }, [attr.current_selection]);

  useEffect(() => {
    set_data(attr.data);
  }, [attr.data]);

  return (
    <>
      {data ? (
        <>
          <div className={`container ${attr.class}`}>
            <div
              className="main_div"
              onClick={() => {
                show_div != true ? set_show_div(true) : set_show_div(false);
              }}
            >
              <div className="name">{selected_item}</div>
              <div className={`icon ${show_div ? "rotn" : "rotz"}`}>
                <ArrowDownward />
              </div>
            </div>
            <ol className={`option_div ${show_div ? "show" : ""}`}>
              <li
                onClick={() => {
                  set_show_div(false);
                  set_selected_item("World Wide");
                  dispatch({ type: "SET_NAME", value: "World Wide" });
                }}
              >
                World Wide
              </li>
              {data.map(i => (
                <li
                  onClick={() => {
                    set_show_div(false);
                    set_selected_item(i);
                    dispatch({ type: "SET_NAME", value: i });
                  }}
                >
                  {i}
                </li>
              ))}
            </ol>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
