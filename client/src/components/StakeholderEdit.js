/* eslint-disable indent */
/* eslint-disable react/jsx-curly-newline */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { UserContext } from './user-context'
import { Formik } from 'formik'
import AccountAutocomplete from './AccountAutocomplete'
import * as Yup from 'yup'
import {
  AppBar,
  withStyles,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import * as stakeholderService from '../services/stakeholder-service'
import * as categoryService from '../services/category-service'
import * as esriService from '../services/esri_service'
import OpenTimeForm from './OpenTimeForm'
import { TabPanel, a11yProps } from './TabPanel'
// import BigTooltip from "./BigTooltip";
import { SaveButton, CloseButton, SearchButton, VerifyButton } from './Buttons'

import moment from 'moment'

const BigTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: 16,
  },
}))(Tooltip)

const styles = (theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  workflowRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  workflowColumn1: {
    flexBasis: '20%',
  },
  workflowColumn2: {
    flexBasis: '20%',
  },
  workflowColumn3: {
    flexBasis: '20%',
  },
  workflowColumn4: {
    flexBasis: '40%',
  },
  workflowText: {
    fontSize: '1.2em',
    marginTop: '0.4em',
    marginBottom: '0.2em',
  },
  confirmableFieldWrapper: {
    flexGrow: 1,
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmableField: {
    flexGow: 1,
  },
  confirmCheckbox: {
    marginLeft: '0.2em',
  },
})

const DATE_FORMAT = 'MM/DD/YY h:mm a'

// function a11yProps(index) {
//   return {
//     id: `tab-${index}`,
//     "aria-controls": `tab-${index}`,
//   };
// }

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  address1: Yup.string().required('Street address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zip: Yup.string().required('Zip code is required'),
  latitude: Yup.number().required('Latitude is required').min(-90).max(90),
  longitude: Yup.number().required('Longitude is required').min(-180).max(180),
  email: Yup.string().email('Invalid email address format'),
  selectedCategoryIds: Yup.array().min(
    1,
    'You must select at least one category',
  ),
})

const StakeholderEdit = (props) => {
  const { classes, setToast, match, user, history } = props
  const editId = match.params.id
  const [tabPage, setTabPage] = useState(0)
  const [categories, setCategories] = useState([])
  const [geocodeResults, setGeocodeResults] = useState([])
  const [originalData, setOriginalData] = useState({
    id: 0,
    name: '',
    description: '',
    parentOrganization: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    latitude: '',
    longitude: '',
    physicalAccess: '',
    items: '',
    services: '',
    facebook: '',
    twitter: '',
    pinterest: '',
    linkedin: '',
    inactive: false,
    website: '',
    notes: '',
    requirements: '',
    adminNotes: '',
    createdDate: '',
    createdUser: '',
    modifiedDate: '',
    modifiedUser: '',
    submittedDate: '',
    submittedUser: '',
    approvedDate: '',
    approvedUser: '',
    selectedCategoryIds: [],
    hours: [],
    instagram: '',
    adminContactName: '',
    adminContactPhone: '',
    adminContactEmail: '',
    donationContactName: '',
    donationContactPhone: '',
    donationContactEmail: '',
    donationPickup: false,
    donationAcceptFrozen: false,
    donationAcceptRefrigerated: false,
    donationAcceptPerishable: false,
    donationSchedule: '',
    donationNotes: '',
    donationDeliveryInstructions: '',
    covidNotes: '',
    categoryNotes: '',
    eligibilityNotes: '',
    foodTypes: '',
    languages: 'English',
    confirmedName: false,
    confirmedCategories: false,
    confirmedAddress: false,
    confirmedEmail: false,
    confirmedPhone: false,
    confirmedHours: false,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await categoryService.getAll()
        const activeCategories = categories.filter(
          (category) => !category.inactive,
        )
        setCategories(activeCategories)

        if (editId) {
          const stakeholder = await stakeholderService.getById(editId)
          // For editing purposes, it is better to convert the
          // stakeholder.categories array of objects to an array of
          // categoryIds as stakeholder.categoryIds
          stakeholder.selectedCategoryIds = stakeholder.categories.map(
            (category) => category.id,
          )
          delete stakeholder.categories

          setOriginalData(stakeholder)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [editId])

  const cancel = () => {
    history.goBack()
  }

  function formatMapAddress(formData) {
    return `${formData.address1 || ''} ${formData.address2 || ''} ${
      formData.city || ''
    }, ${formData.state || ''} ${formData.zip || ''}`
  }

  const geocode = async (formData) => {
    const result = await esriService.geocode(formatMapAddress(formData))
    setGeocodeResults(result)
  }

  const handleChangeTabPage = (event, newValue) => {
    setTabPage(newValue)
  }

  const noteTooltip = (
    <div>
      <Typography>These are notes for clients to see, for example:</Typography>
      <List dense>
        <ListItem>
          <ListItemText primary="Holiday hours may differ. Call or text message to confirm." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Call ahead to make appointment or confirm that they are actually open" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Food tends to run out early on Saturdays" />
        </ListItem>
        <ListItem>
          <ListItemText primary="This pantry was acquired by Shepherds Pantry" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Enter through double doors on Figueroa St." />
        </ListItem>
      </List>
    </div>
  )

  const adminNoteTooltip = (
    <div>
      <Typography>Notes about Verification. For example,</Typography>
      <List dense>
        <ListItem>
          <ListItemText>
            They are most responsive to email (or Facebook or whatever).
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            We do not have any good contact information for them.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            You might have been able to verify some information, but need to
            follow-up with another phone call, Facebook message, etc.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            You might have been able to verify some information online, but need
            to make phone contact.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            You might have sent email or Facebook message, and are waiting for a
            response.
          </ListItemText>
        </ListItem>
      </List>
      <Typography>If you don't get through to them: (choose one)</Typography>
      <List dense>
        <ListItem>
          <ListItemText primary="1. The phone was inactive" />
        </ListItem>
        <ListItem>
          <ListItemText primary={"2. Weren't available but call back"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. Got partial information from voicemail (also enter this information in the appropriate formfields)" />
        </ListItem>
      </List>
    </div>
  )

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Organization Information
        </Typography>
        <Formik
          initialValues={originalData}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, setFieldValue }) => {
            if (values.id) {
              return stakeholderService
                .put({ ...values, loginId: user.id })
                .then((response) => {
                  setToast({
                    message: 'Update successful.',
                  })
                  props.history.goBack()
                })
                .catch((err) => {
                  setToast({
                    message: 'Update failed.',
                  })
                  console.log(err)
                  setSubmitting(false)
                })
            } else {
              return stakeholderService
                .post({ ...values, loginId: user.id })
                .then((response) => {
                  setToast({
                    message: 'Insert successful.',
                  })
                  setFieldValue('id', response.id)
                  props.history.goBack()
                })
                .catch((err) => {
                  setToast({
                    message: 'Insert failed.',
                  })
                  console.log(err)
                  setSubmitting(false)
                })
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
            setFieldValue,
          }) => (
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <AppBar position="static">
                <Tabs
                  value={tabPage}
                  onChange={handleChangeTabPage}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="stakeholder tabs"
                >
                  <Tab label="Identification" {...a11yProps(0)} />
                  <Tab label="Client Contact" {...a11yProps(1)} />
                  <Tab label="Hours" {...a11yProps(2)} />
                  <Tab label="Details" {...a11yProps(3)} />
                  <Tab label="Donations" {...a11yProps(4)} />
                  <Tab label="Verification" {...a11yProps(5)} />
                </Tabs>
              </AppBar>
              <TabPanel value={tabPage} index={0}>
                <Grid container spacing={1}>
                  <Grid item xs={12} style={{ display: 'flex' }}>
                    <div style={{ flexGrow: 1 }}>
                      <TextField
                        type="text"
                        size="small"
                        label="Name"
                        name="name"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        autoFocus
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.name ? errors.name : ''}
                        error={touched.name && Boolean(errors.name)}
                      />
                    </div>
                    <div style={{ flexGrow: 0, paddingTop: '0.75em' }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            margin="normal"
                            name="confirmedName"
                            value={values.confirmedName}
                            checked={values.confirmedName}
                            onChange={(e) =>
                              setFieldValue('confirmedName', e.target.checked)
                            }
                            onBlur={handleBlur}
                          />
                        }
                        style={{
                          backgroundColor: 'lightgray',
                        }}
                        label="confirm"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                        renderValue={(selectedCategoryIds) => {
                          if (!categories) {
                            return 'Loading categories...'
                          }
                          if (selectedCategoryIds.length === 0) {
                            return '(Select Categories)'
                          }
                          return selectedCategoryIds
                            .map(
                              (categoryId) =>
                                categories.filter(
                                  (category) => category.id === categoryId,
                                )[0].name,
                            )
                            .join(', ')
                        }}
                        MenuProps={MenuProps}
                      >
                        {categories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            <Checkbox
                              checked={
                                values.selectedCategoryIds.indexOf(
                                  category.id,
                                ) > -1
                              }
                            />
                            <ListItemText primary={category.name} />
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {touched.selectedCategoryIds
                          ? errors.selectedCategoryIds
                          : ''}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <BigTooltip title="Notes about identifying organization category">
                      <TextField
                        type="text"
                        size="small"
                        label="Category Notes"
                        name="categoryNotes"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        multiline
                        rows={2}
                        rowsMax={12}
                        value={values.categoryNotes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.categoryNotes ? errors.categoryNotes : ''
                        }
                        error={
                          touched.categoryNotes && Boolean(errors.categoryNotes)
                        }
                      />
                    </BigTooltip>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <BigTooltip title="Check if they are permanently closed.">
                      <FormControlLabel
                        control={
                          <Checkbox
                            margin="normal"
                            name="inactive"
                            label="Inactive"
                            value={values.inactive}
                            checked={values.inactive}
                            onChange={() =>
                              setFieldValue('inactive', !values.inactive)
                            }
                            onBlur={handleBlur}
                          />
                        }
                        label="Inactive"
                      />
                    </BigTooltip>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <BigTooltip title="COVID-related conditions">
                      <TextField
                        type="text"
                        size="small"
                        label="COVID Notes"
                        name="covidNotes"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        multiline
                        rows={2}
                        rowsMax={12}
                        value={values.covidNotes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.covidNotes ? errors.covidNotes : ''}
                        error={touched.covidNotes && Boolean(errors.covidNotes)}
                      />
                    </BigTooltip>
                  </Grid>

                  <Grid item xs={6} sm={2}></Grid>
                  <Grid item xs={6} sm={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          margin="normal"
                          name="confirmedCategories"
                          value={values.confirmedCategories}
                          checked={values.confirmedCategories}
                          onChange={() =>
                            setFieldValue(
                              'confirmedCategories',
                              !values.confirmedCategories,
                            )
                          }
                          onBlur={handleBlur}
                        />
                      }
                      label="Confirm Categories"
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          margin="normal"
                          name="confirmedAddress"
                          value={values.confirmedAddress}
                          checked={values.confirmedAddress}
                          onChange={() =>
                            setFieldValue(
                              'confirmedAddress',
                              !values.confirmedAddress,
                            )
                          }
                          onBlur={handleBlur}
                        />
                      }
                      label="Confirm Address"
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          margin="normal"
                          name="confirmedEmail"
                          value={values.confirmedEmail}
                          checked={values.confirmedEmail}
                          onChange={() =>
                            setFieldValue(
                              'confirmedEmail',
                              !values.confirmedEmail,
                            )
                          }
                          onBlur={handleBlur}
                        />
                      }
                      label="Confirm Email"
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          margin="normal"
                          name="confirmedPhone"
                          value={values.confirmedPhone}
                          checked={values.confirmedPhone}
                          onChange={() =>
                            setFieldValue(
                              'confirmedPhone',
                              !values.confirmedPhone,
                            )
                          }
                          onBlur={handleBlur}
                        />
                      }
                      label="Confirm Phone"
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          margin="normal"
                          name="confirmedHours"
                          value={values.confirmedHours}
                          checked={values.confirmedHours}
                          onChange={() =>
                            setFieldValue(
                              'confirmedHours',
                              !values.confirmedHours,
                            )
                          }
                          onBlur={handleBlur}
                        />
                      }
                      label="Confirm Hours"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <BigTooltip title="The mission statement or other description.">
                      <TextField
                        type="text"
                        size="small"
                        label="Description"
                        name="description"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        multiline
                        rows={2}
                        rowsMax={12}
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.description ? errors.description : ''
                        }
                        error={
                          touched.description && Boolean(errors.description)
                        }
                      />
                    </BigTooltip>
                  </Grid>

                  <Grid item xs={12}>
                    <BigTooltip title="If part of a larger organization, the parent name">
                      <TextField
                        type="text"
                        size="small"
                        label="Parent Organization"
                        name="parentOrganization"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={values.parentOrganization}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.parentOrganization
                            ? errors.parentOrganization
                            : ''
                        }
                        error={
                          touched.parentOrganization &&
                          Boolean(errors.parentOrganization)
                        }
                      />
                    </BigTooltip>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="address1"
                        label="Address Line 1"
                        type="text"
                        size="small"
                        value={values.address1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.address1 ? errors.address1 : ''}
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
                        size="small"
                        value={values.address2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.address2 ? errors.address2 : ''}
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
                        size="small"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.city ? errors.city : ''}
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
                        size="small"
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.state ? errors.state : ''}
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
                        size="small"
                        value={values.zip}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.zip ? errors.zip : ''}
                        error={touched.zip && Boolean(errors.zip)}
                      />
                    </Grid>

                    <Grid item xs={6} md={3}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="latitude"
                        label="Latitude"
                        type="text"
                        size="small"
                        value={values.latitude}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.latitude ? errors.latitude : ''}
                        error={touched.latitude && Boolean(errors.latitude)}
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="longitude"
                        label="Longitude"
                        type="text"
                        size="small"
                        value={values.longitude}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.longitude ? errors.longitude : ''}
                        error={touched.longitude && Boolean(errors.longitude)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Grid container justifycontent="space-between">
                        <BigTooltip title="Click to get latitude / longitude for address">
                          <Grid item>
                            <SearchButton
                              onClick={() => {
                                ;(geocodeResults && geocodeResults.length) < 1
                                  ? geocode(values)
                                  : setGeocodeResults([])
                              }}
                              label={
                                (geocodeResults && geocodeResults.length) < 1
                                  ? 'Get Coordinates'
                                  : 'Close'
                              }
                              style={{ marginTop: '1.2em' }}
                            />
                          </Grid>
                        </BigTooltip>
                      </Grid>
                      <div style={{ padding: '0.5em 0' }}>
                        {geocodeResults ? (
                          geocodeResults.map((result, index) => (
                            <div
                              style={{
                                border: '1px solid black',
                                backgroundColor: '#EEE',
                                margin: '0.1em',
                                padding: '0.5em',
                              }}
                              key={index}
                            >
                              <Grid container>
                                <Grid item xs={10}>
                                  <Typography>{`(${result.location.y}, ${result.location.x})`}</Typography>
                                  <Typography>{`${result.attributes.Match_addr}`}</Typography>
                                  <Typography>{`${result.attributes.Addr_type}`}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <VerifyButton
                                    label=""
                                    onClick={() => {
                                      setFieldValue(
                                        'latitude',
                                        result.location.y,
                                      )
                                      setFieldValue(
                                        'longitude',
                                        result.location.x,
                                      )
                                      setGeocodeResults([])
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            </div>
                          ))
                        ) : (
                          <div>No Results</div>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={tabPage} index={1}>
                <Grid container spacing={1}>
                  <Grid item sm={6} xs={12}>
                    <BigTooltip title="Phone number for clients to use">
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="phone"
                        label="Phone"
                        type="text"
                        size="small"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.phone ? errors.phone : ''}
                        error={touched.phone && Boolean(errors.phone)}
                      />
                    </BigTooltip>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <BigTooltip title="Email for clients to use">
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="email"
                        label="Email"
                        type="text"
                        size="small"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.email ? errors.email : ''}
                        error={touched.email && Boolean(errors.email)}
                      />
                    </BigTooltip>
                  </Grid>

                  <Grid item xs={12}>
                    <BigTooltip title="The organization's web address">
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="website"
                        label="Web Site"
                        type="text"
                        size="small"
                        value={values.website}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.website ? errors.website : ''}
                        error={touched.website && Boolean(errors.website)}
                      />
                    </BigTooltip>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="instagram"
                      label="Instagram"
                      type="text"
                      size="small"
                      value={values.instagram}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.instagram ? errors.instagram : ''}
                      error={touched.instagram && Boolean(errors.instagram)}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="facebook"
                      label="Facebook"
                      type="text"
                      size="small"
                      value={values.facebook}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.facebook ? errors.facebook : ''}
                      error={touched.facebook && Boolean(errors.facebook)}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="twitter"
                      label="Twitter"
                      type="text"
                      size="small"
                      value={values.twitter}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.twitter ? errors.twitter : ''}
                      error={touched.twitter && Boolean(errors.twitter)}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="pinterest"
                      label="Pinterest"
                      type="text"
                      size="small"
                      value={values.pinterest}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.pinterest ? errors.pinterest : ''}
                      error={touched.pinterest && Boolean(errors.pinterest)}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="linkedin"
                      label="LinkedIn"
                      type="text"
                      size="small"
                      value={values.linkedin}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.linkedin ? errors.linkedin : ''}
                      error={touched.linkedin && Boolean(errors.linkedin)}
                    />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={tabPage} index={2}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <OpenTimeForm
                      name="hours"
                      onChange={handleChange}
                      value={values.hours}
                    />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={tabPage} index={3}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="foodTypes"
                      label="Food Types"
                      type="text"
                      size="small"
                      multiline
                      rows={2}
                      rowsMax={12}
                      value={values.foodTypes}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.foodTypes ? errors.foodTypes : ''}
                      error={touched.foodTypes && Boolean(errors.foodTypes)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <BigTooltip title="(Items besides food, i.e. dog food, cat food, hygiene products, diapers, female hygiene products)">
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="items"
                        label="Non-Food Items"
                        type="text"
                        size="small"
                        value={values.items}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.items ? errors.items : ''}
                        error={touched.items && Boolean(errors.items)}
                      />
                    </BigTooltip>
                  </Grid>
                  <Grid item xs={12}>
                    <BigTooltip title="(Besides feeding ppl, i.e., family counseling, career counseling, drop in for women or homeless, etc.)">
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="services"
                        label="Services (separated by commas)"
                        type="text"
                        size="small"
                        value={values.services}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.services ? errors.services : ''}
                        error={touched.services && Boolean(errors.services)}
                      />
                    </BigTooltip>
                  </Grid>
                  <Grid item xs={12}>
                    <BigTooltip title="(Must go to chapel service, must be < 18, must show citizenship, etc.)">
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="requirements"
                        label="Eligibility / Requirements"
                        type="text"
                        size="small"
                        multiline
                        rows={2}
                        rowsMax={12}
                        value={values.requirements}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.requirements ? errors.requirements : ''
                        }
                        error={
                          touched.requirements && Boolean(errors.requirements)
                        }
                      />
                    </BigTooltip>
                  </Grid>
                  <Grid item xs={12}>
                    <BigTooltip title="Other notes about eligibility requirements">
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="eligibilityNotes"
                        label="Eligibility Notes"
                        type="text"
                        size="small"
                        multiline
                        rows={2}
                        rowsMax={12}
                        value={values.eligibilityNotes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.eligibilityNotes
                            ? errors.eligibilityNotes
                            : ''
                        }
                        error={
                          touched.eligibilityNotes &&
                          Boolean(errors.eligibilityNotes)
                        }
                      />
                    </BigTooltip>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="languages"
                      label="Languages"
                      type="text"
                      size="small"
                      multiline
                      rows={2}
                      rowsMax={12}
                      value={values.languages}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.languages ? errors.languages : ''}
                      error={touched.languages && Boolean(errors.languages)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <BigTooltip title={noteTooltip}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="notes"
                        label="Notes"
                        type="text"
                        size="small"
                        multiline
                        rows={2}
                        rowsMax={12}
                        value={values.notes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.notes ? errors.notes : ''}
                        error={touched.notes && Boolean(errors.notes)}
                      />
                    </BigTooltip>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={tabPage} index={4}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <BigTooltip title="Name of person(s) to contact for donations">
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="donationContactName"
                        label="Donation Contact Name"
                        type="text"
                        size="small"
                        value={values.donationContactName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.donationContactName
                            ? errors.donationContactName
                            : ''
                        }
                        error={
                          touched.donationContactName &&
                          Boolean(errors.donationContactName)
                        }
                      />
                    </BigTooltip>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <BigTooltip title="Phone for donations">
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="donationContactPhone"
                        label="Donation Phone"
                        type="phone"
                        size="small"
                        value={values.donationContactPhone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.donationContactPhone
                            ? errors.donationContactPhone
                            : ''
                        }
                        error={
                          touched.donationContactPhone &&
                          Boolean(errors.donationContactPhone)
                        }
                      />
                    </BigTooltip>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <BigTooltip title="Email for donations">
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="donationContactEmail"
                        label="Donation Email"
                        type="email"
                        size="small"
                        value={values.donationContactEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.donationContactEmail
                            ? errors.donationContactEmail
                            : ''
                        }
                        error={
                          touched.donationContactEmail &&
                          Boolean(errors.donationContactEmail)
                        }
                      />
                    </BigTooltip>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <BigTooltip title="When can organization receive or pickup donations">
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="donationSchedule"
                        label="Donation Schedule"
                        type="text"
                        size="small"
                        value={values.donationSchedule}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.donationSchedule
                            ? errors.donationSchedule
                            : ''
                        }
                        error={
                          touched.donationSchedule &&
                          Boolean(errors.donationSchedule)
                        }
                      />
                    </BigTooltip>
                  </Grid>
                  <Grid item xs={12}>
                    <BigTooltip title="Check if organization can pick up food from source">
                      <FormControlLabel
                        control={
                          <Checkbox
                            margin="normal"
                            name="donationPickup"
                            label="Pick Up"
                            value={values.donationPickup}
                            checked={values.donationPickup}
                            onChange={() =>
                              setFieldValue(
                                'donationPickup',
                                !values.donationPickup,
                              )
                            }
                            onBlur={handleBlur}
                          />
                        }
                        label="Pick Up"
                      />
                    </BigTooltip>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <BigTooltip title="Check if organization can accept frozen food">
                      <FormControlLabel
                        control={
                          <Checkbox
                            margin="normal"
                            name="donationAcceptFrozen"
                            label="Frozen"
                            value={values.donationAcceptFrozen}
                            checked={values.donationAcceptFrozen}
                            onChange={() =>
                              setFieldValue(
                                'donationAcceptFrozen',
                                !values.donationAcceptFrozen,
                              )
                            }
                            onBlur={handleBlur}
                          />
                        }
                        label="Frozen"
                      />
                    </BigTooltip>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <BigTooltip title="Check if organization can accept refrigerated food">
                      <FormControlLabel
                        control={
                          <Checkbox
                            margin="normal"
                            name="donationAcceptRefrigerated"
                            label="Refrigerated"
                            value={values.donationAcceptRefrigerated}
                            checked={values.donationAcceptRefrigerated}
                            onChange={() =>
                              setFieldValue(
                                'donationAcceptRefrigerated',
                                !values.donationAcceptRefrigerated,
                              )
                            }
                            onBlur={handleBlur}
                          />
                        }
                        label="Refrigerated"
                      />
                    </BigTooltip>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <BigTooltip title="Check if organization can accept perishables">
                      <FormControlLabel
                        control={
                          <Checkbox
                            margin="normal"
                            name="donationAcceptPerishable"
                            label="Perishable"
                            value={values.donationAcceptPerishable}
                            checked={values.donationAcceptPerishable}
                            onChange={() =>
                              setFieldValue(
                                'donationAcceptPerishable',
                                !values.donationAcceptPerishable,
                              )
                            }
                            onBlur={handleBlur}
                          />
                        }
                        label="Perishable"
                      />
                    </BigTooltip>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <BigTooltip title="Delivery Instructions">
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="donationDeliveryInstructions"
                        label="Donation Delivery or Pickup Instructions"
                        type="text"
                        size="small"
                        value={values.donationDeliveryInstructions}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.donationDeliveryInstructions
                            ? errors.donationDeliveryInstructions
                            : ''
                        }
                        error={
                          touched.donationDeliveryInstructions &&
                          Boolean(errors.donationDeliveryInstructions)
                        }
                      />
                    </BigTooltip>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <BigTooltip title="Other donation notes">
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="donationNotes"
                        label="Donation Notes"
                        type="text"
                        size="small"
                        value={values.donationNotes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.donationNotes ? errors.donationNotes : ''
                        }
                        error={
                          touched.donationNotes && Boolean(errors.donationNotes)
                        }
                      />
                    </BigTooltip>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={tabPage} index={5}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <BigTooltip title={adminNoteTooltip}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="adminNotes"
                        label="Verification Notes"
                        type="text"
                        size="small"
                        multiline
                        rows={2}
                        rowsMax={12}
                        value={values.adminNotes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.adminNotes ? errors.adminNotes : ''}
                        error={touched.adminNotes && Boolean(errors.adminNotes)}
                      />
                    </BigTooltip>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <BigTooltip title="Name of person(s) to contact for organization information">
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="adminContactName"
                        label="Verification Contact Name"
                        type="text"
                        size="small"
                        value={values.adminContactName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.adminContactName
                            ? errors.adminContactName
                            : ''
                        }
                        error={
                          touched.adminContactName &&
                          Boolean(errors.adminContactName)
                        }
                      />
                    </BigTooltip>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <BigTooltip title="Phone number for administrative information">
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="adminContactPhone"
                        label="Verification Phone"
                        type="phone"
                        size="small"
                        value={values.adminContactPhone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.adminContactPhone
                            ? errors.adminContactPhone
                            : ''
                        }
                        error={
                          touched.adminContactPhone &&
                          Boolean(errors.adminContactPhone)
                        }
                      />
                    </BigTooltip>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <BigTooltip title="Email for administrative information">
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="adminContactEmail"
                        label="Verification Email"
                        type="email"
                        size="small"
                        value={values.adminContactEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.adminContactEmail
                            ? errors.adminContactEmail
                            : ''
                        }
                        error={
                          touched.adminContactEmail &&
                          Boolean(errors.adminContactEmail)
                        }
                      />
                    </BigTooltip>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      border: '1px solid gray',
                      borderRadius: '4px',
                      padding: '0.5em',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div className={classes.workflowRow}>
                      <div className={classes.workflowColumn2}>
                        <Typography className={classes.workflowText}>
                          Id:
                        </Typography>
                      </div>
                      <div className={classes.workflowColumn2}>
                        <Typography className={classes.workflowText}>
                          {values.id}
                        </Typography>
                      </div>{' '}
                    </div>
                    <div className={classes.workflowRow}>
                      <div className={classes.workflowColumn1}>
                        <Typography className={classes.workflowText}>
                          Entered:
                        </Typography>
                      </div>
                      <div className={classes.workflowColumn2}>
                        <Typography className={classes.workflowText}>
                          {values.createdUser}
                        </Typography>
                      </div>
                      <div className={classes.workflowColumn3}>
                        <Typography className={classes.workflowText}>
                          {!values.createdDate
                            ? null
                            : moment(values.createdDate).format(DATE_FORMAT)}
                        </Typography>
                      </div>
                    </div>
                    <div className={classes.workflowRow}>
                      <div className={classes.workflowColumn1}>
                        <Typography className={classes.workflowText}>
                          Last Modified:
                        </Typography>
                      </div>
                      <div className={classes.workflowColumn2}>
                        <Typography className={classes.workflowText}>
                          {values.modifiedUser}
                        </Typography>
                      </div>
                      <div className={classes.workflowColumn3}>
                        <Typography className={classes.workflowText}>
                          {!values.modifiedDate
                            ? null
                            : moment(values.modifiedDate).format(DATE_FORMAT)}
                        </Typography>
                      </div>
                    </div>
                    <div className={classes.workflowRow}>
                      <div className={classes.workflowColumn1}>
                        <Typography className={classes.workflowText}>
                          Assigned:
                        </Typography>
                      </div>
                      <div className={classes.workflowColumn2}>
                        <Typography className={classes.workflowText}>
                          {values.assignedUser}
                        </Typography>
                      </div>
                      <div className={classes.workflowColumn3}>
                        <Typography className={classes.workflowText}>
                          {!values.assignedDate
                            ? null
                            : moment(values.assignedDate).format(DATE_FORMAT)}
                        </Typography>
                      </div>
                      <div className={classes.workflowColumn4}>
                        <UserContext.Consumer>
                          {(user) =>
                            user && user.isAdmin ? (
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'flex-end',
                                }}
                              >
                                <AccountAutocomplete
                                  accountId={values.assignedLoginId || ''}
                                  setAccount={(login) => {
                                    if (login) {
                                      setFieldValue('assignedLoginId', login.id)
                                      setFieldValue(
                                        'assignedUser',
                                        `${login.firstName} ${login.lastName}`,
                                      )
                                      setFieldValue('assignedDate', moment())
                                    } else {
                                      setFieldValue('assignedLoginId', '')
                                      setFieldValue('assignedUser', '')
                                      setFieldValue('assignedDate', '')
                                    }
                                  }}
                                />
                              </div>
                            ) : null
                          }
                        </UserContext.Consumer>
                      </div>
                    </div>
                    <div className={classes.workflowRow}>
                      <div className={classes.workflowColumn1}>
                        <Typography className={classes.workflowText}>
                          Submitted:
                        </Typography>
                      </div>
                      <div className={classes.workflowColumn2}>
                        <Typography className={classes.workflowText}>
                          {values.submittedUser}
                        </Typography>
                      </div>
                      <div className={classes.workflowColumn3}>
                        <Typography className={classes.workflowText}>
                          {!values.submittedDate
                            ? null
                            : moment(values.submittedDate).format(DATE_FORMAT)}
                        </Typography>
                      </div>
                      <div
                        className={classes.workflowColumn4}
                        style={{ textAlign: 'right' }}
                      >
                        <UserContext.Consumer>
                          {(user) =>
                            user && (user.isDataEntry || user.isAdmin) ? (
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'flex-end',
                                }}
                              >
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      margin="normal"
                                      name="inactive"
                                      label="Verify"
                                      value={!!values.submittedDate}
                                      checked={!!values.submittedDate}
                                      onChange={() => {
                                        const setSubmitted = !!!values.submittedDate
                                        setFieldValue(
                                          'submittedDate',
                                          setSubmitted ? moment() : '',
                                        )
                                        setFieldValue(
                                          'submittedUser',
                                          setSubmitted
                                            ? user.firstName +
                                                ' ' +
                                                user.lastName
                                            : '',
                                        )
                                        setFieldValue(
                                          'submittedLoginId',
                                          setSubmitted ? user.id : '',
                                        )
                                      }}
                                      onBlur={handleBlur}
                                    />
                                  }
                                  label="Verify"
                                />
                              </div>
                            ) : null
                          }
                        </UserContext.Consumer>
                      </div>
                    </div>
                    <div className={classes.workflowRow}>
                      <div className={classes.workflowColumn1}>
                        <Typography className={classes.workflowText}>
                          {values.rejectedDate ? 'Rejected:' : 'Approved:'}
                        </Typography>
                      </div>
                      <div className={classes.workflowColumn2}>
                        <Typography className={classes.workflowText}>
                          {values.reviewedUser}
                        </Typography>
                      </div>
                      <div className={classes.workflowColumn3}>
                        <Typography className={classes.workflowText}>
                          {!!values.rejectedDate
                            ? moment(values.rejectedDate).format(DATE_FORMAT)
                            : !!values.approvedDate
                            ? moment(values.approvedDate).format(DATE_FORMAT)
                            : ''}
                        </Typography>
                      </div>
                      <div className={classes.workflowColumn4}>
                        <UserContext.Consumer>
                          {(user) =>
                            user && user.isAdmin ? (
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'flex-end',
                                }}
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                  }}
                                >
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        margin="normal"
                                        name="inactive"
                                        label="Approve"
                                        value={!!values.approvedDate}
                                        checked={!!values.approvedDate}
                                        onChange={() => {
                                          const set = !!!values.approvedDate
                                          setFieldValue(
                                            'approvedDate',
                                            set ? moment() : '',
                                          )
                                          setFieldValue(
                                            'reviewedUser',
                                            set
                                              ? user.firstName +
                                                  ' ' +
                                                  user.lastName
                                              : '',
                                          )
                                          setFieldValue(
                                            'reviewedLoginId',
                                            set ? user.id : '',
                                          )
                                          if (set) {
                                            setFieldValue('rejectedDate', '')
                                          }
                                        }}
                                        onBlur={handleBlur}
                                      />
                                    }
                                    label="Approve"
                                  />

                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        margin="normal"
                                        name="inactive"
                                        label="Reject"
                                        value={!!values.rejectedDate}
                                        checked={!!values.rejectedDate}
                                        onChange={() => {
                                          const set = !!!values.rejectedDate
                                          setFieldValue(
                                            'rejectedDate',
                                            set ? moment() : '',
                                          )
                                          setFieldValue(
                                            'reviewedUser',
                                            set
                                              ? user.firstName +
                                                  ' ' +
                                                  user.lastName
                                              : '',
                                          )
                                          setFieldValue(
                                            'reviewedLoginId',
                                            set ? user.id : '',
                                          )
                                          if (set) {
                                            setFieldValue('approvedDate', '')
                                            setFieldValue('submittedDate', '')
                                            setFieldValue(
                                              'submittedLoginid',
                                              '',
                                            )
                                          }
                                        }}
                                        onBlur={handleBlur}
                                      />
                                    }
                                    label="Reject"
                                  />
                                </div>
                              </div>
                            ) : null
                          }
                        </UserContext.Consumer>
                      </div>
                    </div>

                    <div className={classes.workflowRow}>
                      <div className={classes.workflowColumn1}>
                        <Typography className={classes.workflowText}>
                          Claimed:
                        </Typography>
                      </div>
                      <div className={classes.workflowColumn2}>
                        <Typography className={classes.workflowText}>
                          {values.claimedUser}
                        </Typography>
                      </div>
                      <div className={classes.workflowColumn3}>
                        <Typography className={classes.workflowText}>
                          {!values.claimedDate
                            ? null
                            : moment(values.claimedDate).format(DATE_FORMAT)}
                        </Typography>
                      </div>
                      <div className={classes.workflowColumn4}>
                        <UserContext.Consumer>
                          {(user) =>
                            user && user.isAdmin ? (
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'flex-end',
                                }}
                              >
                                <AccountAutocomplete
                                  style={{ width: '100%' }}
                                  accountId={values.claimedLoginId || ''}
                                  setAccount={(login) => {
                                    if (login) {
                                      setFieldValue('claimedLoginId', login.id)
                                      setFieldValue(
                                        'claimedUser',
                                        `${login.firstName} ${login.lastName}`,
                                      )
                                      setFieldValue('claimedDate', moment())
                                    } else {
                                      setFieldValue('claimedLoginId', '')
                                      setFieldValue('claimedUser', '')
                                      setFieldValue('claimedDate', '')
                                    }
                                  }}
                                />
                              </div>
                            ) : null
                          }
                        </UserContext.Consumer>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <BigTooltip title="Verification review comments and instructions">
                      <TextField
                        type="text"
                        size="small"
                        label="Verification Review Notes"
                        name="reviewNotes"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        multiline
                        rows={2}
                        rowsMax={12}
                        value={values.reviewNotes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.reviewNotes ? errors.reviewNotes : ''
                        }
                        error={
                          touched.reviewNotes && Boolean(errors.reviewNotes)
                        }
                      />
                    </BigTooltip>
                  </Grid>
                </Grid>
              </TabPanel>
              <Grid container spacing={1}>
                <Grid
                  item
                  xs={12}
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <div>
                    <CloseButton
                      type="button"
                      onClick={cancel}
                      label="CANCEL CHANGES"
                    />

                    <SaveButton
                      type="submit"
                      className={classes.submit}
                      disabled={isSubmitting}
                      style={{ marginLeft: '0.5em' }}
                    />
                  </div>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  )
}

StakeholderEdit.propTypes = {
  classes: PropTypes.object,
  setToast: PropTypes.object,
  match: PropTypes.object,
  user: PropTypes.object,
  history: PropTypes.object,
}

export default withStyles(styles)(withRouter(StakeholderEdit))
