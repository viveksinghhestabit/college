import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getColleges, getStates, signupUser } from "@/api";
import SEO from "@/components/Seo";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { storeUser } from "@/utils/authStorage";
import styles from "@/styles/AuthPage.module.scss";

const SignupPage = () => {
  const router = useRouter();
  const [states, setStates] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    neetScore: "",
    preferredState: "",
    preferredCollege: "",
    password: "",
  });

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const [statesRes, collegesRes] = await Promise.all([
          getStates(),
          getColleges(),
        ]);

        setStates(statesRes?.data?.data || []);
        setColleges(collegesRes?.data?.data || []);
      } catch (error) {
        toast.error("Unable to load preferred state/college list");
      }
    };

    fetchPreferences();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const payload = {
        ...formData,
        neetScore: formData.neetScore || null,
      };
      const res = await signupUser(payload);
      const user = res?.data?.user;

      if (!user) {
        toast.error("Unable to signup. Please try again.");
        return;
      }

      storeUser(user);
      window.dispatchEvent(new Event("auth-state-updated"));
      toast.success("Signup successful");
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO pageTitle="Signup" />
      <Header />
      <section className={styles.authPage}>
        <div className="container-lg">
          <div className={styles.authCard}>
            <h1 className={styles.title}>Signup</h1>
            <p className={styles.subtitle}>
              Create your account to get personalized counselling support.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className={styles.label}>Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-control ${styles.input}`}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className={styles.label}>Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control ${styles.input}`}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className={styles.label}>Phone number*</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`form-control ${styles.input}`}
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className={styles.label}>NEET score (optional)</label>
                  <input
                    type="number"
                    name="neetScore"
                    min="0"
                    max="720"
                    value={formData.neetScore}
                    onChange={handleChange}
                    className={`form-control ${styles.input}`}
                    placeholder="Enter NEET score"
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className={styles.sectionTitle}>
                  Preferred state/college (optional)
                </div>
                <div className={styles.helperText}>
                  You can skip this now and update it later.
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <select
                    name="preferredState"
                    value={formData.preferredState}
                    onChange={handleChange}
                    className={`form-select ${styles.input}`}
                  >
                    <option value="">Select preferred state</option>
                    {states?.map((state) => (
                      <option key={state?._id} value={state?.name}>
                        {state?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <select
                    name="preferredCollege"
                    value={formData.preferredCollege}
                    onChange={handleChange}
                    className={`form-select ${styles.input}`}
                  >
                    <option value="">Select preferred college</option>
                    {colleges?.map((college) => (
                      <option key={college?._id} value={college?.fullName}>
                        {college?.fullName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className={styles.label}>Password*</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-control ${styles.input}`}
                  placeholder="Create a password"
                  minLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                className={`btn ${styles.primaryButton}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Signup"}
              </button>
            </form>

            <button
              type="button"
              className={`btn ${styles.secondaryButton}`}
              onClick={() => router.push("/login")}
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SignupPage;
