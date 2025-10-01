import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "./Loader.module.scss";

interface LoaderProps {
  style?: React.CSSProperties;
}

const Loader = ({ style }: LoaderProps) => {
  return (
    <div className={styles.spinner}>
      <Spinner variant="primary" className={styles.spin} style={style} />
    </div>
  );
};

export default Loader;
