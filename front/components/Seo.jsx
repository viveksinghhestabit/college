import Head from "next/head";

const SEO = ({ pageTitle }) => {
  const title = `College Veda | ${pageTitle}`;
  return (
    <Head>
      <title>{title}</title>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      
      {/* Optimized Meta Description */}
      <meta
        name="description"
        content="Discover the top private BAMS colleges in India with the lowest fees. Explore rankings, admission details, and expert guidance for your Ayurveda career with College Veda."
      />

      {/* Targeted SEO Keywords */}
      <meta
        name="keywords"
        content="top private BAMS colleges in India, lowest fee BAMS private colleges in India, top 10 private BAMS colleges in India, best private Ayurveda colleges in India, best BAMS private colleges in India"
      />

      <meta name="robots" content="index, follow" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      
      <link rel="canonical" href="https://www.collegeveda.com/" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default SEO;
