import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import {
  withStyles,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import * as stakeholderService from "../services/stakeholder-service";
import * as categoryService from "../services/category-service";
import * as esriService from "../services/esri_service";

const styles = theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const StakeholderEdit = props => {
  const { classes, setToast, match } = props;
  const editId = match.params.id;
  const [categories, setCategories] = useState([]);
  const [geocodeResults, setGeocodeResults] = useState([]);
  const [originalData, setOriginalData] = useState({
    id: 0,
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    latitude: "",
    longitude: "",
    active: true,
    website: "",
    notes: "",
    selectedCategoryIds: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allCategories = await categoryService.getAll();
        setCategories(allCategories);

        if (editId) {
          const stakeholder = await stakeholderService.getById(editId);
          // For editing purposes, it is better to convert the
          // stakeholder.categories array of objects to an array of
          // categoryIds as stakeholder.categoryIds
          stakeholder.selectedCategoryIds = stakeholder.categories.map(
            category => category.id
          );
          delete stakeholder.categories;

          setOriginalData(stakeholder);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [editId]);

  function formatMapAddress(formData) {
    return `${formData.address1 || ""} ${formData.address2 ||
      ""} ${formData.city || ""}, ${formData.state || ""} ${formData.zip ||
      ""}`;
  }

  const geocode = async formData => {
    const result = await esriService.geocode(formatMapAddress(formData));
    setGeocodeResults(result);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Stakeholder Information
        </Typography>
        <Formik
          initialValues={originalData}
          enableReinitialize={true}
          onSubmit={(values, { setSubmitting, setFieldValue }) => {
            if (values.id) {
              return stakeholderService
                .put(values)
                .then(response => {
                  setToast({
                    message: "Update successful."
                  });
                })
                .catch(err => {
                  setToast({
                    message: "Update failed."
                  });
                  console.log(err);
                  setSubmitting(false);
                });
            } else {
              return stakeholderService
                .post(values)
                .then(response => {
                  setToast({
                    message: "Insert successful."
                  });
                  setFieldValue("id", response.id);
                  //   history.push("/stakeholders");
                })
                .catch(err => {
                  setToast({
                    message: "Insert failed."
                  });
                  console.log(err);
                  setSubmitting(false);
                });
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
          }) => (
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    label="name"
                    name="name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    autoFocus
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.name ? errors.name : ""}
                    error={touched.name && Boolean(errors.name)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="address1"
                    label="Address Line 1"
                    type="text"
                    value={values.address1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.address1 ? errors.address1 : ""}
                    error={touched.address1 && Boolean(errors.address1)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="address2"
                    label="Address Line 2"
                    type="text"
                    value={values.address2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.address2 ? errors.address2 : ""}
                    error={touched.address2 && Boolean(errors.address2)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="city"
                    label="City"
                    type="text"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.city ? errors.city : ""}
                    error={touched.city && Boolean(errors.city)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="state"
                    label="State"
                    type="text"
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.state ? errors.state : ""}
                    error={touched.state && Boolean(errors.state)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="zip"
                    label="Zip Code"
                    type="text"
                    value={values.zip}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.zip ? errors.zip : ""}
                    error={touched.zip && Boolean(errors.zip)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="latitude"
                    label="latitude"
                    type="text"
                    value={values.latitude}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.latitude ? errors.latitude : ""}
                    error={touched.latitude && Boolean(errors.latitude)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="longitude"
                    label="Longitude"
                    type="text"
                    value={values.longitude}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.longitude ? errors.longitude : ""}
                    error={touched.longitude && Boolean(errors.longitude)}
                  />
                </Grid>
                <Grid xs={12} style={{ backgroundColor: "#FFF" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => geocode(values)}
                  >
                    <Typography>Get Lat/Lon from Address</Typography>
                  </Button>

                  <div style={{ padding: "0.5em" }}>
                    {geocodeResults ? (
                      geocodeResults.map((result, index) => (
                        <div
                          style={{
                            border: "1px solid black",
                            backgroundColor: "#EEE",
                            margin: "0.1em",
                            padding: "0.5em"
                          }}
                          key={index}
                        >
                          <Typography>{`(${result.location.y}, ${result.location.x})`}</Typography>
                          <Typography>{`${result.attributes.Match_addr}`}</Typography>
                          <Typography>{`${result.attributes.Addr_type}`}</Typography>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              setFieldValue("latitude", result.location.y);
                              setFieldValue("longitude", result.location.x);
                              setGeocodeResults([]);
                            }}
                          >
                            Choose
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div>No Results</div>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="website"
                    label="Web Site"
                    type="text"
                    value={values.website}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.website ? errors.website : ""}
                    error={touched.website && Boolean(errors.website)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="notes"
                    label="Notes"
                    type="text"
                    multiline
                    rows={2}
                    rowsMax={12}
                    value={values.notes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.notes ? errors.notes : ""}
                    error={touched.notes && Boolean(errors.notes)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        margin="normal"
                        name="active"
                        label="Active"
                        value="1"
                        checked={values.active}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Active"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="selectCategoryIds-label">
                      Categories
                    </InputLabel>

                    <Select
                      labelId="selectCategoryIds-label"
                      id="selectedCategoryIds"
                      variant="outlined"
                      name="selectedCategoryIds"
                      multiple
                      fullWidth
                      value={values.selectedCategoryIds}
                      onChange={handleChange}
                      input={<Input />}
                      renderValue={selectedCategoryIds => {
                        if (selectedCategoryIds.length === 0) {
                          return "(Select Categories)";
                        }
                        return selectedCategoryIds
                          .map(
                            categoryId =>
                              categories.filter(
                                category => category.id === categoryId
                              )[0].name
                          )
                          .join(", ");
                      }}
                      MenuProps={MenuProps}
                    >
                      {categories.map(category => (
                        <MenuItem
                          key={category.id}
                          value={category.id}
                          // style={getStyles(name, personName, theme)}
                        >
                          <Checkbox
                            checked={
                              values.selectedCategoryIds.indexOf(category.id) >
                              -1
                            }
                          />
                          <ListItemText primary={category.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={isSubmitting}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <div>Id: {values.id} </div>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default withStyles(styles)(withRouter(StakeholderEdit));
