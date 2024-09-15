import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromTMDB = async (url) => {
  try {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ENV_VARS.TMDB_API_KEY}`,
      },
    };

    const response = await axios.get(url, options);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch data from TMDB: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    // Log the error for debugging purposes
    console.error(error.message);
    // Re-throw the error with additional context
    throw new Error(`Error fetching data from TMDB: ${error.message}`);
  }
};
