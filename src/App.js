import React, { useState, useEffect } from "react";
import Cards from "./components/Cards/Cards";
import { makeStyles } from "@material-ui/core";
import { ReactComponent as Logo } from "./images/coronavirus.svg";
import { fetchCardsData } from "./api";
import BarChart from "./components/Chart/BarChart";

const useStyles = makeStyles({
  container: {
    textAlign: "center"
  },
  logo: {
    position: "absolute",
    width: "10%",
    height: "15%",
    top: "2%",
    left: "1%",
    animation: "hovering 5s linear 2s infinite alternate, entrance ease 1s",
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

  useEffect(() => {
    async function fetchResult() {
      const data = await fetchCardsData();
      setData(data);
    }
    fetchResult();
  }, []);

  return (
    <div className={classes.container}>
      <Logo className={classes.logo} />
      <Cards data={data} />
      <BarChart data={data} />
    </div>
  );
}
