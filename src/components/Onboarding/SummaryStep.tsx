import React from 'react';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';

import MHButton from '../Button/MHButton';
import MHDataTable, { GridColDef } from '../DataTable/MHDataTable';
import DwollaPayment from './DwollaPayment';
import useHttp from '../../hooks/use-http';

import { ReactComponent as OrgLogo } from '../../static/svg/unilever-logo.svg';
import { formatAmount } from '../../utils/utils';
import { HttpResponse } from '../../models/api.interface';
import { LinkSuccessMetadata } from '../../models/plaid.model';
import PlaidLinkContext from '../../services/plaid-link';
import OnboardingContext from '../../store/context/onboarding-context';
import BackdropLoader from '../UI/BackdropLoader';
import NotificationContext from '../../store/context/notifications.context';
import LinkAccount from './LinkAccount';

type Subscription = {
  id: number;
  item: string;
  employeeSize: number;
  walletAllocation: number;
  serviceCharge: number;
  tax: number;
  total: number;
};

const TextWidget = ({
  title,
  description,
  includeColon
}: {
  title?: string;
  description?: string;
  includeColon?: boolean;
}) => {
  return (
    <Box mb={0.6}>
      {title && (
        <Typography
          variant="body2"
          fontFamily="Area-Normal-Bold"
          color="primary.main"
          display="inline-block">
          {title}
        </Typography>
      )}
      {includeColon ? ': ' : ''}
      {description && (
        <Typography variant="body2" color="primary.main" display="inline-block">
          {description}
        </Typography>
      )}
    </Box>
  );
};

const PricingGrid = ({ title, amount }: { title: string; amount: number }) => (
  <Grid container mb={1}>
    <Grid item xs={6}>
      <Typography>{title}</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography
        variant="body1"
        fontFamily="Area-Normal-Black"
        color="primary.main">
        {formatAmount(amount)}
      </Typography>
    </Grid>
  </Grid>
);

const Pricing = ({ total }: { total: number }) => {
  return (
    <Box width={200}>
      <Typography
        variant="body1"
        fontFamily="Area-Normal-Black"
        color="primary.main"
        gutterBottom>
        Sub Total
      </Typography>
      <PricingGrid title="Discount" amount={0.0} />
      <PricingGrid title="Tax" amount={0.0} />

      <Divider light sx={{ mb: 1 }} />

      <PricingGrid title="Total" amount={total} />
    </Box>
  );
};

const SummaryStep = (props: {
  activeIndex: number;
  onNext: () => void;
  onPrevious: (e: React.MouseEvent) => void;
}) => {
  const onboardingCtx = React.useContext(OnboardingContext);
  const { employer } = onboardingCtx;

  const [openAccountLink, setOpenAccountLink] = React.useState<boolean>(false);
  const [openDwollaPayment, setDwollaPayment] = React.useState<boolean>(false);

  const [accountId, setAccountId] = React.useState<string>('');

  const handleAccountLinkOpen = React.useCallback(() => {
    setOpenAccountLink(true);
  }, []);

  const handleAccountLinkClose = React.useCallback(() => {
    setOpenAccountLink(false);
  }, []);

  const handleDwollaPaymentOpen = React.useCallback(() => {
    setDwollaPayment(true);
  }, []);

  const handleDwollaPaymentClose = React.useCallback(() => {
    setDwollaPayment(false);
  }, []);

  const columns: Array<GridColDef> = [
    {
      type: 'text',
      field: 'item',
      headerName: 'Item Description',
      width: 100
    },
    {
      type: 'text',
      field: 'employeeSize',
      headerName: 'No of Employees',
      width: 100
    },
    {
      type: 'text',
      field: 'walletAllocation',
      headerName: 'Quaterly Allocation',
      width: 150,
      valueGetter: (row: Subscription) => formatAmount(row.walletAllocation)
    },
    {
      type: 'text',
      field: 'serviceCharge',
      headerName: 'Service Charge',
      width: 100,
      valueGetter: (row: Subscription) => formatAmount(row.serviceCharge)
    },
    {
      type: 'text',
      field: 'tax',
      headerName: 'Tax',
      width: 100,
      valueGetter: (row: Subscription) => formatAmount(row.tax)
    },
    {
      type: 'text',
      field: 'total',
      headerName: 'Total',
      width: 100,
      valueGetter: (row: Subscription) => formatAmount(row.total)
    }
  ];

  const rows: Subscription[] = [
    {
      id: 1,
      item: 'MH Care Wallet Subscription',
      employeeSize: employer?.employeeSize as number,
      walletAllocation: employer?.quarterlyAllocation as number,
      serviceCharge: 200,
      tax: 150,
      total:
        (employer?.quarterlyAllocation ? employer.quarterlyAllocation : 0) +
        20 +
        15
    }
  ];

  const handleConnectedCustomer = (accountId: string) => {
    handleDwollaPaymentOpen();
  };

  return (
    <Box maxWidth={'md'} mx="auto">
      <Box aria-label="org" sx={{ mb: 3 }}>
        {/* <MHPrimaryLogo className="mx-0" /> */}
        <MuiLink
          component="button"
          underline="always"
          sx={{
            display: 'block',
            mb: 3
          }}
          onClick={(e) => props.onPrevious(e)}>
          Back to Billing Information
        </MuiLink>

        <ListItem disableGutters>
          <ListItemAvatar>
            <OrgLogo />
          </ListItemAvatar>
          <ListItemText>
            <Typography
              variant="body1"
              fontSize="12px"
              color="primary.main"
              fontFamily="Area-Normal-Bold">
              Michael Sofayo
            </Typography>

            <Typography variant="body2" fontSize={'.6rem'} color="#989898">
              michael@motherhonestly.com
            </Typography>
          </ListItemText>
        </ListItem>
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        bgcolor="secondary.main"
        borderRadius={2}
        p={3}>
        <Box>
          <TextWidget title="Invoice Number" />
          <TextWidget title="INV-2022-010" />
          <TextWidget title="Issued Date: " description="19 Sept 2022" />
          <TextWidget title="Due Date: " description="27 Dec 2022" />
        </Box>
        <Box>
          <TextWidget title="Billed to" />
          <TextWidget description="Uniliver" />
          <TextWidget description="Moonlight Sunlight" />
        </Box>
      </Stack>

      <Box my={6}>
        <Typography
          variant="body1"
          color="primary.main"
          fontFamily="Area-Normal-Black"
          gutterBottom
          my={2}>
          Item Details
        </Typography>
        <MHDataTable rows={rows} columns={columns} />
      </Box>

      <Stack direction="row" justifyContent="space-between">
        <Box>
          <Typography
            variant="body1"
            fontFamily="Area-Normal-Black"
            gutterBottom
            mb={2}>
            Payment Method
          </Typography>

          <MHButton
            // color="secondary"
            sx={{
              width: 260
            }}
            onClick={handleAccountLinkOpen}>
            Connect Account
          </MHButton>
        </Box>

        <Box>
          <Pricing
            total={
              (employer?.quarterlyAllocation
                ? employer.quarterlyAllocation
                : 0) +
              20 +
              15
            }
          />
        </Box>
      </Stack>

      {openAccountLink && (
        <LinkAccount
          open={openAccountLink}
          onClose={handleAccountLinkClose}
          onCustomerConnected={handleConnectedCustomer.bind(null, accountId)}
        />
      )}

      {openDwollaPayment && (
        <DwollaPayment
          open={openDwollaPayment}
          onClose={handleDwollaPaymentClose}
          employerData={{
            employerRefId: employer!.employerRefId,
            accountId: accountId
          }}
        />
      )}
    </Box>
  );
};

export default SummaryStep;
