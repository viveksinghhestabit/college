import React from "react";
import styles from "./FaqSection.module.scss";
import Link from "next/link";

const faqs = [
  {
    id: 1,
    question: "Why choose College Veda?",
    answer:
      "Our team loves Ayurveda and we're here to guide you. Think of us as your Ayurvedic mentors, ready to share our passion and knowledge.",
  },
  {
    id: 2,
    question: "Why choose Ayurveda colleges?",
    answer:
      "Ayurveda colleges offer a holistic approach to healthcare, focusing on natural healing and personalized treatments.",
  },
  {
    id: 3,
    question:
      "What are the benefits of studying Ayurveda in a dedicated college?",
    answer:
      "Ayurveda colleges provide specialized education, hands-on experience, and a deep connection with traditional practices.",
  },
  {
    id: 4,
    question:
      "How does Ayurveda education promote a patient-centered approach?",
    answer:
      "Ayurveda emphasizes personalized healthcare, considering individual constitutions and imbalances for tailored treatments.",
  },
  {
    id: 5,
    question: "Are Ayurveda colleges globally recognized?",
    answer:
      "Many Ayurveda colleges adhere to international standards and hold accreditation, providing opportunities for global practice and research.",
  },
  {
    id: 6,
    question: "How does Ayurveda contribute to sustainable healthcare?",
    answer:
      "Ayurveda's natural approach promotes environmental consciousness, aligning with sustainable practices in healthcare.",
  },
];

const FaqSection = () => {
  return (
    <section className={`py-sm-5 ${styles.faqSection}`}>
      <div className="container-lg py-5">
        <div className="row align-items-center">
          <div className="col-xxl-5 col-xl-5 col-lg-5">
            <div className={styles.leftContent}>
              <div className="">
                <span className="">Learn how to get started</span>
                <h2 className="">Frequently Asked Questions</h2>
              </div>
              <p>
                {`If you're interested in doing BAMS, Collegeveda can
                show you lots of information about different colleges and what
                they offer. Connect with us today.`}
              </p>

              <div className={styles.readBtn}>
                <Link href="/about">Know more</Link>
              </div>
            </div>
          </div>
          <div className="col-xxl-7 col-xl-7 col-lg-7">
            <div className="faq__item-wrapper pl-100 mt-3">
              <div className="faq__accordion">
                <div className="accordion" id="faqaccordion">
                  {faqs.map((item) => (
                    <div key={`faqs=${item.id}`} className="accordion-item">
                      <h2 className="accordion-header" id={`faq-${item.id}`}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse-${item.id}`}
                          aria-expanded="true"
                          aria-controls={`collapse-${item.id}`}
                        >
                          {item.question}
                        </button>
                      </h2>
                      <div
                        id={`collapse-${item.id}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`faq-${item.id}`}
                        data-bs-parent="#faqaccordion"
                      >
                        <div className="accordion-body">
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
