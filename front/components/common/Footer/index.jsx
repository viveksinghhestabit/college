import React, { useEffect, useState } from "react";
import styles from "./Footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import { getStates } from "@/api";

const Footer = () => {
  const [states, setStates] = useState([]);

  const fetchStates = async () => {
    try {
      const res = await getStates();
      setStates(res?.data?.data);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  return (
    <footer className={styles.footer}>
      <div className="container-lg">
        <div className="row py-5">
          <div className="col-sm-4 mb-sm-0 mb-4">
            <a className={`${styles.navbarBrand} navbar-brand`} href="#">
              <Image
                src="/assets/images/common/brand-logo.webp"
                width="0"
                height="0"
                className="w-50 h-auto"
                sizes="100vw"
                alt="brand-logo"
                draggable={false}
              />
            </a>
            <div className={`${styles.subText} w-75`}>
              Discover our passion for shaping educational dreams into reality
              at College Veda - where expertise meets personalized guidance.
            </div>
            <div
              className={`${styles.socialLinks} d-flex align-items-center justify-content-start`}
            >
              <a
                href="https://www.facebook.com/collegevedaofficial"
                target="_blank"
                className={styles.iconContainer}
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                href="https://youtube.com/@collegeVeda-vm1xx?si=CD1sLvrRpBEZyuVa"
                target="_blank"
                className={styles.iconContainer}
              >
                <i className="fab fa-youtube" />
              </a>
              <a
                href="https://www.instagram.com/collegevedaofficial?igsh=MTZpYW51Z2lleGtyYw=="
                target="_blank"
                className={styles.iconContainer}
              >
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
          <div className="col-sm-4 mb-sm-0 mb-4">
            <div className="row">
              <div className={`${styles.footerLinks} col-6`}>
                <div className={styles.footerLinksTitle}>Colleges</div>
                <Link href="/" className={styles.footerLink}>
                  Home
                </Link>
                <Link href="/colleges" className={styles.footerLink}>
                  Colleges
                </Link>
                <Link href="/blogs" className={styles.footerLink}>
                  Blogs
                </Link>
                <Link href="/about" className={styles.footerLink}>
                  About us
                </Link>
                <Link href="/contact" className={styles.footerLink}>
                  Contact us
                </Link>
              </div>
              <div className={`${styles.footerLinks} col-6`}>
                <div className={styles.footerLinksTitle}>Popular states</div>
                {states?.map((item, index) => (
                  <Link
                    key={`footer-states-${index}`}
                    href={`/colleges?state=${item.name}`}
                    className={styles.footerLink}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className={styles.footerLinksTitle}>
              Sign Up for Our Newsletter
            </div>
            <div className={styles.subText2}>
              Receive weekly newsletter with educational, popular books and much
              more!
            </div>
            <div className={styles.newsletterContainer}>
              <div className="row mt-3">
                <div className="col-8 pe-0">
                  <input
                    type="text"
                    name="email"
                    id=""
                    className="form-control"
                    placeholder="Email address"
                  />
                </div>
                <div className="col-4 ps-0">
                  <button type="submit" className="px-0 btn d-block w-100">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className={`${styles.copyrightText} text-center mb-0`}>
          &copy; {new Date()?.getFullYear()} CollegeVeda, All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
