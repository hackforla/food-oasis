import { Container } from "@mui/material";
import { PropsWithChildren } from "react";

export const PageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Container
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
