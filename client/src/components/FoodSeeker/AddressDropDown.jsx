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
    const result = mapboxResults.find(
      (item) => item.place_name === selectedResult
    );
    const stakeholderResult = stakeholders.find(
      (stakeholder) => getNameAndAddress(stakeholder) === selectedResult
    );
    setOpen(false);
    setInputVal(selectedResult);
    if (stakeholderResult) {
      const { longitude, latitude } = stakeholderResult;

      flyTo({
        latitude,
        longitude,
      });
      dispatch({
        type: "SEARCH_COORDINATES_UPDATED",
        coordinates: { latitude, longitude, locationName: selectedResult },
      });
      navigate(isWidget ? "/widget" : "/organizations");

      analytics.postEvent("changeOrigin", {});
    }

    if (result) {
      const [longitude, latitude] = result.center;

      flyTo({
        latitude,
        longitude,
      });
      dispatch({
        type: "SEARCH_COORDINATES_UPDATED",
        coordinates: { latitude, longitude, locationName: result.place_name },
      });
      navigate(isWidget ? "/widget" : "/organizations");

      analytics.postEvent("changeOrigin", {});
    }
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
        {option}
      </MenuItem>
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && mapboxResults.length > 0 && !isLoading) {
      event.preventDefault();
      const selected = highlightedOption ?? mapboxResults[0].place_name;
      handleAutocompleteOnChange(selected);
    }
  };
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
          setInputVal(newValue ?? "");
        }}
        options={[
          ...stakeholders?.map((stakeholder) => getNameAndAddress(stakeholder)),
          ...mapboxResults.slice(0, 10).map((item) => item.place_name),
        ]}
        filterOptions={(options, { inputValue }) => {
          return options.filter((option) =>
            inputValue
              .toLowerCase()
              .split(" ")
              .every((word) => option.toLowerCase().includes(word))
          );
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
