import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./ResponsiveImage.css";

const ResponsiveImage = ({ src, alt }) => {
  const [width, setWidth] = useState(null);

  const ref = useRef(null);

  useEffect(() => {
    setWidth(Math.round(ref.getBoundingClientRect().width));
  }, []);

  return (
    <img
      className="responsiveImage"
      src={width && `${src}?w=${width}`}
      alt={alt}
      ref={ref}
    />
  );
};

ResponsiveImage.propTypes = { src: PropTypes.string, alt: PropTypes.string };

export default ResponsiveImage;
