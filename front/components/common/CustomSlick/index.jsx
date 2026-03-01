import React, { useMemo } from "react";
import styles from "./CustomSlick.module.scss";
import Slider from "react-slick";

const DEFAULT_CONFIGURATION = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  arrows: true,
};

const PrevArrow = (props) => {
  const { className, style, onClick, leftArrowClassName, arrowsAsCircle } =
    props;
  return (
    <div className={styles.prevArrowWrapper}>
      <div
        className={`${className} ${styles.sliderPrevArrow} ${
          arrowsAsCircle ? styles.circleArrow : ""
        } ${leftArrowClassName}`}
        style={style}
        onClick={onClick}
      >
        <i className={`fa fa-chevron-left ${styles.leftIcon}`} />
      </div>
    </div>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick, rightArrowClassName, arrowsAsCircle } =
    props;

  return (
    <div className={styles.nextArrowWrapper}>
      <div
        className={`${className} ${styles.sliderNextArrow} ${
          arrowsAsCircle ? styles.circleArrow : ""
        } ${rightArrowClassName}`}
        style={style}
        onClick={onClick}
      >
        <i className={`fa fa-chevron-right ${styles.rightIcon}`} />
      </div>
    </div>
  );
};

const CustomSlick = ({
  children,
  overrideConfiguration = {},
  sliderName,
  handleAfterChange,
  handleBeforeChange,
  useDefaultNextAndPreviousArrows = false,
  slickRef,
  slickWrapperClassName,
  leftArrowClassName,
  rightArrowClassName,
  arrowsAsCircle,
}) => {
  const settings = useMemo(() => {
    const conf = {
      ...DEFAULT_CONFIGURATION,
      ...overrideConfiguration,
      ...(slickRef && { ref: slickRef }),
    };
    if (conf.arrows && !useDefaultNextAndPreviousArrows) {
      conf.prevArrow = (
        <PrevArrow
          leftArrowClassName={leftArrowClassName}
          arrowsAsCircle={arrowsAsCircle}
        />
      );
      conf.nextArrow = (
        <NextArrow
          rightArrowClassName={rightArrowClassName}
          arrowsAsCircle={arrowsAsCircle}
        />
      );
    }
    if (
      Array.isArray(children) &&
      conf.slidesToShow &&
      children.length <= conf.slidesToShow
    ) {
      conf.arrows = false;
      conf.infinite = false;
    }
    return conf;
  }, [
    overrideConfiguration,
    useDefaultNextAndPreviousArrows,
    slickRef,
    children,
    arrowsAsCircle,
    leftArrowClassName,
    rightArrowClassName,
  ]);

  return (
    <div
      className={`${styles.sliderContainer} ${slickWrapperClassName}`}
      id={sliderName}
    >
      <Slider
        {...settings}
        afterChange={handleAfterChange}
        beforeChange={handleBeforeChange}
      >
        {children}
      </Slider>
    </div>
  );
};

CustomSlick.defaultProps = {
  slickWrapperClassName: "",
  leftArrowClassName: "",
  rightArrowClassName: "",
  arrowsAsCircle: false,
};

export default CustomSlick;
