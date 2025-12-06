import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

export default function Section() {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [songs, setSongs] = useState([]);

  const [expandTop, setExpandTop] = useState(false);
  const [expandNew, setExpandNew] = useState(false);

  const [songFilter, setSongFilter] = useState("all"); 

  const sliderRefTop = useRef(null);
  const sliderRefNew = useRef(null);
  const sliderRefSongs = useRef(null);

  const fetchUrlTop = "https://qtify-backend.labs.crio.do/albums/top";
  const fetchUrlNew = "https://qtify-backend.labs.crio.do/albums/new";
  const fetchUrlSongs = "https://qtify-backend.labs.crio.do/songs";


  useEffect(() => {
    axios
      .get(fetchUrlTop)
      .then((res) => setTopAlbums(res.data))
      .catch((err) => console.error("Error fetching top albums:", err));
  }, []);

 
  useEffect(() => {
    axios
      .get(fetchUrlNew)
      .then((res) => setNewAlbums(res.data))
      .catch((err) => console.error("Error fetching new albums:", err));
  }, []);

 
  useEffect(() => {
    axios
      .get(fetchUrlSongs)
      .then((res) => setSongs(res.data))
      .catch((err) => console.error("Error fetching songs:", err));
  }, []);


  const scrollSlider = (ref, direction) => {
    if (!ref.current) return;
    const amount = ref.current.clientWidth / 1.2;
    ref.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };


  const FILTER_MAP = {
    All: "all",
    Pop: "pop",
    Rock: "rock",
    Jazz: "jazz",
    Blues: "blues",
  };

  
  const filteredSongs =
    songFilter === "all"
      ? songs
      : songs.filter((song) => {
          const genreKey =
            typeof song.genre === "string"
              ? song.genre.toLowerCase()
              : song.genre?.key?.toLowerCase();

          return genreKey === songFilter;
        });

  return (
    <div className={styles.section}>

     
      <div className={styles.topAlbums}>
        <div className={styles.header}>
          <h3>Top Albums</h3>
          <button
            data-testid="top-showall-btn"
            className={styles.expandBtn}
            onClick={() => setExpandTop(!expandTop)}
          >
            {expandTop ? "Collapse" : "Show All"}
          </button>
        </div>

        {!expandTop && (
          <div className={styles.sliderWrapper}>
            <button
              className={styles.arrowBtn}
              onClick={() => scrollSlider(sliderRefTop, "left")}
            >
              {"<"}
            </button>

            <div className={styles.slider} ref={sliderRefTop}>
              {topAlbums.map((item) => (
                <Card
                  key={item.id}
                  image={item.image}
                  follows={item.follows}
                  title={item.title}
                />
              ))}
            </div>

            <button
              className={styles.arrowBtn}
              onClick={() => scrollSlider(sliderRefTop, "right")}
            >
              {">"}
            </button>
          </div>
        )}

        {expandTop && (
          <div className={styles.grid}>
            {topAlbums.map((item) => (
              <Card
                key={item.id}
                image={item.image}
                follows={item.follows}
                title={item.title}
              />
            ))}
          </div>
        )}
      </div>

    
      <div className={styles.newAlbums}>
        <div className={styles.header}>
          <h3>New Albums</h3>
          <button
            data-testid="new-showall-btn"
            className={styles.expandBtn}
            onClick={() => setExpandNew(!expandNew)}
          >
            {expandNew ? "Collapse" : "Show All"}
          </button>
        </div>

        {!expandNew && (
          <div className={styles.sliderWrapper}>
            <button
              className={styles.arrowBtn}
              onClick={() => scrollSlider(sliderRefNew, "left")}
            >
              {"<"}
            </button>

            <div className={styles.slider} ref={sliderRefNew}>
              {newAlbums.map((item) => (
                <Card
                  key={item.id}
                  image={item.image}
                  follows={item.follows}
                  title={item.title}
                />
              ))}
            </div>

            <button
              className={styles.arrowBtn}
              onClick={() => scrollSlider(sliderRefNew, "right")}
            >
              {">"}
            </button>
          </div>
        )}

        {expandNew && (
          <div className={styles.grid}>
            {newAlbums.map((item) => (
              <Card
                key={item.id}
                image={item.image}
                follows={item.follows}
                title={item.title}
              />
            ))}
          </div>
        )}
      </div>

    
      <div className={styles.songsSection}>
        <div className={styles.header}>
          <h3>Songs</h3>

        
          <div className={styles.songFilters}>
            {["All", "Rock", "Pop", "Jazz", "Blues"].map((cat) => (
              <span
                key={cat}
                className={
                  songFilter === FILTER_MAP[cat]
                    ? styles.activeFilter
                    : ""
                }
                onClick={() => {
                  setSongFilter(FILTER_MAP[cat]);
                  sliderRefSongs.current?.scrollTo({
                    left: 0,
                    behavior: "smooth",
                  });
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

       
        <div className={styles.sliderWrapper}>
          <button
            className={styles.arrowBtn}
            onClick={() => scrollSlider(sliderRefSongs, "left")}
          >
            {"<"}
          </button>

          <div className={styles.slider} ref={sliderRefSongs}>
            {filteredSongs.map((song) => (
              <Card
                key={song.id}
                image={song.image}
                follows={song.likes}
                title={song.title}
              />
            ))}
          </div>

          <button
            className={styles.arrowBtn}
            onClick={() => scrollSlider(sliderRefSongs, "right")}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
