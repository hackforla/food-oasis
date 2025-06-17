import { Typography } from "@mui/material";

const HighlightedText = ({ text, query }: { text: string; query: string }) => {
  if (!text || !query) {
    return <span>{text}</span>;
  }

  const index = text.toLowerCase().indexOf(query.toLowerCase());
  const endIndex = index + query.length;
  if (index === -1) return <span>{text}</span>;

  return (
    <Typography component="span" variant="inherit" color="inherit">
      {text.slice(0, index)}
      <Typography
        component="span"
        variant="inherit"
        color="inherit"
        sx={{ backgroundColor: "yellow" }}
      >
        {text.slice(index, endIndex)}
      </Typography>
      {text.slice(endIndex)}
    </Typography>
  );
};

export default HighlightedText;
