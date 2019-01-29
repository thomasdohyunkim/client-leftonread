import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { toast } from 'react-toastify';

/*
  Requires the following prop(s):
    - submitDb(db) -> submits selected db

  Optionally provide the following prop(s):
    - setDb(db) -> calls function with selected db file
*/
class UploadContext extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dbFile: '',
    };

    this.onChatDrop = this.onChatDrop.bind(this);
    this.submitDb = this.submitDb.bind(this);
  }

  onChatDrop(dbFile) {
    this.setState({
      dbFile,
    });
    if (this.props.setDb) {
      this.props.setDb(dbFile);
    }
  }

  submitDb() {
    if (this.state.dbFile.length == 0) {
      toast.error('Please upload your chat.db file first');
    } else {
      this.props.submitDb(this.state.dbFile[0]);
    }
  }

  render() {
    const dbText = (this.state.dbFile.length == 0) ?
      (
        <div className="uploader-droptext">
          Drop chat.db file here
        </div>
      ) :
      (
        <div className="uploader-droptext">
         chat.db uploaded
        </div>
      );
    return (
      <div>
        <div className="uploader-instructions">
          <ol>
            <li> Open <b>Finder</b> on your Mac. </li>
            <li>
            From the Menubar, select <b>Go {'>'} Go to Folder.</b>
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
          {dbText}
        </Dropzone>
        <br />
        <button className="button" onClick={this.submitDb}> Submit </button>
      </div>
    );
  }
}

export default UploadContext;
