import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Logo from '../../core/logo';
import UploadContext from './context/uploadContext';
import VCFModal from './vcf_modal';
import InstanceModal from './instance_modal';
import LinkModal from './link_modal';

import { uploadFile } from '../../../actions/uploadActions';

class Uploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dbFile: '',
      contactsFile: '',
      contactsModalIsOpen: false,
      instanceModalIsOpen: false,
      linkModalIsOpen: false,
    };

    this.onChatDrop = this.onChatDrop.bind(this);
    this.onContactDrop = this.onContactDrop.bind(this);
    this.closeContactsModal = this.closeContactsModal.bind(this);
    this.closeInstanceModal = this.closeInstanceModal.bind(this);
    this.closeLinkModal = this.closeLinkModal.bind(this);
    this.submitDb = this.submitDb.bind(this);
    this.submitVCF = this.submitVCF.bind(this);
  }

  onChatDrop(dbFile) {
    this.setState({
      dbFile,
    });
  }

  onContactDrop(contactsFile) {
    this.setState({
      contactsFile,
    });
  }

  closeContactsModal() {
    this.setState({
      contactsModalIsOpen: false,
    });
  }

  closeInstanceModal() {
    this.setState({
      instanceModalIsOpen: false,
      linkModalIsOpen: true,
    });
  }

  closeLinkModal() {
    this.setState({
      linkModalIsOpen: false,
    });
    this.props.history.push('/dashboard');
  }

  submitDb() {
    this.setState({
      contactsModalIsOpen: true,
    });
  }

  submitVCF() {
    const data = new FormData();
    data.append('chatdb', this.state.dbFile[0]);
    if (this.state.contactsFile.length !== 0) {
      data.append('vcf', this.state.contactsFile[0]);
    }

    this.props.uploadFile(data);

    this.closeContactsModal();
    this.setState({
      instanceModalIsOpen: true,
    });
  }

  render() {
    return (
      <div className="uploader">
        <Logo />
        <Fade top distance="10px">
          <div className="starter-header">Get Analytics</div>
          <NavLink className="simple-link" to="/return">
            <div className="simple-link">Returning user? Click here to look up past data.</div>
          </NavLink>
        </Fade>
        <UploadContext setDb={this.onChatDrop} submitDb={this.submitDb} />
        <VCFModal
          open={this.state.contactsModalIsOpen}
          setContact={this.onContactDrop}
          onVCFClose={this.closeContactsModal}
          submitVCF={this.submitVCF}
        />
        <InstanceModal
          open={this.state.instanceModalIsOpen}
          onInstanceClose={this.closeInstanceModal}
        />
        <LinkModal
          open={this.state.linkModalIsOpen}
          onLinkClose={this.closeLinkModal}
        />
      </div>
    );
  }
}

export default withRouter(connect(null, {
  uploadFile,
})(Uploader));
