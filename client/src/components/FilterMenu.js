import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";

const useStyles = makeStyles(theme => ({
  typography: {
    padding: "1rem",
  },
  menuOpen: {
    boxShadow: "inset 0px 0px 8px 0px hsl(243, 94%, 30%)",
    backgroundColor: "white",
    borderRadius: "30px",
    border: "2px solid hsl(243, 95%, 30%)",
    color: "hsl(243, 95%, 30%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  menuClosed: {
    borderRadius: "30px",
    border: "2px solid hsl(243, 95%, 30%)",
    backgroundColor: "white",
    color: "hsl(243, 95%, 30%)",
  },
}));

function FilterMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = React.useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    setIsFilterMenuOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsFilterMenuOpen(false);
  };

  const id = isFilterMenuOpen ? "filter-popover" : undefined;

  return (
    <>
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        className={isFilterMenuOpen ? classes.menuOpen : classes.menuClosed}
      >
        <FilterListIcon />
      </IconButton>
      <Popover
        id={id}
        open={isFilterMenuOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div style={{ height: "15rem", width: "20rem" }}>
          <Typography className={classes.typography}>
            Search Criteria Goes HERE!!!
          </Typography>
        </div>
      </Popover>
    </>
  );
}

export default FilterMenu;
