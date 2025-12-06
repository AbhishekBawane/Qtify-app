import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

export default function Section({ title, fetchUrl }) {
  const [items, setItems] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const sliderRef = useRef(null); // 👈 make sure this is imported

  useEffect(() => {
    axios
      .get(fetchUrl)
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, [fetchUrl]);

  // Scroll handlers
  const handleScroll = (direction) => {
    if (!sliderRef.current) return;

    const scrollAmount = sliderRef.current.clientWidth; // scroll by one full view
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h3>{title}</h3>

        <button
          className={styles.expandBtn}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Collapse" : "Show All"}
        </button>
      </div>

      {/* Collapsed: 1-row slider */}
      {!expanded && (
        <div className={styles.sliderWrapper}>
          <button
            className={styles.arrowBtn}
            onClick={() => handleScroll("left")}
          >
            {"<"}
          </button>

          <div className={styles.slider} ref={sliderRef}>
            {items.map((item) => (
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
            onClick={() => handleScroll("right")}
          >
            {">"}
          </button>
        </div>
      )}

      {/* Expanded: full grid */}
      {expanded && (
        <div className={styles.grid}>
          {items.map((item) => (
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
  );
}
