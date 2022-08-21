/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  -- PROCEDURE: public.update_stakeholder(character varying, character varying, character varying, character varying, character varying, character varying, character varying, numeric, numeric, character varying, boolean, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, integer, timestamp with time zone, integer, timestamp without time zone, integer, timestamp without time zone, integer, timestamp without time zone, integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, boolean, boolean, boolean, boolean, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, boolean, boolean, boolean, boolean, boolean, boolean, boolean, integer, boolean, integer, integer[], stakeholder_hours[], boolean, boolean, boolean, boolean, boolean, boolean, integer, character varying, boolean, character varying[])

-- DROP PROCEDURE public.update_stakeholder(character varying, character varying, character varying, character varying, character varying, character varying, character varying, numeric, numeric, character varying, boolean, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, integer, timestamp with time zone, integer, timestamp without time zone, integer, timestamp without time zone, integer, timestamp without time zone, integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, boolean, boolean, boolean, boolean, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, boolean, boolean, boolean, boolean, boolean, boolean, boolean, integer, boolean, integer, integer[], stakeholder_hours[], boolean, boolean, boolean, boolean, boolean, boolean, integer, character varying, boolean, character varying[]);

CREATE OR REPLACE PROCEDURE public.update_stakeholder(
	s_name character varying,
	s_address_1 character varying,
	s_address_2 character varying,
	s_city character varying,
	s_state character varying,
	s_zip character varying,
	s_phone character varying,
	s_latitude numeric,
	s_longitude numeric,
	s_website character varying,
	s_inactive boolean,
	s_notes character varying,
	s_requirements character varying,
	s_admin_notes character varying,
	s_parent_organization character varying,
	s_physical_access character varying,
	s_email character varying,
	s_items character varying,
	s_services character varying,
	s_facebook character varying,
	s_twitter character varying,
	s_pinterest character varying,
	s_linkedin character varying,
	s_description character varying,
	s_modified_login_id integer,
	s_submitted_date timestamp with time zone,
	s_submitted_login_id integer,
	s_approved_date timestamp without time zone,
	s_reviewed_login_id integer,
	s_assigned_date timestamp without time zone,
	s_assigned_login_id integer,
	s_claimed_date timestamp without time zone,
	s_claimed_login_id integer,
	s_review_notes character varying,
	s_instagram character varying,
	s_admin_contact_name character varying,
	s_admin_contact_phone character varying,
	s_admin_contact_email character varying,
	s_donation_contact_name character varying,
	s_donation_contact_phone character varying,
	s_donation_contact_email character varying,
	s_donation_pickup boolean,
	s_donation_accept_frozen boolean,
	s_donation_accept_refrigerated boolean,
	s_donation_accept_perishable boolean,
	s_donation_schedule character varying,
	s_donation_delivery_instructions character varying,
	s_donation_notes character varying,
	s_covid_notes character varying,
	s_category_notes character varying,
	s_eligibility_notes character varying,
	s_food_types character varying,
	s_languages character varying,
	s_v_name boolean,
	s_v_categories boolean,
	s_v_address boolean,
	s_v_phone boolean,
	s_v_email boolean,
	s_v_hours boolean,
	s_v_food_types boolean,
	s_verification_status_id integer,
	s_inactive_temporary boolean,
	s_id integer,
	categories integer[],
	hours_array stakeholder_hours[],
	s_food_bakery boolean,
	s_food_dry_goods boolean,
	s_food_produce boolean,
	s_food_dairy boolean,
	s_food_prepared boolean,
	s_food_meat boolean,
	s_parent_organization_id integer,
	s_hours_notes character varying,
	s_allow_walkins boolean,
	s_tags character varying[])
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE cat INT;
        DECLARE hours_element stakeholder_hours;
        DECLARE critical_percent INT;

        BEGIN
                
            SELECT CASE WHEN (s_inactive OR s_inactive_temporary) THEN
            (s_v_name::integer + s_v_categories::integer + s_v_address::integer) *100/3
            ELSE
            (s_v_name::integer + s_v_categories::integer + s_v_address::integer
            + s_v_email::integer + s_v_phone::integer + s_v_hours::integer 
            + s_v_food_types::integer) *100/7
            END INTO critical_percent;
                
            -- update the stakeholder table itself
            UPDATE stakeholder SET
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
                v_food_types = s_v_food_types,
                verification_status_id = s_verification_status_id,
                inactive_temporary = s_inactive_temporary,
                hours = hours_array,
                category_ids = categories,
                complete_critical_percent = critical_percent,
                food_bakery = s_food_bakery,
                food_dry_goods = s_food_dry_goods,
                food_produce = s_food_produce,
                food_dairy = s_food_dairy,
                food_prepared = s_food_prepared,
                food_meat = s_food_meat,
                parent_organization_id = s_parent_organization_id,
                hours_notes = s_hours_notes,
                allow_walkins = s_allow_walkins,
                tags = s_tags,
				neighborhood_id = (SELECT id FROM neighborhood WHERE ST_Contains(geometry, ST_Point(s_longitude, s_latitude)) LIMIT 1)
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
$BODY$;
`);

  pgm.sql(`
CREATE OR REPLACE PROCEDURE public.create_stakeholder(
	INOUT s_id integer,
	s_tenant_id integer,
	s_name character varying,
	s_address_1 character varying,
	s_address_2 character varying,
	s_city character varying,
	s_state character varying,
	s_zip character varying,
	s_phone character varying,
	s_latitude numeric,
	s_longitude numeric,
	s_website character varying,
	s_inactive boolean,
	s_notes character varying,
	s_requirements character varying,
	s_admin_notes character varying,
	s_created_login_id integer,
	s_parent_organization character varying,
	s_physical_access character varying,
	s_email character varying,
	s_items character varying,
	s_services character varying,
	s_facebook character varying,
	s_twitter character varying,
	s_pinterest character varying,
	s_linkedin character varying,
	s_description character varying,
	s_submitted_date timestamp with time zone,
	s_submitted_login_id integer,
	s_approved_date timestamp without time zone,
	s_reviewed_login_id integer,
	s_assigned_date timestamp without time zone,
	s_assigned_login_id integer,
	s_claimed_date timestamp without time zone,
	s_claimed_login_id integer,
	s_review_notes character varying,
	s_instagram character varying,
	s_admin_contact_name character varying,
	s_admin_contact_phone character varying,
	s_admin_contact_email character varying,
	s_donation_contact_name character varying,
	s_donation_contact_phone character varying,
	s_donation_contact_email character varying,
	s_donation_pickup boolean,
	s_donation_accept_frozen boolean,
	s_donation_accept_refrigerated boolean,
	s_donation_accept_perishable boolean,
	s_donation_schedule character varying,
	s_donation_delivery_instructions character varying,
	s_donation_notes character varying,
	s_covid_notes character varying,
	s_category_notes character varying,
	s_eligibility_notes character varying,
	s_food_types character varying,
	s_languages character varying,
	s_v_name boolean,
	s_v_categories boolean,
	s_v_address boolean,
	s_v_phone boolean,
	s_v_email boolean,
	s_v_hours boolean,
	s_v_food_types boolean,
	s_verification_status_id integer,
	s_inactive_temporary boolean,
	categories integer[],
	hours_array stakeholder_hours[],
	s_food_bakery boolean,
	s_food_dry_goods boolean,
	s_food_produce boolean,
	s_food_dairy boolean,
	s_food_prepared boolean,
	s_food_meat boolean,
	s_parent_organization_id integer,
	s_hours_notes character varying,
	s_allow_walkins boolean,
	s_tags character varying[])
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE cat INT;
            DECLARE hours_element stakeholder_hours;
            DECLARE critical_percent INT;
			
        BEGIN
            SELECT CASE WHEN (s_inactive OR s_inactive_temporary) THEN
            (s_v_name::integer + s_v_categories::integer + s_v_address::integer) *100/3
            ELSE
            (s_v_name::integer + s_v_categories::integer + s_v_address::integer
                + s_v_email::integer + s_v_phone::integer + s_v_hours::integer) *100/6
            END INTO critical_percent;
            
            INSERT INTO stakeholder (
                tenant_id,
                name, address_1, address_2, city, state, zip,
                phone, latitude, longitude,
                website, inactive, notes, requirements, admin_notes, created_login_id,
                parent_organization, physical_access, email,
                items, services, facebook, twitter, pinterest, linkedin, description,
                submitted_date, submitted_login_id, approved_date, reviewed_login_id,
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
                v_phone, v_email, v_hours, v_food_types,
                verification_status_id, inactive_temporary,
                hours, category_ids, neighborhood_id, complete_critical_percent,
                food_bakery, food_dry_goods , food_produce, food_dairy, food_prepared, food_meat,
                parent_organization_id, hours_notes, allow_walkins, tags)
            VALUES (
                s_tenant_id,
                s_name, s_address_1, s_address_2, s_city, s_state, s_zip,
                s_phone, s_latitude, s_longitude,
                s_website, s_inactive, s_notes, s_requirements, s_admin_notes, s_created_login_id,
                s_parent_organization, s_physical_access, s_email,
                s_items, s_services, s_facebook, s_twitter, s_pinterest, s_linkedin, s_description,
                s_submitted_date, s_submitted_login_id, s_approved_date,  s_reviewed_login_id,
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
                s_v_phone, s_v_email, s_v_hours, s_v_food_types,
                s_verification_status_id, s_inactive_temporary,
                hours_array, categories,
                (SELECT id FROM neighborhood WHERE ST_Contains(geometry, ST_Point(s_longitude, s_latitude)) LIMIT 1),
                critical_percent,
                s_food_bakery, s_food_dry_goods , s_food_produce, s_food_dairy, s_food_prepared, s_food_meat,
                s_parent_organization_id, s_hours_notes, s_allow_walkins, s_tags
            ) RETURNING id INTO s_id;
            
            -- insert new stakeholder category(s)
            FOREACH cat IN ARRAY categories
            LOOP
                INSERT INTO stakeholder_category
                (stakeholder_id, category_id)
                VALUES (s_id, cat);
            END LOOP;
            
            -- insert new schedule(s)
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
$BODY$;
`);
};

exports.down = () => {};
