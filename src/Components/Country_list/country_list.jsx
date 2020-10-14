import React from "react";
import "./country_list.css";
import CountUp from "react-countup";

export default function CountryList(attr) {
  let counter = 0;
  return (
    <ul className="country_container">
      {attr.value.map(i => {
        counter += 1;
        if (counter <= 99) {
          return (
            <li>
              <div className="left">
                #{counter} {i.name}
              </div>
              <div className="right">
                <CountUp start={0} end={i.conf} duration={5} />
              </div>
            </li>
          );
        }
      })}
    </ul>
  );
}
