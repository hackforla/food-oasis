import { Box, Container, Typography } from "@mui/material";
import type { ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material/styles";

interface TitleIcon {
  alt: string;
  src: string;
  style?: SxProps<Theme>;
}

interface PageSectionCustomStyles {
  container?: SxProps<Theme>;
  title?: SxProps<Theme>;
  subtitle?: SxProps<Theme>;
  content?: SxProps<Theme>;
  contact?: SxProps<Theme>;
}

export interface PageSectionProps {
  title: string;
  titleIcon?: TitleIcon;
  content: ReactNode;
  contact?: ReactNode;
  subtitle?: ReactNode;
  customStyles?: PageSectionCustomStyles;
  variant?: string;
}

const PageSection = ({
  title,
  titleIcon,
  content,
  contact,
  subtitle,
  customStyles,
  variant,
}: PageSectionProps) => {
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
  } as const;

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
  } as const;

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
  } as const;

  const specialBackgroundTitles = [
    "CODE FOR HAWAIʻI AND ALOHA HARVEST",
    "Contact Aloha Harvest",
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
        <Box
          component="img"
          alt={titleIcon.alt}
          src={titleIcon.src}
          sx={{
            margin: "auto",
            height: 40,
            ...titleIcon.style,
          }}
        />
      )}
      <Typography
        variant="h2"
        sx={{
          ...sectionStyles.h2,
          ...(customStyles && customStyles.title),
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="h3"
          sx={{
            ...sectionStyles.h3,
            ...(customStyles && customStyles.subtitle),
          }}
        >
          {subtitle}
        </Typography>
      )}
      <Container
        maxWidth="sm"
        sx={{
          ...(customStyles && customStyles.content),
        }}
      >
        {content}
      </Container>
      <Box component="div" sx={customStyles && customStyles.contact}>
        {contact}
      </Box>
    </Box>
  );
};

export default PageSection;
