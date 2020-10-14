import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./line.css";
import numeral from "numeral";
import Axios from "axios";

let Url = "https://disease.sh/v3/covid-19/historical/country?lastdays=120";

const options = {
  legend: {
    display: false
  },
  elements: {
    point: {
      radius: 0
    }
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function(tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      }
    }
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll"
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          display: false
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return numeral(value).format("0a");
          }
        }
      }
    ]
  }
};

export default function LineComp(attr) {
  const [cases_data, set_cases_data] = useState();
  const [deaths_data, set_deaths_data] = useState();
  const [recovered_data, set_recovered_data] = useState();

  function PepareData(country, type) {
    let data = [];
    let lastDataPoint;
    let current_Url = Url;
    if (country == "World Wide") {
      current_Url = current_Url.replace("country", "all");
    } else {
      current_Url = current_Url.replace("country", country);
    }

    Axios.get(current_Url)
      .then(res => {
        for (let d in res.data[type]) {
          let dict = {};
          if (d) {
            if (lastDataPoint) {
              dict["x"] = d;
              dict["y"] = res.data[type][d] - lastDataPoint;
              data.push(dict);
            } else {
              dict["x"] = d;
              dict["y"] = res.data[type][d];
            }
            lastDataPoint = res.data[type][d];
          }
        }

        if (type == "cases") {
          set_cases_data(data);
        }
        if (type == "deaths") {
          set_deaths_data(data);
        }
        if (type == "recovered") {
          set_recovered_data(data);
        }
      })
      .catch(e => console.log(e));
  }

  useEffect(() => {
    PepareData(attr.selected, "cases");
    PepareData(attr.selected, "deaths");
    PepareData(attr.selected, "recovered");
  }, []);
  return (
    <>
      <div className="line_container">
        {recovered_data ? (
          <Line
            data={{
              datasets: [
                {
                  borderColor: "white",
                  data: cases_data
                },
                {
                  borderColor: "red",
                  data: deaths_data
                },
                {
                  borderColor: "green",
                  data: recovered_data
                }
              ]
            }}
            options={options}
            key={attr.selected}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
