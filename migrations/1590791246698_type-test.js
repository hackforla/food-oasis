/* eslint-disable camelcase */
/*
CREATE TYPE public.stakeholder_hours AS
(
	week_of_month integer,
	day_of_week character varying,
	open character varying,
	close character varying
);
*/

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createType(
    { schema: "public", name: "stakeholder_schedule_type" },
    {
      week_of_month: { type: "integer" },
      day_of_week: { type: "string" },
      open: { type: "string" },
      close: { type: "string" },
    }
  );
};

exports.down = (pgm) => {
  pgm.dropType(
    { schema: "public", name: "stakeholder_schedule_type" },
    { ifExists: true }
  );
};
