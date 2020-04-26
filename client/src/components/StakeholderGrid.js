import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
// import moment from "moment";

import DataGrid from "react-data-grid";

const linkFormatter = ({ value, row }) => {
  return <Link to={`/organizationedit/${row.id}`}>{value}</Link>;
};

const booleanFormatter = ({ value, row }) => {
  return value ? "y" : "n";
};

const distanceFormatter = ({ value }) => {
  return value ? value.toFixed(2) : value;
};

const dateFormatter = ({ value }) => {
  return !value
    ? ""
    : value.format
    ? value.format("MM/DD/YY hh:mm a")
    : value.toString();
};

const defaultColumnProperties = {
  resizable: true,
  sortable: true,
  width: 150,
};

const sortRows = (initialRows, sortColumn, sortDirection) => (rows) => {
  const comparer = (a, b) => {
    if (sortDirection === "ASC") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else if (sortDirection === "DESC") {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  };
  return sortDirection === "NONE" ? initialRows : [...rows].sort(comparer);
};

const columns = [
  { key: "id", name: "ID", formatter: linkFormatter, width: 60, frozen: true },
  {
    key: "name",
    name: "Name",
    formatter: linkFormatter,
    width: 240,
    frozen: true,
  },
  { key: "inactive", name: "Inactive", formatter: booleanFormatter, width: 80 },

  { key: "assignedUser", name: "Assigned To" },
  {
    key: "assignedDate",
    name: "Assigned",
    formatter: dateFormatter,
    dataType: "datetime",
  },
  { key: "verifiedUser", name: "Verified By" },
  {
    key: "verifiedDate",
    name: "Verified",
    formatter: dateFormatter,
    dataType: "datetime",
  },
  { key: "reviewedUser", name: "Reviewed By" },
  {
    key: "rejectedDate",
    name: "Rejected",
    formatter: dateFormatter,
    dataType: "datetime",
  },
  {
    key: "approvedDate",
    name: "Approved",
    formatter: dateFormatter,
    dataType: "datetime",
  },
  { key: "createdUser", name: "Entered By" },
  {
    key: "createdDate",
    name: "Entered",
    formatter: dateFormatter,
    dataType: "datetime",
  },
  { key: "modifiedUser", name: "Modified By" },
  {
    key: "modifiedDate",
    name: "Modified",
    formatter: dateFormatter,
    dataType: "datetime",
  },
  { key: "address1", name: "Street" },
  { key: "city", name: "City" },
  { key: "zip", name: "Zip Code" },
  { key: "phone", name: "Phone" },
  { key: "website", name: "Website", width: 240 },
  {
    key: "distance",
    name: "Distance (mi)",
    formatter: distanceFormatter,
    width: 95,
  },
].map((c) => ({ ...defaultColumnProperties, ...c }));

const StakeholderGrid = (props) => {
  const { stakeholders, setSelectedStakeholderIds } = props;
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [rows, setRows] = useState(props.stakeholders);

  const onRowsSelected = (newlySelectedRows) => {
    const newSelectedIndexes = selectedIndexes.concat(
      newlySelectedRows.map((row) => row.rowIdx)
    );
    setSelectedIndexes(newSelectedIndexes);
    const newSelectedStakeholderIds = newSelectedIndexes.map((i) => rows[i].id);
    setSelectedStakeholderIds(newSelectedStakeholderIds);
  };

  const onRowsDeselected = (newlyDeselectedRows) => {
    let rowIndexes = newlyDeselectedRows.map((r) => r.rowIdx);
    const newSelectedIndexes = selectedIndexes.filter(
      (i) => rowIndexes.indexOf(i) === -1
    );
    setSelectedIndexes(newSelectedIndexes);
    const newSelectedStakeholderIds = newSelectedIndexes.map((i) => rows[i].id);
    setSelectedStakeholderIds(newSelectedStakeholderIds);
  };

  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {stakeholders && stakeholders.length > 0 ? (
        <DataGrid
          minHeight={"70vh"}
          columns={columns}
          rowGetter={(i) => rows[i]}
          rowsCount={rows.length}
          onGridSort={(sortColumn, sortDirection) =>
            setRows(sortRows(stakeholders, sortColumn, sortDirection))
          }
          onColumnResize={(idx, width) =>
            console.log(`Column ${idx} has been resized to ${width}`)
          }
          rowSelection={{
            showCheckbox: true,
            enableShiftSelect: true,
            onRowsSelected: onRowsSelected,
            onRowsDeselected: onRowsDeselected,
            selectBy: {
              indexes: selectedIndexes,
            },
          }}
        />
      ) : (
        <Typography variant={"h5"} component={"h5"}>
          No matches found, please try different Criteria
        </Typography>
      )}
    </div>
  );
};

export default withRouter(StakeholderGrid);
