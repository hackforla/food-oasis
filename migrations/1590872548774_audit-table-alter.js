/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropColumn("stakeholder_log", "stakeholder_id", { ifExists: true });
  pgm.dropColumn("stakeholder_log", "rejected_date", { ifExists: true });
  pgm.dropIndex("stakeholder_log", ["id", "version"], { ifExists: true });
  pgm.sql(`

    ALTER TABLE public.stakeholder_log
    DROP CONSTRAINT stakeholder_log_pkey;

    ALTER TABLE public.stakeholder_log
    ADD CONSTRAINT stakeholder_log_pkey PRIMARY KEY (id, version);

    ALTER TABLE public.stakeholder_log
    ADD COLUMN address_1 text DEFAULT '';

    ALTER TABLE public.stakeholder_log
    ADD COLUMN submitted_date timestamp with time zone;

    ALTER TABLE public.stakeholder_log
    ADD COLUMN submitted_login_id integer;

    ALTER TABLE public.stakeholder_log
    ADD COLUMN v_name boolean NOT NULL DEFAULT false;

    ALTER TABLE public.stakeholder_log
    ADD COLUMN v_categories boolean NOT NULL DEFAULT false;

    ALTER TABLE public.stakeholder_log
    ADD COLUMN v_address boolean NOT NULL DEFAULT false;

    ALTER TABLE public.stakeholder_log
    ADD COLUMN v_email boolean NOT NULL DEFAULT false;
    
    ALTER TABLE public.stakeholder_log
    ADD COLUMN v_phone boolean NOT NULL DEFAULT false;

    ALTER TABLE public.stakeholder_log
    ADD COLUMN v_hours boolean NOT NULL DEFAULT false;

    CREATE UNIQUE INDEX "IX_stakeholder_log"
    ON public.stakeholder_log USING btree
    (id ASC NULLS LAST, version ASC NULLS LAST)
    TABLESPACE pg_default;
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
    ALTER TABLE public.stakeholder_log
    DROP COLUMN address_1;

    ALTER TABLE public.stakeholder_log
    DROP COLUMN submitted_date ;

    ALTER TABLE public.stakeholder_log
    DROP COLUMN submitted_login_id;

    ALTER TABLE public.stakeholder_log
    DROP COLUMN v_name;

    ALTER TABLE public.stakeholder_log
    DROP COLUMN v_categories;

    ALTER TABLE public.stakeholder_log
    DROP COLUMN v_address ;

    ALTER TABLE public.stakeholder_log
    DROP COLUMN v_email ;
    
    ALTER TABLE public.stakeholder_log
    DROP COLUMN v_phone;

    ALTER TABLE public.stakeholder_log
    DROP COLUMN v_hours ;

    ALTER TABLE public.stakeholder_log
    ADD COLUMN rejected_date timestamp without time zone;
    `);
};
