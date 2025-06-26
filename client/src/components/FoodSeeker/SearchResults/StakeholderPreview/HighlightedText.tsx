import { Typography } from "@mui/material";

interface Match {
  startIndex: number;
  endIndex: number;
}

const HighlightedText = ({ text, query }: { text: string; query: string }) => {
  if (!text || !query) return <span>{text}</span>;

  const matches: Match[] = [];

  query
    .split(" ")
    .filter(Boolean)
    .forEach((word) => {
      let start = 0;
      const lowerText = text.toLowerCase();
      const lowerWord = word.toLowerCase();

      while (start < text.length) {
        const index = lowerText.indexOf(lowerWord, start);
        if (index === -1) break;
        matches.push({ startIndex: index, endIndex: index + word.length });
        start = index + word.length;
      }
    });

  matches.sort((a, b) => a.startIndex - b.startIndex);
  const nonOverlappingMatches: Match[] = [];

  let lastEnd = 0;
  for (const match of matches) {
    if (match.startIndex >= lastEnd) {
      nonOverlappingMatches.push(match);
      lastEnd = match.endIndex;
    }
  }

  const parts: React.ReactNode[] = [];
  let current = 0;

  nonOverlappingMatches.forEach((match, i) => {
    if (current < match.startIndex) {
      parts.push(text.slice(current, match.startIndex));
    }
    parts.push(
      <Typography
        key={i}
        component="span"
        variant="inherit"
        color="inherit"
        sx={{ backgroundColor: "yellow" }}
      >
        {text.slice(match.startIndex, match.endIndex)}
      </Typography>
    );
    current = match.endIndex;
  });

  if (current < text.length) {
    parts.push(text.slice(current));
  }

  return (
    <Typography component="span" variant="inherit" color="inherit">
      {parts}
    </Typography>
  );
};

export default HighlightedText;
