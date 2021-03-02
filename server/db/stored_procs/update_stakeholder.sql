

CREATE OR REPLACE PROCEDURE update_stakeholder(
  s_name VARCHAR, s_address_1 VARCHAR, s_address_2 VARCHAR, s_city VARCHAR, s_state VARCHAR, s_zip VARCHAR,
  s_phone VARCHAR, s_latitude NUMERIC, s_longitude NUMERIC, s_website VARCHAR, s_inactive BOOLEAN,
  s_notes VARCHAR, s_requirements VARCHAR, s_admin_notes VARCHAR, s_parent_organization VARCHAR,
  s_physical_access VARCHAR, s_email VARCHAR, s_items VARCHAR, s_services VARCHAR, s_facebook VARCHAR,
  s_twitter VARCHAR, s_pinterest VARCHAR, s_linkedin VARCHAR, s_description VARCHAR,
  s_modified_login_id INT, s_submitted_date TIMESTAMPTZ,
  s_submitted_login_id INT, s_approved_date TIMESTAMP,
  s_rejected_date TIMESTAMP, s_reviewed_login_id INT,
  s_assigned_date TIMESTAMP, s_assigned_login_id INT, s_claimed_date TIMESTAMP,
  s_claimed_login_id INT, s_review_notes VARCHAR, s_instagram VARCHAR,
  s_admin_contact_name VARCHAR, s_admin_contact_phone VARCHAR, s_admin_contact_email VARCHAR,
  s_donation_contact_name VARCHAR, s_donation_contact_phone VARCHAR,
  s_donation_contact_email VARCHAR, s_donation_pickup BOOLEAN,
  s_donation_accept_frozen BOOLEAN, s_donation_accept_refrigerated BOOLEAN,
  s_donation_accept_perishable BOOLEAN, s_donation_schedule VARCHAR,
  s_donation_delivery_instructions VARCHAR, s_donation_notes VARCHAR,
  s_covid_notes VARCHAR, s_category_notes VARCHAR, s_eligibility_notes VARCHAR,
  s_food_types VARCHAR, s_languages VARCHAR, s_v_name BOOLEAN, s_v_categories BOOLEAN,
  s_v_address BOOLEAN, s_v_phone BOOLEAN, s_v_email BOOLEAN, s_v_hours BOOLEAN,
  s_verification_status_id INT, s_inactive_temporary BOOLEAN,
  s_id INT, categories INT[], hours_array stakeholder_hours[])
AS $$
DECLARE cat INT;
DECLARE hours_element stakeholder_hours;
BEGIN
    -- update the stakeholder table itself
    UPDATE stakeholder
    SET
      name = s_name,
      address_1 = s_address_1,
      address_2 = s_address_2,
      city = s_city,
      state = s_state,
      zip = s_zip,
      phone = s_phone,
      latitude = s_latitude,
      longitude = s_longitude,
      website = s_website,
      inactive = s_inactive,
      notes = s_notes,
      requirements = s_requirements,
      admin_notes = s_admin_notes,
      parent_organization = s_parent_organization,
      physical_access = s_physical_access,
      email = s_email,
      items = s_items,
      services = s_services,
      facebook = s_facebook,
      twitter = s_twitter,
      pinterest = s_pinterest,
      linkedin = s_linkedin,
      description = s_description,
      modified_login_id = s_modified_login_id,
      modified_date = CURRENT_TIMESTAMP,
      submitted_date = s_submitted_date,
      submitted_login_id = s_submitted_login_id,
      approved_date = s_approved_date,
      rejected_date = s_rejected_date,
      reviewed_login_id = s_reviewed_login_id,
      assigned_date = s_assigned_date,
      assigned_login_id = s_assigned_login_id,
      claimed_date = s_claimed_date,
      claimed_login_id = s_claimed_login_id,
      review_notes = s_review_notes,
      instagram = s_instagram,
      admin_contact_name = s_admin_contact_name,
      admin_contact_phone = s_admin_contact_phone,
      admin_contact_email = s_admin_contact_email,
      donation_contact_name = s_donation_contact_name,
      donation_contact_phone = s_donation_contact_phone,
      donation_contact_email = s_donation_contact_email,
      donation_pickup = s_donation_pickup,
      donation_accept_frozen = s_donation_accept_frozen,
      donation_accept_refrigerated = s_donation_accept_refrigerated,
      donation_accept_perishable = s_donation_accept_perishable,
      donation_schedule = s_donation_schedule,
      donation_delivery_instructions = s_donation_delivery_instructions,
      donation_notes = s_donation_notes,
      covid_notes = s_covid_notes,
      category_notes = s_category_notes,
      eligibility_notes = s_eligibility_notes,
      food_types = s_food_types,
      languages = s_languages,
      v_name = s_v_name,
      v_categories = s_v_categories,
      v_address = s_v_address,
      v_phone = s_v_phone,
      v_email = s_v_email,
      v_hours = s_v_hours,
      verification_status_id = s_verification_status_id,
      inactive_temporary = s_inactive_temporary,
      hours = hours_array,
      category_ids = categories
    WHERE
      id=s_id;

    -- delete previous stakeholder category
    DELETE FROM stakeholder_category WHERE stakeholder_id=s_id;
    -- ...and insert new stakeholder category(s)
    FOREACH cat IN ARRAY categories
      LOOP
        INSERT INTO stakeholder_category
        (stakeholder_id, category_id)
        VALUES (s_id, cat);
      END LOOP;
    -- delete previous schedule
    DELETE FROM stakeholder_schedule WHERE stakeholder_id=s_id;
    -- ...and insert new schedule(s)
    FOREACH hours_element IN ARRAY hours_array
      LOOP
        INSERT INTO stakeholder_schedule(
          stakeholder_id, day_of_week, open, close, week_of_month
        ) VALUES(
          s_id,
          hours_element.day_of_week,
          hours_element.open::time without time zone,
          hours_element.close::time without time zone,
          hours_element.week_of_month
        );
      END LOOP;
    COMMIT;
END;
$$ LANGUAGE plpgsql;
