/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  CREATE TABLE parent_organization (
    id integer primary key,
    name character varying NOT NULL,
    code character varying NOT NULL
    );
  `);
  pgm.sql(
    `ALTER TABLE public.stakeholder
      ADD parent_organization_id int4 NULL;
    ALTER TABLE public.stakeholder
      ADD CONSTRAINT fk_stakeholder_parent_organization FOREIGN KEY (parent_organization_id) REFERENCES public.parent_organization(id);
    ;`
  );
};

exports.down = (pgm) => {
  pgm.sql(`
  DROP TABLE parent_organization;
  `);
  pgm.sql(`
  ALTER TABLE stakeholder DROP COLUMN parent_organization_id;
  `);
};
