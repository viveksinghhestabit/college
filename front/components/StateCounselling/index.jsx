import React from "react";
import BreadcrumbSection from "../About/BreadcrumbSection";
import styles from "./StateCounselling.module.scss";
import Image from "next/image";
import Link from "next/link";

function getDomain(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  } catch (error) {
    console.error("Invalid URL:", url);
    return null;
  }
}

const linksList = [
  { name: "Andhra Pradesh", link: "https://drntr.uhsap.in/index/" },
  {
    name: "Arunachal Pradesh",
    link: "https://namayush.gov.in/content/arunachal-pradesh",
  },
  { name: "Assam", link: "https://www.dme.assam.gov.in" },
  { name: "Bihar", link: "https://www.bceceboard.bihar.gov.in" },
  { name: "Chhattisgarh", link: "https://www.cghealth.nic.in" },
  { name: "Delhi", link: "https://fmsc.du.ac.in/unani.htm" },
  { name: "Goa", link: "https://www.dte.goa.gov.in" },
  { name: "Gujarat", link: "https://www.medadmgujarat.org" },
  { name: "Haryana", link: "https://www.skau.in" },
  { name: "Himachal Pradesh", link: "https://amruhp.ac.in/" },
  { name: "Jammu and Kashmir", link: "https://www.jkbopee.gov.in/" },
  { name: "Jharkhand", link: "https://jsamc.in/registration.html" },
  { name: "Karnataka", link: "https://cetonline.karnataka.gov.in/kea/" },
  { name: "Kerala", link: "https://www.ceekerala.org" },
  { name: "Madhya Pradesh", link: "https://www.ayush.mp.gov.in" },
  { name: "Maharashtra", link: "https://www.mahacet.org" },
  {
    name: "Manipur",
    link: "https://stateayushsocietymanipur.mn.gov.in/counselling",
  },
  { name: "Meghalaya", link: "https://meghealth.gov.in/dhs_mi_ayush.html" },
  { name: "Odisha", link: "https://www.ogee.nic.in" },
  { name: "Pondicherry", link: "https://www.centacpuducherry.in/" },
  { name: "Punjab", link: "https://www.graupunjab.org" },
  { name: "Rajasthan", link: "https://www.rajugpg.ayushcounselling.in" },
  { name: "Tamilnadu", link: "https://www.tnnrmu.ac.in" },
  { name: "Uttar Pradesh", link: "https://upayushcounseling.upsdc.gov.in/" },
  { name: "Uttrakhand", link: "https://www.uau.ac.in/" },
  { name: "West Bengal", link: "https://www.wbhealth.gov.in" },
];

const StateCounsellingComponent = () => {
  return (
    <div className={styles.cutoffSection}>
      <BreadcrumbSection
        imgURL="/assets/images/breadcrumbs/rank-predictor.webp"
        title="State Counselling"
      />
      <div className="container-lg py-5">
        <div className={styles.content}>
          <div className="mb-4">
            <p>
              Every state has a different website for AYUSH counseling. College
              Veda helps you in counseling. We mention the official website of
              the state so that it is easy for you to understand the counseling
              process -
            </p>
            <div
              type="a"
              className="d-flex align-items-stretch justify-content-center gap-4 flex-wrap"
            >
              {linksList?.map((item, index) => (
                <p
                  key={`state-link-${index}`}
                  className={`${styles.stateCard} card p-3 text-center`}
                >
                  <strong>{item?.name}</strong>
                  <Link
                    href={item?.link}
                    target="_blank"
                    className={styles.link}
                  >
                    {getDomain(item?.link)}
                  </Link>
                </p>
              ))}
            </div>
            <Image
              src="/assets/images/common/state-counselling-img-1.avif"
              width="0"
              height="0"
              className="w-100 h-auto"
              sizes="100vw"
              alt="all india counselling chart"
              draggable={false}
            />
            <Image
              src="/assets/images/common/state-counselling-img-2.avif"
              width="0"
              height="0"
              className="w-100 h-auto"
              sizes="100vw"
              alt="all india counselling chart"
              draggable={false}
            />
            <Image
              src="/assets/images/common/state-counselling-img-3.avif"
              width="0"
              height="0"
              className="w-100 h-auto"
              sizes="100vw"
              alt="all india counselling chart"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateCounsellingComponent;
