import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import AuthContext from '../../store/context/auth-context';
import useHttp from '../../hooks/use-http';
import { getURLWithQueryParams } from '../../utils/utils';
import { Employee } from '../../models/user.model';
import { HttpResponse } from '../../models/api.interface';

const Startup = () => {
  const authCtx = React.useContext(AuthContext);
  const { error, sendHttpRequest: getUser } = useHttp();

  const { userId, token, synchronizeUser } = authCtx;

  const fetchUser = React.useCallback(async () => {
    await getUser(
      getURLWithQueryParams(
        process.env.REACT_APP_API_BASE_URL + 'employee/dashboard/employee/uuid',
        {
          uuid: String(userId)
        }
      ),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token?.accessToken}`
        }
      },
      (response: HttpResponse<Employee>) => {
        synchronizeUser(response.data);
      }
    );
  }, [userId, token, getUser, synchronizeUser]);

  React.useEffect(() => {
    fetchUser();
  }, []);

  if (error) {
    return <Redirect to="/auth/sign-in" />;
  }

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}>
          <CircularProgress color="primary" />
        </Backdrop>,
        document.getElementById('backdrop-root') as HTMLElement
      )}
    </React.Fragment>
  );
};

export default Startup;
