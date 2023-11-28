import { Container } from "@mui/material";

export const PageWrapper = ({ children }) => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        height: "97.8%",
        flexDirection: "column",
      }}
    >
      {children}
    </Container>
  );
};
