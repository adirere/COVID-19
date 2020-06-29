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

const useStyles = makeStyles({
  cardStyled: {
    width: "75%",
    margin: "auto",
    borderRadius: "0px 0px 50px 50px",
    "@media (max-width: 600px)": {
      borderRadius: "0px",
      width: "100%"
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
                    {type[1]}
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
