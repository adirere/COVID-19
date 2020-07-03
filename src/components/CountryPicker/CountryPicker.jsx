import React, { useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles({
  formControl: {
    minWidth: 120
  }
});

myCountry = "global";

const CountryPicker = () => {
  const classes = useStyles();
  const [selectedCountry, setSelectedCountry] = useState(myCountry);

  return (
    <div style={{ marginTop: "1rem" }}>
      <FormControl className={classes.formControl}>
        <InputLabel shrink>Select Country</InputLabel>
        <Select
          value={selectedCountry}
          onChange={e => setSelectedCountry(e.target.value)}
          autoWidth
        >
          <MenuItem value={"Global"}>Global</MenuItem>
          <MenuItem value={"France"}>France</MenuItem>
          <MenuItem value={"Germany"}>Germany</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default CountryPicker;
