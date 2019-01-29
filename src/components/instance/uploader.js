import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import Fade from 'react-reveal/Fade';
import ReactGA from 'react-ga';
import { toast } from 'react-toastify';
import { isMobile } from 'react-device-detect';
import { uploadFile } from '../../actions';
import DotDotDot from '../core/dotdotdot';

import '../../styles/modals.scss';
import '../../styles/starter.scss';
import logo from '../../img/logo_new.svg';

class Uploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dbFile: '',
      contactsFile: '',
      instanceModalIsOpen: false,
      contactsModalIsOpen: false,
      loadModalIsOpen: false,
      mobileModalIsOpen: !!isMobile,
      password: '',
    };

    this.onContactDrop = this.onContactDrop.bind(this);
    this.onChatDrop = this.onChatDrop.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderChatDBText = this.renderChatDBText.bind(this);
    this.renderContactsText = this.renderContactsText.bind(this);
    this.openInstanceModal = this.openInstanceModal.bind(this);
    this.closeInstanceModal = this.closeInstanceModal.bind(this);
    this.openContactsModal = this.openContactsModal.bind(this);
    this.closeContactsModal = this.closeContactsModal.bind(this);
    this.closeLoadModal = this.closeLoadModal.bind(this);
    this.onErr = this.onErr.bind(this);
    this.cancelInstanceModal = this.cancelInstanceModal.bind(this);
    this.closeMobileModal = this.closeMobileModal.bind(this);
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

  onSubmit() {
    // for Google Analytics
    // do not change action text, otherwise goal conversion will be off.
    ReactGA.event({
      category: 'Upload',
      action: 'Chat.db file was uploaded',
    });
    this.setState({ instanceModalIsOpen: false, loadModalIsOpen: true });
    const data = new FormData();
    data.append('chatdb', this.state.dbFile[0]);
    if (this.state.contactsFile.length !== 0) {
      // for Google Analytics
      ReactGA.event({
        category: 'Upload',
        action: 'Contacts file was uploaded',
      });
      data.append('vcf', this.state.contactsFile[0]);
    }
    data.append('password', this.state.password);
    this.props.uploadFile(this.props.history, data);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onErr() {
    this.setState({
      instanceModalIsOpen: false,
      loadModalIsOpen: false,
      contactsModalIsOpen: false,
    });
  }

  openInstanceModal() {
    this.setState({
      instanceModalIsOpen: true,
      contactsModalIsOpen: false,
    });
  }

  closeInstanceModal() {
    this.setState({ instanceModalIsOpen: false, loadModalIsOpen: false });
  }

  cancelInstanceModal() {
    this.setState({ instanceModalIsOpen: false });
  }

  closeLoadModal() {
    this.setState({
      loadModalIsOpen: false,
    });
  }

  closeMobileModal() {
    this.setState({
      mobileModalIsOpen: false,
    });
  }

  openContactsModal() {
    if (this.state.dbFile.length == 0) {
      toast.error('Please upload your chat.db file first');
      return;
    }
    this.setState({ contactsModalIsOpen: true });
  }

  closeContactsModal() {
    this.setState({ contactsModalIsOpen: false });
  }

  renderChatDBText() {
    if (this.state.dbFile.length == 0) {
      return (
        <div className="uploader-droptext">
          Drop chat.db file here
        </div>
      );
    }
    return (
      <div className="uploader-droptext">
         chat.db uploaded
      </div>
    );
  }

  renderContactsText() {
    if (this.state.contactsFile.length == 0) {
      return (
        <div className="uploader-droptext">
          Drag and drop .vcf file here
        </div>
      );
    }
    return (
      <div className="uploader-droptext">
         contacts file uploaded.
      </div>
    );
  }

  render() {
    // for Google Analytics
    ReactGA.event({
      category: 'Started',
      action: 'Get Started was clicked',
      label: 'interaction',
    });
    const command = '\'Command + A\'';
    const arrow = '>';

    return (
      <div className="uploader">
        <NavLink className="home-button" to="/" exact>
          <img id="home" src={logo} alt="lor_logo" />
        </NavLink>
        <Fade top distance="10px">
          <div className="starter-header">Get Analytics</div>
          <NavLink className="simple-link" to="/return">
            <div className="simple-link">Returning user? Click here to look up past data.</div>
          </NavLink>
        </Fade>
        <div className="uploader-instructions">
          <ol>
            <li> Open <b>Finder</b> on your Mac. </li>
            <li>
              From the Menubar, select <b>Go {arrow} Go to Folder.</b>
            </li>
            <li> <b>Copy and paste</b> this pathname into the window that pops up:
              <div>
                <input id="pathname" type="text" value="~/Library/Messages" readOnly />
                <button className="copy-button"
                  onClick={() => {
                    const copyText = document.getElementById('pathname');
                    copyText.select();
                    document.execCommand('copy');
                    toast.info(`Copied to clipboard: ${copyText.value}`);
                  }}
                >Copy text
                </button>
              </div>
            </li>
            <li> Click <b>Go</b> or hit enter.</li>
            <li> From the window, drag and drop the <b>chat.db</b> file to our secure uploader below. </li>
          </ol>
        </div>
        <Dropzone
          className="uploader-dropzone"
          activeClassName="uploader-dropzone drop-active"
          onDrop={this.onChatDrop}
          accept=".db"
          disableClick
        >
          {this.renderChatDBText()}
        </Dropzone>
        <br />
        <button className="button" onClick={this.openContactsModal}> Submit </button>


        <Modal
          isOpen={this.state.contactsModalIsOpen}
          onRequestClose={this.closeContactsModal}
          className="modal modals-uploads-page-contacts"
        >
          <div className="modals-uploads-page-container">
            <div className="modal-title"> Recommended: Upload your contacts </div>
            <br />
            <div className="uploader-instructions">
              <ol>
                <li> Open your <b>Contacts</b> App.</li>
                <li>
                  <b>Click on any contact</b> and press <b>{command}</b> to select all contacts.
                </li>
                <li>
                From the Menubar, select <b>File {arrow} Export vCard</b>.
                </li>
                <li>
                  <b>Save</b> this file and upload it here.
                </li>
              </ol>
            </div>
            <Dropzone
              id="model-dropzone"
              className="uploader-dropzone"
              activeClassName="uploader-dropzone drop-active"
              onDrop={this.onContactDrop}
              accept=".vcf"
              disableClick
            >
              {this.renderContactsText()}
            </Dropzone>
            <div className="modal-button-container">
              <button className="button modal-close" onClick={this.closeContactsModal}> Cancel </button>
              <button className="button modal-continue" onClick={this.openInstanceModal}> {this.state.contactsFile !== '' ? 'Continue' : 'No thanks'} </button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={this.state.instanceModalIsOpen}
          onRequestClose={this.closeInstanceModal}
          className="modal modals-uploads-page-password"
        >
          <div className="modals-uploads-page-container">
            <div className="modal-title"> Optionally secure your output. </div>
            <br />
            <div className="modal-help"> Enter a password that will be required when you try to re-access your results. </div>
            <br />
            <input className="modal-input-password" type="password" name="password" placeholder="Password" onChange={this.onChange} />
            <div className="modal-button-container">
              <button className="button modal-close" onClick={this.cancelInstanceModal}> Cancel </button>
              <button className="button modal-continue" onClick={this.onSubmit}> {this.state.password !== '' ? 'Secure and Analyze' : 'Skip and Analyze'}  </button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={this.state.loadModalIsOpen && !this.props.error}
          onRequestClose={this.closeLoadModal}
          className="modal modals-uploads-page-loading"
          shouldCloseOnOverlayClick={false}
        >
          <div className="modals-uploads-page-container">
            <div className="modal-loading">
              <div> Please wait. {'You\'re in the queue.'} </div>
              <div>This might take a minute, depending on your chat.db file size<DotDotDot onErr={this.onErr} /></div>
            </div>
          </div>
        </Modal>

        {isMobile ?
          <Modal
            isOpen={this.state.mobileModalIsOpen}
            onClose={this.closeMobileModal}
            className="modal mobile-modal modals-share-URL"
            center
          >
            <div className="uploader">
              <div className="uploader-instructions">
                <img id="home" src={logo} alt="lor_logo" />
                <p> Hi, mobile user! </p>
                <p> Currently, Left On Read works only on Mac computers.
                  Please come back and visit us on your Mac to have the full Left On Read experience.
                </p>
                <button className="button" onClick={this.closeMobileModal}> Ok, I will! </button>
              </div>
            </div>
          </Modal>
        :
        null }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
});

export default withRouter(connect(mapStateToProps, { uploadFile })(Uploader));
