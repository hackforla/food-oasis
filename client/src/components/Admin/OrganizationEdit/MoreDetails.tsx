import {
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { TabPanel } from "components/Admin/ui/TabPanel";
import { OrganizationSectionWithSetFieldValueProps } from "types/Organization";
import Label from "../ui/Label";
import Textarea from "../ui/Textarea";

interface MoreDetailsProps extends OrganizationSectionWithSetFieldValueProps {
  confirmationErrors?: Record<string, string>;
}

const FOOD_TYPES = [
  {
    name: "foodBakery",
    label: "Baked Goods",
  },
  {
    name: "foodDryGoods",
    label: "Dry Goods",
  },
  {
    name: "foodProduce",
    label: "Produce",
  },
  {
    name: "foodDairy",
    label: "Dairy",
  },
  {
    name: "foodPrepared",
    label: "Prepared Food",
  },
  {
    name: "foodMeat",
    label: "Meat",
  },
] as const;

type FoodTypeField = (typeof FOOD_TYPES)[number]["name"];

interface CheckboxWithLabelProps {
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  onBlur: (event: React.FocusEvent<any>) => void;
}

const CheckboxWithLabel = ({
  name,
  label,
  checked,
  onChange,
  onBlur,
}: CheckboxWithLabelProps) => (
  <Grid
    size={{
      xs: 12,
      sm: 4,
    }}
  >
    <FormControlLabel
      control={
        <Checkbox
          name={name}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
        />
      }
      label={label}
    />
  </Grid>
);

export default function MoreDetails({
  tabPage,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
  confirmationErrors = {},
}: MoreDetailsProps) {
  const noteTooltip = (
    <Stack spacing={1}>
      <p>These are notes for clients to see, for example:</p>
      <Stack spacing={2}>
        <p>Holiday hours may differ. Call or text message to confirm.</p>
        <p>
          Call ahead to make appointment or confirm that they are actually open
        </p>
        <p>Food tends to run out early on Saturdays</p>
        <p>This pantry was acquired by Shepherds Pantry</p>
        <p>Enter through double doors on Figueroa St.</p>
      </Stack>
    </Stack>
  );
  return (
    <TabPanel value={tabPage} index={3}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography>Details for Food Seekers to See</Typography>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          size={12}
        >
          <Grid size={6}>
            <Typography>Food Types</Typography>
          </Grid>
          <Grid container justifyContent="flex-end" spacing={2} size={6}>
            <FormControlLabel
              sx={{ mt: 2 }}
              slotProps={{
                typography: {
                  sx: {
                    color: confirmationErrors["confirmedFoodTypes"]
                      ? "error.main"
                      : "inherit",
                  },
                },
              }}
              control={
                <Checkbox
                  name="confirmedFoodTypes"
                  value={values.confirmedFoodTypes}
                  checked={values.confirmedFoodTypes}
                  sx={{
                    color: confirmationErrors["confirmedFoodTypes"]
                      ? "error.main"
                      : "inherit",
                  }}
                  onChange={(e) =>
                    setFieldValue("confirmedFoodTypes", e.target.checked)
                  }
                  onBlur={handleBlur}
                />
              }
              label="Confirm"
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center" sx={{ pl: 1.5, maxWidth: "600px" }}>
          {FOOD_TYPES.map(({ name, label }) => {
            const key = name as FoodTypeField;
            const checked = Boolean(values[key]);
            return (
              <CheckboxWithLabel
                key={name}
                name={name}
                label={label}
                checked={checked}
                onChange={() => setFieldValue(name, !checked)}
                onBlur={handleBlur}
              />
            );
          })}
        </Grid>

        <Grid size={12}>
          <div>
            <Label id="foodTypes" label="Other Food Types" />
            <Textarea
              id="foodTypes"
              name="foodTypes"
              placeholder="Other Food Types"
              value={values.foodTypes}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.foodTypes ? errors.foodTypes : ""}
              error={touched.foodTypes && Boolean(errors.foodTypes)}
            />
          </div>
        </Grid>
        <Grid size={12}>
          <div>
            <Label
              id="items"
              label="Non-Food Items"
              tooltipTitle="(Items besides food, i.e. dog food, cat food, hygiene products, diapers, female hygiene products)"
            />
            <TextField
              id="items"
              name="items"
              placeholder="Non-Food Items"
              value={values.items}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.items ? errors.items : ""}
              error={touched.items && Boolean(errors.items)}
            />
          </div>
        </Grid>
        <Grid size={12}>
          <div>
            <Label
              id="services"
              label="Services (separated by commas)"
              tooltipTitle="(Besides feeding ppl, i.e., family counseling, career counseling, drop in for women or homeless, etc.)"
            />
            <TextField
              id="services"
              name="services"
              placeholder="Services (separated by commas)"
              value={values.services}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.services ? errors.services : ""}
              error={touched.services && Boolean(errors.services)}
            />
          </div>
        </Grid>
        <Grid size={12}>
          <div>
            <Label
              id="requirements"
              label="Eligibility / Requirements"
              tooltipTitle="(Must go to chapel service, must be < 18, must show citizenship, etc.)"
            />
            <Textarea
              id="requirements"
              name="requirements"
              placeholder="Eligibility / Requirements"
              value={values.requirements}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.requirements ? errors.requirements : ""}
              error={touched.requirements && Boolean(errors.requirements)}
            />
          </div>
        </Grid>
        <Grid size={12}>
          <div>
            <Label
              id="eligibilityNotes"
              label="Eligibility Notes"
              tooltipTitle="Other notes about eligibility requirements"
            />
            <Textarea
              id="eligibilityNotes"
              name="eligibilityNotes"
              placeholder="Eligibility Notes"
              value={values.eligibilityNotes}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={
                touched.eligibilityNotes ? errors.eligibilityNotes : ""
              }
              error={
                touched.eligibilityNotes && Boolean(errors.eligibilityNotes)
              }
            />
          </div>
        </Grid>
        <Grid size={12}>
          <div>
            <Label id="languages" label="Languages" />
            <Textarea
              id="languages"
              name="languages"
              placeholder="Languages"
              value={values.languages}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.languages ? errors.languages : ""}
              error={touched.languages && Boolean(errors.languages)}
            />
          </div>
        </Grid>
        <Grid size={12}>
          <div>
            <Label
              id="notes"
              label="Notes for the Public"
              tooltipTitle={noteTooltip}
            />
            <Textarea
              id="notes"
              name="notes"
              placeholder="Notes for the Public"
              value={values.notes}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.notes ? errors.notes : ""}
              error={touched.notes && Boolean(errors.notes)}
            />
          </div>
        </Grid>
      </Grid>
    </TabPanel>
  );
}
