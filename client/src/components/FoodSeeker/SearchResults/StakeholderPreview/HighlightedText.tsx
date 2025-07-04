import { Typography } from "@mui/material";

interface Match {
  startIndex: number;
  endIndex: number;
}

interface HighlightedTextProps {
  text: string;
  query: string;
  snippet?: boolean;
}

const getSnippetAroundMatch = (
  text: string,
  query: string,
  contextSize = 16
) => {
  const words = text.split(" ").filter(Boolean);
  const lowerQueryWords = query.toLowerCase().split(" ").filter(Boolean);

  const matchIndex = words.findIndex((word) =>
    lowerQueryWords.some((q) => word.toLowerCase().includes(q))
  );

  if (matchIndex === -1) return text;

  const start = Math.max(0, matchIndex - 8);
  const end = Math.min(words.length, start + contextSize);
  return words.slice(start, end).join(" ");
};

const HighlightedText = ({
  text,
  query,
  snippet = false,
}: HighlightedTextProps) => {
  if (!text || !query) return snippet ? null : <span>{text}</span>;

  const displayText = snippet ? getSnippetAroundMatch(text, query) : text;
  const matches: Match[] = [];

  query
    .split(" ")
    .filter(Boolean)
    .forEach((word) => {
      let start = 0;
      const lowerDisplay = displayText.toLowerCase();
      const lowerWord = word.toLowerCase();

      while (start < displayText.length) {
        const index = lowerDisplay.indexOf(lowerWord, start);
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
      parts.push(displayText.slice(current, match.startIndex));
    }
    parts.push(
      <Typography
        key={i}
        component="span"
        variant="inherit"
        color="inherit"
        sx={{ backgroundColor: "yellow" }}
      >
        {displayText.slice(match.startIndex, match.endIndex)}
      </Typography>
    );
    current = match.endIndex;
  });

  if (current < displayText.length) {
    parts.push(displayText.slice(current));
  }

  return (
    <Typography component="span" variant="inherit" color="inherit">
      {parts}
    </Typography>
  );
};

export default HighlightedText;
