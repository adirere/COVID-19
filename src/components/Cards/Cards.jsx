import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  makeStyles,
  Slide
} from "@material-ui/core";
import CountUp from "react-countup";

const useStyles = makeStyles({
  cardStyled: {
    width: "75%",
    margin: "auto",
    borderRadius: "0px 0px 50px 50px",
    "@media (max-width: 600px)": {
      borderRadius: "0px",
      width: "90%",
      marginTop: "1rem"
    }
  },
  firstCardBotom: {
    borderRadius: "0px 0px 0px 50px",
    "@media (max-width: 600px)": {
      borderRadius: "0px"
    }
  },
  secondCardBotom: {
    borderRadius: "0px"
  },
  thirdCardBotom: {
    borderRadius: "0px 0px 50px 0px",
    "@media (max-width: 600px)": {
      borderRadius: "0px"
    }
  },
  cardContentStyled: {
    color: "#636363"
  },
  typographyStyled: {
    margin: "1rem 0"
  },
  dividerOne: {
    top: "1.5rem",
    left: "37.5%",
    height: "3rem",
    "@media (max-width: 600px)": {
      height: "0"
    }
  },
  dividerTwo: {
    top: "1.5rem",
    left: "62.5%",
    height: "3rem",
    "@media (max-width: 600px)": {
      height: "0"
    }
  }
});

const types = [
  ["INFECTED", 10173722, "#FFD177"],
  ["RECOVERED", 5160489, "#60D66C"],
  ["DEATHS", 502517, "#FF7777"]
];

const Cards = () => {
  const classes = useStyles();

  return (
    <Slide in={true}>
      <Card className={classes.cardStyled}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Divider
            absolute
            className={classes.dividerOne}
            flexItem
            orientation="vertical"
          />
          <Divider
            absolute
            className={classes.dividerTwo}
            flexItem
            orientation="vertical"
          />
          {types.map((type, index) => (
            <Grid xs={12} sm={4} item>
              <Card
                className={
                  index === 0
                    ? classes.firstCardBotom
                    : index === 1
                    ? classes.secondCardBotom
                    : classes.thirdCardBotom
                }
                style={{ borderBottom: `10px solid ${type[2]}` }}
                elevation={0}
              >
                <CardContent className={classes.cardContentStyled}>
                  <Typography className={classes.typographyStyled} variant="h7">
                    {type[0]}
                  </Typography>
                  <Typography className={classes.typographyStyled} variant="h5">
                    <CountUp end={type[1]} duration={2} separator="," />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Slide>
  );
};

export default Cards;
