import { Box, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC } from "react";
import AddressDropDown from "components/FoodSeeker/AddressDropDown";
import SwitchViewsButton from "./SwitchViewsButton";
import { TENANT_CONFIG } from "../../../../helpers/Constants";
import Geolocate from "./Geolocate";
import useBreakpoints from "hooks/useBreakpoints";

interface ResultsFiltersProps {
  showList: boolean;
  toggleShowList: () => void;
}

const ResultsFilters: FC<ResultsFiltersProps> = ({
  showList,
  toggleShowList,
}) => {
  const { taglineText } = TENANT_CONFIG;
  const { isMobile } = useBreakpoints();

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
        sm={4}
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
        sm={8}
        justifyContent="center"
        alignItems="center"
        wrap="wrap-reverse"
      >
        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          spacing={0.5}
          sx={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <Grid2 xs={12} sm={6}>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                marginX: "1rem",
                maxWidth: "99vw",
                gap: "0.5rem",
              }}
            >
              <AddressDropDown autoFocus={false} />
              {isMobile && <Geolocate />}
              <Box
                sx={{
                  maxWidth: "48px",
                  boxSizing: "border-box",
                }}
                display={{ xs: "block", sm: "none" }}
              >
                <SwitchViewsButton
                  isListView={showList}
                  onClick={toggleShowList}
                />
              </Box>
            </Stack>
          </Grid2>
        </Stack>
      </Grid2>
    </Grid2>
  );
};

export default ResultsFilters;
