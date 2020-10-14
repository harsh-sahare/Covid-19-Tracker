import React, { useContext } from "react";
import "./map.css";
import { Map as LeafletMap, TileLayer, Circle, Popup } from "react-leaflet";
import { Context } from "../index";

const casesTypeColors = {
  confirmed: {
    hex: "orange",
    multiplier: 500
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 500
  },
  deaths: {
    hex: "#CC1034",
    multiplier: 3000
  },
  critical: {
    hex: "orangered",
    multiplier: 800
  }
};

function DisplayCircles(data, caseType) {
  if (caseType == "death") {
    caseType = "deaths";
  }
  return data.map(country => {
    if (
      country.coordinates.latitude != null &&
      country.coordinates.longitude != null &&
      country.coordinates.latitude != 0 &&
      country.coordinates.longitude != 0
    ) {
      return (
        <Circle
          center={[country.coordinates.latitude, country.coordinates.longitude]}
          color={casesTypeColors[caseType].hex}
          fillColor={casesTypeColors[caseType].hex}
          fillOpacity={0.4}
          radius={
            Math.sqrt(country["latest_data"][caseType]) *
            casesTypeColors[caseType].multiplier
          }
        >
          <Popup>
            <div className="info-container">
              <div className="countryFlag">
                <img
                  src={`https://www.countryflags.io/${country.code}/shiny/64.png`}
                  alt={`${country.name} flag`}
                />
              </div>
              <div className="countryName">{country.name}</div>
              <div className="label">
                <div className="left">Total Population</div>
                <div className="right">{country.population}</div>
              </div>
              <div className="label">
                <div className="left">Total Confirmed</div>
                <div className="right">{country.latest_data.confirmed}</div>
              </div>
              <div className="label">
                <div className="left">Total Death</div>
                <div className="right">{country.latest_data.deaths}</div>
              </div>
              <div className="label">
                <div className="left">Total Recovered</div>
                <div className="right">{country.latest_data.recovered}</div>
              </div>
            </div>
          </Popup>
        </Circle>
      );
    }
  });
}

export default function CountryMap({ zoom, location, data }) {
  const [{ case_type }, dispatch] = useContext(Context);

  return (
    <LeafletMap center={location} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {data ? DisplayCircles(data, case_type) : ""}
    </LeafletMap>
  );
}
