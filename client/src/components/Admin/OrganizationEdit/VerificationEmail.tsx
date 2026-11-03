import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EmailIcon from "@mui/icons-material/Email";
import { TabPanel } from "components/Admin/ui/TabPanel";
import { useSiteContext } from "contexts/siteContext";
import { useToasterContext } from "contexts/toasterContext";
import { useUserContext } from "contexts/userContext";
import { useCategories } from "hooks/useCategories";
import { useEmailTemplate } from "hooks/useEmailTemplate";
import { useMemo } from "react";
import {
  buildMailtoHref,
  buildVerificationEmail,
  getRecipient,
} from "helpers/emailTemplate";
import type { OrganizationFormValues } from "types/Organization";

export const VERIFICATION_EMAIL_TAB_INDEX = 8;

interface VerificationEmailProps {
  tabPage: number;
  values: OrganizationFormValues;
  // True when the form has edits that have not been saved yet.
  dirty: boolean;
}

// TabPanel only mounts its children while its tab is active, so the template
// fetch, the categories fetch and the email rebuild all stay idle until the
// Verification Email tab is opened.
export default function VerificationEmail({
  tabPage,
  values,
  dirty,
}: VerificationEmailProps) {
  return (
    <TabPanel value={tabPage} index={VERIFICATION_EMAIL_TAB_INDEX}>
      <VerificationEmailContent values={values} dirty={dirty} />
    </TabPanel>
  );
}

function VerificationEmailContent({
  values,
  dirty,
}: Omit<VerificationEmailProps, "tabPage">) {
  const { user } = useUserContext();
  const { setToast } = useToasterContext();
  const { tenantName, siteUrl } = useSiteContext();
  const { data: template, loading, error } = useEmailTemplate("verification");
  const { data: categories } = useCategories();

  const email = useMemo(() => {
    if (!template) return null;
    const names = (values.selectedCategoryIds || [])
      .map((id) => categories?.find((c) => c.id === id)?.name)
      .filter((name): name is string => Boolean(name));
    return buildVerificationEmail({
      template,
      org: values,
      categoryNames: names,
      user: {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
      },
      tokens: { regionName: tenantName, siteUrl },
    });
  }, [template, values, categories, user, tenantName, siteUrl]);

  const recipient = getRecipient(values);

  const handleCopy = async () => {
    if (!email) return;
    try {
      if (!navigator.clipboard || typeof ClipboardItem === "undefined") {
        throw new Error("Rich clipboard API not available");
      }
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([email.html], { type: "text/html" }),
          "text/plain": new Blob([email.text], { type: "text/plain" }),
        }),
      ]);
      setToast({ message: "Email body copied to clipboard.", type: "success" });
      return;
    } catch (err) {
      console.error(err);
    }
    // Fall back to plain text when rich copy is unsupported or rejected.
    try {
      await navigator.clipboard.writeText(email.text);
      setToast({
        message: "Email body copied to clipboard as plain text.",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      setToast({
        message: "Could not copy the email body to the clipboard.",
        type: "error",
      });
    }
  };

  return (
    <Stack spacing={2}>
      <Typography component="h2" variant="h6">
        Verification email generator
      </Typography>
      <Typography variant="body2">
        Copy and paste this to send to this organization
      </Typography>
      {dirty && (
        <Alert severity="info">
          Unsaved changes are included in this email.
        </Alert>
      )}
      {loading && <CircularProgress aria-label="Loading email template" />}
      {error && (
        <Alert severity="error">Could not load the email template.</Alert>
      )}
      {email && (
        <>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Tooltip
              title={recipient ? "" : "No email on file for this organization."}
            >
              <span>
                <Button
                  variant="contained"
                  startIcon={<EmailIcon />}
                  disabled={!recipient}
                  {...(recipient
                    ? {
                        href: buildMailtoHref(recipient, email.subject),
                      }
                    : {})}
                >
                  Send to my email program
                </Button>
              </span>
            </Tooltip>
            <Button
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={handleCopy}
            >
              Copy email body to clipboard
            </Button>
          </Stack>
          <Box sx={{ border: "1px solid lightgray", p: 2 }}>
            <Typography variant="body2" data-testid="verification-email-to">
              <strong>To:</strong> {recipient}
            </Typography>
            <Typography
              variant="body2"
              data-testid="verification-email-subject"
            >
              <strong>Subject:</strong> {email.subject}
            </Typography>
            <Divider sx={{ my: 2, borderColor: "text.primary" }} />
            <Box
              data-testid="verification-email-preview"
              // Every org and template value is HTML-escaped by
              // buildVerificationEmail before it reaches this string.
              dangerouslySetInnerHTML={{ __html: email.html }}
            />
          </Box>
        </>
      )}
    </Stack>
  );
}
