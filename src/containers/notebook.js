import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { loadNotebook } from '../redux/ducks/notebooks'
import Notebook from '../components/notebook'
import selectors from '../redux/selectors'

class NotebookContainer extends Component {

  componentDidMount() {
    this.props.dispatch(loadNotebook(this.props.fileId));
  }

  render() {
    return <Notebook html={this.props.html} />
  }
}

NotebookContainer.propTypes = {
  html: PropTypes.string,
}

NotebookContainer.defaultProps = {
  html: null
}

function mapStateToProps(state, ownProps) {
  let fileId = ownProps.match.params.id || null;
  const html = selectors.notebooks.getHtmlById(state, fileId );

  return {
    fileId,
    html: {
      __html: html,
    }
  };
}

export default connect(mapStateToProps)(NotebookContainer)
