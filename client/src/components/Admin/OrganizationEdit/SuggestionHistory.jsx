import {
  Box,
  FormControlLabel,
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { FILTERS } from "../Suggestions"; // reuse status options
import { TabPanel } from "../ui/TabPanel";
import Textarea from "../ui/Textarea";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toISOString().slice(0, 10);
}

const OPEN_SUGGESTION_STATUS_IDS = [1, 2];

export default function SuggestionHistory({
  tabPage,
  suggestions = [],
  editedSuggestions,
  onEdit,
  showOpenOnly = false,
}) {
  const handleInputChange = (id, field, value) => {
    if (onEdit) onEdit(id, { [field]: value });
  };

  const visibleSuggestions = showOpenOnly
    ? suggestions.filter((suggestion) =>
        OPEN_SUGGESTION_STATUS_IDS.includes(suggestion.suggestionStatusId)
      )
    : suggestions;

  if (showOpenOnly && visibleSuggestions.length === 0) return null;

  return (
    <TabPanel value={tabPage} index={showOpenOnly ? undefined : 6}>
      <Stack spacing={3}>
        {visibleSuggestions.map((suggestion) => (
          <Paper
            key={suggestion.id}
            sx={(theme) => ({
              backgroundColor: theme.palette.primary.extralight,
              px: 4,
              py: 2,
            })}
          >
            <Typography variant="subtitle1" gutterBottom>
              Suggestion ({formatDate(suggestion.createdDate)}
              {suggestion.tipsterName && <> | {suggestion.tipsterName}</>}
              {suggestion.tipsterEmail && <> | {suggestion.tipsterEmail}</>}
              {suggestion.tipsterPhone && <> | {suggestion.tipsterPhone}</>})
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {suggestion.notes}
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems="center"
            >
              <Stack
                direction={"row"}
                spacing={2}
                sx={{ mb: 1, width: "100%" }}
                flex={1}
              >
                <InputLabel
                  htmlFor={`suggestionAdminNotes-${suggestion.id}`}
                  sx={{ minWidth: "fit-content" }}
                >
                  Note:
                </InputLabel>
                <Textarea
                  placeholder="Admin Notes"
                  id={`suggestionAdminNotes-${suggestion.id}`}
                  multiline
                  fullWidth
                  value={
                    editedSuggestions[suggestion.id]?.adminNotes ??
                    suggestion.adminNotes ??
                    ""
                  }
                  onChange={(e) =>
                    handleInputChange(
                      suggestion.id,
                      "adminNotes",
                      e.target.value
                    )
                  }
                />
              </Stack>
              <Box sx={{ minWidth: 200 }}>
                <RadioGroup
                  value={
                    editedSuggestions[suggestion.id]?.suggestionStatusId ??
                    suggestion.suggestionStatusId ??
                    ""
                  }
                  onChange={(e) =>
                    handleInputChange(
                      suggestion.id,
                      "suggestionStatusId",
                      Number(e.target.value)
                    )
                  }
                >
                  {FILTERS.map((status) => (
                    <FormControlLabel
                      key={status.id}
                      value={status.id}
                      control={
                        <Radio
                          sx={(theme) => ({
                            "&.Mui-checked": {
                              color: theme.palette.secondary.main,
                            },
                          })}
                        />
                      }
                      label={status.name}
                    />
                  ))}
                </RadioGroup>
              </Box>
            </Stack>
          </Paper>
        ))}
        {visibleSuggestions.length === 0 && (
          <Typography>No suggestions found.</Typography>
        )}
      </Stack>
    </TabPanel>
  );
}

SuggestionHistory.propTypes = {
  tabPage: PropTypes.number,
  suggestions: PropTypes.array,
  editedSuggestions: PropTypes.object,
  onEdit: PropTypes.func,
  showOpenOnly: PropTypes.bool,
};
