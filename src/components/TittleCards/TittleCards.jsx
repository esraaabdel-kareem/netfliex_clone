import React, { useEffect, useRef, useState } from "react";
import "./TittleCards.css";
import { Link } from "react-router-dom";

const TittleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjY4OGI5OGFjMTk3ZThmZjM3Njg0MGMzYjgyNDc1MCIsIm5iZiI6MTc2MTc4MjEwOS45NDksInN1YiI6IjY5MDJhOTVkN2FkZmUzZjhhNWVhYjdkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D_CRM1JL8AfMjf5Q0f27fpxC2r7o__qKsiWe1u7Namk",
    },
  };

  useEffect(() => {
    let apiUrl = "";

    if (category === "kids") {
      apiUrl =
        "https://api.themoviedb.org/3/discover/movie?language=en&with_genres=16,10751&page=1";
    } else if (category === "horror") {
      apiUrl =
        "https://api.themoviedb.org/3/discover/movie?language=en&with_genres=27&page=3";
    } else if (category === "science_fiction") {
      apiUrl = `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=878&sort_by=popularity.desc&page=1`;
    } else if (category === "new_kids") {
      apiUrl = `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=16,10751&page=5`;
    } else {
      apiUrl =
        "https://api.themoviedb.org/3/discover/movie?language=en&with_genres=16,10751&sort_by=popularity.desc&page=3";
    }

    fetch(apiUrl, options)
      .then((res) => res.json())
      .then((res) => setApiData(res.results || []))
      .catch((err) => console.error(err));

    const scrollContainer = cardsRef.current;
    const handleScroll = (e) => {
      e.preventDefault();
      scrollContainer.scrollLeft += e.deltaY;
    };
    scrollContainer.addEventListener("wheel", handleScroll);

    return () => scrollContainer.removeEventListener("wheel", handleScroll);
  }, [category]);

  return (
    <div className="tittleCards">
      <h1>{title ? title : "Popular on Netflix"}</h1>

      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="tittleCard" key={index}>
            <img
              src={"https://image.tmdb.org/t/p/w500" + card.backdrop_path}
              alt={card.title || card.name}
            />
            <p>{card.title || card.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TittleCards;
