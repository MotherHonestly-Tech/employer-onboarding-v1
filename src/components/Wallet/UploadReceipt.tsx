import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import MHDialog from '../../components/Dialog/MHDialog';
import { MHSelect } from '../Form/MHSelect';
import MHFormControl from '../Form/MHFormControl';
import InputAdornment from '../Form/InputAdornment';
import useInput from '../../hooks/use-input';

import { ReactComponent as DollarIcon } from '../../static/svg/dollar.svg';
import * as validators from '../../utils/validators';
import * as constants from '../../utils/constants';

const UploadReceipt = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const {
    value: enteredCategory,
    valid: enteredCategoryIsValid,
    error: enteredCategoryHasError,
    onChange: categoryInputChangeHandler,
    onBlur: categoryInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const {
    value: enteredMerchant,
    valid: enteredMerchantIsValid,
    error: enteredMerchantHasError,
    onChange: merchantInputChangeHandler,
    onBlur: merchantInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const {
    value: enteredAmount,
    valid: enteredAmountIsValid,
    error: enteredAmountHasError,
    onChange: amountInputChangeHandler,
    onBlur: amountInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    },
    {
      validator: (value: string) => validators.min(1)(value)
    },
    {
      validator: (value: string) => validators.isNumber(value)
    }
  ]);

  const {
    value: enteredDesc,
    valid: enteredDescIsValid,
    error: enteredDescHasError,
    onChange: descInputChangeHandler,
    onBlur: descInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  let formIsValid = enteredCategoryIsValid;

  return (
    <MHDialog
      open={open}
      title="Upload your receipt"
      handleClose={onClose}
      scroll="paper"
      fullWidth>
      {/* <Typography variant="h3" align="center" color="#28404A" gutterBottom>
      Upload Your Receipt
    </Typography> */}
      <Box component={'form'}>
        <MHSelect
          label="Select a Category"
          placeholder="Pick a category"
          options={constants.CATEGORY_OPTIONS}
          value={enteredCategory}
          onChange={(val) => categoryInputChangeHandler(val as string)}
          onBlur={categoryInputBlurHandler}
          popperWidth="80%"
        />

        <Grid container spacing={2}>
          <Grid item xs={8}>
            <MHSelect
              label="Select a Merchant"
              placeholder="Pick a merchant"
              options={constants.CATEGORY_OPTIONS}
              value={enteredMerchant}
              onChange={(val) => merchantInputChangeHandler(val as string)}
              onBlur={merchantInputBlurHandler}
            />
          </Grid>
          <Grid item xs={4}>
            <MHFormControl
              id="amount"
              type="number"
              placeholder="0.00"
              label="Amount"
              value={enteredAmount}
              onChange={amountInputChangeHandler}
              onBlur={amountInputBlurHandler}
              startAdornment={
                <InputAdornment
                  style={{
                    position: 'relative',
                    left: '10px'
                  }}>
                  <DollarIcon width="1rem" height="1rem" />
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>

        <MHFormControl
          id="desc"
          label="Expense Description"
          placeholder="A short description of expense"
          type="text"
          value={enteredDesc}
          onChange={descInputChangeHandler}
          onBlur={descInputBlurHandler}
          multiline
          rows={10}
        />
      </Box>
    </MHDialog>
  );
};

export default UploadReceipt;
