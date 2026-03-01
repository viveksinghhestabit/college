import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineFlag } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import ContactDetails from "@/components/College/ContactDetails";
import { useRouter } from "next/router";
import { getCollegeById } from "@/api";
import CommonTable from "../common/common-table";
import Loader from "../common/Loader";
import Modal from "react-responsive-modal";
import Link from "next/link";
import ApplyForm from "../common/ApplyForm";

const CollegeDetailsComponent = () => {
  const router = useRouter();
  const collegeId = router?.query?.collegeId;

  const [collegeDetails, setCollegeDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const fetchCollegeDetails = async (collegeId) => {
    try {
      const res = await getCollegeById(collegeId);
      setCollegeDetails(res?.data?.data);
      setLoading(false);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    if (collegeId) {
      setLoading(true);
      fetchCollegeDetails(collegeId);
    }
  }, [collegeId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div
        className="single-college-head-container"
        style={{
          background: `url('/assets/images/common/breadcrumb-bg.webp') no-repeat center center/cover`,
        }}
      >
        <div className="content d-flex flex-column align-items-center justify-content-center">
          <div className="container-lg py-5 pb-2 gap-4 d-flex align-items-center">
            <div className="rounded-circle bg-white overflow-hidden p-2">
              <Image
                src={collegeDetails?.logo}
                height={80}
                width={80}
                alt="logo"
              />
            </div>
            <div className="d-flex flex-column text-white ">
              <h1 className="text-white">{collegeDetails?.fullName}</h1>
              <div className="d-flex gap-4">
                <div className="d-flex">
                  <div>
                    <AiFillStar color="#FFC90D" fontSize={22} />
                  </div>
                  <div>
                    <AiFillStar fontSize={22} color="#FFC90D" />
                  </div>
                  <div>
                    <AiFillStar fontSize={22} color="#FFC90D" />
                  </div>
                  <div>
                    <AiFillStar fontSize={22} color="#FFC90D" />
                  </div>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <FaLocationDot color="white" />
                  <p className="mb-0">
                    {collegeDetails?.city}, {collegeDetails?.state}
                  </p>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <AiOutlineFlag />
                  <p className="mb-0">{collegeDetails?.collegeType}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="justify-content-end pb-4 d-flex container">
            <Link
              href="https://drive.google.com/file/d/1F5ifIrmdH3DVlzzgDezaNuEI8X95qkE-/view"
              target="_blank"
              className={`btn btn-outline-light me-3 py-3`}
              style={{
                lineHeight: "100%",
                fontWeight: 500,
              }}
            >
              Download brochure
            </Link>
            <button
              className="bg-black text-white p-2 rounded px-5"
              onClick={onOpenModal}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      <div className="container-lg border rounded my-5 p-4">
        <h4 className="mb-3">About</h4>
        <div
          dangerouslySetInnerHTML={{
            __html: collegeDetails?.description,
          }}
        ></div>
      </div>

      <div className="container-lg border rounded mb-5 p-4">
        <h4 className="mb-3">{collegeDetails?.fullName} Top Courses & Fees</h4>
        {collegeDetails?.courses?.map((item, index) => (
          <div
            className="d-flex justify-content-between align-items-center mb-3"
            key={`course-${index}`}
          >
            <p className="mb-0">
              {item?.specialization} ({item?.name})
            </p>
            <div className="d-flex align-items-center gap-3">
              <div className="">
                <h6 className="mb-0">Annual Fees</h6>
                <p className="text-success mb-0">{item?.fee}</p>
              </div>
              <button
                className="border border-success p-2 text-success bg-white"
                onClick={onOpenModal}
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="container-lg px-0">
        {collegeDetails?.tables?.map((item, index) => (
          <CommonTable tableData={item} key={`table-${index}`} />
        ))}
      </div>

      <div className="container-lg border rounded mb-5 p-4">
        <h4 className="mb-3">College Gallery</h4>
        <div className="d-flex gap-3 overflow-hidden">
          {collegeDetails?.gallery?.map?.((item, index) => (
            <div className="col-3" key={`gallery-${index}`}>
              <Image
                src={item}
                width="0"
                height="0"
                className="w-100 h-100"
                sizes="100vw"
                alt="brand-logo"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <ContactDetails />

      <div className="container-lg border rounded p-4">
        <h4 className="mb-3">Reviews and rating</h4>
        <div className="my-4 border-bottom d-flex ">
          <div className="d-flex  border-end align-items-center flex-column col-6">
            <div className="mb-2">
              <AiFillStar fontSize={22} color="#FFC90D" />
              <AiFillStar fontSize={22} color="#FFC90D" />
              <AiFillStar fontSize={22} color="#FFC90D" />
              <AiFillStar fontSize={22} color="#FFC90D" />
            </div>
            <strong className="mb-2">Write a helpfull review!</strong>
            <p className="w-50 text-center">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam,
              placeat.
            </p>
          </div>

          <div className="px-5 w-100 pb-5">
            <div className="d-flex gap-3">
              <div className="input-group mb-3 ">
                <input
                  type="text"
                  className="form-control w-100 bg-gray"
                  placeholder="Enter Your Email"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
              </div>
              <div className="input-group mb-3 ">
                <input
                  type="text"
                  className="form-control w-100 bg-gray"
                  placeholder="Enter Your Email"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
              </div>
            </div>
            <div className="input-group mb-3 ">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                placeholder="Write a review"
                rows="3"
              ></textarea>
            </div>
            <button className="bg-green-common p-2 w-100 border-0">
              Submit
            </button>
          </div>
        </div>
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
        <ApplyForm handleClose={onCloseModal} />
      </Modal>
    </>
  );
};

export default CollegeDetailsComponent;
