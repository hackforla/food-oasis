import db from "./db";
import {
  EmailTemplate,
  EmailTemplateKey,
  EMAIL_TEMPLATE_KEYS,
} from "../../types/email-template-types";

// NOTE: these defaults are duplicated in the seed of
// server/migrations/1792420158492_add-email-template-table.js (a JS migration
// cannot import this module). Keep the two copies in sync by hand.
const DEFAULTS: Record<EmailTemplateKey, EmailTemplate> = {
  verification: {
    subject: 'Please review the listing for "{{ORG_NAME}}" at {{SITE_URL}}',
    intro: [
      "Hello!",
      "We are FoodOasis.net, an online directory of free food pantries and meal programs. Our goal is to help people in {{REGION_NAME}} find free food.",
      "Your organization is listed on our website as a food pantry or a meal program.",
      "This is the email address we have on file for your organization. (If there is a better one to ask these questions, please reply with that email address.)",
      "Please review the information we have for your organization on our website.",
      'If everything is correct: Please reply with "This is correct."',
      "Corrections? Please reply to this email with your corrections and we will update your listing.",
      "Questions? Please reply to this email.",
    ].join("\n\n"),
  },
};

const isKnownKey = (key: string): key is EmailTemplateKey =>
  (EMAIL_TEMPLATE_KEYS as readonly string[]).includes(key);

const getByKey = async (
  key: EmailTemplateKey,
  tenantId: number
): Promise<EmailTemplate> => {
  const sql = `
    select subject, intro
    from email_template
    where tenant_id = $<tenantId>
      and key = $<key>
  `;
  const row = await db.oneOrNone<EmailTemplate>(sql, { tenantId, key });
  return row ?? { ...DEFAULTS[key] };
};

const upsert = async (
  key: EmailTemplateKey,
  tenantId: number,
  fields: { subject?: string; intro?: string },
  updatedBy: number | null
): Promise<EmailTemplate> => {
  // updated_by is resolved through a lookup so a JWT id that is not (or no
  // longer) a login stores NULL instead of violating the foreign key.
  // Fields not provided keep their existing value (or the built-in default
  // when the tenant has no row yet).
  const sql = `
    insert into email_template (tenant_id, key, subject, intro, updated_at, updated_by)
    values (
      $<tenantId>,
      $<key>,
      coalesce($<subject>, $<defaultSubject>),
      coalesce($<intro>, $<defaultIntro>),
      now(),
      (select id from login where id = $<updatedBy>)
    )
    on conflict (tenant_id, key) do update set
      subject = coalesce($<subject>, email_template.subject),
      intro = coalesce($<intro>, email_template.intro),
      updated_at = now(),
      updated_by = (select id from login where id = $<updatedBy>)
    returning subject, intro
  `;
  return db.one<EmailTemplate>(sql, {
    tenantId,
    key,
    subject: fields.subject ?? null,
    intro: fields.intro ?? null,
    defaultSubject: DEFAULTS[key].subject,
    defaultIntro: DEFAULTS[key].intro,
    updatedBy,
  });
};

export default { isKnownKey, getByKey, upsert };
