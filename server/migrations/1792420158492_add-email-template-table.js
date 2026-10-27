/* eslint-disable camelcase */

exports.shorthands = undefined;

// NOTE: these defaults are duplicated in
// server/app/services/email-template-service.ts (DEFAULTS), which GET falls
// back to when a tenant has no row. A JS migration cannot import that TS
// module, so keep the two copies in sync by hand.
const DEFAULT_SUBJECT =
  'Please review the listing for "{{ORG_NAME}}" at {{SITE_URL}}';

const DEFAULT_INTRO = [
  "Hello!",
  "We are FoodOasis.net, an online directory of free food pantries and meal programs. Our goal is to help people in {{REGION_NAME}} find free food.",
  "Your organization is listed on our website as a food pantry or a meal program.",
  "This is the email address we have on file for your organization. (If there is a better one to ask these questions, please reply with that email address.)",
  "Please review the information we have for your organization on our website.",
  'If everything is correct: Please reply with "This is correct."',
  "Corrections? Please reply to this email with your corrections and we will update your listing.",
  "Questions? Please reply to this email.",
].join("\n\n");

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS email_template (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      tenant_id integer NOT NULL,
      key text NOT NULL,
      subject text NOT NULL,
      intro text NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now(),
      updated_by integer,
      CONSTRAINT fk_email_template_tenant
        FOREIGN KEY (tenant_id) REFERENCES tenant(id),
      -- SET NULL so deleting a login is never blocked by this column
      CONSTRAINT fk_email_template_updated_by
        FOREIGN KEY (updated_by) REFERENCES login(id) ON DELETE SET NULL,
      CONSTRAINT uq_email_template_tenant_key UNIQUE (tenant_id, key)
    );
  `);
  pgm.sql(`
    INSERT INTO email_template (tenant_id, key, subject, intro)
    SELECT id, 'verification', ${quote(DEFAULT_SUBJECT)}, ${quote(DEFAULT_INTRO)}
    FROM tenant
    ON CONFLICT (tenant_id, key) DO NOTHING;
  `);
};

function quote(value) {
  return "'" + value.replace(/'/g, "''") + "'";
}

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE IF EXISTS email_template;`);
};
