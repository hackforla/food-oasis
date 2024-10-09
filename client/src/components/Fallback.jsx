import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const Fallback = () => {
  const { state } = useLocation();

  return (
    <Box
      sx={{
        padding: { xs: "1.5rem 0", md: "1.5rem 2rem" },
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          padding: "32px",
          margin: "32px 0",
          borderRadius: "24px",
          background: "#f0f0f0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            color: "#336699",
            flexBasis: "100",
            textTransform: "uppercase;",
            textAlign: "center",
            fontWeight: "500",
            fontSize: { xs: "32px" },
            lineHeight: { xs: "1.5" },
            marginTop: "10px",
            marginBottom: "20px",
          }}
          variant="h2"
          component="h1"
        >
          Unauthorized
        </Typography>
        <Typography>{state?.message || "Something went wrong."}</Typography>
      </Box>
    </Box>
  );
};

export default Fallback;
