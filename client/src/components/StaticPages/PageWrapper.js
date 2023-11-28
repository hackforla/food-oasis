import { Container } from "@mui/material";

export const PageWrapper = ({ children }) => {
  return (
    <Container
      sx={{
        padding: { xs: "1.5rem 0", md: "1.5rem 2rem" },
        margin: "0 auto",
        maxWidth: "1200px",
      }}
    >
      {children}
    </Container>
  );
};
