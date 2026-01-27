import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import { STAKEHOLDER_SCHEMA } from "../../../constants/stakeholder-schema";

interface StakeholderField {
  name: string;
  label?: string;
  show: boolean;
  required?: boolean;
  description?: string;
  default_value?: string | number | boolean;
  sample_format?: string;
}

interface ImportFileGuideProps {
  handleDownload: () => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
  file?: File | null;
}

const ImportFileGuide = (props: ImportFileGuideProps) => {
  const { handleDownload, handleChange, handleUpload, file } = props;
  const [visibleFields, setVisibleFields] = useState<"all" | "required">("all");
  const ref = useRef<HTMLInputElement>(null);

  const handleVisibleFields = (e: ChangeEvent<{ value: "all" | "required" }>) => {
    const { value } = e.target;
    setVisibleFields(value);
  };

  useEffect(() => {
    if (!file && ref.current) {
      ref.current.value = "";
    }
  }, [file]);

  return (
    <main
      style={{
        textAlign: "center",
      }}
    >
      <Box
        sx={(theme) => ({
          marginTop: theme.spacing(2),
          maxWidth: "800px",
          mx: "auto",
          padding: theme.spacing(4),
          borderRadius: "8px",
          boxShadow: "-.2rem 0 2rem #C7CCD1",
          "& strong": {
            color: theme.palette.error.main,
          },
          "& button": {
            marginTop: theme.spacing(2),
            minWidth: "200px",
          },
        })}
      >
        <Typography variant="h5">CSV Import</Typography>
        <Typography>
          <strong>Warning: this feature is still being tested. </strong>
        </Typography>
        <Box
          component="ul"
          sx={{
            margin: "0 auto",
            maxWidth: "650px",
            textAlign: "left",
          }}
        >
          <Box component="li">
            You will have a chance to review your data before importing.
          </Box>
          <Box component="li">
            Refer to the formatting guides below. Do not change any column
            names.
          </Box>
        </Box>
        <br />
        <Input type="file" onChange={handleChange} inputRef={ref} />
        <br />
        <Button variant="contained" type="button" onClick={handleUpload}>
          Submit
        </Button>
      </Box>
      <Box
        sx={(theme) => ({
          marginTop: theme.spacing(2),
          maxWidth: "800px",
          mx: "auto",
          padding: theme.spacing(4),
          borderRadius: "8px",
          boxShadow: "-.2rem 0 2rem #C7CCD1",
          "& strong": {
            color: theme.palette.error.main,
          },
          "& button": {
            marginTop: theme.spacing(2),
            minWidth: "200px",
          },
        })}
      >
        <Typography variant="h5">CSV Template</Typography>
        <Box
          component="ul"
          sx={{
            margin: "0 auto",
            maxWidth: "650px",
            textAlign: "left",
          }}
        >
          <Box component="li">
            Download a CSV template to ensure proper formatting and column
            names.
          </Box>
          <Box component="li">Do not change column names or order.</Box>
        </Box>
        <Button variant="contained" type="button" onClick={handleDownload}>
          Download CSV template
        </Button>
      </Box>
      <Box
        sx={(theme) => ({
          marginTop: theme.spacing(2),
          maxWidth: "800px",
          mx: "auto",
          padding: theme.spacing(4),
          borderRadius: "8px",
          boxShadow: "-.2rem 0 2rem #C7CCD1",
          "& strong": {
            color: theme.palette.error.main,
          },
          "& button": {
            marginTop: theme.spacing(2),
            minWidth: "200px",
          },
        })}
      >
        <Typography variant="h5">Schema Guide</Typography>
        <Typography>
          The schema below lists the CSV column names, meanings, and guidelines.
        </Typography>
        <FormControl
          sx={{
            display: "block",
            marginLeft: "auto",
            paddingRight: "0",
            width: "100px",
          }}
        >
          <Select
            defaultValue="all"
            onChange={(e) => handleVisibleFields(e as ChangeEvent<{ value: "all" | "required" }>)}
            style={{ width: "100%" }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="required">Required</MenuItem>
          </Select>
          <FormHelperText>Show columns</FormHelperText>
        </FormControl>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Column name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Default value</TableCell>
                <TableCell>Sample format</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {STAKEHOLDER_SCHEMA.map(
                (field) =>
                  field.show &&
                  (visibleFields === "all" ? (
                    <TableRow
                      key={field.name}
                      sx={(theme) => ({
                        "&:nth-of-type(odd)": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      })}
                    >
                      <TableCell style={{ fontWeight: field.required ? 900 : undefined }}>
                        {`${field.name} ${field.required ? "(required)" : ""}`}
                      </TableCell>
                      <TableCell>{field.description}</TableCell>
                      <TableCell style={{ fontWeight: field.required ? 900 : undefined }}>
                        {field.default_value}
                      </TableCell>
                      <TableCell>{field.sample_format}</TableCell>
                    </TableRow>
                  ) : (
                    visibleFields === "required" &&
                    field.required && (
                      <TableRow
                        key={field.name}
                        sx={(theme) => ({
                          "&:nth-of-type(odd)": {
                            backgroundColor: theme.palette.action.hover,
                          },
                        })}
                      >
                        <TableCell style={{ fontWeight: 900 }}>
                          {`${field.name} ${
                            field.required ? "(required)" : ""
                          }`}
                        </TableCell>
                        <TableCell>{field.description}</TableCell>
                        <TableCell style={{ fontWeight: 900 }}>
                          {field.default_value}
                        </TableCell>
                        <TableCell>{field.sample_format}</TableCell>
                      </TableRow>
                    )
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </main>
  );
};

export default ImportFileGuide;
