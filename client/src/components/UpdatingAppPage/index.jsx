import React from 'react';
import styles from "./styles.module.scss"

const UpdatingAppPage = () => {
  return (
    <div className={styles.updatingPage}>
      <h1>Ведутся технические работы.</h1>
      <h2>Приложение скоро заработает.</h2>
    </div>
  );
};

export {UpdatingAppPage};