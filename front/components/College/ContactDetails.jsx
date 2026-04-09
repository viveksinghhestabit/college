import { submitEnquiry } from "@/api";
import React, { useState } from "react";
import { BsFillTelephoneFill, BsQrCode } from "react-icons/bs";
import { FaInstagram, FaWhatsapp, FaYoutube, FaFacebook } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import ToastMessage from "../common/Toasts";

const defaultState = {
  fullName: "",
  phone: "",
  email: "",
  message: "",
  source: "Contact details form",
};

const quickReachLinks = [
  {
    label: "Whatsapp",
    href: "https://wa.me/+919355001127",
    icon: FaWhatsapp,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@collgeveda",
    icon: FaYoutube,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/collegevedaofficial/",
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/collegevedaofficial",
    icon: FaFacebook,
  },
];

const brochureLink =
  "https://drive.google.com/file/d/19nAZ1LLw15to5Maa7Qc-pcMLRAn-hLIc/view";

const ContactDetails = () => {
  const [formData, setFormData] = useState(defaultState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await submitEnquiry(formData);
      ToastMessage({
        type: "success",
        message:
          "Contact form submitted succesfully!, our team will connect with you shortly.",
      });
      setFormData({ ...defaultState });
    } catch (err) {
      ToastMessage({
        type: "error",
        message: "Oops something went wrong!",
      });
      setFormData({ ...defaultState });
      console.log("error", err);
    }
  };

  return (
    <section className="container-lg mb-5 pb-sm-5">
      <div className="row">
        <div className="col-sm-4 ps-0 mb-sm-0 mb-4">
          <div className="border rounded overflow-hidden contact-form-college h-100">
            <h5 className="bg-green-common p-3 text-white ">Contact Details</h5>
            <div className="p-5">
              <h3>
                <strong>Office Address</strong>
              </h3>
              <div className="d-flex align-items-center gap-3 mt-2">
                <FaLocationDot fontSize={24} />
                <p className="mb-0">
                  F-20/08 wave one ( silver unit ) sector 18 noida
                  - 201301 India
                </p>
              </div>
              <hr className="w-100 mt-5 mb-0" />
            </div>
            <div className="px-5 pb-5">
              <h3>
                <strong>Contact Info</strong>
              </h3>
              <div className="d-flex align-items-center gap-3 mt-3">
                <BsFillTelephoneFill fontSize={20} />
                <a href="tel:9355001127" className="text-black">
                  9355001127,
                </a>
                <a href="tel:9355001128" className="text-black">
                  9355001128
                </a>
              </div>
              <div className="d-flex align-items-center gap-3 mt-3">
                <MdEmail fontSize={24} />
                <a href="mailto:info@collegeveda.com" className="text-black">
                  info@collegeveda.com
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-5 ps-0 mb-sm-0 mb-4">
          <div className="p-sm-5 py-sm-0 py-5 rounded d-flex flex-column align-items-center contact-form-college h-100">
            <form action="#" onSubmit={handleSubmit}>
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control bg-gray"
                  placeholder="Enter Your Name"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  required
                  name="fullName"
                  onChange={handleChange}
                  value={formData.fullName}
                />
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control bg-gray"
                  placeholder="Enter Your Email"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  required
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control bg-gray"
                  placeholder="Enter Your Phone"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  required
                  name="phone"
                  onChange={handleChange}
                  value={formData.phone}
                />
              </div>
              <div className="input-group mb-4">
                <textarea
                  row="4"
                  type="text"
                  className="form-control bg-gray"
                  placeholder="Write Your Message"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  required
                  name="message"
                  onChange={handleChange}
                  value={formData.message}
                />
              </div>
              <button
                type="submit"
                className="bg-green-common border-none rounded-pill outline-none px-5 py-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="col-sm-3 ps-0 mb-sm-0 mb-4">
          <div className="border rounded overflow-hidden contact-form-college quick-reach-card h-100 d-flex flex-column">
            <h5 className="bg-green-common p-3 text-white mb-0">Quick Reach</h5>
            <div className="quick-reach-body flex-grow-1">
              {quickReachLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="quick-reach-item text-decoration-none"
                >
                  <div className="quick-reach-label-wrap">
                    <span className="quick-reach-icon">
                      <Icon fontSize={20} />
                    </span>
                    <span className="quick-reach-label">{label}</span>
                  </div>
                  <div className="quick-reach-qr" aria-hidden="true">
                    <BsQrCode fontSize={44} />
                  </div>
                </a>
              ))}
            </div>
            <div className="quick-reach-footer">
              <a
                href={brochureLink}
                target="_blank"
                rel="noreferrer"
                className="quick-reach-brochure"
              >
                Download brochure
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactDetails;
