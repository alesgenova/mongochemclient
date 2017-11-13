import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { loadNotebooks } from '../redux/ducks/app'
import Notebooks from '../components/notebooks'
import selectors from '../redux/selectors'

class NotebookContainer extends Component {

  componentDidMount() {
    this.props.dispatch(loadNotebook());
  }

  render() {
    return <Notebook html={this.props.html} />;
  }
}

NotebookContainer.propTypes = {
  html: PropTypes.string,
}

NotebooksContainer.defaultProps = {
  html: null
}

function mapStateToProps(state, ownProps) {
  let fileId = ownProps.match.params.id || null;
  let inchikey = ownProps.match.params.inchikey || null;
  let props = {
    id,
    inchikey
  }

  const html = selectors.app.getNotebookHtml(state);

  return {
    notebooks
  };
}

export default connect(mapStateToProps)(NotebooksContainer)
