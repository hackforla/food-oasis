/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  // NOTE: the options in the where_to_prompt check are duplicated in
  // server/types/survey-types.ts, client/src/types/Survey.ts and
  // client/src/Routes.tsx. These need to be kept in sync by hand.

  // Survey table stores all historical surveys; current survey is
  // determined by which survey for a given tenant has the highest `id`
  // (tenant_id, id) index supports this lookup.
  // Highest id = current survey logic used by getPublicByTenantId,
  // getAdminByTenantId and updateCurrent in survey-service.ts.

  pgm.sql(`
    CREATE TABLE IF NOT EXISTS survey (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    tenant_id integer NOT NULL,
    time_to_prompt_seconds integer NOT NULL,
    where_to_prompt text NOT NULL,
    title text NOT NULL,
    prompt text NOT NULL,
    links jsonb NOT NULL,
    is_enabled boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    updated_by integer,
    CONSTRAINT fk_survey_updated_by
      FOREIGN KEY (updated_by) REFERENCES login(id) ON DELETE SET NULL,
    CONSTRAINT fk_survey_tenant
      FOREIGN KEY (tenant_id) REFERENCES tenant(id),
    CONSTRAINT chk_survey_where_to_prompt
      CHECK (where_to_prompt IN (
        'all', '/', '/organizations', '/suggestion',
        '/donate', '/about', '/faqs', '/contact'
      )),
    CONSTRAINT chk_survey_links_not_empty
      CHECK (jsonb_typeof(links) = 'array' AND jsonb_array_length(links) >= 1),
    CONSTRAINT chk_survey_time_to_prompt_seconds
      CHECK (time_to_prompt_seconds >= 0)
    );
    CREATE INDEX IF NOT EXISTS idx_survey_tenant_id ON survey (tenant_id, id);
    `);
  pgm.sql(`
    INSERT INTO survey (tenant_id, time_to_prompt_seconds, where_to_prompt, title, prompt, links)
    SELECT id, 0, 'all', 'Help us improve!', 'Have a minute to take a quick survey?',
      '[
        {
          "display": "text",
          "label": "No thanks",
          "action": "optOut"
        },
        {
          "display": "button",
          "label": "Yes",
          "url": "https://docs.google.com/forms/d/e/1FAIpQLSdAhi_nMKQfWVHjfpl1ZkmymBTt8BW7YNqVIOJ4JKYgSL4O3g/viewform",
          "action": "navigate"
        }
      ]'::jsonb
    FROM tenant
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql(`DROP TABLE IF EXISTS survey;`);
};
