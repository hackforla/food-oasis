/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(
    `
    CREATE TABLE IF NOT EXISTS public.neighborhood
    (
        id integer NOT NULL,
        name text COLLATE pg_catalog."default" NOT NULL,
        website text COLLATE pg_catalog."default",
        empower_link text COLLATE pg_catalog."default",
        nc_id integer,
        certified timestamp without time zone,
        service_region text COLLATE pg_catalog."default",
        geometry text COLLATE pg_catalog."default",
        CONSTRAINT pk_neighborhood PRIMARY KEY (id)
    )
    WITH (
        OIDS = FALSE
    );

    ALTER TABLE public.stakeholder
    ADD COLUMN neighborhood_id integer NULL;

    ALTER TABLE public.stakeholder_log
    ADD COLUMN neighborhood_id integer NULL;

  `
  );

  pgm.createCol;
};

exports.down = () => {};
