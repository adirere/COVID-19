import React, { useState, useEffect } from "react";
import {
  FormControl,
  NativeSelect,
  InputLabel,
  makeStyles
} from "@material-ui/core";
import { fetchCountries } from "../../api/index";

const useStyles = makeStyles({
  form: {
    marginTop: "1rem"
  },
  customSelect: {
    backgroundColor: "rgba(182,170,254,0.4)",
    fontFamily: "Arial"
  }
});

const CountryPicker = ({ handleCountryChange }) => {
  const classes = useStyles();
  const [countriesPicker, setCountriesPicker] = useState([]);

  useEffect(() => {
    const fetchedCountries = async () => {
      setCountriesPicker(await fetchCountries());
    };
    fetchedCountries();
  }, []);

  return (
    <FormControl className={classes.form}>
      <InputLabel shrink>Select a country</InputLabel>
      <NativeSelect
        className={classes.customSelect}
        defaultValue=""
        onChange={e => handleCountryChange(e.target.value)}
      >
        <option value="">Global</option>
        {countriesPicker.map((country, i) => (
          <option key={i} value={country.name}>
            {country.name}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
