import React, { useCallback, useEffect } from 'react'
import Search from '../components/Search'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  Button,
  Box,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import {
  MEAL_PROGRAM_CATEGORY_ID,
  FOOD_PANTRY_CATEGORY_ID,
  DEFAULT_CATEGORIES,
} from '../constants/map'

const useStyles = makeStyles((theme) => ({
  filterGroup: {
    margin: '0 .25rem',
    padding: 0,
  },
  filterGroupButton: {
    margin: 0,
    fontSize: 'max(.8vw,10px)',
    backgroundColor: '#fff',
    border: '.1em solid #000',
    color: '#000',
  },
  filterButton: {
    margin: '0 .25rem',
    fontSize: 'max(.8vw,10px)',
    backgroundColor: '#fff',
    border: '.1em solid #000',
    color: '#000',
  },
  distanceControl: {
    margin: '0 .25rem',
    backgroundColor: '#fff',
    padding: '.25em 0 .25em .7em',
    border: '.09em solid #000',
    outline: 'none',
  },
  menuItems: {
    fontSize: 'max(.8vw,10px)',
    color: '#000',
  },
  controlPanel: {
    width: '100%',
    backgroundColor: '#336699',
    height: '5em',
  },
  inputHolder: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    fontSize: '12px',
    width: '25em',
    height: '2em',
    outline: 'none',
    padding: '.25em',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    width: 22,
    height: 22,
  },
  submit: {
    height: '42px',
    minWidth: '25px',
    backgroundColor: '#BCE76D',
    borderRadius: '0 4px 4px 0',
    boxShadow: 'none',
    '& .MuiButton-startIcon': {
      marginRight: 0,
    },
    '&.Mui-disabled': {
      backgroundColor: '#BCE76D',
      opacity: 0.8,
    },
    '&:hover': {
      backgroundColor: '#C7F573',
      boxShadow: 'none',
    },
  },
  buttonHolder: {
    display: 'flex',
  },
}))

const distanceInfo = [1, 2, 3, 5, 10, 20, 50]

const ResultsFilters = ({
  origin,
  setOrigin,
  radius,
  setRadius,
  isVerifiedSelected,
  selectVerified,
  search,
  userCoordinates,
  categoryIds,
  toggleCategory,
}) => {
  const classes = useStyles()

  const isMealsSelected = categoryIds.indexOf(MEAL_PROGRAM_CATEGORY_ID) >= 0
  const isPantrySelected = categoryIds.indexOf(FOOD_PANTRY_CATEGORY_ID) >= 0

  const toggleMeal = useCallback(() => {
    toggleCategory(MEAL_PROGRAM_CATEGORY_ID)
    doHandleSearch()
  }, [toggleCategory])

  const togglePantry = useCallback(() => {
    toggleCategory(FOOD_PANTRY_CATEGORY_ID)
    doHandleSearch()
  }, [toggleCategory])

  const doHandleSearch = (e) => {
    if (e) { e.preventDefault() }

    search({
      name: '',
      latitude: origin.latitude,
      longitude: origin.longitude,
      radius,
      categoryIds: categoryIds.length
        ? categoryIds
        : DEFAULT_CATEGORIES,
      isInactive: 'no',
      isAssigned: 'either',
      isApproved: isVerifiedSelected ? 'true' : 'either',
      isSubmitted: 'either',
      isRejected: 'either',
      isClaimed: 'either',
      assignedLoginId: '',
      claimedLoginId: '',
    })
  }

  //loading search
  useEffect(() => {
    doHandleSearch()
  }, [])

  return (
    <Grid container wrap="wrap-reverse" className={classes.controlPanel}>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        justify="center"
        alignItems="center"
        className={classes.buttonHolder}
      >
        <Grid item>
          <Button as={FormControl} className={classes.distanceControl}>
            <Select
              name="select-distance"
              disableUnderline
              value={radius}
              onChange={(e) => {
                setRadius(e.target.value)
                doHandleSearch()
              }}
              inputProps={{
                name: 'select-distance',
                id: 'select-distance',
              }}
              className={classes.menuItems}
            >
              <MenuItem key={0} value={0} className={classes.menuItems}>
                DISTANCE
              </MenuItem>
              {distanceInfo.map((distance) => (
                <MenuItem
                  key={distance}
                  value={distance}
                  className={classes.menuItems}
                >
                  {`${distance} MILE${distance > 1 ? 'S' : ''}`}
                </MenuItem>
              ))}
            </Select>
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.filterButton}
            style={{
              backgroundColor: isPantrySelected ? '#0A3865' : '#fff',
              color: isPantrySelected ? '#fff' : '#000',
            }}
            onClick={togglePantry}
          >
            Food Pantries
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.filterButton}
            style={{
              backgroundColor: isMealsSelected ? '#0A3865' : '#fff',
              color: isMealsSelected ? '#fff' : '#000',
            }}
            onClick={toggleMeal}
          >
            Meals
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.filterGroupButton}
            style={{
              backgroundColor: isVerifiedSelected ? '#0A3865' : '#fff',
              color: isVerifiedSelected ? '#fff' : '#000',
            }}
            onClick={() => {
              selectVerified(!isVerifiedSelected)
              doHandleSearch()
            }}
          >
            Verified Data
          </Button>
        </Grid>
      </Grid>
      <Box className={classes.inputContainer}>
        <form noValidate onSubmit={(e) => doHandleSearch(e)} style={{ all: "inherit" }}>
          <Search userCoordinates={userCoordinates} setOrigin={setOrigin} />
          <Button
            type="submit"
            disabled={!origin}
            variant="contained"
            className={classes.submit}
            startIcon={
              <SearchIcon fontSize="large" className={classes.searchIcon} />
            }
            onClick={() => doHandleSearch()}
          />
        </form>
      </Box>
    </Grid >
  )
}

ResultsFilters.propTypes = {
  // distance: PropTypes.number,
  // placeName: PropTypes.string,
  // isPantryCategorySelected: PropTypes.bool,
  // isMealCategorySelected: PropTypes.bool,
  // isVerifiedFilterSelected: PropTypes.bool,
  search: PropTypes.func,
}

export default ResultsFilters
