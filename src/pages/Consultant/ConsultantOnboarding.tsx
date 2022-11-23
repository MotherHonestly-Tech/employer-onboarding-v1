import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Layout from '../../components/Layout/Layout';
import BackdropLoader from '../../components/UI/BackdropLoader';
import UploadButton from '../../components/Form/UploadButton';
import Label from '../../components/Form/Label';
import IconWithText from '../../components/UI/IconWithText';
import RoundedLogoIcon from '../../theme/icons/RoundedLogo';
import { MHMultiSelect } from '../../components/Form/MHSelect';

import { ReactComponent as CloudUploadIcon } from '../../static/svg/cloud-upload.svg';
import interestsData from '../../data/interests.json';
import { SelectOption } from '@mui/base';
import { styled } from '@mui/material/styles';

import MHFormControl from '../../components/Form/MHFormControl';
import StyledActionButton from '../../components/Button/StyledActionButton';
import useInputArray from '../../hooks/use-input-array';

import * as validators from '../../utils/validators';
import { ReactComponent as PlusIcon } from '../../static/svg/plus.svg';
import { ReactComponent as BinIcon } from '../../static/svg/bin.svg';
import IconButtonStyled from '../../components/Button/IconButtonStyled';
import useInput from '../../hooks/use-input';
import MHButton from '../../components/Button/MHButton';

const UploadWidget = () => (
  <Box>
    <Box p={3} mb={2} border={1} borderColor="#E8E8E8" borderRadius={2}>
      <IconWithText spacing={1} justifyContent="center">
        <RoundedLogoIcon
          sx={{
            height: '35px',
            width: '35px',
            bgcolor: '#F2EC2C',
            p: 1,
            m: 0
          }}>
          <CloudUploadIcon />
        </RoundedLogoIcon>

        <Typography
          component="span"
          variant="body2"
          fontSize=".8rem"
          fontFamily="Area-Normal-Semibold"
          color="#A6A6A6">
          Click to upload or drag and drop PNG or JPG (maximum size 2mb)
        </Typography>
      </IconWithText>
    </Box>

    <Typography variant="body1" color="#A6A6A6" fontSize=".7rem" lineHeight="1.6" gutterBottom>
      This image will appear on your company's MH Work-Life Dashboard. <br />
      Recommended Dimensions: From 400px * 525px to 500px * 625px
    </Typography>
    {/* <Typography
      variant="body1"
      fontFamily={'Area-Normal-Bold'}
      color="#194049"
      gutterBottom>
      Drop your file here, or
      <Typography component="span" color="#009688">
        {' '}
        browse
      </Typography>
    </Typography> */}
  </Box>
);

const SelectTag = styled('span')(
  ({ theme }) => `
    border-radius: 3px;
    background: #EBE5F1;
    padding: 4px 9px;
    display: inline-block;
    color: ${theme.palette.primary.main};
  `
);

const ConsultantOnboarding = () => {
  const uploadBtnRef = React.useRef<any>(null);

  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [isDragActive, setIsDragActive] = React.useState(false);

  const uploadChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = Array.from(e.target.files as FileList);
    validateUploadedFile(file);
  };

  const dragFileInHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    setIsDragActive(true);
  };

  const dragFileOutHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    setIsDragActive(false);
  };

  const dropFileHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    const [file] = Array.from(e.dataTransfer.files as FileList);
    validateUploadedFile(file);
    setIsDragActive(false);
  };

  const validateUploadedFile = (file: File) => {
    const fileRef = uploadBtnRef.current;

    if (!file) {
      return;
    }

    setUploadedFile(file);
  };

  const [interests, setInterests] = React.useState<string[] | null>([]);

  const interestInputChangeHandler = (values: string[] | null) => {
    setInterests(values);
  };

  function renderValue(options: SelectOption<string>[] | null) {
    let content = null;

    if (!options) return content;

    return (
      <Stack
        direction="row"
        spacing={1}
        maxWidth="calc(100% - 30px)"
        overflow={'auto'}
        sx={{
          whiteSpace: 'nowrap',
          '::-webkit-scrollbar': {
            height: '0px'
          }
        }}>
        {options.map((item) => (
          <SelectTag key={item.value}>{item.label}</SelectTag>
        ))}
      </Stack>
    );
  }

  const { inputFields, onChange, addField, removeField } = useInputArray([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  React.useEffect(() => {
    addField();
  }, []);

  const {
    value: enteredBio,
    valid: enteredBioIsValid,
    onChange: bioInputChangeHandler,
    onBlur: bioInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const submitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      {/* {loading && <BackdropLoader />} */}
      <Layout>
        <Container maxWidth="md" sx={{
            py: 5
        }}>
          <Typography
            variant="h1"
            align="center"
            paragraph
            sx={{
              mb: 4
            }}>
            Internal Consultant Onboarding
          </Typography>

          <Box component="form" onSubmit={submitHandler}>
            <Box mb={4}>
              <Label>Upload Picture</Label>
              <UploadButton
                htmlFor="csv-upload"
                file={uploadedFile}
                onChange={uploadChangeHandler}
                element={<UploadWidget />}
                onDragEnter={dragFileInHandler}
                onDragLeave={dragFileOutHandler}
                onDrop={dropFileHandler}
                accept="image/*,application/pdf,.jpg,image/jpeg,image/png"
                isDragActive={isDragActive}
                ref={uploadBtnRef}
                containerSx={{
                  flexGrow: 1
                }}
              />
            </Box>

            <MHMultiSelect
              label="Interests"
              placeholder="What are your interests?"
              options={interestsData.map((interest) => ({
                label: interest.interest,
                value: interest.interest
              }))}
              value={interests as string[]}
              onChange={interestInputChangeHandler}
              onBlur={() => {}}
              renderValue={renderValue}
            />

            {inputFields.map((field, i) => (
              <Stack
                key={i}
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                  '& > div': {
                    flexGrow: 1
                  }
                }}>
                <MHFormControl
                  type="text"
                  id={'email' + i}
                  label="What can you advice on?"
                  placeholder="Enter advice here"
                  value={field.value}
                  onChange={(e) => onChange(e, i)}
                />
                {inputFields.length > 1 && (
                  <IconButtonStyled
                    onClick={removeField.bind(null, i)}
                    sx={{
                      padding: 13,
                      bgcolor: '#F8F246',
                      width: 25,
                      height: 25,
                      borderRadius: '50%',
                      mr: 1,
                      '& > svg': {
                        color: (theme) => theme.palette.primary.main
                      }
                    }}>
                    <BinIcon width=".9rem" />
                  </IconButtonStyled>
                )}
                {
                  <IconButtonStyled
                    onClick={addField}
                    sx={{
                      padding: 13,
                      bgcolor: '#F8F246',
                      width: 25,
                      height: 25,
                      borderRadius: '50%'
                    }}>
                    <PlusIcon width=".9rem" />
                  </IconButtonStyled>
                }
              </Stack>
            ))}

            <MHFormControl
              type="text"
              id="bio"
              label="Please share a short bio"
              placeholder="Enter bio here"
              value={enteredBio}
              onChange={bioInputChangeHandler}
              onBlur={bioInputBlurHandler}
              multiline
            />

            <MHButton type="submit" fullWidth>
              Complete
            </MHButton>
          </Box>
        </Container>
      </Layout>
    </React.Fragment>
  );
};

export default ConsultantOnboarding;
