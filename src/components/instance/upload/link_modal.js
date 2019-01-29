import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';

import '../../../styles/core.scss';
import '../../../styles/modals.scss';
import '../../../styles/upload.scss';

const LinkModal = (props) => {
  const isLinked = props.instance.status === 2;

  let modalContent = null;

  if (!isLinked) {
    modalContent =
    (
      <div className="graph-loader">
        <svg className="circular" viewBox="25 25 50 50">
          <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
        </svg>
      </div>
    );
  } else {
    modalContent =
    (
      <div className="link-modal-text">
        <div className="link-modal-title"> SUCCESS </div>
        <div className="link-modal-instructions">
          We are now processing your data.
        </div>
        <div className="link-modal-instructions">
          You will receive an email at <strong> {props.auth.email} </strong> when
          your results are ready to view!
        </div>
        <div className="link-modal-instructions">
          Thank you for your patience, and you may now close this window
        </div>
      </div>
    );
  }

  return (
    <Modal
      open={props.open}
      onClose={props.onLinkClose}
      classNames={{
              modal: 'modal-resp',
            }}
      center
      closeOnOverlayClick={isLinked}
      showCloseIcon={isLinked}
    >
      {modalContent}
    </Modal>
  );
};

const mapStateToProps = state => (
  {
    auth: state.auth,
    instance: state.instance,
  }
);

export default withRouter(connect(mapStateToProps, null)(LinkModal));
