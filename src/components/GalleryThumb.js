import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Author from "./Author";
import Date from "./Date";
import Location from "./Location";
import ResponsiveImage from "./ResponsiveImage";

import "./GalleryThumb.css";

function GalleryThumb({ gallery }) {
  return (
    <div className="c-galleryThumb">
      <figure className="c-galleryThumb__figure">
        <Link
          to={`/gallery/${gallery.sys.id}`}
          className="c-galleryThumb__imageContainer"
        >
          <ResponsiveImage
            src={gallery.fields.coverImage.fields.file.url}
            alt={`Open Gallery ${gallery.fields.title}`}
          />
        </Link>

        <figcaption className="c-galleryThumb__caption">
          <div className="c-galleryThumb__title">{gallery.fields.title}</div>

          <div className="u-marginBottomSmall">
            <Author author={gallery.fields.author}></Author>
          </div>

          {renderTags(gallery)}

          <div className="u-marginBottomSmall u-flexHorizCenter">
            <Date entry={gallery.fields.date} />
            <Location entry={gallery.fields.location} />
          </div>
        </figcaption>
      </figure>
      <div className="u-flexHorizCenter u-marginTopAuto u-marginBottomDefault u-paddingHorizDefault">
        <Link to={`/gallery/${gallery.sys.id}`} className="o-btnPrimary">
          View gallery
        </Link>
      </div>
    </div>
  );
}

function renderTags(gallery) {
  if (gallery.fields.tags) {
    return (
      <ul className="o-listReset">
        {gallery.fields.tags.map((entry, index) => (
          <li key={index} className="o-tag">
            {entry}
          </li>
        ))}
      </ul>
    );
  }
}

GalleryThumb.propTypes = { gallery: PropTypes.object };

export default GalleryThumb;
