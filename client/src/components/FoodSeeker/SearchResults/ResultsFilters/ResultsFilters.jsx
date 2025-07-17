import { Box, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import AddressDropDown from "components/FoodSeeker/AddressDropDown";
import PropTypes from "prop-types";
import SwitchViewsButton from "./SwitchViewsButton";
import { TENANT_CONFIG } from "../../../../helpers/Constants";
import Geolocate from "./Geolocate";
import useBreakpoints from "hooks/useBreakpoints";

const ResultsFilters = ({
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
          <Typography variant="h5" componenet="h1" sx={{ fontWeight: "bold" }}>
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

ResultsFilters.propTypes = {
  categoryIds: PropTypes.any,
  toggleCategory: PropTypes.func,
  showList: PropTypes.bool,
  toggleShowList: PropTypes.func,
};

export default ResultsFilters;
