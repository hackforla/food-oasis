import { Box, Grid, Stack, Typography } from "@mui/material";
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
    <Grid
      container
      sx={{
        borderTop: "1px solid lightgray",
        borderBottom: "1px solid lightgray",
        padding: "0.5rem 0",
        zIndex: 2,
      }}
    >
      <Grid
        display={{ xs: "none", sm: "block" }}
        size={{ sm: "auto" }}
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
      </Grid>

      <Grid
        container
        size={{ xs: 12, sm: "grow" }}
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
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

            <Box
              display={{ xs: "flex", sm: "none" }}
              alignItems="center"
              gap="0.5rem"
            >
              <Geolocate />
              <SwitchViewsButton
                isListView={showList}
                onClick={toggleShowList}
              />
            </Box>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ResultsFilters;
