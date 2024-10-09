import { Box, CardMedia, Container, Typography } from "@mui/material";

const Page = (props) => {
  const { pageTitle, pageImage, children } = props;

  return (
    <Box sx={{ background: "#fff" }}>
      <Container
        sx={{
          padding: "1.5rem 0;",
          maxWidth: "1200px",
          margin: "0 auto",
          "@media only screen and (min-width: 75em)": {
            padding: "1.5rem 2rem",
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            textTransform: "uppercase",
            fontWeight: 500,
            textAlign: "center",
            background: "#FFF",
            margin: 0,
            padding: "32px 0",
          }}
        >
          <span>{pageTitle}</span>
        </Typography>
        <br />
        {pageImage && (
          <CardMedia
            component="img"
            alt={pageImage.alt}
            src={pageImage.src}
            sx={{ width: "100%", borderRadius: "24px", margin: 0, padding: 0 }}
          />
        )}
        {children}
      </Container>
    </Box>
  );
};

export default Page;
