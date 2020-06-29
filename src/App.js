import React from "react";
import styles from "./App.module.css";
import Cards from "./components/Cards/Cards";

export default function App() {
  return (
    <div className={styles.container}>
      <Cards />
    </div>
  );
}
