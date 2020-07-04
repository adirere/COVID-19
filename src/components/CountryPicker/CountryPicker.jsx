import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  makeStyles
} from "@material-ui/core";
import { fetchCountries } from "../../api/index";

const useStyles = makeStyles({
  formControl: {
    minWidth: 120
  }
});

const CountryPicker = ({ handleCountryChange }) => {
  const classes = useStyles();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countriesPicker, setCountriesPicker] = useState([]);

  useEffect(() => {
    const fetchedCountries = async () => {
      const countries = await fetchCountries();
      setCountriesPicker(countries);
    };
    fetchedCountries();
  }, []);

  const handleChange = e => {
    setSelectedCountry(e.target.value);
    handleCountryChange(e.target.value);
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <FormControl className={classes.formControl}>
        <InputLabel shrink>Select Country</InputLabel>
        <Select value={selectedCountry} onChange={handleChange} autoWidth>
          {countriesPicker &&
            countriesPicker.map(country => (
              <MenuItem key={country.iso3} value={country.name}>
                {country.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CountryPicker;
