import React from "react";
import styles from "./Sidebar.module.scss";
import { NAVLINKS, NAVLINKS_MOBILE } from "@/constants/navlinksData";
import Link from "next/link";

const Sidebar = ({ toggleSidebar, onOpenModalClick, isLoggedIn, onLogout }) => {
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
      {isLoggedIn ? (
        <button
          onClick={() => {
            onLogout();
            toggleSidebar();
          }}
          className={`${styles.authButton} btn btn-outline-primary d-flex align-items-center justify-content-center mt-3`}
        >
          Logout
        </button>
      ) : (
        <Link
          href="/login"
          onClick={toggleSidebar}
          className={`${styles.authButton} btn btn-outline-primary d-flex align-items-center justify-content-center mt-3`}
        >
          Login / Signup
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
