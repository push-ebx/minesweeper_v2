import {CircularProgress} from "@nextui-org/react";
import styles from "./styles.module.scss"
import clsx from 'clsx'

const Loader = ({isLoading, isFullScreen, className}) => {
  return (
    isLoading ?
    <div className={clsx(isFullScreen && styles.isFullScreen, className)}>
      <CircularProgress color="success" aria-label="Loading..."/>
    </div>
      :
    ""
  );
};

export {Loader};