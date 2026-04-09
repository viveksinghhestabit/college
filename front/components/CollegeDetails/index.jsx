import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineFlag } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import ContactDetails from "@/components/College/ContactDetails";
import { useRouter } from "next/router";
import {
  getCollegeById,
  getUserCollegeRating,
  submitCollegeRating,
} from "@/api";
import CommonTable from "../common/common-table";
import Loader from "../common/Loader";
import Modal from "react-responsive-modal";
import Link from "next/link";
import ApplyForm from "../common/ApplyForm";
import { getStoredUser } from "@/utils/authStorage";
import { toast } from "react-toastify";

const CollegeDetailsComponent = () => {
  const router = useRouter();
  const collegeId = router?.query?.collegeId;

  const [collegeDetails, setCollegeDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingSubmitting, setRatingSubmitting] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

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

  useEffect(() => {
    const user = getStoredUser();
    setLoggedInUser(user);
  }, []);

  useEffect(() => {
    const fetchMyRating = async () => {
      if (!collegeId || !loggedInUser?.id) {
        return;
      }

      try {
        const res = await getUserCollegeRating(collegeId, loggedInUser.id);
        setSelectedRating(res?.data?.data?.rating || 0);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchMyRating();
  }, [collegeId, loggedInUser?.id]);

  const handleRatingSubmit = async () => {
    if (!loggedInUser?.id) {
      toast.error("Please login to rate this college");
      return;
    }

    if (!selectedRating) {
      toast.error("Please select a rating");
      return;
    }

    try {
      setRatingSubmitting(true);
      await submitCollegeRating(collegeId, {
        userId: loggedInUser.id,
        rating: selectedRating,
      });
      await fetchCollegeDetails(collegeId);
      toast.success("Rating submitted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit rating");
    } finally {
      setRatingSubmitting(false);
    }
  };

  const renderStaticStars = (ratingValue) => {
    const roundedRating = Math.round(Number(ratingValue || 0));
    return Array.from({ length: 5 }, (_, index) => (
      <AiFillStar
        key={`static-rating-star-${index}`}
        color={index < roundedRating ? "#FFC90D" : "#cfd4dc"}
        fontSize={22}
      />
    ));
  };

  const renderInteractiveStars = () => {
    const activeStars = hoverRating || selectedRating;
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      return (
        <button
          type="button"
          key={`interactive-rating-star-${starValue}`}
          className="btn p-0 border-0 bg-transparent"
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => setSelectedRating(starValue)}
          aria-label={`Rate ${starValue} star`}
        >
          <AiFillStar
            color={starValue <= activeStars ? "#FFC90D" : "#cfd4dc"}
            fontSize={28}
          />
        </button>
      );
    });
  };

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
                <div className="d-flex align-items-center gap-2">
                  <div className="d-flex">
                    {renderStaticStars(collegeDetails?.averageRating)}
                  </div>
                  <p className="mb-0">
                    {Number(collegeDetails?.averageRating || 0).toFixed(1)}
                    {collegeDetails?.totalRatings
                      ? ` (${collegeDetails.totalRatings})`
                      : ""}
                  </p>
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
              href="https://drive.google.com/file/d/19nAZ1LLw15to5Maa7Qc-pcMLRAn-hLIc/view"
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

      {loggedInUser && (
        <div className="container-lg border rounded p-4">
          <h4 className="mb-3">Reviews and rating</h4>
          <div className="my-4 border-bottom d-flex pb-4">
            <div className="d-flex border-end align-items-center flex-column col-6">
              <div className="mb-2 d-flex">
                {renderStaticStars(collegeDetails?.averageRating)}
              </div>
              <strong className="mb-2">
                {Number(collegeDetails?.averageRating || 0).toFixed(1)} / 5
              </strong>
              <p className="w-75 text-center mb-0">
                Based on {collegeDetails?.totalRatings || 0} verified user ratings.
              </p>
            </div>

            <div className="px-5 w-100 pb-2">
              <h6 className="mb-2">Give your rating</h6>
              <div className="d-flex gap-2 mb-3">{renderInteractiveStars()}</div>
              <p className="mb-3 text-muted">
                Your rating: {selectedRating ? `${selectedRating}/5` : "Not selected"}
              </p>
              <button
                className="bg-green-common p-2 w-100 border-0"
                onClick={handleRatingSubmit}
                disabled={ratingSubmitting}
              >
                {ratingSubmitting ? "Submitting..." : "Submit rating"}
              </button>
            </div>
          </div>
        </div>
      )}

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
