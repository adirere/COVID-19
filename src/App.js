import React from "react";
import Cards from "./components/Cards/Cards";
import { makeStyles } from "@material-ui/core";
import { ReactComponent as Logo } from "./images/coronavirus.svg";

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
    animation: "example 5s linear 2s infinite alternate",
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

  return (
    <div className={classes.container}>
      <Logo className={classes.logo} />
      <Cards />
    </div>
  );
}
