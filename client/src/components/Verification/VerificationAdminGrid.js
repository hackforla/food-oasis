import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { VERIFICATION_STATUS_NAMES } from "../../constants/stakeholder";
import { Block, Check, Remove } from "@material-ui/icons";

import DataGrid from "react-data-grid";

const linkFormatter = ({ value, row }) => {
  return <Link to={`/organizationedit/${row.id}`}>{value}</Link>;
};

const inactiveFormatter = ({ value, row }) => {
  return value ? (
    <div style={{ textAlign: "center" }}>
      <Block style={{ color: "red" }} />
    </div>
  ) : (
    ""
  );
};

const confirmationFormatter = ({ value, row }) => {
  return value ? (
    <div style={{ backgroundColor: "green", margin: "0", textAlign: "center" }}>
      <Check style={{ color: "white" }} />
    </div>
  ) : (
    <div style={{ backgroundColor: "red", margin: "0", textAlign: "center" }}>
      <Remove style={{ color: "white" }} />
    </div>
  );
};

const verificationStatusFormatter = ({ value, row }) => {
  return VERIFICATION_STATUS_NAMES[value];
};

const distanceFormatter = ({ value }) => {
  return value ? value.toFixed(2) : value;
};

const categoriesFormatter = ({ value }) => {
  return value && value.length > 0 ? value.map((c) => c.name).join(", ") : "";
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
    if (
      typeof a[sortColumn] === "string" &&
      typeof b[sortColumn] === "string"
    ) {
      if (sortDirection === "ASC") {
        return a[sortColumn].toLowerCase() > b[sortColumn].toLowerCase()
          ? 1
          : -1;
      } else if (sortDirection === "DESC") {
        return a[sortColumn].toLowerCase() < b[sortColumn].toLowerCase()
          ? 1
          : -1;
      }
      return 0;
    }
    if (sortDirection === "ASC") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else if (sortDirection === "DESC") {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
    return 0;
  };
  return sortDirection === "NONE" ? initialRows : [...rows].sort(comparer);
};

const adminColumns = [
  { key: "id", name: "ID", formatter: linkFormatter, width: 60, frozen: true },
  {
    key: "name",
    name: "Name",
    formatter: linkFormatter,
    width: 240,
    frozen: true,
  },
  {
    key: "categories",
    name: "Categories",
    formatter: categoriesFormatter,
    width: 180,
  },
  {
    key: "completeCriticalPercent",
    name: "Critical %",
    width: 80,
  },
  {
    key: "inactive",
    name: "Perm Closed",
    formatter: inactiveFormatter,
    width: 80,
  },
  {
    key: "inactiveTemporary",
    name: "Covid Closed",
    formatter: inactiveFormatter,
    width: 80,
  },
  {
    key: "verificationStatusId",
    name: "Status",
    formatter: verificationStatusFormatter,
    width: 100,
  },
  {
    key: "confirmedName",
    name: "Name",
    formatter: confirmationFormatter,
    width: 60,
  },
  {
    key: "confirmedCategories",
    name: "Categories",
    formatter: confirmationFormatter,
    width: 60,
  },
  {
    key: "confirmedAddress",
    name: "Address",
    formatter: confirmationFormatter,
    width: 60,
  },
  {
    key: "confirmedPhone",
    name: "Phone",
    formatter: confirmationFormatter,
    width: 60,
  },
  {
    key: "confirmedEmail",
    name: "Email",
    formatter: confirmationFormatter,
    width: 60,
  },
  {
    key: "confirmedHours",
    name: "Hours",
    formatter: confirmationFormatter,
    width: 60,
  },
  {
    key: "neighborhoodName",
    name: "Neighborhood",
    width: 80,
  },
  { key: "assignedUser", name: "Assigned To" },
  {
    key: "assignedDate",
    name: "Assigned",
    formatter: dateFormatter,
    dataType: "datetime",
  },
  { key: "submittedUser", name: "Submitted By" },
  {
    key: "submittedDate",
    name: "Submitted",
    formatter: dateFormatter,
    dataType: "datetime",
  },
  { key: "reviewedUser", name: "Approved By" },
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

const dataEntryColumns = [
  { key: "id", name: "ID", formatter: linkFormatter, width: 60, frozen: true },
  {
    key: "name",
    name: "Name",
    formatter: linkFormatter,
    width: 240,
    frozen: true,
  },
  {
    key: "categories",
    name: "Categories",
    formatter: categoriesFormatter,
    width: 180,
  },
  {
    key: "completeCriticalPercent",
    name: "Critical %",
    width: 80,
  },
  {
    key: "inactive",
    name: "Perm Closed",
    formatter: inactiveFormatter,
    width: 80,
  },
  {
    key: "inactiveTemporary",
    name: "Covid Closed",
    formatter: inactiveFormatter,
    width: 80,
  },
  {
    key: "verificationStatusId",
    name: "Status",
    formatter: verificationStatusFormatter,
    width: 100,
  },
  {
    key: "confirmedName",
    name: "Name",
    formatter: confirmationFormatter,
    width: 60,
  },
  {
    key: "confirmedCategories",
    name: "Categories",
    formatter: confirmationFormatter,
    width: 60,
  },
  {
    key: "confirmedAddress",
    name: "Address",
    formatter: confirmationFormatter,
    width: 60,
  },
  {
    key: "confirmedPhone",
    name: "Phone",
    formatter: confirmationFormatter,
    width: 60,
  },
  {
    key: "confirmedEmail",
    name: "Email",
    formatter: confirmationFormatter,
    width: 60,
  },
  {
    key: "confirmedHours",
    name: "Hours",
    formatter: confirmationFormatter,
    width: 60,
  },
  {
    key: "neighborhoodName",
    name: "Neighborhood",
    width: 80,
  },
  {
    key: "assignedDate",
    name: "Assigned",
    formatter: dateFormatter,
    dataType: "datetime",
  },
  {
    key: "submittedDate",
    name: "Submitted",
    formatter: dateFormatter,
    dataType: "datetime",
  },
  { key: "address1", name: "Street" },
  { key: "city", name: "City" },
  { key: "zip", name: "Zip Code" },
  { key: "phone", name: "Phone" },
].map((c) => ({ ...defaultColumnProperties, ...c }));

const StakeholderGrid = (props) => {
  const { stakeholders, setSelectedStakeholderIds, mode } = props;
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [rows, setRows] = useState(props.stakeholders);
  const targetRef = React.useRef();
  const [dimensions, setDimensions] = useState();
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState(null);

  React.useLayoutEffect(() => {
    setDimensions(targetRef.current.getBoundingClientRect().toJSON());
  }, []);

  React.useEffect(() => {
    function handleResize() {
      setDimensions(targetRef.current.getBoundingClientRect().toJSON());
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  React.useEffect(() => {
    const storedSettings = sessionStorage.getItem(
      mode === "admin" ? "stakeholderGridSettings" : "dataEntryGridSettings"
    );
    if (storedSettings) {
      const settings = JSON.parse(storedSettings);
      setSortCol(settings.sortCol);
      setSortDir(settings.sortDir);
      setRows(sortRows(stakeholders, settings.sortCol, settings.sortDir));
    }
  }, [stakeholders, mode]);

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
      ref={targetRef}
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "275px",
      }}
    >
      {stakeholders && stakeholders.length > 0 && dimensions ? (
        <DataGrid
          minWidth={dimensions.width}
          minHeight={dimensions.height}
          columns={mode === "admin" ? adminColumns : dataEntryColumns}
          rowGetter={(i) => rows[i]}
          rowsCount={rows.length}
          sortColumn={sortCol}
          sortDirection={sortDir}
          onGridSort={(sortColumn, sortDirection) => {
            sessionStorage.setItem(
              mode === "admin"
                ? "stakeholderGridSettings"
                : "dataEntryGridSettings",
              JSON.stringify({ sortCol: sortColumn, sortDir: sortDirection })
            );
            setSortCol(sortColumn);
            setSortDir(sortDirection);
            setRows(sortRows(stakeholders, sortColumn, sortDirection));
          }}
          onColumnResize={(idx, width) =>
            console.log(`Column ${idx} has been resized to ${width}`)
          }
          rowSelection={
            mode === "admin"
              ? {
                  showCheckbox: true,
                  enableShiftSelect: true,
                  onRowsSelected: onRowsSelected,
                  onRowsDeselected: onRowsDeselected,
                  selectBy: {
                    indexes: selectedIndexes,
                  },
                }
              : null
          }
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
