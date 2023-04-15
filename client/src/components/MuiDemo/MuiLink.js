import { Box, Stack, Link, List, ListItem, Typography } from "@mui/material";

function MuiLink() {
  return (
    <Stack direction="row" spacing={1} margin="1rem">
      <Stack direction="column" spacing={1} alignItems="flex-start">
        <Link href="http://hackforla.org">Hack for LA</Link>
        <Link href="http://nonexistentlink">Unvisitable Link</Link>
        <Link href="http://hackforla.org">Hack for LA</Link>

        <Box>
          <Typography variant="body1" component={"p"}>
            Possible states are:
          </Typography>

          <List>
            <ListItem>normal (:link pseudo class)</ListItem>
            <ListItem>visited (href appears in browser history)</ListItem>
            <ListItem>focus (link has keyboard focus)</ListItem>
            <ListItem>hover (mouse is hovering over link)</ListItem>
            <ListItem>active (link is being pressed)</ListItem>
          </List>
          <p>
            Only normal and visited are mutually exclusive. For example, a link
            can be normal, focus and hover.
          </p>
        </Box>
      </Stack>
    </Stack>
  );
}

export default MuiLink;
