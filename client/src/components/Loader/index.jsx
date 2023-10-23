import {CircularProgress} from "@nextui-org/react";
import styles from "./styles.module.scss"

const Loader = ({isLoading, isFullScreen}) => {
  return (
    isLoading ?
    <div className={isFullScreen ? styles.isFullScreen : ""}>
      <CircularProgress color="success" aria-label="Loading..."/>
    </div>
      :
    ""
  );
};

export {Loader};