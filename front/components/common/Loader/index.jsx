import React from "react";
import styles from "./Loader.module.scss";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="text-center">
      <Image
        src="/assets/spinner.gif"
        width="0"
        height="0"
        className={`${styles.loader} w-100 h-auto`}
        sizes="100vw"
        alt="brand-logo"
        draggable={false}
      />
    </div>
  );
};

export default Loader;
