import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

import '../../../../styles/core.scss';

class WipeButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.openModal = this.openModal.bind(this);
    this.onClose = this.onClose.bind(this);
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

  render() {
    return (
      <React.Fragment>
        <div className="upload-button-container">
          <button className="action-button upload-button" onClick={this.openModal}> Wipe Data </button>
          <div> Oldest data from... </div>
        </div>
        <Modal
          open={this.state.open}
          onClose={this.onClose}
          classNames={{
                  modal: 'modal-resp',
                }}
          center
        >
          <div> Test </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default WipeButton;
