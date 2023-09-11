import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

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
  
  const lightSectionStyles = {
    padding: "32px",
    margin: "32px 0 0 0",
    borderRadius: "24px",
    backgroundColor: "#f0f0f0",
    display: "flex",
    flexDirection: "column",
    h2: {
      flexBasis: "100%",
      textAlign: "center",
      fontWeight: "500",
      fontSize: "32px",
      marginTop: "10px",
      marginBottom: "20px",
    },
    h3: {
      textAlign: "center",
      fontWeight: "500",
      fontSize: "24px",
      marginBottom: "20px",
    },
    p: {
      marginBottom: "16px",
    },
  };
  
  const darkSectionStyles = {
    padding: "32px",
    margin: "32px 0 0 0",
    borderRadius: "24px",
    backgroundColor: "#B6D8FB",
    display: "flex",
    flexDirection: "column",
    h2: {
      flexBasis: "100%",
      textAlign: "center",
      fontWeight: "500",
      fontSize: "32px",
      marginTop: "10px",
      marginBottom: "20px",
    },
    h3: {
      textAlign: "center",
      fontWeight: "500",
      fontSize: "24px",
      marginBottom: "20px",
    },
    p: {
      marginBottom: "16px",
    },
  };
  
  const specialBackgroundStyles = {
    padding: "32px",
    margin: "32px 0 0 0",
    borderRadius: "24px",
    backgroundColor: "#B6D8FB",
    display: "flex",
    flexDirection: "column",
    h2: {
      flexBasis: "100%",
      textAlign: "center",
      fontWeight: "500",
      fontSize: "32px",
      marginTop: "10px",
      marginBottom: "20px",
    },
    h3: {
      textAlign: "center",
      fontWeight: "500",
      fontSize: "24px",
      marginBottom: "20px",
    },
    p: {
      marginBottom: "16px",
    },
  };

  const specialBackgroundTitles = [
    "CODE FOR HAWAIʻI AND ALOHA HARVEST",
    "Contact Aloha Harvest"
  ];

  const isSpecialBackground = specialBackgroundTitles.includes(title);
  const sectionStyles = isSpecialBackground
    ? specialBackgroundStyles
    : variant === "dark"
    ? darkSectionStyles
    : lightSectionStyles;
  

  return (
    <Box
      component="section"
      sx={{
        ...sectionStyles,
        ...(customStyles && customStyles.container),
      }}
    >
      {titleIcon && (
        <img
          alt={titleIcon.alt}
          src={titleIcon.src}
          sx={{
            margin: "auto",
            height: 40,
            ...(titleIcon.style),
          }}
        />
      )}
      <Typography variant="h2" sx={{
          ...sectionStyles.h2,
          ...(customStyles && customStyles.title),
        }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography 
          variant="h3"  
          sx={{
            ...sectionStyles.h3,
            ...(customStyles && customStyles.subtitle),
        }}>
          {subtitle}
        </Typography>
      )}
      <Container
        maxWidth="sm"
        sx={{
          ...sectionStyles.content,
          ...(customStyles && customStyles.content),
        }}
      >
        {content}
      </Container>
      <div sx={customStyles && customStyles.contact}>
        {contact}
      </div>
    </Box>
  );
};

export default PageSection;
