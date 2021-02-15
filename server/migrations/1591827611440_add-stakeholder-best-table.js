/* eslint-disable camelcase */

// Create stakeholder_best with identical schema to stakeholder

// the name of the trigger and the function that it calls
const TRIGGER_NAME = "on_insert_or_update_stakeholder";
// the audit table that is written to by the triggered function
const TARGET_TABLE = { schema: "public", name: "stakeholder_log" };

// the event source that triggers the function call
const SOURCE_TABLE = { schema: "public", name: "stakeholder" };

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(
    { schema: "public", name: "stakeholder_best" },
    {},
    { like: "stakeholder" }
  );

  pgm.addColumns("stakeholder_best", {
    is_verified: { type: "boolean", notNull: true, default: "false" },
  });

  pgm.addConstraint(
    { schema: "public", name: "stakeholder_best" },
    "stakeholder_best_pk",
    "PRIMARY KEY(id)"
  );

  pgm.addConstraint(
    { schema: "public", name: "stakeholder_best" },
    "fk_stakeholder_neighborhood",
    "FOREIGN KEY (neighborhood_id) REFERENCES neighborhood(id)"
  );

  const triggerDef = `
  CREATE OR REPLACE FUNCTION ${TRIGGER_NAME}()
RETURNS trigger
LANGUAGE 'plpgsql'
COST 100
VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
  best_row stakeholder_log%ROWTYPE;
  latest_version INTEGER;
  is_verified BOOLEAN := false;
BEGIN
    INSERT INTO ${TARGET_TABLE.schema}.${TARGET_TABLE.name}
    (id, version, name, address_1, address_2, city, state, zip,
      phone, latitude, longitude, website, fm_id, notes,
      created_date, created_login_id, modified_date, modified_login_id,
      requirements, admin_notes, inactive, parent_organization,
      physical_access, email, items, services, facebook, twitter,
      pinterest,
      linkedin,
      description,
      approved_date,
      reviewed_login_id,
      assigned_login_id,
      agency_type,
      assigned_date,
      review_notes,
      claimed_login_id,
      claimed_date,
      instagram,
      admin_contact_name,
      admin_contact_phone,
      admin_contact_email,
      donation_contact_name,
      donation_contact_phone,
      donation_contact_email,
      donation_pickup,
      donation_accept_frozen,
      donation_accept_refrigerated,
      donation_accept_perishable,
      donation_schedule,
      donation_delivery_instructions,
      covid_notes,
      donation_notes,
      category_notes,
      eligibility_notes,
      food_types,
      languages,
      verification_status_id,
      inactive_temporary,
      v_name, v_categories, v_address, v_email, v_phone, v_hours,
      neighborhood_id,
      complete_critical_percent
      )
    VALUES (
      NEW.id,
      (SELECT greatest(max(version) + 1, 1) FROM ${TARGET_TABLE.schema}.${TARGET_TABLE.name} where id = NEW.id),
      NEW.name,
      NEW.address_1,
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
      NEW.v_name,
      NEW.v_categories,
      NEW.v_address,
      NEW.v_email,
      NEW.v_phone,
      NEW.v_hours,
      NEW.neighborhood_id,
      NEW.complete_critical_percent
  ) RETURNING version INTO latest_version;

  -- We might need to select a new row as our "best" row for this stakeholder.
  -- "best" is defined as the highest version in stakeholder_log with verification_status_id=4
  -- (4 means "verified").
  -- Barring that, the highest version is the "best".

  SELECT * INTO best_row FROM stakeholder_log
    WHERE id=NEW.id
      AND verification_status_id=4
      AND version=(select MAX(version) from stakeholder_log where id=NEW.id AND verification_status_id=4);

  -- Is there anything in best_row? (there might not be, if there are no verified rows)
  IF NOT FOUND THEN
    -- Fall back on finding the highest version number, which *just so happens* to be this row!
    SELECT * INTO best_row FROM stakeholder_log
      WHERE id=NEW.id
        AND version=latest_version;
  ELSE
    is_verified = true;
  END IF;

  IF FOUND THEN
    DELETE FROM stakeholder_best where id=best_row.id;
    INSERT INTO stakeholder_best
    (id, name, address_1, address_2, city, state, zip,
      phone, latitude, longitude, website, fm_id, notes,
      created_date, created_login_id, modified_date, modified_login_id,
      requirements, admin_notes, inactive, parent_organization,
      physical_access, email, items, services, facebook, twitter,
      pinterest,
      linkedin,
      description,
      approved_date,
      reviewed_login_id,
      assigned_login_id,
      agency_type,
      assigned_date,
      review_notes,
      claimed_login_id,
      claimed_date,
      instagram,
      admin_contact_name,
      admin_contact_phone,
      admin_contact_email,
      donation_contact_name,
      donation_contact_phone,
      donation_contact_email,
      donation_pickup,
      donation_accept_frozen,
      donation_accept_refrigerated,
      donation_accept_perishable,
      donation_schedule,
      donation_delivery_instructions,
      covid_notes,
      donation_notes,
      category_notes,
      eligibility_notes,
      food_types,
      languages,
      verification_status_id,
      inactive_temporary,
      v_name, v_categories, v_address, v_email, v_phone, v_hours,
      neighborhood_id,
      complete_critical_percent, is_verified
      )
    VALUES (
      best_row.id,
      best_row.name,
      best_row.address_1,
      best_row.address_2,
      best_row.city,
      best_row.state,
      best_row.zip,
      best_row.phone,
      best_row.latitude,
      best_row.longitude,
      best_row.website,
      best_row.fm_id,
      best_row.notes,
      best_row.created_date,
      best_row.created_login_id,
      best_row.modified_date,
      best_row.modified_login_id,
      best_row.requirements,
      best_row.admin_notes,
      best_row.inactive,
      best_row.parent_organization,
      best_row.physical_access,
      best_row.email,
      best_row.items,
      best_row.services,
      best_row.facebook,
      best_row.twitter,
      best_row.pinterest,
      best_row.linkedin,
      best_row.description,
      best_row.approved_date,
      best_row.reviewed_login_id,
      best_row.assigned_login_id,
      best_row.agency_type,
      best_row.assigned_date,
      best_row.review_notes,
      best_row.claimed_login_id,
      best_row.claimed_date,
      best_row.instagram,
      best_row.admin_contact_name,
      best_row.admin_contact_phone,
      best_row.admin_contact_email,
      best_row.donation_contact_name,
      best_row.donation_contact_phone,
      best_row.donation_contact_email,
      best_row.donation_pickup,
      best_row.donation_accept_frozen,
      best_row.donation_accept_refrigerated,
      best_row.donation_accept_perishable,
      best_row.donation_schedule,
      best_row.donation_delivery_instructions,
      best_row.covid_notes,
      best_row.donation_notes,
      best_row.category_notes,
      best_row.eligibility_notes,
      best_row.food_types,
      best_row.languages,
      best_row.verification_status_id,
      best_row.inactive_temporary,
      best_row.v_name,
      best_row.v_categories,
      best_row.v_address,
      best_row.v_email,
      best_row.v_phone,
      best_row.v_hours,
      best_row.neighborhood_id,
      best_row.complete_critical_percent,
      is_verified);
  ELSE
    -- should probably log some sort of error, because this should never happen
    RAISE EXCEPTION 'Could not find a best version of stakeholder id %', NEW.id;
  END IF;

  RETURN NEW;
END;
$BODY$;`;
  // create the function
  pgm.sql(triggerDef);

  // create the trigger
  pgm.dropTrigger(SOURCE_TABLE, TRIGGER_NAME, {
    ifExists: true,
  });
  pgm.createTrigger(SOURCE_TABLE, TRIGGER_NAME, {
    when: "AFTER",
    operation: ["INSERT", "UPDATE"],
    function: TRIGGER_NAME,
    functionParams: [],
    level: "ROW",
    definition: triggerDef,
  });

  // For an initial backfill of the data for this table, TODO
  // (whatever works in the trigger)
  const backfill = `DO
  $do$
  DECLARE
    ids INTEGER[] := ARRAY(SELECT DISTINCT(id) from stakeholder); -- get all stakeholders
    best_row stakeholder_log%ROWTYPE;
    row_id INTEGER;
    is_verified BOOLEAN := false;
  BEGIN
    FOREACH row_id IN ARRAY ids
    LOOP
      is_verified = false;
      -- Find our "best" row for this stakeholder.
      -- "best" is defined as the highest version in stakeholder_log with verification_status_id=4
      -- (4 means "verified").
      -- Barring that, the highest version, period, is the "best".
      SELECT * INTO best_row FROM stakeholder_log
        WHERE id=row_id
          AND verification_status_id=4
          AND version=(select MAX(version) from stakeholder_log where id=row_id AND verification_status_id=4);

      -- Is there anything in best_row? (there might not be, if there are no verified rows)
      IF NOT FOUND THEN
        -- Fall back on finding the highest version number
        SELECT * INTO best_row FROM stakeholder_log
          WHERE id=row_id
            AND version=(select MAX(version) from stakeholder_log where id=row_id);
      ELSE
        is_verified = true;
      END IF;

      IF FOUND THEN
        DELETE FROM stakeholder_best where id=best_row.id;
        INSERT INTO stakeholder_best
        (id, name, address_1, address_2, city, state, zip,
          phone, latitude, longitude, website, fm_id, notes,
          created_date, created_login_id, modified_date, modified_login_id,
          requirements, admin_notes, inactive, parent_organization,
          physical_access, email, items, services, facebook, twitter,
          pinterest,
          linkedin,
          description,
          approved_date,
          reviewed_login_id,
          assigned_login_id,
          agency_type,
          assigned_date,
          review_notes,
          claimed_login_id,
          claimed_date,
          instagram,
          admin_contact_name,
          admin_contact_phone,
          admin_contact_email,
          donation_contact_name,
          donation_contact_phone,
          donation_contact_email,
          donation_pickup,
          donation_accept_frozen,
          donation_accept_refrigerated,
          donation_accept_perishable,
          donation_schedule,
          donation_delivery_instructions,
          covid_notes,
          donation_notes,
          category_notes,
          eligibility_notes,
          food_types,
          languages,
          verification_status_id,
          inactive_temporary,
          v_name, v_categories, v_address, v_email, v_phone, v_hours,
          neighborhood_id,
          complete_critical_percent, is_verified
          )
        VALUES (
          best_row.id,
          best_row.name,
          best_row.address_1,
          best_row.address_2,
          best_row.city,
          best_row.state,
          best_row.zip,
          best_row.phone,
          best_row.latitude,
          best_row.longitude,
          best_row.website,
          best_row.fm_id,
          best_row.notes,
          best_row.created_date,
          best_row.created_login_id,
          best_row.modified_date,
          best_row.modified_login_id,
          best_row.requirements,
          best_row.admin_notes,
          best_row.inactive,
          best_row.parent_organization,
          best_row.physical_access,
          best_row.email,
          best_row.items,
          best_row.services,
          best_row.facebook,
          best_row.twitter,
          best_row.pinterest,
          best_row.linkedin,
          best_row.description,
          best_row.approved_date,
          best_row.reviewed_login_id,
          best_row.assigned_login_id,
          best_row.agency_type,
          best_row.assigned_date,
          best_row.review_notes,
          best_row.claimed_login_id,
          best_row.claimed_date,
          best_row.instagram,
          best_row.admin_contact_name,
          best_row.admin_contact_phone,
          best_row.admin_contact_email,
          best_row.donation_contact_name,
          best_row.donation_contact_phone,
          best_row.donation_contact_email,
          best_row.donation_pickup,
          best_row.donation_accept_frozen,
          best_row.donation_accept_refrigerated,
          best_row.donation_accept_perishable,
          best_row.donation_schedule,
          best_row.donation_delivery_instructions,
          best_row.covid_notes,
          best_row.donation_notes,
          best_row.category_notes,
          best_row.eligibility_notes,
          best_row.food_types,
          best_row.languages,
          best_row.verification_status_id,
          best_row.inactive_temporary,
          best_row.v_name,
          best_row.v_categories,
          best_row.v_address,
          best_row.v_email,
          best_row.v_phone,
          best_row.v_hours,
          best_row.neighborhood_id,
          best_row.complete_critical_percent, is_verified);
      ELSE
        -- should probably log some sort of error, because this should never happen
        RAISE EXCEPTION 'Could not find a best version of stakeholder id %', row_id;
      END IF;

    END LOOP;
  END
  $do$;`;
  pgm.sql(backfill);
};

exports.down = (pgm) => {
  pgm.dropTable({ schema: "public", name: "stakeholder_best" });
};
