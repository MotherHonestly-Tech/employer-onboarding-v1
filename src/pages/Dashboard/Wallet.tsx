import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import MuiLink from '@mui/material/Link';
import { styled } from '@mui/material/styles';

import UploadReceipt from '../../components/Wallet/UploadReceipt';
import DataTable, { GridColDef } from '../../components/DataTable/MHDataTable';
import useTitle from '../../hooks/use-title';

import { ReactComponent as UploadReceiptIcon } from '../../static/svg/upload-receipt.svg';
import { ReactComponent as CareCardIcon } from '../../static/svg/care-card.svg';
import PlaidLinkContext from '../../services/plaid-link';
import useHttp from '../../hooks/use-http';
import { HttpResponse } from '../../models/api.interface';
import { Receipt } from '../../models/receipt.model';

const GridItem = styled(Box)(({ theme }) => ({
  // ...theme.typography.body2,
  backgroundColor: '#ffffff',
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  flex: '1 1 auto',
  display: 'flex',
  justifyContent: 'center'
}));

const Container = styled(Box)(({ theme }) => ({
  flexBasis: '50%',
  '&:focus': {
    outline: 'none'
  },
  '&:active': {
    outline: 'none'
  }
}));

const Wallet = (props: { title: string }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [receipts, setReceipts] = React.useState<Receipt[]>([]);
  useTitle(props.title);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const plaidLinkCtx = React.useContext(PlaidLinkContext);
  const { isOauth } = plaidLinkCtx;

  React.useEffect(() => {
    isOauth && setOpen(true);
  }, []);

  function createData(
    merchantName: string,
    merchantImgSrc: string,
    category: string,
    expenseDesc: string,
    expenseAmt: number,
    balanceAfterExpense: number
  ) {
    return {
      merchantName,
      merchantImgSrc,
      category,
      expenseDesc,
      expenseAmt,
      balanceAfterExpense
    };
  }

  const rows = [
    createData(
      'Merchant 1',
      'https://www.google.com',
      'Food',
      'Expense Description',
      100,
      200
    )
  ];

  const columns: GridColDef[] = [
    { field: 'merchantName', headerName: 'Merchant', width: 200, type: 'text' },
    {
      field: 'categoryName',
      headerName: 'Category',
      width: 100,
      type: 'text'
    },
    { field: 'amount', headerName: 'Amount', width: 100, type: 'text' },
    {
      field: 'createdDate',
      headerName: 'Date',
      width: 200,
      type: 'text'
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      type: 'number'
    },
    {
      field: 'workFlowId',
      headerName: 'Progress',
      width: 100,
      type: 'number'
    }
  ];

  const { loading, error, sendHttpRequest } = useHttp();

  React.useEffect(() => {
    sendHttpRequest(
      process.env.REACT_APP_API_BASE_URL +
        'employee/dashboard/reembursement/search',
      {},
      (response: HttpResponse<Receipt[]>) => {
        setReceipts(response.data);
      }
    );
  }, []);

  return (
    <React.Fragment>
      <div>
        <Typography variant="h1" align="center" color="primary" gutterBottom>
          My Care Wallet
        </Typography>
        <Typography variant="body1" align="center" color="#9C9C9C" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
        </Typography>
        <Paper
          sx={{
            p: 2,
            my: 6,
            borderRadius: 2
          }}>
          <Typography
            variant="subtitle1"
            align="center"
            color="primary"
            fontWeight={'bold'}
            gutterBottom>
            Personal Care Wallet Credit Breakdown
          </Typography>

          <Divider
            variant="middle"
            sx={{
              my: 1.5
            }}
          />

          <Stack
            direction="row"
            alignItems={'center'}
            divider={
              <Divider orientation="vertical" variant="middle" flexItem />
            }
            spacing={2}>
            <GridItem>
              <Box>
                <Typography variant="body2" fontSize={12} color="primary">
                  Monthly Credit
                </Typography>
                <Typography variant="h4" fontSize={36} color="primary">
                  $83.00
                </Typography>
              </Box>
            </GridItem>
            <GridItem>
              <Box>
                <Typography variant="body2" fontSize={12} color="#BDBDBD">
                  Credit Balance
                </Typography>
                <Typography variant="h4" fontSize={36} color="#BDBDBD">
                  $0.00
                </Typography>
              </Box>
            </GridItem>
            <GridItem>
              <Box>
                <Typography variant="body2" fontSize={12} color="#BDBDBD">
                  Total Payout
                </Typography>
                <Typography variant="h4" fontSize={36} color="#BDBDBD">
                  $0.00
                </Typography>
              </Box>
            </GridItem>
          </Stack>
        </Paper>

        {receipts.length !== 0 ? (
          <Box
            height={300}
            width="100%"
            border={'thin'}
            borderColor={(theme) => theme.palette.grey[900]}
            borderRadius={2}
            sx={{
              borderStyle: 'dashed'
            }}>
            <Stack
              direction="row"
              alignItems={'center'}
              height="100%"
              divider={
                <Divider orientation="vertical" variant="middle" flexItem />
              }
              spacing={2}>
              <Container component={'button'} onClick={handleClickOpen}>
                <Typography
                  variant="h3"
                  align="center"
                  color="#28404A"
                  gutterBottom>
                  Upload Your Receipt
                </Typography>

                <Box
                  border={5}
                  borderColor="#E5E5E5"
                  p={3}
                  width={200}
                  textAlign="center"
                  borderRadius={(theme) => theme.shape.borderRadius}
                  mt={3}
                  mx="auto"
                  sx={{
                    '& svg': {
                      margin: 'auto'
                    }
                  }}>
                  <UploadReceiptIcon />
                  <MuiLink component={'p'} variant="body2" mt={2}>
                    Upload receipt
                  </MuiLink>
                </Box>
              </Container>
              <Container component={'button'}>
                {' '}
                <Typography
                  variant="h3"
                  align="center"
                  color="#28404A"
                  gutterBottom>
                  Link your account
                </Typography>
                <Box
                  border={5}
                  borderColor="#E5E5E5"
                  p={3}
                  width={200}
                  textAlign="center"
                  borderRadius={(theme) => theme.shape.borderRadius}
                  mt={3}
                  mx="auto"
                  sx={{
                    '& svg': {
                      margin: 'auto'
                    }
                  }}>
                  <CareCardIcon />
                  <MuiLink component={'p'} variant="body2" mt={2}>
                    Link account
                  </MuiLink>
                </Box>
              </Container>
            </Stack>
          </Box>
        ) : (
          <DataTable rows={receipts} columns={columns} />
        )}
      </div>

      {/* <DataTable rows={rows} columns={columns} /> */}

      {open && <UploadReceipt open={open} onClose={handleClose} />}
    </React.Fragment>
  );
};

export default Wallet;
