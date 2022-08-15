import { styled } from '@mui/system';

const ErrorTip = styled('span')(
  ({ theme, style }) => `
    color: ${theme.palette.error.main};
    font-size: 0.7rem;
    display: inline-block;
    font-family: Area-Normal-Semibold;
    ...({
        ...style
    })
`
);

export default ErrorTip;