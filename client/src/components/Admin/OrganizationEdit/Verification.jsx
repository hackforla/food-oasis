import { Grid, Stack, TextField, Typography } from "@mui/material";
import AccountAutocomplete from "components/Admin/AccountAutocomplete";
import { TabPanel } from "components/Admin/ui/TabPanel";
import { useUserContext } from "contexts/userContext";
import dayjs from "dayjs";
import Label from "../ui/Label";
import Textarea from "../ui/Textarea";

const DATE_FORMAT = "MM/DD/YY h:mm a";

export default function Verification({
  tabPage,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
}) {
  const { user } = useUserContext();

  return (
    <TabPanel value={tabPage} index={5}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <div>
            <Label
              id="adminContactName"
              label="Verification Contact Name"
              tooltipTitle="Name of person(s) to contact for organization information"
            />
            <TextField
              id="adminContactName"
              name="adminContactName"
              placeholder="Verification Contact Name"
              value={values.adminContactName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={
                touched.adminContactName ? errors.adminContactName : ""
              }
              error={
                touched.adminContactName && Boolean(errors.adminContactName)
              }
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div>
            <Label
              id="adminContactPhone"
              label="Verification Phone"
              tooltipTitle="Phone number for administrative information"
            />
            <TextField
              id="adminContactPhone"
              name="adminContactPhone"
              placeholder="Verification Phone"
              value={values.adminContactPhone}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={
                touched.adminContactPhone ? errors.adminContactPhone : ""
              }
              error={
                touched.adminContactPhone && Boolean(errors.adminContactPhone)
              }
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div>
            <Label
              id="adminContactEmail"
              label="Verification Email"
              tooltipTitle="Email for administrative information"
            />
            <TextField
              id="adminContactEmail"
              name="adminContactEmail"
              placeholder="Verification Email"
              value={values.adminContactEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={
                touched.adminContactEmail ? errors.adminContactEmail : ""
              }
              error={
                touched.adminContactEmail && Boolean(errors.adminContactEmail)
              }
            />
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            mt: 2,
            border: "1px solid gray",
            borderRadius: "4px",
            padding: "0.5em",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack direction="row">
            <Typography flexBasis="20%">Id:</Typography>
            <Typography flexBasis="20%">{values.id}</Typography>
          </Stack>
          <Stack direction="row">
            <Typography flexBasis="20%">Entered:</Typography>
            <Typography flexBasis="20%">{values.createdUser}</Typography>

            <Typography flexBasis="20%">
              {!values.createdDate
                ? null
                : dayjs(values.createdDate).format(DATE_FORMAT)}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography flexBasis="20%">Last Modified:</Typography>
            <Typography flexBasis="20%">{values.modifiedUser}</Typography>
            <Typography flexBasis="20%">
              {!values.modifiedDate
                ? null
                : dayjs(values.modifiedDate).format(DATE_FORMAT)}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography flexBasis="20%">Assigned:</Typography>
            <Typography flexBasis="20%">{values.assignedUser}</Typography>
            <Typography flexBasis="20%">
              {!values.assignedDate
                ? null
                : dayjs(values.assignedDate).format(DATE_FORMAT)}
            </Typography>
            {/* <div >
                        <UserContext.Consumer>
                          {(user) =>
                            user && user.isAdmin ? (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <AccountAutocomplete
                                  accountId={values.assignedLoginId || ""}
                                  setAccount={(login) => {
                                    if (login) {
                                      setFieldValue(
                                        "assignedLoginId",
                                        login.id
                                      );
                                      setFieldValue(
                                        "assignedUser",
                                        `${login.firstName} ${login.lastName}`
                                      );
                                      setFieldValue("assignedDate", moment());
                                      setFieldValue(
                                        "verificationStatusId",
                                        VERIFICATION_STATUS.ASSIGNED
                                      );
                                    } else {
                                      setFieldValue("assignedLoginId", "");
                                      setFieldValue("assignedUser", "");
                                      setFieldValue("assignedDate", "");
                                      setFieldValue(
                                        "verificationStatusId",
                                        VERIFICATION_STATUS.NEEDS_VERIFICATION
                                      );
                                    }
                                  }}
                                />
                              </div>
                            ) : null
                          }
                        </UserContext.Consumer>
                      </div>*/}
          </Stack>
          <Stack direction="row">
            <Typography flexBasis="20%">Submitted:</Typography>
            <Typography flexBasis="20%">{values.submittedUser}</Typography>
            <Typography flexBasis="20%">
              {!values.submittedDate
                ? null
                : dayjs(values.submittedDate).format(DATE_FORMAT)}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography flexBasis="20%">Approved:</Typography>
            <Typography flexBasis="20%">{values.reviewedUser}</Typography>
            <Typography flexBasis="20%">
              {values.approvedDate
                ? dayjs(values.approvedDate).format(DATE_FORMAT)
                : ""}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography flexBasis="20%">Claimed:</Typography>
            <Typography flexBasis="20%">{values.claimedUser}</Typography>
            <Typography flexBasis="20%">
              {!values.claimedDate
                ? ""
                : dayjs(values.claimedDate).format(DATE_FORMAT)}
            </Typography>
            {user && (user.isAdmin || user.isCoordinator) ? (
              <div
                style={{
                  flexBasis: "40%",
                }}
              >
                <AccountAutocomplete
                  style={{ width: "100%" }}
                  accountId={values.claimedLoginId || ""}
                  setAccount={(login) => {
                    if (login) {
                      setFieldValue("claimedLoginId", login.id);
                      setFieldValue(
                        "claimedUser",
                        `${login.firstName} ${login.lastName}`
                      );
                      setFieldValue("claimedDate", dayjs());
                    } else {
                      setFieldValue("claimedLoginId", "");
                      setFieldValue("claimedUser", "");
                      setFieldValue("claimedDate", "");
                    }
                  }}
                />
              </div>
            ) : null}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <div>
            <Label
              id="reviewNotes"
              label="Reviewer Notes"
              tooltipTitle="Verification review comments and instructions"
            />
            <Textarea
              id="reviewNotes"
              name="reviewNotes"
              placeholder="Reviewer Notes"
              value={values.reviewNotes}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.reviewNotes ? errors.reviewNotes : ""}
              error={touched.reviewNotes && Boolean(errors.reviewNotes)}
            />
          </div>
        </Grid>
      </Grid>
    </TabPanel>
  );
}
