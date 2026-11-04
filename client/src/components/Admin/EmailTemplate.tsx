import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSiteContext } from "contexts/siteContext";
import { useToasterContext } from "contexts/toasterContext";
import { useEmailTemplate } from "hooks/useEmailTemplate";
import { buildVerificationEmail } from "helpers/emailTemplate";
import { useEffect, useMemo, useRef, useState } from "react";
import Label from "./ui/Label";
import Textarea from "./ui/Textarea";
import type { OrganizationFormValues } from "types/Organization";

const SUBJECT_MAX = 200;
const INTRO_MAX = 5000;

const SAMPLE_ORG = {
  name: "Sample Food Pantry",
  address1: "123 Main St",
  city: "Sampletown",
  state: "CA",
  zip: "90000",
  phone: "(555) 555-1234",
  email: "info@example.org",
  hours: [],
  selectedCategoryIds: [],
} as unknown as OrganizationFormValues;

type Field = "subject" | "intro";

export default function EmailTemplate() {
  const { tenantName, siteUrl } = useSiteContext();
  const { setToast } = useToasterContext();
  const { data, loading, error, save } = useEmailTemplate("verification");
  const [subject, setSubject] = useState("");
  const [intro, setIntro] = useState("");
  const [saving, setSaving] = useState<Field | null>(null);

  // Seed the inputs once, on first load. After a save only the saved field is
  // updated (in handleSave), so an unsaved edit in the other field is kept.
  const seeded = useRef(false);
  useEffect(() => {
    if (data && !seeded.current) {
      seeded.current = true;
      setSubject(data.subject);
      setIntro(data.intro);
    }
  }, [data]);

  const preview = useMemo(
    () =>
      buildVerificationEmail({
        template: { subject, intro },
        org: SAMPLE_ORG,
        categoryNames: ["Food Pantry"],
        user: { firstName: "Your", lastName: "Name", email: "you@example.org" },
        tokens: { regionName: tenantName, siteUrl },
      }),
    [subject, intro, tenantName, siteUrl]
  );

  const handleSave = async (field: Field) => {
    setSaving(field);
    try {
      const saved = await save(field === "subject" ? { subject } : { intro });
      if (field === "subject") setSubject(saved.subject);
      else setIntro(saved.intro);
      setToast({ message: "Template saved.", type: "success" });
    } catch (err) {
      console.error(err);
      setToast({ message: "Could not save the template.", type: "error" });
    } finally {
      setSaving(null);
    }
  };

  const subjectValid =
    subject.trim().length > 0 && subject.length <= SUBJECT_MAX;
  const introValid = intro.trim().length > 0 && intro.length <= INTRO_MAX;

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Typography component="h1" variant="h5" gutterBottom>
        Verification Email Template
      </Typography>
      {loading && <CircularProgress aria-label="Loading template" />}
      {error && <Alert severity="error">Could not load the template.</Alert>}
      {data && (
        <Stack spacing={3}>
          <Typography variant="body2">
            Available tokens: <code>{"{{ORG_NAME}}"}</code> (subject only),{" "}
            <code>{"{{REGION_NAME}}"}</code>, <code>{"{{SITE_URL}}"}</code>. The
            closing block of the email is fixed and cannot be edited.
          </Typography>
          <Stack spacing={1}>
            <Label id="emailTemplateSubject" label="Subject" />
            <TextField
              id="emailTemplateSubject"
              name="subject"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              error={!subjectValid}
              helperText={`${subject.length}/${SUBJECT_MAX}`}
              fullWidth
            />
            <Box>
              <Button
                variant="contained"
                onClick={() => handleSave("subject")}
                disabled={
                  !subjectValid || subject === data.subject || saving !== null
                }
                startIcon={
                  saving === "subject" ? <CircularProgress size={16} /> : null
                }
              >
                Save Subject
              </Button>
            </Box>
          </Stack>
          <Stack spacing={1}>
            <Label id="emailTemplateIntro" label="Intro" />
            <Textarea
              id="emailTemplateIntro"
              name="intro"
              placeholder="Intro"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              error={!introValid}
              helperText={`${intro.length}/${INTRO_MAX}`}
              rows={10}
              fullWidth
            />
            <Box>
              <Button
                variant="contained"
                onClick={() => handleSave("intro")}
                disabled={
                  !introValid || intro === data.intro || saving !== null
                }
                startIcon={
                  saving === "intro" ? <CircularProgress size={16} /> : null
                }
              >
                Save Intro
              </Button>
            </Box>
          </Stack>
          <Box>
            <Typography variant="h6">Preview</Typography>
            <Typography variant="subtitle2">
              Subject: {preview.subject}
            </Typography>
            <Box
              data-testid="email-template-preview"
              sx={{ border: "1px solid lightgray", p: 2, mt: 1 }}
              // Template and sample values are HTML-escaped by
              // buildVerificationEmail.
              dangerouslySetInnerHTML={{ __html: preview.html }}
            />
          </Box>
        </Stack>
      )}
    </Container>
  );
}
