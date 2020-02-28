import React from "react";
import PropTypes from "prop-types";
import ResponsiveImage from "./ResponsiveImage";
import { Link, withRouter } from "react-router-dom";
import Modal from "react-modal";
import Author from "./Author";
import Date from "./Date";
import Location from "./Location";
import ImageGallery from "react-image-gallery";
import { connectComponent } from "../store";

import "./Gallery.css";

const customStyles = {
  content: {
    position: "static",
    left: "auto",
    padding: 0,

    border: "none",
    borderRadius: 0,
    overflow: "visible",

    boxShadow: "0 .5em 3em #ddd"
  }
};

class Gallery extends React.Component {
  componentDidMount() {
    this.props.loadGallery(this.props.params.galleryId);
  }

  closeModal() {
    this.props.history.goBack();
  }

  getIndexOfImage(imageCollection, id) {
    let foundIndex = -1;

    imageCollection.some((item, index) => {
      if (item.fields.photo.sys.id === id) {
        foundIndex = index;

        return true;
      }
    });

    return foundIndex;
  }

  UNSAFE_componentWillReceiveProps() {
    console.log(this.props.params.galleryId, "galleryID");
    let gallery = this.props.galleries.entries[this.props.params.galleryId];

    if (gallery && gallery.error) {
      this.props.history.push("/not-found");
    }
  }

  renderImageEntry(entry) {
    return (
      <div>
        <ResponsiveImage
          src={entry.fields.photo.fields.file.url}
          alt={entry.fields.title}
        />

        <div className="image-gallery-description">
          {entry.fields.title && (
            <div className="image-gallery-title">{entry.fields.title}</div>
          )}
          {entry.fields.imageCaption && (
            <div className="u-marginBottomDefault">
              {entry.fields.imageCaption}
            </div>
          )}
          {entry.fields.imageCredits && <div>{entry.fields.imageCredits}</div>}
        </div>
      </div>
    );
  }

  render() {
    const gallery = this.props.galleries.entries[this.props.params.galleryId];

    if (gallery && gallery.fields) {
      return (
        <div>
          <div className="c-gallery__header">
            <h1 className="c-gallery__headline">{gallery.fields.title}</h1>
            <Link
              to={"/"}
              className="c-gallery__close"
              className="o-btnClose"
              aria-label="Go back to all galleries"
            >
              ✕
            </Link>
            <Author author={gallery.fields.author}></Author>

            {this.renderTags(gallery)}

            <div className="u-marginBottomSmall u-flexHorizCenter">
              <Date entry={gallery.fields.date} />
              <Location entry={gallery.fields.location} />
            </div>
          </div>

          <ul className="o-listThirds">
            {gallery.fields.images.map((entry, index) => {
              return (
                <li key={entry.sys.id}>
                  <div className="c-gallery__modalOpenLink">
                    <Link
                      to={`/gallery/${gallery.sys.id}/image/${entry.fields.photo.sys.id}`}
                    >
                      <ResponsiveImage
                        src={entry.fields.photo.fields.file.url}
                        alt={entry.fields.title}
                      />
                    </Link>
                    <div className="c-gallery__modalOpenTitle">
                      {entry.fields.title}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <Modal
            isOpen={!!this.props.params.imageId}
            onRequestClose={this.closeModal}
            style={customStyles}
          >
            <button
              onClick={this.closeModal.bind(this)}
              className="c-gallery__modalClose"
              className="o-btnClose"
            >
              <span>✕</span>
            </button>

            <ImageGallery
              ref={i => (this._imageGallery = i)}
              items={gallery.fields.images}
              slideInterval={2000}
              startIndex={
                this.props.params.imageId
                  ? this.getIndexOfImage(
                      gallery.fields.images,
                      this.props.params.imageId
                    )
                  : -1
              }
              onImageLoad={this.handleImageLoad}
              renderItem={this.renderImageEntry}
            />
          </Modal>
        </div>
      );
    }
  }

  renderTags(gallery) {
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
}

Gallery.propTypes = {
  app: PropTypes.object,
  galleries: PropTypes.object,
  loadGallery: PropTypes.func,
  loadGalleries: PropTypes.func,
  params: PropTypes.object
};

export default connectComponent(withRouter(Gallery));
