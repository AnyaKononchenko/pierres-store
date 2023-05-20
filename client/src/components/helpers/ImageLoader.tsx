import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ImageLoader = ({imageSrc, alt, placeholderSrc, styles} : {imageSrc: string, alt: string, placeholderSrc: string, styles: string}) => {
  return (
    <LazyLoadImage
      src={`${process.env.REACT_APP_BASE_URL}/media/images/${imageSrc}`}
      placeholderSrc={placeholderSrc}
      alt={alt}
      effect='blur'
      className={styles}
    />
  );
};

export default ImageLoader;
