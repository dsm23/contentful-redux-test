import React from "react";
import PropTypes from "prop-types";
import GalleryThumb from "./GalleryThumb";
import { connectComponent } from "../store";

class GalleryList extends React.Component {
  UNSAFE_componentWillMount() {
    const { REACT_APP_GALLERY_TYPE_ID } = process.env;

    this.props.loadGalleries({ contentTypeId: REACT_APP_GALLERY_TYPE_ID });
  }

  render() {
    console.log(this.props.galleries.entries, "entries");
    return (
      <div className="u-paddingDefault">
        <ul className="o-listThirdsWithSpace">
          {Object.keys(this.props.galleries.entries).map(id => {
            return (
              <li key={id}>
                <GalleryThumb
                  gallery={this.props.galleries.entries[id]}
                ></GalleryThumb>
              </li>
            );
          })}
        </ul>

        {this.maybeRenderWarning()}
      </div>
    );
  }

  maybeRenderWarning() {
    if (this.props.galleries.error) {
      return (
        <div className="o-warning">
          <p>The gallery content type you specified does not exist.</p>
          <p className="o-warning__paragraph">
            Please check your gallery content type token
          </p>
        </div>
      );
    }
  }
}

GalleryList.propTypes = {
  app: PropTypes.object,
  galleries: PropTypes.object,
  loadGalleries: PropTypes.func
};

export default connectComponent(GalleryList);
