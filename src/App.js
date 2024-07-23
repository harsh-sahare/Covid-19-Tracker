import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import DropDown, {
  Card,
  CountryList,
  LineComp,
  Context,
  CountryMap
} from "./Components";
import "./body.css";
import "leaflet/dist/leaflet.css";

function App() {
  const [data, setdata] = useState();
  const [totalConfirmed, set_totalConfirmed] = useState(0);
  const [totalCritical, set_totalCritical] = useState(0);
  const [totalDeaths, set_totalDeaths] = useState(0);
  const [totalRecovered, set_totalRecovered] = useState(0);
  const [location, set_location] = useState({ lat: 34.80746, lng: -40.4796 });
  const [zoom, set_zoom] = useState(3);
  const [DropDownData, set_DropDownData] = useState([]);
  const [CountryListData, set_CountryListData] = useState([]);
  const [{ country_name, case_type }, dispatch] = useContext(Context);
  const [current_data, set_current_data] = useState();

  useEffect(() => {
    let Fetcheddata;
    let temp_confirmed = 0;
    let temp_critical = 0;
    let temp_deaths = 0;
    let temp_recoveries = 0;
    let temp_dropDown_data = [];
    let temp_country_data = [];

    async function GetData() {
      Fetcheddata = await Axios.get("https://api.covid19india.org/data.json");

      setdata(Fetcheddata.data);

      Fetcheddata.data.data.reduce((sum, item) => {
        temp_confirmed += item.latest_data.confirmed;
        temp_critical += item.latest_data.critical;
        temp_deaths += item.latest_data.deaths;
        temp_recoveries += item.latest_data.recovered;
      }, 0);

      Fetcheddata.data["data"].map(i => {
        temp_dropDown_data.push(i.name);
      });

      Fetcheddata.data["data"].map(i => {
        temp_country_data.push({
          name: i.name,
          conf: i.latest_data.confirmed
        });
      });
      set_totalConfirmed(temp_confirmed);
      set_totalCritical(temp_critical);
      set_totalDeaths(temp_deaths);
      set_totalRecovered(temp_recoveries);

      set_DropDownData(temp_dropDown_data);

      set_CountryListData(temp_country_data);
    }
    GetData();
  }, []);

  useEffect(() => {
    if (data) {
      data.data.map(i => {
        if (i.name == country_name) {
          set_current_data(i);
          if (country_name == "World Wide") {
            set_location({ lat: 34.80746, lng: -40.4796 });
            set_zoom(3);
          } else {
            set_location({
              lat: i.coordinates.latitude,
              lng: i.coordinates.longitude
            });
            set_zoom(3);
          }
        }
      });
    }
  }, [country_name]);

  return (
    <>
      {data ? (
        <>
          <DropDown
            current_selection="World Wide"
            data={DropDownData.sort()}
            class="hidden"
          />
          <div className="left_corner">
            <DropDown
              current_selection="World Wide"
              data={DropDownData.sort()}
            />
            <CountryList
              value={CountryListData.sort((a, b) => b.conf - a.conf)}
            />
            <LineComp selected={country_name} />
          </div>
          <div className="right_corner">
            <div className="card_container">
              {country_name == "World Wide" ? (
                <>
                  <Card title="Confirmed Cases" value={totalConfirmed} />
                  <Card title="Critical Cases" value={totalCritical} />
                  <Card title="Death Cases" value={totalDeaths} />
                  <Card title="Recovered Cases" value={totalRecovered} />
                </>
              ) : current_data ? (
                <>
                  <Card
                    title="Confirmed Cases"
                    value={current_data.latest_data.confirmed}
                  />
                  <Card
                    title="Critical Cases"
                    value={current_data.latest_data.critical}
                  />
                  <Card
                    title="Death Cases"
                    value={current_data.latest_data.deaths}
                  />
                  <Card
                    title="Recovered Cases"
                    value={current_data.latest_data.recovered}
                  />
                </>
              ) : (
                ""
              )}
            </div>
            <div className="map">
              <CountryMap zoom={zoom} location={location} data={data.data} />
            </div>
          </div>
        </>
      ) : (
        " "
      )}
    </>
  );
}

export default App;
