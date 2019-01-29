import React, { Component } from 'react';
import ReactGA from 'react-ga';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import { createSharePage } from '../../../../actions/index';
import '../../../../styles/modals.scss';

// import ReactModal from 'react-modal';

class ShareModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };

    this.onShareClick = this.onShareClick.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  onShareClick(event) {
    // for Google Analytics
    ReactGA.event({
      category: 'Share',
      action: 'share button was clicked',
      label: this.props.graphType,
    });
    event.preventDefault();
    this.handleOpenModal();
    this.props.createSharePage(this.props.graphType, this.props.data, this.props.instanceKey);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }


  render() {
    return (
      <div>
        <div
          className="share-icon-div"
          role="button"
          tabIndex="0"
          onClick={this.onShareClick}
          data-tip
          data-for="share"
        >
          <i className="fas fa-share-square" />
        </div>
        <ReactTooltip id="share" place="top" effect="solid">
          <span> Share </span>
        </ReactTooltip>
        <Modal
          open={this.state.showModal}
          onClose={this.handleCloseModal}
          className="modal modals-share-URL"
          center
        >
          <div className="uploader">
            <div className="uploader-instructions">
              <p> Use this URL to share this graph with your friends. </p>
              <div className="share-row">
                <input id="pathname" type="text" value={`https://leftonread.me/sharedUrl/${this.props.shareUrl}`} readOnly />
                <button className="copy-button"
                  onClick={() => {
                    const copyText = document.getElementById('pathname');
                    copyText.select();
                    document.execCommand('copy');
                    toast.info(`Copied to clipboard: ${copyText.value}`);
                  }}
                >Copy URL
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shareUrl: state.metrics.SHARE_URL,
});

export default connect(mapStateToProps, { createSharePage })(ShareModal);
