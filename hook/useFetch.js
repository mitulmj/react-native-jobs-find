import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "react-native-dotenv";

const rapidApiKey = RAPID_API_KEY;

const useFetch = (endPoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    url: `https://jsearch.p.rapidapi.com/${endPoint}`,
    params: {
      ...query,
    },
  };

  const fetchData = async function () {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reFetch = function () {
    setIsLoading(true);
    fetchData();
  };

  return { isLoading, error, data, reFetch };
};

export default useFetch;
