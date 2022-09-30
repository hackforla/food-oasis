import React from 'react';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  icon: {
    margin: 'auto',
    height: 40,
  },
  sectionLight: {
    padding: '32px',
    margin: '32px 0 0 0',
    borderRadius: '24px',
    color: '#4d4d4d',
    background: '#f0f0f0',
    display: 'flex',
    flexDirection: 'column',
    '& $h2': {
      flexBasis: '100%',
      textAlign: 'center',
      fontWeight: '500',
      fontSize: '32px',
      marginTop: '10px',
      marginBottom: '20px',
    },
    '& $btnOutline': {
      margin: '20px auto 0 auto',
    },
    '& $a': {
      color: '#4d4d4d',
    },
    '& $p': {
      marginBottom: '16px',
    },
  },
  sectionDark: {
    padding: '32px',
    margin: '32px 0 0 0',
    borderRadius: '24px',
    color: '#4d4d4d',
    background: '#B6D8FB',
    display: 'flex',
    flexDirection: 'column',
    '& $h2': {
      flexBasis: '100',
      textAlign: 'center',
      fontWeight: '500',
      fontSize: '32px',
      marginTop: '10px',
      marginBottom: '20px',
    },
    '& $a': {
      color: '#4d4d4d',
    },
    '& $p': {
      marginBottom: '16px',
    },
  },
  content: {
    '& $dl': {
      marginTop: '0',
      marginBottom: '0',
      '& $dt': {
        fontWeight: '600',
      },
      '& $dd': {
        marginLeft: '0',
        marginBottom: '32px',
      },
      '& $dd:last-child': {
        marginBottom: '0',
      },
    },
  },
}));

const PageSection = (props) => {
  const {
    title,
    titleIcon,
    content,
    contact,
    subtitle,
    customStyles,
    variant,
  } = props;
  const classes = useStyles();

  return (
    <section
      className={
        variant === 'dark' ? classes.sectionDark : classes.sectionLight
      }
      style={customStyles && customStyles.container}
    >
      {titleIcon && (
        <img
          alt={titleIcon.alt}
          src={titleIcon.src}
          className={titleIcon.className || classes.icon}
          style={titleIcon.style}
        />
      )}
      <Typography variant='h2'>
        {title && <h2 style={customStyles && customStyles.title}>{title}</h2>}
      </Typography>
      {subtitle && (
        <h3 style={customStyles && customStyles.subtitle}>{subtitle}</h3>
      )}
      <Container
        maxWidth='sm'
        className={classes.content}
        style={customStyles && customStyles.content}
      >
        {content}
      </Container>
      <div style={customStyles && customStyles.contact}>{contact}</div>
    </section>
  );
};

export default PageSection;
