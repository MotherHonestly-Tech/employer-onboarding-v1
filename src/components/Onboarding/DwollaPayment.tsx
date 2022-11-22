import React from 'react';
import { useHistory } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import MHButton from '../Button/MHButton';
import MHDialog from '../Dialog/MHDialog';
import useHttp from '../../hooks/use-http';

import { ReactComponent as CheckMarkRoundedLargeIcon } from '../../static/svg/check-mark-rounded-lg.svg';
import { HttpResponse } from '../../models/api.interface';
import BackdropLoader from '../UI/BackdropLoader';

const DwollaPayment = ({
  open,
  onClose,
  employerData
}: {
  open: boolean;
  onClose: () => void;
  employerData: {
    employerRefId: number;
    accountId: string;
  };
}) => {
  const [customer, setCustomer] = React.useState(null);
  const history = useHistory();

  const { loading: authorizing, sendHttpRequest: authorizeDebit } = useHttp();

  const authorizeDwollaDebit = () => {
    authorizeDebit(
      process.env.REACT_APP_API_BASE_URL + 'dwo/customer/debit',
      {
        method: 'POST',
        body: JSON.stringify({
          employerRefId: employerData.employerRefId,
          accountId: employerData.accountId
        })
      },
      (response: HttpResponse<unknown>) => {
        history.push('/employer/allocation');
      }
    );
  };

  return (
    <React.Fragment>
      {authorizing && <BackdropLoader />}
      
      <MHDialog
        open={open}
        title={''}
        handleClose={onClose}
        scroll="paper"
        actions={
          <MHButton type="button" fullWidth onClick={authorizeDwollaDebit}>
            Authorize Payment
          </MHButton>
        }
        maxWidth={'xs'}
        fullWidth>
        <Box
          sx={{
            px: 2,
            '& svg': {
              display: 'block',
              marginX: 'auto',
              marginY: '30px'
            }
          }}>
          <CheckMarkRoundedLargeIcon />
          <Typography
            variant="body1"
            align="center"
            color="primary.main"
            gutterBottom
            paragraph>
            You have successfully linked your account.
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="primary.main"
            paragraph
            gutterBottom>
            You have connected your account successfully, click the button below
            to authorize payment
          </Typography>
        </Box>{' '}
      </MHDialog>
    </React.Fragment>
  );
};

export default DwollaPayment;
