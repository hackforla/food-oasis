/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  UPDATE stakeholder SET
	  complete_critical_percent = CASE WHEN (inactive OR inactive_temporary) THEN
	    (v_name::integer + v_categories::integer + v_address::integer) *100/3
  ELSE
	  (v_name::integer + v_categories::integer + v_address::integer
	  + v_email::integer + v_phone::integer + v_hours::integer 
	  + v_food_types::integer) *100/7
  END
`);
};

exports.down = () => {
  // not reversible
};
