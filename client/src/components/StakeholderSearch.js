import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Input,
  MenuItem,
  Select,
  Grid,
  TextField,
  Chip,
  FormLabel
} from "@material-ui/core";
import SearchButton from "./SearchButton";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  card: {
    backgroundColor: theme.palette.common.white
  },
  cardHeader: {},
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function StakeholderSearch(props) {
  //const [categories, setCategories] = useState(props.categories);
  const [selectedCategories, setSelectedCategories] = useState(
    props.selectedCategories
  );
  const [searchString, setSearchString] = useState(props.searchString);
  const [latitude, setLatitude] = useState(props.latitude);
  const [longitude, setLongitude] = useState(props.longitude);
  const [selectedDistance, setSelectedDistance] = useState("1");

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        title={"Search Criteria"}
        className={classes.cardHeader}
      ></CardHeader>
      <CardContent>
        <form noValidate className={classes.form}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormLabel>Name</FormLabel>
              <TextField
                autoComplete="fname"
                name="searchString"
                value={searchString}
                variant="outlined"
                fullWidth
                id="name"
                label="Stakeholder Name"
                autoFocus
                onChange={event => {
                  setSearchString(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Categories</FormLabel>
              <Select
                multiple
                label="Categories"
                placeholder="Category(ies)"
                name="select-multiple-chip"
                fullWidth
                variant="outlined"
                value={selectedCategories}
                onChange={event => {
                  setSelectedCategories(event.target.value);
                }}
                input={<Input id="select-categories" />}
                renderValue={selected => (
                  <div>
                    {selected.map(category => (
                      <Chip key={category.id} label={category.name} />
                    ))}
                  </div>
                )}
              >
                {props.categories.map(category => (
                  <MenuItem key={category.id} value={category}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Location</FormLabel>
              <div>
                <span>{"Within "}</span>
                <Select
                  name="select-distance"
                  variant="outlined"
                  value={selectedDistance}
                  onChange={event => {
                    setSelectedDistance(event.target.value);
                  }}
                  input={<Input id="select-distance" />}
                >
                  <MenuItem key={1} value={1}>
                    1
                  </MenuItem>
                  <MenuItem key={2} value={2}>
                    2
                  </MenuItem>
                  <MenuItem key={3} value={3}>
                    3
                  </MenuItem>
                  <MenuItem key={5} value={5}>
                    5
                  </MenuItem>
                  <MenuItem key={10} value={10}>
                    10
                  </MenuItem>
                  <MenuItem key={20} value={20}>
                    20
                  </MenuItem>
                </Select>
                <span>{" miles "}</span>
              </div>
            </Grid>
            <Grid item container xs={12} justify="flex-end">
              <SearchButton
                onClick={() => {
                  props.search(
                    searchString,
                    latitude,
                    longitude,
                    selectedCategories,
                    selectedDistance
                  );
                }}
              />
            </Grid>
          </Grid>
        </form>
        {latitude ? (
          <div>
            longitude: {longitude} latitude: {latitude}{" "}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default StakeholderSearch;
