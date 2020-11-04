import React, { useEffect, useReducer, useState } from "react";
import { useToast, Spinner } from "@chakra-ui/core";
import axios from "axios";

import "../App.css";

const CNJokes = () => {
  const toast = useToast();

  const [random, setRandom] = useState("");
  const [firstClick, setFirstClick] = useState(false);

  const jokeReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_INIT":
        return { ...state, loading: true, error: false };
      case "FETCH_SUCCESS":
        return { ...state, loading: false, data: action.payload };
      case "FETCH_FAILURE":
        return { ...state, error: true };
      default:
        throw new Error(`Unhandled acion ${action.type} in jokeReducer`);
    }
  };

  const initialState = {
    data: "",
    loading: false,
    error: false,
  };

  const [state, dispatch] = useReducer(jokeReducer, initialState);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const fetchJokes = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios({
          method: "GET",
          url: "https://rapidapi.p.rapidapi.com/jokes/random",
          headers: {
            accept: "application/json",
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host":
              "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
          },
        });
        console.log("result", result.data);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE" });
        console.log("fail");
        toast({
          title: "Sorry, we couldn't fetch your joke",
          status: "error",
          duration: 3000,
        });
      }
    };
    fetchJokes();
  }, [random]);

  const getRandomJoke = () => {
    setFirstClick(true);
    setRandom(`« ${state.data.value} »`);
  };

  return (
    <main className="my-5">
      <header>
        <h1 className="h1">Chuck Norris Jokes</h1>
        <img alt="Chuck Norris logo" src="chuck-norris.png"></img>
      </header>
      <section className="container my-5">
        <button onClick={getRandomJoke}>Random</button>
      </section>

      <section className="container my-5">
        {state.loading ? (
          <Spinner size="xl" color="#eec643" />
        ) : (
          <p>{random}</p>
        )}
        {firstClick ? (
          ""
        ) : (
          <p style={{ color: "#EEF0F2" }}>↑ cLik tHE BoTtOn ↑</p>
        )}
      </section>
    </main>
  );
};

export default CNJokes;
