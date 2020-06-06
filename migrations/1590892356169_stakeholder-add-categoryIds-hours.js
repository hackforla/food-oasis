/* eslint-disable camelcase */
/*
    Denormalize stakeholder_schedule and stakeholder_category
    into array-values columns hours and category_ids in the
    stakeholder table itself. This eliminates the need for
    subqueries to get hours and category_ids when fetching
    stakeholders, and makes the stakeholder_log table 
    self-contained.
*/

exports.shorthands = undefined;

// the name of the trigger and the function that it calls
const TRIGGER_NAME = "on_insert_or_update_stakeholder";
// the audit table that is written to by the triggered function
const TARGET_TABLE = { schema: "public", name: "stakeholder_log" };

// the event source that triggers the function call
const SOURCE_TABLE = { schema: "public", name: "stakeholder" };

exports.up = (pgm) => {
  pgm.sql(
    `
        ALTER TABLE public.stakeholder
        ADD COLUMN hours stakeholder_hours[];

        ALTER TABLE public.stakeholder
        ADD COLUMN category_ids integer[];

        ALTER TABLE public.stakeholder_log
        ADD COLUMN hours stakeholder_hours[];

        ALTER TABLE public.stakeholder_log
        ADD COLUMN category_ids integer[];

        `
  );

  // the name of the table that this function will insert into
  const functionDefintion = `
    CREATE OR REPLACE FUNCTION ${TRIGGER_NAME} ()
      RETURNS TRIGGER
      AS $$
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
          hours,
          category_ids,
          v_name, v_categories, v_address, v_email, v_phone, v_hours
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
          NEW.hours,
          NEW.category_ids,
          NEW.v_name, 
          NEW.v_categories, 
          NEW.v_address, 
          NEW.v_email, 
          NEW.v_phone, 
          NEW.v_hours
      );
      RETURN NEW;
    END;
    $$
    LANGUAGE 'plpgsql';`;

  // create the function
  pgm.sql(functionDefintion);

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
    definition: functionDefintion,
  });

  pgm.sql(
    `
    with cat as (
        select sc.stakeholder_id, array_agg(sc.category_id ) as category_ids
        from stakeholder_category sc 
        group by sc.stakeholder_id
    )
    update stakeholder set
        category_ids = cat.category_ids
    from cat
    where stakeholder.id = cat.stakeholder_id;
    
    with h as (
        select sc.stakeholder_id,
        array_agg((sc.week_of_month, sc.day_of_week, sc.open, sc.close)::stakeholder_hours ) as hours
        from stakeholder_schedule sc
        group by sc.stakeholder_id
    )
    update stakeholder set
        hours = h.hours
    from h
    where stakeholder.id = h.stakeholder_id
    `
  );
};

exports.down = (pgm) => {
  pgm.dropColumn("stakeholder", "hours", { ifExists: true });
  pgm.dropColumn("stakeholder", "category_ids", { ifExists: true });
  pgm.dropColumn("stakeholder_log", "hours", { ifExists: true });
  pgm.dropColumn("stakeholder_log", "category_ids", { ifExists: true });
  pgm.dropTrigger(SOURCE_TABLE, TRIGGER_NAME, {
    ifExists: true,
    cascade: true,
  });
  pgm.dropFunction(TRIGGER_NAME);
};
