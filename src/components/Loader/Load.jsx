import React, { Component } from 'react';
import { TailSpin } from 'react-loader-spinner';
import css from './load.module.css';

class Load extends Component {
  render() {
    return (
      <div className={css.loaderContainer}>
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }
}

export default Load;
