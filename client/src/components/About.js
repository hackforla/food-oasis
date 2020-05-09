import React from 'react'
import { useTranslation } from 'react-i18next'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import foodSeekers from '../images/food-seekers.svg'
import advocates from '../images/advocates.svg'
import volunteers from '../images/volunteers.svg'
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  title: {
    margin: '1rem 0',
  },
  subtitle: {
    margin: '2rem 0 1rem 0',
  },
  support: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    maxWidth: '20rem',
    margin: 'auto',
    marginTop: '1rem',
  },
  usesItem: {
    maxWidth: '15rem',
  },
  section: {
    margin: '3rem 0',
  },
}))
const About = () => {
  const classes = useStyles()
  const { t } = useTranslation('about')
  return (
    <Container maxWidth="sm">
      <section className={classes.section}>
        <Typography className={classes.title} variant="h4">
          {t('title')}
        </Typography>
        <Typography component="p">{t('p1')}</Typography>
        <br />
        <Typography component="p">{t('p2')}</Typography>
      </section>
      <section className={classes.support}>
        <Typography className={classes.title} variant="h4">
          {t('support')}
        </Typography>

        <Typography component="p">{t('support-p')}</Typography>
        <Button className={classes.button} variant="outlined">
          {t('donate')}
        </Button>
      </section>
      <Typography className={classes.subtitle} variant="h5">
        {t('use')}
      </Typography>

      <Grid container justify="center" alignItems="flex-start" spacing={4}>
        <Grid className={classes.usesItem} item md={4} sm={11}>
          <img src={foodSeekers} alt="Hand holding an apple" />
          <Typography variant="h5">{t('stakeholder-1')}</Typography>
          <Typography component="p">
            <strong>{t('stakeholder-1ps')}</strong>
          </Typography>
          <br />
          <Typography component="p">{t('stakeholder-1p')}</Typography>
        </Grid>
        <Grid item md={4} sm={11} className={classes.usesItem}>
          <img src={advocates} alt="A community person" />
          <Typography variant="h5">{t('stakeholder-2')}</Typography>
          <Typography component="p">
            <strong>{t('stakeholder-2ps')}</strong>
          </Typography>
          <br />
          <Typography component="p">{t('stakeholder-2p')}</Typography>
        </Grid>
        <Grid item md={4} sm={11} className={classes.usesItem}>
          <img src={volunteers} alt="Raised hand" />
          <Typography variant="h5">{t('stakeholder-3')}</Typography>
          <Typography component="p">
            <strong>{t('stakeholder-3ps')}</strong>
          </Typography>
          <br />
          <Typography component="p">{t('stakeholder-3p')}</Typography>
        </Grid>
      </Grid>

      <section className={classes.section}>
        <Typography variant="h4">{t('mission')}</Typography>
        <Typography component="p">{t('mission-p')}</Typography>
      </section>
      <section className={classes.section}>
        <Typography variant="h4">{t('team')}</Typography>
        <Typography component="p">{t('team-p')}</Typography>
      </section>
      <section className={classes.section}>
        <Typography variant="h4">{t('about-hack')}</Typography>
        <Typography component="p">{t('about-hack-p')}</Typography>
      </section>
    </Container>
  )
}

export default About
