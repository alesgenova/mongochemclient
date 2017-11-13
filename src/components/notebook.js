import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Notebook extends Component {

   render = () => {
    const {html} = this.props;

    // This is risky XSS!?!?
    return (
        <div dangerouslySetInnerHTML={html} />;
    );
  }
}

Notebooks.propTypes = {
  html: PropTypes.string
}

Notebooks.defaultProps = {
  html: null,
}

