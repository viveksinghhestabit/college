import React from "react";
import styles from "./Sidebar.module.scss";
import { NAVLINKS, NAVLINKS_MOBILE } from "@/constants/navlinksData";
import Link from "next/link";

const Sidebar = ({ toggleSidebar, onOpenModalClick }) => {
  return (
    <div className={`${styles.sidebarContainer} p-4 d-sm-none`}>
      <button
        className="btn w-100 d-flex justify-content-end"
        onClick={toggleSidebar}
      >
        <i className="fa fa-times"></i>
      </button>
      <div className={`${styles.listContainer}`}>
        {NAVLINKS_MOBILE.map((item) => (
          <div className={`${styles.listItem} `}>
            <Link href={item?.url}>{item?.name}</Link>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          onOpenModalClick();
          toggleSidebar();
        }}
        className={`${styles.consultationButton} btn btn-primary d-flex align-items-center justify-content-center mt-5`}
      >
        <span>Collaboration</span>
        <i className="fa fa-arrow-right d-block me-2" />
      </button>
    </div>
  );
};

export default Sidebar;
