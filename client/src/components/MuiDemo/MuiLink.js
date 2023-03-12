import { Stack, Link } from "@mui/material";

function MuiLink() {
  return (
    <Stack direction="row" spacing={1} margin="1rem">
      <Stack direction="column" spacing={1}>
        <Link href="http://hackforla.org">Hack for LA</Link>
        <Link href="http://hackforla.org">Hack for LA</Link>
        <Link href="http://hackforla.org">Hack for LA</Link>
        <Link href="http://hackforla.org" disabled>
          Disabled Link
        </Link>
      </Stack>
    </Stack>
  );
}

export default MuiLink;
