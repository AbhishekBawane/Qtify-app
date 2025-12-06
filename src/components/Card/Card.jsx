import React from "react";
import Chip from "@mui/material/Chip";
import styles from "./Card.module.css";

function Card({ image, title, follows }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} />
        <Chip
          label={`${follows} Follows`}
          size="small"
          className={styles.chip}
        />
      </div>
      <p className={styles.title}>{title}</p>
    </div>
  );
}

export default Card;
