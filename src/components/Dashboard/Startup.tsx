import React from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from '../../store/context/auth-context';
import useHttp from '../../hooks/use-http';
import { getURLWithQueryParams } from '../../utils/utils';
import { Employee } from '../../models/user.model';
import { HttpResponse } from '../../models/api.interface';
import BackdropLoader from '../UI/BackdropLoader';

const Startup = () => {
  const authCtx = React.useContext(AuthContext);
  const { error, sendHttpRequest: getUser } = useHttp();

  const { userId, token, synchronizeUser } = authCtx;

  const fetchUser = React.useCallback(async () => {
    await getUser(
      getURLWithQueryParams(
        process.env.REACT_APP_API_BASE_URL + 'employee/dashboard/employee/token/uuid',
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

  return <BackdropLoader />;
};

export default Startup;