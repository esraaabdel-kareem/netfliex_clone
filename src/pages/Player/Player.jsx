import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
const Player = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjY4OGI5OGFjMTk3ZThmZjM3Njg0MGMzYjgyNDc1MCIsIm5iZiI6MTc2MTc4MjEwOS45NDksInN1YiI6IjY5MDJhOTVkN2FkZmUzZjhhNWVhYjdkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D_CRM1JL8AfMjf5Q0f27fpxC2r7o__qKsiWe1u7Namk",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0] || {}))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={() => navigate(-1)} />

      {apiData?.key ? (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
          className="player-video"
        ></iframe>
      ) : (
        <p style={{ color: "white" }}>Loading video...</p>
      )}

      <div className="player_info">
        <p className="player_desc">
          {apiData?.published_at
            ? apiData.published_at.slice(0, 10)
            : "Unknown date"}
        </p>
        <p className="player_title">{apiData?.name || "No title"}</p>
        <p className="player_type">{apiData?.type || "N/A"}</p>
      </div>
    </div>
  );
};

export default Player;
