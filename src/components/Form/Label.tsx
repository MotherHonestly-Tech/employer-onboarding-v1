import {styled} from '@mui/system';

const Label = styled('label')(
  ({ theme, style }) => `
    display: inline-block;
    font-family: Avenir-Book;
    font-size: 0.875rem;
    width: 100%;
    min-width: 320px;
    margin-bottom: 4px;
    color: #A9A9A9;
    ...({
        ...style
    })
    `
);

export default Label;