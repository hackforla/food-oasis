/* eslint-disable camelcase */

const functionName = "on_update_stakeholder";

exports.shorthands = undefined;

exports.up = (pgm) => {
  // the name of the table that this function will insert into
  const targetTable = "stakeholder_log";
  const functionDefintion = `
  BEGIN
    INSERT INTO ${targetTable} 
    VALUES (
      NEW.id,
      NEW.stakeholder_id,
      (SELECT greatest(max(version) + 1, 1) FROM ${targetTable} where id = NEW.id),
      NEW.name,
      NEW.address,
      NEW.city,
      NEW.state,
      NEW.zip,
      NEW.phone,
      NEW.latitude,
      NEW.longitude,
      NEW.website,
      NEW.daycode,
      NEW.open,
      NEW.close,
      NEW.daycode1,
      NEW.day1_open,
      NEW.day1_close,
      NEW.daycode2,
      NEW.day2_open,
      NEW.day2_close,
      NEW.daycode3,
      NEW.day3_open,
      NEW.day3_close,
      NEW.daycode4,
      NEW.day4_open,
      NEW.day4_close,
      NEW.daycode5,
      NEW.day5_open,
      NEW.day5_close,
      NEW.daycode6,
      NEW.day6_open,
      NEW.day6_close,
      NEW.daycode7,
      NEW.day7_open,
      NEW.day7_close,
      NEW.year_round,
      NEW.season_open,
      NEW.season_close,
      NEW.fm_id,
      NEW.notes,
      NEW.created_date,
      NEW.created_login_id,
      NEW.modified_date,
      NEW.modified_login_id,
      NEW.verified_date,
      NEW.verified_login_id,
      NEW.requirements,
      NEW.admin_notes,
      NEW.inactive,
      NEW.parent_organization,
      NEW.physical_access,
      NEW.email,
      NEW.items,
      NEW.services,
      NEW.facebook,
      NEW.twitter,
      NEW.pinterest,
      NEW.linkedin,
      NEW.description,
      NEW.approved_date,
      NEW.reviewed_login_id,
      NEW.assigned_login_id,
      NEW.agency_type,
      NEW.assigned_date,
      NEW.rejected_date,
      NEW.review_notes,
      NEW.claimed_login_id,
      NEW.claimed_date,
      NEW.instagram,
      NEW.admin_contact_name,
      NEW.admin_contact_phone,
      NEW.admin_contact_email,
      NEW.donation_contact_name,
      NEW.donation_contact_phone,
      NEW.donation_contact_email,
      NEW.donation_pickup,
      NEW.donation_accept_frozen,
      NEW.donation_accept_refrigerated,
      NEW.donation_accept_perishable,
      NEW.donation_schedule,
      NEW.donation_delivery_instructions,
      NEW.covid_notes,
      NEW.donation_notes,
      NEW.category_notes,
      NEW.eligibility_notes,
      NEW.food_types,
      NEW.languages,
      NEW.verification_status_id,
      NEW.inactive_temporary,
    );
    RETURN NEW;
  END;`;

  // create the stakeholder audit table update function that will be called by the trigger
  pgm.createFunction(
    functionName,
    [],
    {
      returns: "TRIGGER",
      language: "plpgsql",
      replace: true,
      window: false,
      behavior: "STABLE",
      onNull: false,
      parallel: "UNSAFE",
    },
    functionDefintion
  );
};

exports.down = (pgm) => {
  pgm.dropFunction(functionName, [], { ifExists: true, cascade: true });
};
