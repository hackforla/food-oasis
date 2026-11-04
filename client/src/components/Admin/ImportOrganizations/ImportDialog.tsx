import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
type ImportAction = 'replace' | 'update' | 'add';

interface ImportData {
  action: ImportAction | '';
}

interface ImportDialogProps {
  tenantName?: string;
  handleImport: () => void;
  handleImportAction: (event: React.ChangeEvent<HTMLInputElement>) => void;
  importData: ImportData;
  open: boolean;
  title: string;
  message: string;
  children?: React.ReactNode;
}

const optionDescriptions: Record<ImportAction, string> = {
  replace:
    "Removes all current records and adds imported records. This will REMOVE ALL existing stakeholder data.",
  update:
    "Updates all records matching your provided IDs. If an ID field is blank, the record will be treated as a new entry.",
  add: "Imports records without changing any existing records. This is not destructive but can result in duplicate records.",
};

function ImportDialog(props: ImportDialogProps) {
  const {
    tenantName,
    handleImport,
    handleImportAction,
    importData,
    open,
    children,
    ...other
  } = props;

  return (
    <Dialog
      disableEscapeKeyDown
      fullWidth
      maxWidth="sm"
      aria-labelledby="import-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="import-dialog-title">{props.title}</DialogTitle>
      <DialogContent
        dividers
        sx={{
          minHeight: "3em",
        }}
      >
        <Typography>{props.message}</Typography>
        <Typography>
          {importData.action
            ? optionDescriptions[importData.action]
            : "Please select an option below."}
        </Typography>
      </DialogContent>
      <FormControl
        component="fieldset"
        sx={(theme) => ({
          padding: theme.spacing(3),
        })}
      >
        <RadioGroup
          aria-label="import-options"
          name="import-options"
          onChange={handleImportAction}
        >
          <FormControlLabel
            value="replace"
            control={<Radio />}
            label="Replace"
          />
          <FormControlLabel value="update" control={<Radio />} label="Update" />
          <FormControlLabel value="add" control={<Radio />} label="Add" />
        </RadioGroup>
      </FormControl>
      <DialogActions>
        <Button 
          variant="outlined" 
          type="button" 
          onClick={() => handleImportAction({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          type="button"
          autoFocus
          onClick={handleImport}
          disabled={!importData.action}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImportDialog;
