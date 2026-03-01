import React, { useState } from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import { NAVLINKS } from "@/constants/navlinksData";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { Modal } from "react-responsive-modal";
import ConsultationForm from "../ConsultationForm";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(-1);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleDropdownClick = (index) => {
    if (index === activeDropdown) {
      setActiveDropdown(-1);
    } else {
      setActiveDropdown(index);
    }
  };

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.topHeader}>
          <div className="container-lg">
            <div
              className={`${styles.contactInfo} d-flex align-items-center py-2 text-white`}
            >
              <div className="me-4">
                <i className="fa fa-envelope me-2" />
                Email us:{" "}
                <a href="mailto:info@collegeveda.com" className="text-white">
                  info@collegeveda.com
                </a>
              </div>
              <div className="ps-4">
                <i className="fa fa-phone me-2" />
                Hotline:{" "}
                <a href="tel:9355001127" className="text-white me-2">
                  9355001127,
                </a>
                <a href="tel:9355001128" className="text-white">
                  9355001128
                </a>
              </div>
            </div>
          </div>
        </div>
        <nav
          className={`${styles.mainNavbar} navbar navbar-expand-md navbar-light bg-white`}
        >
          <div className="container-lg">
            <a className={`${styles.navbarBrand} navbar-brand`} href="/">
              <Image
                src="/assets/images/common/brand-logo.webp"
                width="0"
                height="0"
                className="w-100 h-auto"
                sizes="100vw"
                alt="brand-logo"
                draggable={false}
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={toggleSidebar}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav d-flex align-items-center">
                {NAVLINKS?.map((item, index) => {
                  if (item?.subLinks && item.subLinks.length > 0) {
                    return (
                      <div className="dropdown" key={`nav-link-${index}`}>
                        <button
                          onClick={() => handleDropdownClick(index)}
                          className="dropbtn"
                        >
                          {item?.name} <i className="fa fa-chevron-down" />
                        </button>
                        <div
                          id="myDropdown"
                          className={`dropdown-content ${
                            activeDropdown === index ? "show" : ""
                          }`}
                        >
                          {item?.subLinks?.map((item, index) => (
                            <Link
                              className="nav-link"
                              href={item.url}
                              key={`dropdown-item-${index}`}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <li
                      key={`nav-link-${index}`}
                      className={`${styles.navItem} nav-item px-2`}
                    >
                      <Link className="nav-link" href={item.url}>
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <button
              onClick={() => onOpenModal()}
              className={`${styles.consultationButton} btn btn-primary d-sm-flex align-items-center justify-content-center d-none`}
            >
              <span>Collaboration</span>
              <i className="fa fa-arrow-right d-block me-2" />
            </button>
          </div>
        </nav>
        {showSidebar && (
          <Sidebar
            onOpenModalClick={onOpenModal}
            toggleSidebar={toggleSidebar}
          />
        )}
      </div>
      <Modal
        open={open}
        onClose={onCloseModal}
        styles={{
          modal: {
            maxWidth: "1100px",
            width: "90%",
            padding: "unset",
            borderRadius: "8px",
          },
          overlay: {
            background: "rgba(0, 0, 0, 0.5)",
          },
          closeButton: {
            background: "transparent",
          },
        }}
        center
      >
        <ConsultationForm handleClose={onCloseModal} />
      </Modal>
    </>
  );
};

export default Header;
