import * as React from 'react';
import { environment } from '../../env';
import useHttp from '../../hooks/use-http';

import { Token, User } from '../../models/user.model';

const AUTH_LOCATION = 'Sn61y6yYDiIxkur0JT';
const TOKEN_VALIDITY = 60 * 60000;
let expirationTimer: any;

type StoredToken = {
  token: Token;
  tokenExpirationDate: Date | string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  token: Token | null;
  user: User | null;
  login: (token: Token) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  user: null,
  login: (token: Token) => {},
  logout: () => {}
});

const computeExpirationInMilliSecs = (expirationTime: Date) => {
  const currentTimeStamp = new Date().getTime();
  const expirationTimeStamp = new Date(expirationTime).getTime();
  //   currentTimeStamp + TOKEN_VALIDITY

  const remainingTime = expirationTimeStamp - currentTimeStamp;
  return remainingTime;
};

const retrieveStoredToken = () => {
  const storedToken: StoredToken = JSON.parse(
    localStorage.getItem(AUTH_LOCATION) as string
  );

  if (!storedToken) {
    return null;
  }

  const expirationTimeInMilliSecs = computeExpirationInMilliSecs(
    storedToken.tokenExpirationDate as Date
  );

  if (expirationTimeInMilliSecs <= 60000) {
    localStorage.removeItem(AUTH_LOCATION);
    return null;
  }

  return storedToken;
};

export const AuthContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const tokenData = retrieveStoredToken();
  let initialToken = !!tokenData ? tokenData.token : null;

  const [token, setToken] = React.useState<Token | null>(initialToken);
  const [user, setUser] = React.useState<User | null>(null);

  const { loading, error, sendHttpRequest: logout } = useHttp();

  const logoutHandler = React.useCallback(() => {
    setToken(null);
    setUser(null);

    if (expirationTimer) {
      clearTimeout(expirationTimer);
    }
    localStorage.removeItem(AUTH_LOCATION);

    logout(
      environment.API_BASE_URL + 'employee/dashboard/logout',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uuid: user?.uuid
        })
      },
      () => {}
    )
  }, [user, logout]);

  const loginHandler = (token: Token) => {
    setToken(token);
    const expirationTime = new Date(new Date().getTime() + TOKEN_VALIDITY);
    setExpirationTimer(expirationTime);

    const storedToken: StoredToken = {
      token,
      tokenExpirationDate: expirationTime
    };

    localStorage.setItem(AUTH_LOCATION, JSON.stringify(storedToken));
  };

  const setExpirationTimer = React.useCallback(
    (expirationTime: Date) => {
      expirationTimer = setTimeout(() => {
        logoutHandler();
      }, computeExpirationInMilliSecs(expirationTime));
    },
    [logoutHandler]
  );

  React.useEffect(() => {
    setExpirationTimer(tokenData?.tokenExpirationDate as Date);
  }, [tokenData, setExpirationTimer]);

  const contextValue: AuthContextType = {
    token: token,
    isAuthenticated: !!token,
    user: user,
    login: loginHandler,
    logout: logoutHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
