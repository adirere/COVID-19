import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchCardsData = async country => {
  let countryUrl = url;
  try {
    if (country.length !== 0) {
      countryUrl = `${url}/countries/${country}`;
    }
    const {
      data: { confirmed, recovered, deaths }
    } = await axios.get(countryUrl);
    return { confirmed, recovered, deaths };
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries }
    } = await axios.get(url + "/countries");
    return countries;
  } catch (error) {
    console.log(error);
  }
};
