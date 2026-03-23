import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { loginUser } from "@/api";
import SEO from "@/components/Seo";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { storeUser } from "@/utils/authStorage";
import styles from "@/styles/AuthPage.module.scss";

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in email and password");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await loginUser(formData);
      const user = res?.data?.user;

      if (!user) {
        toast.error("Unable to login. Please try again.");
        return;
      }

      storeUser(user);
      window.dispatchEvent(new Event("auth-state-updated"));
      toast.success("Login successful");
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO pageTitle="Login" />
      <Header />
      <section className={styles.authPage}>
        <div className="container-lg">
          <div className={styles.authCard}>
            <h1 className={styles.title}>Login</h1>
            <p className={styles.subtitle}>
              Continue your counselling journey with College Veda.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
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

              <div className="mb-3">
                <label className={styles.label}>Password*</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-control ${styles.input}`}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className={`btn ${styles.primaryButton}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </form>

            <button
              type="button"
              className={`btn ${styles.secondaryButton}`}
              onClick={() => router.push("/signup")}
            >
              Signup
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default LoginPage;
