import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  PlaidLinkOnSuccessMetadata,
  PlaidLinkOptions,
  usePlaidLink
} from 'react-plaid-link';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import MHDialog from '../Dialog/MHDialog';
import BackdropLoader from '../UI/BackdropLoader';
import useHttp from '../../hooks/use-http';

import { HttpResponse } from '../../models/api.interface';
import { LinkSuccessMetadata } from '../../models/plaid.model';
import PlaidLinkContext from '../../services/plaid-link';
import NotificationContext from '../../store/context/notifications.context';
import OnboardingContext from '../../store/context/onboarding-context';

const LinkAccount = ({
  open,
  onClose,
  onCustomerConnected
}: {
  open: boolean;
  onClose: () => void;
  onCustomerConnected: (accountId: string) => void;
}) => {
  const history = useHistory();

  const onboardingCtx = React.useContext(OnboardingContext);
  const { employer } = onboardingCtx;

  const notificationCtx = React.useContext(NotificationContext);
  const { pushNotification } = notificationCtx;

  const linkCtx = React.useContext(PlaidLinkContext);
  const {
    linkToken,
    isOauth,
    generateLinkToken,
    exchangeToken,
    removeLinkToken
  } = linkCtx;

  const {
    loading: creatingCustomer,
    error: errorCreatingCustomer,
    sendHttpRequest: createCustomer
  } = useHttp();

  const onSuccess = React.useCallback(
    (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      console.log(public_token, metadata);
      exchangeToken.exchangePublicToken(
        public_token,
        (metadata as unknown) as LinkSuccessMetadata,
        {
          employerRefId: employer!.employerRefId,
          customerId: employer!.customerId
        },
        (response: HttpResponse<unknown>) => {
          // history.push('/employer/allocation');
          createCustomer(
            process.env.REACT_APP_PLAID_API_URL + 'dwo/customer/create',
            {
              method: 'POST',
              body: JSON.stringify({
                publicToken: public_token,
                accountId: metadata.accounts[0].id,
                mask: metadata.accounts[0].mask,
                BusinessName: metadata.institution?.name,
                email: employer?.employeeEmail,
                firstName: employer?.firstName,
                lastName: employer?.lastName,
                type: 'EMPLOYER'
              })
            },
            (response: HttpResponse<unknown>) => {
              onCustomerConnected(metadata.accounts[0].id);
            }
          );
        }
      );
      // window.history.pushState('', '', '/');
    },
    []
  );

  const onExit = React.useCallback(() => {
    removeLinkToken();
    onClose();
  }, [removeLinkToken, onClose]);

  const config: PlaidLinkOptions = {
    token: linkToken,
    onSuccess,
    onExit,
    ...(isOauth && {
      receivedRedirectUri: window.location.href
    })
  };

  const { open: openLink, ready, exit } = usePlaidLink(config);

  React.useEffect(() => {
    generateLinkToken();
  }, [generateLinkToken]);

  React.useEffect(() => {
    if (ready) {
      openLink();
    }
  }, [openLink, ready]);

  React.useEffect(() => {
    if (isOauth && ready) {
      openLink();
    }
  }, [isOauth, ready, openLink]);

  React.useEffect(() => {
    if (errorCreatingCustomer) {
      pushNotification({
        type: 'error',
        message: errorCreatingCustomer.message
      });
      exit();
      onClose();
    }
  }, [errorCreatingCustomer]);

  // const connectAccount = () => {
  //   if (ready) {
  //     handleOpen();
  //     openLink();
  //   }
  // };

  return (
    <React.Fragment>
      {creatingCustomer && <BackdropLoader />}
      <MHDialog
        open={open}
        title={''}
        handleClose={onClose}
        scroll="paper"
        actions={null}
        maxWidth={'xs'}
        fullWidth>
        <Box
          sx={{
            px: 2,
            '& svg': {
              display: 'block'
            }
          }}>
          <Typography
            variant="h2"
            align="center"
            color="primary.main"
            gutterBottom
            paragraph>
            Link your Account
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="primary.main"
            paragraph
            gutterBottom>
            Once your account is linked we can begin scanning for care related
            transactions.
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="primary.main"
            paragraph
            gutterBottom>
            You will be redirected to Plaid to add your account shortly.
          </Typography>
        </Box>
      </MHDialog>

      {(exchangeToken.loading || creatingCustomer) && <BackdropLoader />}
    </React.Fragment>
  );
};

export default LinkAccount;
