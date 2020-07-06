import React, { useState, useEffect } from "react";
import Cards from "./components/Cards/Cards";
import { makeStyles } from "@material-ui/core";
import { ReactComponent as Coronavirus } from "./images/coronavirus.svg";
import { ReactComponent as Earth } from "./images/earth.svg";
import { fetchCardsData } from "./api";
import BarChart from "./components/Chart/BarChart";
import LineChart from "./components/Chart/LineChart";
import CountryPicker from "./components/CountryPicker/CountryPicker";

const useStyles = makeStyles({
  container: {
    textAlign: "center"
  },
  coronavirus: {
    position: "absolute",
    width: "10%",
    height: "15%",
    top: "2%",
    left: "1%",
    animation:
      "hovering 5s linear 2s infinite alternate, entranceCoronavirus ease 1s",
    "@media (max-width:600px)": {
      position: "relative",
      margin: "1rem 1rem",
      width: "15%"
    },
    "@media (max-width:300px)": {
      position: "relative",
      margin: "1rem 1rem",
      width: "20%",
      height: "5%"
    }
  },
  earth: {
    position: "absolute",
    width: "10%",
    height: "15%",
    top: "2%",
    right: "1%",
    animation:
      "hovering 5s linear 2s infinite alternate, entranceEarth ease 1s",
    "@media (max-width:600px)": {
      position: "relative",
      margin: "1rem 0",
      width: "20%"
    },
    "@media (max-width:300px)": {
      position: "relative",
      margin: "1rem 0",
      width: "30%",
      height: "10%"
    }
  }
});

export default function App() {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [country, setCountry] = useState([]);

  useEffect(() => {
    async function fetchResult() {
      const data = await fetchCardsData(country);
      setData(data);
    }
    fetchResult();
  }, [country]);

  const handleCountryChange = countryPicked => {
    setCountry(countryPicked);
  };

  return (
    <div className={classes.container}>
      <Coronavirus className={classes.coronavirus} />
      <Earth className={classes.earth} />
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      {country.length !== 0 ? <BarChart data={data} /> : <LineChart />}
    </div>
  );
}
