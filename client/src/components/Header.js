import React from 'react'
import PropTypes from "prop-types"
import useLocationHook from 'hooks/useLocationHook'
import Menu from './Menu'
import logo from 'images/fola.svg'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LogoutButton from './Logout'

Header.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.object,
  setToast: PropTypes.func,
}

const useStyles = makeStyles({
  header: {
    backgroundColor: (props) => props.headerColor,
    marginBottom: (props) => props.headerMargin,
    boxShadow: (props) => props.headerShadow,
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  homeLink: {
    flexGrow: 1,
  },
  logo: {
    width: '3.5rem',
    height: '2.5rem',
    margin: '.5rem .75rem',
  },
  userLoggedIn: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: '1',
    minHewight: '3rem',
  },
  username: {
    color: 'black',
  },
  tagline: {
    color: '#336699',
    fontStyle: 'italic',
  },
})

export default function Header(props) {
  const { user, setUser, setToast } = props
  const isHomePage = useLocationHook()

  const homePageStyles = {
    headerColor: 'transparent',
    headerMargin: '-65px',
    headerShadow: 'none',
  }

  const defaultStyles = {
    headerColor: '#F1F1F1',
    headerMargin: '0',
  }

  const styles = isHomePage ? homePageStyles : defaultStyles
  const classes = useStyles(styles)
  const taglineText = isHomePage ? '' : 'Hunger Free Los Angeles'

  return (
    <>
      <AppBar position="sticky" className={classes.header}>
        <Toolbar>
          <Menu user={user} setUser={setUser} setToast={setToast} />
          <div className={classes.content}>
            {!isHomePage && (
              <div className={classes.homeLink}>
                <a href="/">
                  <img src={logo} className={classes.logo} alt="logo" />{' '}
                </a>
              </div>
            )}
            {!isHomePage && user ? (
              <div className={classes.userLoggedIn}>
                <Typography
                  variant="h6"
                  component="h1"
                  className={classes.username}
                >
                  {user.firstName}
                </Typography>
                <LogoutButton setUser={setUser} setToast={setToast} />
              </div>
            ) : (
              <Typography variant="subtitle1" className={classes.tagline}>
                {taglineText}
              </Typography>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}
