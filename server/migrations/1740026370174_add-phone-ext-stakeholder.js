/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
        ALTER TABLE stakeholder ADD COLUMN IF NOT EXISTS phone_ext VARCHAR(255);
        ALTER TABLE stakeholder_log ADD COLUMN IF NOT EXISTS phone_ext VARCHAR(255);
        ALTER TABLE stakeholder_best ADD COLUMN IF NOT EXISTS phone_ext VARCHAR(255);
    `);

  pgm.sql(`
        DROP PROCEDURE IF EXISTS public.create_stakeholder;

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
            s_tags character varying[],
            s_phone_ext character varying
            )
        LANGUAGE 'plpgsql'
        AS $BODY$
        BEGIN
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
                parent_organization_id, hours_notes, allow_walkins, tags, phone_ext
            )
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
                s_parent_organization_id, s_hours_notes, s_allow_walkins, s_tags, s_phone_ext
            ) RETURNING id INTO s_id;
        END;
        $BODY$;
    `);

  // Drop old version of update_stakeholder sproc
  pgm.sql(`
        DROP PROCEDURE IF EXISTS public.update_stakeholder(
          character varying,
          character varying,
          character varying,
          character varying,
          character varying,
          character varying,
          character varying,
          character varying,
          numeric,
          numeric,
          character varying,
          boolean,
          character varying,
          character varying,
          character varying,
          character varying,
          character varying,
          character varying,
          character varying,
          character varying,
          character varying,
          character varying,
          character varying,
          character varying,
          character varying,
          integer,
          timestamp with time zone,
          integer,
          timestamp without time zone,
          integer,
          timestamp without time zone,
          integer,
          timestamp without time zone,
          integer,
          character varying,
          character varying,
          character varying,
          character varying,
          character varying,
          character varying,
          character varying,
          character varying,
          boolean,
          boolean,
          boolean,
          boolean,
          character varying,
          character varying,
          character varying,
          character varying,
          character varying,
          character varying,
          character varying,
          character varying,
          boolean,
          boolean,
          boolean,
          boolean,
          boolean,
          boolean,
          boolean,
          integer,
          boolean,
          integer,
          integer[],
          stakeholder_hours[],
          boolean,
          boolean,
          boolean,
          boolean,
          boolean,
          boolean,
          integer)
`);

 pgm.sql(`
CREATE OR REPLACE PROCEDURE public.update_stakeholder(
    s_name character varying,
    s_address_1 character varying,
    s_address_2 character varying,
    s_city character varying,
    s_state character varying,
    s_zip character varying,
    s_phone character varying,
    s_phone_ext character varying,
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
    s_tags character varying[]
)
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

    UPDATE stakeholder SET
        name = s_name,
        address_1 = s_address_1,
        address_2 = s_address_2,
        city = s_city,
        state = s_state,
        zip = s_zip,
        phone = s_phone,
        phone_ext = s_phone_ext,
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
        food_bakery = s_food_bakery,
        food_dry_goods = s_food_dry_goods,
        food_produce = s_food_produce,
        food_dairy = s_food_dairy,
        food_prepared = s_food_prepared,
        food_meat = s_food_meat,
        parent_organization_id = s_parent_organization_id,
        hours_notes = s_hours_notes,
        allow_walkins = s_allow_walkins,
        tags = s_tags
    WHERE id = s_id;
    
    DELETE FROM stakeholder_category WHERE stakeholder_id = s_id;
    FOREACH cat IN ARRAY categories LOOP
        INSERT INTO stakeholder_category (stakeholder_id, category_id)
        VALUES (s_id, cat);
    END LOOP;

    DELETE FROM stakeholder_schedule WHERE stakeholder_id = s_id;
    FOREACH hours_element IN ARRAY hours_array 
    LOOP
        INSERT INTO stakeholder_schedule(
        stakeholder_id, day_of_week, open, close, week_of_month)
        VALUES (
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

  // Update trigger procedure
  pgm.sql(`
        CREATE OR REPLACE FUNCTION public.on_insert_or_update_stakeholder()
            RETURNS trigger
            LANGUAGE 'plpgsql'
            COST 100
            VOLATILE NOT LEAKPROOF
        AS $BODY$
        DECLARE
        best_row stakeholder_log%ROWTYPE;
        latest_version INTEGER;
        is_verified BOOLEAN := false;
        categoryid INTEGER;
        BEGIN
            INSERT INTO public.stakeholder_log
            (id, tenant_id, version, name, address_1, address_2, city, state, zip,
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
            v_name, v_categories, v_address, v_email, v_phone, v_hours, v_food_types,
            hours, category_ids,
            neighborhood_id,
            complete_critical_percent,
            food_bakery, food_dry_goods , food_produce, food_dairy, food_prepared, food_meat,
            parent_organization_id, hours_notes, allow_walkins, tags, phone_ext
            )
            VALUES (
            NEW.id, NEW.tenant_id,
            (SELECT greatest(max(version) + 1, 1) FROM public.stakeholder_log where id = NEW.id),
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
            NEW.v_food_types,
            NEW.hours,
            NEW.category_ids,
            (SELECT id FROM neighborhood WHERE ST_Contains(geometry, ST_Point(NEW.longitude, NEW.latitude)) LIMIT 1),
            NEW.complete_critical_percent,
            NEW.food_bakery, NEW.food_dry_goods , NEW.food_produce, NEW.food_dairy, NEW.food_prepared, NEW.food_meat,
            NEW.parent_organization_id, NEW.hours_notes, NEW.allow_walkins, NEW.tags, NEW.phone_ext
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
            (id, tenant_id, name, address_1, address_2, city, state, zip,
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
            v_name, v_categories, v_address, v_email, v_phone, v_hours, v_food_types,
            hours, category_ids,
            neighborhood_id,
            complete_critical_percent,
            food_bakery, food_dry_goods , food_produce, food_dairy, food_prepared, food_meat, 
            parent_organization_id, hours_notes, allow_walkins, tags, phone_ext,
            is_verified
            )
            VALUES (
            best_row.id,
            best_row.tenant_id,
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
            best_row.v_food_types,
            best_row.hours,
            best_row.category_ids,
            best_row.neighborhood_id,
            best_row.complete_critical_percent,
            best_row.food_bakery, best_row.food_dry_goods , best_row.food_produce, 
            best_row.food_dairy, best_row.food_prepared, best_row.food_meat, 
            best_row.parent_organization_id, best_row.hours_notes, best_row.allow_walkins, best_row.tags, best_row.phone_ext,
            is_verified);

            /* Populate normalized stakeholder_best_category table */
            IF best_row.category_ids IS NOT NULL THEN
                FOREACH categoryid IN ARRAY best_row.category_ids
                LOOP
                    INSERT INTO stakeholder_best_category
                    (stakeholder_id, category_id)
                    VALUES (best_row.id, categoryid);
                END LOOP;
            END IF;
        ELSE
            -- should probably log some sort of error, because this should never happen
            RAISE EXCEPTION 'Could not find a best version of stakeholder id %', NEW.id;
        END IF;

        RETURN NEW;
        END;
        $BODY$;

        ALTER FUNCTION public.on_insert_or_update_stakeholder()
            OWNER TO postgres;       
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
        ALTER TABLE stakeholder DROP COLUMN phone_ext;
        ALTER TABLE stakeholder_log DROP COLUMN phone_ext;
        ALTER TABLE stakeholder_best DROP COLUMN phone_ext;
    `);
};
