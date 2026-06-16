import { Box, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC } from "react";
import AddressDropDown from "components/FoodSeeker/AddressDropDown";
import SwitchViewsButton from "./SwitchViewsButton";
import { TENANT_CONFIG } from "../../../../helpers/Constants";
import Geolocate from "./Geolocate";

interface ResultsFiltersProps {
  showList: boolean;
  toggleShowList: () => void;
}

const ResultsFilters: FC<ResultsFiltersProps> = ({
  showList,
  toggleShowList,
}) => {
  const { taglineText } = TENANT_CONFIG;

  return (
    <Grid2
      container
      sx={{
        borderTop: "1px solid lightgray",
        borderBottom: "1px solid lightgray",
        padding: "0.5rem 0",
        zIndex: 2,
      }}
    >
      <Grid2
        display={{ xs: "none", sm: "block" }}
        sm="auto"
        sx={{
          paddingLeft: "1rem",
        }}
      >
        <Stack
          sx={{
            alignItems: "flex-start",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
            {taglineText}
          </Typography>
        </Stack>
      </Grid2>

      <Grid2
        container
        xs={12}
        sm={true}
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          direction={{ xs: "column-reverse", sm: "row", }}
          spacing={0.5}
          sx={{
            width: "100%",
            alignItems: "center",
          }}
        >
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                gap: "0.5rem",
                px: "1rem",
                boxSizing: "border-box",
                width: "100%",
              }}
            >
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <AddressDropDown autoFocus={false} />
              </Box>

              <Box display={{ xs: "flex", sm: "none" }} alignItems="center" gap="0.5rem">
                <Geolocate />
                <SwitchViewsButton isListView={showList} onClick={toggleShowList} />
              </Box>
            </Stack>
        </Stack>
      </Grid2>
    </Grid2>
  );
};

export default ResultsFilters;
