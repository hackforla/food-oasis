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
import { FILTERS } from "../Suggestions";
import { TabPanel } from "../ui/TabPanel";
import Textarea from "../ui/Textarea";
import { EditedSuggestions, Suggestion } from "types/Organization";

interface SuggestionHistoryProps {
  tabPage?: number;
  suggestions?: Suggestion[];
  editedSuggestions: EditedSuggestions;
  onEdit?: (id: number, changes: Partial<Suggestion>) => void;
  showNewOnly?: boolean;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

export default function SuggestionHistory({
  tabPage = 0,
  suggestions = [],
  editedSuggestions,
  onEdit,
  showNewOnly = false,
}: SuggestionHistoryProps) {
  const handleInputChange = (
    id: number,
    field: keyof Suggestion,
    value: string | number
  ) => {
    if (onEdit) onEdit(id, { [field]: value });
  };

  const safeSuggestions = Array.isArray(suggestions) ? suggestions : [];

  const filteredSuggestions = showNewOnly
    ? safeSuggestions.filter(
        (suggestion) => suggestion.suggestionStatusId === 1
      )
    : safeSuggestions;

  if (showNewOnly && filteredSuggestions.length === 0) return null;

  return (
    <TabPanel value={tabPage} index={showNewOnly ? -1 : 6}>
      <Stack spacing={3}>
        {filteredSuggestions.map((suggestion) => (
          <Paper
            key={suggestion.id}
            sx={(theme: any) => ({
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
                direction="row"
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
                  name={`suggestionAdminNotes-${suggestion.id}`}
                  fullWidth
                  value={
                    editedSuggestions[suggestion.id]?.adminNotes ??
                    suggestion.adminNotes ??
                    ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                  {FILTERS.map((status: { id: number; name: string }) => (
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
        {filteredSuggestions.length === 0 && (
          <Typography>No suggestions found.</Typography>
        )}
      </Stack>
    </TabPanel>
  );
}
