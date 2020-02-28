import React from "react";
import PropTypes from "prop-types";
import "./Author.css";

function Author({ author }) {
  return <div className="c-author">{author.fields.name}</div>;
}

Author.propTypes = { author: PropTypes.object };

export default Author;
