import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Line } from 'rc-progress';

import '../../../styles/upload.scss';

const UploadProgress = (props) => {
  let color = null;
  const pct = props.instance.pct === null ? 0 : props.instance.pct;
  if (pct == 100) {
    color = '#4BB543';
  } else if (pct > 75) {
    color = '#DEF8FF';
  } else if (pct > 50) {
    color = '#8CD1C6';
  } else if (pct > 25) {
    color = '#FFAEC6';
  } else {
    color = '#FD7EA3';
  }

  return (
    <div className="upload-progress">
      <Line percent={pct} strokeWidth="2" strokeColor={color} />
    </div>
  );
};

const mapStateToProps = state => (
  {
    instance: state.instance,
  }
);

export default withRouter(connect(mapStateToProps, null)(UploadProgress));
