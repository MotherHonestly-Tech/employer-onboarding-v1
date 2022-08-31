import * as React from 'react';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';

import IconButtonStyled from '../Button/IconButtonStyled';
import { ReactComponent as ArrowRightIcon } from '../../static/svg/arrow-right.svg';
import { ReactComponent as ArrowLeftIcon } from '../../static/svg/arrow-left.svg';

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
    'Sittercity',
    'https://res.cloudinary.com/mother-honestly/image/upload/v1658581169/sittercity_square_logo_1_t7zj5w.svg',
    'Petcare',
    'Vaccines',
    -50,
    495
  ),
  createData(
    'Care.com',
    'https://res.cloudinary.com/mother-honestly/image/upload/v1658581169/care_1_ofwdit.svg',
    'Childcare',
    'Medications',
    -76,
    599
  ),
  createData(
    'SnapHealth',
    'https://res.cloudinary.com/mother-honestly/image/upload/v1658581169/Snaphealth_1_g44p2m.svg',
    'Eldercare',
    'Consultation',
    -42,
    725
  )
];

export type GridColDef = {
  field: string;
  headerName: string;
  width: number;
  type: 'number' | 'text' | 'date';
  align?: 'left' | 'right';
  valueGetter?: (params: any) => any;
  cellRenderer?: (params: any) => any;
  description?: string;
};

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

const StyledTableContainer = styled(TableContainer)({
    width: '100%',
    overflowX: 'auto',
    overflowY: 'auto',
    maxHeight: '100%',
    border: '1px solid #E0E0E0',
    borderRadius: '12px',
    backgroundColor: '#fff',
    // '&:last-child': {
    //     borderBottom: 'none'
    // }
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  padding: 10,
  borderBottom: '1px solid rgb(241 245 249)',
  //   mb: 3,
  [`&.${tableCellClasses.head}`]: {
    background: '#f8fafc',
    color: '#A1A1A1',
    fontSize: '0.8rem'
  },
  [`&.${tableCellClasses.body}`]: {
    background: theme.palette.common.white,
    fontSize: '0.8rem',
    color: '#637075'
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: 'transparent',
  // '& td, & th': {
  //   border: 0
  // },
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButtonStyled
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
      </IconButtonStyled>
      <IconButtonStyled
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
      </IconButtonStyled>
      <IconButtonStyled
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
      </IconButtonStyled>
      <IconButtonStyled
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
      </IconButtonStyled>
    </Box>
  );
}

export default function MHDataTable({
  rows,
  columns
}: {
  rows: any[];
  columns: GridColDef[];
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <StyledTableContainer>
      <Table
        aria-label="transactions table"
        padding="none"
        sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {columns.map(({ headerName, width }) => (
              <StyledTableCell key={headerName} width={width}>
                {headerName}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {columns.map((col) => {
                const {
                  field,
                  headerName,
                  width,
                  align,
                  type,
                  valueGetter,
                  cellRenderer,
                  description
                } = col;
                const value = valueGetter ? valueGetter(row) : row[field];
                return (
                  <StyledTableCell
                    //   component="th"
                    scope="row"
                    key={field}
                    width={width}
                    align={align || 'left'}>
                    {cellRenderer ? cellRenderer(value) : value}
                    {/* {description && <Typography variant="body2">{description}</Typography>} */}
                  </StyledTableCell>
                );
              })}
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TablePagination
              rowsPerPageOptions={[5]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
        </TableFooter>
      </Table>
    </StyledTableContainer>
  );
}
