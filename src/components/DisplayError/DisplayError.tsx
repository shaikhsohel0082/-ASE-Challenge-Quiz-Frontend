import React from "react";
import styles from "./DisplayError.module.scss";
interface Props {
  errorMessage?: string;
  style?: React.CSSProperties;
}
const DisplayError = ({
  errorMessage = "Error Loading Content...",
  style,
}: Props) => {
  return (
    <div className={`${styles.error} text-danger`} style={style}>
      {errorMessage}
    </div>
  );
};

export default DisplayError;
