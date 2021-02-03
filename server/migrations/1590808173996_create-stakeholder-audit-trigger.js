/* eslint-disable camelcase */

// the name of the trigger and the function that it calls
const TRIGGER_NAME = "on_insert_or_update_stakeholder";
// the audit table that is written to by the triggered function
const TARGET_TABLE = { schema: "public", name: "stakeholder_log" };

// the event source that triggers the function call
const SOURCE_TABLE = { schema: "public", name: "stakeholder" };

exports.shorthands = undefined;

exports.up = (pgm) => {
  // the name of the table that this function will insert into
  const functionDefintion = `
  CREATE OR REPLACE FUNCTION ${TRIGGER_NAME} ()
    RETURNS TRIGGER
    AS $$
  BEGIN
      INSERT INTO ${TARGET_TABLE.schema}.${TARGET_TABLE.name} 
      VALUES (
        NEW.id,
        (SELECT greatest(max(version) + 1, 1) FROM ${TARGET_TABLE.schema}.${TARGET_TABLE.name} where id = NEW.id),
        NEW.name,
        NEW.address_2,
        NEW.city,
        NEW.state,
        NEW.zip,
        NEW.phone,
        NEW.latitude,
        NEW.longitude,
        NEW.website,
        NEW.fm_id,
        NEW.notes,
        NEW.created_date,
        NEW.created_login_id,
        NEW.modified_date,
        NEW.modified_login_id,
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
        NEW.inactive_temporary
    );
    RETURN NEW;
  END;
  $$
  LANGUAGE 'plpgsql';`;

  // create the function
  pgm.sql(functionDefintion);

  // create the trigger
  pgm.createTrigger(SOURCE_TABLE, TRIGGER_NAME, {
    when: "AFTER",
    operation: ["INSERT", "UPDATE"],
    function: TRIGGER_NAME,
    functionParams: [],
    level: "ROW",
    definition: functionDefintion,
  });
};

exports.down = (pgm) => {
  pgm.dropTrigger(SOURCE_TABLE, TRIGGER_NAME, {
    ifExists: true,
    cascade: true,
  });
  pgm.dropFunction(TRIGGER_NAME);
};
