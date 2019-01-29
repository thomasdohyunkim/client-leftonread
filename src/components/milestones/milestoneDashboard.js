import React, { Component } from 'react';
import UploadButton from '../instance/upload/buttons/uploadButton';
import ContactsButton from '../instance/upload/buttons/contactsButton';
import WipeButton from '../instance/upload/buttons/wipeButton';

import '../../styles/milestones.scss';

class MilestoneDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="milestone-dashboard">
        <div className="upload-buttons-container">
          <UploadButton />
          <ContactsButton />
          <WipeButton />
        </div>
      </div>
    );
  }
}

export default MilestoneDashboard;
