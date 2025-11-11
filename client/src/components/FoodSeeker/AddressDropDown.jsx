import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { useMapboxGeocoder } from "hooks/useMapboxGeocoder";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as analytics from "services/analytics";
import {
  useAppDispatch,
  useSearchCoordinates,
  useStakeholders,
  useUserCoordinates,
  useWidget,
} from "../../appReducer";
import { useMapbox } from "../../hooks/useMapbox";

export default function AddressDropDown({ autoFocus }) {
  const searchCoordinates = useSearchCoordinates();
  const userCoordinates = useUserCoordinates();
  const isWidget = useWidget();
  const [inputVal, setInputVal] = useState(
    searchCoordinates?.locationName || ""
  );
  const [open, setOpen] = useState(false);
  const { mapboxResults, fetchMapboxResults, isLoading } = useMapboxGeocoder();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { flyTo } = useMapbox();
  const [highlightedOption, setHighlightedOption] = useState(null);
  const stakeholders = useStakeholders();
  useEffect(() => {
    if (userCoordinates) {
      setInputVal("");
    }
  }, [userCoordinates]);

  const handleInputChange = (delta) => {
    if (!delta) return;
    const safeValue = typeof delta === "string" ? delta : delta.target.value;
    setInputVal(safeValue);
    if (safeValue) {
      fetchMapboxResults(safeValue);
    }
  };

  const handleAutocompleteOnChange = (selectedResult) => {
    let result;
    if (selectedResult.type === "mapbox") {
      result = selectedResult.value.place_name;
      const [longitude, latitude] = selectedResult.value.center;

      flyTo({
        latitude,
        longitude,
      });

      dispatch({
        type: "SEARCH_COORDINATES_UPDATED",
        coordinates: {
          latitude,
          longitude,
          locationName: selectedResult.value.place_name,
        },
      });

      navigate(isWidget ? "/widget" : "/organizations");

      analytics.postEvent("changeOrigin", {});
    } else if (selectedResult.type === "stakeholder") {
      result = getNameAndAddress(selectedResult.value);
      const { longitude, latitude } = selectedResult.value;

      flyTo({
        latitude,
        longitude,
      });
      dispatch({
        type: "SEARCH_COORDINATES_UPDATED",
        coordinates: {
          latitude,
          longitude,
          locationName: getNameAndAddress(selectedResult.value),
        },
      });
      navigate(isWidget ? "/widget" : "/organizations");

      analytics.postEvent("changeOrigin", {});
    } else return;

    setOpen(false);
    setInputVal(result);
  };

  const renderInput = (params) => {
    return (
      <TextField
        sx={{
          background: "#FFFFFF",
        }}
        variant="outlined"
        {...params}
        label="Search by name, address, or zip code"
        margin="none"
        fullWidth
        name="address"
        size="small"
        autoFocus={autoFocus}
        onClick={() => setInputVal("")}
        InputLabelProps={{
          sx: {
            textOverflow: "ellipsis",
            paddingRight: "20px",
            color: "#252525",
          },
        }}
        InputProps={{
          sx: {
            cursor: "pointer",
            backgroundColor: "#F0F0F0",
            "& input": {
              fontSize: "16px",
            },
          },
          endAdornment: (
            <InputAdornment
              position="end"
              data-testid="search-button"
              onClick={() => {
                navigate(isWidget ? "/widget" : "/organizations");
              }}
            >
              <SearchIcon />
            </InputAdornment>
          ),
          ...params.InputProps,
        }}
      />
    );
  };

  const renderOption = (props, option) => {
    const { id } = props;
    return (
      <MenuItem
        {...props}
        key={id}
        component="div"
        onClick={() => handleAutocompleteOnChange(option)}
      >
        {getOptionLabel(option)}
      </MenuItem>
    );
  };

  const stakeholderOptions = stakeholders?.map((stakeholder) => ({
    type: "stakeholder",
    value: stakeholder,
  }));
  const mapboxOptions = mapboxResults.slice(0, 10).map((result) => ({
    type: "mapbox",
    value: result,
  }));

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && mapboxOptions.length > 0 && !isLoading) {
      event.preventDefault();
      const selected = highlightedOption ?? mapboxOptions[0];
      handleAutocompleteOnChange(selected);
    }
  };

  const combinedOptions = [...mapboxOptions, ...stakeholderOptions];

  return (
    <>
      <Autocomplete
        disableCloseOnSelect
        autoHighlight
        onInputChange={(value) => handleInputChange(value)}
        onHighlightChange={(_event, option) => {
          setHighlightedOption(option);
        }}
        freeSolo
        inputValue={inputVal}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onKeyDown={handleKeyDown}
        onChange={(_event, newValue) => {
          setInputVal(newValue ? getOptionLabel(newValue) : "");
        }}
        options={combinedOptions}
        groupBy={(option) =>
          option.type === "stakeholder" ? "Organizations" : "Addresses"
        }
        getOptionLabel={getOptionLabel}
        filterOptions={(options, { inputValue }) => {
          return options.filter((option) => {
            if (option.type === "stakeholder") {
              return inputValue
                .toLowerCase()
                .split(" ")
                .every((word) =>
                  getNameAndAddress(option.value).toLowerCase().includes(word)
                );
            }
            return true; // For mapbox results, we don't filter by inputValue
          });
        }}
        sx={{
          width: 600,
          backgroundColor: "#F0F0F0",
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
            width: "auto",
            maxWidth: "auto",
            height: "auto",
            maxHeight: "150px",
            overflow: "auto",
            "&::placeholder": {
              opacity: "1",
              backgroundColor: "#F0F0F0",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "blue",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "blue",
            },
          },
        }}
        ListboxProps={{
          style: {
            maxHeight: "160px",
          },
        }}
        renderInput={(params) => renderInput(params)}
        renderOption={(props, option) => renderOption(props, option)}
      />
    </>
  );
}

function getNameAndAddress(stakeholder) {
  return (
    (stakeholder.name ?? "") +
    (stakeholder.address1 ? `, ${stakeholder.address1}` : "") +
    (stakeholder.city ? `, ${stakeholder.city}` : "") +
    (stakeholder.zip ? `, ${stakeholder.zip}` : "")
  );
}

export function getOptionLabel(option) {
  if (option.type === "stakeholder") {
    return getNameAndAddress(option.value);
  }
  return option.value.place_name;
}
