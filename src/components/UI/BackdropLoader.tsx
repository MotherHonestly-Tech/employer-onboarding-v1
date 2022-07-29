import React from 'react';
import ReactDOM from 'react-dom';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const BackdropLoader = () => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop
          sx={{
            color: (theme) => theme.palette.common.white,
            zIndex: (theme) => theme.zIndex.drawer + 1
          }}
          open={true}>
          <CircularProgress
            color="primary"
            thickness={4.2}
            aria-describedby="loading"
            sx={{
              opacity: 0.5
            }}
          />
        </Backdrop>,
        document.getElementById('backdrop-root') as HTMLElement
      )}
    </React.Fragment>
  );
};

export default BackdropLoader;
