
-- drop previous stored proc and stakeholder_hours datatype (to prevent errors if recreating this proc)
drop type stakeholder_hours CASCADE;

-- handy struct to represent the various fields we'll need to set in the stakeholder hours table
CREATE TYPE stakeholder_hours AS (week_of_month INT, day_of_week VARCHAR, open VARCHAR, close VARCHAR);

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
DECLARE prev_version INT := (select max(version) from stakeholder where id = s_id);
DECLARE s_created_login_id INT := (select created_login_id from stakeholder where stakeholder_version_id = s_id);
DECLARE new_row_id INT := 0;
DECLARE hours_element stakeholder_hours;
BEGIN
    -- update the stakeholder table itself, by inserting a new row with a new version number
    INSERT INTO stakeholder (
      name, address_1, address_2, city, state, zip,
      phone, latitude, longitude,
      website, inactive, notes, requirements, admin_notes, created_login_id,
      parent_organization, physical_access, email,
      items, services, facebook, twitter, pinterest, linkedin, description,
      submitted_date, submitted_login_id, approved_date, rejected_date, reviewed_login_id,
      assigned_date, assigned_login_id, claimed_date, claimed_login_id,
      review_notes, instagram, admin_contact_name,
      admin_contact_phone, admin_contact_email,
      donation_contact_name, donation_contact_phone,
      donation_contact_email, donation_pickup,
      donation_accept_frozen, donation_accept_refrigerated,
      donation_accept_perishable, donation_schedule,
      donation_delivery_instructions, donation_notes, covid_notes,
      category_notes, eligibility_notes, food_types, languages,
      v_name, v_categories, v_address,
      v_phone, v_email, v_hours, verification_status_id, inactive_temporary,
      id, version)
    VALUES (
      s_name, s_address_1, s_address_2, s_city, s_state, s_zip,
      s_phone, s_latitude, s_longitude,
      s_website, s_inactive, s_notes, s_requirements, s_admin_notes, s_created_login_id,
      s_parent_organization, s_physical_access, s_email,
      s_items, s_services, s_facebook, s_twitter, s_pinterest, s_linkedin, s_description,
      s_submitted_date, s_submitted_login_id, s_approved_date, s_rejected_date, s_reviewed_login_id,
      s_assigned_date, s_assigned_login_id, s_claimed_date, s_claimed_login_id,
      s_review_notes, s_instagram, s_admin_contact_name,
      s_admin_contact_phone, s_admin_contact_email,
      s_donation_contact_name, s_donation_contact_phone,
      s_donation_contact_email, s_donation_pickup,
      s_donation_accept_frozen, s_donation_accept_refrigerated,
      s_donation_accept_perishable, s_donation_schedule,
      s_donation_delivery_instructions, s_donation_notes, s_covid_notes,
      s_category_notes, s_eligibility_notes, s_food_types, s_languages,
      s_v_name, s_v_categories, s_v_address,
      s_v_phone, s_v_email, s_v_hours, s_verification_status_id, s_inactive_temporary,
      s_id, (prev_version+1)
    ) RETURNING stakeholder_version_id INTO new_row_id;

    -- Insert new stakeholder category(s) using our new stakeholder row ID
    FOREACH cat IN ARRAY categories
      LOOP
        INSERT INTO stakeholder_category
        (stakeholder_id, category_id)
        VALUES (new_row_id, cat);
      END LOOP;

    -- Insert new schedule(s) using our new stakeholder row ID
    FOREACH hours_element IN ARRAY hours_array
      LOOP
        INSERT INTO stakeholder_schedule(
          stakeholder_id, day_of_week, open, close, week_of_month
        ) VALUES(
          new_row_id,
          hours_element.day_of_week,
          hours_element.open::time without time zone,
          hours_element.close::time without time zone,
          hours_element.week_of_month
        );
      END LOOP;
    COMMIT;
END;
$$ LANGUAGE plpgsql;
