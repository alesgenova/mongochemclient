import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Iframe from 'react-iframe'

export default class Notebook extends Component {

   render = () => {
    const {html} = this.props;

    // This is risky XSS!?!?
    return (
        <Iframe url="http://ulex:9001/api/v1/notebooks/5a021135f6571046934c84b2/html"
          width="100%"
          height="80%"
          />
    );
  }
}

Notebook.propTypes = {
  html: PropTypes.string
}

Notebook.defaultProps = {

  html: null,
}

