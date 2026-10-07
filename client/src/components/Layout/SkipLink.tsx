import { Box } from "@mui/material";

// Visually hidden until focused; lets keyboard and screen reader users
// jump past the header straight to the <main> landmark.
export default function SkipLink({ targetId = "main-content" }) {
  return (
    <Box
      component="a"
      href={`#${targetId}`}
      sx={{
        position: "absolute",
        left: "-9999px",
        top: 8,
        zIndex: 2000,
        padding: 1,
        backgroundColor: "#fff",
        color: "#000",
        fontWeight: 600,
        border: "2px solid #000",
        borderRadius: 1,
        "&:focus": { left: 8 },
      }}
    >
      Skip to main content
    </Box>
  );
}
