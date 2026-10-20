import { standardTime, formatShortWeekdayToLong } from "helpers";
import type { OrganizationFormValues } from "types/Organization";

export const EMAIL_TEMPLATE_TOKENS = {
  ORG_NAME: "{{ORG_NAME}}",
  REGION_NAME: "{{REGION_NAME}}",
  SITE_URL: "{{SITE_URL}}",
};

export interface EmailTokenValues {
  orgName?: string;
  regionName: string;
  siteUrl: string;
}

export interface VerificationEmailInput {
  template: { subject: string; intro: string };
  org: OrganizationFormValues;
  categoryNames: string[];
  user: { firstName?: string; lastName?: string; email?: string };
  tokens: EmailTokenValues;
}

export interface VerificationEmail {
  subject: string;
  html: string;
  text: string;
}

export const NO_DATA = "[no data]";

export const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Replaces tokens in plain text in a single pass, so a token-like string inside
// a substituted value (e.g. an org name) is never expanded again. Uses a
// replacer function so "$" sequences in values are never interpreted.
// Escaping happens later, at HTML render time.
export const applyTokens = (text: string, tokens: EmailTokenValues): string =>
  text.replace(
    /\{\{(ORG_NAME|REGION_NAME|SITE_URL)\}\}/g,
    (match, name: string) => {
      if (name === "ORG_NAME") return tokens.orgName ?? match;
      if (name === "REGION_NAME") return tokens.regionName;
      return tokens.siteUrl;
    }
  );

const INTERVAL_LABELS: Record<string, string> = {
  "0": "Every",
  "1": "First",
  "2": "Second",
  "3": "Third",
  "4": "Fourth",
  "-1": "Last",
};

const clean = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const SHORT_DAYS = new Set(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);

// One [day, time range] pair per schedule entry, e.g. ["Wed", "11:00 am - 12:30 pm"].
export const formatHours = (
  hours: OrganizationFormValues["hours"]
): [string, string][] =>
  (hours || [])
    .filter((h) => h && h.dayOfWeek)
    .map((h) => {
      const interval = INTERVAL_LABELS[String(h.weekOfMonth)] ?? "";
      const day = SHORT_DAYS.has(h.dayOfWeek)
        ? h.dayOfWeek
        : formatShortWeekdayToLong(h.dayOfWeek) || h.dayOfWeek;
      const open = standardTime(h.open) || h.open;
      const close = standardTime(h.close) || h.close;
      const label =
        interval && interval !== "Every" ? `${interval} ${day}` : day;
      return [label, `${open} - ${close}`] as [string, string];
    });

interface Section {
  label: string;
  // Plain lines; empty means "[no data]".
  lines: string[];
  // Column-aligned rows (used for hours); takes precedence over lines.
  rows?: [string, string][];
  // Render the label with an empty value instead of [no data].
  blank?: boolean;
}

const lines = (value: unknown): string[] =>
  clean(value)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

const yesNo = (v: unknown) => (v ? "Yes" : "No");

// The organization's email on file is always the recipient.
export const getRecipient = (org: OrganizationFormValues): string =>
  clean(org.email);

const buildSections = ({
  org,
  categoryNames,
  user,
}: VerificationEmailInput): Section[] => {
  const phone = [
    clean(org.phone),
    clean(org.phoneExt) && `x${clean(org.phoneExt)}`,
  ]
    .filter(Boolean)
    .join(" ");
  const cityLine = [
    [clean(org.city), clean(org.state)].filter(Boolean).join(", "),
    clean(org.zip),
  ]
    .filter(Boolean)
    .join(" ");
  const address = [clean(org.address1), clean(org.address2), cityLine].filter(
    Boolean
  );
  const withNoData = (v: unknown) => clean(v) || NO_DATA;
  return [
    { label: "Name", lines: lines(org.name) },
    {
      label: "Categories",
      lines: [categoryNames.filter(Boolean).join(", ")].filter(Boolean),
    },
    { label: "Hours", lines: [], rows: formatHours(org.hours) },
    { label: "Address", lines: address },
    { label: "Phone", lines: phone ? [phone] : [] },
    { label: "Email", lines: lines(org.email) },
    { label: "Website", lines: lines(org.website) },
    { label: "Languages", lines: lines(org.languages) },
    { label: "Notes", lines: lines(org.notes) },
    { label: "Closure Notes", lines: lines(org.covidNotes) },
    { label: "Hour Notes", lines: lines(org.hoursNotes) },
    {
      label: "Items Available",
      lines: [
        `Baked Goods: ${yesNo(org.foodBakery)}`,
        `Dry Goods: ${yesNo(org.foodDryGoods)}`,
        `Produce: ${yesNo(org.foodProduce)}`,
        `Dairy: ${yesNo(org.foodDairy)}`,
        `Prepared Food: ${yesNo(org.foodPrepared)}`,
        `Meat: ${yesNo(org.foodMeat)}`,
        ...lines(org.items),
        ...lines(org.foodTypes),
      ],
    },
    {
      label: "Social Media",
      lines: [
        `Facebook: ${withNoData(org.facebook)}`,
        `Instagram: ${withNoData(org.instagram)}`,
        `LinkedIn: ${withNoData(org.linkedin)}`,
        `Twitter: ${withNoData(org.twitter)}`,
        `Pinterest: ${withNoData(org.pinterest)}`,
      ],
    },
    {
      label: "Eligibility / Requirements",
      lines: [...lines(org.requirements), ...lines(org.eligibilityNotes)],
    },
    {
      label: `Verification Contact Name`,
      lines: lines(
        [clean(user.firstName), clean(user.lastName)].filter(Boolean).join(" ")
      ),
    },
    // Left blank on purpose: the volunteer fills it in after pasting.
    { label: `Verification Phone`, lines: [], blank: true },
    { label: `Verification Email`, lines: lines(user.email) },
  ];
};

const FONT =
  "font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#222;";
const P = `margin:0 0 12px 0;${FONT}`;

const paragraphsToHtml = (text: string): string =>
  text
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map(
      (p) => `<p style="${P}">${escapeHtml(p).replace(/\r?\n/g, "<br>")}</p>`
    )
    .join("");

const CELL = `padding:0 16px 0 0;${FONT}`;

export const buildVerificationEmail = (
  input: VerificationEmailInput
): VerificationEmail => {
  const { template, org, tokens } = input;
  const subject = applyTokens(template.subject, {
    ...tokens,
    orgName: clean(org.name),
  });
  const intro = applyTokens(template.intro, tokens).trim();
  const sections = buildSections(input);

  const sectionHtml = sections
    .map((s) => {
      const label = `<strong>${escapeHtml(s.label)}</strong>`;
      if (s.rows && s.rows.length > 0) {
        const rows = s.rows
          .map(
            ([day, time]) =>
              `<tr><td style="${CELL}">${escapeHtml(
                day
              )}</td><td style="${CELL}">${escapeHtml(time)}</td></tr>`
          )
          .join("");
        return `<p style="${P}">${label}</p><table style="margin:0 0 12px 0;border-collapse:collapse;" cellpadding="0" cellspacing="0">${rows}</table>`;
      }
      if (s.blank) return `<p style="${P}">${label}<br>&nbsp;</p>`;
      const value = (s.lines.length ? s.lines : [NO_DATA])
        .map(escapeHtml)
        .join("<br>");
      return `<p style="${P}">${label}<br>${value}</p>`;
    })
    .join("");
  const closingHtml = `<p style="${P}">Thank you!<br>The Food Oasis Team<br>${escapeHtml(
    tokens.siteUrl
  )}</p>`;

  const html = `<div style="${FONT}">${paragraphsToHtml(
    intro
  )}${closingHtml}${sectionHtml}</div>`;

  // Title on its own line, value lines below, blank line between sections.
  const sectionText = sections
    .map((s) => {
      if (s.rows && s.rows.length > 0) {
        const width = Math.max(...s.rows.map(([d]) => d.length));
        return [
          s.label,
          ...s.rows.map(([d, t]) => `${d.padEnd(width)}  ${t}`),
        ].join("\n");
      }
      if (s.blank) return `${s.label}\n`;
      return [s.label, ...(s.lines.length ? s.lines : [NO_DATA])].join("\n");
    })
    .join("\n\n");

  const text = [
    intro,
    ["Thank you!", "The Food Oasis Team", tokens.siteUrl].join("\n"),
    sectionText,
  ]
    .filter(Boolean)
    .join("\n\n");

  return { subject, html, text };
};

export const buildMailtoHref = (email: string, subject: string): string =>
  `mailto:${encodeURIComponent(email.trim()).replace(
    /%40/g,
    "@"
  )}?subject=${encodeURIComponent(subject)}`;
