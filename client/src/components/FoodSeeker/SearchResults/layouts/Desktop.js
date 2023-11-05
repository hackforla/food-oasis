import { Box } from "@mui/material";
import FilterPanel from "../ResultsFilters/FilterPanel";

const DesktopLayout = ({ filters, list, map }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {filters}
      <Box
        sx={{
          flex: "auto",
          overflowY: "hidden",
          display: "flex",
        }}>
        {/* todo - move this component up to parent - SearchResults */}
        <FilterPanel setOpen={setOpen} open={open} />

        <Box
          sx={{
            width: "35%",
            overflow: "auto",
          }}>
          <button onClick={() => setOpen(!open)}>Toggle</button>
          {list}
        </Box>
        <Box
          sx={{
            height: "100%",
            flex: 1,
          }}
        >
          {map}
        </Box>
      </Box>
    </>
  );
};

export default DesktopLayout;
