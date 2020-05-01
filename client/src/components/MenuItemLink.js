import React from "react";
import { makeStyles } from "@material-ui/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  background: {
    backgroundColor: "rgba(144, 194, 70)",
  },
});

export default function MenuItemLink({ to, text, userSection, onClick }) {
  const classes = useStyles();

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <Link to={to} innerRef={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li className={userSection && classes.background}>
      <ListItem button component={renderLink} onClick={onClick}>
        <ListItemText primary={text} />
      </ListItem>
    </li>
  );
}
