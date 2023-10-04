import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, CssBaseline, Dialog, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import MuiDialogTitle from '@mui/material/DialogTitle';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useOrganizations } from 'hooks/useOrganizations';
import { useCategories } from 'hooks/useCategories';
import { useNeighborhoods } from 'hooks/useNeighborhoods';
import { useTags } from 'hooks/useTags';
import {
  needsVerification,
  assign,
  exportCsv,
} from 'services/stakeholder-service';
import AssignDialog from './AssignDialog';
import NeedsVerificationDialog from './ui/NeedsVerificationDialog';
import SearchCriteria from './SearchCriteria';
import SearchCriteriaDisplay from './SearchCriteriaDisplay';

import { useUserContext } from '../../contexts/userContext';
import { useSearchCoordinates, useUserCoordinates } from '../../appReducer';
import CircularProgress from '@mui/material/CircularProgress';
import VerificationAdminGridMui from './VerificationAdminGridMui';
import { AddBoxOutlined, GifBox, GifBoxTwoTone } from '@mui/icons-material';

const CRITERIA_TOKEN = 'verificationAdminCriteria';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  //   flexBasis: '100%',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   padding: '2rem',
  //   paddingBottom: '0',
  // },
  // mainContent: {
  //   flexGrow: 1,
  //   padding: theme.spacing(2),
  //   display: 'flex',
  //   flexDirection: 'column',
  // },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    // color: theme.palette.grey[500],
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  bigMessage: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    textAlign: 'center',
    padding: '4em',
  },
  errorText: {
    color: theme.palette.error.main,
    fontSize: '24pt',
  },
}));

const DialogTitle = (props) => {
  const classes = useStyles();
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle
      disableTypography
      sx={{
        flexGrow: '1',
        flexBasis: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        paddingBottom: '0',
      }}
      {...other}
    >
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <Button
          variant='contained'
          type='button'
          icon='search'
          kind='close'
          onClick={onClose}
          // className={classes.closeButton}
          sx={{
            position: 'absolute',
            right: '8px',
            top: '8px',
          }}
        >
          Search
        </Button>
      ) : null}
    </MuiDialogTitle>
  );
};

DialogTitle.propTypes = {
  children: PropTypes.string,
  onClose: PropTypes.func,
};

const defaultCriteria = {
  name: '',
  latitude: 34,
  longitude: -118,
  placeName: '',
  radius: 0,
  categoryIds: [],
  tags: [],
  isInactive: 'either',
  isAssigned: 'either',
  isSubmitted: 'either',
  isApproved: 'either',
  isClaimed: 'either',
  assignedLoginId: null,
  claimedLoginId: null,
  verificationStatusId: 0,
  neighborhoodId: 0,
  minCompleteCriticalPercent: 0,
  maxCompleteCriticalPercent: 100,
  stakeholderId: '',
  isInactiveTemporary: 'either',
  tag: '',
};

function VerificationAdmin() {
  const { user } = useUserContext();
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [needsVerificationDialogOpen, setNeedsVerificationDialogOpen] =
    useState(false);
  const [criteria, setCriteria] = useState(defaultCriteria);
  const [selectedStakeholderIds, setSelectedStakeholderIds] = useState([]);
  const userCoordinates = useUserCoordinates();
  const location = useLocation();
  const searchCoordinates = useSearchCoordinates();
  const navigate = useNavigate();

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const { data: tags, loading: tagsLoading, error: tagsError } = useTags();

  const {
    data: neighborhoods,
    loading: neighborhoodsLoading,
    error: neighborhoodsError,
  } = useNeighborhoods();

  const {
    data: stakeholders,
    loading: stakeholdersLoading,
    error: stakeholdersError,
    searchCallback,
  } = useOrganizations();

  useEffect(() => {
    const execute = async () => {
      const criteriaString = sessionStorage.getItem(CRITERIA_TOKEN);
      let initialCriteria = JSON.parse(criteriaString);
      if (!initialCriteria) {
        initialCriteria = {
          ...defaultCriteria,
          latitude:
            userCoordinates?.latitude || searchCoordinates?.latitude || 0,
          longitude:
            userCoordinates?.longitude || searchCoordinates?.longitude || 0,
          verificationStatusId: 0,
        };
      } else {
        initialCriteria = { ...defaultCriteria, ...initialCriteria };
      }
      setCriteria(initialCriteria);
      try {
        await searchCallback(initialCriteria);
        console.log('executed');
      } catch (err) {
        // If we receive a 401 status code, the user needs
        // to be logged in, will redirect to login page.
        // Otherwise it's a real exception.
        if (err.status !== 401) {
          console.error(err);
          return Promise.reject(err.message);
        }
      }
    };
    execute();
  }, [userCoordinates, searchCallback, searchCoordinates]);

  const search = async (searchCriteria = criteria) => {
    try {
      await searchCallback(searchCriteria);
      console.log('Searching...');
      console.log(searchCriteria);
      sessionStorage.setItem(CRITERIA_TOKEN, JSON.stringify(searchCriteria));
    } catch (err) {
      // If we receive a 401 status code, the user needs
      // to be logged in, will redirect to login page.
      // Otherwise it's a real exception.
      if (err.status !== 401) {
        console.error(err);
        return Promise.reject(err.message);
      }
    }
  };

  const handleExport = async () => {
    try {
      await exportCsv(selectedStakeholderIds);
    } catch (err) {
      // If we receive a 401 status code, the user needs
      // to be logged in, will redirect to login page.
      // Otherwise it's a real exception.
      if (err.response && err.response.status === 401) {
        navigate('/login', { state: { from: location } });
      } else {
        console.error(err);
        return Promise.reject(err.message);
      }
    }
  };

  const handleAssignDialogOpen = async () => {
    setAssignDialogOpen(true);
  };

  const handleAssignDialogClose = async (loginId) => {
    setAssignDialogOpen(false);
    // Dialog returns false if cancelled, null if
    // want to unassign, otherwisd a loginId > 0
    if (loginId === false) return;
    try {
      for (let i = 0; i < selectedStakeholderIds.length; i++) {
        await assign(selectedStakeholderIds[i], user.id, loginId);
      }
    } catch (err) {
      // If we receive a 401 status code, the user needs
      // to be logged in, will redirect to login page.
      // Otherwise it's a real exception.
      if (err.response && err.response.status === 401) {
        navigate('/login', { state: { from: location } });
      } else {
        console.error(err);
        return Promise.reject(err.message);
      }
    }
    search();
  };

  const handleNeedsVerificationDialogOpen = async () => {
    setNeedsVerificationDialogOpen(true);
  };

  const handleNeedsVerificationDialogClose = async (result) => {
    setNeedsVerificationDialogOpen(false);
    // Dialog returns false if cancelled, otherwise an optional
    // message to attach to stakeholder(s)
    if (result === false) return;
    try {
      for (let i = 0; i < selectedStakeholderIds.length; i++) {
        await needsVerification(
          selectedStakeholderIds[i],
          user.id,
          result.message,
          !!result.preserveConfirmations
        );
      }
    } catch (err) {
      // If we receive a 401 status code, the user needs
      // to be logged in, will redirect to login page.
      // Otherwise it's a real exception.
      if (err.response && err.response.status === 401) {
        navigate('/login', { state: { from: location } });
      } else {
        console.error(err);
        return Promise.reject(err.message);
      }
    }
    search();
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    search();
    setDialogOpen(false);
  };

  const handleCriteriaChange = (newCriteria) => {
    setCriteria(newCriteria);
    search(newCriteria);
  };

  if (!user) {
    return null;
  }
  return (
    <Container
      sx={{
        flexGrow: '1',
        flexBasis: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        paddingBottom: '0',
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          margin: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant='h2'
            component='h2'
            align='center'
            style={{ marginBottom: '0.5em' }}
          >
            Verification Administration
          </Typography>
          <Button
            variant='contained'
            type='button'
            icon='search'
            onClick={handleDialogOpen}
          >
            Criteria...
          </Button>
        </Box>
      </Box>
      <SearchCriteriaDisplay
        defaultCriteria={defaultCriteria}
        criteria={criteria}
        setCriteria={setCriteria}
        neighborhoods={neighborhoods}
        handleDelete={handleCriteriaChange}
        categories={categories}
        tags={tags}
        isLoading={neighborhoodsLoading || categoriesLoading}
      />
      <Box
        sx={{
          flexGrow: '1',
          padding: '2',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          fullWidth
          maxWidth='lg'
        >
          <DialogTitle onClose={handleDialogClose}>Search Criteria</DialogTitle>
          {criteria ? (
            <Box sx={{ overflowY: 'scroll' }}>
              <SearchCriteria
                key={JSON.stringify({
                  userLatitude:
                    userCoordinates?.latitude || origin?.latitude || 0,
                  categories,
                })}
                userLatitude={
                  userCoordinates?.latitude || origin?.latitude || 0
                }
                userLongitude={
                  userCoordinates?.longitude || origin?.longitude || 0
                }
                categories={categories && categories.filter((c) => !c.inactive)}
                tags={tags}
                neighborhoods={neighborhoods}
                criteria={criteria}
                setCriteria={setCriteria}
              />
            </Box>
          ) : null}
          {categoriesError ||
          neighborhoodsError ||
          stakeholdersError ||
          tagsError ? (
            <Typography> Uh Oh! Something went wrong!</Typography>
          ) : categoriesLoading ||
            neighborhoodsLoading ||
            stakeholdersLoading ||
            tagsLoading ? (
            <Box
              style={{
                height: '200',
                width: '100%',
                margin: '100px auto',
                display: 'flex',
                justifyContent: 'space-around',
              }}
              aria-label='Loading spinner'
            >
              <CircularProgress />
            </Box>
          ) : null}
        </Dialog>
        <AssignDialog
          id='assign-dialog'
          keepMounted
          open={assignDialogOpen}
          onClose={handleAssignDialogClose}
        />
        <NeedsVerificationDialog
          id='needs-verification-dialog'
          title='Change Listing(s) Status to "Needs Verification"'
          message={''}
          // preserveConfirmations={false}
          open={needsVerificationDialogOpen}
          onClose={handleNeedsVerificationDialogClose}
        />
        <>
          {categoriesError || stakeholdersError || tagsError ? (
            <Box
              sx={{
                flexGrow: '1',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#E8E8E8',
                textAlign: 'center',
                padding: '4em',
              }}
            >
              <Typography
                variant='h3'
                component='h3'
                sx={{
                  color: 'error.main',
                  fontSize: '24pt',
                }}
              >
                Uh Oh! Something went wrong!
              </Typography>
            </Box>
          ) : categoriesLoading || stakeholdersLoading | tagsLoading ? (
            <Box
              style={{
                flexGrow: 1,
                width: '100%',
                margin: '100px auto',
                display: 'flex',
                justifyContent: 'space-around',
              }}
              aria-label='Loading spinner'
            >
              <CircularProgress />
            </Box>
          ) : stakeholders && stakeholders.length === 0 ? (
            <Box
              sx={{
                flexGrow: '1',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#E8E8E8',
                textAlign: 'center',
                padding: '4em',
              }}
            >
              <Typography variant='h5' component='h5'>
                No matches found, please try different criteria
              </Typography>
            </Box>
          ) : stakeholders ? (
            <>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Stack direction='row' spacing={2} marginBottom={1}>
                  <Button
                    variant='outlined'
                    type='button'
                    disabled={selectedStakeholderIds.length === 0}
                    onClick={handleNeedsVerificationDialogOpen}
                  >
                    Needs Verification
                  </Button>
                  <Button
                    variant='outlined'
                    type='button'
                    disabled={selectedStakeholderIds.length === 0}
                    onClick={handleAssignDialogOpen}
                  >
                    Assign
                  </Button>
                  <Button
                    variant='outlined'
                    type='button'
                    disabled={selectedStakeholderIds.length === 0}
                    onClick={handleExport}
                  >
                    Export
                  </Button>
                </Stack>
                <Box>{`${stakeholders.length} rows`} </Box>
              </Box>
              <VerificationAdminGridMui
                stakeholders={stakeholders}
                mode={'admin'}
                setSelectedStakeholderIds={setSelectedStakeholderIds}
              />
            </>
          ) : (
            <Box
              sx={{
                flexGrow: '1',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#E8E8E8',
                textAlign: 'center',
                padding: '4em',
              }}
            >
              <Typography variant='h5' component='h5'>
                Please enter search criteria and execute a search
              </Typography>
            </Box>
          )}
        </>
      </Box>
    </Container>
  );
}

export default VerificationAdmin;
