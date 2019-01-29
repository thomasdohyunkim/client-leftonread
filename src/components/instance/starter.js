import React from 'react';
import Uploader from './upload/uploader';
import '../../styles/starter.scss';

const Starter = (props) => {
  return (
    <div className="starter-container">
      <div>
        <Uploader />
      </div>
    </div>
  );
};

export default Starter;
