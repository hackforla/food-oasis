import Button from "./Button";
import Checkbox from "./Checkbox";
import Chip from "./Chip";
import CssBaseline from "./CssBaseline";
import Link from "./Link";
import ListItemButton from "./ListItemButton";
import Radio from "./Radio";
import Select from "./Select";
import SvgIcon from "./SvgIcon";
import Tab from "./Tab";
import Tabs from "./Tabs";
import TextField from "./TextField";
import Tooltip from "./Tooltip";
import Typography from "./Typography";

export function componentsOverrides(theme) {
  return Object.assign(
    Button(theme),
    Checkbox(theme),
    Chip(theme),
    CssBaseline(theme),
    Link(theme),
    ListItemButton(theme),
    Radio(theme),
    SvgIcon(theme),
    Select(theme),
    Tab(theme),
    Tabs(theme),
    TextField(theme),
    Tooltip(theme),
    Typography(theme)
  );
}
