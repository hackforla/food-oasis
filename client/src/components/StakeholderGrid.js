import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import moment from 'moment';

import DataGrid from 'react-data-grid';

const linkFormatter = ({ value, row }) => {
  return <Link to={`/organizationedit/${row.id}`}>{value}</Link>;
};

const booleanFormatter = ({ value, row }) => {
  return value ? 'y' : 'n';
};

const distanceFormatter = ({ value }) => {
  return value ? value.toFixed(2) : value;
};

const dateFormatter = ({ value }) =>
  value ? moment(value).format('MM/DD/YY hh:mm a') : '';

const defaultColumnProperties = {
  resizable: true,
  sortable: true,
  width: 150,
};

const sortRows = (initialRows, sortColumn, sortDirection) => (rows) => {
  const comparer = (a, b) => {
    if (sortDirection === 'ASC') {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else if (sortDirection === 'DESC') {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  };
  return sortDirection === 'NONE' ? initialRows : [...rows].sort(comparer);
};

const columns = [
  { key: 'id', name: 'ID', width: 60 },
  { key: 'name', name: 'Name', formatter: linkFormatter, width: 240 },
  { key: 'inactive', name: 'Inactive', formatter: booleanFormatter, width: 80 },
  { key: 'city', name: 'City' },
  { key: 'zip', name: 'Zip Code' },
  { key: 'phone', name: 'Phone' },
  { key: 'website', name: 'Website', width: 240 },
  {
    key: 'distance',
    name: 'Distance (mi)',
    formatter: distanceFormatter,
    width: 95,
  },
  { key: 'assignedUser', name: 'Assigned To' },
  {
    key: 'assignedDate',
    name: 'Assigned',
    formatter: dateFormatter,
    dataType: 'datetime',
  },
  { key: 'verifiedUser', name: 'Verified By' },
  {
    key: 'verifiedDate',
    name: 'Verified',
    formatter: dateFormatter,
    dataType: 'datetime',
  },
  { key: 'reviewedUser', name: 'Reviewed By' },
  {
    key: 'rejectedDate',
    name: 'Rejected',
    formatter: dateFormatter,
    dataType: 'datetime',
  },
  {
    key: 'approvedDate',
    name: 'Approved',
    formatter: dateFormatter,
    dataType: 'datetime',
  },
  { key: 'createdUser', name: 'Entered By' },
  {
    key: 'createdDate',
    name: 'Entered',
    formatter: dateFormatter,
    dataType: 'datetime',
  },
  { key: 'modifiedUser', name: 'Modified By' },
  {
    key: 'modifiedDate',
    name: 'Modified',
    formatter: dateFormatter,
    dataType: 'datetime',
  },
].map((c) => ({ ...defaultColumnProperties, ...c }));

const StakeholderGrid = (props) => {
  const { stakeholders } = props;
  const [rows, setRows] = useState(props.stakeholders);
  return (
    <>
      {stakeholders && stakeholders.length > 0 ? (
        <DataGrid
          styles={{ flexGrow: 1, minHeight: '100%' }}
          columns={columns}
          rowGetter={(i) => rows[i]}
          rowsCount={rows.length}
          onGridSort={(sortColumn, sortDirection) =>
            setRows(sortRows(stakeholders, sortColumn, sortDirection))
          }
          onColumnResize={(idx, width) =>
            console.log(`Column ${idx} has been resized to ${width}`)
          }
        />
      ) : (
        <Typography variant={'h5'} component={'h5'}>
          No matches found, please try different Criteria
        </Typography>
      )}
    </>
  );
};

export default withRouter(StakeholderGrid);
