/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  CREATE TABLE tenant (id integer primary key, 
    name character varying NOT NULL,
    code character varying NOT NULL)
  `);

  pgm.sql(`
  INSERT INTO tenant (id, name, code)
  VALUES (1, 'Food Oasis Los Angeles', 'FOLA');
  `);

  pgm.sql(`
  INSERT INTO tenant (id, name, code)
  VALUES (2, 'Food Oasis California', 'FOCA');
  `);
  pgm.sql(
    `ALTER TABLE public.stakeholder_best 
    ADD tenant_id integer NOT NULL DEFAULT 1;`
  );
  pgm.sql(
    `ALTER TABLE public.stakeholder_best
    ADD CONSTRAINT fk_stakeholder_best_tenant
    FOREIGN KEY(tenant_id) REFERENCES tenant(id)`
  );
  pgm.sql(
    `ALTER TABLE public.stakeholder_log 
    ADD tenant_id integer NOT NULL DEFAULT 1;`
  );
  pgm.sql(
    `ALTER TABLE public.stakeholder_log
    ADD CONSTRAINT fk_stakeholder_log_tenant
    FOREIGN KEY(tenant_id) REFERENCES tenant(id)`
  );
  pgm.sql(
    `ALTER TABLE public.stakeholder 
    ADD tenant_id integer NOT NULL DEFAULT 1;`
  );
  pgm.sql(
    `ALTER TABLE public.stakeholder
    ADD CONSTRAINT fk_stakeholder_tenant
    FOREIGN KEY(tenant_id) REFERENCES tenant(id)`
  );
};

exports.down = (pgm) => {
  pgm.sql(`
  ALTER TABLE stakeholder DROP COLUMN tenant_id;
  `);
  pgm.sql(`
  ALTER TABLE stakeholder_log DROP COLUMN tenant_id;
  `);
  pgm.sql(`
  ALTER TABLE stakeholder_best DROP COLUMN tenant_id;
  `);
  pgm.sql(`
  DROP TABLE tenant;
  `);
};
