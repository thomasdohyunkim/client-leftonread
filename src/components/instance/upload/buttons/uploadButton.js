import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { uploadFile, linkInstance } from '../../../../actions/uploadActions';

import UploadContext from '../context/uploadContext';
import '../../../../styles/core.scss';

class UploadButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.openModal = this.openModal.bind(this);
    this.onClose = this.onClose.bind(this);
    this.submitDb = this.submitDb.bind(this);
  }

  componentDidUpdate() {
    if (this.props.instance.pct == 100 && this.props.instance.key) {
      this.props.linkInstance(this.props.instance.key);
    }
  }

  onClose() {
    this.setState({
      open: false,
    });
  }

  openModal() {
    this.setState({
      open: true,
    });
  }

  submitDb(db) {
    const data = new FormData();
    data.append('chatdb', db);
    this.props.uploadFile(data);
    this.setState({
      open: false,
    });
  }

  render() {
    const button = this.props.instance.pct > 0 && this.props.instance.pct < 100 ?
      (
        <React.Fragment>
          <button className="action-button upload-button"> Uploading... </button>
          <div> Upload progress: {Math.round(this.props.instance.pct)}%</div>
        </React.Fragment>
      ) :
      (
        <React.Fragment>
          <button className="action-button upload-button" onClick={this.openModal}> Upload New </button>
          <div> Last uploaded on... </div>
        </React.Fragment>
      );

    return (
      <React.Fragment>
        <div className="upload-button-container">
          {button}
        </div>
        <Modal
          open={this.state.open}
          onClose={this.onClose}
          classNames={{
                  modal: 'modal-resp',
                }}
          center
        >
          <UploadContext
            submitDb={this.submitDb}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth,
    instance: state.instance,
  }
);

export default withRouter(connect(mapStateToProps, {
  uploadFile,
  linkInstance,
})(UploadButton));
