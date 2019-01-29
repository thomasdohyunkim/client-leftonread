import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import Dropzone from 'react-dropzone';

import '../../../styles/modals.scss';

/*
Required props:
- open => Boolean
- setContact(VCFFile) =>
- onVCFClose() =>
- submitVCF() =>
*/

class VCFModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vcfFile: '',
    };

    this.onContactDrop = this.onContactDrop.bind(this);
  }

  onContactDrop(vcfFile) {
    this.setState({
      vcfFile,
    });

    this.props.setContact(vcfFile);
  }

  render() {
    const command = '\'Command + A\'';
    const arrow = '>';

    const contactsText = (this.state.vcfFile.length == 0) ?
      (
        <div className="uploader-droptext">
          Drag and drop .vcf file here
        </div>
      ) :
      (
        <div className="uploader-droptext">
         contacts file uploaded.
        </div>
      );

    return (
      <Modal
        open={this.props.open}
        onClose={this.props.onVCFClose}
        classNames={{
                modal: 'modal-resp',
              }}
        center
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
            {contactsText}
          </Dropzone>
          <div className="modal-button-container">
            <button className="button modal-close" onClick={this.props.onVCFClose}> Cancel </button>
            <button className="button modal-continue" onClick={this.props.submitVCF}> {this.state.vcfFile !== '' ? 'Continue' : 'No thanks'} </button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default VCFModal;
