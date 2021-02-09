--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

-- Started on 2020-06-01 15:52:15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP INDEX IF EXISTS public.login_email_idx;
ALTER TABLE IF EXISTS ONLY public.webinar_stakeholder_schedule DROP CONSTRAINT IF EXISTS webinar_stakeholder_schedule_pk;
ALTER TABLE IF EXISTS ONLY public.webinar_stakeholder DROP CONSTRAINT IF EXISTS webinar_stakeholder_pk;
ALTER TABLE IF EXISTS ONLY public.webinar_stakeholder_category DROP CONSTRAINT IF EXISTS webinar_stakeholder_category_pkey;
ALTER TABLE IF EXISTS ONLY public.verification_status DROP CONSTRAINT IF EXISTS verification_status_pk;
ALTER TABLE IF EXISTS ONLY public.security_token DROP CONSTRAINT IF EXISTS token_pk;
ALTER TABLE IF EXISTS ONLY public.stakeholder_season DROP CONSTRAINT IF EXISTS stakeholder_season_pk;
ALTER TABLE IF EXISTS ONLY public.stakeholder_schedule DROP CONSTRAINT IF EXISTS stakeholder_schedule_pk;
ALTER TABLE IF EXISTS ONLY public.stakeholder DROP CONSTRAINT IF EXISTS stakeholder_pk;
ALTER TABLE IF EXISTS ONLY public.stakeholder_donor DROP CONSTRAINT IF EXISTS stakeholder_donor_pk;
ALTER TABLE IF EXISTS ONLY public.stakeholder_category DROP CONSTRAINT IF EXISTS stakeholder_category_pkey;
ALTER TABLE IF EXISTS ONLY public.login DROP CONSTRAINT IF EXISTS pk_login;
ALTER TABLE IF EXISTS ONLY public.load_larfb DROP CONSTRAINT IF EXISTS load_larfb_pk;
ALTER TABLE IF EXISTS ONLY public.load_lapl_food_resource DROP CONSTRAINT IF EXISTS load_lapl_food_resource_pk;
ALTER TABLE IF EXISTS ONLY public.day_of_week DROP CONSTRAINT IF EXISTS day_of_week_pk;
ALTER TABLE IF EXISTS ONLY public.category DROP CONSTRAINT IF EXISTS category_pk;
ALTER TABLE IF EXISTS public.webinar_stakeholder_schedule ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.webinar_stakeholder ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.stakeholder_season ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.stakeholder_schedule ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.stakeholder_donor ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.stakeholder ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.login ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.load_open_la_data ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.faq ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.category ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.webinar_stakeholder_schedule_id_seq;
DROP TABLE IF EXISTS public.webinar_stakeholder_schedule;
DROP SEQUENCE IF EXISTS public.webinar_stakeholder_id_seq;
DROP TABLE IF EXISTS public.webinar_stakeholder_category;
DROP TABLE IF EXISTS public.webinar_stakeholder;
DROP TABLE IF EXISTS public.verification_status;
DROP TABLE IF EXISTS public.updated_stakeholders;
DROP TABLE IF EXISTS public.stakeholderbu;
DROP SEQUENCE IF EXISTS public.stakeholder_season_id_seq;
DROP TABLE IF EXISTS public.stakeholder_season;
DROP SEQUENCE IF EXISTS public.stakeholder_schedule_id_seq;
DROP TABLE IF EXISTS public.stakeholder_schedule;
DROP SEQUENCE IF EXISTS public.stakeholder_id_seq;
DROP SEQUENCE IF EXISTS public.stakeholder_donor_id_seq;
DROP TABLE IF EXISTS public.stakeholder_donor;
DROP TABLE IF EXISTS public.stakeholder_category;
DROP TABLE IF EXISTS public.stakeholder;
DROP TABLE IF EXISTS public.security_token;
DROP SEQUENCE IF EXISTS public.organizations_id_seq;
DROP SEQUENCE IF EXISTS public.login_id_seq;
DROP TABLE IF EXISTS public.login;
DROP TABLE IF EXISTS public.load_open_la_data;
DROP TABLE IF EXISTS public.load_larfb;
DROP TABLE IF EXISTS public.load_lapl_food_resource;
DROP TABLE IF EXISTS public.load_211;
DROP SEQUENCE IF EXISTS public.faq_id_seq;
DROP TABLE IF EXISTS public.faq;
DROP TABLE IF EXISTS public.day_of_week;
DROP SEQUENCE IF EXISTS public.category_id_seq;
DROP TABLE IF EXISTS public.category;
DROP FUNCTION IF EXISTS public."≈names"(x text, y text);
DROP FUNCTION IF EXISTS public."≈name_mung"(name text);
DROP FUNCTION IF EXISTS public."≈name_mung"(name);
DROP FUNCTION IF EXISTS public."≈name"(x text);
DROP PROCEDURE IF EXISTS public.update_stakeholder(s_name character varying, s_address_1 character varying, s_address_2 character varying, s_city character varying, s_state character varying, s_zip character varying, s_phone character varying, s_latitude numeric, s_longitude numeric, s_website character varying, s_inactive boolean, s_notes character varying, s_requirements character varying, s_admin_notes character varying, s_parent_organization character varying, s_physical_access character varying, s_email character varying, s_items character varying, s_services character varying, s_facebook character varying, s_twitter character varying, s_pinterest character varying, s_linkedin character varying, s_description character varying, s_modified_login_id integer, s_submitted_date timestamp with time zone, s_submitted_login_id integer, s_approved_date timestamp without time zone, s_rejected_date timestamp without time zone, s_reviewed_login_id integer, s_assigned_date timestamp without time zone, s_assigned_login_id integer, s_claimed_date timestamp without time zone, s_claimed_login_id integer, s_review_notes character varying, s_instagram character varying, s_admin_contact_name character varying, s_admin_contact_phone character varying, s_admin_contact_email character varying, s_donation_contact_name character varying, s_donation_contact_phone character varying, s_donation_contact_email character varying, s_donation_pickup boolean, s_donation_accept_frozen boolean, s_donation_accept_refrigerated boolean, s_donation_accept_perishable boolean, s_donation_schedule character varying, s_donation_delivery_instructions character varying, s_donation_notes character varying, s_covid_notes character varying, s_category_notes character varying, s_eligibility_notes character varying, s_food_types character varying, s_languages character varying, s_v_name boolean, s_v_categories boolean, s_v_address boolean, s_v_phone boolean, s_v_email boolean, s_v_hours boolean, s_verification_status_id integer, s_inactive_temporary boolean, s_id integer, categories integer[], hours_array public.stakeholder_hours[]);
DROP FUNCTION IF EXISTS public.eqv_zip_code(x text, y text);
DROP FUNCTION IF EXISTS public.eqv_zip_code(x text);
DROP FUNCTION IF EXISTS public.eqv_street_address(x text, y text);
DROP FUNCTION IF EXISTS public.eqv_street_address(x text);
DROP FUNCTION IF EXISTS public.eqv_street(x text, y text);
DROP FUNCTION IF EXISTS public.eqv_street(x text);
DROP FUNCTION IF EXISTS public.eqv_name(x text, y text);
DROP FUNCTION IF EXISTS public.eqv_name(x text);
DROP PROCEDURE IF EXISTS public.create_stakeholder(s_name character varying, s_address_1 character varying, s_address_2 character varying, s_city character varying, s_state character varying, s_zip character varying, s_phone character varying, s_latitude numeric, s_longitude numeric, s_website character varying, s_inactive boolean, s_notes character varying, s_requirements character varying, s_admin_notes character varying, s_created_login_id integer, s_parent_organization character varying, s_physical_access character varying, s_email character varying, s_items character varying, s_services character varying, s_facebook character varying, s_twitter character varying, s_pinterest character varying, s_linkedin character varying, s_description character varying, s_submitted_date timestamp with time zone, s_submitted_login_id integer, s_approved_date timestamp without time zone, s_rejected_date timestamp without time zone, s_reviewed_login_id integer, s_assigned_date timestamp without time zone, s_assigned_login_id integer, s_claimed_date timestamp without time zone, s_claimed_login_id integer, s_review_notes character varying, s_instagram character varying, s_admin_contact_name character varying, s_admin_contact_phone character varying, s_admin_contact_email character varying, s_donation_contact_name character varying, s_donation_contact_phone character varying, s_donation_contact_email character varying, s_donation_pickup boolean, s_donation_accept_frozen boolean, s_donation_accept_refrigerated boolean, s_donation_accept_perishable boolean, s_donation_schedule character varying, s_donation_delivery_instructions character varying, s_donation_notes character varying, s_covid_notes character varying, s_category_notes character varying, s_eligibility_notes character varying, s_food_types character varying, s_languages character varying, s_v_name boolean, s_v_categories boolean, s_v_address boolean, s_v_phone boolean, s_v_email boolean, s_v_hours boolean, s_verification_status_id integer, s_inactive_temporary boolean, categories integer[], hours_array public.stakeholder_hours[]);
DROP TYPE IF EXISTS public.stakeholder_hours;
DROP EXTENSION IF EXISTS earthdistance;
DROP EXTENSION IF EXISTS cube;
--
-- TOC entry 3 (class 3079 OID 19132)
-- Name: cube; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS cube WITH SCHEMA public;


--
-- TOC entry 3234 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION cube; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION cube IS 'data type for multidimensional cubes';


--
-- TOC entry 2 (class 3079 OID 19219)
-- Name: earthdistance; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS earthdistance WITH SCHEMA public;


--
-- TOC entry 3235 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION earthdistance; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION earthdistance IS 'calculate great-circle distances on the surface of the Earth';


--
-- TOC entry 720 (class 1247 OID 19237)
-- Name: stakeholder_hours; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.stakeholder_hours AS (
	week_of_month integer,
	day_of_week character varying,
	open character varying,
	close character varying
);


--
-- TOC entry 294 (class 1255 OID 19238)
-- Name: create_stakeholder(character varying, character varying, character varying, character varying, character varying, character varying, character varying, numeric, numeric, character varying, boolean, character varying, character varying, character varying, integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, timestamp with time zone, integer, timestamp without time zone, timestamp without time zone, integer, timestamp without time zone, integer, timestamp without time zone, integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, boolean, boolean, boolean, boolean, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, boolean, boolean, boolean, boolean, boolean, boolean, integer, boolean, integer[], public.stakeholder_hours[]); Type: PROCEDURE; Schema: public; Owner: -
--

CREATE PROCEDURE public.create_stakeholder(s_name character varying, s_address_1 character varying, s_address_2 character varying, s_city character varying, s_state character varying, s_zip character varying, s_phone character varying, s_latitude numeric, s_longitude numeric, s_website character varying, s_inactive boolean, s_notes character varying, s_requirements character varying, s_admin_notes character varying, s_created_login_id integer, s_parent_organization character varying, s_physical_access character varying, s_email character varying, s_items character varying, s_services character varying, s_facebook character varying, s_twitter character varying, s_pinterest character varying, s_linkedin character varying, s_description character varying, s_submitted_date timestamp with time zone, s_submitted_login_id integer, s_approved_date timestamp without time zone, s_rejected_date timestamp without time zone, s_reviewed_login_id integer, s_assigned_date timestamp without time zone, s_assigned_login_id integer, s_claimed_date timestamp without time zone, s_claimed_login_id integer, s_review_notes character varying, s_instagram character varying, s_admin_contact_name character varying, s_admin_contact_phone character varying, s_admin_contact_email character varying, s_donation_contact_name character varying, s_donation_contact_phone character varying, s_donation_contact_email character varying, s_donation_pickup boolean, s_donation_accept_frozen boolean, s_donation_accept_refrigerated boolean, s_donation_accept_perishable boolean, s_donation_schedule character varying, s_donation_delivery_instructions character varying, s_donation_notes character varying, s_covid_notes character varying, s_category_notes character varying, s_eligibility_notes character varying, s_food_types character varying, s_languages character varying, s_v_name boolean, s_v_categories boolean, s_v_address boolean, s_v_phone boolean, s_v_email boolean, s_v_hours boolean, s_verification_status_id integer, s_inactive_temporary boolean, categories integer[], hours_array public.stakeholder_hours[])
    LANGUAGE plpgsql
    AS $$
DECLARE cat INT;
DECLARE s_id INT := 0;
DECLARE hours_element stakeholder_hours;
BEGIN
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
      v_phone, v_email, v_hours, verification_status_id, inactive_temporary)
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
      s_v_phone, s_v_email, s_v_hours, s_verification_status_id, s_inactive_temporary
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
$$;


--
-- TOC entry 295 (class 1255 OID 19240)
-- Name: eqv_name(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.eqv_name(x text) RETURNS text
    LANGUAGE plpgsql
    AS $$
begin
return regexp_replace(lower(x), '[^ [:alnum:]]', '', 'g');
end; $$;


--
-- TOC entry 296 (class 1255 OID 19241)
-- Name: eqv_name(text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.eqv_name(x text, y text) RETURNS double precision
    LANGUAGE plpgsql
    AS $$
begin
return case
when x = y then 1
when eqv_name(x) = eqv_name(y) then 0.5
else 0
end;
end; $$;


--
-- TOC entry 297 (class 1255 OID 19242)
-- Name: eqv_street(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.eqv_street(x text) RETURNS text
    LANGUAGE plpgsql
    AS $$
declare
y text;
begin
y := lower(x);
y := regexp_replace(y, '[^ [:alnum:]]', '', 'g');
y := regexp_replace(y, '\m(ave|avenue|blvd|boulevard|cir|circle|dr|drive|exp|expressway|rd|road|st|street)\M.*', '', 'g');
y := regexp_replace(y, '\mnorth\M', 'n', 'g');
y := regexp_replace(y, '\msouth\M', 's', 'g');
y := regexp_replace(y, '\meast\M', 'e', 'g');
y := regexp_replace(y, '\mwest\M', 'w', 'g');
y := regexp_replace(y, '(\d)th\M', '\1', 'g');
y := regexp_replace(y, '  +', ' ', 'g');
return y;
end; $$;


--
-- TOC entry 298 (class 1255 OID 19243)
-- Name: eqv_street(text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.eqv_street(x text, y text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
begin
return case
when x = y then 1
when eqv_street(x) = eqv_street(y) then 0.5
else 0
end;
end; $$;


--
-- TOC entry 299 (class 1255 OID 19244)
-- Name: eqv_street_address(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.eqv_street_address(x text) RETURNS text
    LANGUAGE plpgsql
    AS $$
declare
y text;
begin
y := lower(x);
y := regexp_replace(y, '[^ [:alnum:]]', '', 'g');
y := regexp_replace(y, '\m(ave|avenue|bldg|building|blvd|boulevard|cir|circle|dr|drive|fl|floor|exp|expressway|rm|room|rd|road|st|street|ste|suite)\M.*', '', 'g');
y := regexp_replace(y, '\mnorth\M', 'n', 'g');
y := regexp_replace(y, '\msouth\M', 's', 'g');
y := regexp_replace(y, '\meast\M', 'e', 'g');
y := regexp_replace(y, '\mwest\M', 'w', 'g');
y := regexp_replace(y, '(\d)th\M', '\1', 'g');
y := regexp_replace(y, '  +', ' ', 'g');
return y;
end; $$;


--
-- TOC entry 300 (class 1255 OID 19245)
-- Name: eqv_street_address(text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.eqv_street_address(x text, y text) RETURNS double precision
    LANGUAGE plpgsql
    AS $$
begin
return case
when x = y then 1
when eqv_street_address(x) = eqv_street_address(y) then 0.5
else 0
end;
end; $$;


--
-- TOC entry 301 (class 1255 OID 19246)
-- Name: eqv_zip_code(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.eqv_zip_code(x text) RETURNS text
    LANGUAGE plpgsql
    AS $$
begin
return substr(x, 1, 5);
end; $$;


--
-- TOC entry 302 (class 1255 OID 19247)
-- Name: eqv_zip_code(text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.eqv_zip_code(x text, y text) RETURNS double precision
    LANGUAGE plpgsql
    AS $$
begin
return case
when x = y then 1
when eqv_zip_code(x) = eqv_zip_code(y) then 0.5
else 0
end;
end; $$;


--
-- TOC entry 303 (class 1255 OID 19248)
-- Name: update_stakeholder(character varying, character varying, character varying, character varying, character varying, character varying, character varying, numeric, numeric, character varying, boolean, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, integer, timestamp with time zone, integer, timestamp without time zone, timestamp without time zone, integer, timestamp without time zone, integer, timestamp without time zone, integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, boolean, boolean, boolean, boolean, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, boolean, boolean, boolean, boolean, boolean, boolean, integer, boolean, integer, integer[], public.stakeholder_hours[]); Type: PROCEDURE; Schema: public; Owner: -
--

CREATE PROCEDURE public.update_stakeholder(s_name character varying, s_address_1 character varying, s_address_2 character varying, s_city character varying, s_state character varying, s_zip character varying, s_phone character varying, s_latitude numeric, s_longitude numeric, s_website character varying, s_inactive boolean, s_notes character varying, s_requirements character varying, s_admin_notes character varying, s_parent_organization character varying, s_physical_access character varying, s_email character varying, s_items character varying, s_services character varying, s_facebook character varying, s_twitter character varying, s_pinterest character varying, s_linkedin character varying, s_description character varying, s_modified_login_id integer, s_submitted_date timestamp with time zone, s_submitted_login_id integer, s_approved_date timestamp without time zone, s_rejected_date timestamp without time zone, s_reviewed_login_id integer, s_assigned_date timestamp without time zone, s_assigned_login_id integer, s_claimed_date timestamp without time zone, s_claimed_login_id integer, s_review_notes character varying, s_instagram character varying, s_admin_contact_name character varying, s_admin_contact_phone character varying, s_admin_contact_email character varying, s_donation_contact_name character varying, s_donation_contact_phone character varying, s_donation_contact_email character varying, s_donation_pickup boolean, s_donation_accept_frozen boolean, s_donation_accept_refrigerated boolean, s_donation_accept_perishable boolean, s_donation_schedule character varying, s_donation_delivery_instructions character varying, s_donation_notes character varying, s_covid_notes character varying, s_category_notes character varying, s_eligibility_notes character varying, s_food_types character varying, s_languages character varying, s_v_name boolean, s_v_categories boolean, s_v_address boolean, s_v_phone boolean, s_v_email boolean, s_v_hours boolean, s_verification_status_id integer, s_inactive_temporary boolean, s_id integer, categories integer[], hours_array public.stakeholder_hours[])
    LANGUAGE plpgsql
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
      inactive_temporary = s_inactive_temporary
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
$$;


--
-- TOC entry 304 (class 1255 OID 19250)
-- Name: ≈name(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public."≈name"(x text) RETURNS text
    LANGUAGE plpgsql
    AS $$
begin
return lower(x);
end; $$;


--
-- TOC entry 305 (class 1255 OID 19251)
-- Name: ≈name_mung(name); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public."≈name_mung"(name) RETURNS text
    LANGUAGE plpgsql
    AS $$
begin
return lower(name);
end; $$;


--
-- TOC entry 306 (class 1255 OID 19252)
-- Name: ≈name_mung(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public."≈name_mung"(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
begin
return lower(name);
end; $$;


--
-- TOC entry 307 (class 1255 OID 19253)
-- Name: ≈names(text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public."≈names"(x text, y text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
begin
return ≈name(x) = ≈name(y);
end; $$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 19254)
-- Name: category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying NOT NULL,
    is_outlet boolean DEFAULT false NOT NULL,
    is_donor boolean DEFAULT false NOT NULL,
    is_connector boolean DEFAULT false NOT NULL,
    is_for_food_seeker boolean DEFAULT false NOT NULL,
    inactive boolean DEFAULT false NOT NULL
);


--
-- TOC entry 206 (class 1259 OID 19265)
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3236 (class 0 OID 0)
-- Dependencies: 206
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- TOC entry 207 (class 1259 OID 19267)
-- Name: day_of_week; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.day_of_week (
    name character varying(3) NOT NULL,
    display_order integer NOT NULL
);


--
-- TOC entry 208 (class 1259 OID 19270)
-- Name: faq; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.faq (
    question character varying,
    answer character varying,
    identifier character varying,
    id integer NOT NULL,
    language character varying
);


--
-- TOC entry 209 (class 1259 OID 19276)
-- Name: faq_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.faq_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3237 (class 0 OID 0)
-- Dependencies: 209
-- Name: faq_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.faq_id_seq OWNED BY public.faq.id;


--
-- TOC entry 210 (class 1259 OID 19278)
-- Name: load_211; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.load_211 (
    agency_description character varying,
    agency_id bigint,
    agency_name character varying,
    agency_overview character varying,
    geometry json,
    is_agency boolean,
    public_school text[],
    school_district character varying,
    score numeric,
    site_addresses text[],
    site_aliases text[],
    site_cross_and_access character varying,
    site_hours text[],
    site_id bigint,
    site_name character varying,
    site_phones text[],
    site_services text[],
    site_url character varying
);


--
-- TOC entry 211 (class 1259 OID 19284)
-- Name: load_lapl_food_resource; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.load_lapl_food_resource (
    name character varying NOT NULL,
    addr character varying NOT NULL,
    phone character varying,
    population_served character varying,
    resource_categories character varying,
    general_resources character varying,
    additional_offerings character varying,
    lat numeric(18,8),
    lon numeric(18,8)
);


--
-- TOC entry 212 (class 1259 OID 19290)
-- Name: load_larfb; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.load_larfb (
    name character varying,
    lar_code character varying NOT NULL,
    agency_posting_code character varying,
    phone character varying,
    street character varying,
    city character varying,
    state character varying,
    zip character varying,
    stars character varying,
    extra1 character varying,
    extra2 character varying,
    extra3 character varying,
    stakeholder_id integer,
    stakeholder_id_confidence real
);


--
-- TOC entry 213 (class 1259 OID 19296)
-- Name: load_open_la_data; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.load_open_la_data (
    id integer NOT NULL,
    objectid integer,
    ext_id integer,
    cat1 character varying,
    cat2 character varying,
    cat3 character varying,
    org_name character varying,
    name character varying,
    addrln1 character varying,
    addrln2 character varying,
    city character varying,
    state character varying,
    zip integer,
    hours character varying,
    phones character varying,
    email character varying,
    url character varying,
    info1 character varying,
    info2 character varying,
    post_id integer,
    description character varying,
    link character varying,
    use_type character varying,
    latitude numeric,
    longitude numeric,
    dateupdated bigint,
    point_x numeric,
    point_y numeric
);


--
-- TOC entry 214 (class 1259 OID 19302)
-- Name: login; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.login (
    id integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    email character varying NOT NULL,
    password_hash character varying NOT NULL,
    email_confirmed boolean DEFAULT false NOT NULL,
    date_created timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_admin boolean DEFAULT false NOT NULL,
    is_security_admin boolean DEFAULT false,
    is_data_entry boolean DEFAULT true,
    is_coordinator boolean DEFAULT false NOT NULL
);


--
-- TOC entry 215 (class 1259 OID 19314)
-- Name: login_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.login_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3238 (class 0 OID 0)
-- Dependencies: 215
-- Name: login_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.login_id_seq OWNED BY public.login.id;


--
-- TOC entry 216 (class 1259 OID 19316)
-- Name: organizations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.organizations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3239 (class 0 OID 0)
-- Dependencies: 216
-- Name: organizations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.organizations_id_seq OWNED BY public.load_open_la_data.id;


--
-- TOC entry 217 (class 1259 OID 19318)
-- Name: security_token; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.security_token (
    token character varying NOT NULL,
    email character varying NOT NULL,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- TOC entry 218 (class 1259 OID 19325)
-- Name: stakeholder; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stakeholder (
    id integer NOT NULL,
    name character varying,
    address_1 character varying,
    address_2 character varying,
    city character varying,
    state character varying,
    zip character varying,
    phone character varying,
    latitude numeric,
    longitude numeric,
    website character varying,
    daycode character varying,
    open character varying,
    close character varying,
    daycode1 character varying,
    day1_open character varying,
    day1_close character varying,
    daycode2 character varying,
    day2_open character varying,
    day2_close character varying,
    daycode3 character varying,
    day3_open character varying,
    day3_close character varying,
    daycode4 character varying,
    day4_open character varying,
    day4_close character varying,
    daycode5 character varying,
    day5_open character varying,
    day5_close character varying,
    daycode6 character varying,
    day6_open character varying,
    day6_close character varying,
    daycode7 character varying,
    day7_open character varying,
    day7_close character varying,
    year_round text,
    season_open character varying,
    season_close character varying,
    fm_id numeric,
    notes character varying,
    created_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_login_id integer,
    modified_date timestamp with time zone,
    modified_login_id integer,
    submitted_date timestamp with time zone,
    submitted_login_id integer,
    requirements character varying DEFAULT ''::character varying NOT NULL,
    admin_notes character varying DEFAULT ''::character varying NOT NULL,
    inactive boolean DEFAULT false NOT NULL,
    parent_organization character varying DEFAULT ''::character varying NOT NULL,
    physical_access character varying DEFAULT ''::character varying NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL,
    items character varying DEFAULT ''::character varying NOT NULL,
    services character varying DEFAULT ''::character varying NOT NULL,
    facebook character varying DEFAULT ''::character varying NOT NULL,
    twitter character varying DEFAULT ''::character varying NOT NULL,
    pinterest character varying DEFAULT ''::character varying NOT NULL,
    linkedin character varying DEFAULT ''::character varying NOT NULL,
    description character varying DEFAULT ''::character varying NOT NULL,
    approved_date timestamp without time zone,
    reviewed_login_id integer,
    assigned_login_id integer,
    agency_type character varying,
    assigned_date timestamp(6) without time zone,
    rejected_date timestamp without time zone,
    review_notes character varying DEFAULT ''::character varying NOT NULL,
    claimed_login_id integer,
    claimed_date timestamp without time zone,
    instagram character varying DEFAULT ''::character varying NOT NULL,
    admin_contact_name character varying DEFAULT ''::character varying,
    admin_contact_phone character varying DEFAULT ''::character varying,
    admin_contact_email character varying DEFAULT ''::character varying,
    donation_contact_name character varying DEFAULT ''::character varying,
    donation_contact_phone character varying DEFAULT ''::character varying,
    donation_contact_email character varying DEFAULT ''::character varying,
    donation_pickup boolean,
    donation_accept_frozen boolean,
    donation_accept_refrigerated boolean,
    donation_accept_perishable boolean,
    donation_schedule character varying DEFAULT ''::character varying NOT NULL,
    donation_delivery_instructions character varying DEFAULT ''::character varying NOT NULL,
    covid_notes character varying DEFAULT ''::character varying NOT NULL,
    donation_notes character varying DEFAULT ''::character varying NOT NULL,
    category_notes character varying DEFAULT ''::character varying NOT NULL,
    eligibility_notes character varying DEFAULT ''::character varying NOT NULL,
    food_types character varying DEFAULT ''::character varying NOT NULL,
    languages character varying DEFAULT 'English'::character varying NOT NULL,
    v_name boolean DEFAULT false NOT NULL,
    v_categories boolean DEFAULT false NOT NULL,
    v_address boolean DEFAULT false NOT NULL,
    v_email boolean DEFAULT false NOT NULL,
    v_phone boolean DEFAULT false NOT NULL,
    v_hours boolean DEFAULT false NOT NULL,
    verification_status_id integer DEFAULT 1 NOT NULL,
    inactive_temporary boolean DEFAULT false NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 19369)
-- Name: stakeholder_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stakeholder_category (
    stakeholder_id integer NOT NULL,
    category_id integer NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 19372)
-- Name: stakeholder_donor; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stakeholder_donor (
    id integer NOT NULL,
    name character varying,
    address_1 character varying,
    address_2 character varying,
    city character varying,
    state character varying,
    zip character varying,
    phone character varying,
    latitude numeric,
    longitude numeric,
    website character varying,
    daycode character varying,
    open character varying,
    close character varying,
    daycode1 character varying,
    day1_open character varying,
    day1_close character varying,
    daycode2 character varying,
    day2_open character varying,
    day2_close character varying,
    daycode3 character varying,
    day3_open character varying,
    day3_close character varying,
    daycode4 character varying,
    day4_open character varying,
    day4_close character varying,
    daycode5 character varying,
    day5_open character varying,
    day5_close character varying,
    daycode6 character varying,
    day6_open character varying,
    day6_close character varying,
    daycode7 character varying,
    day7_open character varying,
    day7_close character varying,
    year_round text,
    season_open character varying,
    season_close character varying,
    fm_id numeric,
    notes character varying,
    created_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_login_id integer,
    modified_date timestamp with time zone,
    modified_login_id integer,
    submitted_date timestamp with time zone,
    submitted_login_id integer,
    requirements character varying DEFAULT ''::character varying NOT NULL,
    admin_notes character varying DEFAULT ''::character varying NOT NULL,
    inactive boolean DEFAULT false NOT NULL,
    parent_organization character varying DEFAULT ''::character varying NOT NULL,
    physical_access character varying DEFAULT ''::character varying NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL,
    items character varying DEFAULT ''::character varying NOT NULL,
    services character varying DEFAULT ''::character varying NOT NULL,
    facebook character varying DEFAULT ''::character varying NOT NULL,
    twitter character varying DEFAULT ''::character varying NOT NULL,
    pinterest character varying DEFAULT ''::character varying NOT NULL,
    linkedin character varying DEFAULT ''::character varying NOT NULL,
    description character varying DEFAULT ''::character varying NOT NULL,
    approved_date timestamp without time zone,
    reviewed_login_id integer,
    assigned_login_id integer,
    agency_type character varying,
    assigned_date timestamp without time zone,
    rejected_date timestamp without time zone,
    review_notes character varying DEFAULT ''::character varying NOT NULL,
    claimed_login_id integer,
    claimed_date timestamp without time zone,
    instagram character varying DEFAULT ''::character varying NOT NULL,
    admin_contact_name character varying DEFAULT ''::character varying,
    admin_contact_phone character varying DEFAULT ''::character varying,
    admin_contact_email character varying DEFAULT ''::character varying,
    donation_contact_name character varying DEFAULT ''::character varying,
    donation_contact_phone character varying DEFAULT ''::character varying,
    donation_contact_email character varying DEFAULT ''::character varying,
    donation_pickup boolean,
    donation_accept_frozen boolean,
    donation_accept_refrigerated boolean,
    donation_accept_perishable boolean,
    donation_schedule character varying DEFAULT ''::character varying NOT NULL,
    donation_delivery_instructions character varying DEFAULT ''::character varying NOT NULL,
    covid_notes character varying DEFAULT ''::character varying NOT NULL,
    donation_notes character varying DEFAULT ''::character varying NOT NULL,
    category_notes character varying DEFAULT ''::character varying NOT NULL,
    eligibility_notes character varying DEFAULT ''::character varying NOT NULL,
    food_types character varying DEFAULT ''::character varying NOT NULL,
    languages character varying DEFAULT 'English'::character varying NOT NULL,
    v_name boolean DEFAULT false NOT NULL,
    v_categories boolean DEFAULT false NOT NULL,
    v_address boolean DEFAULT false NOT NULL,
    v_email boolean DEFAULT false NOT NULL,
    v_phone boolean DEFAULT false NOT NULL,
    v_hours boolean DEFAULT false NOT NULL,
    verification_status_id integer DEFAULT 1 NOT NULL,
    inactive_temporary boolean DEFAULT false NOT NULL
);


--
-- TOC entry 221 (class 1259 OID 19416)
-- Name: stakeholder_donor_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stakeholder_donor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3240 (class 0 OID 0)
-- Dependencies: 221
-- Name: stakeholder_donor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stakeholder_donor_id_seq OWNED BY public.stakeholder_donor.id;


--
-- TOC entry 222 (class 1259 OID 19418)
-- Name: stakeholder_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stakeholder_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3241 (class 0 OID 0)
-- Dependencies: 222
-- Name: stakeholder_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stakeholder_id_seq OWNED BY public.stakeholder.id;


--
-- TOC entry 223 (class 1259 OID 19420)
-- Name: stakeholder_schedule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stakeholder_schedule (
    id integer NOT NULL,
    stakeholder_id integer NOT NULL,
    day_of_week character varying NOT NULL,
    open time without time zone,
    close time without time zone,
    week_of_month integer NOT NULL,
    season_id integer
);


--
-- TOC entry 224 (class 1259 OID 19426)
-- Name: stakeholder_schedule_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stakeholder_schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3242 (class 0 OID 0)
-- Dependencies: 224
-- Name: stakeholder_schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stakeholder_schedule_id_seq OWNED BY public.stakeholder_schedule.id;


--
-- TOC entry 225 (class 1259 OID 19428)
-- Name: stakeholder_season; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stakeholder_season (
    id integer NOT NULL,
    stakeholder_id integer NOT NULL,
    name character varying DEFAULT ''::character varying NOT NULL,
    start_date character varying NOT NULL,
    end_date character varying NOT NULL
);


--
-- TOC entry 226 (class 1259 OID 19435)
-- Name: stakeholder_season_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stakeholder_season_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3243 (class 0 OID 0)
-- Dependencies: 226
-- Name: stakeholder_season_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stakeholder_season_id_seq OWNED BY public.stakeholder_season.id;


--
-- TOC entry 227 (class 1259 OID 19437)
-- Name: stakeholderbu; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stakeholderbu (
    id integer NOT NULL,
    name character varying,
    address_1 character varying,
    address_2 character varying,
    city character varying,
    state character varying,
    zip character varying,
    phone character varying,
    latitude numeric,
    longitude numeric,
    website character varying,
    daycode character varying,
    open character varying,
    close character varying,
    daycode1 character varying,
    day1_open character varying,
    day1_close character varying,
    daycode2 character varying,
    day2_open character varying,
    day2_close character varying,
    daycode3 character varying,
    day3_open character varying,
    day3_close character varying,
    daycode4 character varying,
    day4_open character varying,
    day4_close character varying,
    daycode5 character varying,
    day5_open character varying,
    day5_close character varying,
    daycode6 character varying,
    day6_open character varying,
    day6_close character varying,
    daycode7 character varying,
    day7_open character varying,
    day7_close character varying,
    year_round text,
    season_open character varying,
    season_close character varying,
    fm_id numeric,
    notes character varying,
    created_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_login_id integer,
    modified_date timestamp with time zone,
    modified_login_id integer,
    submitted_date timestamp with time zone,
    submitted_login_id integer,
    requirements character varying DEFAULT ''::character varying NOT NULL,
    admin_notes character varying DEFAULT ''::character varying NOT NULL,
    inactive boolean DEFAULT false NOT NULL,
    parent_organization character varying DEFAULT ''::character varying NOT NULL,
    physical_access character varying DEFAULT ''::character varying NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL,
    items character varying DEFAULT ''::character varying NOT NULL,
    services character varying DEFAULT ''::character varying NOT NULL,
    facebook character varying DEFAULT ''::character varying NOT NULL,
    twitter character varying DEFAULT ''::character varying NOT NULL,
    pinterest character varying DEFAULT ''::character varying NOT NULL,
    linkedin character varying DEFAULT ''::character varying NOT NULL,
    description character varying DEFAULT ''::character varying NOT NULL,
    approved_date timestamp without time zone,
    reviewed_login_id integer,
    assigned_login_id integer,
    agency_type character varying,
    assigned_date timestamp(6) without time zone,
    rejected_date timestamp without time zone,
    review_notes character varying DEFAULT ''::character varying NOT NULL,
    claimed_login_id integer,
    claimed_date timestamp without time zone,
    instagram character varying DEFAULT ''::character varying NOT NULL,
    admin_contact_name character varying DEFAULT ''::character varying,
    admin_contact_phone character varying DEFAULT ''::character varying,
    admin_contact_email character varying DEFAULT ''::character varying,
    donation_contact_name character varying DEFAULT ''::character varying,
    donation_contact_phone character varying DEFAULT ''::character varying,
    donation_contact_email character varying DEFAULT ''::character varying,
    donation_pickup boolean,
    donation_accept_frozen boolean,
    donation_accept_refrigerated boolean,
    donation_accept_perishable boolean,
    donation_schedule character varying DEFAULT ''::character varying NOT NULL,
    donation_delivery_instructions character varying DEFAULT ''::character varying NOT NULL,
    covid_notes character varying DEFAULT ''::character varying NOT NULL,
    donation_notes character varying DEFAULT ''::character varying NOT NULL,
    category_notes character varying DEFAULT ''::character varying NOT NULL,
    eligibility_notes character varying DEFAULT ''::character varying NOT NULL,
    food_types character varying DEFAULT ''::character varying NOT NULL,
    languages character varying DEFAULT 'English'::character varying NOT NULL,
    v_name boolean DEFAULT false NOT NULL,
    v_categories boolean DEFAULT false NOT NULL,
    v_address boolean DEFAULT false NOT NULL,
    v_email boolean DEFAULT false NOT NULL,
    v_phone boolean DEFAULT false NOT NULL,
    v_hours boolean DEFAULT false NOT NULL,
    verification_status_id integer DEFAULT 1 NOT NULL
);


--
-- TOC entry 228 (class 1259 OID 19480)
-- Name: updated_stakeholders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.updated_stakeholders (
    id integer NOT NULL,
    name character varying,
    modified_date timestamp with time zone NOT NULL,
    verified_date timestamp with time zone
);


--
-- TOC entry 229 (class 1259 OID 19486)
-- Name: verification_status; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.verification_status (
    id integer NOT NULL,
    name character varying NOT NULL,
    code character varying NOT NULL
);


--
-- TOC entry 230 (class 1259 OID 19492)
-- Name: webinar_stakeholder; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.webinar_stakeholder (
    id integer NOT NULL,
    name character varying,
    address_1 character varying,
    address_2 character varying,
    city character varying,
    state character varying,
    zip character varying,
    phone character varying,
    latitude numeric,
    longitude numeric,
    website character varying,
    daycode character varying,
    open character varying,
    close character varying,
    daycode1 character varying,
    day1_open character varying,
    day1_close character varying,
    daycode2 character varying,
    day2_open character varying,
    day2_close character varying,
    daycode3 character varying,
    day3_open character varying,
    day3_close character varying,
    daycode4 character varying,
    day4_open character varying,
    day4_close character varying,
    daycode5 character varying,
    day5_open character varying,
    day5_close character varying,
    daycode6 character varying,
    day6_open character varying,
    day6_close character varying,
    daycode7 character varying,
    day7_open character varying,
    day7_close character varying,
    year_round text,
    season_open character varying,
    season_close character varying,
    fm_id numeric,
    notes character varying,
    created_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_login_id integer,
    modified_date timestamp with time zone,
    modified_login_id integer,
    verified_date timestamp with time zone,
    verified_login_id integer,
    requirements character varying DEFAULT ''::character varying NOT NULL,
    admin_notes character varying DEFAULT ''::character varying NOT NULL,
    inactive boolean DEFAULT false NOT NULL,
    parent_organization character varying DEFAULT ''::character varying NOT NULL,
    physical_access character varying DEFAULT ''::character varying NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL,
    items character varying DEFAULT ''::character varying NOT NULL,
    services character varying DEFAULT ''::character varying NOT NULL,
    facebook character varying DEFAULT ''::character varying NOT NULL,
    twitter character varying DEFAULT ''::character varying NOT NULL,
    pinterest character varying DEFAULT ''::character varying NOT NULL,
    linkedin character varying DEFAULT ''::character varying NOT NULL,
    description character varying DEFAULT ''::character varying NOT NULL,
    agency_type character varying
);


--
-- TOC entry 231 (class 1259 OID 19512)
-- Name: webinar_stakeholder_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.webinar_stakeholder_category (
    stakeholder_id integer NOT NULL,
    category_id integer NOT NULL
);


--
-- TOC entry 232 (class 1259 OID 19515)
-- Name: webinar_stakeholder_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.webinar_stakeholder_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3244 (class 0 OID 0)
-- Dependencies: 232
-- Name: webinar_stakeholder_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.webinar_stakeholder_id_seq OWNED BY public.webinar_stakeholder.id;


--
-- TOC entry 233 (class 1259 OID 19517)
-- Name: webinar_stakeholder_schedule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.webinar_stakeholder_schedule (
    id integer NOT NULL,
    stakeholder_id integer NOT NULL,
    day_of_week character varying NOT NULL,
    open time without time zone,
    close time without time zone,
    week_of_month integer NOT NULL,
    season_id integer
);


--
-- TOC entry 234 (class 1259 OID 19523)
-- Name: webinar_stakeholder_schedule_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.webinar_stakeholder_schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3245 (class 0 OID 0)
-- Dependencies: 234
-- Name: webinar_stakeholder_schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.webinar_stakeholder_schedule_id_seq OWNED BY public.webinar_stakeholder_schedule.id;


--
-- TOC entry 2897 (class 2604 OID 19525)
-- Name: category id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- TOC entry 2898 (class 2604 OID 19526)
-- Name: faq id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faq ALTER COLUMN id SET DEFAULT nextval('public.faq_id_seq'::regclass);


--
-- TOC entry 2899 (class 2604 OID 19527)
-- Name: load_open_la_data id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.load_open_la_data ALTER COLUMN id SET DEFAULT nextval('public.organizations_id_seq'::regclass);


--
-- TOC entry 2906 (class 2604 OID 19528)
-- Name: login id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.login ALTER COLUMN id SET DEFAULT nextval('public.login_id_seq'::regclass);


--
-- TOC entry 2946 (class 2604 OID 19529)
-- Name: stakeholder id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stakeholder ALTER COLUMN id SET DEFAULT nextval('public.stakeholder_id_seq'::regclass);


--
-- TOC entry 2985 (class 2604 OID 19530)
-- Name: stakeholder_donor id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stakeholder_donor ALTER COLUMN id SET DEFAULT nextval('public.stakeholder_donor_id_seq'::regclass);


--
-- TOC entry 2986 (class 2604 OID 19531)
-- Name: stakeholder_schedule id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stakeholder_schedule ALTER COLUMN id SET DEFAULT nextval('public.stakeholder_schedule_id_seq'::regclass);


--
-- TOC entry 2988 (class 2604 OID 19532)
-- Name: stakeholder_season id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stakeholder_season ALTER COLUMN id SET DEFAULT nextval('public.stakeholder_season_id_seq'::regclass);


--
-- TOC entry 3040 (class 2604 OID 19533)
-- Name: webinar_stakeholder id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.webinar_stakeholder ALTER COLUMN id SET DEFAULT nextval('public.webinar_stakeholder_id_seq'::regclass);


--
-- TOC entry 3041 (class 2604 OID 19534)
-- Name: webinar_stakeholder_schedule id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.webinar_stakeholder_schedule ALTER COLUMN id SET DEFAULT nextval('public.webinar_stakeholder_schedule_id_seq'::regclass);


--
-- TOC entry 3199 (class 0 OID 19254)
-- Dependencies: 205
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.category (id, name, is_outlet, is_donor, is_connector, is_for_food_seeker, inactive) FROM stdin;
11	Other	t	f	f	t	f
7	Care Center	f	f	f	f	t
9	Meal Program	f	f	f	t	f
10	Shelter	f	f	f	f	f
12	Unknown	f	f	f	t	f
5	Supermarket	f	t	f	f	t
6	Summer Lunch for Kids	f	f	f	f	t
2	Community Garden	t	f	f	f	t
4	Farmer's Market	t	f	f	f	t
1	Food Pantry	t	t	t	t	f
8	Food Bank	f	f	f	t	f
3	Test Category (do not use)	f	f	f	f	f
\.


--
-- TOC entry 3201 (class 0 OID 19267)
-- Dependencies: 207
-- Data for Name: day_of_week; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.day_of_week (name, display_order) FROM stdin;
Sun	0
Mon	1
Tue	2
Wed	3
Thu	4
Fri	5
Sat	6
\.


--
-- TOC entry 3202 (class 0 OID 19270)
-- Dependencies: 208
-- Data for Name: faq; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.faq (question, answer, identifier, id, language) FROM stdin;
\.


--
-- TOC entry 3204 (class 0 OID 19278)
-- Dependencies: 210
-- Data for Name: load_211; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.load_211 (agency_description, agency_id, agency_name, agency_overview, geometry, is_agency, public_school, school_district, score, site_addresses, site_aliases, site_cross_and_access, site_hours, site_id, site_name, site_phones, site_services, site_url) FROM stdin;
\.


--
-- TOC entry 3205 (class 0 OID 19284)
-- Dependencies: 211
-- Data for Name: load_lapl_food_resource; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.load_lapl_food_resource (name, addr, phone, population_served, resource_categories, general_resources, additional_offerings, lat, lon) FROM stdin;
\.


--
-- TOC entry 3206 (class 0 OID 19290)
-- Dependencies: 212
-- Data for Name: load_larfb; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.load_larfb (name, lar_code, agency_posting_code, phone, street, city, state, zip, stars, extra1, extra2, extra3, stakeholder_id, stakeholder_id_confidence) FROM stdin;
\.


--
-- TOC entry 3207 (class 0 OID 19296)
-- Dependencies: 213
-- Data for Name: load_open_la_data; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.load_open_la_data (id, objectid, ext_id, cat1, cat2, cat3, org_name, name, addrln1, addrln2, city, state, zip, hours, phones, email, url, info1, info2, post_id, description, link, use_type, latitude, longitude, dateupdated, point_x, point_y) FROM stdin;
\.


--
-- TOC entry 3208 (class 0 OID 19302)
-- Dependencies: 214
-- Data for Name: login; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.login (id, first_name, last_name, email, password_hash, email_confirmed, date_created, is_admin, is_security_admin, is_data_entry, is_coordinator) FROM stdin;
106	Webinar	User	webinaruser@dispostable.com	$2b$10$MZ9Nlvc9lYd6/GrgG3sbs.jzR4Ta/NYWlCHW8MCrLDseNeNRV7Yme	t	2020-03-27 20:52:35.898011	f	f	f	f
108	Admin	User	adminuser@dispostable.com	$2b$10$hJy1U8B6pC2GzPWKQr/TYOO876S3YtHjlYXro81KwOZWgdyR5LFqC	t	2020-04-16 22:46:43.60351	t	f	t	f
110	Data Entry	User	dataentryuser@dispostable.com	$2b$10$XnPYzSp5/a6/I4vcpgGDreWTq4JlSqiIdQIfKJSG8HareqrJgEVC.	t	2020-04-16 22:52:29.485253	f	f	t	f
109	Security	User	securityuser@dispostable.com	$2b$10$8TerixiBDRGFatpWUm/ZO.8/6gPEBoJid1MWvb9c3ZQth3luFWFSe	t	2020-04-16 22:49:35.021502	f	t	f	f
\.


--
-- TOC entry 3211 (class 0 OID 19318)
-- Dependencies: 217
-- Data for Name: security_token; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.security_token (token, email, date_created) FROM stdin;
\.


--
-- TOC entry 3212 (class 0 OID 19325)
-- Dependencies: 218
-- Data for Name: stakeholder; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.stakeholder (id, name, address_1, address_2, city, state, zip, phone, latitude, longitude, website, daycode, open, close, daycode1, day1_open, day1_close, daycode2, day2_open, day2_close, daycode3, day3_open, day3_close, daycode4, day4_open, day4_close, daycode5, day5_open, day5_close, daycode6, day6_open, day6_close, daycode7, day7_open, day7_close, year_round, season_open, season_close, fm_id, notes, created_date, created_login_id, modified_date, modified_login_id, submitted_date, submitted_login_id, requirements, admin_notes, inactive, parent_organization, physical_access, email, items, services, facebook, twitter, pinterest, linkedin, description, approved_date, reviewed_login_id, assigned_login_id, agency_type, assigned_date, rejected_date, review_notes, claimed_login_id, claimed_date, instagram, admin_contact_name, admin_contact_phone, admin_contact_email, donation_contact_name, donation_contact_phone, donation_contact_email, donation_pickup, donation_accept_frozen, donation_accept_refrigerated, donation_accept_perishable, donation_schedule, donation_delivery_instructions, covid_notes, donation_notes, category_notes, eligibility_notes, food_types, languages, v_name, v_categories, v_address, v_email, v_phone, v_hours, verification_status_id, inactive_temporary) FROM stdin;
2945	Filipino Disciples Christian Church	301 N. Union Avenue		Los Angeles	CA	90026	(213)483-5821	34.067645999999996	-118.26441	https://www.fdccla.net/					1000	1050																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 13:11:21.510559-07	108	2020-05-21 13:53:41-07	110	Must follow safety recommendations and wear covering of nose and mouth.	Food Bank Distribution continues during the 2nd and 4th Saturday from 10am to 11am at FDCC.	f			info@fdccla.net								\N	\N	110		2020-05-23 20:11:21.18	\N		\N	2019-12-01 08:00:00					Pastor Jeffrey 	310-951-9656	jeffla2005@yahoo.com	t	t	t	t	receive donations before on weekdays, especially on friday.	call ahead		limited capacity (small fridge) 				English, Portuguese, French, Dutch	t	t	t	t	t	t	2	f
2886	Centro Cristiano Manantial de Vida	10035 Washington Street		Bellflower	CA	90706	(562)481-1642	33.898644	-118.1204073						1830	2030																						\N	needs more volunteers 	2019-12-01 00:00:00-08	\N	2020-05-30 10:57:49.139585-07	108	2020-05-30 10:52:26-07	110		contact around  11 am. came in contact gave me all the info and they have an increase in people coming said they need more help with volunteers 	f			jorgesal07@hotmail.com								2020-05-30 17:57:49.017	108	110		2020-05-25 23:42:09	\N		\N	2019-12-01 08:00:00					Jorge Salazar 	(562)481-1642	jorgesal07@hotmail.com	f	t	t	t		donation delivery or pickup if location is nearby to there location					canned, vegetables, meats, milk, fruits	English, Spanish	t	t	t	t	t	t	4	f
2867	Bethel AME Church- Richard Allen Center	7919 S.  Western Avenue		Los Angeles	CA	90047	(323)750-3240	33.9666659	-118.309331	https://bethelamela.com/					0730	1130																						\N		2019-12-01 00:00:00-08	\N	2020-05-30 08:29:40.131688-07	108	2020-05-29 10:58:51-07	110			f			bethelamechurch@gmail.com			facebook.com/BethelAmeLosAngeles					2020-05-30 15:29:39.696	108	110		2020-05-23 19:06:27	\N		\N	2019-12-01 08:00:00								f	f	f	f			Currently only the main office is open with modified hours from 9 am -3 pm on Tuesdays and Thursdays.					English	t	t	t	t	t	t	4	t
2928	East San Gabriel Valley Coalition For the Homeless	1345 Turnbull Canyon Road		Hacienda Heights	CA	91745	(626)333-7204	34.0099565429048	-117.9787491009288	https://www.esgvch.org					0830	1330	Tue	0830	1330	Wed	0830	1330	Thu	0830	1330	Fri	0830	1330										\N		2019-12-01 00:00:00-08	\N	2020-05-30 10:22:02.505037-07	108	2020-05-28 13:11:16-07	110		called and they are still operational keeping with there normal hours.\nnormal hours are listed above but the food pantry is only open on Saturdays at 9-12	f			esgvch@aol.com	hot bowels of soup, lunch bags	showers, hygiene kits, bus tokens, motels vouchers, life skills education, counseling, financial assistance, transitioning back to permanent housing, social services agencies and physical, mental health care providers and substance abuse therapy.	https://www.facebook.com/esgvch/				helps the homeless of Hacienda Heights giving them access to food, shelter along with medical help and therapy	2020-05-30 17:22:00.839	108	110		2020-05-24 03:55:17	\N		\N	2019-12-01 08:00:00					Megan Ryan 	(626)333-7204	esgvch@aol.com	t	t	t	t	call ahead							English	t	t	t	t	t	t	4	f
3054	Maranatha S.D.A. Community Center	3569 W. Manchester Boulevard		Inglewood	CA	90305	(818)-468-0935	33.96000149321933	-118.3347765	https://maranathabytheforum.org/ and https://marnathaca.adventistchurch.org (currently working on this one)					1400	1500	Sat4th	1400	1500																			\N	No fee	2019-12-01 00:00:00-08	\N	2020-05-30 11:04:26.664308-07	108	2020-05-29 13:27:47-07	110	None, open to the public	Got partial information from voicemail	f	Seventh Day Avenue		irabarksdale@scca.org		Community fairs, on-going community outreach, helpful living	https://www.facebook.com/maranathabytheforum/				We are a friendly, down to earth, multicultural Bible-based church that worships through prayer, praise, and community service.	2020-05-30 18:04:26.544	108	110		2020-05-26 17:08:59	\N		\N	2019-12-01 08:00:00		Sonia Barksdale	626-377-5834	soniamb2@yahoo.com	Pastor Ira Barksdale Jr.	(818)-468-0935	irabarksdale@scca.org	t	t	t	t	Second and Fourth Tuesday	Pastor needs prior notice of delivery	Still open				Non-perishable and perishable (when provided with it) milk, cheese, frozen fruit, frozen vegetables, chicken	English, Spanish	t	t	t	t	t	t	4	f
3160	St. Vincent de Paul Church	621 W Adams Blvd.		Los Angeles	CA	90007	(213)749-8950	34.02841693481995	-118.27653809351388	https://www.stvincentla.net/					0800	1100																						\N	If you are in need of a meal they typically meet the 1st Tuesday of the month in the church parking lot at 6:30 pm, but due to the pandemic of COVID-19 hours may differ. Call ahead of time to ensure they will be at the church.	2019-12-01 00:00:00-08	\N	2020-05-30 10:25:56.151209-07	108	2020-05-26 10:56:01-07	110	Must live in the  surrounding area and be in need of emergency assistance.		f			stvincentparishla@gmail.com	hygiene products, soaps, shampoos, diapers, baby food/formulas etc..items are based on donations recieved	provides prepared meals, emergency thrift store vouchers,emergency shelter assistance	https://www.facebook.com/stvincentparishla	https://twitter.com/stvincent_la	N/A	N/A		2020-05-30 17:25:56.005	108	110		2020-05-21 03:00:17	\N		\N	2019-12-01 08:00:00	https://www.instagram.com/stvincent_la/				Fr.David Nations C.M.	(213)749-8950 ext. 124	https://parish.stvincentla.net/	t	t	t	t	During normal business hours or online anytime\t	Please call ahead for delivery or pick up of items	Business and program operations may be affected due to ongoing precautionary measures, please contact the business directly for updated hours and availability.		Meals are served to the homeless in the church parking lot typically on the 1st Tuesday of the month at 6:30pm		Canned goods, grains, pastas, breads, cereals\nPLEASE NOTE: items are based on donations received	English,Spanish	t	t	t	t	t	t	4	f
2863	Ascension's Food Pantry	517 W. 112th Street		Los Angeles	CA	90044	(323)754-2978	33.933076	-118.282984	http://www.ascensionla.org/					0900	1100																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N		Church Office Hours- M-F 8:30am - 7:30pm, Sat & Sun 9 -  1pm. (closed for lunch)\nBilingual: Spanish	f			ascens@ascensionla.org							Ascension Catholic Church	\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4387	Families Forward	8 Thomas		Irvine	CA	92618	(949) 552-2727	33.643773	-117.721467																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3073	Our Lady of Victory Conference	410 E. Palmer Street		Compton	CA	90221	(310)631-5100	33.89825997141237	-118.21893637520576	http://ourladyofvictorycatholicschool.org/					0830	1000	SatLast	0830	1000																			\N		2019-12-01 00:00:00-08	\N	2020-05-30 08:54:06.149668-07	108	\N	\N		05/06/2020: No Answer, call back	f											2020-05-30 15:54:05.585	108	110		2020-05-25 23:27:14	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	4	t
2944	Faith Baptist Fellowship of Long Beach (formerly known as Filipino Baptist Fellowship)	2155 Atlantic Avenue		Long Beach	CA	90806	N/A	33.7963363	-118.1853545	http://faithlb.org/					1000	1300																						\N	FOOD DISTRIBUTION PAUSED CURRENTLY FOR COVID (5/9/2020).	2019-12-01 00:00:00-08	\N	2020-05-30 08:55:09.263534-07	108	\N	\N		Number formerly listed 310-212-5175 is no longer in service (5/9/2020).	f			catbagan.anthony@gmail.com								2020-05-30 15:55:08.747	108	110		2020-05-25 23:34:56	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	f	f	4	t
3125	Shepherd's Pantry - Glendora	657 E. Arrow Highway	Ste. J	Glendora	CA	91740	(626) 852-7630	34.1070477	-117.8509722	www.shepherdspantry.com					1700	1900	Thu	1700	1900																			\N		2019-12-01 00:00:00-08	\N	2020-05-30 10:59:16.734091-07	108	2020-05-28 13:23:14-07	110	Clients need ID showing proof of residency in LA County. Clients may receive food two times per month from any Shepherd’s Pantry location - the pantry keeps a database of clients to track usage.		f			info@shepherdspantry.com	Canned and boxed food, produce, fresh fruits, dairy/deli, frozen meat and bakery items	Food Pantry, Clothing Distribution, Resource Counseling, Prayer Support, Haircut Program, Home Food Delivery (different hours than pantry, Wed 4-6PM), Summer Reading Camp, Christmas Toy Store	https://www.facebook.com/shepherdspantry/			https://www.linkedin.com/company/shepherds-pantry/about/	Glendora Distribution Center	2020-05-30 17:59:16.084	108	110		2020-05-24 03:55:18	\N		\N	2019-12-01 08:00:00					Craig Cerro	626-852-7630	ccerro@shepherdspantry.com	t	t	t	t	Mon and Tues 9-11, Wed and Thu 4-6. Call ahead to schedule a different time	Call ahead if donating anything frozen -- cannot be defrosted. Frozen donations generally not encouraged for this reason. 		same info as baldwin park location				English	t	t	t	t	t	t	4	f
2860	All Saints' Episcopal Church Highland Park - People Assisting the Homeless (PATH) 	5619 Monte Vista Street		Los Angeles	CA	90042	323-255-6806	34.1117075	-118.1953492	http://www.allsaintsla.net/					0830	0900																						\N	Bilingual: Spanish	2019-12-01 00:00:00-08	\N	2020-05-25 10:38:10.868545-07	108	2020-05-24 15:54:23-07	110			f			allsaintsla@gmail.com			https://www.facebook.com/pages/All-Saints-Episcopal-Church-Highland-Park/115316101828836					2020-05-25 17:38:10.637	108	110		2020-05-23 17:20:34	\N		\N	2019-12-01 08:00:00								f	f	f	f					Saturday morning they provide breakfast, showers and laundry to their homeless neighbors. 			English	t	t	t	t	t	t	4	t
3133	St Vincent's DePaul (at St Andrew's Church)	140 Chestnut Street		Pasadena	CA	91103	(626)-792-4183	34.15039353257569	-118.1480895	https://www.saintandrewpasadena.org/					0900	1100																						\N		2019-12-01 00:00:00-08	\N	2020-05-30 11:11:07.732218-07	108	2020-05-30 11:08:12-07	110		Please contact:  President Carl Paneno.  Email cpaneno@yahoo.com for more information if needed.\n\nhttps://svdpla.org - email for the Organization that runs the pantry.  Contact name President Carl Paneno.  Email cpaneno@yahoo.com for more information of St Vincent's full services.	f	St. Andrew Catholic Church 		saintandrewpasadena@gmail.com			https://www.facebook.com/standrewpasadena/		https://www.pinterest.com/saintandrewpasa/			\N	\N	110		2020-05-30 18:11:07.282	\N		\N	2019-12-01 08:00:00	www.instagram.com/saintandrewpasadena/				Carl Paneno		cpaneno@yahoo.com	f	f	f	f			Phone number from website.  Email from Facebook		https://svdpla.org - email for the Organization that runs the pantry.  Contact name President Carl Paneno.  Email cpaneno@yahoo.com for more information of St Vincent's full services.			English	t	t	t	t	t	t	2	f
2990	Christ The Good Shepherd Coptic Orthodox Church	1535 Gundry Avenue		Long Beach	CA	90813	(562) 674-0288	33.7868869	-118.1744206						0930	1200	Tue	1330	1530	Thu	0930	1200	Thu	1330	1530													\N	Everyone is welcome.	2019-12-01 00:00:00-08	\N	2020-05-23 20:50:50.780483-07	108	2020-05-11 12:52:36-07	106	COVID Update: Masks are required in order to pick up food resources. 	Alina is the phone number contact	f			goodshepherdlb@gmail.com			https://www.facebook.com/meetchristlb/					\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00					Alina		goodshepherdlb@gmail.com	f	f	f	f								English	t	t	t	t	t	f	1	f
2966	Food Net-Willowbrook Senior Center	12915 Jarvis Avenue		Los Angeles	CA	90061	(310)217-5650	33.9150672	-118.2722211	https://wdacs.lacounty.gov/center/willowbrook/					1000	1200	Wed4th	1000	1200																			\N		2019-12-01 00:00:00-08	\N	2020-05-25 16:38:24.930912-07	108	\N	\N			f			SHamilton@wdacs.lacounty.gov			 					\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	f	f	f	t	f	f	1	f
3107	Salvation Army Redondo Beach	125 W. Beryl Street		Redondo Beach	CA	90277	(310) 318-2827	33.84627323	-118.3929677	https://redondobeach.salvationarmy.org					0900	1100	Tue	0900	1100	Wed	0900	1100	Thu	0900	1100	Fri	0900	1100										\N		2019-12-01 00:00:00-08	\N	2020-05-23 19:43:05.237319-07	108	\N	\N	Must be local resident	There is no food pantry at this location. The nearest Salvation Army Pantry is in Lomita.	t											2020-05-24 02:43:05.066	108	110		2020-05-23 15:56:23	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	4	f
3199	Young Hwa United Methodist Church	214 S. Loma Drive		Los Angeles	CA	90026	(213)413-4154	34.0607514	-118.2642047	https://younghwaumc.com/					1500	1545	Sat4th	1500	1645																			\N		2019-12-01 00:00:00-08	\N	2020-05-30 10:20:44.178351-07	108	2020-05-29 10:28:40-07	110		1. The phone was inactive \nI also tried calling: (213) 413-6734\nbut also a 1. The phone was inactive	t						https://www.facebook.com/pages/Young-Hwa-United-Methodist-Church/111893975509330					2020-05-30 17:20:44.023	108	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f							All- perishables, non perishables, donations.	English\nKorean	t	t	t	t	t	t	4	f
3178	United Gospel Outreach	7223 S. Main Street		Los Angeles	CA	90003	(323)758-1213	33.974001	-118.27395798793921						1100	1300																						\N		2019-12-01 00:00:00-08	\N	2020-05-25 16:19:03.22605-07	108	\N	\N		5/2/2020 Called but didn't get through, left a voice mail; confirmed address and phone number through Google\n5/8/2020 Called again, didn't get through again	f											\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	f	t	f	1	f
2876	Calvary Presbyterian Church	136 Hawthorne Boulevard		Hawthorne	CA	90250	(310)676-1144	33.92172120934403	-118.3524705	http://www.calvaryhawthorne.org					1200	1500																						\N	COVID: It is ok to start to line up by 11:30 as stated with the hours above but no earlier. There will be no one answering the phone in the coming future, but they will check their messages and respond to emails. Did not mention if their hours have changed at all or if they were shortened.	2019-12-01 00:00:00-08	\N	2020-05-25 16:40:11.504925-07	108	\N	\N		VM: Address, hours, COVID update. They said if you leave a number they will return the call.	f			calvarypres@sbcglobal.net								\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	f	t	t	f	1	f
4137	New Friends Homeless Center	17114 Ventura Boulevard		Encino	CA	91316	818-887-1109	33.94	-118.52	http://www.newfriendshomelesscenter.org																												\N	Went to voicemail of Pastor April. Meals.	2020-03-29 18:39:28-07	\N	2020-05-25 16:49:28.586649-07	108	\N	\N			f											\N	\N	\N	Meals	\N	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	f	f	f	f	f	f	1	f
4011	Family Promise of San Gabriel Valley	1005 East Las Tunas Drive	#525	Los Angeles	CA	91776	626-569-0991	33.94	-118.52	http://www.familypromisesgv.org																												\N	d at different locations week to week until they are able find permanent housing. We also provide a Day Center where families receive intensive weekly case management to assess and address their needs and connect them to wrap around services through our network of community partners.COVID-19 UPDATE: Right now families are being housed at different hotels to ensure the safety of everyone during  Please call during normal business hours and leave a message for someone to call you back. 	2020-03-29 18:39:28-07	\N	2020-05-25 10:48:07.480072-07	108	2020-05-12 15:33:04-07	106	Families with children that are interested in our shelter program, you can call us directly from Monday to Friday from 8:00 am to 4:00 pm 626-569-0991 or visit our website  http://www.familypromisesgv.org  to fill out the form.  \n\nNOTE: If you have not been connected to a Family Solutions Center in your geographical area, please call 211 to be connected.            \n\n	Spoke to a volunteer and she was able to verify the information I needed	f	N/A		program.manager@familypromisesgv.org	diapers,personal items,formula, wipes 	 Worksource Development, Healthcare, Childcare, Mental Health and Academic Resources,shelter for families with children	www.facebook.com/FamilyPromiseSGV	N/A	N/A	N/A		\N	\N	\N	Meals	\N	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	f	1	f
4020	Grant African Methodist Episcopal Church	10435 S. Central Avenue		Los Angeles	CA	90002	(323) 564-1151	33.941196	-118.254519	grantamechurch.org																												\N		2020-03-29 18:39:28-07	\N	2020-05-25 16:08:10.112084-07	108	\N	\N		Food Pantry\n5.3.2020:  confirmed phone and address online.  Sent FB message. Free warm meals for the community. Administrative Office Hours: 9:00 am – 5:00 mp Tuesday – Friday	f			grantamela@gmail.com			@GAMELosAngeles					\N	\N	110	Food Pantry	2020-05-25 23:08:10.112084	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	2	f
4355	APLA Health - The David Geffen Center	611 S. Kingsley Drive		Los Angeles	CA	90005	(213) 201-1600	34.06294959256161	-118.30287971830448	https://aplahealth.org/services/nolp-food-pantries-nutrition/																												\N	For services other than the food pantry, please check their website for updates.	2020-03-29 18:39:28-07	\N	2020-05-30 09:41:51.493352-07	108	\N	\N		There are several NOLP Food Pantry locations. I'm not sure if they are all on FOLA.\n\nEmailed, waiting for a response	f	APLA Health		nolp@apla.org	hygiene items and cleaning supplies	bilingual, one-on-one nutritional counseling and nutrition classes, fact sheets about a range of nutrition topics and recipes for use, yoga classes; medical, dental, and behavioral health services, Emergency Housing, Medical Transportation Services, etc.	https://www.facebook.com/APLAHealth	https://twitter.com/aplahealth			Vance North Necessities of Life Program (NOLP) Food Pantry	\N	\N	110		2020-05-23 19:36:08	\N		\N	2020-03-30 01:39:28	https://www.instagram.com/aplahealth/							f	f	f	f			Remain Open\nStaff will distribute groceries for Support Services For People Living with HIV (PLWH) at this location. Staff will also provide 1:1 phone or web-chat nutrition counseling services.				pre-bagged groceries include fresh dairy, frozen meats, fresh produce, and an assortment of canned and dry goods	English	t	t	t	t	t	t	2	f
2936	Esmirna Pentecostal Church	5414 N. Figueroa Street		Los Angeles	CA	90042	(323)254-0191	34.1072082	-118.196609	https://www.iglesiaesmirna.com/					1600	1800																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 12:03:23.020798-07	108	\N	\N		4/25 V. Illk \n(323)254-0191 - Left voicemail & emailed\n	f			iglesiaesmirna@yahoo.com								\N	\N	110		2020-05-23 19:03:23.020798	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
4415	Project Angel Food	922 Vine Street		Los Angeles	CA	90038	(323) 845-1800	34.087754881210685	-118.32658771729487	https://www.angelfood.org/																												\N		2020-03-29 18:39:28-07	\N	2020-05-25 10:54:14.294308-07	108	2020-04-18 13:02:55-07	106		got an automatic voicemail operator who said that the hours are between 9 am to 5 pm 	f					provides medicine	https://www.facebook.com/projectangelfood/				Provide food for the malnourished.	\N	\N	110		2020-05-25 17:54:14.11	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	2	f
4072	New Beginning Community Ministries Food Bank (formally Cory’s Kitchen)	13020 Francisquito Ave Baldwin Park, CA. 91706	Unit 10	Baldwin Park	CA	91706	(626) 671-0090	34.078923	-117.9894195	https://www.nbcministry.com																												\N	COVID Update: Drive through services. All workers will be wearing gloves and masks. Working on delivery options - Instagram informational video says to contact their office for delivery. \nBoth perishable and nonperishable food.\nPrepared food (Unsure)\nPlease check-in in the lobby.	2020-03-29 18:39:28-07	\N	2020-05-25 10:45:52.067491-07	108	2020-04-18 00:49:54-07	106	Providing services to anyone living in Los Angeles County. \nBring proof of residence (like a phone bill, driver’s license) on your first visit.\nFood may be received two times per month from any Shepherd’s Pantry location.	-Original phone number was inactive. New phone number takes you to machine answering system without any options to get information on food bank (asked for extension).\n-Instagram with weekly info on food bank: instagram.com/newbeginningcommunityministry/	f	Shepherds Pantry		info@nbcministry.com	Canned food, boxed food, produce, fresh fruits, dairy/deli, frozen meat, and bakery items. Baby diapers and baby food available on occasion based on supply (be sure to ask for specific needs.)	Prayer Support offered for all clients when they come for food. This is offered on an individual private basis and optional for the client.	facebook.com/NewBeginningCommunityMinistry					\N	\N	\N		\N	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	f	1	f
4246	North Seal Beach Senior Center	3333 St. Cloud Drive		Seal Beach	CA	90740	(562) 430-6079	33.780591	-118.0752975																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry\n(Seniors Only)	f											\N	\N	\N	Meals and Food Pantry\n(Seniors Only)	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4026	Los Alamitos Senior Center	10909 Oak Street		Los Alamitos	CA	90720	(562) 430-1073	33.80413956	-118.0758099																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4239	Salvation Army Inglewood	324 E. Queen Street		Inglewood	CA	90301	(310) 677-3375	33.96293575	-118.3509647	https://inglewood.salvationarmy.org/inglewood_corps/																												\N	I cannot find detailed information regarding the food pantry in the phone tree or online. Emailed them. 4/13 	2020-03-29 18:39:28-07	\N	2020-05-25 16:37:21.48414-07	108	\N	\N		Food Pantry	f					Offer various Social Services	https://www.facebook.com/tsainglewoodcitadel/					\N	\N	\N	Food Pantry	\N	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	f	f	f	f	f	1	f
4191	7th Day Adventist Church 	2322 Merton Avenue		Los Angeles	CA	90041	 323-257-5803	33.94	-118.52	http://seektobefamily.org/community/soup-kitchen																												\N		2020-03-29 18:39:28-07	\N	2020-05-25 16:47:46.50654-07	108	\N	\N		The call just went to voicemail.  The option was to leave a message for either one of three specific staff members or for general message / the pastoral staff, dial extension 101.	f											\N	\N	\N	Meals	\N	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	f	f	t	f	1	f
4216	Good Seed Community Development Corporation 	2814 W. Martin Luther King Boulevard		Los Angeles	CA	90008	323-758-5433 or 855-968-8452 or (855) YOUTH-LA	33.94	-118.52	https://www.goodseedcdc.org/																												\N		2020-03-29 18:39:28-07	\N	2020-05-25 11:12:42.13628-07	108	\N	\N		Meals	f			mail@goodseedcdc.org		emergency shelter, family crisis housing, or transitional housing, support groups, continued housing support, supported employment and case management services	https://www.facebook.com/goodseedcdc/	https://twitter.com/goodseedcdc				\N	\N	\N	Meals	\N	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	f	1	f
2880	Catholic Charities - Brownson House	1307 Warren Street		Los Angeles	CA	90033	(213) 251-3512	34.0521281	-118.2201373	http://catholiccharitiesla.org/where-we-are/program-directory-by-city/					0900	1300	Tue	0900	1300	Wed	0900	1300	Thu	0900	1300	Fri	0900	1300										\N	As of 4/3 per website: \n o CalFresh Applications processed via phone only; please call Roberto Ramirez at\n 213-251-3514\n o CalFresh Healthy Living – classes available online; please call Maria Cervantes at\n 213-251-3542\n	2019-12-01 00:00:00-08	\N	2020-05-30 10:07:22.125281-07	108	2020-05-27 00:05:03-07	110		4/18 Vicky Illk\n(213) 251-3512 - Left message\nOpen m-f 9-1pm\nNo email, no FB\n\n4/27 V. Illk\nVerified by Xochitl by email\nXHernandez@ccharities.org\n	f	Catholic Charities of Los Angeles, Inc.									Provides basic needs assistance with food, clothing, temporary shelter through motel vouchers, transportation, specialized programs for utility and rental assistance to low-income families, subject to funding availability; on-site assistance with applications for CalFresh benefits; parenting classes, life skills training, support groups for women and the elderly; special events throughout the year; free lunch and summer program for youth, ages 7 to 12.	\N	\N	110		2020-05-30 17:07:21.677	2020-05-16 19:22:39		\N	2019-12-01 08:00:00		Xochitl		XHernandez@ccharities.org			XHernandez@ccharities.org	f	f	f	f								English	t	t	t	t	t	t	2	f
4227	Salvation Army Citadel	3092 Long Beach Boulevard		Long Beach	CA	90807	(562) 426-7637	33.813171	-118.188927																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry (must\nregister)	f											\N	\N	\N	Food Pantry (must\nregister)	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4094	Salvation Army Simi Valley	1407 E. Los Angeles Avenue		Simi Valley	CA	93065	(805) 527-1070	34.273602	-118.772541																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3150	St. Luke Catholic Community	5605 Cloverly, Ave.		Temple City	CA	91780	(626)291-5900	34.1001065	-118.0635668	https://stluketemplecity.org/					1300	1400																						\N		2019-12-01 00:00:00-08	\N	2020-05-30 10:14:01.74929-07	110	\N	\N			f	St. Luke Catholic Community										\N	\N	110		2020-05-30 15:44:40	\N		\N	2019-12-01 08:00:00								f	f	f	f			Call (626) 605-3232 and one of our SVdP members will make arrangements to deliver or have you safely pick up the food at the Pantry. The Community Table is currently closed while Masses are suspended due to COVID-19. 					English	t	t	f	f	t	f	2	f
4203	Bryant Temple AME Church	2525 W. Vernon Avenue		Los Angeles	CA	90008	323.293.6201	34.00372147183905	-118.3211595																													\N	- Same hours during COVID-19	2020-03-29 18:39:28-07	\N	2020-05-25 17:18:22.588252-07	108	\N	\N	- No requirements	- FOLA liaison: Shelia Alvarez, Email: shelia_alvarez@yahoo.com	f	N/a					https://www.facebook.com/pages/category/African-Methodist-Episcopal-Church/Bryant-Temple-AME-259199377138/					\N	\N	110		2020-05-26 00:18:22.588252	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	2	f
3058	Mision Cristana Monte de Sion	6315 Eastern Avenue		Bell Gardens	CA	90201	(562)544-4264	33.9768389	-118.1637179						2030	2130																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 20:38:09.852663-07	108	2020-05-11 12:52:36-07	106			f											\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	f	f	f	f	f	f	1	f
3186	Visions Community Outreach	2300 S. Griffith Avenue		Los Angeles	CA	90011	(310)920-1026	34.0220569	-118.255854						1000	1200	Sat4th	1000	1200																			\N		2019-12-01 00:00:00-08	\N	2020-05-23 19:58:34.730155-07	108	2020-05-11 12:52:36-07	106			f											\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	1	f
4365	Revive Church (Formally 7th Street Church) 	668 Obispo Avenue		Long Beach	CA	90814	(562) 434-3408	33.774957	-118.1545815	www.revivelachurch.org																												\N		2020-03-29 18:39:28-07	\N	2020-05-25 12:50:37.87169-07	108	\N	\N		\n	f			info@lifeatrevive.com								\N	\N	110	Food Pantry	2020-05-25 19:50:35.694	\N		\N	2020-03-30 01:39:28					Dalila Rocha	562-754-0981	dalila@revivelachurch.org	f	t	t	t		call after 10am	Now giving food on Sunday afternoon.	We give whatever the food bank of shooter a California gives us, can food and frozen and fruit’s and vegetables when available			Canned food, frozen, fruit, and vegetables when available.	English\nSpanish	t	t	t	t	t	f	2	f
2946	The Fame Church Pantry	2270 S. Harvard Boulevard		Los Angeles	CA	90018	(323) 823-2132	34.03429200000001	-118.3061565	http://www.famechurch.org/ministry/food.html					0900	1200																						\N	04/04/2020: Were not available but call back	2019-12-01 00:00:00-08	\N	2020-05-25 17:19:27.854865-07	108	\N	\N		Food Pantry Coordinator, Vanessa Parker at (323) 823-2132\n_____________________________________\nMarye Barnett, Missionary Society President\nToni Nelson, Food Pantry Chariperson	f	First African Methodist Episcopal Church					https://www.facebook.com/First-AME-Church-of-Los-Angeles-294089560647149/	https://twitter.com/famechurch			Sarah Allen Women's Missionary Society \nFirst AME Church of Los Angeles	\N	\N	110		2020-05-26 00:19:27.854865	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
2976	Gospel Mission Baptist Church	7301 S. Avalon Boulevard		Los Angeles	CA	90003	323-759-8087	33.97365150874258	-118.26520453970215	http://gospelmissionmbc.org/contact.html					1100	1200																						\N		2019-12-01 00:00:00-08	\N	2020-05-25 16:08:09.748829-07	108	\N	\N	first, come first serve	Instagram:https://www.instagram.com/heallosangelesfdn/?utm_source=ig_embed\nTheir Instagram explains what they do but I cannot verify because of no one answered	f			gmbc@gospelmissionmbc.org			https://www.facebook.com/pages/Gospel-Mission-Baptist-Church/111706232198702					\N	\N	110		2020-05-25 23:08:09.748829	\N		\N	2019-12-01 08:00:00	https://www.instagram.com/heallosangelesfdn/?utm_source=ig_embed							f	f	f	f								English	t	t	t	t	t	t	2	f
2932	Friends in Deed- Ecumenical Council of Pasadena Area Congregations	444 East Washington Boulevard 		Pasadena	CA	91104	626-797-6072	34.1687151	-118.1413359	www.friendsindeedpas.org					0900	1500	Wed	0900	1500																			\N	COVID-19 updates: The organization is making pre-packed bags to hand out to people. No one is allowed in our food pantry. People must wear masks and practice social distancing when coming for food.\n\n\nThe pantry is stocked with canned goods, dry goods, juice cereal, and other shelf-stable foods. In addition to providing shelf-stable foods, the pantry provides meat & protein, fresh fruits & vegetables, and foods.\n\n\nOn Pantry day, anyone arrives by 9 AM will have a chance at being first when we open, via our Lottery.  Anyone that comes after the Lottery has started, will just put their name in the next available slot on the “Sign In” sheet. It doesn’t matter which day people visit the Pantry, but they are only allowed to come one time per week for food.	2019-12-01 00:00:00-08	\N	2020-05-23 20:58:34.556136-07	108	\N	\N	Low income, no income, and those affected by coronavirus outbreak	Received an email response Tim Nistler, Food Pantry Program Director of Friends in Deed, confirming that the information provided above is up-to-date and accurate. He is the appropriate person to contact regarding updates to the food pantry: email is pantry@friendsindeedpas.org and telephone is 626-797-6072. (Updated: 4/29/20 at 11:15AM).	f			info@friendsindeedpas.org	toiletries, diapers & formula, pet food 		https://www.facebook.com/FriendsInDeedPasadena/					\N	\N	110		2020-05-24 03:58:34.556136	\N		\N	\N					Tim Nistler	626-797-6072	pantry@friendsindeedpas.org	f	f	f	f								English	t	t	t	t	t	t	2	f
2925	East L.A. Bilingual S.D.A. Church	700 Hoefner Avenue		Los Angeles	CA	90022	(323)633-4734	34.0209372	-118.1493743						1730	1830	Wed3rd	1730	1830	Sat	1200	1245																\N		2019-12-01 00:00:00-08	\N	2020-05-19 21:31:44.75615-07	108	\N	\N			f											\N	\N	110		2020-05-20 04:31:44.75615	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
2926	East LA Community Corporation	611 S. Lorena Street		Los Angeles	CA	90033	(323)269-4214	34.030634	-118.199474						0900	1100																						\N		2019-12-01 00:00:00-08	\N	2020-05-19 21:32:19.320063-07	108	\N	\N			f											\N	\N	110		2020-05-20 04:32:19.320063	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
4085	Proyecto Pastoral At Dolores Mission	135 N. Mission Road		Los Angeles	CA	90033	(323) 881-0018	34.04885381	-118.2276699																													\N		2020-03-29 18:39:28-07	\N	2020-05-20 20:01:02.548741-07	108	\N	\N		Meals Provided	f											\N	\N	110	Meals Provided	2020-05-21 03:01:02.548741	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	f	f	f	f	2	f
4281	Project 29:11	422 N. 1st Avenue		Covina	CA	91723	(626)373 2876	34.08958272	-117.8857835																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3144	St. James Episcopal Church-Hope Net	3903 Wilshire Boulevard		Los Angeles	CA	90010	(323)934-5870	34.062042	-118.3119697						0800	0900																						\N		2019-12-01 00:00:00-08	\N	2020-05-30 18:37:53.953065-07	108	\N	\N			f											\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	f	f	f	f	f	f	1	f
3120	San Miguel Church	2214 E. 108th Street		Los Angeles	CA	90059	(323)569-5951	33.937263	-118.23232949999999						0800	0930																						\N		2019-12-01 00:00:00-08	\N	2020-05-30 08:51:57.752937-07	108	\N	\N			f											2020-05-30 15:51:57.604	108	110		2020-05-21 03:03:48	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	4	t
4008	Anaheim United Methodist Church	1000 S. State College Boulevard		Anaheim	CA	92806	(714) 776-5710 or 714-776-4533	33.8250003	-117.8891337	https://www.anaheimumc.org/																												\N	COVID Updates: Office is closed and the staff is working from home. All in-person events are closed. \n\n	2020-03-29 18:39:28-07	\N	2020-05-25 11:11:26.50486-07	108	\N	\N		4/14/20 emailed them\nEncourage email to reach them, as all are working remotely. Can also leave a voicemail. \n\nResources they list on their website:\nLunches of Love\nLunches of Love provides shelf-stable bagged lunches to those in need.\nPanera Bread Pickup\nPanera Bread has partnered with many organizations like ours to reduce food waste and to combat hunger.\nWe pick up the donation from Panera bread on Wednesday late evenings and deliver it to Mary’s Kitchen on Thursday mornings.\nFamily Food Boxes\nThese boxes are filled with shelf-stable items. We deliver these boxes to three local Community Family Resource Centers in Anaheim. \nSandwich Making Ministry\nWe gather once a month to prepare 100+ sandwiches to be used in the sack lunches distributed at Mary’s Kitchen.\nMobile Pantry @ Native American United Methodist Church\nAUMC and NAUMC partner to support this Second Harvest Mobile Pantry. Families are able to get fresh produce and other pantry items.	f			office@anaheimumc.org								\N	\N	\N	Food Pantry	\N	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	f	1	f
2869	Bethel Unspeakable Joy Christian Church	8724 S. Central Avenue		Los Angeles	CA	90002	(323)585-5939	33.9585498	-118.256075	http://www.g12joy.net/page9.html					0800	1000	Sat4th	0800	1000																			\N	Main Office Number is (323) 585-5939; open Monday - Friday 7:30 am - 4:00 pm\nCan leave a message in various mailboxes for personnel, with extensions\nCommunity Dining every Tuesday at 12 noon - "Spiritual Dine with us at our noonday feast" \nFood Giveaway 2nd and 4th Saturday of the month at 8 am. (hours may vary, not confirmed)	2019-12-01 00:00:00-08	\N	2020-05-23 14:10:11.940401-07	108	\N	\N	None	4/18 emailed\nAddress Confirmed!\n	f			bethel_church@g12joy.net								\N	\N	110		2020-05-23 21:10:11.940401	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
3012	Iglesia Pentecostal Templo Calvario	8824 Long Beach Boulevard		South Gate	CA	90280	(310)713-1428	33.956026	-118.220037	https://www.templocalvariosouthgate.com/					1300	1500	Tue	1900	2100																			\N		2019-12-01 00:00:00-08	\N	2020-05-30 10:09:44.787698-07	108	\N	\N		closed confirmed by number in the contact	t			info.templocalvario@gmail.com			https://www.facebook.com/tcalvariosouthgate/					\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	f	f	f	t	f	1	f
4116	Los Angeles Education Partnership-Bethune Middle School	155 W. 69th Street		Los Angeles	CA	90003	(323) 541-1800	33.97738751	-118.275606	https://www.bethunems.org/																												\N		2020-03-29 18:39:28-07	\N	2020-05-25 11:18:59.034036-07	108	\N	\N		- Was not able to get a hold of contact, no voicemail. \n- Food Pantry (Students Only) - Every other Wednesday, not sure if it is still going on during COVID-19. Next food distribution was scheduled for May 20, 2020 according to school calendar.	f					LAUSD Mental Health Hotline, free computer and internet hotspots (for students only)		https://twitter.com/LDSBethuneMS				\N	\N	\N	Food Pantry (Students\nOnly)	\N	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	f	f	t	f	1	f
2995	Hollywood West Tenant Action Committee	5823 Willoughby Avenue		Los Angeles	CA	90038	(323)461-4957	34.0873928	-118.3231596						1600	1800																						\N		2019-12-01 00:00:00-08	\N	2020-05-25 16:33:11.369322-07	108	\N	\N		Telephone number (323)461-4957 is a fax machine - PMG 4/25/2020	f											\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	f	f	f	f	f	f	1	f
4095	Morning Star Outreach Ministry	1416 N. Mentor Avenue		Pasadena	CA	91104	626.794.4875	34.170224	-118.130729																													\N		2020-03-29 18:39:28-07	\N	2020-05-30 14:58:32.881553-07	108	\N	\N			f											\N	\N	110		2020-05-30 16:19:07	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	f	f	f	f	f	f	2	f
2959	Food Net - Centro Maravilla  (AKA:  Centro Maravilla Service Center| Pantry Program)	4716 E. Cesar Chavez Avenue		Los Angeles	CA	90022	(323)260-2804	34.0402137	-118.1643033	https://wdacs.lacounty.gov/center/centro-maravilla/#					0800	1600	Tue	0800	1600	Fri	0800	1600																\N	The center accepts food donations from individuals and organizations.	2019-12-01 00:00:00-08	\N	2020-05-23 12:03:23.593975-07	108	\N	\N	Eligibility is not required to access this program.	4/25/2020  No answer	f	Workforce Development Aging & Community Services		AMichel@wdacs.lacounty.gov							Also known as the Pantry Program, provides food to low-income families, individuals and seniors.  	\N	\N	110		2020-05-23 19:03:23.593975	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
4242	Houghton Park Sr Ctr	3301 E. 65th Street		Long Beach	CA	90805	(562) 428-6538	33.872380426885435	-118.15476457311455																													\N		2020-03-29 18:39:28-07	\N	2020-05-26 10:17:35.140507-07	108	\N	\N	must be a senior	05/26/20: No answer, call back	f											\N	\N	110	Meals and Food Pantry\n(Seniors Only)	2020-05-25 20:31:51	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	f	t	f	2	f
3008	Iglesia Fuente de Vida Community Center	11134 Saticoy Street		Sun Valley	CA	91352	(818)765-0705	34.2082145	-118.3738402						1230	1300	Tue	0900	1000	Wed	0900	1000																\N		2019-12-01 00:00:00-08	\N	2020-05-23 11:10:55.065113-07	108	\N	\N			f											\N	\N	110		2020-05-23 18:10:55.065113	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
3157	St. Philip's Episcopal Church	2800 Stanford Avenue		Los Angeles	CA	90011	(323)291-8917	34.0186835	-118.2606782						0730	0830	Tue4th	0730	0830																			\N		2019-12-01 00:00:00-08	\N	2020-05-23 19:52:42.497689-07	108	2020-05-11 12:52:36-07	106			f											\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	f	t	t	1	f
2987	Hawaiian Gardens Food Bank	21411 Norwalk Boulevard		Hawaiian Gardens	CA	90716	(562)860-9097	33.8348574	-118.0723646						1400	1800	Thu	0930	1530																			\N		2019-12-01 00:00:00-08	\N	2020-05-25 16:57:14.023223-07	108	\N	\N			f											\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	f	f	f	f	f	f	1	f
2961	Food Net-Florence Firestone Center	7807 S. Compton Avenue		Los Angeles	CA	90001	(323) 586-6502	33.96767755176295	-118.24771204414553	https://wdacs.lacounty.gov/wp-content/uploads/2020/03/Emergency-Food-Assistance-Program_FFSC.pdf					0900	1300																						\N	Must sign up to be eligible for food distributions. Call  (323) 586-6502 Monday-Friday between 8:00am-5:00pm 	2019-12-01 00:00:00-08	\N	2020-05-25 16:27:37.165637-07	108	\N	\N	Service is restricted to Los Angeles residents.\nAPPLICATION PROCEDURE: Begining March 18, 2020, food distribution will take place by appointment only. To schedule an appointment call (323) 586-6502 Monday-Friday between     8:00 am -5:00 pm. Callers must provide first and last name, address, telephone number, birthdate and household size during application call with the agency.	5/13/20 : verified participant eligibility, location, date, and time with the receptionist. 	f	N/A		SSoto@wdacs.lacounty.gov		Services provided are: job referrals, elderly care services, emergency food assistance, transportation assistance, utility assistance .					Florence Firestone Center is affiliated with the Workforce Development Aging and Community Service WDACS	\N	\N	110		2020-05-25 23:27:37.165637	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
2871	Blessed Sacrament Food Pantry-Hope Net	6657 Sunset Boulevard		Hollywood	CA	90028	(323)426-6311	34.0985135	-118.3351039	https://blessedsacramenthollywood.org/					0900	1200																						\N		2019-12-01 00:00:00-08	\N	2020-05-25 16:36:04.603588-07	108	\N	\N			f						BlessedHollywood	BSCHollywood				\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	f	f	f	f	f	f	1	f
4086	Guadalupe Homeless Project - Women's Shelter 	135 N. Mission Road		Los Angeles	CA	90033	323-604-9985 or 323-881-0018	33.94	-118.52	http://www.proyectopastoral.org																												\N	Bilingual - Spanish\n	2020-03-29 18:39:28-07	\N	2020-05-23 20:41:37.925213-07	108	2020-05-11 12:52:36-07	106		2. Couldn't talk, call back at the following time:\nMonday from 1-3pm (Ask Maria)  to get more information\nMeals\n2. Answered in Spanish or a thick accent and hung up just before I finished the intro prompt\nRecommend calling back with Spanish-speaking volunteer	f			csanchez@proyectopastoral.org			https://www.facebook.com/ProyectoPastoral/					\N	\N	\N	Meals	\N	\N		\N	2020-03-30 01:39:28								f	f	f	f								English\nSpanish	t	f	t	t	t	f	1	f
2907	Coast Christian Fellowship	4000 Pacific Coast Highway		Torrance	CA	90505	(310) 373-8573	33.8065814	-118.3566268	http://www.coastchristian.org/					1600	1800																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 19:23:13.17533-07	108	\N	\N	N/A	John Darragh talked to Zonia at the office. She says they discontinued the program 2 years ago.\nWasn't be to get through or leave a message.\n\n	t	N/A		info@coastchristian.org	N/A	N/A						2020-05-24 02:23:13.001	108	110		2020-05-23 15:56:24	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	4	f
3997	Los Angeles Regional Food Bank	1734 East 41st St.		Los Angeles	CA	90058	(323) 234-3030	34.00801443130018	-118.24200190161002	https://www.lafoodbank.org/																												\N		2019-12-08 12:55:45-08	108	2020-05-23 20:55:14.956349-07	108	\N	\N		Went straight to voicemail. Sources and acquires food and other products and distribute to needy people through charitable agencies or directly through programs. Local Distribution Center for The Emergency Food Assistance Progam (TEFAP) under the California Dept of Social Services, under the USDA Food and Nutrition Service.  Does not have a Food Pantry at this location.	f											\N	\N	110		2020-05-24 03:55:14.956349	\N		\N	2019-12-08 20:55:45								f	f	f	f								English	t	t	t	t	t	t	2	f
2893	Chinese Community Service Center	1725 Beverly Boulevard	Ste 1-B	Los Angeles	CA	90026	(323)483-3035	34.065401	-118.266495						0900	1200	Tue	0900	1200																			\N		2019-12-01 00:00:00-08	\N	2020-05-30 00:37:27.798852-07	108	\N	\N		could not find website or facebook page.\ncalled but no answer, mailbox is full	f											\N	\N	110		2020-05-23 18:33:01	\N		\N	2019-12-01 08:00:00								f	f	f	f								English\nChinese	t	t	t	f	t	f	2	f
4331	Union Rescue Mission	545 S. San Pedro Street		Los Angeles	CA	90013	(213) 347-6300	34.04304288	-118.2447235	http://www.valleyparkchurch.com																												\N		2020-03-29 18:39:28-07	\N	2020-05-23 11:33:00.788408-07	108	\N	\N		Homeless Shelter	f											\N	\N	110	Homeless Shelter	2020-05-23 18:33:00.788408	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	f	f	f	f	f	f	2	f
4231	Los Angeles Mission	303 E. 5th St. 		Los Angeles	CA	90013	(213) 629-1227	34.04533389	-118.2446693	https://losangelesmission.org																												\N		2020-03-29 18:39:28-07	\N	2020-05-28 18:54:40.749302-07	108	\N	\N		Homeless Shelter	f			RSutton@lamission.net			https://www.facebook.com/LosAngelesMission/					\N	\N	110	Homeless Shelter	2020-05-23 18:33:00	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	f	2	f
4373	City Reach Church South L.A.	7106 Sorensen Avenue		Whittier	CA	90606	(562) 774-6444	33.97686180653825	-118.05403173729017	http://whittier.cityreachchurch.org																												\N	Instagram: cityreachwhittier	2020-03-29 18:39:28-07	\N	2020-05-25 16:41:21.037793-07	108	\N	\N		Church phone (562) 698-2564\nIG post says they served 771 people at the pantry on March 31	f	CityReach Church		cityreachwhittier@gmail.com		Also has a Hope Homes program for formerly incarcerated, and substance abuse recovery.	@cityreachwhittier					\N	\N	\N		\N	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	f	1	f
3129	Southeast Cities Service Center (formerly Southeast Churches Service Center)	2780 E Gage Ave.		Huntington Park	CA	90255	(323)585-8254	33.981390000000005	-118.2203145						0900	1600	Tue	0900	1600	Wed	0900	1600	Thu	0900	1600	Fri	0900	1600										\N		2019-12-01 00:00:00-08	\N	2020-05-25 16:32:57.895531-07	108	\N	\N		Called (323)585-8254 4/18 10 am, left voicemail\nEmailed southeastcsc@gmail.com 4/18 am\nHours historical and not verified\nPotential other address: 7600 State St, Huntington Park, CA 90255, USA	f			southeastcsc@gmail.com			@scsc.org					\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	f	t	f	t	f	f	1	f
4069	Los Angeles Education Partnership-Edison Middle School	1300 E. 64th Street		Los Angeles	CA	90001	(323) 826-2500	33.98153662	-118.2520022																													\N		2020-03-29 18:39:28-07	\N	2020-05-23 20:40:22.106152-07	108	2020-05-11 12:52:36-07	106	Students only	Food Pantry (Students\nOnly)	f											\N	\N	\N	Food Pantry (Students\nOnly)	\N	\N	still no hours	\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	f	t	f	1	f
2947	First Baptist Church-Hope Net	760 S. Westmoreland Avenue		Los Angeles	CA	90005	(213) 384-2151 or (213) 389-9949	34.0582323	-118.2886022	https://fbcofla.org/outreach-programs-los-angeles/					0800	0930																						\N	HOPE-NET FOOD PANTRY\nCLOSED Until Further Notice	2019-12-01 00:00:00-08	\N	2020-05-25 12:58:50.22774-07	108	\N	\N		04/04/2020: Weren't available but call back\n5/8/20:  This site is temporarily closed according to the website.  Sent out an email to confirm closure. 	t			myra@hopenetla.org								2020-05-25 19:58:50.042	108	110		2020-05-23 15:56:17	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	4	f
4370	For The Love Of Our Veterans	700 N. Bullis Road		Compton	CA	90221	(310) 480-5657	33.90115253044278	-118.20689375463648																													\N		2020-03-29 18:39:28-07	\N	2020-05-30 08:53:09.714326-07	108	\N	\N		*couldn't find any social media or website\n05/06/2020: no answer, call back	f											2020-05-30 15:53:09.539	108	110	Meals Provided	2020-05-25 23:27:14	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	f	4	t
2862	Ananda Marga of L.A., Inc.	1245 S. Norton Avenue		Los Angeles	CA	90019	818-414-7737	34.0483572	-118.3238487						0930	1030																						\N	1. Phone number disconnected and not in service -- research to make sure out of business. \nUpdate April 7: same situation as above. 	2019-12-01 00:00:00-08	\N	2020-05-23 19:19:13.498274-07	108	\N	\N		4/14/20 found new phone number and LM\n323-734-7211 - landline	t											2020-05-24 02:19:13.346	108	110		2020-05-23 15:56:19	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	4	f
3026	Jesus Christ the Redeemer Center	755 E. 223rd Street		Carson	CA	90745	562-450-8700	33.82433952790115	-118.26197099999999						1100	1130																						\N	JCRC food pantry is drive-through only and is operated on a first-come, first-serve basis.	2019-12-01 00:00:00-08	\N	2020-05-25 10:55:41.642667-07	108	2020-05-24 10:19:44-07	110	None	An alternative contact number is (661) 220-9348. No email provided.\n\n\nJCRC Food Program confirmed that the provided information is correct via Facebook Messenger (Updated: 5/14/20 at 5:13PM).	f						https://www.facebook.com/Jesus-Christ-the-Redeemer-Center-Food-Program-779298499091061/					\N	\N	110		2020-05-25 17:55:40.994	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
2940	Family Church Whittier	8434 S. Greenleaf Avenue		Whittier	CA	90602	562-698-6737	33.9627706	-118.0395279	http://familychurch.co/					1015	1045	Sun	1215	1230	Sun	1345	1415																\N	(626)893-1236 - cell number VM says "My Dad is not available right now.  Please leave name and phone number so he can call you back."  I left info@foodoasis.la	2019-12-01 00:00:00-08	\N	2020-05-23 20:29:04.108592-07	108	2020-05-11 12:52:36-07	106		04/04/2020: Voicemail: Weren't available but call back	f			paul@familychurch.co			/fcwhittier/					\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	1	f
2950	First Lutheran Church of Inglewood	600 West Queen Street		Inglewood	CA	90301	(310)674-5103	33.9624612	-118.3665755	http://firstlutheranofinglewood.org/					1000	1130	Thu4th	1000	1130																			\N		2019-12-01 00:00:00-08	\N	2020-05-23 20:32:04.896671-07	108	2020-05-11 12:52:36-07	106		Did not get through. The phone line sounded like it was occupied by a dial-up modem? \nSame note as above for 4/7\n4/14/20 the number is a fax number, sent FB message	f						https://www.facebook.com/FirstLutheranChurchofInglewood/					\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	f	t	f	1	f
4271	Emmanuel Presbyterian Church	4017 E. 6th St		Long Beach	CA	90814	(562) 439-8946	33.77353146	-118.1455425																													\N	(562) 439-8946 Phone number is no longer active.	2020-03-29 18:39:28-07	\N	2020-05-23 19:20:19.31451-07	108	\N	\N			t											2020-05-24 02:20:19.176	108	110	Food Pantry	2020-05-23 15:56:25	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	4	f
4363	Mt. Tabor Missionary Baptist Church	6614 S Western Avenue		Los Angeles	CA	90047	(323) 753-3189	33.978681	-118.308942																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4124	Daniel's Place 	1619 Santa Monica Boulevard		Santa Monica	CA	90404	(310) 392-5855	34.026059691384276	-118.48329972191115	http://www.stepuponsecond.org/																												\N		2020-03-29 18:39:28-07	\N	2020-05-23 20:44:26.649491-07	108	2020-05-11 12:52:36-07	106		VM instructs to press "to speak to a person", but there is a recording saying that the Voice Mailbox is full and can not receive messages.  It then hangs up.  \nhttps://www.instagram.com/stepuponsecond/\n4/14/20 sent FB message4/20\n4/20 - Best person to follow up with: Deidre Strohm,  dstrohm@stepuponsecond.org	f					Workforce development, Digital Education, Programs for Transitional Youth, Veterans Affairs Supportive Housing	https://www.facebook.com/EndHomelessnessNow	https://twitter.com/stepuponsecond				\N	\N	\N	Meals	\N	\N		\N	2020-03-30 01:39:28	https://www.instagram.com/stepuponsecond/				Deidre Strohm		dstrohm@stepuponsecond.org	f	f	f	f								English	t	f	f	f	t	f	1	f
4329	Midnight Mission 	601 South San Pedro Street		Los Angeles	CA	90013	213.624.4588	34.042248	-118.245969	midnightmission.org																												\N	213 624 9258 Phone number goes to front desk, Kitchen extension 1411\nBest liaison: Public Affairs department - Georgia Berkovich (gberkovich@midnightmission.org 213.624.4588)\n\nPrepared Food: Y\nDistribute food (hot meals) directly to public\nEach meal goes about an hour, public must be there at serving times to get a meal. Serving times: Breakfast at 6:00 am, lunch at 12:15 or 12:30 pm, dinner at 4:30 pm. Open 7 days/week, 365 days/year.\nShares food with other organizations around area, gets food from food banks.\nnumbers of customers jump at end of month when public gets relief checks (many of their clients are homeless).\n\nCOVID 19 impacts: have to use Styrofoam plates, public can't come in and sit down (like they would normally), walk-through serving instead. Hours are unchanged, but reduced staffing (not admitting any volunteers - rely on volunteers to serve most meals under normal circumstances)	2020-03-29 18:39:28-07	\N	2020-05-23 20:46:51.002191-07	108	2020-05-11 12:52:36-07	106	Rent receipts necessary for food boxes\nNo requirements for hot meals		f	N/A		gberkovich@midnightmission.org	Toiletries (hygiene kits) occasionally. Food boxes once a week on Friday - requires rent receipt.		https://www.facebook.com/TheMidnightMission					\N	\N	\N		\N	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	f	t	t	t	f	1	f
3006	Iglesia de la Comunidad Presbyterian Church	115 N. Avenue 53		Los Angeles	CA	90042	(323)257-4352	34.1073922	-118.1981957						1030	1130	Thu3rd	1030	1130																			\N		2019-12-01 00:00:00-08	\N	2020-05-30 10:42:15.581992-07	108	\N	\N		voicemail can not find info on the organization 	f						https://www.facebook.com/pages/Iglesia-De-La-Communidad/205013732942468					\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	f	f	f	f	f	f	1	f
3110	Salvation Army- East L.A.	140 N. Eastman Avenue		Los Angeles	CA	90063	(323)263-7577	34.036961	-118.1854747						0900	1600	Tue	0900	1600	Wed	0900	1600	Thu	0900	1600	Fri	0900	1600										\N		2019-12-01 00:00:00-08	\N	2020-05-30 21:54:23.101892-07	108	\N	\N			f											\N	\N	110		2020-05-23 17:49:14	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	f	t	f	2	f
4381	Los Angeles Regional Food Bank 	7400 Tujunga Avenue		North Hollywood	CA	91605	818-901-9480	33.94	-118.52	http://www.lsssc.org/location/san-fernando-valley-canoga-park																												\N	Phone number is for Lutheran Social Services of San Fernando Valley, at Valley Lutheran Church, which operates the food bank on Tuesdays from 11:00 am to 2:00 pm.\nSe habla español.\nClosed December 25, 26, 29 and January 2 and 5.	2020-03-29 18:39:28-07	\N	2020-05-23 20:48:30.567486-07	108	2020-05-11 12:52:36-07	106	Public must bring own bag and ID.		f											\N	\N	110		2020-05-24 03:48:29.922	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	2	f
3093	Redeemer Missionary Baptist Church	1631 W. Adams Boulevard		Los Angeles	CA	90007	(323)732-4124	34.0331289	-118.2983987						1000	1300																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 09:56:06.085005-07	108	\N	\N			f											\N	\N	110		2020-05-23 16:56:06.085005	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
3190	White Memorial S.D.A. Church	401 N. State Street		Los Angeles	CA	90033	(323)264-2170	34.0492972	-118.2157793						1000	1200	Tue3rd	1000	1200																			\N		2019-12-01 00:00:00-08	\N	2020-05-22 20:20:06.318004-07	108	\N	\N			f											\N	\N	110		2020-05-23 03:20:06.318004	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
3007	Iglesia Evangelica Camino de Santidad	958 N. Maclay Avenue		San Fernando	CA	91340	(818)898-3848	34.2931026	-118.4273834						1900	2100																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 11:10:54.943407-07	108	\N	\N			f											\N	\N	110		2020-05-23 18:10:54.943407	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
3111	Salvation Army- L.A. Central Corp	906 S. Francisco Street		Los Angeles	CA	90015	(213)896-9178	34.0466096	-118.2646275						0900	1600	Tue	0900	1600	Wed	1200	1600	Thu	1200	1600													\N		2019-12-01 00:00:00-08	\N	2020-05-23 11:33:01.359975-07	108	\N	\N			f											\N	\N	110		2020-05-23 18:33:01.359975	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	f	f	t	f	f	f	2	f
4270	City Net	400 W. Santa Ana Boulevard		Santa Ana	CA	92701	(562) 774-1902	33.74962247	-117.8713891																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals Provided	f											\N	\N	\N	Meals Provided	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
2899	The Historic Church of the Epiphany	2808 Altura Street		Los Angeles	CA	90031	(323) 227-9931	34.0752843	-118.21285	https://epiphanyla.net/					1030	1130	Fri4th	1030	1130																			\N		2019-12-01 00:00:00-08	\N	2020-05-30 10:32:43.003537-07	108	2020-05-30 10:25:40-07	110		John Darragh called 12/16 - got pastor's ans machine. webiste only confirms that there is some sort of food bank on 2nd and 4th fridays.\n\n4/18 Unable to message them on Facebook	f			epiphanyla@yahoo.com			@EpiphanyLosAngeles					\N	\N	110		2020-05-30 17:32:42.599	\N		\N	2019-12-01 08:00:00								f	f	f	f							fruit, can food	English	t	t	t	t	t	t	2	f
2921	Dae Hueng Presbyterian Church	15411 S. Figueroa Street		Gardena	CA	90248	(310)719-2244	33.8913189	-118.2836487	dkpc.org					0900	1100																						\N		2019-12-01 00:00:00-08	\N	2020-05-24 10:21:44.526154-07	108	\N	\N		Tried calling and emailing DKPC (4/20/20), but no response. I only updated social media info (4/28/20). I could not get a hold of anyone to update the remaining info.	f			dkpcoffice@gmail.com			https://www.facebook.com/pages/Dae-Hueng-Korean-Presbyterian-Church/115851705110309					\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	f	t	t	f	f	1	f
2896	Christ the Good Shepherd Episcopal	3303 W. Vernon Avenue		Los Angeles	CA	90008	(323)295-4139	34.003725114074804	-118.32961499999999	https://christthegoodshepherdchurch.ladiocese.org/					1000	1300																						\N	COVID Update: The Food pantry is open. 	2019-12-01 00:00:00-08	\N	2020-05-25 17:17:07.751451-07	108	\N	\N		As of 21 March 20 food pantry is still open according to voicemail. All other information up to date.\n\nCalled and left voicemail with my callback number	f			cgshepherd4041@sbcglobal.net								\N	\N	110		2020-05-26 00:17:07.751451	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
2934	El Monte/South Emergency Center	10900 Mulhall Street		South El Monte	CA	91731	(626)444-7269	34.0888812	-118.0288381						0800	1700	Tue	0800	1700	Wed	0800	1700	Thu	0800	1700	Fri	0800	1700										\N		2019-12-01 00:00:00-08	\N	2020-05-29 15:27:00.138879-07	108	\N	\N	Must live in Elmonte or South Elmonte	4/25 V. Illk\n(626) 444-7269 No answer	f				Hotel voucher, Rent, Donations							\N	\N	110		2020-05-26 19:31:01	\N		\N	2019-12-01 08:00:00			6264447269					f	f	f	f					The orga		2-3 week food items	English	f	t	f	f	t	f	2	f
2933	Ed & Frankie Benson Evangelistic Ministries	4232 West Ave. L		Quartz Hill	CA	93536	(661)943-1148	34.659707	-118.2068055						1200	1300																						\N		2019-12-01 00:00:00-08	\N	2020-05-24 10:22:00.965696-07	108	\N	\N		I tried calling twice throughout the week and left a voicemail with a callback number. The voicemail confirms that this is the correct public phone number of Ed & Frankie Benson Ministries. There is no other information I can find on the web to update current info.  (Updated 4/30/20).	f											\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	f	f	f	f	f	f	1	f
4073	Iglesia Cristiana Emanuel	1309 E. 3rd Street		Long Beach	CA	90802	(562) 432-8690	33.77001505	-118.1751236																													\N		2020-03-29 18:39:28-07	\N	2020-05-23 11:10:54.821908-07	108	\N	\N		Food Pantry	f											\N	\N	110	Food Pantry	2020-05-23 18:10:54.821908	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
4425	Connections For Women	1551 E 118th St		Los Angeles	CA	90059	(833) 239-6741	34.05349	-118.24532	https://www.connectionsforwomen.us/																												\N		2020-03-29 18:39:28-07	\N	2020-05-23 11:18:48.731758-07	108	\N	\N	single and two-parent families with children	Facebook and Instagram are no longer active - the website was updated 2018-19	f			cfw.org@gmail.com		  Emergency Crisis Housing, Employment Research Support and Job Placement, Mental Health Resources and Referrals, Permanent Housing Referrals and Placement		https://twitter.com/cfworg			Connections for Women provides single and two-parent families with children, with Emergency CRISIS Housing and supportive services in the County of Los Angeles.	\N	\N	110	Shelter	2020-05-23 17:22:29	\N		\N	2020-03-30 01:39:28				publicrelations.cfw@gmail.com				f	f	f	f					homeless shelter for women/families	Helps women and families regardless of their race, sex, religious beliefs, disability, sexual preference, or ethnicity. 		English	f	f	f	f	f	f	2	f
2922	Do Right Christian Church	9815 S. Vermont Avenue		Los Angeles	CA	90044	(323)755-1053	33.9463608	-118.2920482						0830	1030	Sat2nd	0830	1030	Sat4th	0830	1030																\N		2019-12-01 00:00:00-08	\N	2020-05-24 10:22:18.223446-07	108	\N	\N	Most pantries serve according to the geographical service area. Food pantry clients should bring photo identification with them to the pantry. The identification should show the client's current residential address. Some pantries have an application process and ask clients for documents supporting income. However, all clients will be served the first time regardless of the completion of the application and service area.	Do Right Christian Church is an approved FOOD BANK Distribution Center.\n\nNo website found at this time. The public phone number is not a working number. I emailed Food Ministry Director Shatrece Satterwhite Sparks (ssparks@dorightchristianchurch.org) and received a bounceback stating that the domain could not be found. (Updated: 4/18/20 at 10:22 AM). \n\n	f						https://www.facebook.com/Do-Right-Christian-Church-355808517838785/					\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	f	f	f	f	f	f	1	f
2908	Congregational Church of Chatsworth - Fish of West Valley Food Pantry	20440 Lassen Street		Chatsworth	CA	91311	(818) 882-3474	34.2496259	-118.5788499	http://www.chatsworthucc.org/					1600	1700																						\N	COVID Updates: The organization is requesting participants to sign in and provide their cell phone number upon arrival. They can then wait in their car or away from the location while their box is being prepared.  The organization will call the participant once their food is ready for pickup. Hours change often - call ahead to check. Groceries donated by local stores, fresh produce, frozen meat, pastries, canned food\n\nIf there's an emergency, there is a phone number on the answering machine and get food by appointment through the week. The emergency food number is (818) 523 -9847 which is available.\n\nAnother number listed on the website: (818) 349-2550\n\nThe annual Postal Worker Food Drive has been postponed due to Covid-19. \n	2019-12-01 00:00:00-08	\N	2020-05-23 20:55:18.889997-07	108	\N	\N	Participants only need to bring some sort of identification. \nThe LA Regional Food Bank requires people only from Los Angeles County and their service area, but if someone is outside the area or is hungry, they don't turn them away but direct them to their next food pantry.	Members of the LA Regional Food Bank.\n\n4.19.2020:   Spoke to Joe Ellen Murato and verified information.\nEmail: Joe Ellen Murato for official use only, not for the public- 	f	Congregational Church of Chatsworth		Pastor@ChatsworthUCC.org								\N	\N	110		2020-05-24 03:55:18.889997	\N		\N	2019-12-01 08:00:00					Joe Ellen Murato		jemurata@aol.com	f	f	f	f		Each Saturday from 12 to 5 pm our Fish Food Pantry volunteers serve the needy, poor, and homeless, by giving out groceries donated by local stores and at the annual postal service drive, pictured here. The times for the food pantry change often, so please check before coming.  about 25 lbs - 30 pounds per person, with milk, bananas, and a box. 		asking for canned food donations				English	t	t	t	t	t	t	2	f
3192	Wilshire Boulevard Temple Hope-Net	3750 W. 6th St		Los Angeles	CA	90020	(213)388-2401 or 213-401-4654	34.06351953759602	-118.304334	https://www.cervistech.com/acts/console.php?console_type=event_list&event_id=49&console_id=0021&ht=1					0830	0930																						\N	Not currently happening due to COVID\npantry items, produce (both)\nN	2019-12-01 00:00:00-08	\N	2020-05-23 19:22:20.734703-07	108	\N	\N			t			elizabeth@karshcenter.org	Hygiene products							2020-05-24 02:22:20.525	108	110		2020-05-23 15:56:28	\N		\N	2019-12-01 08:00:00								f	f	f	f			Closed temporarily due to COVID					English	t	t	t	t	t	t	4	f
4384	Chinatown Service Center	767 N. Hill Street	Suite 200B	Los Angeles	CA	90012	(213) 808-1700	34.062552	-118.239867																													\N		2020-03-29 18:39:28-07	\N	2020-05-23 19:28:03.983462-07	108	\N	\N			f											2020-05-24 02:27:46.199	108	110	Food Pantry (Must be a	2020-05-23 15:56:28	\N		\N	2020-03-30 01:39:28								f	f	f	f			Medical care phone #: (213)-808-1792					English	t	t	t	f	t	t	4	t
2985	Hank Lacayo Youth & Family Center	7915 Van Nuys Boulevard		Panorama City	CA	91402	(805) 483 4620	34.2147105	-118.4490873	http://lahermandadfamilyservices.org/					1600	1800																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 20:49:33.962408-07	108	\N	\N		Parent organization https://www.facebook.com/LaHermandadHLYFC/\nLa Hermandad Hank Lacayo\nYouth and Family Center\n534 S A St, Oxnard\nOxnard CA 93030 US\nPHONE NUMBER\nTel: (805) 483 4620\nFax: (805) 483 4625\nEMAIL\ninfo@hanklacayo.org\nhttp://lahermandadfamilyservices.org/\n\nTried the phone provided (818)644-9970 but it is disconnected.\n\nOther Locations:\nSanta Maria Office\n217 W Main St,\nSanta Maria, CA 93458\n(805) 357-9717\ninfo@hanklacayo.org\nFAX: (805) 357-9717\n\nLompoc Office\n601 East Ocean Avenue, Suite 1,\nLompoc, CA 93436\n(805) 751-9940\ninfo@hanklacayo.org\nFAX: (805) 430-8062\n\n	f			info@hanklacayo.org								\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	f	t	t	t	1	f
2957	Food Net - East Los Angeles Service Center	133 N. Sunol Drive		Los Angeles	CA	90063	(323)260-2801	34.036839	-118.178181	https://wdacs.lacounty.gov/center/ela/					0930	1200	Mon	1330	1600	Thu	0930	1200	Fri	1330	1600													\N	COVID - emergency food assistance, By appointment only, Tue, Fri\nnonperishable\n\nThe hours are for their Emergency Food Assistance Program (EFAP) or the Pantry Program.\n\nOther Food-Related Services & Hours:\n- Mondays 9:00 a.m. – 12:00 p.m. The CalFresh Nutrition Program cares and encourages all families to eat a healthy diet and be physically active.  Improving what you eat and being active will help reduce the risk of chronic diseases.\n- Monday-Friday 10:00 a.m. Provides nutritious hot lunch for seniors in a group dining setting.	2019-12-01 00:00:00-08	\N	2020-05-23 20:55:15.534134-07	108	\N	\N	The Center provides food to low-income families, individuals, and seniors.  Eligibility is not required to access this program. 	5/9/2020 emailed Center Director to confirm info	f			SGonzalez@wdacs.lacounty.gov		Public access computers & computer class, toy loan program, ESL classes, homework club, senior social dance & movie day, free legal service to senior citizens, health & fitness program, assiting consumer and business affairs 						\N	\N	110		2020-05-24 03:55:15.534134	\N		\N	2019-12-01 08:00:00								f	f	f	f			COVID - emergency food assistance, By appointment only, Tue, Fri, nonperishable					English	t	t	t	t	t	t	2	f
2954	First Southern Baptist Church of Hollywood	1528 N. Wilton Place		Hollywood	CA	90028	(323)466-9631 	34.0991321	-118.3132449	http://firstsouthernbaptist.church/					1200	1300																						\N	COVID-19 updates: \n- need to sign name and give the address \n- give everyone gloves before come in\n- 3 people allowed at a time, 6 ft apart \n- had to discontinue showers due to COVID-19 \nMonday and Friday 4pm: give out numbers for who comes in when (and then start giving out food at 5pm) \nFood on Mondays and Fridays comes from Vons, Gelsons, Trader Joes, etc. (perishables)\nSaturday is government food/commodities (canned food, rice, beans, staples/nonperishables) 	2019-12-01 00:00:00-08	\N	2020-05-23 20:55:15.782147-07	108	\N	\N	None	Food Donations: Pastor Gary Tibbs at the Church, (323)466-9631, fsbch@flash.net\n	f			fsbch@flash.net	Clothing, books for all ages (from Vons) occasionally		firstsouthernbabtistchurchofhollywood					\N	\N	110		2020-05-24 03:55:15.782147	\N		\N	2019-12-01 08:00:00					Pastor Gary Tibbs	(323)466-9631	fsbch@flash.net	f	f	f	f								English	t	t	t	t	t	t	2	f
2913	Cory's Kitchen-Faith Center Ministries	1418 Arrow Hwy, Irwindale, CA 91706		Walnut	CA	91706	(626)825-9441	33.999464	-117.8575384						1600	1800																						\N	This location closed when Cory's Kitchen merged with Shepherd's Pantry.	2019-12-01 00:00:00-08	\N	2020-05-23 19:44:16.587904-07	108	\N	\N			t											2020-05-24 02:44:16.459	108	110		2020-05-23 15:56:25	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	4	f
3104	S.V.P. All Souls Conference	1500 W. Main Street		Alhambra	CA	91803	(626)281-0466	34.0911399	-118.1397892						1530	1730																						\N		2019-12-01 00:00:00-08	\N	2020-05-30 08:44:40.026761-07	108	\N	\N			f											\N	\N	110		2020-05-30 15:44:40.026761	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
4368	The Village Family Services 	6801 Coldwater Canyon Ave.		North Hollywood	CA	91605	(818) 755-8786	34.194438000000005	-118.41382598211084	http://thevillagefs.org																												\N		2020-03-29 18:39:28-07	\N	2020-05-25 17:18:23.051174-07	108	\N	\N	Clients are age 14-21	\n\n\n	f			tkang@thevillagefs.org		homeless services, mental health, foster care, adoption, children and family services, showers, laundry	TheVillageFS	TheVillageFS				\N	\N	110	Meals Provided	2020-05-26 00:18:23.051174	\N		\N	2020-03-30 01:39:28					Alejandro Soria	323-309-8453	asoria@thevillagefs.org	t	f	f	f			COVID Notes: During COVID-19 crisis there is only to-go food available. No showers or laundry. For food, appointments can be made for drop-in from 3:30-5:30 pm M - F. Come in and make an appointment. The medical center is open daily M-F, 10-12:30 and 2-5	Contact information for who will receive donations – Alejandro Soria or Claudia Zamora Hours open to receive donations – 9:30 AM – 3:30 PM. Types of food needed and served – nonperishable, no cooking necessary, no refrigeration needed, easily portable: foods for homeless TAY, including fruit Estimated number of individuals served weekly – 10-20 per day; open 7 days per week à 70-140 per week Storage capacity - do they have available refrigeration?  Some refrigeration (not much); no oven or stove top. Ability for them to send volunteers or drivers to pick up donations   Yes, we do have staff to pick up donations				English	t	t	t	t	t	t	2	f
2929	Eastmont  Community  Center	701 So. Hoefner Avenue 		 East Los Angeles	CA	90022	 (323) 726-7998	34.007856995772386	-118.1538571847446	http://eastmontcommunitycenter.org/ 					0900	1100	Tue	0900	1100	Wed	0900	1100																\N	Food distributions held on Fridays and are open to the public  but you must call on Thursdays to confirm distribution for Friday.This service will be provided on site, every Friday from 9am – 12pm  Walk-ins are welcome but appointments are recommended.	2019-12-01 00:00:00-08	\N	2020-05-26 23:44:53.436019-07	108	\N	\N	Must live in the area and qualify. Please visit the web site and fill out the form to apply for Emergency assistance.	Covid-19 may effect food donations	f	 Christian Church (Disciples of Christ)		info@eastmontcommunitycenter.org	Vouchers for clothing (must qualify)	In collaboration with DPSS, Eastmont has recently begun to offer food stamps to our community. Those who live in the area and qualify will be assisted by a representative and must complete forms to participate in the service. This service will be provided on site, every Friday from 9am – 12pm	www.facebook.com/Eastmontcommunitycenter	https://twitter.com/elaccOrg	N/A	N/A	Eastmont works in collaboration with the Los Angeles Regional Food Bank and our neighborhood grocery store, TopValu Market to provide food to low-income families.	\N	\N	110		2020-05-26 00:19:28	\N		\N	2019-12-01 08:00:00	https://www.instagram.com/eastmontcommunitycenter/			info@eastmontcommunitycenter.org	 Teresa Palacios	(323) 726-7998	info@eastmontcommunitycenter.org	t	t	t	t	Call for updated times for food donations	Contact Teresa Palacios for specific instructions	ALTAMED DRIVE-UP IMMUNIZATION CLINIC AT CHLA : If you think you may be sick with COVID-19 Please call the Patient Service Center FIRST before visiting any AltaMed location in order to determine the best option for care: (888) 499-9303\n\nDRIVE-UP CLINIC LOCATION:\n4650 W. Sunset Blvd.\nLos Angeles, CA 90027\n\n 	Times may vary due to COVID-19	Food stamp distribution service is provided on site every fri 9am-12pm	 Enrolled families receive food bags once a month.Food bags may include canned foods, grains, pasta, beans, cereal and fresh produce.	Food bags may include canned foods, grains, pasta, beans, cereal and fresh produce.	English, Spanish	t	t	t	t	t	t	2	f
3067	Normandie Community Development Food Pantry	3801 South Normandie Avenue		Los Angeles	CA	90037	(323)731-7787	34.0170589	-118.3003684						1145	1300																						\N		2019-12-01 00:00:00-08	\N	2020-05-26 12:25:12.948149-07	108	\N	\N			f											\N	\N	110		2020-05-26 19:25:12.948149	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
2884	Central Filipino Seventh-Day Adventist Church	777 Colorado Boulevard		Los Angeles	CA	90041	(323)255-7718	34.1410086	-118.182682	https://centralfilipino.org/					0900	1200																						\N		2019-12-01 00:00:00-08	\N	2020-05-30 10:24:24.149485-07	108	\N	\N		5/30/20 @ 10:10am: Left voicemail and Facebook Message.  No mention of food pantry on their website or Facebook.	f			centralfilipino@gmail.com			https://www.facebook.com/centralfilipino/					\N	\N	110		2020-05-30 16:19:30	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	f	t	t	t	f	2	f
4243	El Sereno Spanish S.D.A. Church	3304 N. Eastern Avenue		Los Angeles	CA	90032	818.434.7256	34.083633	-118.177704																													\N		2020-03-29 18:39:28-07	\N	2020-05-30 14:58:12.132155-07	108	\N	\N			f											\N	\N	110		2020-05-30 16:19:07	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	f	f	f	f	f	f	2	f
3081	Pentecostal Church of God	2829 1/4 Fletcher Drive		Los Angeles	CA	90039	(323)842-7888	34.11218923065374	-118.24928484430716						1500	1700																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 19:26:22.716987-07	108	\N	\N		called the number listed on the top got an answer and was notified that the organization will be closed until "the government gives further notice"	f											2020-05-24 02:26:22.334	108	110		2020-05-23 15:56:28	\N		\N	2019-12-01 08:00:00					Edwin Rudy López. Reverendo		edwinrlopez07@yahoo.com	f	f	f	f								English	t	t	t	t	t	t	4	t
2865	Belvue Presbyterian Church	675 E. 118th Street		Los Angeles	CA	90059	(323)757-9188	33.926541051385946	-118.26280454334241						1000	1100																						\N		2019-12-01 00:00:00-08	\N	2020-05-26 16:45:06.764162-07	108	\N	\N		05/16/20 - couldn't make an electronic connection to verify any of the information.\n05/06/2020: Went to voicemail. Were not available but call back.	f						https://www.facebook.com/Belvuepresbyterianchurch/					2020-05-26 23:45:06.604	108	110		2020-05-25 23:27:13	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	4	t
4332	Unitarian Universalist Church-Long Beach	5450 E. Atherton Street		Long Beach	CA	90815	(562) 597-8445	33.78825046	-118.12639																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
2905	City of Norwalk - Department of Social Services	11929 Alondra Boulevard		Norwalk	CA	90650	(562) 929-5544	33.88778702000002	-118.07935798999999	https://www.norwalk.org/city-hall/departments/social-services/social-services-center					0800	1730	Tue	0800	1730	Wed	0800	1730	Thu	0800	1730	Fri	0800	1730										\N		2019-12-01 00:00:00-08	\N	2020-05-25 16:44:47.163997-07	108	\N	\N	Individuals and families residing in Norwalk	Called 10:15am 18-April-20 got voicemail. Services are affected by COVID-19 but did not specify. Sent email as well. \n\nDonations: ppena@norwalkca.gov\n\nNeed to verify that hours are for food pantry, eligibility, TEFAP	f			ppena@norwalkca.gov	Dry Cereal, Mac N Cheese, Rice, Oatmeal, Instant Noodles, Beans, Pancake Mix/Syrup, Hamburger Helper, Soup, Peanut Butter, Mashed Potatoes, Jam, Beef Stew, Tea, Pasta, Chili Beans, Pasta Sauce, Juices, Tomato Sauce, Canned Meat, Beans, Tuna, Cookies, Crackers	Food Distribution	@ciryofnorwalkca				Emergency Food Cupboard	\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	1	f
3087	Prince of Peace Coalition - West Valley Food Pantry	5700 Rudnick Avenue		Woodland Hills	CA	91367	(818)346-5554	34.17359400000001	-118.61230449927886	https://www.westvalleyfoodpantry.org/					1000	1500	Tue	1000	1500	Wed	1000	1500	Thu	1000	1500	Fri	1000	1200										\N		2019-12-01 00:00:00-08	\N	2020-05-25 17:03:57.836025-07	108	\N	\N		Alternative email:\nexecdirector@westvalleyfoodpantry.org\n5/24 - not sure if hours are validated	f			admin@westvalleyfoodpantry.org			/westvalleyfoodpantry					\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	1	f
2891	Children of the Shepherd	1072 N El Centro Ave		Hollywood	CA	90038	(323) 462-1447	34.0905485	-118.3243668	https://www.coshollywood.org/					1100	1200																						\N		2019-12-01 00:00:00-08	\N	2020-05-25 16:34:35.977206-07	108	\N	\N		Did not answer the phone but left voice message with personal cell phone number (4/18/2020).\nWebsite is incomplete with many place holders. Unable to verify information using website.\nCalled and left vm to return my call.  (4.19.2020)	f	N/A										\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	f	f	f	f	f	1	f
3002	Houses of Light Church Corporation	19408 Londelius Street		Northridge	CA	91324	(818) 392-9923	34.229843466270474	-118.556037	https://housesoflight.org/					0700	0730																						\N		2019-12-01 00:00:00-08	\N	2020-05-30 11:12:51.81254-07	108	2020-05-26 10:05:15-07	110		Regular hours: \nEvery Sat [7:00:00-7:30:00 pm]\n\nCo-Vid 19 Hours:\nEvery Sat [6:30:00-7:30:00 pm]\n\n\n\nFOLA Liason\nCoordinator: Alberto Clanderon \nTelephone: (818) 392- 9923. 	f	N/A		info@housesoflight.org			https://www.facebook.com/housesoflightchurch/					\N	\N	110		2020-05-30 18:12:51.37	\N		\N	2019-12-01 08:00:00					Alberto Clanderon	(818) 392- 9923		f	f	f	f								English\nSpanish	t	t	t	t	t	t	2	f
2920	CUSH Foundation	2343 N. San Antonio Avenue		Pomona	CA	91767	(909)621-5369	34.0852934	-117.7371539	https://antiochpomona.net/					0930	1300	Thu4th	0930	1300																			\N		2019-12-01 00:00:00-08	\N	2020-05-25 17:09:04.386724-07	108	\N	\N		4.19.2020: Called and got recorded message with office hours for church.  Tues - Thurs 9AM - 4.30 PM\n4.20.2020: Left a voice message with cell phone number	f	Antioch Missionary Baptist Church										\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	f	f	f	f	f	f	1	f
2887	Centro de Vida International Church Movement	9251 Burnet Avenue		North Hills	CA	91343	(818)892-2838	34.2387967	-118.4635834						1000	1200																						\N		2019-12-01 00:00:00-08	\N	2020-05-25 16:57:45.510592-07	108	\N	\N		-I left a voicemail on the inbox, however, I saw that an elementary school posted them as a working food bank with the hours updated above. (4/18/2020)	f											\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	f	f	f	f	f	f	1	f
2900	Church of the Nazarene-Rosemead	2703 Walnut Grove Avenue		Rosemead	CA	91770	(626) 572-8660 (church), 626-278-7226 (pastor), 913-577-0500 (larger organization))	34.0610322	-118.0823275	https://nazarene.org 					1000	1200																						\N		2019-12-01 00:00:00-08	\N	2020-05-25 16:38:01.308374-07	108	\N	\N		Called (562)695-0019 - seems to be personal phone of some sort. Called (626) 286-6912 and left messaage. No \n\nhttps://nazarene.org website seems to be the larger organization and not specific to the one in CA	f			rosenaz@sbcglobal.net			https://www.facebook.com/pages/Rosemead-Church-of-The-Nazarene/121002227915588					\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	f	f	t	f	f	1	f
2963	Food Net-San Gabriel Valley Center	1441 Santa Anita Avenue		South El Monte	CA	91733	(626)575-5431	34.0451612	-118.0455444						0830	1030																						\N		2019-12-01 00:00:00-08	\N	2020-05-25 16:40:35.660729-07	108	\N	\N		Call (626)575-5431 on Monday for the schedule for the week (or Friday for the schedule for the following week).  - Pantry and Diapers. Also providing assistance in applying for Fresh Benefits. 	f					Pantry and Diapers. Also providing assistance in applying for Fresh Benefits. 						\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	f	f	t	f	1	f
4075	Orange SDA Church	1310 E. Walnut Ave.		Orange	CA	92867	(714) 696-1732	33.79502272	-117.8397691																													\N		2020-03-29 18:39:28-07	\N	2020-05-25 17:09:18.765216-07	108	\N	\N		Food Pantry; On 4/20/20 I left a voicemail message requesting that they contact "Info@foodoasis.la" to verify information about the church's service as food pantry/food bank/meal program.	f											\N	\N	\N	Food Pantry	\N	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	f	f	f	f	f	f	1	f
2964	Food Net-San Pedro Service Center	769 W. Third Street		San Pedro	CA	90731	(626)575-5431	33.74149453981772	-118.293858						1400	1630	Wed	1400	1630	Thu	1400	1630	Fri	1400	1630													\N	by appointment call (626)575-5431	2019-12-01 00:00:00-08	\N	2020-05-25 17:15:11.843173-07	108	\N	\N	by appointment call (626)575-5431	by appointment call (626)575-5431 pantry, diapers	f											\N	\N	110		2020-05-26 00:15:11.843173	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
2937	Estelle Van Meter Multipurpose	7600 S. Avalon Boulevard		Los Angeles	CA	90003	(323)753-3881	33.9709509	-118.2648597	https://estelle-van-meter-multipurpose-center.business.site/					1030	1130	Wed3rd	1030	1130																			\N		2019-12-01 00:00:00-08	\N	2020-05-25 12:54:16.857018-07	108	\N	\N		Left facebook message \nCalled the number on this page and was out of service. Called number on their fb page but mailbox full	f					hot lunch, groceries	https://www.facebook.com/WLCAC-Senior-Programs-162143530477412/				hot lunch and groceries	\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	f	f	f	f	f	f	1	f
4077	Our Lady Of Victory Catholic Church	1316 S. Herbert Avenue		Los Angeles	CA	90023	(323) 268-9502	34.01613377185643	-118.18369900747317	https://catholicmasstime.org/church/our-lady-of-victory-church/683/																												\N		2020-03-29 18:39:28-07	\N	2020-05-25 16:35:54.742192-07	108	\N	\N		Food Pantry, no information that it is a food pantry in there website tried calling there number listed on here but no one picked up phone left voicemail, they also have an email and a Facebook page.	f			parish-4160@la-archdiocese.org			https://www.facebook.com/Our-Lady-of-Victory-Catholic-Church-160877577291052/					\N	\N	\N	Food Pantry	\N	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	f	1	f
2980	Greater Emmanuel M.B.C.	3727 W. 111th Place		Inglewood	CA	90303	(310) 677-9916	33.934083	-118.3384028	http://godornothing.com/					0900	1200																						\N		2019-12-01 00:00:00-08	\N	2020-05-25 16:39:10.935184-07	108	\N	\N		- Called but did not get through to anyone, no information on voicemail. 	f			gembc@sbcglobal.net			https://www.facebook.com/Greater-Emmanuel-Missionary-Baptist-Church-110348498992424/					\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	f	f	t	t	f	1	f
3038	Lincoln Avenue Christian Church	1180 North Lincoln Avenue		Pasadena	CA	91103	(626)798-9163	34.1664331	-118.1592865	http://www.lincolnavenuechristianchurch.org/					1000	1200																						\N		2019-12-01 00:00:00-08	\N	2020-05-30 10:21:52.94013-07	108	\N	\N		5/30/20 @10:20am: Left voicemail and Facebook Message.	f			info@lincolnavenuechristianchurch.org			https://www.facebook.com/laccpasadena	https://twitter.com/labcpasadena				\N	\N	110		2020-05-30 16:19:31	\N		\N	2019-12-01 08:00:00								f	f	f	f					They call it a "Food Bank" on their website.			English	t	t	t	t	t	t	2	f
4002	Shepherd's Pantry  (Formally Irwindale Homeless Food Distribution)	1418 Arrow Highway		Irwindale	CA	91706	(626) 305-0392	34.115679	-117.974605	www.shepherdspantry.org																												\N		2019-12-16 12:37:05-08	108	2020-05-30 10:11:41.713006-07	108	2020-05-28 14:32:02-07	110		Also see Shepherd's Pantry - Irwindale Family Food Distribution. Info entered by John Darragh base on web site info. For homeless, smaller portions of food as often as necessary during the month.	f	Shepherd's Pantry		info@shepherdspantry.org	Canned and boxed food, produce, fresh fruits, dairy/deli, frozen meat and bakery items. Often clothing and toiletries are available.	Homeless Food Distribution	https://www.facebook.com/shepherdspantry/			https://www.linkedin.com/company/shepherds-pantry/about/		2020-05-30 17:11:39.694	108	110		2020-05-26 23:44:01	\N		\N	2019-12-16 20:37:05					Paul Sandoval 	6263050392	fgilek@shepherdspantry.com	t	t	t	t	Mon / occasionally Tue / Wed / Fri / Sat, from 8am-12pm	would like to know ahead of time if receipt is needed						English	t	t	t	t	t	t	4	f
4119	Pasadena City College Lancer Pantry	1570 E. Colorado Boulevard	Room CC-211	Pasadena	CA	91106	(626) 585-7264	34.14597647233	-118.1167695	https://pasadena.edu/campus-life/lancer-pantry/index.php																												\N		2020-03-29 18:39:28-07	\N	2020-05-30 10:52:39.196766-07	108	\N	\N	No cost to currently enrolled students in need. The only requirement is a valid Pasadena City College student ID.	Emailed, waiting for a response	f	Pasadena City College		lancerpantry@pasadena.edu			https://www.facebook.com/LancerPantry/					2020-05-30 17:52:37.129	108	110	Food Pantry (PCC\nStudents Only)	2020-05-30 16:12:01	\N		\N	2020-03-30 01:39:28	https://www.instagram.com/pcclancerpantry/?hl=en							f	f	f	f			Food relief efforts are now remote. Lancer Pantry is offering electronic grocery gift-cards, localized food pantry services, and referrals to their PCC Social Worker. Please email them and they will respond with a personalized resource referral.				healthy non-perishable food	English	t	t	t	t	t	f	4	t
4255	ARMS Reaching Out To The Community	364 W. Compton Blouvard		Compton	CA	90220	(562) 528-9385	33.89592317	-118.2279736																													\N	Call ARMS anytime on weekdays from 9 am - 5 pm. Then, you will receive the name and phone number of food organizations ARMS is working with. You will then call those organizations to make an appointment and pick up the food. 	2020-03-29 18:39:28-07	\N	2020-05-30 11:00:20.935365-07	108	2020-05-29 15:44:35-07	110	No	Because an address is required, I just left their original address there. But they are mobile, so technically they don't have an address.	f			armsatwork@gmail.com	Cloth, bagpacks	Legal services						2020-05-30 18:00:20.806	108	110	Food Pantry	2020-05-23 19:36:08	\N		\N	2020-03-30 01:39:28	https://www.instagram.com/armsatwork/	Rosa Margaret	(562) 528-9385	armsatwork@gmail.com	Rosa Margaret	(562) 528-9385	armsatwork@gmail.com	t	t	t	t	Monday 10-11 am				Mobile, do not have a physical location. They used to distribute food directly to the public, but now they give food to other organizations.		Both perishable and non-perishable food	English only, but there are people who can speak Spanish 	t	t	t	t	t	t	4	f
2861	Altadena S.D.A. Church	2609 N. Lincoln Avenue		Altadena	CA	91001	(626)794-3953	34.1906878	-118.1593398	http://altadenasdafamily.org/					0900	1200	Tue4th	0900	1200																			\N	on website: Community Service Food Distribution: 2nd & 4th Tuesdays 9:00 AM - 12:00 PM	2019-12-01 00:00:00-08	\N	2020-05-30 09:43:01.834967-07	108	2020-05-29 11:15:55-07	110			t			asdac@sbcglobal.net			facebook.com/altadenasdachurch					2020-05-30 16:43:01.675	108	110		2020-05-23 19:06:27	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	4	f
4328	Bienestar Human Services	5326 E. Beverly Boulevard		Los Angeles	CA	90022	(866) 590-6411	34.03014119	-118.1504394	https://www.bienestar.org/food-bank/																												\N		2020-03-29 18:39:28-07	\N	2020-05-30 10:25:29.881679-07	108	\N	\N	"Our Food Bank provides ongoing food assistance for low-income individuals that meet certain eligibility requirements. Clients receive nutritious produce and foods on a monthly basis to make sure that they are able to eat healthy."	Food Bank -  Phone number: (323) 727-7896 was tested and did not answer at 10:00 AM Saturday.  Website provided office number.  (866) 590-6411.  Confirmed through facebook information. Offices are closed due to covid-19 but people are available to talk M-F 10AM-7:00PM.  Need to confirm if food bank is still on going.	f			boconnell@bienestar.org			https://www.facebook.com/bienestarla/				Our Food Bank provides ongoing food assistance for low-income individuals that meet certain eligibility requirements. Clients receive nutritious produce and foods on a monthly basis to make sure that they are able to eat healthy.\n\nIf you need food assistance but do not meet the requirements for our food bank, we can provide a small amount of emergency food one time and then connect you to other food banks near you.	\N	\N	\N	Food Pantry	\N	\N		\N	2020-03-30 01:39:28	www.instagram.com/bienestarla							f	f	f	f			Food Bank is in East LA Office.  For more information and eligibility requirements, please contact:  Brendan O'Connell, MSW\nDirector of Programs & Services  \n(866) 590-6411 ext. 124  [phone message says 107 to contact East LA]\nClosed every 5th Tuesday and Thursday of every month		Stated on website			English	t	f	t	f	t	f	1	f
2994	Hollywood Lutheran Church	1733 N. New Hampshire Avenue		Hollywood	CA	90027	(323)667-1212	34.10279276019966	-118.29336516737827						1100	1230																						\N	COVID Updates: Hollywood Lutheran Church is currently closed, but there is a food pantry on Wednesdays.	2019-12-01 00:00:00-08	\N	2020-05-30 08:30:01.158502-07	108	\N	\N		Hollywood Lutheran Church is currently closed due to COVID, but there should be a food pantry on Wednesdays. I left a message for Tom, the food bank coordinator, to call me back with relevant details. -PMG 4/25/20\n	f											2020-05-30 15:30:00.768	108	110		2020-05-25 23:34:56	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	4	t
3047	Los Angeles First Church of the Nazarene	3401 W. 3rd Street		Los Angeles	CA	90020	(213)385-6345	34.0693363	-118.2898538	http://www.la1stnaz.org					1600	1800																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 19:25:16.256846-07	108	\N	\N			f			churchadmin@la1stnaz.org			https://www.facebook.com/pg/LAFirstNaz/about/?ref=page_internal					2020-05-24 02:25:16.138	108	110		2020-05-23 20:31:34	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	4	t
4032	Christian Food Center	1101 E. Washington Boulevard		Los Angeles	CA	90021	(213) 741-0213	34.02549568	-118.2523518																													\N		2020-03-29 18:39:28-07	\N	2020-05-23 20:55:14.718439-07	108	\N	\N		Food Pantry	f											\N	\N	110	Food Pantry	2020-05-24 03:55:14.718439	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	2	f
4142	Praise Chapel Florence Community Church	1750 E. Florence Avenue		Los Angeles	CA	90001	(626) 483-5728	33.974523000000005	-118.24143749999999																													\N		2020-03-29 18:39:28-07	\N	2020-05-23 20:45:39.665697-07	108	2020-05-11 12:52:36-07	106		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	f	t	f	1	f
3033	La Voz Sylmar S.D.A. Church	13550 Herron Street		Sylmar	CA	91342	(818) 524-9867	34.313473	-118.427859	http://www.lavozsylmar.com/contact.html					1830	2030																						\N		2019-12-01 00:00:00-08	\N	2020-05-30 11:08:09.143302-07	108	2020-05-29 10:33:29-07	110		(818) 524-9867: This is the pastor's number! He picked up the phone and verified the information!\nlvssylmar@gmail.com: general email but the one provided above is the pastor's email.\n\nHe said they need donations and are not operating right now. So give him a call/email!	f						https://www.facebook.com/pg/lavozsylmarsda/about/?ref=page_internal					2020-05-30 18:08:08.468	108	110		2020-05-23 19:06:25	\N		\N	2019-12-01 08:00:00		Pastor Sylmar	(818) 524-9867	yonnyjim@yahoo.com	Pastor	(818) 524-9867	yonnyjim@yahoo.com	f	f	f	f				need donations and are not operating right now	lvssylmar@gmail.com			English	t	t	t	t	t	t	4	f
4132	Buildplus Community Marketplace Food Bank	Watts Historic Train Station	1686 East 103rd Street	Los Angeles	CA	90002	714.615.4956	33.942953	-118.243	https://buildpluscommunity.org/																												\N	Offer grocery bags with canned food, veggies, meat, and more.  \nDistribution is every other Saturday, twice a month at 10:30 am\nNext food distribution event: May 22, 2020 at 11:30. First come, first serve 	2020-03-29 18:39:28-07	\N	2020-05-25 17:18:22.791851-07	108	\N	\N		5/11/20: Verified website, location, date and time of distrubtion via telephone with Billy. 	f	In association with LA Food Bank		billy@buildpluscommunity.org								\N	\N	110		2020-05-26 00:18:22.791851	\N		\N	2020-03-30 01:39:28					Billy		billy@buildpluscommunity.org	f	f	f	f								English	t	t	t	t	t	t	2	f
3085	Pilipino Worker Center of Southern California	153 Glendale Boulevard		Los Angeles	CA	90026	(213)250-4353	34.0634518	-118.2602462						1800	1900																						\N		2019-12-01 00:00:00-08	\N	2020-05-30 08:29:15.437932-07	108	2020-05-28 09:34:51-07	110			f											2020-05-30 15:29:14.991	108	110		2020-05-26 17:04:33	\N		\N	2019-12-01 08:00:00								f	f	f	f			Working away from home 					English	t	t	t	t	t	t	4	t
4324	North Long Beach Ministry Center	5239 Atlantic Avenue		Long Beach	CA	90805	(562) 422-5090	33.851424101304175	-118.18501583807475																													\N		2020-03-29 18:39:28-07	\N	2020-05-30 09:47:19.579067-07	108	\N	\N		05/06/2020: no answer, call back	t						https://www.facebook.com/pages/North-Long-Beach-Ministry-Center/706521249476954					2020-05-30 16:47:19.407	108	110	Food Pantry	2020-05-25 23:27:15	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	f	4	f
4001	Shepherd's Pantry - Irwindale Family Food Distribution	1418 Arrow Highway		Irwindale	CA	91706	(626) 305-0392	34.115892	-117.974777	www.shepherdspantry.org																												\N		2019-12-16 12:29:00-08	108	2020-05-23 20:55:17.765741-07	108	\N	\N	Clients need ID showing proof of residency in LA County. Clients may receive food two times per month from any Shepherd’s Pantry location - the pantry keeps a database of clients to track usage.	Homeless Food Distribution is listed as a separate organization, since hours are different. 3. Voicemail\n\nOrg name + address confirmed\n\nOpen to public Tues eves 5-7pm\nHomeless food distro: Mon, Wed, Friday 11am -12pm\nBring proof of resident's address, and anyone else living in house\nFor kids, medical ID or school ID is enough\n\nInfo on donations + volunteers in voicemail. 	f	Shepherd's Pantry		info@shepherdspantry.org	Canned and boxed food, produce, fresh fruits, dairy/deli, frozen meat and bakery items	Food Pantry, Words of Encouragement, Prayer Support	https://www.facebook.com/shepherdspantry/			https://www.linkedin.com/company/shepherds-pantry/about/	Irwindale Distribution Center - Weekly Food Distribution	\N	\N	110		2020-05-24 03:55:17.765741	\N		\N	2019-12-16 20:29:00								f	f	f	f								English	t	t	t	t	t	t	2	f
4003	Southeast Rio Vista YMCA	4801 E. 58th Street		Maywood	CA	90270	(323) 588-2256	33.987491674755354	-118.17876324336412	https://www.cityofmaywood.com/food-bank																												\N	Senior Food Distribution Program Hours: start at 1 pm on the third Thursday of every month until everything runs out; stand in line and receive a bag with food; seniors 60 years of age and older with proper picture identification will be able to participate. You do not need to be a Maywood Resident in order to participate in this program.\n\nDistribution to the Public Hours: start at 1 pm on the fourth Thursday of every month until everything runs out at the Maywood City Hall parking lot; food is given out in a box; no eligibility/requirement\n	2019-12-16 21:05:00-08	108	2020-05-29 15:57:02.23633-07	108	\N	\N	Seniors 60+ years old with proper picture identification, don't need to be a Maywood Resident in order to participate in this program. \n\nIncome <= $1287/mo if one person in household or <= $2002/mo if two persons in household	Need to call Jessie (323 562 5764) who's directly responsible for the food pantry program; clarify the income requirement (can't reach the person); contact through FB, waiting for a response	f	City of Maywood				Food Distribution for Seniors	https://www.facebook.com/SoutheastRioVistaYMCAMaywood/				Senior Food Distribution & Distribution to the Public	\N	\N	110		2020-05-23 19:36:07	\N		\N	2019-12-17 05:05:00								f	f	f	f			Cover mouth, practice social distancing (6 feet)				Both perishable and nonperishable	English	t	t	t	f	t	t	2	f
2889	Chapel of Peace Lutheran Church	1009 N. Market Street		Inglewood	CA	90302	(310)673-2584	33.9766895	-118.3568641	https://www.facebook.com/pages/category/Organization/Chapel-of-Peace-Lutheran-Church-117064021645133/					0900	1200																						\N	COVID 19 Updates: Serving bagged food and other non-perishable food items. 	2019-12-01 00:00:00-08	\N	2020-05-25 10:55:04.429342-07	108	2020-04-18 10:46:39-07	106		-Spoke with the pastor and they are also the point of contact for all matters relating to the food pantry. (4/18/2020)\n5/24 - can't find website only FB	f						https://www.facebook.com/pages/category/Organization/Chapel-of-Peace-Lutheran-Church-117064021645133/					\N	\N	110		2020-05-25 17:55:04.252	\N		\N	2019-12-01 08:00:00		Scott C Fritz	(310) 673-2584		Pastor			f	f	f	f			COVID 19 Updates: Serving bagged food and other non-perishable food items. 					English	t	t	t	t	t	t	2	f
3126	Shield of Faith Christian Center of Pasadena	1127 N. Lake Avenue		Pasadena	CA	91104	(626)773-0505	34.1652586	-118.1327954						1200	1400	Thu3rd	1200	1400																			\N		2019-12-01 00:00:00-08	\N	2020-05-30 09:50:36.646612-07	108	\N	\N			f						https://www.facebook.com/pages/Shield-of-Faith-Christian-Center-of-Pasadena/113397845360878					\N	\N	110		2020-05-30 16:19:07	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	f	f	f	f	t	f	2	f
3191	Willowbrook Project Area Commission	11901 S. Willowbrook Avenue		Los Angeles	CA	90059	(323)569-7676	33.92446794448615	-118.23606872690283						1700	1900	Sat2nd	1000	1200																			\N		2019-12-01 00:00:00-08	\N	2020-05-30 08:52:31.240961-07	108	\N	\N		05/06/2020:no answer, call back -- heard long beep -- probably fax machine\n05/16/20 cannot find a website or FB page, verified hours and phone	f											2020-05-30 15:52:31.086	108	110		2020-05-25 23:27:13	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	4	t
2960	Food Net - East Rancho Dominguez	4513 E. Compton Boulevard		Compton	CA	90221	(310)603-7401	33.89619530725941	-118.19279932070518						0800	1000	Fri4th	0800	1000																			\N		2019-12-01 00:00:00-08	\N	2020-05-30 08:53:42.399624-07	108	\N	\N		05/16/20 - Need to verify Food Net resources -- cannot find any website, FB, or email address.\n05/06/2020: no answer, call back	f											2020-05-30 15:53:41.885	108	110		2020-05-25 23:27:14	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	f	t	f	4	t
2974	Good News Missionary Baptist Church	2400 W. Vernon Avenue		Los Angeles	CA	90008	(323)292-3589	34.00353	-118.3194						1100	1300	Thu4th	1100	1300																			\N		2019-12-01 00:00:00-08	\N	2020-05-30 09:46:58.904838-07	108	\N	\N		I'm not sure if the church is still active. No website found online. The organization does have a Facebook, but it has not been updated since 2013. The Facebook states that Sr. Pastor Elder Terry Wilson manages the page. \n\nI called their phone number and left a voicemail message and messaged them via Facebook messenger. I did not get a response for either attempt. (Updated: 5/7/20 at 4:00AM).\n\n05/11/20 - HOURS: 2nd & 4th Thursday of each month: 11:00 am - 1:00 pm. (Will call on Thurs to verify hours.)\n\n5/13/20- no answer, I left a voicemail and message on Facebook messenger	t						https://www.facebook.com/pg/Good-News-MBC-Church-of-LA-508350689230280					2020-05-30 16:46:58.739	108	110		2020-05-25 23:27:12	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	f	t	f	4	f
2971	Gardena Valley Assembly of God / Bread Shed	1473 W. 182nd Street		Gardena	CA	90248	(310)329-6933	33.8656920021327	-118.30183762420023	www.gardenavalleyassembly.com					1230	1330																						\N		2019-12-01 00:00:00-08	\N	2020-05-25 17:15:10.626706-07	108	\N	\N		4.25.2020: reached out via facebook messenger and via email.  \nAlso have instagram and youtube for the church.  @gardenavalleyassembly\n	f			info@gvag.net			@GardenaValleyAssembly					\N	\N	110		2020-05-26 00:15:10.626706	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
4402	Harber Redeemer Food Pantry (formally North Valley Caring Services)	8520 Winnetka Avenue		Winnetka	CA	91306	818-341-1629	34.225227000000004	-118.57100776597073	http://www.epath.org/site/main.html																												\N	COVID update: Closed for the month of April and if possible will reopen in May.\n	2020-03-29 18:39:28-07	\N	2020-05-23 20:57:52.708819-07	108	\N	\N		4/7/2020: VM confirmed message from 4/4/2020	f			path@epath.org								2020-05-24 03:57:52.57	108	110		2020-05-24 03:56:22	\N		\N	2020-03-30 01:39:28								f	f	f	f			Closed for month of April.					English	t	t	t	t	t	t	4	t
2977	Grace Evangelical Free Church of La Mirada	12717 Santa Gertrudes Avenue		La Mirada	CA	90638	(562)943-3791	33.915754	-117.995356	https://graceevfree.org/ministries/food-bank/					1600	1800																						\N	Closed due to COVID	2019-12-01 00:00:00-08	\N	2020-05-23 19:23:51.762788-07	108	\N	\N			t			info@graceevfree.org	canned food, fresh food							2020-05-24 02:23:51.639	108	110		2020-05-23 15:56:23	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	4	f
3034	Lady Bug Ministry	14725 Gramercy Place		Gardena	CA	90247	(323) 751-3748	33.897334	-118.314122	http://www.ladybugministry.com/					0900	1000																						\N		2019-12-01 00:00:00-08	\N	2020-05-30 08:54:38.454023-07	108	\N	\N		Phone is active, but not picking up. It seems like it is closed.	f			LADYBUGMINISTRY@AOL.COM								2020-05-30 15:54:37.968	108	110		2020-05-23 19:06:25	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	4	t
4291	Downtown Women's Center 	442 S. San Pedro Street		Los Angeles	CA	90013	213-213-6130 or (213) 680-0600	34.04473780515327	-118.24356551927416	http://www.dwcweb.org																												\N		2020-03-29 18:39:28-07	\N	2020-05-23 19:22:46.301978-07	108	\N	\N	N/A	The phone line had a busy tone. I wasn't able to leave a message. \nSame on 4/7/2020.\n4/14/20 emailed	t	N/A		Info@DowntownWomensCenter.org	N/A	N/A	https://www.facebook.com/pg/DWCweb/about/					2020-05-24 02:22:46.164	108	110	Meals	2020-05-23 15:56:11	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	4	f
3124	Shekinah Worship Center	42640 10th Street West		Lancaster	CA	93534	(661)400-2570	34.6579322	-118.1471819						1330	1430																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3016	Imani Unidos A.I.D.S. Project	1713 W. 108th Street		Los Angeles	CA	90047	(323)754-8453	33.9385863	-118.3074812						1000	1300	Tue4th	1000	1300	Wed4th	1000	1300	Thu4th	1000	1300													\N		2019-12-01 00:00:00-08	\N	2020-05-23 19:38:34.822691-07	108	\N	\N		Volunteer Shawn Sites spoke with Shaneece at Faith United Methodist Church of Los Angeles on 5.12.20 and Shaneece explained that the pantry has not been in operation for at least two years. She said they were hopeful of re-opening it at some point in the future, but there was no estimated timing for that. She agreed it would be fine for someone from FoodOasis to recontact FUMCLA (the above number is good) in the Fall to check for an update.	t	Faith United Methodist Church of Los Angeles					https://www.facebook.com/FaithUMCLA/					2020-05-24 02:38:31.175	108	110		2020-05-23 15:56:21	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	f	t	f	4	f
4430	Family Promise Of The Verdugo	P.O. Box 7151		Burbank	CA	91510	(818) 847-1547	34.18182	-118.30776	http://familypromiseverdugos.org/																												\N		2020-03-29 18:39:28-07	\N	2020-05-25 10:45:01.476623-07	108	2020-05-11 12:52:36-07	106		Homeless Shelter	f			info@FamilyPromiseVerdugos.org								\N	\N	\N	Homeless Shelter	\N	\N		\N	2020-03-30 01:39:28						818.562.7778		f	f	f	f								English	t	t	t	t	f	f	1	f
3015	Imani Economic & Community Development Corporation	510 W. Monterey Avenue		Pomona	CA	91768	(909)620-9161 	34.06029750426803	-117.75700325920711	https://imanitcf.org/imani-economic-community-development-corporation-iecdc/					1100	1230																						\N	COVID UPDATES\n\nThere is both a walk-in line (with 6-ft distancing) and a drive-up line.\n\nIn addition to the pantry, they provide senior boxes to those 60 years "or better" on the first Sunday of each month for pickup at the church, or for delivery within an approx. 10-mile radius. To apply and for details, email imanifoodbank@gmail.com\n\n(The entrance to the pantry is off of Rebecca and there are directional signs to the Pantry posted at the front of the Church on pantry days.)\n	2019-12-01 00:00:00-08	\N	2020-05-25 11:05:22.32798-07	108	\N	\N	They typically request an address, but are waiving that requirement at this time		f	This is a California nonprofit 501 (c)(3) corporation, an affiliate of Imani Temple Christian Fellowship Church (ITCF). 		info@imanitcf.org	They currently have dog food available, but other non-food items vary upon donation	N/A beyond the normally-scheduled church services	https://www.facebook.com/Imanitcf/					\N	\N	110		2020-05-25 18:05:22.32798	\N		\N	2019-12-01 08:00:00					Jade Jackson	909-524-7978	jadejacksonn@gmail.com	f	f	t	f				The food they distribute comes primarily from the L.A. Food Bank, but is supplemented by donations from local stores. They will accept individual contributions dropped off on-site. They have refrigeration capabilities so can accept perishable donations. They could also use contributions of boxes and bags for distributing the food. They could use help for pick up of donations (a truck or a vehicle) since they are currently renting a vehicle for any additional food donations from stores like Food4Less (e.g. other than the L.A. Food Bank) 				English	t	t	t	t	t	t	2	f
2923	Door of Hope Community Center	1414 S. Atlantic Boulevard		Los Angeles	CA	90022	(323)262-2777	34.012313	-118.1590196						0900	1100	Thu	0900	1100																			\N	Door of Hope Community Center (DHCC) representative recommends that individuals come early and bring a bag. Upon arrival, you will have to wait in line.\n\nDHCC offers perishable and nonperishable food. This includes and is not limited to canned goods, cereal, rice, beans, and dry food.\n\n	2019-12-01 00:00:00-08	\N	2020-05-23 20:55:16.258144-07	108	\N	\N	None	I spoke the DHCC representative Becky on 4/20/20.  She confirmed that DHCC has no active website or Facebook at this time. The preferred way to contact DHCC is via phone at (323) 262-2777.	f											\N	\N	110		2020-05-24 03:55:16.258144	\N		\N	2019-12-01 08:00:00						(323) 262-2777		f	f	f	f								English	t	t	t	t	t	t	2	f
4256	Vision de Cristo Ministerio Kairos	371 Workman Mill Road		La Puente	CA	91746	626.367.0690	34.043247	-117.997428																													\N		2020-03-29 18:39:28-07	\N	2020-05-30 15:00:20.909326-07	108	\N	\N			f											\N	\N	110		2020-05-30 17:53:19	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	f	f	f	f	f	f	2	f
2698	Crenshaw Community Garden	1423 S Crenshaw Blvd		Los Angeles	CA	90019		34.04619603	-118.3276274	http://crenshawgarden.blogspot.com/																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2910	Shepherd's Pantry (Formally Cory's Kitchen)	1418 Arrow Highway		Irwindale	CA	91706	(626)305-0392	34.1146127	-117.9746909	http://www.coryskitchen.org/					1800	2000																						\N	\n	2019-12-01 00:00:00-08	\N	2020-05-30 09:45:41.82926-07	108	\N	\N	N/A	The receptionist informed me that the Operations Manager is available on April 6th, Monday, to chat anytime between 10am-12pm. Taken over by Shepherd's Pantry	t	N/A			N/A	N/A						2020-05-30 16:45:41.631	108	110		2020-05-25 23:34:56	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	4	f
2912	Cory's Kitchen-El Sereno	4810 Huntington Drive South		Los Angeles	CA	90032	n/a	34.0851253	-118.1796924						1630	1830																						\N	This location closed when Cory's Kitchen merged with Shepherd's Pantry.	2019-12-01 00:00:00-08	\N	2020-05-23 19:35:20.444156-07	108	\N	\N		Phone was inactive closed in 2018 \n\nUpdate 4.25.2020:  made contact with the person who ran Cory's kitchen at the 323-972-1330.  Confirmed that this location is now closed and it has merged with Shepherd's Pantry since 2019.   The main orgnization is a christian based organization.  He suggested to call Francis  - the operations manager for Shepherds pantry - during the week to update information. Her number is 626-305-0392\n	t											2020-05-24 02:35:20.283	108	110		2020-05-23 15:56:19	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	4	f
3171	Traveler's Rest Baptist Church	1417 E. Florence Avenue		Los Angeles	CA	90001	(323)582-7797	33.97477646546241	-118.24934400000001						1100	1300																						\N	The church no longer serves food to the community.	2019-12-01 00:00:00-08	\N	2020-05-23 19:36:10.678459-07	108	\N	\N		5/2/2020 called but didn't get through, left a voice mail; confirmed their address and phone number\n5/8/2020 called and confirmed that they no longer serve food to the community even before COVID-19.	t											2020-05-24 02:36:10.235	108	110		2020-05-23 15:56:19	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	4	f
2975	Good News Prayer Center	7714 S. Western AVe		Los Angeles	CA	90047	(323)753-0117	33.969564000000005	-118.30898402065914	http://www.churchofgod.cc					1000	1200																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 19:36:41.401166-07	108	\N	\N		05/13/20: Phone number is no longer in service and has been disconnected\nThis business is CLOSED	t						https://www.facebook.com/pages/Good-News-Prayer-Center-Church-of-God-In-Christ/116246015066637					2020-05-24 02:36:40.498	108	110		2020-05-23 15:56:19	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	4	f
4247	Our Redeemer Lutheran Church 	340 N. Madison Avenue		Los Angeles	CA	90004	323-644-2200	34.07748199417162	-118.28915139396396	http://epath.org																												\N		2020-03-29 18:39:28-07	\N	2020-05-30 09:46:44.470956-07	108	\N	\N		04/04/2020: Voicemail -> no information given. To just call back\n4/14/20 sent them FB message	t			PATHVolunteers@ePath.org			https://www.facebook.com/path.LA/					2020-05-30 16:46:44.306	108	110		2020-05-25 23:34:56	\N		\N	2020-03-30 01:39:28					Waverly Paradox	(323) 328-6829	PATHVolunteers@ePath.org	f	f	f	f								English	t	t	t	t	t	f	4	f
2911	Cory's Kitchen-Calvary Chapel Pico Rivera	8110 Paramount Boulevard		Pico Rivera	CA	90660	(626) 622-9202	33.969865	-118.1127636						1800	1930	Thu4th	1800	1930																			\N	This location closed when Cory's Kitchen merged with Shepherd's Pantry.	2019-12-01 00:00:00-08	\N	2020-05-23 19:39:53.044156-07	108	\N	\N			t											2020-05-24 02:39:52.875	108	110		2020-05-23 15:56:22	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	4	f
2969	Fuller Theological Seminary	135 N. Oakland Avenue		Pasadena	CA	91182	(626)584-5433	34.14829172243077	-118.1399386675225						1200	1500																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 19:39:12.022313-07	108	\N	\N		4/25, 5/2, 5/11/2020: messaged through FB, called for 3 times, didn't get through probably due to campus closure, left a voicemail\n5/17/2020: found a piece of community news that says the school discontinued its food distribution program	f											2020-05-24 02:39:11.845	108	110		2020-05-23 15:56:21	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	4	t
2906	City of Truth Ministries	1139 E. Dominguez Street	Suite D	Carson	CA	90746	(310) 669-8300	33.8419672	-118.253889	https://cityoftruthministries.org/					1230	1400	Sun4th	1230	1400																			\N		2019-12-01 00:00:00-08	\N	2020-05-23 19:39:35.914066-07	108	\N	\N		Called on 18 April 20 number disconnected. No online presence since 2014. Deemed inactive.	t			cityoftruth12@hotmail.com			City of Truth Ministries 				At New Covenant Worship Center?	2020-05-24 02:39:34.841	108	110		2020-05-23 15:56:22	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	4	f
3011	Iglesia Pentecostes Roca de Salvacion	122 South Evergreen Avenue		Los Angeles	CA	90033	(323) 261-1145	34.0396969	-118.202409	http://rocadesalvacion.net/address.htm					1300	1400	Sat	1500	1600																			\N		2019-12-01 00:00:00-08	\N	2020-05-30 10:08:07.335208-07	108	\N	\N		Pastor Joe Guzman (Co-Pastor): 323-261-1145; pastorjoe@wecareela.org\nOld phone number: (323)832-5313	f			josue_calderon@hotmail.com			https://www.facebook.com/pg/Iglesia-Pentecostes-Roca-de-Salvacion-Inc-156775867718686/about/?ref=page_internal				Iglesia Pentecostes provides food distribution services on Saturdays and Sundays to members of the community	\N	\N	110		2020-05-30 17:08:07.335208	\N		\N	2019-12-01 08:00:00		Pastor Joes	323-261-1145	pastorjoe@wecareela.org				f	f	f	f								English	t	t	t	t	t	t	2	f
4248	People Assisting the Homeless (PATH)	340 N. Madison Avenue		Los Angeles	CA	90004	323-644-2200	33.94	-118.52																													\N		2020-03-29 18:39:28-07	\N	2020-05-25 11:21:36.855398-07	108	\N	\N		Meals	f			PATHvolunteers@epath.org								\N	\N	110	Meals	2020-05-25 18:21:36.855398	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	f	2	f
4084	Angelica Lutheran Church	1345 South Burlington Avenue		Los Angeles	CA	90006	213-382-6378	34.044346749379635	-118.27974501985106																													\N	3. Voicemail, no info\n4/7 - VM, no info	2020-03-29 18:39:28-07	\N	2020-05-23 18:41:58.741514-07	108	\N	\N			f											\N	\N	110		2020-05-23 21:01:48	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	f	t	f	t	f	2	f
3147	St. John's Cathedral-Hope Net	514 W. Adams Boulevard		Los Angeles	CA	90007	(213)747-6285	34.02741	-118.2756401						0700	0830	Thu	0700	0830																			\N		2019-12-01 00:00:00-08	\N	2020-05-23 14:01:48.830773-07	108	\N	\N			f											\N	\N	110		2020-05-23 21:01:48.830773	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
3068	North Hollywood Interfaith Food Pantry	4390 Colfax Avenue		Studio City	CA	91604	(818)760-3575	34.150059	-118.38722849999999	http://www.nhifp.org/					0900	1300	Fri	0900	1300																			\N	COVID Updates: Converted pantry into a drive-thru, a walk-up option available as well\nProvide nonperishable emergency bags of food to whoever shows up.\n\n	2019-12-01 00:00:00-08	\N	2020-05-19 20:24:07.49828-07	108	\N	\N		Name + address verified\nOpen Monday + Friday, from 7:30-11:00am\n\n	f											\N	\N	110		2020-05-20 03:24:07.49828	\N		\N	2019-12-01 08:00:00								f	f	f	f						Eligibility: asked for your name and if you've been to a pantry before. No ID needed.		English	t	t	t	t	t	t	2	f
3024	International Families Association	1741 Gardena Avenue	Suite E	Glendale	CA	91204	747-215-6111	34.1227497	-118.2575547	https://www.internationalfamiliesassociation.com/					1500	1800																						\N		2019-12-01 00:00:00-08	\N	2020-05-25 10:38:06.510158-07	108	2020-05-24 22:59:28-07	110			f			info@internationalfamiliesassociation.com								2020-05-25 17:38:06.325	108	110		2020-05-23 17:20:34	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	4	t
2938	Estrada Courts Community Center	3232 Hunter Street		Los Angeles	CA	90023	(323)599-7264	34.0211079	-118.2082908						0800	1000	Wed4th	0800	1000																			\N		2019-12-01 00:00:00-08	\N	2020-05-30 10:12:33.842296-07	108	2020-05-30 09:54:48-07	110		only speak Spanish, no website no email only cellphone listed above and office #(323)881-6654	f											\N	\N	110		2020-05-30 17:12:33.342	\N		\N	2019-12-01 08:00:00					Maria Chavez	(323)599-7264		f	t	t	t							canned food, rice, pasta, beans, meats, milk	English, Spanish	t	t	t	t	t	t	2	f
4088	The Men With Vision Foundation	13552 Goldenwest Street		Westminster	CA	92683	(714) 476-0371	33.764977037192	-118.00719361777972	https://www.themenwithvisionfoundation.org/																												\N	Service on the second and fourth Thursdays of the month, 4:00-6:00 pm, are a "Farmers Market".  Service on the third Thursday of the month, 9:00-11:00 am, is a "Client Choice Pantry".	2020-03-29 18:39:28-07	\N	2020-05-25 17:15:12.042233-07	108	\N	\N		Food Pantry;   On 4/20/20 I left a message on their voice mail asking them to contact "info@foodoasis.la" to verify the information Food Oasis has describing this organization.\n\nService on the second and fourth Thursdays of the month, 4:00-6:00 pm, are a "Farmers Market".  Service on the third Thursday of the month, 9:00-11:00 am, is a "Client Choice Pantry".	f			tmwvfoundation@gmail.com								\N	\N	110	Food Pantry	2020-05-26 00:15:12.042233	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	2	f
4364	The Center in Hollywood - Blessed Sacrament Food Pantry	6636 Selma Avenue		Hollywood	CA	90028	323-462-6311	34.09968279597802	-118.33448013918866	thecenterinhollywood.org																												\N	Please use the entrance on Selma.	2020-03-29 18:39:28-07	\N	2020-05-25 17:17:08.211422-07	108	\N	\N		FOOD DONATIONS: Nancy S., 818-425-4771\nReached them on Facebook Messenger (ie chat on web version of FB)\n	f			director@thecenterinhollywood.org		mail, drop in for individuals experiencing homelessness, group counseling, homeless services, bridge/interim housing	https://www.facebook.com/CenterInHollywood/					\N	\N	110		2020-05-26 00:17:08.211422	\N		\N	2020-03-30 01:39:28	https://www.instagram.com/centerinhollywood/				Nancy S.	818-425-4771		f	f	f	f								English	t	t	t	t	t	t	2	f
2949	First Church of the Nazarene-Pasadena	3700 E. Sierra Madre Boulevard		Pasadena	CA	91107	(626)351-9631	34.1609763	-118.0739988	http://www.paznaz.org/					1400	1600																						\N	COVID: New Office hours: Mon - Thurs, 9am - 1pm. Helping Hands Food Distribution is prebagged groceries to drive-thru/walk-up clients first come first serve. Wednesdays 10am-12pm\n\n\n	2019-12-01 00:00:00-08	\N	2020-05-23 20:55:17.143069-07	108	\N	\N		\n	f			info@paznaz.org								\N	\N	110		2020-05-24 03:55:17.143069	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
2870	Bethesda Temple Church	4909 Crenshaw Blvd		Los Angeles	CA	90043	(323)299-2591	33.998085	-118.331379	https://wearebethesda.org/					1300	1500																						\N	Can provide additional food service outside of normal hours by appointment.	2019-12-01 00:00:00-08	\N	2020-05-23 20:55:16.377033-07	108	\N	\N		Verified via FB messenger as well as a phone call, confirmed food service hours. They are in need of help with additional donations, and can be contacted via 323-251-2599 (different number than the public number). The pastor was very interested in additional resources on how they might be able to expand their operation and receive additional donations.	f	N/A				Prayer Services, Sunday School, Bible Studies	wearebethesdatempleLA					\N	\N	110		2020-05-24 03:55:16.377033	\N		\N	2019-12-01 08:00:00						323-251-2599	thevoice4909@att.net	f	f	f	f				They are in need of help with additional donations				English	t	t	t	t	t	t	2	f
2942	Fifty Fourth Street S.D.A. Church	1973 West 54th Street		Los Angeles	CA	90062	(323)292-2762	33.9935442	-118.3134514	http://54stsda.org/					0800	1000	Tue4th	0800	1000																			\N	COVID Updates: New hours are 2nd + 4th Sundays 8:30 am - 10:30 am.	2019-12-01 00:00:00-08	\N	2020-05-25 17:17:07.511474-07	108	\N	\N	None	Food Donations: Brenda Williams, 323-717-0212, only have 2 fridges, 1 freezer\n4/14/20 sent FB message and email \nno caffeine, no pork, no alcohol	f			office@54thstreetsda.org			https://www.facebook.com/pg/54thsdachurch/about/					\N	\N	110		2020-05-26 00:17:07.511474	\N		\N	2019-12-01 08:00:00					Margaret Carson	323-717-0212	office@54thstreet@sda.org	t	t	t	t	call/email ahead w/24hr notice	call/email ahead w/24hr notice		only have 2 fridges, 1 freezer				English	t	t	t	t	t	t	2	f
2955	First Unitarian Church	2936 W. 8th Street		Los Angeles	CA	90005	(213) 401-1191	34.0574918	-118.2904201	https://www.uula.org/					0800	1000																						\N	COVID Update: open until the government asks them to close. Expect a long line.\nPerishable and non-perishables, no meals\nThe door is just outside the church.\nBilingual - Spanish	2019-12-01 00:00:00-08	\N	2020-05-25 17:18:21.95087-07	108	\N	\N	None	FOOD DONATION: Rochelle McAdam, 213-401-1191, rochelle@uula.org. Their current food source is maxed out at 1400 bags a day.	f	UPLA		uplalosangeles@gmail.com			https://www.facebook.com/firstunitrianchurchla					\N	\N	110		2020-05-26 00:18:21.95087	\N		\N	2019-12-01 08:00:00					Rochelle McAdam	213-401-1191	rochelle@uula.org	f	f	f	f				Their current food source is maxed out at 1400 bags a day.				English	t	t	t	t	t	t	2	f
2895	Christ Gospel Prayer Center	4228 S. Vermont Avenue		Los Angeles	CA	90037	(323)732-1394	34.0065425	-118.2912726	https://christ-gospel-prayer-center.hub.biz/?fbclid=IwAR0E0NbgSsKDbP3O09HHdlJerIAoHIrg6XaimRM6UjLzVYD3dx5wAcz0gUM					1100	1130																						\N	Still giving out food as of 18 April 20	2019-12-01 00:00:00-08	\N	2020-05-23 20:55:15.667985-07	108	\N	\N	no requirements		f			christgospelprayercenter@gmail.com			https://www.facebook.com/Christ-Gospel-Prayer-Center-382768635208286/					\N	\N	110		2020-05-24 03:55:15.667985	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
3001	The Hope Center | Reality LA (Formerly Hope Fellowship)	4903 Fountain Avenue		Los Angeles	CA	90029	323.883.1812	34.0955984	-118.296546	https://realityla.com/					0900	1000																						\N	If there is a need for the pantry, you could ask the workers if they have items available in the pantry. Due to increased needs at this time,  it is based on availability.	2019-12-01 00:00:00-08	\N	2020-05-23 12:03:24.788878-07	108	\N	\N		4/28 V. Illk\nReality LA has inherited the Hope Fellowship building\n\n5/12 confirmed via email\n\nLindsay Cole | Volunteer Coordinator\nReality LA | 323.883.1812 | realityla.com\n1313 N Edgemont St | Los Angeles CA 90027	f			info@realityla.com	 We are still serving meals Monday - Friday at 10 am and 4pm.		https://www.facebook.com/realityla	https://twitter.com/realityla				\N	\N	110		2020-05-23 19:03:24.788878	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
2721	Moothart Collingnon/Francis Avenue Community Garden	2909 Francis Avenue		Los Angeles	CA	90005		34.05684772	-118.28942																													\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2800	Local Harvest Farmers Market	Marine Stadium at Appian Way & Nieto		Long Beach	California	90803	(562)449-9299	33.7685	-118.1329	http://www.localharvestfarmersmarkets.com/marine-stadium					1500	1900																						\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2984	H.O.P.E. Helping Other People Excel	7615 S. Western Avenue		Los Angeles	CA	90047	(323)567-8524	33.97039049125743	-118.30902997697493						0900	1100																						\N	COVID HOURS:  Every Monday 10 am-12 pm --> after COVID every Monday through Friday 10 am-12 pm	2019-12-01 00:00:00-08	\N	2020-05-25 16:27:37.427129-07	108	\N	\N		05/06/2020: No Answer, call back, hours were confirmed on voicemail	f			info@hopeforla.org								\N	\N	110		2020-05-25 23:27:37.427129	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
4312	Homeless Health Care Los Angeles - Center For Harm Reduction (HHC-LA) 	512 E. 4th Street		Los Angeles	CA	90013	213.617.8408	34.04463843851354	-118.24110237261233	http://www.hopeofthevalley.org																												\N	COVID Update: They are only operating needle exchange and snacks right now, no case management or face to face services.\n---\nPrimarily a needle exchange location.\n	2020-03-29 18:39:28-07	\N	2020-05-25 17:17:05.079559-07	108	\N	\N	ID to check DOB 	He said they have snacks from 9-3, but their website hours (https://hhcla.org/contact-us.html) only show them open until 2 and only on weekdays (open even less on weekends), so I set the hours to just 9-2 M-F to be safe.\n2020-04-07: I also got a "number has been disconnected" message (for 8404 number)\nLooks like the number was a typo (found it should be 8408 on the website).	f			info@hopeofthevalley.org	needle exchange, hygiene products	needle exchange, wound care, detox, subutex, computer access, acupuncture, sometimes clothing, etc	N/A	N/A	N/A	N/A	Primarily a Needle Exchange Location with snacks	\N	\N	110	Meals	2020-05-26 00:17:05.079559	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	2	f
4326	Emmanuel Baptist Rescue Mission 	530 E. 5th Street		Los Angeles	CA	90013	(213) 626-4681	34.04364806	-118.2430217	http://www.ebrm.org/																												\N	 	2020-03-29 18:39:28-07	\N	2020-05-29 14:22:41.238373-07	108	\N	\N	The men are required to complete the minimum 60 day course.Before homeless men and women can receive food, shelter or clothing, they must listen to a gospel message in the Mission chapel.	couldn't reach anyone by phone so i\nI sent them a message via FB messenger,just waiting on a response.Hours have not been verified as of  yet	f	N/A		emmanualbaptistrescuemission@yahoo.com	 	 Emmanuel Baptist Rescue Mission holds two evangelistic services per day,basic Bible doctrine, personal discipline, and fellowship,	https://www.facebook.com/emmanuelbaptistrescuemission					\N	\N	110	Meals Provided	2020-05-21 03:01:16	\N		\N	2020-03-30 01:39:28						 213-626-4681		f	f	f	f	During normal business hours	Please call ahead before dropping off any donations	Please call prior to  making any donations. Thank You	Please call ahead of time to schedule a time to drop off all donations.Please make check donations out to Emmanuel Baptist Rescue Mission, Po Box 86893, Los Angeles, CA 90086 	Once a week the mission exchanges dirty clothes for clean clothes,showers and a bed for the night	 \nAfter completion of this program, some of these new converts remain at the Mission as interns and continue to grow in their walk with the Lord. 		English/Spanish	t	t	t	t	t	f	2	f
2874	Breath of Life S.D.A. Church	425 S. La Brea		Inglewood	CA	90301	(310)837-8782 or (310) 674-4061	33.9582157	-118.3536215	http://www.breathla.org					1200	1500	Thu3rd	1200	1500																			\N	Fresh groceries, variety of clothing	2019-12-01 00:00:00-08	\N	2020-05-23 20:55:16.745829-07	108	\N	\N	None		f			info@breathla.org	Clothing		@breathoflifeinglewood					\N	\N	110		2020-05-24 03:55:16.745829	\N		\N	2019-12-01 08:00:00					PASTOR EUGENE HAMILTON	(310)837-8782	breathcommunication@gmail.com	f	f	f	f								English	t	t	t	t	t	t	2	f
4188	LA Dream Center	2301 Bellevue Avenue		Los Angeles	CA	90026	(213) 273-7000	34.07422266	-118.2698836																													\N		2020-03-29 18:39:28-07	\N	2020-05-21 13:26:58.706146-07	108	\N	\N		Meals and Food Pantry	f											\N	\N	110	Meals and Food Pantry	2020-05-20 02:22:41	\N		\N	2020-03-30 01:39:28						(213) 273-7046	gik@dreamcenter.org AND/OR chultquist@dreamcenter.org	f	f	f	f			Currently just providing drive-thru meal services with modified hours. 					English	t	t	t	t	t	t	2	f
4158	L.A. New Life Christian Church	1913 N. Wilmington Avenue		Compton	CA	90222	(562) 453-5753 0r 310-345-8045	33.91034701748515	-118.2391864138437	www.newlifecompton.com																												\N	COVID update: no changes to hours\nprovides both perishable and non-perishable food\nFood distributed to the public\n	2020-03-29 18:39:28-07	\N	2020-05-25 16:27:38.178347-07	108	\N	\N	n/a	Alternative contact number: 3103458045	f			nlccla@yahoo.com		counseling						\N	\N	110	Meals and Food Pantry	2020-05-25 23:27:38.178347	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	2	f
2859	All Saints Catholic Church - St. Vincent De Paul Food Pantry	3431 Portola Avenue		Los Angeles	CA	90032	 (323) 223-1101	34.0856924	-118.1729264	http://www.allsaintsla.com					1500	1700	Fri4th	1500	1700																			\N	Church phone number: (323) 223-1101\nBilingual: Spanish\nChurch Office Hours: M-F, 9-12 	2019-12-01 00:00:00-08	\N	2020-05-23 14:07:43.281652-07	108	\N	\N	Everyone is welcome.  Bring picture ID and proof of address.	(323)675-4873 (personal number, LM)\n4/14/20 sent a text, received FB message with a calendar\nWe do have a food pantry run by the St. Vincent de Paul Ministry which gives food twice a month on Saturdays. 	f			allsaintschurch@earthlink.net			AllSaintsChurchElSereno/					\N	\N	110		2020-05-23 21:07:43.281652	\N		\N	2019-12-01 08:00:00			(323)675-4873					f	f	f	f								English	t	t	t	t	t	t	2	f
3183	Victory Baptist Church	4802 South McKinley Avenue		Los Angeles	CA	90011	(323)231-2424	34.000074	-118.26086148652556	http://www.victoryla.com/					0800	1130																						\N	COVID Updates: remain normal operations, can drive-in or walk-in, need to wear masks\n\nOffer both perishable and nonperishable food. Food varies from week to week. Examples are canned food, pasta, rice, dairy, bean, yogurt, egg, milk, and meat (sometimes).\n	2019-12-01 00:00:00-08	\N	2020-05-23 10:13:23.543194-07	108	\N	\N	No eligibility. People just need to fill out a sign-in sheet (name, address, and the number of people in the household).\n	Unable to contact them to verify food program. I've updated the email & other info from their website and LA Regional Foodbank website (https://www.lafoodbank.org/find-food/pantry-locator/). Will get in touch by email (yet to do that).\n5/2/2020 sent FB message, waiting for a response; 5/8/2020 need to call back on Monday 9:30 am to talk to Angela\n5/11/2020 confirmed information; the person responsible for connecting with food rescue organizations — Angela Woods, reach her through the office number above; only distribute food to the public/individuals, not organizations.	f			victory4802@att.net	None	None	https://www.facebook.com/victorybcla/					\N	\N	110		2020-05-23 17:13:23.543194	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
2981	Greater New Morning Star Baptist Church	210 W. Florence Avenue		Los Angeles	CA	90003	(323)529-4446	33.9745963	-118.2767182	https://www.gnms210.org/					0800	1100																						\N	COVID Updates:\n- Food Pantry is open every Saturday from 7:30am - 10am\n- Masks are not required but preferred	2019-12-01 00:00:00-08	\N	2020-05-25 17:17:07.303379-07	108	\N	\N	- Have to be at least 18 years old \n- Must bring own bag or cart to carry food	- They distribute food to the public.\n- Call Ike (323) 529-4446 to connect with food rescue organizations.	f	N/a		GNMS210@gmail.com		Church services, Child Care Center, Spanish classes	https://www.facebook.com/pages/Greater-New-Morning-Star-Baptist-Church/148434605185202					\N	\N	110		2020-05-26 00:17:07.303379	\N		\N	2019-12-01 08:00:00					Ike	(323) 529-4446	no email	t	t	t	t	call ahead			call ahead				English\nSpanish	t	t	t	t	t	t	2	f
2903	City of Commerce Warehouse	5625 Jillson Street		Commerce	CA	90040	(323) 887-4460 x2385 or x 2284	34.00053589	-118.1575385	ci.commerce.ca.us					1030	1300																						\N	50% funded by TEFAP via LA Regional Food Bank, 50% funded by the City of Commerce\nCanned goods only\n	2019-12-01 00:00:00-08	\N	2020-05-25 17:17:07.994848-07	108	\N	\N	Must meet the low-income requirements of TEDAP. City-donated food is for residents with proof of residency, TEDAP food is available to others as well.	Moyra Garcia provided information (323) 887-4460 x2385\nUnavailable by phone on the weekend	f	City of Commerce		city@ci.commerce.ca.us								\N	\N	110		2020-05-26 00:17:07.994848	\N		\N	2019-12-01 08:00:00					Moyra Garcia	(323) 887-4460 x238		f	f	f	f				Call on weekdays only				English	t	t	t	t	t	t	2	f
4437	Blessed Sacrament Food Pantry (formally St. Robert's Community Services Center - The Center at Blessed Sacrament)	6657 W. Sunset Blvd.		Hollywood	CA	90028	323-462-6311	34.098016491026286	-118.335096	https://blessedsacramenthollywood.org/service-and-outreach/food-pantry/																												\N	They are handing out prepped meals as well as food resourced from the LA Food Bank. \nSpeak Spanish	2020-04-13 19:30:08-07	106	2020-05-19 20:24:07.754816-07	108	\N	\N		Nancy Stellos runs the pantry 818.425.4771.\nThe office is at 323.462.6311\nVolunteers are welcome at either time. If you are available to help with the unloading on Mondays, please contact Fr. Leo Prengaman, SJ or call: 323-462-6311. If you can assist on Saturdays, please contact Nancy Stellos.	f	The Blessed Sacrament 		info@blessedsacramenthollywood.org								\N	\N	110		2020-05-20 03:24:07.754816	\N		\N	2020-04-14 02:30:08					Nancy Stellos	818.425.4771		f	f	f	f								English	t	t	t	t	t	t	2	f
3161	Star Christian School	2120 Estrella Avenue		Los Angeles	CA	90007	(213)746-6900	34.0324876	-118.2759117	star-school.org					0800	0900	Sat4th	0800	0900																			\N	 Office hours Mon-Fri 6:30 am - 6:00 	2019-12-01 00:00:00-08	\N	2020-05-20 19:59:37.416946-07	108	\N	\N			f											\N	\N	110		2020-05-21 02:59:37.416946	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
3188	West Adams Church of Christ	4959 W. Adams Boulevard		Los Angeles	CA	90016	323-731-6672	34.032789	-118.348501						1000	1100	Sat4th	1200	1400																			\N	COVID Update: Open for food May 8, 16, and 22, June 12, 20, 26. Fridays: Ticket is given at 9 am. Bags at 10 am. Saturdays: Ticket is given at 11 am. Bags at noon.	2019-12-01 00:00:00-08	\N	2020-05-25 17:17:08.647485-07	108	\N	\N		FOOD DONATIONS: Raymond Phillip, 323-868-8307\n4/14/20 sent FB message	f			raymondphillip55@yahoo.com			 @churchofchristwadams					\N	\N	110		2020-05-26 00:17:08.647485	\N		\N	2019-12-01 08:00:00					Raymond Phillip	323-868-8307		f	f	f	f				https://www.facebook.com/churchofchristwadams/				English	t	t	t	t	t	t	2	f
2970	Gardena Genesis Community Church Mama Rosa's Food Pantry	16113 S. Denker Avenue		Gardena	CA	90247	(714) 986-0402	33.88442212409634	-118.30448098486153	http://seventhgenesis.org/home					1500	1800	Sat3rd	1500	1800																			\N	Our drive in grab and go begins at 12 pm and ends when the last vehicle comes through the gates. We have served over 200 to 300 cars each of the Saturdays we have been open since the pandemic began.	2019-12-01 00:00:00-08	\N	2020-05-19 20:24:07.997712-07	108	\N	\N	Families call them and set up a time if they need food throughout the week. 	4/25/2020 confirmation received from their FB account	f			info@seventhgenesis.org			https://www.facebook.com/gardenagenesis/				We are blessed at the Gardena Genesis Community Church to have Mama Rosa, Jami Levy and the foodbank team. They work tirelessly without asking for anything in return. Our main objective is to serve each person with the love of Jesus Christ. There, you will meet a team mixed with members of the church and members of the community.  Together we are a church church family trying to put something on the tables for those who may need it the most. 	\N	\N	110		2020-05-20 03:24:07.997712	\N		\N	2019-12-01 08:00:00					Pastor Mu 	714-986-0402	http://seventhgenesis.org/donate	f	f	f	f			Please remain in your vehicles and someone will assist you as you drive in to our parking lot on La Salle Ave in the back of the church.					English	t	t	t	t	t	t	2	f
4366	Harbor Interfaith Services	670 W. 9th Street		San Pedro	CA	90731	(310) 831-9123	33.73607553	-118.291635	http://www.harborinterfaith.org																												\N	COVID Update: All items and services are available except the clothing closet.\n---\nDistribute to public \nMostly non-perishable, ready to eat food (no prep required) like peanut butter, etc\n	2020-03-29 18:39:28-07	\N	2020-05-19 20:24:08.956332-07	108	\N	\N	They serve SPA 8 and require ID. The case manager may ask the client to bring more documents on follow-up visits.	Called both numbers. One kept ringing and the other had an automated message saying that they were currently closed and that their normal office hours are Monday- Friday 9 am- 5 pm. Meals and Food Pantry\nI got their phone menu with the 9123 number, but when I selected "0", it sounded like someone hung up immediately. The 0603 number rang for a while.\n2020-04-07: Finally reached them on main numb	f	N/A		mradice@harborinterfaith.org	clothing closet (except during COVID-19), toiletries, hygiene products	housing, eviction, homeless drop in	https://www.facebook.com/harbor.interfaith	https://twitter.com/harborinterfai1	https://www.instagram.com/harborinterfaith/	https://www.linkedin.com/company/harbor-interfaith-services-inc.		\N	\N	110	Meals and Food Pantry	2020-05-20 03:24:08.956332	\N		\N	2020-03-30 01:39:28					Mike Radice	310-831-0603 Ext.224	m.radice@harborinterfaith.org	t	f	f	f	9 to 5, M-F	Please deliver to our loading dock at the back of the building at 670 W. 9th, San Pedro, between the hours of 9 to 5, M-F.  Ring the buzzer when you arrive, and an employee will answer.		pick up yes, though on hold currently due to COVID				English	t	t	t	t	t	t	2	f
2888	Centro Palabra de Fe	107 W. Artesia Boulevard		Compton	CA	90220	(310)632-7337	33.874626050836845	-118.22484129438786	http://www.palabra.org					2030	2130	SatLast	2030	2130																			\N	COVID: curbside food pick up \nProvided both perishable and non-perishable food\nNO Prepared food 	2019-12-01 00:00:00-08	\N	2020-05-25 16:27:38.741214-07	108	\N	\N	ID card recommended	FOLA liason name: Art, number:(310)632-7337, email: ,n/a, avaialbaility 9am-12pm  (monday-Friday)\n\nDistributes food to the Public\n\nTime used to be every last Saturday from 11 am-12 pm (but individual states that likelihood of reverting back to old schedule for the foreseeable future is unlikely)	f			info@palabra.org			https://www.facebook.com/CPdeFe/					\N	\N	110		2020-05-25 23:27:38.741214	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
3094	Rehoboth Courage Church	568 W. Compton Boulevard		Compton	CA	90220	(310)663-0789	33.895881545646105	-118.233621	www.rehobothcouragechurch.org					1100	1200																						\N	Provides both perishable and nonperishable - does NOT provide prepared food\n\n	2019-12-01 00:00:00-08	\N	2020-05-25 16:27:38.367044-07	108	\N	\N	n/a	FoodOasis Liason info\nname:  Adefmei Adegbesan\nnumber: (310)663-0789\nemail:adefmeiAdegbesan@gmail.com\n5/15/20 - email and ask for a public email	f	Rehobot Drug and Alcohol Prevention Center		adefemiadegbesan@gmail.com		DUI and anger management programs	https://www.facebook.com/RCCG-Rehoboth-Courage-Church-180157735333672/					\N	\N	110		2020-05-25 23:27:38.367044	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
2885	Centro Cristiano Las Buenas Nuevas	11910 Alondra Boulevard		Norwalk	CA	90650	562-926-3147	33.8873025	-118.0795603	http://www.lasbuenasnuevas.org/					1130	1300																						\N	Spanish Only	2019-12-01 00:00:00-08	\N	2020-05-23 14:14:30.480123-07	108	\N	\N		Went to voice mail.\nVM- Not set up with any information\n4/14/20 sent FB message and email 	f			info@revivelachurch.org			https://www.facebook.com/revivelosangeleschurch/					\N	\N	110		2020-05-23 21:14:30.480123	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
3098	Rosewood Revitalization Group	4101 Rosewood Avenue		Los Angeles	CA	90004	(323)662-1194	34.0793451	-118.2932645						1530	1630																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 09:56:06.329727-07	108	\N	\N		The voicemail of the main phone number is full, so I could not leave a message. I found another number online (626)287-5049 (the line is disconnected).\n\nNo other information on the Rosewood Revitalization Group is available online.\n	f											\N	\N	110		2020-05-23 16:56:06.329727	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
2917	Encounter Community Church	18749 Crenshaw Boulevard		Torrance	CA	90504	(310) 323-2115	33.8599467	-118.3274219	https://www.encountercommunity.church/					0900	1300																						\N	Formerly Crenshaw Baptist Church, merged with Impact Community \nchurch	2019-12-01 00:00:00-08	\N	2020-05-23 13:50:21.36618-07	108	\N	\N		Did not answer the phone but I emailed them and awaiting response.	f			Encountercommunity18749@gmail.com								\N	\N	110		2020-05-23 20:50:21.36618	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	f	f	f	f	f	f	2	f
3163	Tamarind Avenue S.D.A. Church	417 S. Tamarind Avenue		Compton	CA	90220	3237740181	33.892704596077934	-118.22187264093559						0900	1200																						\N	COVID-19 Updates: \nFood distribution only happening 2x a month (May 5th and May 19th 8:30am-10:00am)\n- Dates for June TBA\n\nProvides both perishable and non-perishable food\nFood is distributed to the public 	2019-12-01 00:00:00-08	\N	2020-05-25 16:27:38.550956-07	108	\N	\N	n/a	COVID: shortage on volunteers because 70% were 65 and older\n\nFOLA Liason: \nName: Mila Bailey [offince manager]\nPhone: (323)774-0181\nEmail: Tamarindave@aol.com\n	f	LA Regional Food Bank 		Tamarindave@aol.com		[zoom] bible study, church services 	https://www.facebook.com/tamarind.church					\N	\N	110		2020-05-25 23:27:38.550956	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
3031	Koreatown Multipurpose Senior	2147 W. Washington Boulevard		Los Angeles	CA	90018	(213)247-cell	34.0399577	-118.3075101						0830	1130																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 10:13:26.830633-07	108	\N	\N			f											\N	\N	110		2020-05-23 17:13:26.830633	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
3048	Los Angeles Housing Partnership	2614 W. 7th Street		Los Angeles	CA	90057	(213)629-9172	34.0586006	-118.2826812						1600	1700																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 10:14:35.872921-07	108	\N	\N			f											\N	\N	110		2020-05-23 17:14:35.872921	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
3072	Our Lady of Talpa Church	427 S. Evergreen Avenue		Los Angeles	CA	90033	(323)268-7731	34.036566	-118.205021						1300	1500																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 10:14:36.037895-07	108	\N	\N			f											\N	\N	110		2020-05-23 17:14:36.037895	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
2890	Charismatic Ecumencial Ministries International	439 South Western Avenue		Los Angeles	CA	90020	(213)219-3228	34.065917999999996	-118.3091360012694	https://cemilosangeles.wordpress.com/					1300	1330	Sun2nd	1300	1330	Sun3rd	1300	1330																\N	Entrance is located in the alley behind the church. Due to COVID, they have extended their hours. Provides perishable and nonperishable food. Does not provide prepared (cooked) food. 1 bag per family	2019-12-01 00:00:00-08	\N	2020-05-25 17:17:06.691368-07	108	\N	\N	Live in the general surrounding area.	Spoke on the phone with Reverend Pastora Linda Isaac. (213) 219-3228	f	N/A					https://www.facebook.com/cemilosangeles					\N	\N	110		2020-05-26 00:17:06.691368	\N		\N	2019-12-01 08:00:00					Reverend Pastora Linda Isaac	(213) 219-3228	cemi_losangeles@yahoo.com	f	t	t	t	call ahead. no one is in the church M-Th			limited space freezer and refrigerator space				English	t	t	t	t	t	t	2	f
4164	St. Cyril's Catholic Church 	2002 Merton Avenue		Los Angeles	CA	90041	323-254-2519	34.13809693199267	-118.21175776311385	http://sfcla.org/																												\N	Church and office currently closed due to COVID-19. 	2020-03-29 18:39:28-07	\N	2020-05-23 19:24:57.56773-07	108	\N	\N		Meals	f											2020-05-24 02:24:57.408	108	110	Meals	2020-05-23 15:56:29	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	4	t
4338	New Friends Homeless Center at St. Nicholas Episcopal Church 	17114 Ventura Blvd.		Encino	CA	91316	818-887-1109	34.15972500000001	-118.505979	http://www.newfriendshomelesscenter.org/																												\N	Covid Update - Giving out $10 gift cards to Subway and McDonalds, water, pet food. Can mail gift cards to address, visit website, call phone number. 	2020-03-29 18:39:28-07	\N	2020-05-25 17:17:09.299409-07	108	\N	\N		Instagram - https://www.instagram.com/newfriendshomelesscntr/	f	Miracle Minded Ministries 3		newfriendshomeless@gmail.com	hygiene kits, pet food, clothes, blankets, tents 	Bible study, entertainment 	https://www.facebook.com/Newfriendshomelesscenter/	https://twitter.com/NFHCenter				\N	\N	110	Meals	2020-05-26 00:17:09.299409	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	2	f
2699	Eagle Rockdale Community Garden & Art Park	1003 Rockdale Avenue		Los Angeles	CA	90041		34.13392644	-118.1887884	https://www.facebook.com/Eagle-Rockdale-Community-Garden-Art-Park-121724107876620/																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2736	Norman Harriton Community Garden	2037 N Sanborn Avenue		Los Angeles	CA	90027		34.10414197	-118.2786531																													\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2732	The Learning Garden	1300 Venice Blvd		Los Angeles	CA	90006	(310) 722-3656	34.04290511	-118.2822205	http://www.thelearninggarden.org/																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2731	Stanford Avalon Community Garden	658 E 111th Place		Los Angeles	CA	90059		33.93417627	-118.2637709																													\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2730	Spring Street Community Garden	220 S Spring Street		Los Angeles	CA	90012		34.050749	-118.246015	https://springstreetcommunitygarden.org																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2729	Solano Canyon Community Garden	545 Solano Avenue		Los Angeles	CA	90012		34.07418257	-118.2314301	https://www.facebook.com/Solano-Canyon-Community-Garden-133534380050987/																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2726	Salesian Boys & Girls Club Community Garden	2228 E 4th Street		Los Angeles	CA	90033		34.04122508	-118.2132207																													\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2725	Rosewood Gardens	4160 Rosewood Avenue		Los Angeles	CA	90004	(323) 821-7748	34.07572059	-118.3030171																													\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2943	Figueroa Church of Christ	455 W. 57th Street		Los Angeles	CA	90037	(323)753-2536	33.9908748	-118.2822084	http://www.figueroacoc.com/					0730	1100																						\N	We have both perishable and non perishable food.\n	2019-12-01 00:00:00-08	\N	2020-05-25 17:17:07.081297-07	108	\N	\N		Address confirmed as written above\nOffice hours M-F 10am - 3PM\nWill return calls if you leave your name and number\n4/7: VM - confirmed address, hours m-f 10am-3pm for church (unclear about pantry hours).\n4/14/20 emailed from form on website and sent FB message\n\nemail to JM: "Our food giveaway is on Tuesdays and Thursdays 7am-9am. "We have both perishable and non perishable food.\nPlease let me know if you have any further request.  Kendall Walkerm"\n	f			figueroachurchofchrist@gmail.com			https://www.facebook.com/FigueroaChurchofChrist					\N	\N	110		2020-05-26 00:17:07.081297	\N		\N	2019-12-01 08:00:00					Oscar Ward	(323) 496-3362	figueroachurchofchrist@gmail.com	t	t	t	t	call ahead to schedule pick up or delivery	pick up generally on mondays and wednesdays						English	t	t	t	t	t	t	2	f
4308	Rose Banner Ministries Inc.	5014 S. Western Avenue		Los Angeles	CA	90062	310-701-7699	34.01046603892817	-118.30892850000001	www.rosebanner.com																												\N	Access to education in life.We believe in the feeding ministry, feeding God’s  people not only spiritually with the word, but physically with food, clothing & shelter.  	2020-03-29 18:39:28-07	\N	2020-05-21 13:29:21.526158-07	108	\N	\N	No eligibility requirements to receive help. Rose banner is a community based organization that provides assistance to the needy all over the world.	No set hours of operation, she works in the community helping the needy and said that she is always available to help. Spoke to jenny about getting the ministry help with food and other items as well.	f	N/A		word@rosebanner.com	diapers,jackets,shoes,furniture or household items,personal items,toiletries etc..	food,shelter,employment,child services	https://www.facebook.com/rose.banner.7	N/A	N/A	N/A		\N	\N	110		2020-05-20 02:22:41	\N		\N	2020-03-30 01:39:28					Rose	310-701-7699	word@rosebanner.com	f	f	f	f	call ahead							English	t	t	t	t	t	t	2	f
3021	Inglewood Southside Christian Church	3947 W. 104th Street		Inglewood	CA	90303	(310)677-0446	33.9421196	-118.3433323	https://isschristian.org/?fbclid=IwAR1Zi0qV7B-fKBCKOhCd7HCjSZMVKB-WcN-FovzDcvSixyLtuJpXkG2GTFk					1000	1300																						\N		2019-12-01 00:00:00-08	\N	2020-05-21 19:38:48.357345-07	108	\N	\N		5/11/20 All information confirmed via website.  Due to COVID business hours are on Sunday's at 10:00am	f			info@isschristian.org		Offer clothing, fresh produce and canned goods	https://www.facebook.com/InglewoodSouthside/					\N	\N	110		2020-05-22 02:38:48.357345	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
3022	Inland Valley Hope Partners	209 W. Pearl Street		Pomona	CA	91768	(909)622-7278	34.0649162	-117.7523806						1400	1600	Wed	1400	1600	Fri	1400	1600																\N		2019-12-01 00:00:00-08	\N	2020-05-23 10:27:57.832097-07	108	\N	\N			f			info@inlandvalleyhopepartners.org								\N	\N	110		2020-05-22 02:42:15	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	f	t	t	f	2	f
2733	Vermont Square Community Garden	4712 S Vermont Avenue		Los Angeles	CA	90037		34.00009093	-118.2915068																													\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
4062	Valley Food Bank	12701 Van Nuys Boulevard	Suite A	Pacoima	CA	91331	(818) 510-4140	34.27541399	-118.4093774																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
2724	Rancho San Pedro Community Garden	275 W 1st Street		San Pedro	CA	90731		33.74327698	-118.2830172																													\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2723	Orcutt Ranch Horticultural Center Rancho Sombra del Roble	23600 Roscoe Blvd		West Hills	CA	91304		34.21913279	-118.641199																													\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2717	Manzanita Street Community Garden	1101 Manzanita Street		Los Angeles	CA	90029	(323) 533-3235	34.09348168	-118.280907	https://www.facebook.com/pages/Manzanita-Street-Organic-Community-Garden/398760433516388																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2716	John S. Gibson Senior Garden	1500 S Harbor Blvd		San Pedro	CA	90731		33.73094877	-118.2799586																													\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2715	Jardin Del Rio	2363 N Riverdale Avenue		Los Angeles	CA	90031		34.09173305	-118.234039																													\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2714	Howard Finn Community Garden	7747 Foothill Blvd		Tujunga	CA	91042		34.25813176	-118.3016987	https://www.facebook.com/pg/Finn-Community-Garden-1056595011050119/photos/?tab=album&album_id=1068115096564777																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2711	Granada Hills Salad Bowl Garden Club	16003 Rinaldi Street		Granada Hills	CA	91344	818-368-4533	34.27917819	-118.4808094																													\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2710	Good Earth Community Garden	5990 Boden St		Los Angeles	CA	90016		34.03038873	-118.3676776																													\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2709	Glassell Park Community Garden	3304 Drew Street		Los Angeles	CA	90065		34.12005434	-118.2430059	http://glassellparknc.org/2015/03/community-garden-blooms-again/																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2708	Fremont Wellness Center & Community Garden	7821 S Avalon Blvd		Los Angeles	CA	90003	213-572-0188	33.96816788	-118.2651973	http://www.fremontwccg.org/																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
3010	Iglesia Macedonia Defenders of the Christian Faith	9228 S. Central Avenue		Los Angeles	CA	90002	(323)804-6615	33.952555	-118.255771						1900	2000																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 12:06:24.788732-07	108	\N	\N		I called the main phone number, they hung up on me lol...\n\nI checked their calendar out and it is all in Spanish, but I looked up "comida" and found nothing. It appears they do not act as a food pantry.	f						https://www.facebook.com/pages/Iglesia-Macedonia-Defenders-of-the-Christian-Faith/164195626964461?nr					\N	\N	110		2020-05-23 19:06:24.788732	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
4428	Beyond Dreams	1319 W. 124th St.		Los Angeles	CA	90044	(323) 531-2869	33.92025155233986	-118.29934025728548																													\N		2020-03-29 18:39:28-07	\N	2020-05-30 00:31:01.102555-07	108	\N	\N		Food Pantry\nAddress provided belongs to a residential home. 	t											\N	\N	110	Food Pantry	2020-05-23 20:32:49	\N	test test	\N	2020-03-30 01:39:28					Akisha C Cox or Rodney Cox Sr	(323) 531-2869		f	f	f	f								English	f	f	t	f	f	f	2	f
2916	Cover the Homeless Ministry	4425 S. Central Avenue		Los Angeles	CA	90011	(323)931-5468	34.0031117	-118.2568599	https://www.coverthehomeless.org/about-us					1200	1300																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 10:26:17.787789-07	108	\N	\N		Founder: Rose Rios, werent available but call back	f			cvrhomelessmsry@aol.com	blankets,food, clothing, transportation 	counseling referrals for health services, job placement, provide shelter, 					an organization that helps addicts recover and provides for them for whatever they might need to begin again.	\N	\N	110		2020-05-23 17:26:17.787789	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
4431	Home At Last CDC	3425 W. Manchester Blvd. 		Inglewood	CA	90305	(323) 750-7177	33.960465	-118.3315635	https://www.homeatlastcdc.org/services/																												\N		2020-03-29 18:39:28-07	\N	2020-05-30 10:30:10.40646-07	108	\N	\N		Homeless Shelter - need to call or reach out via facebook or instagram	f			info@homeatlastcdc.org		Rapid pre housing, emergency shelter, case management	https://www.facebook.com/homeatlastorg/	https://twitter.com/homeatlastorg			Home At Last Community Development Corporation enhances the effectiveness of community programs by connecting individuals with the services they need. We also provide emergency shelter services, case management assistance and information to individuals who lives/works in South Los Angeles.	\N	\N	110	Homeless Shelter	2020-05-23 17:22:29	\N		\N	2020-03-30 01:39:28	https://www.instagram.com/homeatlastcdc/							f	f	f	f								English	f	f	f	t	t	f	2	f
2919	Crusaders for Christ Baptist Church	3200 W. Temple Street		Los Angeles	CA	90026	(323)681-3569	34.0752651	-118.2816342						1530	1700																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 19:34:22.410901-07	108	\N	\N		04.19.2020: looked up name, phone number and address on google...no church specific information came up.  Called and the person on the phone hung up - said you "don't need that" \n4/25/2020: Wasn't able to find any church specific information online. Called and went to voicemail but voicemail did not specify who this number belonged too.	t											2020-05-24 02:34:22.298	108	110		2020-05-23 15:56:17	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	4	f
2873	Bread of Life Community Outreach	628 South Street		Long Beach	CA	90805	(562)428-5422	33.8584858	-118.0929072	http://www.longbeachbreadoflife.com - website down					0830	1200	Wed4th	0830	1200																			\N		2019-12-01 00:00:00-08	\N	2020-05-23 19:40:17.586157-07	108	\N	\N		2. - No one was available\n4/7 VM no info	t											2020-05-24 02:40:17.358	108	110		2020-05-23 15:56:22	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	4	f
4455	Church of Christ La Puente (at Amar & Unruh)	15124 Amar Rd		La Puente	CA	91744	626-336-1927	34.03815300000001	-117.9545985		\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N		2020-05-30 11:46:38.927977-07	108	\N	\N	\N	\N		Don Wallace, and Zina is contact - 626-715-3984	f											\N	\N	\N	\N	\N	\N		\N	\N								f	f	f	f								English	t	t	t	f	t	f	1	f
3043	Loaves & Fishes-Glendale	4322 San Fernando Road		Glendale	CA	91204	213-318-5707	34.1316156	-118.261043						1000	1530	Tue	1000	1530	Wed	1000	1530	Fri	1000	1530													\N		2019-12-01 00:00:00-08	\N	2020-05-23 20:55:16.142156-07	108	\N	\N	A Los Angeles County Resident, low-income household, valid form of ID	VM - 4/13/2020 confirmed hours	f	Catholic Charities of Los Angeles, Inc.				Rental and utility assistance, case management						\N	\N	110		2020-05-24 03:55:16.142156	\N		\N	2019-12-01 08:00:00							syanez@ccharities.org	f	f	f	f								English	t	t	t	t	t	t	2	f
3009	Iglesia la Puerta Abierta	5017 E. Olympic Boulevard		Los Angeles	CA	90022	(323)261-8397	34.0173349	-118.1621792						1900	1930																						\N		2019-12-01 00:00:00-08	\N	2020-05-29 10:55:39.41906-07	108	\N	\N		Called, they did not pick up. Also the voice message system is in Spanish which I do not speak. \n\nUpdate: Called again, no pick up.	f						https://www.facebook.com/pg/iglesialapuerta.abierta.7/about/?ref=page_internal					\N	\N	110		2020-05-23 19:06:24	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	f	t	2	f
4261	Mission (Iglesia) Siloe Defensores de la fe Cristian	3818 S. Maple Avenue		Los Angeles	CA	90011	323-561-0490	34.012561	-118.272069	No website, they only have a listing with LA Food Bank																												\N	During COVID-19 food pantry services: Every Tuesday 2-4:30pm by appointment only. Individuals must make an appointment (in-person) at 6-7 am and fill out a physical form. Individuals will return the same day at the scheduled appointment time. Appointments will be scheduled anytime from 2-4:30 pm. *Please arrive early for an appointment, as they tend to be fully booked by the first hour.\n-Also, the organization offers a special program for individuals over 60 years and older. Eligible individuals can drop by anytime at 2-4:30pm on Tuesdays to receive a small box that includes nonperishable goods (10 lbs.). No appointment needed. \n\n\nNormal food pantry services: Individuals must pick up a ticket at 7 am the day of food pantry distribution and return for food from 6-7 pm (Public released info on another health site, published on 3/23/20).\n\nThe organization offers a variety of food that includes and is not limited to fresh produce, canned food, dry food, vegetables, and sometimes dairy goods. \n\n	2020-03-29 18:39:28-07	\N	2020-05-23 10:22:12.372395-07	108	\N	\N	During COVID-19, no photo IDs or residential addresses are required at this time. People will be served regardless. \n\n\nNormal food pantry services: Food pantry clients must bring a photo ID with them to the pantry. The ID must show the client's current residential address. Some pantries have an application process and ask clients for documents supporting income. However, all clients will be served the first time regardless of the completion of the application and service area.	The updated information was confirmed by Mission Siloe Defensores de la fe Cristian volunteer Laura Martinez. The organization depends on food bank donations to continue its food pantry services and would love to be connected to any food rescue organizations and programs. Please contact Laura Martinez for any future FOLA updates at 323-817-5882. (Updated 5/5/20 at 10:28AM).	f			siloedefen@gmail.com			https://www.facebook.com/pages/category/Religious-Organization/Iglesia-Siloe-Defensores-de-la-Fe-Cristiana-142798416459828/					\N	\N	110		2020-05-23 16:56:04	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	f	t	f	t	t	2	f
4181	United University Church	2208 S Union Ave		Los Angeles	CA	90007	213-748-0209	34.03530000000001	-118.2827385	www.uuc-la.org																												\N	The food pantry offers fresh produce, frozen proteins, pantry staples, and canned foods.	2020-03-29 18:39:28-07	\N	2020-05-23 11:12:09.398786-07	108	\N	\N	None	United University Church serves USDA food that they receive from the LA Regional Food Bank. What they have in stock depends on what they are able to order. If they receive any additional types of food, then it will be coming from HopeNet since they have a partnership with them (this type of food varies). \n\nShirley Velasco, the Food Ministry Coordinator and Office Manager of United University Church, confirmed the listed information via email. She is the point of contact for food rescue organizations and future FOLA updates. Please contact her at office@uuc-la.org. (Updated: 5/14/20 at 3:00PM)	f			office@uuc-la.org		Bible Study and on-campus ministry at USC.	https://www.facebook.com/uniteduniversitychurch/	https://twitter.com/UnitedUnvChurch				\N	\N	110		2020-05-23 17:14:36	\N		\N	2020-03-30 01:39:28								f	f	f	f			Must wear a mask. We provide gloves and face masks to volunteers, hand sanitizer, and access to a restroom for handwashing. We have drawn markers (in chalk) on the sidewalk to encourage people to practice social distancing. We have several posters both in English and Spanish promoting social distancing and that a mask must be worn at all times. Our volunteers also actively remind people in line to practice social distancing.					English	f	t	f	t	t	f	2	f
3036	Life Deliverance Ministries	9120 S. Western Avenue		Los Angeles	CA	90044	(562)607-8780	33.9538569	-118.3087286						0800	1100																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 12:06:25.607795-07	108	\N	\N		Main number on Google "(323) 777-5433": no one picked up. It continued to say the number is disconnected or no longer in service. \nAlso tried calling the current  phone number: (562)607-8780... no one picked up and it went to voicemail. \nIt appears the Ministry is currently closed	f											\N	\N	110		2020-05-23 19:06:25.607795	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
3132	St. Agnes Church	2625 S. Vermont Avenue		Los Angeles	CA	90007	(323)731-2464	34.0320812	-118.2918201						0900	1030	Tue	0900	1030	Thu	0900	1030	Fri	0900	1030													\N	Must bring proof of residence, ID, and strong bags to carry the food	2019-12-01 00:00:00-08	\N	2020-05-23 20:55:15.412198-07	108	\N	\N	Must live within the Washington-Exposition and Western-Hoover area.		f			fr.luis.stagnes@gmail.com			https://www.facebook.com/pg/StAgnesCatholicChurchLA/about/?ref=page_internal					\N	\N	110		2020-05-24 03:55:15.412198	\N		\N	2019-12-01 08:00:00								f	f	f	f								English, Spanish	t	t	t	t	t	t	2	f
2979	Grace Resource Center, Inc.	45134 N. Sierra Highway		Lancaster	CA	93534	(661)940-5272	34.7030069	-118.137309	https://www.graceresources.org/					1000	1100	Tue	1300	1400	Wed	1000	1100	Wed	1000	1100	Thu	1000	1100	Thu	1300	1400							\N	COVID-19 Updates \n- Food pantry is operating and groceries are being distributed on Tuesdays and Thursdays, at 10am and 1pm.  \n- For those who speak Spanish, groceries are being distributed every Wednesday at 10am.\n- Hot meals are served every Wednesday and Friday at 5:30pm, and Sunday at 1:30pm. \n- On Wednesdays, breakfast is served at 9am and lunch at 12pm noon.\n- If participating in mail services, mail will be distributed on Tuesdays and Thursdays between 10am and 2pm.\n.\n\nFood Pantry Grocery Distribution\n- Clients must arrive 10 - 15 minutes early and bring ID. \n- Clients will line up in the courtyard on "safety dots"\n- Clients who arrive late will be asked to come to the next distribution.\n- Clients who do not follow safety protocols will be asked to leave for the safety of staff and other clients.\n- Only non-perishable food available at the food pantry.\n\nHot Meal Distribution\n- Clients will be asked to line up in the courtyard on "safety dots" and all meals will be given to go. \n                 	2019-12-01 00:00:00-08	\N	2020-05-23 11:00:08.211641-07	108	\N	\N	- Need to show ID\n	- - Food pantry is operating and groceries are being distributed on Tuesdays and Thursdays, at 10am and 1pm.  \n- For those who speak Spanish, groceries are being distributed every Wednesday at 10am.\n- Hot meals are served every Wednesday and Friday at 5:30pm, and Sunday at 1:30pm. \n- On Wednesdays, breakfast is served at 9am and lunch at 12pm noon.\n\nDonations are accepted Monday-Friday from 9am-3:30pm.\n- Liaison for food rescue organizations is Jeremy Johnson at j.johnson@graceresources.org. 	f	N/A		info@graceresources.org	Infant needs (diapers, baby food, formula, clothing, shoes, hats, and coats), hygiene kits, clothing	Free classes, including Adult Literacy, Effective Communication, Breakthrough Parenting, Anger Management, and Computer Training. Mail services are also offered. 	https://www.facebook.com/graceresourcesav/					\N	\N	110		2020-05-20 03:24:07	\N		\N	2019-12-01 08:00:00					Jeremy Johnson		j.johnson@graceresources.org	f	f	f	f				Donations are accepted Monday-Friday from 9am-3:30pm				English\nSpanish	t	t	t	t	t	t	2	f
2931	Echo Park United Methodist	1226 N. Alvarado Boulevard		Los Angeles	CA	90026	(213) 484-8214	34.07884102663175	-118.26269678515797	https://echoparkumc.org/					1400	1700																						\N	The organization only offers a hot breakfast every Tuesday morning.\n\n	2019-12-01 00:00:00-08	\N	2020-05-23 12:55:25.553935-07	108	\N	\N	No eligibility/requirements. Just show up!	Contact info: revfrankwulf1@gmail.com, cell phone: 310-435-5502. (Updated: 5/23/20 at 10:30 AM)\nSubmited\n\n	f			echoparkumc@gmail.com		Serve hot breakfast every Tuesday morning	https://www.facebook.com/EchoParkUnitedMethodistChurch/				\n	\N	\N	110		2020-05-23 19:55:25.553935	\N		\N	2019-12-01 08:00:00						310-435-5502	revfrankwulf1@gmail.com	f	f	f	f					Serving free food meals for everyone		Hot Meals	English	t	t	t	t	t	t	2	f
2858	All Peoples Christian Center	822 E. 20th Street		Los Angeles	CA	90011	(213) 747-6357	34.0257601	-118.256703	https://allpeoplescc.org/					1200	1700																						\N	It's a popular food pantry. Get there early because often they have meat and produce. You can get non-perishables ("canned goods")   M-F 9am - 4:30pm. You may contact us at (213) 747-6357, Monday – Friday 9:00 am – 5:30 pm for services.\n\nNew Emergency Senior Meals Response program: Seniors in need can have healthy meals delivered to their homes. City of L.A. residents ages 60 and older who are not currently participating in other meal programs can apply online: docs.google.com/forms/d/e/1FAIpQLSf_xMpL5qtG9cjpbTEpWRUaIXmjoms4YpTtDol-Mv8ikHH23A/viewform. 	2019-12-01 00:00:00-08	\N	2020-05-23 13:53:00.643006-07	108	\N	\N	ID, proof of income and proof of address (copy of a utility bill is best).\n	Instagram: @AllPeoplesLA    sends the person to automatic voice mail to get a receptionist press 110 when giving you the list of contacts 	f			allpeoples@allpeoplescc.org		Extended Day Child Care, After-School Programs, Summer Camp, Collaboration for Family Wellness, Work Source Center, Supplemental Food Program (SFP), Community Building and Educational Events, Parenting Classes, Women Support Groups, Anti-Recidivism Program, Retired Senior and Volunteer Program, Community Garden, Immigration Services	facebook.com/AllPeoplesCC	@AllPeoplesLA			see notes	\N	\N	110		2020-05-23 20:53:00.643006	\N		\N	2019-12-01 08:00:00	@AllPeoplesLA   							f	f	f	f								English\nSpanish	t	t	t	t	t	t	2	f
2866	Berean S.D.A. Church	4211 W. Adams Boulevard		Los Angeles	CA	90018	(323)735-0228	34.0329576	-118.3310595	bereanca.adventistchurch.org					0900	1100																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 19:35:49.030254-07	108	\N	\N			t			bereancommunications@gmail.com			facebook.com/bereansdachurchla					2020-05-24 02:35:48.699	108	110		2020-05-23 19:06:27	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	4	f
2702	Elysian Valley Community Garden	1816 W Blake Avenue		Los Angeles	CA	90039		34.09722483	-118.2429669	http://lagardencouncil.org/elysianvalley/																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
3035	Church of Deliverance International, Inc. (Lawrence Ministries)	12441 E. Farlow Street		Hawaiian Gardens	CA	90716	(562) 653-9868	33.83290178711987	-118.06660409919803	http://www.codii.org/?fbclid=IwAR3K6o2bPRYLSHrQP9FkRFgEtglurdno4Irc3mW9NayC3GyYlr9lHWT45VE					1000	1400																						\N	Just as He gives justice to the oppressed, we are reminded in Psalm 146:7 that He gives food to the hungry\nDonation portal is: https://www.mybridgeelementgiving.com/App/Giving/chur1244	2019-12-01 00:00:00-08	\N	2020-05-26 23:53:28.239671-07	108	\N	\N	None. Everyone is welcome!	It appears that "Lawrence Ministries" is now called Church of Deliverance International, Inc.\n\n	f			inquiries@codii.org		Food distribution is every third Saturday, 10:00am - 2:00pm. Everyone is welcome.	https://www.facebook.com/LetsTakeTheCity/	https://twitter.com/codiiofficial			Food Ministry	\N	\N	110		2020-05-26 00:15:11	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
3086	Presentation of Mary Catholic	6406 Parmelee Avenue		Los Angeles	CA	90001	(323)585-0570	33.9813266	-118.249548						0730	0830																						\N		2019-12-01 00:00:00-08	\N	2020-05-24 16:09:26.028087-07	108	\N	\N			f											\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	f	f	f	f	f	f	1	f
2700	Eastwind Community Garden	110 Eastwind Street		Marina Del Rey	CA	90292		33.97724579	-118.4631657	http://www.eastwindgarden.com/																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2972	Glendale Filipino S.D.A. Church	310 E. Chestnut Street		Glendale	CA	91205	(818)543-0110	34.1395829	-118.2520609	www.glendalefilipinosda.org					1100	1200																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 15:46:14.710849-07	108	\N	\N		4.25.2020:  found a yelp page with information about the church.  It provided a website but the website has many placeholders in information - looks like it hasn't been updated since 2018.  It did show a food pantry listing for Wednesdays at 8pm.  \nWebsite had an email for the Associate Pastor: Matthew Belonio, BelonioM@gmail.com\nFound multiple addresses and phone numbers.  Found a facebook page on the website and sent message via FB messenger.\n	f			BelonioM@gmail.com			@glendale.filipino.SDAC					\N	\N	110		2020-05-20 03:56:31	\N		\N	2019-12-01 08:00:00					Michael Todd 	818-543-0110		f	f	f	f				Looking to start a pantry. Another contact name: Matthew Belonio, BelonioM@gmail.com				English	t	f	f	f	f	f	2	f
3159	St. Thomas Center	2727 W.  Pico Boulevard		Los Angeles	CA	90006	(323)737-3325	34.0243687	-118.4608522						0700	0900	Sat2nd	0700	0900	Sat3rd	0700	0900																\N		2019-12-01 00:00:00-08	\N	2020-05-25 11:13:13.973953-07	108	\N	\N			f											\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	f	f	f	f	f	f	1	f
2901	Church of the Redeemer	3739 Monterey Avenue		Baldwin Park	CA	91706	(626) 960-9585	34.08046750178901	-117.97618031825233	cotrbp.org					0900	1300	Tue	2100	1300	Wed	0900	1300	Thu	2100	1300	Fri	0900	1300	Sat	2100	1300							\N	YouTube channel: https://www.youtube.com/user/COTRBaldwinPark\nUsually, only a few people show up on weekdays, but you can expect a crowd of up to 200 customers on the last Saturday of the month.\n\nCOVID Updates: Food Pantry is currently by appointment only, so people need to call for an appointment,  and it is drive-through only.	2019-12-01 00:00:00-08	\N	2020-05-25 17:17:09.021374-07	108	\N	\N	Under 65, need driver's license, social security number, proof of residence in Baldwin Park or surrounding community. 65 and over, just need ID. Homeless also welcome. Register by filling out an application on your first visit and registration is good for a year ending in July.	John Darragh spoke with Carmen on 12/18/19. Program is funded by a grant from the city of Baldwin Park. Food is purchased using the grant money from the LA Regional Food Bank.\n5/9/2020 contacted through Facebook	f			office@cotrbp.org	Canned foods, rice, beans, cereal, oatmeal, water, coffee, frozen meat, eggs, egg whites (inventory varies)		https://www.facebook.com/cotrbp/					\N	\N	110		2020-05-26 00:17:09.021374	\N		\N	2019-12-01 08:00:00	https://www.instagram.com/cotrbp/							f	f	f	f				Usually, only a few people show up on weekdays, but you can expect a crowd of up to 200 customers on the last Saturday of the month. Food Pantry is by currently by appointment only				English	t	t	t	t	t	t	2	f
4344	Hollywood Food Coalition	5939 Hollywood Boulevard		Los Angeles	CA	90028	(323) 462-2032	34.10169166	-118.3194111	hofoco.org																												\N		2020-03-29 18:39:28-07	\N	2020-05-23 15:39:41.528255-07	108	\N	\N		Meals Provided. changed name from greater west hollywood food coalition to hollywood food coalition\nspoke to Patty and verified name and where services are located - gave me the executive director's info to contact regarding other information.  Sherry Bonanno - 213-703-9513 (not for public).  Texted and am waiting for return call. \nneed to verify lunch information, hours, and other services provided	f			info@hofoco.org	hand wipes, napkins, utensils 	housing aid, mobile medical and vision clinics, assistance with basic needs (clothes, backpacks, bus passes)	HoFoCo	hofoco			Prepare hot dinners every night of the week.  	\N	\N	110	Meals Provided	2020-05-20 04:24:24	\N		\N	2020-03-30 01:39:28	hollywoodfoodco							f	f	f	f			currently providing prepackaged to-go dinners and meat lunch, peanut butter lunch. \nMonday - Friday meals are provided at 5939 Hollywood Blvd (The Salvation Army - The Way In) \nSaturday & Sunday meals are provided at the street corner of Orange & Romaine in Hollywood.				hot meals, salads, fruit salad, bread, dessert, drinks	English	t	t	t	t	t	f	2	f
4066	Calvary Baptist of Pacoima	12900 Vaughn Street		San Fernando	CA	91340	818-470-1480	34.28807400000001	-118.413288	http://www.calvarypacoima.org																												\N	No longer active. Contact person is Carolyn who ran the pantry. Her cell number is the one listed above (818-470-1480). She directed me to the Valley Food Bank (https://valleyfoodbank.org/food-pantry-locations/) for other food pantry locations. She suggested we talk to the director William Hernandez. 	2020-03-29 18:39:28-07	\N	2020-05-23 19:17:49.403107-07	108	\N	\N			t	County of Los Angeles Department of Public Social Services					https://www.facebook.com/groups/488994705416/					2020-05-24 02:17:49.214	108	110		2020-05-23 15:56:24	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	4	f
2973	Good News Central Church	3500 W.1st Street		Los Angeles	CA	90004	(213)386-0097	34.0731603	-118.2896203	http://goodnews.or.kr/					1000	1100																						\N		2019-12-01 00:00:00-08	\N	2020-05-25 13:00:12.906551-07	108	\N	\N		05/11/20 - wrong phone number,  not affiliated with the church (this is the only phone number provided). Unable to find updated church hours or list of contacts. (I believe this site is no longer active).\n5/13/20- no answer, call back	t			jongyahn@hotmail.com	Other items provided include:	Other services provided are:						2020-05-25 20:00:12.481	108	110		2020-05-23 15:56:18	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	4	f
3105	Sacred Heart Church	2210 Sichel Street		Los Angeles	CA	90031	(323)221-3179	34.0703284	-118.2126261	http://www.sacredheartchurchla.org/contact-us/					1000	1230	Thu3rd	1000	1230																			\N		2019-12-01 00:00:00-08	\N	2020-05-23 19:24:33.803885-07	108	\N	\N		called and got a response stating that until May 15 none of these programs will be open. 	f			parish-4180@la-archdiocese.org			https://www.facebook.com/jesus.church.3720					2020-05-24 02:24:33.668	108	110		2020-05-23 15:56:27	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	4	t
3018	Immanuel Presbyterian Church	3300 Wilshire Blvd		Los Angeles	CA	90010	(213)389-3191 	34.0614542	-118.294485	https://immanuelpres.org/food-pantry/					0930	1130																						\N	- On Saturdays, service is held until 10:30 AM OR until the first 225 have been served.\n\n- We are enforcing the social distancing (6ft) policy. Our Food Pantry is a Grab and Go Schedule.\n\n- The Grocery Program offers food that needs to be cooked (such as rice, pasta, or beans). We offer the food items to our guests and allow them to select what they would like.\n\n- The Food Pantry is open on the schedule above and is located in the church basement and accessible through the Catalina Street entrance.\n	2019-12-01 00:00:00-08	\N	2020-05-23 20:55:14.845134-07	108	\N	\N		Food Donation Contact: If you are interested in volunteering at the Food Pantry, please contact the Food Pantry Director at 213.389.3191 extension 321\n\nFood Pantry Grab and Go Schedule is:\n\nMonday: 09:00am – 12:00pm — 01:00pm – 03:00pm\nTuesday: 12:00pm – 03:00pm — 04:00pm – 06:00pm\nWednesday: 09:00am – 12:00pm — 01:00pm – 03:00pm\n\nThursday: 12:00pm – 03:00pm — 04:00pm – 06:00pm \nFriday: 09:00am – 12:00pm — 01:00pm – 03:00pm\nSaturday: 8:00 – 10:30am\n\nThe Grocery Program offers food that needs to be cooked (such as rice, pasta, or beans). We offer the food items to our guests and allow them to select what they would like.	f			info@immanuelpres.org			https://www.facebook.com/immanuelpres/					\N	\N	110		2020-05-24 03:55:14.845134	\N		\N	2019-12-01 08:00:00								f	f	f	f			No volunteers accepted during COVID					English	t	t	t	t	t	t	2	f
2898	Iglesia de Dios Baldwin Park	4161 Baldwin Park Boulevard		Baldwin Park	CA	91706	(626) 968-6716	34.0873966	-117.9652924						0900	1200	Wed	1900	2100																			\N	Permanently Closed	2019-12-01 00:00:00-08	\N	2020-05-23 19:42:32.909001-07	108	\N	\N		Church apparently out of business - location has new church "First Christian Church"	t			iglesiadediosbp@yahoo.com			Iglesia de Dios Baldwin Park					2020-05-24 02:42:32.73	108	110		2020-05-23 15:56:23	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	4	f
2875	Burbank Temporary Aid Center	1304 W. Burbank Boulevard		Burbank	CA	91506	(818)848-2822	34.18271744543844	-118.32610055300368	http://www.burbanktemporaryaidcenter.org					0900	1700	Tue	0900	1700	Wed	0900	1700	Thu	0900	1700	Fri	0900	1700										\N	 email field does not recognize this address for some reason - info@thebtac.org	2019-12-01 00:00:00-08	\N	2020-05-23 14:12:43.290043-07	108	\N	\N		I did not get through. A better chance is to call during the week when the office is staffed. I tried to use their automated directory to reach an admin and client registration.  \n\n	f			info@thebtac.org								\N	\N	110		2020-05-23 21:12:43.290043	\N		119	2019-12-01 08:00:00								f	f	f	f			Covid: Hours have changed: Currently 0900-1200 M-F (Service Homeless clients Monday and Friday. Service Housed clients Tuesday, Wednesday, and Thursday.)					English	t	t	t	t	t	t	2	f
4379	Salvation Army Compton Corps 	736 E. Compton Boulevard		Compton	CA	90221	310.639.0362	33.895638000000005	-118.215216	https://compton.salvationarmy.org/compton_corps/                www.comptoncorps.org																												\N	Love Kitchen Program [hot meals]\nRegular Hours: Evry Monday 6:00pm-7:00pm\nCOVID-19 Hours: Evry Monday 04:30pm -06:30pm \n\nFood Pantry Program [box food]\nRegular Hours: Thurs 10:00 am-12:00pm; (10:00am-11:00am Seniors Only) and (11:00am-12:00pm General Public)\n**hours operate the same during COVID-19\n\nCOVID-19 Updates:\nFood Delivery available to Seniors and those with special accomidations (Recipient must call before thurdsays in order to set an appointment)	2020-03-29 18:39:28-07	\N	2020-05-26 10:12:56.882862-07	108	\N	\N	Love Kitchen Program: NO eligibility/requirements\n\nFood Bank Program: ID required\n*COVID update: No ID required	FOLA Liason:\nName: Perla Salvador\nNumber: (310)639-0362 ext. 7162 or 7163\n\nDistributes food to the public only\nProvides both perishable and Non-Perishable foods  -- Just need to confirm the hours. \n\n05/26/20: Sent an email to verify hours 	f			perla.salvador@usw.salvationarmy.org		helps to pay Edison and Gas bill (but, it's by appointment only and recipient must call Monday at 2pm)	https://www.facebook.com/thesalvationarmycompton/					\N	\N	110		2020-05-25 20:26:31	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	f	2	f
4401	Women in Action Reaching Out	851 Via Carmelitos		Long Beach	CA	90805	(562) 253-8078	33.84763857596399	-118.18227358249993																													\N	Two different programs:\n1. Children and Adult food program: Everyday 11:00 am -12:00pm\nGrab-and-Go Program\n\n2. Food Distribution Program: Every Thursday (Seniors 9:00 am-10:00am) and (General public 10:00am-11:00am)\nGrab-and-Go Program\n\nProvides both Perishable and non-perishable foods\nDo you distribute to the general public (yes)\nD0 you distribute food to other organizations (yes)\n	2020-03-29 18:39:28-07	\N	2020-05-26 16:41:30.530575-07	108	\N	\N	n/a	05/05/2020: Working on creating their own website, call back in a couple of weeks for an update - Two different programs:\n1. Children and Adult food program: Everyday 11:00 am -12:00pm\nGrab-and-Go Program\n\n2. Food Distribution Program: Every Thursday (Seniors 9:00 am-10:00am) and (General public 10:00am-11:00am)\nGrab-and-Go Program\n\nProvides both Perishable and non-perishable foods\nDo you distribute to the general public (yes)\nD0 you distribute food to other organizations (yes)\n	f	Depeartment of education nutrition Services		cronadaking@yahoo.com		senior program	https://www.facebook.com/Women-in-Action-Reaching-Out-981488641901325/					\N	\N	110	Meals and Food Pantry	2020-05-25 23:09:39	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	2	f
2993	Hollywood Community Housing	5020 W. Santa Monica Boulevard		Hollywood	CA	90029	(323)469-0710	34.09076081483433	-118.29869015741717	http://hollywoodhousing.org/					1530	1730	Fri	1130	1330																			\N		2019-12-01 00:00:00-08	\N	2020-05-25 16:30:12.248363-07	108	\N	\N	no appointment necessary, although will be required to sign login sheet when going to pick up food	I called phone at (323)469-0710. I couldn't reach someone directly although there is a pre-recorded message which confirms location, operating hours (only on Thursdays 3:30-5:30pm), and items distributed. The pre-recorded message also states that they provide basic non-perishable food, including frozen foods when available. I plan to call again later to try reaching someone on phone. -PMG 4/25\n\n	f	Hollywood Community Housing Corporation		info@hollywoodhousing.org			https://www.facebook.com/HollywoodHousing/		https://www.instagram.com/hollywoodhousing/			\N	\N	110		2020-05-25 23:30:12.248363	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
3055	Meet Each Need with Dignity (MEND Poverty)	10641 N. San Fernando Road		Pacoima	CA	91331	(818) 897-2443	34.26355350623241	-118.41944485818561	https://mendpoverty.org/programs/emergency-food-bank					0800	1400	Thu	0800	1400	Fri	0800	1400	Sat	0900	1200													\N	If you would like to donate food, food donations are accepted Tuesday; Thursday-Friday: 8:00-3:00pm and on Select Saturdays: 9:00am – 12:00pm (see: https://mendpoverty.org/dev/wp-content/uploads/2019/01/Saturday-Schedule-2019.pdf)\n\nTo reach the Foodbank Warehouse Manager: Richard Torrez: (818) 686-7302 and richardt@mendpoverty.org\n	2019-12-01 00:00:00-08	\N	2020-05-30 10:44:11.40501-07	108	\N	\N	None	Food Box Distribution\n\nTuesday: (Homeless Care Program) 9:00 am – 11:00 am\n\nThursday: 8:00 am – 2:00 pm\n\nFriday: 8:00 am – 2:00 pm\n\nSaturday: 9:00 am – Noon\n\nMEND Cafe offers breakfast and lunch during service days. $3 donation suggested. Check with information desk for details.  (Please bring your own shopping bags.)\nSatellite Food Banks\n\nOur Lady of Peace in North Hills\n\n    2nd & 4th Friday per month; 8:30 am – 10:30 am\n\n\nCalled the original number: (818)686-7334, it is no longer in service and it is associated with FoobankManager: Adam Brooks whose email is: adam@mendpoverty.org. I am not sure if the website information is outdated (as in the provided phone number is no longer Adam's phone number) or if Adam Brooks no longer works for MEND.\n\nAlso, I tried calling their generic business phone numbers: (818) 897-2443 or (818) 896-0246, where I was unsuccessful to get in touch with anyone. \n\nThe Foodbank Warehouse Manager: Richard Torrez has a working phone number: (818) 686-7302; however, did not pick up. His email is: richardt@mendpoverty.org\n\ncall or reach out via facebook messanger	f			info@mendpoverty.org		Food is distributed to more than 60 smaller pantries and charities annually in the area that also care for low-income individuals. 	https://www.facebook.com/MENDPoverty	https://twitter.com/MENDpoverty		https://www.linkedin.com/company/mend---meet-each-need-with-dignity/	MEND’s Emergency Foodbank is the largest in Los Angeles providing direct distribution to clients in need, and one of the largest in the state of California.	\N	\N	110		2020-05-26 00:15:11	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
2902	Church of the Valley - Fetty Food Pantry	6565 Vesper Avenue		Van Nuys	CA	91411	818-786-4070	34.19010900000001	-118.45095600043268	https://www.covtoday.org/					0930	1200	Wed	0930	1200																			\N	TEFAP\n\nYouTube channel https://www.youtube.com/channel/UCUWfNYwztc8Zp7sv9shQUkw\nInstagram: https://www.instagram.com/covtoday/\n	2019-12-01 00:00:00-08	\N	2020-05-30 10:37:15.749605-07	108	\N	\N	Individuals and Families with Photo ID or utility bill with current address can receive food 2  / month. Must live between Sepulveda Bl and Hazeltine Av and between Vanowen St and Oxnard Av.	Tentatively verfied other info based on web site.\n\nChurch phone 818-786-4070 active. Called 18-April-20 at 10am no answer\n\ncall or reach out via facebook	f	Church of the Valley		info@covtoday.org			https://www.facebook.com/COVtoday				Serving individuals and families living within the immediate neighborhood (From Sepulveda Blvd. to Hazeltine Ave. and Vanowen St. to Oxnard St.	\N	\N	110		2020-05-26 00:15:11	\N		\N	2019-12-01 08:00:00	https://www.instagram.com/covtoday/							f	f	f	f								English	t	t	t	t	t	t	2	f
2914	Corys Kitchen-Iglesia Torre De Alabanza	822 Bradbourne Avenue		Duarte	CA	91010	(626)960-4639	34.1422404	-117.9590196						1700	1900	Sun3rd	1700	1900																			\N	This location closed when Cory's Kitchen merged with Shepherd's Pantry.	2019-12-01 00:00:00-08	\N	2020-05-23 19:43:24.632202-07	108	\N	\N			t											2020-05-24 02:43:24.239	108	110		2020-05-23 15:56:24	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	4	f
4316	Cal State LA Food Pantry	5151 State University Drive		Los Angeles	CA	90032	(323) 343-3103	33.94	-118.52	http://www.calstatela.edu/deanofstudents/cal-state-la-food-pantry																												\N		2020-03-29 18:39:28-07	\N	2020-05-23 19:43:41.7812-07	108	\N	\N		called phone number (323)3433103 and got a dean on the line which indicated that there is no date which they will open. on the website under pantry to plate, it indicates that they will check back on May 31.	f						https://www.facebook.com/calstatelafoodpantry					2020-05-24 02:43:41.584	108	110		2020-05-23 15:56:24	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	f	4	t
2968	Fred Jordan Mission	445 Towne Avenue		Los Angeles	CA	90013	(213) 489-7763 and (626) 915-1981	34.043258293929206	-118.24180656217895	http://fjm.org					1200	1300	Tue	1200	1300	Wed	1200	1300	Thu	1200	1300	Fri	1200	1300										\N	COVID-19 updates: "We open the doors at 9:30 am serving breakfast – then by 1:00 pm, the line for lunch is around the building and up 5th Street.  At 2:00 pm, we serve a hot meal, and most days, we serve meals until the food runs out." \n\nFood Offered & Hours\nBreakfast and Snack Bags: Tuesday-Saturday 9:30 AM - 12:00 PM\nHot Meals: Tuesday-Friday 2:00 PM-3:30 PM; 12:00 PM Saturday\nSnack bags and food bags are given at all times that they are open. Both perishable and nonperishable food are given during open hours.	2019-12-01 00:00:00-08	\N	2020-05-25 17:17:05.583564-07	108	\N	\N	Hot meals are only offered to those who attend their daily chapel service.	April 4th: Did not get through. Went straight to voice mail.\nApril 7th: VM, no info\n4/14/20 found this phone number 626-915-1981\n4/27/20 confirmation received from their FB account; their response regarding connection to food rescue organizations: "Organization Contact:  Cheryl Beintema – cell: 626-422-4437"	f			fjmoffice@fjm.org	socks, clothing, blankets, and snacks foods		https://www.facebook.com/FredJordanMissions/	https://twitter.com/fjmissions?lang=en				\N	\N	110		2020-05-26 00:17:05.583564	\N		\N	2019-12-01 08:00:00					Cheryl Beintema	626-422-4437		f	f	f	f								English	t	t	t	t	t	t	2	f
3193	Wilshire Presbyterian Church - Hope Net	300 S. Western		Los Angeles	CA	90020	(213) 387-5387	34.068726	-118.3090935345376	http://wilshirepres.org/Sundays.html					1100	1200																						\N	Our Food Pantry is located in the Community Center\nSundays at noon are meals. Mondays free groceries are available.	2019-12-01 00:00:00-08	\N	2020-05-25 17:17:06.900788-07	108	\N	\N	elder - 60 above\ngeneral - anyone\nshowers - vulnerable population priority\n	FOOD DONATIONS: Pastor Kobie or Garrett Jackson, (213) 387-5387. If you want to volunteer at the Food Pantry, you are welcome to help us as we assemble the grocery bags on Sunday afternoons from 12.30pm - 2pm or on Mondays to distribute the food from 8am - 1pm.	f	N/A		wilshirepc@sbcglobal.net			Wilshire Presbe					\N	\N	110		2020-05-26 00:17:06.900788	\N		\N	2019-12-01 08:00:00					Pastor Kobie or Garrett Jackson	(213) 387-5387		f	f	f	f								English	t	t	t	t	t	t	2	f
2918	Crenshaw United Methodist Church	3740 Don Felipe Drive		Los Angeles	CA	90008	(323)292-0141	34.0068523	-118.3408663	https://www.crenshawumc.org/					1000	1200																						\N	COVID Updates:  Food Pantry: Every 3rd  Saturday from 10:00am to around 12:00pm (first come, first serve basis).\nEvery 1st, 2nd, and 4th Saturday is Trader Joe's Grocery Handout by appointment only. For more information call (323)292-0141, Tues - Thurs 9:00am-2:00pm. People will be added to list and put on a rotational schedule for grocery pick-up.d types given: Groceries including fruits and vegetables. Canned Foods. Staple Foods.	2019-12-01 00:00:00-08	\N	2020-05-25 17:17:08.83476-07	108	\N	\N	Trader Joes food give away, participants must call (323) 292-0141 to reserve their name on a list\n	FOOD Donations: Mrs Karen Green-Jenkins, crenshawumcla@gmail.com or Almita Cash and Liz Porter (323) 292-0141\n4.19.2020: reached out over facebook messenger.  Made contact  - someone from their office will contact Jenny.\n4/25/2020: Left a voice message. Office Hours are Tues-Fri 8:30am-4:00pm. \n4/28/2020: Made contact with Almita Cash and information was verified.\n\nFood Pantry: Hours have changed due to COVID. Ran by LA Food Bank. Prior to COVID, people required to fill out form to verify zip code. However, due to COVID no longer requiring form. Every 3rd Saturday\nTrader Joes Grocery Handout: Prior to COVID, people lined up to receive groceries with no appointment required. Hours prior to COVID: First, Second, and Fourth Saturday of each month starting at 10am.	f	N/A		crenshawumcla@gmail.com	Occasional toiletries - depending on what donations they receive		https://www.facebook.com/crenshawumcla/					\N	\N	110		2020-05-26 00:17:08.83476	\N		\N	2019-12-01 08:00:00					Mrs Karen Green-Jenkins, Almita Cash, and Liz Porter	(323) 292-0141	crenshawumcla@gmail.com	f	f	f	f						All are welcome. Prior to COVID only required zip code.		English	t	t	t	t	t	t	2	f
4177	New Challenge Ministries, Inc.	21804 Halldale Avenue		Torrance	CA	90501	(310) 320-4171	33.82996148	-118.3016078																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4147	Action Food Pantry - Grace Lutheran Church	17880 E. Covina Boulevard		Covina	CA	91722	(626) 319-0554	33.94	-118.52	www.actiontogether.info																												\N	Non-profit organization that's located at Grace Lutheran, but not run by it. \nBoth persishable and non parishable  No prepared food, try not to. \nPortos account — They have a contract with them for all their leftovers	2020-03-29 18:39:28-07	\N	2020-05-25 17:17:09.998844-07	108	\N	\N	Picture ID, from anywhere (US, Canada, Mexico). They don't turn anyone away. Please bring a valid ID and a recent piece of mail with current address.	The number and above is the right number for a liason to get information (they are super friendly and kind)\n	f			actionfoodpantry@gmail.com	Dog food, cat food, hygiene products, clothes, diapers, female hygiene products (when they have it)	Special Air program -  action instant relief: 2x year will deliver food if participants can't make it. Another two times a year, they can call this number 24/7 to get food from them, and meet them at the pantry to deliver food to them there					Provides food for Low income, Senior, Disabled and the Homeless. Non-profit organization that's located at Grace Lutheran, but not run by it. 	\N	\N	110		2020-05-26 00:17:09.998844	\N		\N	2020-03-30 01:39:28								f	f	f	f				COVID: Trying to get people to donate more food because they're running out. They need canned food.				English	t	t	t	t	t	t	2	f
4150	Bresee Youth Center	184 South Bimini Place		Los Angeles	CA	90004	(213) 387-2822	34.07082656364673	-118.29048802657903	https://www.bresee.org/																												\N	COVID-19 Updates\n- Grab and Go Meals available for pickup every Monday to Friday, 11:30am - 12:30pm. Meals are first-come, first-serve. 	2020-03-29 18:39:28-07	\N	2020-05-25 17:18:22.400732-07	108	\N	\N	- No requirements	- FOLA liaison contact: Jimmy Can, jcan@bresee.org\n- Meal program is not ongoing, only during COVID-19	f	Bresee Foundation		info@bresee.org		Gang Reduction and Youth Development programs (assessment, family coaching, youth coaching, group activities), After-School Youth Services (middle-school, high school internships, college access & success, teen tech center, athletics), Scholarship Program, free tax preparation services 	https://www.facebook.com/BreseeFoundation/	https://twitter.com/breseela				\N	\N	110		2020-05-26 00:18:22.400732	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	2	f
3148	St. Joseph Conference	1150 W. Holt Avenue		Pomona	CA	91768	(909) 629-4101	34.0613107	-117.7687845	stjosephchurchpomona.org/					0900	1100	Wed	0900	1100	Fri	0900	1100																\N	"SVDP Conference has made the decision to close down the pantry until further notice." 	2019-12-01 00:00:00-08	\N	2020-05-23 19:44:33.126104-07	108	\N	\N		Information found on April 5, 2020 bulletin - pantry is closed.	t			stjoseph.pomona@outlook.com			 St Joseph Catholic Church Pomona,CA					2020-05-24 02:44:32.884	108	110		2020-05-23 15:56:25	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	4	f
4232	American Veteran Inc.	351 East Temple Street 		Los Angeles	CA	90012	909-534-5953	34.05149131363604	-118.2384792665763	https://www.losangeles.va.gov/locations/directions-LAACC.asp																												\N	COVID-19 has not impacted the timings. 	2020-03-29 18:39:28-07	\N	2020-05-25 11:21:53.598443-07	108	\N	\N	It is only for veterans. An appointment must be made before they can come and get food. 		f			notapplicable@na.com	Animal food is sometimes available	Depending on time and personnel availability, there may be counselling services. 	https://www.facebook.com/pg/losangelesva/posts/					2020-05-25 18:21:53.385	108	110		2020-05-23 15:56:28	\N		\N	2020-03-30 01:39:28								f	f	f	f			Closed because of COVID. Not accepting donations.  	Closed because of COVID. Not accepting donations.  				English	t	t	t	t	t	t	4	t
3013	Iglesia Piedra Angular	2110 W. Francisquito Avenue		West Covina	CA	91790	 (626) 833-8144	34.0597225	-117.9630247						1930	2015																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 19:40:42.414084-07	108	\N	\N		5/9 Via Facebook messenger: "We no longer offer these services."	t						https://www.facebook.com/iglesiapiedraangularwc/?rf=135666383737184					2020-05-24 02:40:42.252	108	110		2020-05-23 19:03:23	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	4	f
3028	JFS/SOVA Community Food & Resource Program Valley	16439 Vanowen Street		Van Nuys	CA	91406	(818)988-7682	34.1942489	-118.491725	https://www.jfsla.org/page.aspx?pid=300					0900	1200	Mon	1000	1330	Tue	1000	1330	Wed	1000	1330	Thu	1000	1330										\N		2019-12-01 00:00:00-08	\N	2020-05-23 14:40:35.610153-07	108	\N	\N			f											2020-05-23 21:40:35.513	108	110		2020-05-23 15:56:31	\N		\N	2019-12-01 08:00:00					Kathi Dawidowicz	818.988.7682 ext. 120	kdawidowicz@jfsla.org	f	t	t	t	(for Valley location) Mon-Thu 8-4, Fri 9-3, Sun 8-2	Donations are accepted from 8-4 Mon- Thursday, Sunday 8-2.	Pico location is temporarily closed, Valley location remains open					English	t	t	t	t	t	f	4	t
2894	Christ Centered Ministries Church	742 N. La Brea Avenue		Inglewood	CA	90302	(310) 672-4078	33.972923	-118.357212	http://www.christcenteredministries.org					1000	1230																						\N	\n	2019-12-01 00:00:00-08	\N	2020-05-23 19:28:49.002754-07	108	\N	\N		No answer and there was no voicemail message. (I called at 11am PT on first Saturday of April (4/4/20) during COVID.)\n\nInstagram: ccm_rrr\n\nSpoke with someone that works at the church, but not with the food pantry directly. She did not have information except to confim that it was at that address. She believes it is on hold for COVID. I gave her the food oasis email to share with the pantry representative. She said she would have them share the hours. 	f			help@christcenteredministries.org			https://www.facebook.com/christcenteredmin/				Christ-Centered Ministries' mission is to develop partnerships with churches and para-church organizations. We will also develop housing projects and support programs to help individuals transition into mainstream society.	2020-05-24 02:28:48.822	108	110		2020-05-23 15:56:29	\N		\N	2019-12-01 08:00:00					Pastor David	310-750-8646	david@christcenteredministries.org	f	t	t	t	by appt only	call ahead of time to set up drop off	COVID Update: Pantry services on hold because of COVID\n					English	t	t	t	t	t	f	4	t
3029	Jewish Family Service/SOVA Community Food & Resource Program West	8846 W Pico Boulevard		Los Angeles	CA	91406	(818)988-7682	34.05495369	-118.384835	https://www.jfsla.org/page.aspx?pid=300					0900	1200	Mon	1000	1330	Tue	1000	1330	Wed	1000	1330	Thu	1000	1330										\N	COVID updates: "We have closed the SOVA West location in the Pico-Robertson area. We are very sorry for any inconvenience this causes. We hope to reopen in the very near future when circumstances improve." The site is closed because of the high percentage of volunteers and management being an at-risk senior.\n\nThe WEST pantry is located on the south side of Pico Blvd. one-half block west of Robertson Ave. Metered street parking is available on Pico Blvd. and surrounding streets as well as in a parking lot located just a few doors west of the building. New clients are advised to arrive by the time the pantry first opens in the morning in order to register as a new participant and receive the complete program orientation.\n\nYou may visit the SOVA pantry once in each calendar month and receive groceries for all eligible dependent family members. Grocery orders are sized according to the number of family members. If you are homeless or do not have refrigeration and/or cooking facilities, you may visit twice each month.\nPlease inform the SOVA volunteer of special dietary requirements so that your order can be packed appropriately (example: no meat, no pork, low salt, low sugar, Kosher, etc.).\n\nTo view pantry holiday closures: https://www.jfsla.org/sslpage.aspx?pid=302	2019-12-01 00:00:00-08	\N	2020-05-23 19:37:24.618293-07	108	\N	\N	We request official photo identification of first-time participants as well as identification for all additional dependent family members showing that all are living at the same address. We also require proof of residence within our service area. Please check eligibility guidelines here: https://www.jfsla.org/sslpage.aspx?pid=301	JFSLA responded to my inquiry via Facebook messenger. They are super quick and responsive. JFSLA personnel confirmed that their Pico site is closed at this time and does not have a designated date of when they will reopen.\n\nFor future updates regarding the food pantry and to connect JFSLA to food rescue organizations, please contact Fred Summers at fsummers@jfsla.org. He runs SOVA.	f			communications@Jfsla.org			https://www.facebook.com/JFSLA/	https://twitter.com/Jfsla				2020-05-24 02:37:24.193	108	110		2020-05-23 15:56:20	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	4	t
2864	Baldwin Park Bilingual S.D.A.	13965 Ramona Parkway		Baldwin Park	CA	91706	(626)338-4828	34.085323	-117.969546	https://baldwinparkbilingualca.adventistchurch.org/					1830	1930																						\N	Bilingual - Spanish	2019-12-01 00:00:00-08	\N	2020-05-23 19:10:13.259924-07	108	\N	\N			t	Baldwin Park Bilingual Seventh-Day Adventist Church		baldwinparksda@aol.com								2020-05-24 02:10:13.111	108	110		2020-05-23 15:56:22	\N		\N	2019-12-01 08:00:00					Neomi Sias	619-322--0992		f	f	f	f				or https://www.facebook.com/noemi.dominguezsias				English\nSpanish	t	t	t	t	t	t	4	f
4115	North Hollywood Interfaith Food Pantry 	15453 Rayen Street		North Hills	CA	91343	818-891-0481	34.232409000000004	-118.46922749999999	http://our-redeemer.org																												\N	COVID: Not open right now.  Voicemail messages say they are part of North Valley Caring Services and their office hours are Monday - Friday 8am-4pm.\n4/7/2020: Confirm previous message. Listed various extensions for different departments, (ie. admin, executive director, after school staff, colectivo staff and general information)	2020-03-29 18:39:28-07	\N	2020-05-23 20:57:09.994169-07	108	\N	\N			f	North Valley Caring Services										2020-05-24 03:57:09.876	108	110		2020-05-24 03:56:22	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	f	t	f	4	t
4273	House Of Yahweh	4046 Marine Avenue		Lawndale	CA	90260	(310) 675-6412	33.89457897439196	-118.34533052560803	https://www.hoy-southbay.org/																												\N	Have both perishable and non-perishable food\n	2020-03-29 18:39:28-07	\N	2020-05-23 20:56:39.976421-07	108	\N	\N	No requirements because of COVID-19\nPeople can pick up food boxes but must call ahead in the morning around 9 am to set up pick up.	Distribute food to the public and sometimes to other organizations\nhttps://www.instagram.com/hoysouthbay/ - Instagram account	f	N/A		ed@hoy-southbay.org	Clothes, adult diapers	Emergency assistance, provide clothes, food, shelter for homeless, assist with social services, provides free healthcare screenings 	https://www.facebook.com/hoysouthbay/					2020-05-24 03:56:39.838	108	110	Food Pantry	2020-05-24 03:56:22	\N		\N	2020-03-30 01:39:28	https://www.instagram.com/hoysouthbay							f	f	f	f			COVID Update: Temp closed Thrift Shop where most of the homeless outreach is done. Use the thrift shop as a resource to gather clothes and distribute clothes to the homeless.					English	t	t	t	t	t	t	4	t
3052	All People's First Assembly of God	4330 Martin Luther King Jr Blvd		Lynwood	CA	90262	(310) 639-2010	33.9211561	-118.1884331	www.ag.org 					2030	2130																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 19:32:05.046534-07	108	\N	\N		05/06/2020: went to voicemail--> no information was given. I also found a website and Facebook page and I Emailed them. Need to call back\n	f						https://www.facebook.com/pages/All-Peoples-First-Assembly-of-God/109349012436540					2020-05-24 02:32:04.933	108	110		2020-05-23 15:56:30	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	4	t
3146	St. John Vianney Church	1345 Turnbull Canyon Road		Hacienda Heights	CA	91745	(626) 330-2269	34.0112629	-117.980451	sjvhh.org					0830	1230																						\N	Still in operation.	2019-12-01 00:00:00-08	\N	2020-05-23 19:32:26.633563-07	108	\N	\N		COVID Update: Closed to the public. Someone will be answering the phones 10am-2pm M-F\nVoicemail on 4/13/20 saying the office is closed. Only calling back numbers if there is an emergency or death. 	f						facebook.com/SJVHH					2020-05-24 02:32:26.24	108	110		2020-05-23 15:56:31	\N		\N	2019-12-01 08:00:00								f	f	f	f			Closed to the public. Someone will be answering the phones 10am-2pm M-F					English	t	t	t	t	t	f	4	t
4106	Abrazar Midway Community Center	14900 Park Lane		Midway City	CA	92655	(714) 898-0203 or (714) 893-3581	33.74624197	-117.9787815	abrazarinc.com																												\N	Their regular hours are:\nEvery second Wednesday is for people over 60.\nEvery third Wednesday is for people over 18. 	2020-03-29 18:39:28-07	\N	2020-05-26 17:04:10.105271-07	108	\N	\N	Need to show proof of age. 	5/23 - Please check covid notes vs. public notes. hours are not complete.	f	Abrazar		abrazar.info@abrazarinc.com		Seniors can participate in activities such as bingo, zumba, and mindfulness and Alzheimer's classes. 						2020-05-27 00:04:09.963	108	110	Meals and Food Pantry	2020-05-26 23:50:00	\N	Has donation notes.	\N	2020-03-30 01:39:28					Mario Ortega	714-893-3581	m.ortega@abrazar@inc.com	f	t	t	t	Appt only	No designated time, call ahead to coordinate with details (food type, quantity, etc.)	During COVID-19, the normal food service is not running. Instead, seniors can show up at the community center every Tuesday from 11.30 am to 12.30 pm to pick up meals. They have to show proof that they are 60 and above and fill out an application. 					English	t	t	t	t	t	t	4	f
3158	St. Stephen's Community Outreach Program	320 W Garvey Ave. 		Monterey Park	CA	91754	(626) 573-9984	34.06240950983909	-118.126395	https://www.ststephenmpk.org/					0930	1130																						\N		2019-12-01 00:00:00-08	\N	2020-05-30 11:14:24.308027-07	108	\N	\N	Must bring with them a proof of residency in the city of either Monterey Park or Alhambra (usually utility bills addressed to you)		f			st.stephen.martyr@gmail.com			https://www.facebook.com/St-Stephen-Martyr-Catholic-Church-104369971214557/				The mission of the Church is to spread the gospel message, administer sacraments and reach out with charity and justice to people in need. The Church is led by the Pope, who is the successor of the Apostle Peter, and the Bishops, who are also in the line of apostolic succession.	2020-05-30 18:14:23.853	108	110		2020-05-30 16:18:38	\N		\N	2019-12-01 08:00:00		Jen James	707-478-0517	jenmjames@gmail.com	David Madrid	(626) 573-0427		f	f	f	f	Can recieve donations every Saturday morning from 9:30 AM – 11:30 AM.			Items needed and appreciated: Pasta, Cereal, Canned soup, Canned tuna, Canned vegetables, Dried fruits, and Nuts				English	t	t	t	t	t	t	4	f
2868	Bethel Food Bank Outreach	1921 N. Garey Avenue		Pomona	CA	91767	(909) 630-5883 and  (909) 296-0708 (personal phone numbers listed on their website)	34.0812428	-117.7531627	http://bethel42.adventistchurchconnect.org/					1100	1300	Sun3rd	1100	1300																			\N	Bilingual: Spanish\nFood packages provided includes staples, canned goods, limited amounts of meat, dairy products and occasionally fruits and vegetables. The amount of food varies with family size and should last four days. People may be assisted once every 35 days; one package per address and household. Families with 6 or more individuals may receive 2 boxes every 35 days. \nP.O. Box 2524 Pomona, CA 91769 (Mailing)\nChurch Number (909)629-0106 \nThe food pantry is active.	2019-12-01 00:00:00-08	\N	2020-05-30 10:49:12.432753-07	108	\N	\N	Two current forms of ID, including one picture ID for the head of household; ID for all family members; and proof of residence are required. For the homeless no ID or proof of residence is needed. First-come, first-serve with handicapped, disabled or frail elderly served first. No fees for service. No geographic restrictions.	4/18 10:30 am called (909) 630-5883 left voicemail, (909) 296-0708 cannot accept messages\nChurch number (909)629-0106 (left message), the voicemail says their Food Bank hours.\n\nCall again	f	Bethel Seventh Day Adventist Church		info@bethel42.adventistchurchconnect.org	Food, clothing, emergency food assistance, diapers, shoes, small housewares (when available)						Bethel Food Bank Outreach, located in Pomona, provides holiday assistance, personal good, and emergency food assistance to those who live in the San Gabriel and Pomona Valleys. Services provided are for low income families and those that are homeless. 	\N	\N	110		2020-05-25 17:34:08	\N		\N	2019-12-01 08:00:00						(909) 296-0708		f	f	f	f								English\nSpanish	t	t	t	t	t	t	2	f
4185	Safe Passage/Westminster Baptist Church	2300 Griffith Avenue		Los Angeles	CA	90011	(310) 629-0746	34.02224477	-118.2559815																													\N		2020-03-29 18:39:28-07	\N	2020-05-23 12:49:40.782613-07	108	\N	\N		Meals and Food Pantry	f											\N	\N	110	Meals and Food Pantry	2020-05-23 19:49:40.782613	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	f	f	f	f	f	2	f
3037	Lifeline Community Services & Economic Development	2556 N. Lake Avenue		Altadena	CA	91001	(626)797-3585	34.1896939	-118.1310706	https://www.lifelinefcc.org/					1200	1400	Wed4th	1200	1400																			\N		2019-12-01 00:00:00-08	\N	2020-05-30 10:56:54.937722-07	108	\N	\N		5/30 - I see on their FB page that they have recent postings. This will probably be the best way to reach them and verify the information about their food pantry. 	f			Eldercdd@aol.com			https://www.facebook.com/LifelineFCC/				 	\N	\N	110		2020-05-30 17:56:54.57	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
4022	Truechurch of God In Christ	10600 S. Main Street		Los Angeles	CA	90003	626.840.4982 	33.94012	-118.273859	http://truechurchm.org/																												\N	COVID-19 Updates\n\n- Hours are the same (2nd and 4th Thursdays of the month, between 11am - 12pm)\n- Individuals are required to wear masks and practice social distancing\n	2020-03-29 18:39:28-07	\N	2020-05-25 16:08:10.758109-07	108	\N	\N	- Bring ID just in case	Did not wish to provide contact information for liaison but said to contact the number (626) 840-4982 for future updates.	f	N/A		truechurch.tcm@gmail.com			https://www.facebook.com/truechurch.tcm/?rf=442090392799426					\N	\N	110		2020-05-25 23:08:10.758109	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	2	f
3059	Missionaries of Charity	10950 California Avenue		Lynwood	CA	90262	(310) 635-3264	33.933439026920205	-118.20845257224919						1530	1700																						\N		2019-12-01 00:00:00-08	\N	2020-05-30 10:41:27.030622-07	108	2020-05-28 13:35:27-07	110		05/06/2020:  They answered,  but said now was not a good time, call back	f						https://www.facebook.com/pages/Missionaries-of-Charity-Convent-Chapel/148413798523542					2020-05-30 17:41:26.619	108	110		2020-05-25 23:27:37	\N		\N	2019-12-01 08:00:00					Sister Nisha Maria	310-635-3264	n/a	t	t	t	t	call ahead	call ahead						English	t	t	t	t	t	t	4	f
3027	Jesus is the Answer Apostolic Church	25100 S. Normandie Avenue	Suite A	Harbor City	CA	90710	(310) 637-7086	33.7965619	-118.2966541	http://www.jitaministries.com/					1200	1600																						\N	COVID Updates: It is required to have a mask on when visiting food pantry and it is highly preferred that visitors wear gloves. \n\n\nThe food pantry offers a variety of goods: meats, breakfast, canned food, dry food.	2019-12-01 00:00:00-08	\N	2020-05-25 11:09:33.35292-07	108	2020-05-24 10:20:12-07	110	Please bring an ID and/or a form of identification. 	Pastor Ernest Johnson confirmed that the provided information is correct. \n\nFor future updates and connections to food rescue organizations, please contact Albert Woodson, Program Director of JITA. (Updated: 5/13/20 at 12PM)	f			jitaministries@aol.com			https://www.facebook.com/pg/JITA238/about/					\N	\N	110		2020-05-25 18:09:33.207	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
2999	Hope Chapel Foursquare Church	2420 Pacific Coast Highway		Hermosa Beach	CA	90254	(310)374-4673	33.8715292	-118.3942418	https://hopechapel.org/					0900	1200	Wed	1300	1600	Fri	0900	1200	Fri	1300	1600													\N		2019-12-01 00:00:00-08	\N	2020-05-23 12:03:24.130167-07	108	\N	\N	Those coming to Foodbank must present an ID and avail food once a month. Those are homeless 		f			info@hopechapel.org		Hope in Action					Foodbank (not a pantry)	\N	\N	110		2020-05-23 19:03:24.130167	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	f	t	t	t	t	2	f
2878	Catholic Charities of L.A.	4665 Willow Brook Avenue		Los Angeles	CA	90029	(213)251-3597	34.0896046	-118.2934993	http://catholiccharitiesla.org/where-we-are/program-directory-by-city/					1000	1500	Tue	1000	1500	Wed	1000	1500	Thu	1000	1500	Fri	1000	1500										\N		2019-12-01 00:00:00-08	\N	2020-05-23 13:54:01.198566-07	108	\N	\N			f											\N	\N	110		2020-05-23 20:54:01.198566	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
3005	Iglesia Cristiana El Shaddai USA	5518 South Broadway		Los Angeles	CA	90037	(323)235-5988	33.9921017	-118.2779982						1930	2100																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 11:10:54.700388-07	108	\N	\N	None. No ID required.	4/25/2020: Was not able to find any online information on the organization. Called (323)235-5988 but went to voicemail. Spanish Speaking. Last Verified on 03/01/2020	f											\N	\N	110		2020-05-23 18:10:54.700388	\N		\N	\N								f	f	f	f								English\nSpanish	t	t	f	f	t	f	2	f
3000	Hope Chapel Lancaster	6015 W. Avenue	J8	Lancaster	CA	93536	(661)943-1074	34.6826776	-118.2371694	http://hope4av.org					0930	1100																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 12:03:24.622007-07	108	\N	\N		Not been able to talk to them	f			hope4av@as.net			https://www.facebook.com/HopeChapelav/					\N	\N	110		2020-05-23 19:03:24.622007	\N		\N	\N								f	f	f	f								English	t	f	f	t	t	f	2	f
4375	Someone Cares Soup Kitchen	720 W. 19th Street		Costa Mesa	CA	92627	949-548-8861	33.643647	-117.928467																													\N		2020-03-29 18:39:28-07	\N	2020-05-25 07:37:12.965125-07	108	\N	\N		Meals Provided	f											\N	\N	110	Meals Provided	2020-05-25 14:37:12.965125	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
4289	Monte Sion Center	4405 E. Olympic Boulevard		Los Angeles	CA	90023	(323) 974-2856	34.01893781	-118.1766262	http://montesioncenter.org																												\N		2020-03-29 18:39:28-07	\N	2020-05-30 14:59:50.353039-07	108	\N	\N		Food Bank	f	Monte Sion Church 					Monte Sion Center@MonteSionCenter			Monte Sion Center		\N	\N	110	Food Pantry	2020-05-30 17:53:19	\N		\N	2020-03-30 01:39:28								f	f	f	f					The Food Bank is open to non-profit agencies and the public every Thursday & Friday			English\nSpanish	t	t	t	f	t	f	2	f
2958	Food Net -Asian Service Center	14112 S. Kingsley Drive		Gardena	CA	90249	(310) 217-7300	33.90287131779098	-118.30420919161541	https://wdacs.lacounty.gov/center/asian/					0800	1600	Tue	0800	1600	Wed	0800	1600	Thu	0800	1600	Fri	0800	1600										\N	\n	2019-12-01 00:00:00-08	\N	2020-05-30 09:43:44.540888-07	108	\N	\N	The Center provides food to low-income families, individuals, and seniors in the Gardena area. Eligibility is not required to access this program, but the Center collects information such as name, job, phone number, zip code, and the number of people in a household.	The Center accepts food donations from individuals and organizations. The Center accepts referrals from social workers, health care providers and 211. Please call the center to schedule a food appointment or donations, walk-in daily. \n\n5/14/2020 called and received confirmation: The Center used to distribute food to other organizations, but it depends now (possibly due to COVID). They mainly get their food donations from the LA Regional Food Bank, so they may or may not accept donations from other food rescue organizations	f					toy loan program for children ages 3 months to 13 years old (toys, games, and books)						\N	\N	110		2020-05-23 19:43:04	\N		\N	2019-12-01 08:00:00								f	f	f	f			Call for an appointment from 8 am - 6:30 pm before coming in, closed every Wednesday. Check their website for the most up-to-date information.				Canned goods	English	t	t	t	t	t	f	2	f
4251	Family Health Care Resources	3444 Whittier Boulevard		Los Angeles	CA	90023	213.413.3040	34.026918	-118.199685	https://fhcr.info/																												\N		2020-03-29 18:39:28-07	\N	2020-05-30 10:11:05.48331-07	108	2020-05-28 14:43:54-07	110	Food pantry does not need an application to receive a bag with groceries.	Instagram: https://www.instagram.com/fhcrhelp/\nthe website indicates that it is open Monday to Friday from 9 am to 5 pm but the phone automatic response says Monday to Friday from 10 am to 5 pm	f				canned food, fresh food	Information about the different insurance programs available, help with enrollment for Medi-Cal and covered California.	https://www.facebook.com/FHCRHELP					2020-05-30 17:11:05.043	108	110		2020-05-24 03:55:15	\N		\N	2020-03-30 01:39:28					Lesly	818-281-9712 or 213.413.3040	leslymunoz@fhcrhelp.org	t	t	t	t	call ahead, primarily in office M-F	n/a						English	t	t	t	t	t	t	4	f
4097	Los Angeles Education Partnership-75th Street Elementary	142 W. 75th Street		Los Angeles	CA	90003	(323) 971-8885	33.97175546	-118.2756265	https://75thstes-lausd-ca.schoolloop.com/cms/page_view?d=x&piid=&vpid=1371552496482																												\N	COVID-19 Updates:\n\nGrab and Go Food Distribution, Monday - Friday, from 8am - 11am located at Fremont High School (7676 San Pedro St, Los Angeles, CA 90003)	2020-03-29 18:39:28-07	\N	2020-05-25 11:18:09.042848-07	108	\N	\N		- Food Pantry (Students Only)\n- Was not able to get in contact with a person for future updates.	f	N/A			Device Hotspots (must be requested through LAUSD)							\N	\N	\N	Food Pantry (Students\nOnly)	\N	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	f	1	f
4456	Church of Christ La Puente (at Amar & Unruh)	15124 Amar Rd		La Puente	CA	91744	626-336-1927	34.03815300000001	-117.9545985		\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N		2020-05-30 11:46:57.667526-07	108	\N	\N	\N	\N		Don Wallace, and Zina is contact - 626-715-3984	f											\N	\N	110	\N	2020-05-30 18:46:56.932	\N		\N	\N								f	f	f	f								English	t	t	t	f	t	f	2	f
4372	Bread of Life Foursquare Gospel	5179 W Washington Blvd		Los Angeles	CA	90016	 (323) 939-4716	34.04133373939631	-118.35357201526344	http://labreadoflife.org/																												\N	- Food Pantry on Thursdays operates at Avalon Gardens Housing Project from 1pm - 3pm. (701 East 88th Place, Los Angeles, CA 90002)\n\nCOVID-19 Updates\n- Services are temporarily limited due to "stay-at-home" orders.\n- Get to food pantry early. 	2020-03-29 18:39:28-07	\N	2020-05-25 17:17:08.452358-07	108	\N	\N		- Was not able to get through\n- Voicemail included food pantry hours (Wednesdays at 11am, Thursdays between 1pm - 3pm at Avalon Gardens Housing Project).	f	N/a		Breadoflifela@gmail.com		Outreach services in Venice Beach (Saturdays) and Skid Row (3rd Saturday of the month)	https://www.facebook.com/breadoflifela					\N	\N	110		2020-05-26 00:17:08.452358	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	2	f
2951	First Missionary Baptist Church	37721 N. 100th Street East		Sun Villiage	CA	93543	(661)944-4128	34.567739633360276	-117.9521479867271	http://www.livingstonecathedral.org/index.php					1100	1300	Wed4th	1100	1300																			\N	COVID Updates: Verified that food service is still proceeding.	2019-12-01 00:00:00-08	\N	2020-05-23 14:38:56.442627-07	108	\N	\N			f			info@livingstonecathedral.org			https://www.facebook.com/LivingStoneCathedral/					\N	\N	110		2020-05-23 21:38:56.442627	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
3173	Trinity Evangelical Lutheran Church	997 East Walnut Street		Pasadena	CA	91106	(626) 792-1212	34.14962450323131	-118.13001465015293	https://www.trinitypasadena.org/					1200	1400																						\N		2019-12-01 00:00:00-08	\N	2020-05-30 20:38:46.17986-07	108	\N	\N	LA County Regional Food Bank eligibility requirements—signature attesting that provided address is correct		f			trinityelca@att.net	Toiletries, can openers, feminine hygiene products, tee shirts, face masks, and sometimes diapers		https://www.facebook.com/Trinity-Lutheran-Church-106185109741744/	https://twitter.com/PasadenaTrinity			Trinity Lutheran Church is a member of the Evangelical Lutheran Church in America (ELCA). Founded over 100 years ago, our community welcomes everyone to join with us as we do God's work with our hands. Our Mission is to glorify God, share God's love, welcome all people, and serve the world.	\N	\N	110		2020-05-30 16:18:38	\N		\N	2019-12-01 08:00:00		Jen James	707-478-0517	jenmjames@gmail.com	Sharon M. Ruff Richter	(626) 792-1212	pastorsrichter@gmail.com	f	f	f	t	Accept donations on Saturdays from 10am-11am or by appointment by calling or emailing and asking for the pastor.			Accept donations from the public of travel-sized toiletries, canned meat, tuna, peanut butter, soups, and beans, and healthy non-sugary cereals. Also accept fresh home-grown produce and fruits (citrus, avocadoes, etc.) if provided in sufficient quantity.			Fresh, frozen, and canned foods	English, Mandarin, German, and sometimes Spanish (depends on who is on duty)	t	t	t	t	t	t	2	f
3004	Iglesia Bautista Renacer	10000 Sepulveda Blvd		Mission Hills	CA	91345	(855) 736-2237	34.25208943297362	-118.46730772295035	https://www.renacerlatino.org/?fbclid=IwAR3veMny9XDH4hDkInX_i4X4a_mDgI00cASYyeauBVFnmS3h2rpsG9eH9Fs					1600	1700																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 11:10:54.574786-07	108	\N	\N		4/25/2020: Online search shows a completely different address and phone number. The (818)277-9982 is not in service. Called new phone number (855) 736-2237 but went to voicemail. Spanish-speaking organization.	f						https://www.facebook.com/renaceragape/					\N	\N	110		2020-05-23 18:10:54.574786	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
3019	Imperial Church of Christ	11316 S. San Pedro Street		Los Angeles	CA	90061	(323)756-0360	33.9315622	-118.2691607						0700	0830																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3134	St. Athanasius & St. Paul Church	840 Echo Park Avenue		Los Angeles	CA	90026	 213-482-2040	34.073319667493834	-118.25947519802072	https://saintala.org/community/					0800	1030																						\N	Pantry is in church parking lot off Laguna (dead-end street). Arrive early and bring your own bags or carts. There are many regular customers here and some people start lining up at 4 or 5 am on Friday. Other than fresh veggie/fruit box (one per person/family), there is no (reasonable) limit on what you can select until the food runs out.	2019-12-01 00:00:00-08	\N	2020-05-30 11:27:11.620212-07	108	2020-05-28 19:22:09-07	110	None at this time (during COVID).	On the Church's website, Francisco Torerro is listed at the Food Pantry contact with a phone number of 213/908-8827. As of this verification date (5/28/20), he was in Panama and unable to return to the US due to the COVID virus restricting travel.	f	Episcopal Diocese of Los Angeles		caroleyoung@gmail.com	No, unless a one-time donation comes in that week	No					Weekly food pantry in Church parking lot with perishable and non-perishable food items.	2020-05-30 18:27:10.95	108	110		2020-05-23 15:12:47	\N		\N	2019-12-01 08:00:00		 The Very Rev. Canon Frank M. Alton, Provost 	 (213) 482-2040 ext 201	falton@ladiocese.org	Carole Young	213-909-3391	caroleyoung@gmail.com	f	t	t	t	Most deliveries come on Thurs. mornings for gleaning/assembly.	They have one large freezer and one fridge for the Pantry. During COVID, they also have access to a kitchen upstairs on the church premises if needed.	6-ft. distancing required while waiting in line and no ID or proof of nearby address required at this time.	Donations usually arrive from LA Regional Food Bank and Seeds of Hope on Thursday mornings. These donations are supplemented by pickups at stores like Sam's Club.		Previously, distribution was limited to those from within the six zip codes surrounding the area.	Varies each week, but usually includes fresh vegetable and fruit boxes, bread and baked goods, sometimes chicken, lunch meats, eggs and frozen vegetables.	English, Spanish, Cantonese, Vietnamese	t	t	t	t	t	t	4	f
2897	Christian Association for Social Services	5814 Venice Boulevard		Los Angeles	CA	90019	323-936-9481	34.041704386606376	-118.36629775921872	http://www.cassla.org					1000	1300	Fri3rd	1000	1300	Sat1st	1000	1300	Sat3rd	1000	1300													\N		2019-12-01 00:00:00-08	\N	2020-05-23 14:16:48.116693-07	108	\N	\N		Voicemail confirmed the location and operating hours. Instructed to not leave a message and to call back during these hours of operation.	f			contact@cassla.org								\N	\N	110		2020-05-23 21:16:48.116693	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
4089	Central Spanish S.D.A. Church	1366 S. Alvarado Street		Los Angeles	CA	90006	 213-381-1905	34.045735904235755	-118.28364581444411	http://eadventist.org/en/search?org=ANPPDG																												\N	Due to COVID: Senior citizens (60yrs+) are eligible to receive additional resources provided by the government every Wednesday. Items vary weekly, must provide government I.D.	2020-03-29 18:39:28-07	\N	2020-05-25 17:19:27.408923-07	108	\N	\N	Food distributions are every Wednesday and Friday on a first-come, first-serve  basis 	5/4/20 - spoke directly with Madrian A. Verified and updated current information \n5/11/20 - best source of contact is by telephone only. No email 	f										offers canned goods and fresh vegetables every Wednesday and Friday	\N	\N	110		2020-05-26 00:19:27.408923	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	2	f
4184	The Way Out Ministries	22427 Norwalk Boulevard		Hawaiian Gardens	CA	90716	(562) 429-2397	33.824556	-118.07192649544102	http://thewayout.org/																												\N	All programs, worship services and volunteer opportunities of The Way Out Ministries and of The Gathering Church must close until further notice. However, the resource center remains open for unemployment applications, food, shelter referrals, general information, counseling services, and other emergency needs by appointment only. People may call 562-429-2397 and leave a short message with their name, number, and the nature of their need and we will return the call for an appointment ASAP. Free church app available at The App Store by searching gatheringconnect	2020-03-29 18:39:28-07	\N	2020-05-30 08:54:58.086268-07	108	\N	\N		Meals and Food Pantry	f										The Way Out Ministries is devoted to Jesus Christ and His calling to serve the people of the inner-city and urban America.\n	2020-05-30 15:54:57.665	108	110	Meals and Food Pantry	2020-05-26 00:14:46	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	f	f	f	4	t
4417	Altadena Food Pantry	943 E. Altadena Drive		Altadena	CA	91001	(626) 798-1185	33.94	-118.52	http://altadenaucc.org/helpingothers.htm																												\N	COVID: no events until the end of March\nMessages will not be checked daily\n\n@Altadenaucc on Instagram\n\nAltadenaucc@gmail.com to get on email list for updates. 	2020-03-29 18:39:28-07	\N	2020-05-25 16:08:10.329371-07	108	\N	\N		A highly valued ministry for our congregation is the Altadena Congregations Together Serving (ACTS) Food Pantry. Housed at the back of our church, the Food Pantry was started by ACC and three other Altadena congregations when we discovered that many of the local food programs are closed on the weekend. Volunteers buy the food, pack the bags, and hand them out Saturday mornings. They also prepare special holiday bags for Thanksgiving, Christmas, and Easter. We welcome people to buy and donate food from our latest needs list, or you can participate by donating money for the shopping.	f			altadenaucc@gmail.com			@Altadenaucc				This food pantry is operated by several local (Altadena) churches and located at the Altadena Community Church. There is a 'set' weekly menu with recipes for each week. Intended for those locally of need.	\N	\N	110		2020-05-25 23:08:10.329371	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	2	f
4382	The Beloved Church Of God In Christ	7529 S. Main Street		Los Angeles	CA	90003	(323) 758-7081	33.970959	-118.274166																													\N		2020-03-29 18:39:28-07	\N	2020-05-30 10:59:26.471277-07	108	\N	\N		Meals and Food Pantry	f						https://www.facebook.com/pages/Beloved-Church-of-God-In-Christ/111341538900290					\N	\N	110	Meals and Food Pantry	2020-05-25 18:22:23	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	f	f	f	t	f	2	f
3041	Living Truth Christian Fellowship	5873 S. Normandie Avenue		Los Angeles	CA	90044	(323)290-3909	33.9877081	-118.3002282						1130	1330	Tue4th	1130	1330																			\N		2019-12-01 00:00:00-08	\N	2020-05-30 11:32:17.029832-07	108	\N	\N		The message on (323)290-3909 said, "the person you have dialed can't take your call right now." I left messages on 5.27 and 5.29 and never got a call returned. I also spoke with April at Living Truth Christian Fellowship @ 1009 Arsenal Way in Corona (951-735-2856) and she said their church has no association with this one on S. Normandie. Per Google Satellite, the address is for "Good Stuff Thrift Store" and it's noted as "temporarily closed."	t											2020-05-30 18:32:14.661	108	110		2020-05-23 20:15:13	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	4	f
2705	Epworth Community Garden	1419 W 65th Place		Los Angeles	CA	90047		33.98062804	-118.3007416	https://www.facebook.com/pages/Epworth-Community-Garden/246001935564389																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2704	Enrique Noguera Educational Garden	6614 Fountain Avenue		Los Angeles	CA	90038		34.09435535	-118.3337145	https://www.facebook.com/pages/Enrique-Noguera-Gardens/213260882100604																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2703	Emerson Avenue Community Garden	6550 W 80th Street		Westchester	CA	90045		33.96923397	-118.4047634	http://www.eacgc.org/																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
4215	Mercy Warehouse	27632 El Lazo		Laguna Niguel	CA	92677	(949) 910-0024	33.56229772	-117.7097029																													\N	Boxed food distributed Mondays at 4pm and Wednesdays or Fridays at 12:00 noon\n	2020-03-29 18:39:28-07	\N	2020-05-26 16:42:55.888559-07	108	\N	\N			f			info@mercywarehouse.com	Have furniture during non-COVID 19 conditions.							\N	\N	110	Food Pantry	2020-05-26 23:42:55.888559	\N		\N	2020-03-30 01:39:28								f	f	f	f			COVID Updates: Open during COVID-19 (essential business) as of March 30, 2020					English	t	t	t	t	t	t	2	f
3167	The Great Vision Church	4465 W. Melrose Avenue		Los Angeles	CA	90029	(213)675-8291	34.0838228	-118.2975894						0700	0800	Sat3rd	0700	0800																			\N		2019-12-01 00:00:00-08	\N	2020-05-23 10:49:14.663542-07	108	\N	\N			f											\N	\N	110		2020-05-23 17:49:14.663542	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
3044	Loaves & Fishes-Van Nuys	14640 Keswick		Van Nuys	CA	91405	(818)997-0943	34.2100101	-118.4523896						1000	130	Wed	1000	1330	Fri	1000	1330																\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	t	t	t	f	f	f	1	f
2719	Messiah Organic Community Garden	7300 West Manchester Avenue		Los Angeles	CA	90045		33.95969308	-118.4225489																													\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
4127	Covenant Church 	1649 Yosemite Drive		Los Angeles	CA	90041	323-257-6434	33.94	-118.52	http://www.eaglerockcovenantchurch.org																												\N	*04/04/2020 Was sent to voicemail: Weren't available, but call back (did not disclose hours or days open)	2020-03-29 18:39:28-07	\N	2020-05-25 16:49:15.141529-07	108	\N	\N		Meals	f											\N	\N	\N	Meals	\N	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	f	f	f	f	f	f	1	f
3166	The Bible Tabernacle (Venice)	1761 Washington Way		Venice	CA	90291	(310)821-6116	33.9879884	-118.4626862						0900	1200	Tue	0900	1200	Fri	0900	1200																\N		2019-12-01 00:00:00-08	\N	2020-05-23 20:13:21.832867-07	108	2020-05-11 12:52:36-07	106			f											\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	f	t	t	1	f
3053	Lynwood United Methodist Church	4207 Carlin Avenue		Lynwood	CA	90262	(310)638-5163	33.91172605721596	-118.19682856090954	http://lynwoodunitedmethodistchurch.com					0900	1200																						\N		2019-12-01 00:00:00-08	\N	2020-05-26 10:12:15.660585-07	108	\N	\N		05/26/20: Email sent to verify hours\n	f			Lynwoodumc@sbcglobal.net			https://www.facebook.com/pages/Lynwood-United-Methodist-Church/117818224911136					\N	\N	110		2020-05-25 20:14:07	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	2	f
3127	Shields for Families (Ark Program)	11705 Deputy Yamamoto Place		Lynwood	CA	90262	(323)242-5000 or (323) 357-6930	33.926832000000005	-118.229328	https://www.shieldsforfamilies.org					1000	1400																						\N		2019-12-01 00:00:00-08	\N	2020-05-25 16:27:37.802275-07	108	\N	\N		\n05/06/2020: no answer, call back\n\n(323) 357-6930--> is the number to directly get to the Ark program\n(323)242-5000--> is the number to get to the general Shield program	f			pcoffin@shieldsforfamilies.org			https://www.facebook.com/shieldsforfamilies					\N	\N	110		2020-05-25 23:27:37.802275	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
2883	Celestial Church of Christ - Ebenezery Parish	8803-8807 S. Broadway Street		Los Angeles	CA	90003	(323)752-4400	33.957126	-118.27824745103568	http://www.cccebenezeryparish.com/394766088					1100	1330																						\N		2019-12-01 00:00:00-08	\N	2020-05-25 16:08:09.940177-07	108	\N	\N			f			e.arkofcovenantparish@yahoo.com	Food , Personal Care Items		https://www.facebook.com/login.php?skip_api_login=1&api_key=966242223397117&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php%3Fu%3Dhttp%253A%252F%252Fwww.cccebenezeryparish.com%252F394766088&cancel_url=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Fclose_window%2F%3Fapp_id%3D966242223397117%26connect%3D0%23_%3D_&display=popup&locale=en_US	https://twitter.com/intent/tweet?related=simplesite&url=http%3A%2F%2Fwww.cccebenezeryparish.com%2F394766088&original_referer=https%3A%2F%2Ftwitter.com%2Fshare%3Furl%3Dhttp%253A%252F%252Fwww.cccebenezeryparish.com%252F394766088%26related%3Dsimplesite			"Project Feed the NEEDY"	\N	\N	110		2020-05-25 23:08:09.940177	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	2	f
4031	Mount Of Olives Christian Church	1101 Artesia Boulevard		Long Beach	CA	90805	(562) 756-6439	33.87468445824904	-118.179198																													\N		2020-03-29 18:39:28-07	\N	2020-05-30 11:05:48.111993-07	108	2020-05-26 10:25:21-07	110			f			mamancra@gmail.com			https://www.facebook.com/pages/Mount-of-Olives-Christian-Church/115867921768068					\N	\N	110	Meals and Food Pantry	2020-05-30 18:05:47.684	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	2	f
2697	Arleta Community Garden	8800 Canterbury Avenue		San Fernando Valley	CA	91331		34.22961903	-118.4245122																													\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
4004	City of Norwalk - Senior Nutrition Lunch Program	11929 Alondra Bl.		Norwalk	CA	90650	562 929-5544	33.88778702000002	-118.07933348333331	https://www.norwalk.org/city-hall/departments/social-services/social-services-center																												\N		2019-12-20 10:30:55-08	108	\N	\N	\N	\N			f	City of Norwalk - Social Services Center			Menu varies - check web site for monthly menu						Daily Luncheon Program, Suggested Donation $2.00 for seniors at least 60 years old. If meals are available after seniors are served, those under 60 will be served for a suggested donation of $5.	\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4238	South Gate S.D.A. Church	3231 Minnesota Avenue		Lynwood	CA	90262	951.318.4420	33.94433655816823	-118.21445839716661																													\N	COVID update: Food distribution resource will be shut down until the end of April as a result of the Coronavirus Pandemic\n\nThe organization provides both perishable and nonperishable foods 	2020-03-29 18:39:28-07	\N	2020-05-30 08:30:15.369444-07	108	\N	\N	N/a 	04/15/2020: Liason information--> Name: Clara, Phone number:(562)256-0231 Email: claratapia61@gmail.copm\n- food is distributed to the public \n\nLiason also stated that they also provide financial assistance --> but only Small petition's 	f				Sometimes provide baby food, diapers, and donated clothing 							2020-05-30 15:30:14.968	108	110		2020-05-25 23:27:13	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	f	t	t	4	t
3131	Spanish American S.D.A. Church	1815 E. Bridge Street		Los Angeles	CA	90033	(323)222-7063	34.051615	-118.215201						1800	1930																						\N		2019-12-01 00:00:00-08	\N	2020-05-26 12:09:32.310302-07	108	\N	\N			f											\N	\N	110		2020-05-26 19:09:32.310302	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	f	f	f	f	f	f	2	f
2722	Ocean View Farms	3300 S Centinela Avenue		Mar Vista	CA	90066		34.01472864	-118.4419305	https://www.oceanviewfarms.net/																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2735	Mansfield Fountain Community Garden	1259 N Mansfield Avenue		Los Angeles	CA	90038		34.09361321	-118.3405019	https://www.facebook.com/Mansfield-Fountain-Community-Garden-Hollywood-CA-1062186980476336/																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2734	Wattles Farm	1714 N Curson Avenue		Los Angeles	CA	90046	(323) 663-7441	34.10199105	-118.3550116	http://www.wattlesfarm.com/																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2728	Sepulveda Garden Center	16633 Magnolia Boulevard		Encino	CA	91436	(818) 784-5180	34.1649565	-118.4955004	http://www.laparks.org/horticulture/sepulveda-garden-center																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2727	San Pedro Gardens	1400 N Gaffey Street		San Pedro	CA	90731		33.73126012	-118.2923468																													\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2720	Milagro Allegro Community Garden	115 S Avenue 56		Los Angeles	CA	90042	323-256-7122	34.08733119	-118.3206354	https://communitygarden.org/find-a-garden/gardens/milagro-allegro-community-garden/																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2718	Mar Vista Community Garden	5075 S Slauson Avenue		Culver City	CA	90230	310-915-1123	33.9934872	-118.4068559	https://www.oceanviewfarms.net/location.php																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2713	Holy Nativity Community Garden	6700 W 83rd Street		Westchester	CA	90045	(310) 670-4777	33.96343338	-118.4064699	http://www.holynativityparish.org/the-community-garden-at-holy-nativity/																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2712	Greater Watts Community Garden	660 E 118th Place		Los Angeles	CA	90059		33.92644283	-118.2629993																													\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2707	Fountain Community Gardens	5620 Fountain Avenue		Los Angeles	CA	90028	(323) 387-3241	34.09474231	-118.3117822	https://www.yelp.com/biz/fountain-community-garden-los-angeles																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2706	Erika J. Glazer Community Garden	2632 Raymond Avenue		Los Angeles	CA	90007		34.03170032	-118.298016	http://www.lanlt.org/parks-and-gardens.php#erika																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
2701	El Sereno Community Garden	5466 Huntington Drive		Los Angeles	CA	90032		34.09249662	-118.1616233	https://communitygarden.org/find-a-garden/gardens/el-sereno-community-garden/																												\N		2019-12-01 00:00:00-08	\N	2020-05-13 09:11:21-07	106	2020-05-11 12:52:36-07	106			f											\N	\N	106		2020-05-13 09:11:21	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	3	f
4361	Hope of the Valley Rescue Mission - Help Center	6425 Tyrone Avenue		Van Nuys	CA	91401	818-804-5507	34.18719408964742	-118.44437378963002	https://www.jfsla.org/SOVA																												\N	COVID Updates: Open only on Tuesdays due to COVID-19 restrictions.\n	2020-03-29 18:39:28-07	\N	2020-05-23 20:55:17.438155-07	108	\N	\N		FOOD DONATIONS: Phone number: 818-392-0020\nCall went to voice mail. Verified address and hours. Phone number: 818-392-0020 is the number for one of the offices, but not the help center. They gave me the number for the help center and I was able to verify the hours of the help center. 	f	N/A									Provide food service to the homeless at this help center.	\N	\N	110	Meals	2020-05-24 03:55:17.438155	\N		\N	2020-03-30 01:39:28						818-392-0020		f	f	f	f								English	t	t	t	t	t	t	2	f
4228	Anne Douglas Center Of The Los Angeles Mission 	303 E 6th st.		Los Angeles	CA	90013	213-629-1227 x347	34.04347173775279	-118.24703193089546	http://www.losangelesmission.org																												\N	COVID update: In full operation\nBilingual - Spanish\nMeals are available M-Sa at 5:30 am, 12:30 pm, and 6 pm. 	2020-03-29 18:39:28-07	\N	2020-05-25 17:17:05.774782-07	108	\N	\N	None	Food Donations: Call from 8-4:30, Mon-Fri 213-629-1227 x323, can speak to an administrator.\nMeals are available M-Sa at 5:30 am, 12:30 pm, and 6 pm. 	f			info@lamission.net		Emergency Food Program: Bring your rent receipt and ID, Tues - Fri						\N	\N	110	Meals	2020-05-26 00:17:05.774782	\N		\N	2020-03-30 01:39:28								f	f	f	f								English\nSpanish	t	t	t	t	t	t	2	f
4061	Drew Child Development Corporation 2	1770 E. 118th Street		Los Angeles	CA	90059	(323) 249-2950	33.925329000000005	-118.2410505	https://drewcdc.org/																												\N	Effective Friday, March 16, 2020, all Drew CDC Early Education Centers are closed until April 19, 2020 or until further notice due to COVID-19. We will update this information when it becomes available. Thank you for your patients and understanding.	2020-03-29 18:39:28-07	\N	2020-05-30 08:52:58.05662-07	108	\N	\N	Must  be Low Income in order to apply. Drew CDC will provide meals to our families enrolled in the Early Education program, upon request.Please call during regular business hours to speeak with someone about applying. PLEASE  NOTE: Our offices will be closed until further notice. Thank You	Center will let us know when they re-open if we they don't hear from us first when that time comes.	f	Drew Child Development Corporation			N/A 	Early childhood education ,Assistance with Child Care costs, Mental Health Services,	https://www.facebook.com/drewcdc/ 					2020-05-30 15:52:57.692	108	110		2020-05-25 23:27:13	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	f	4	t
3074	Our Lady Queen of Angels Catholic Church	535 N. Main Street		Los Angeles	CA	90012	(213)629-3101	34.05707	-118.239577						0800	1100																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 13:36:31.04886-07	108	\N	\N			f										ldkfjdlfkj	2020-05-23 20:36:30.908	108	110		2020-05-23 15:56:26	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	4	t
4285	Calvary Chapel Emanuel	438 E. Katella Avenue  #M		Orange	CA	92867	(714) 516-9227	33.808707	-117.8490015																													\N		2020-03-29 18:39:28-07	\N	2020-05-24 19:04:25.230522-07	108	\N	\N		Food Pantry	f											\N	\N	110	Food Pantry	2020-05-25 02:04:25.230522	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
2956	First United Methodist Church of La Puente	15701 E. Hill Street		La Puente	CA	91744	(626)336-1927	34.02614062810881	-117.95053399417162						1000	1230																						\N		2019-12-01 00:00:00-08	\N	2020-05-30 11:38:32.688649-07	108	\N	\N		5/30 - on FB see recent post: FREE FOOD DRIVE THRU10AM PLEASE SHARE	f						https://www.facebook.com/pages/First-United-Methodist-Church-of-La-Puente/109521375750649					\N	\N	110		2020-05-23 15:12:47	\N		\N	2019-12-01 08:00:00					Rexanne Jasko	626-502-5745		f	f	f	f								English	t	f	t	f	t	t	2	f
2983	Guadalupe Food Program	4018 E. Hammel Street		Los Angeles	CA	90063	(323)261-8051	34.0421266	-118.1794177	http://www.olghammel.org					0700	0900	Wed4th	0700	0900																			\N		2019-12-01 00:00:00-08	\N	2020-05-23 10:13:26.382709-07	108	\N	\N			f			OLGhammel@aol.com								\N	\N	110		2020-05-23 17:13:26.382709	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
3025	Islamic Center of Southern CA-Hope Net	434 S. Vermont Boulevard		Los Angeles	CA	90020	(213)382-9200	34.0664143	-118.291309						1100	1200																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 10:15:10.977651-07	108	\N	\N			f											\N	\N	110		2020-05-23 17:15:10.977651	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
3014	Iglesia Un Renuevo	13216 Fairford Avenue		Norwalk	CA	90650	(562)743-4611	33.910965000000004	-118.094562	www.iglesiaunrenuevo.org					1500	2000																						\N	COVID UPDATES\n\nCurrently, they offer drive-through service only, with cars entering one way and exiting another.\n\nThey provide both perishable and non-perishable food provided by the LA Food Bank until it is all distributed.\n\n\n	2019-12-01 00:00:00-08	\N	2020-05-30 10:42:55.790571-07	108	2020-05-30 09:33:35-07	110	N/A	Contact is Lourdes Batris, inglesiaunrenuevo@yahoo.com, (562)743-4611.\nShe and her team are usually on-site to begin prep at 2 or 3 pm on the third Friday and sometimes remain a little after 8 pm, pending whether or not they have any food remaining for distribution.\n\nThey do not accept individual contributions of food, but would gladly accept large contributions of plastic bags for food distribution, paper products, cleaning supplies, etc. if provided by a known organization.\n\nNo volunteers are needed at this time.\n\ntheir website is not active	f			inglesiaunrenuevo@yahoo.com	N/A	N/A						2020-05-30 17:42:55.643	108	110		2020-05-23 18:10:56	\N		\N	2019-12-01 08:00:00					Lourdes Batris	(562)743-4611	inglesiaunrenuevo@yahoo.com	f	f	f	t							can foods, fruits, water	English, Spanish	t	t	t	t	t	t	4	f
3071	Our Lady of Guadalupe Church	4509 Mercury Avenue		Los Angeles	CA	90032	(323)225-4201	34.0861589	-118.1901472						0800	0900																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 14:01:47.063461-07	108	\N	\N			f											\N	\N	110		2020-05-23 21:01:47.063461	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
4423	St. Bernard's Food Pantry/Parish	9647 Beach Street		Bellflower	CA	90706	(562) 867-2337	33.877728	-118.1270655																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3045	Los Angeles Boys & Girls Club	2635 Pasadena Avenue		Los Angeles	CA	90031	(323)221-9111	34.077894243695475	-118.21529185293416	https://www.labgc.org/					1700	1800																						\N	Please observe social distancing regulations – 6ft apart \nCOMING SOON- Delivery for a limited number of Seniors and people with disabilities	2019-12-01 00:00:00-08	\N	2020-05-26 12:08:49.034755-07	108	\N	\N	Please call 323-221-9111 for an appointment\nCalls accepted between 12:00 noon-5:00pm THURSDAYS		f			info@labgc.org								\N	\N	110		2020-05-26 19:08:49.034755	\N		\N	2019-12-01 08:00:00								f	f	f	f							GRAB & GO MEALS GROCERIES	English	t	t	t	t	t	t	2	f
3140	St. Francis Center	1835 S. Hope Street		Los Angeles	CA	90015	(213)747-5347	34.0339876	-118.2697209	https://www.stfranciscenterla.org/contact-us/					1100	1230	Wed	1100	1230	Thu	1100	1230	Sat	1100	1230													\N		2019-12-01 00:00:00-08	\N	2020-05-19 19:22:40.998227-07	108	\N	\N			f											\N	\N	110		2020-05-20 02:22:40.998227	\N		\N	\N								f	f	f	f								English, Spanish	t	t	t	t	t	t	2	f
4339	Watts Labor Community Action Committee 	10950 S. Central Ave.		Los Angeles	CA	90059	323-563-5639	34.04256376573959	-118.24500851053158	http://www.wlcac.org/																												\N	5.9.2020 From the WLCAC website:\n"WLCAC's program sites are open with adjusted operations until further notice.\nIn compliance with recommendations from the CDC, city, county and state officials, the majority of our staff are working from home and our program operations have changed to maximize social distancing.\nUntil further notice, we have postponed all upcoming events with the exception of emergency giveaways of food and essential supplies.\nTo be notified of upcoming emergency supply giveaways please send your email address to wlcac09@gmail.com. \nPlease do not hesitate to contact us with questions during regular business hours at 323.563.5639."	2020-03-29 18:39:28-07	\N	2020-05-25 17:17:05.999379-07	108	\N	\N	Call in advance to confirm food supplies are still being distributed for the scheduled time	Meals \nGot to voicemail of Luis Garcia\n\n5.9.2020:  emailed organization to confirm info.\n\nRemoved the website that was originally listed as it was to a different organization: worldharvestla.org\n\nRemoved this phone number and address and updated to one from website: (213) 689-2121\n\nAddress was for the Weingart Center:  566 S. San Pedro Street.I updated the address from the listing\n\n	f			wlcac09@gmail.com	fresh produce	homeless services, senior services, employment services, youth & family services, restoration services,	@WLCAC	@WLCAC				\N	\N	110	Meals	2020-05-26 00:17:05.999379	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	2	f
4087	Fountain of Life Church	13518 Biola Avenue		La Mirada	CA	90638	(562) 941-4610	33.90909402	-118.0194487																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4064	Calvary Chapel Downey	12808 Woodruff Avenue		Downey	CA	90242	(562) 803-5631	33.9157184	-118.1166543																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3142	St. Gertrudes Conference	7025 Garfield Avenue		Bell Gardens	CA	90201	(562)927-4495	33.9678794	-118.1506637						1100	1300	Fri4th	1100	1300																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4357	St. Gregory's Episcopal Church	6201 E. Willow Street		Long Beach	CA	90815	(562) 420-1311	33.803748	-118.110573																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4343	Veterans Administration	5901 E. 7th Street	Bldg 133	Long Beach	CA	90822	(562) 826-8000	33.77536793	-118.1199537																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry (Veterans\nOnly)	f											\N	\N	\N	Food Pantry (Veterans\nOnly)	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3141	St. George Church	15721 Cornuta Avenue		Bellflower	CA	90706	(562)862-0273	33.8906177	-118.1198573						1600	1800	Thu4th	1600	1800																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4138	Marian Outreach Center c/o St. Lucy Church	1721 W. 23rd Street		Long Beach	CA	90810	(562) 989-1954	33.79900195	-118.2157768																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4186	Harbor Baptist Church	2300 W. Wardlow Road		Long Beach	CA	90810	(562) 427-8046	33.82423153	-118.222614																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4359	Cityline Church	6236 Woodruff Avenue		Lakewood	CA	90713	(562) 925-0251	33.86847967	-118.1172027																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4163	API Forward Movement	2001 W. Olympic Boulevard		Los Angeles	CA	90006	(213) 553-1800	34.051419	-118.278774																													\N		2020-03-29 18:39:28-07	\N	2020-05-26 12:09:32.515799-07	108	\N	\N	Must be a client	Must be a client - how does one become a client?	f										Han Ma Um Senior Services Inc\nAdult day care center	\N	\N	110	Meals Provided (Must be\na client)	2020-05-26 19:09:32.515799	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	f	f	f	f	f	f	2	f
2998	Holy Trinity Church of God in Christ	9706 S. Broadway Boulevard		Los Angeles	CA	90003	(323)777-2965	33.9481075	-118.2778577						1200	1400																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	f	f	f	f	f	f	1	f
2924	Dos Testamentos En El Desierto	9845 E Palmdale Boulevard		Palmdale	CA	93591	(661)433-1186	34.5803299	-117.952611						1930	2030	Sat	0815	1030	Sat	1930	2030	Sun	1030	1200													\N		2019-12-01 00:00:00-08	\N	2020-05-19 21:31:13.186915-07	108	\N	\N			f											\N	\N	110		2020-05-20 04:31:13.186915	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
2997	Holy Family Giving Bank	1524 Fremont Avenue		South Pasadena	CA	91030	(626)403-6140	34.1080192	-118.1527363						0900	1045																						\N		2019-12-01 00:00:00-08	\N	2020-05-30 08:44:40.213423-07	108	\N	\N			f											\N	\N	110		2020-05-30 15:44:40.213423	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
4168	Wilshire Ave Community Church	212 E. Wilshire Avenue		Fullerton	CA	92832	(714) 526-2265	33.87236368	-117.9212828																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4102	Holy Redeemer Lutheran Church	14515 Blaine Avenue		Bellflower	CA	90706	(562) 867-0714	33.900696	-118.126499																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3169	Tongan Community Service Center	13030 Inglewood Avenue	Suite 104	Hawthorne	CA	90249	(310)679-9099	33.9137357	-118.3608819						0700	1000	Tue3rd	0700	1000																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4388	Recovery Cafe San Jose	80 S. 5th Street		San Jose	CA	95112	(408) 294-2963	37.33687993	-121.8853454																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals Provided	f											\N	\N	\N	Meals Provided	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4035	Mi Ministerio a la Luz de la Palabra	111 N. Long Beach Boulevard		Compton	CA	90221	310.365.2277	33.896411869361025	-118.20805546118336																													\N		2020-03-29 18:39:28-07	\N	2020-05-26 10:15:27.052836-07	108	\N	\N		05/26/2020: Called, but no answer	f											\N	\N	110		2020-05-25 20:27:15	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	f	t	f	t	f	2	f
3064	New Jerusalem C.O.G.I.C.	420 S. Sante Fe Avenue		Compton	CA	90221	(310)639-1013	33.89299710323741	-118.21593756448756	https://new-jerusalem-church-of-god-in-christ-ca.hub.biz/?fbclid=IwAR1YERiRxBaMCsbOYaZDVL5xCoWpbJqAzoBXXAPe9MUgq4vSrsPuUq5ij_Y					1000	1130	Fri3rd	1000	1130																			\N		2019-12-01 00:00:00-08	\N	2020-05-30 08:54:16.262227-07	108	\N	\N		05/06/2020: no answer, call back [operator asked to enter "remote access code"]	f						https://www.facebook.com/pages/New-Jerusalem-Church-of-God-In-Christ/134354833284171					2020-05-30 15:54:15.826	108	110		2020-05-25 23:27:14	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	f	t	f	4	t
4213	Proclaim International Ministries	2732 E. Alondra Boulevard		Compton	CA	90221	(310) 763-5003	33.888692979155266	-118.19395131358809																													\N		2020-03-29 18:39:28-07	\N	2020-05-30 09:47:08.786462-07	108	\N	\N		Food Pantry\n05/06/2020: No Answer, the phone appears to be disconnected on out of service	t											2020-05-30 16:47:08.617	108	110	Food Pantry	2020-05-25 23:27:15	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	f	4	f
4052	Los Angeles LGBT Center	1220 N. Highland Avenue		Los Angeles	CA	90038	323-993-7400	33.94	-118.52	https://lalgbtcenter.org																												\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals	f											\N	\N	\N	Meals	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4104	Friendly Center	147 W Rose Avenue		Orange	CA	92867	(714) 771-5300	33.79697695	-117.8535467																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4234	Salvation Army Glendale Corps	320 W. Windsor Road		Glendale	CA	91204	(818) 246-5586	34.13662218	-118.2587517																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3109	Salvation Army Southeast Comm. Corp	2965 E. Gage Avenue		Huntington Park	CA	90255	(323)587-4221	33.9814284	-118.2165004						1300	1500																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3017	Immaculate Heart of Mary-Hope Net	4954 Santa Monica Boulevard		Los Angeles	CA	90029	(323)660-0034	34.0905787	-118.2976765	https://ihmc-la.org					1100	1200																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 19:35:07.386326-07	108	\N	\N		5/11/20 - INACTIVE. This location no longer participates as a food pantry. Confirmed via telephone with receptionist 	t			m.martinez@la-archdiocese.org			https://www.facebook.com/Immaculate-Heart-of-Mary-Church-Los-Angeles-135898288102/					2020-05-24 02:35:07.222	108	110		2020-05-23 15:56:18	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	4	f
4252	Food Pantry LAX	355 E. Beach Avenue		Inglewood	CA	90302	(310) 677-5597	33.969105	-118.350135																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
2978	Grace Presbyterian Church	1500 N. Avenue 53		Los Angeles	CA	90042	(818)957-8090	34.1213022	-118.1999599						0930	1030	Fri4th	0930	1030																			\N		2019-12-01 00:00:00-08	\N	2020-05-23 19:14:37.166616-07	108	\N	\N			t											2020-05-24 02:14:37.02	108	110		2020-05-23 15:56:19	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	t	4	f
4321	St. Irenaeus H.O.P.E. (Helping Other People Everyday)	5201 Evergreen Avenue		Cypress	CA	90630	(714) 826-0760	33.82931701	-118.0443036																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
2909	Cornerstone Christian Ministry	11449 Sproule Avenue		Pacoima	CA	91331	(818) 993-2988	34.2782812	-118.4067452						0900	1000																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 19:44:01.904984-07	108	\N	\N		(818) 302-6448 from yellow pages online, mapquest and the west hills neighborhood council website. update 4.25.2020:  both numbers are  not in service.	t											2020-05-24 02:44:01.724	108	110		2020-05-23 15:56:24	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	4	f
4091	St. Gregory the Great Church	13935 Telegraph Road		Whittier	CA	90604	562.777.2475 or (562) 941-0115	33.932435	-118.03455	https://sggcatholic.org																												\N	COVID: Pantry Closed\nBilingual Spanish	2020-03-29 18:39:28-07	\N	2020-05-23 19:21:40.486184-07	108	\N	\N		(562) 941-0115 on their website, doesn't answer\n562.777.2475 no answer\n4/14/20 I emailed them\nNo FB presences	f			della@sggcatholic.org								2020-05-24 02:21:40.346	108	110		2020-05-23 15:56:31	\N		\N	2020-03-30 01:39:28								f	f	f	f			COVID update:  Closed temporarily					English\nSpanish	t	t	t	t	t	f	4	t
2988	Heavenly Vision Church of God in Christ	849 W. 85th Street		Los Angeles	CA	90044	(323)245-2651	33.9614457	-118.288536	hvcla.com					1200	1400																						\N	perishable and nonperishable 	2019-12-01 00:00:00-08	\N	2020-05-23 19:27:19.630902-07	108	\N	\N	sign (name and address and # of ppl in home) affirmation that you are eligible to receive. over 18.	email is for general website	f				clothing (a few - 4th)							2020-05-24 02:27:19.503	108	110		2020-05-23 15:56:29	\N		\N	2019-12-01 08:00:00					Rev. Lee	(323)245-2651		f	f	f	f								English	t	t	t	t	t	f	4	t
4295	Faith In Christ Ministries	4501 S. Western Ave.		Los Angeles	CA	90062	(323) 291-9636	34.002603	-118.308958																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4317	University Student Union-CSULA	5154 State University Drive		Los Angeles	CA	90032	(323) 343-2450	34.06226508	-118.1715319																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry (CSULA	f											\N	\N	\N	Food Pantry (CSULA	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4267	Parkcrest Christian Church	3936 Woodruff Avenue		Long Beach	CA	90808	(562) 421-9374	33.829974	-118.1161035																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4323	Weingart Senior Center	5220 Oliva Avenue		Lakewood	CA	90712	(562) 630-6141	33.85218968	-118.1447263																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry\n(Seniors Only)	f											\N	\N	\N	Meals and Food Pantry\n(Seniors Only)	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4044	Freedom Assembly	11520 Mona Boulevard		Los Angeles	CA	90059	(310) 836-2399	33.92996802154305	-118.23053464900096																													\N		2020-03-29 18:39:28-07	\N	2020-05-23 19:38:01.780851-07	108	\N	\N		05/06/2020: Went to voicemail (no information was provided, just said to call back at another time)	f											\N	\N	\N	Food Pantry	\N	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	f	t	f	1	f
2904	City of Maywood - Mobile Food Pantry	4319 E. Slauson Avenue		Maywood	CA	90270	(323) 562-5705	33.9878263	-118.1891261	https://www.cityofmaywood.com/food-bank					1300	1500																						\N	Food will be distributed until gone. Also have a Senior Food Distribution Program at same location (listed separately, since eligibiity, location and schedule are different).	2019-12-01 00:00:00-08	\N	\N	\N	\N	\N	No eligibility requirements - do not need to be a resident of Maywood. Numbers are distributed at 9AM.		f					Mobile Food Pantry.						\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
2877	Catholic Charities of Los Angeles, Inc. - Long Beach Community Services Center	123 East 14th Street		Long Beach	CA	90813	(213) 251-3432	33.7840547	-118.1916668	http://catholiccharitiesla.org/where-we-are/program-directory-by-city/					0930	1500	Thu	0930	1500																			\N	As of 4/3 per website:\no By appointment only; limited to two people in lobby at one time\no Food pantry is open	2019-12-01 00:00:00-08	\N	2020-05-23 12:03:23.14292-07	108	\N	\N		4/18 Vicky Illk\n(213) 251-3432 - Open M-F 9-5 - left voicemail\n(562) 591-1641 - this number is disconnected\nNo email, no FB	f	Catholic Charities of Los Angeles, Inc									Offers basic assistance with food, shelter, utilities, clothing and transportation; information and linkages to community resources; specialized programs providing rental assistance to homeless families; and a CalFresh application site.	\N	\N	110		2020-05-23 19:03:23.14292	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
2881	Catholic Charities - San Juan Diego Center	4171 Tyler Avenue		El Monte	CA	91731	(626)575-7652	34.0827886	-118.031897						0900	1300	Tue	0900	1300	Wed	0900	1300	Thu	0900	1300	Fri	0900	1300										\N	As of 4/3 per website:\n Food Pantry Open from 9-noon Monday through Friday\n o CSBG Rental and Utility Assistance via phone only; please call Martha Lopez at\n626-575-7652\no CalFresh Application via phone only: please call Martha Lopez or Nancy Alcala\nat 626-575-7652	2019-12-01 00:00:00-08	\N	2020-05-23 12:03:23.431465-07	108	\N	\N		4/18 Vicky Illk\n\n(626)575-7652 - Left voicemail\nOpen M-F 9-12pm for food per voice mail\nNo email, no FB\n\n4/27 V. Illk\nVerified by Xochitl by email\nXHernandez@ccharities.org	f	Catholic Charities									The agency provides emergency food, holiday assistance and utility bill assistance for people in the San Gabriel Valley, including people who are homeless or undocumented.	\N	\N	110		2020-05-23 19:03:23.431465	\N		\N	\N								f	f	f	f								English	t	t	t	f	t	t	2	f
2935	Eliza Shanks Homes, Inc.	13055 Weidner Street		Pacoima	CA	91331	(818) 335-1233	34.2772191	-118.4173919						0900	1700																						\N	Update 4/25\nThey are temporarily suspending food services 	2019-12-01 00:00:00-08	\N	2020-05-23 20:57:35.719736-07	108	\N	\N		4/25 V. Illk\n(818)896-9304 no answer\n(818) 335-1233 Yes, answer - they are suspending the food services for now\n	f											2020-05-24 03:57:35.573	108	110		2020-05-24 03:56:22	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	4	t
3152	St. Mark Missionary Baptist	5017 Compton Avenue		Los Angeles	CA	90011	(323)231-1040	33.9970846	-118.2481042						0800	1000																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 13:54:01.036403-07	108	\N	\N			f											\N	\N	110		2020-05-23 20:54:01.036403	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
3089	Principe de Paz	6706 Vinevale Avenue		Bell	CA	90201	(323)560-3780	33.97426	-118.1809218						1100	1300	Thu4th	1100	1300																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4201	New Generations	2426 Santa Fe Avenue		Long Beach	CA	90810	(562) 570-4434	33.801381	-118.215351																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4078	Adonai SDA Church	13246 Mapledale Street		Norwalk	CA	90650	562.480.8181	33.89873447374363	-118.048428																													\N	Due to COVID-19, they are closed until further notice. \n	2020-03-29 18:39:28-07	\N	2020-05-23 20:56:55.889767-07	108	\N	\N			f											2020-05-24 03:56:55.79	108	110		2020-05-24 03:56:22	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	f	t	f	4	t
4090	Children's Hunger Fund	13931 Balboa Boulevard		Sylmar	CA	91342	(818) 979-7100	34.32374987	-118.491372																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4335	Interfaith Community Services	550 W. Washington Avenue		Escondido	CA	92025	(760) 489-6380	33.125166	-117.09198																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals Provided	f											\N	\N	\N	Meals Provided	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3003	Hurting & Hungry	8107 Loyola Boulevard		Los Angeles	CA	90045	213-268-3082	33.9643479	-118.416965	www.scls-sc.org					1000	1200																						\N	COVID Notes: They are giving away bags of groceries at Rita Walters Learning Complex 915 W. Manchester Ave. 90044.  Call this number for more details 323-638-0346.	2019-12-01 00:00:00-08	\N	2020-05-23 20:55:16.882081-07	108	\N	\N	Photo ID + Proof of Income (Pay Stub, Unemployment Award Letter, Income Benefits Statement)	FOOD DONATIONS: Pastor William Smart, (213) 268-4820 \nThey are in urgent need of food. Sent text to Jabari and Pearson.	f	Southern Christian Leadership Conference		info@SCLC-SC.org			@hurtingandhungry					\N	\N	110		2020-05-24 03:55:16.882081	\N		\N	2019-12-01 08:00:00					Pastor William Smart	(213) 268-4820		f	f	f	f				Urgent need				English	t	t	t	t	t	t	2	f
2989	Helping Hands, Caring Hearts Ministry	480 West Monterey Avenue		Pomona	CA	91769	(626) 426-3356	34.06014900000001	-117.756513	https://www.hhchpomona.org					1630	1730																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 20:55:19.085896-07	108	\N	\N		Always seeking more sturdy paper plates, plastic or paper cups, plastic utensils (mostly forks), large foil serving trays, and napkins\n\nBrandon-6264263356\nThis phone number is not confirmed but I do know that the number on their website is outdated.	f			hhchpomona@gmail.com							Helping Hands is a food pantry and meal program that serves men, women, and children experiencing homelessness. 	\N	\N	110		2020-05-24 03:55:19.085896	\N		\N	2019-12-01 08:00:00					 Brandon	626-426-3356		f	f	f	f								English	t	t	t	t	t	t	2	f
4128	Good Shepherd Center (Main Offices) 	1650 Rockwood Street		Los Angeles	CA	90026	213-235-1460	33.94	-118.52	http://gschomeless.org																												\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals	f											\N	\N	\N	Meals	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4070	St. Cecilia's Christian Service	1301 Sycamore Avenue		Tustin	CA	92780	(714) 544-3250	33.72669392	-117.8258718																													\N		2020-03-29 18:39:28-07	\N	2020-05-25 07:37:11.059438-07	108	\N	\N		Food Pantry	f											\N	\N	110	Food Pantry	2020-05-25 14:37:11.059438	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
4219	Church Of Christ	287 W. Wilson Street		Costa Mesa	CA	92627	(949) 645-3191	33.65621048	-117.911331																													\N		2020-03-29 18:39:28-07	\N	2020-05-25 07:37:12.467921-07	108	\N	\N		Meals and Food Pantry	f											\N	\N	110	Meals and Food Pantry	2020-05-25 14:37:12.467921	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
4315	Help Me Help You / Stevenson Elementary School	515 Lime Avenue		Long Beach	CA	90802	(562) 612-5001	33.76672	-118.1924																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4287	Beacon For Him	439 W. Anaheim Street		Long Beach	CA	90813	(562) 591-2299	33.78262746	-118.197342																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4345	Salvation Army The Way In Drop-In Shelter for Youth	5939 Hollywood Boulevard		Los Angeles	CA	90028	323-469-2946	33.94	-118.52																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals	f											\N	\N	\N	Meals	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3200	Zion Hill Baptist Church	7860 10th Avenue		Los Angeles	CA	90043	(323)753-4610	33.9678904	-118.3280831						1000	1200	Tue3rd	1000	1200																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4258	We Care Of Los Alamitos	3788 Cerritos Avenue		Los Alamitos	CA	90720	(562) 598-9790	33.81033548	-118.0663785																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry (Must call\nfor appt)	f											\N	\N	\N	Food Pantry (Must call\nfor appt)	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4265	I Own It Today	3935 E. 10th Street		Long Beach	CA	90804	(562) 438-1800	33.77900453	-118.14624																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4190	St. Vincent de Paul of Los Angeles	231 Winston Street		Los Angeles	CA	90013	213-229-9971	33.94	-118.52	https://svdpla.org																												\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals	f											\N	\N	\N	Meals	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4302	St. Cyprian's	4714 Clark Avenue		Long Beach	CA	90808	(562) 421-9487	33.8435259	-118.1337531																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals Provided	f											\N	\N	\N	Meals Provided	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4205	Community's Child	25520 Woodward Avenue		Lomita	CA	90717	(310) 534-4040	33.79178035	-118.3186286																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4266	AIDS Food Store Of Long Beach	3935 E. 10th Street		Long Beach	CA	90804	(562) 434-3425	33.77900453	-118.14624																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry\n(must register)	f											\N	\N	\N	Meals and Food Pantry\n(must register)	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4282	Broken Loaf Food Pantry @ Lakewood First United Methodist	4300 Bellflower Boulevard		Lakewood	CA	90713	(562) 425-1219	33.836346	-118.124766																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4314	Christian Outreach in Action	515 E. 3rd Street		Long Beach	CA	90802	(562) 432-1440	33.77053452	-118.186047																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4021	St. Mary Medical Center CARE Program	1045 Atlantic Avenue	Suite 1016	Long Beach	CA	90813	(562) 624-4996	33.780258	-118.1853945																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4360	The Power Of The Potter's Christian Center	627 S. Pacific Avenue		San Pedro	CA	90731	(310) 957-2994	33.73821	-118.287949																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4208	Atherton Baptist Church	2627 W. 116th Street		Hawthorne	CA	90250	(323) 757-3113	33.92883047	-118.3222845																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4209	Children's Network International	26516 Ruether Avenue	#308	Santa Clarita	CA	91350	(323) 980-9870	34.41619552	-118.4995189																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4027	Valley Park Church 	10950 S. Central Avenue		Los Angeles	CA	90059	323-563-5639	33.93558	-118.25418247316672	http://www.westvalleyfoodpantry.org																												\N	This location also has a meals on wheels service every M-F, 8:00 am - 2 pm. Go to the website for more information, http://www.wlcac.org or call 323-749-5389.	2020-03-29 18:39:28-07	\N	2020-05-25 16:27:37.613158-07	108	\N	\N		\nthe Organization is at the same location as Watts Labor Community Action	f	Watts Labor Community Action Committee		admin@westvalleyfoodpantry.org		mandated parenting, anger management, domestic violence, individual and group counseling, homeless referral, job training, free tax rep, utility bill assistance, integration services, after school program, college enrollment assistance, LA USD divergent assistance						\N	\N	110		2020-05-25 23:27:37.613158	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	2	f
4341	St. Angela Merici	585 S. Walnut Avenue		Brea	CA	92821	(714) 529-6776	33.91204451	-117.9041812																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4427	Angeltree Operation Stitches			Long Beach	CA		(310) 946-4399	33.76672	-118.1924																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4210	Jacob's Well Christian Center	26640 Sherman Road		Sun City	CA	92585	(951) 313-6496	33.73360798	-117.1803668																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4174	Official No One Left Behind	2151 E. 1st Street		Santa Ana	CA	92705	(714) 856-7602	33.74576046	-117.8362395																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4136	Westside Food Bank	1710 22nd Street		Santa Monica	CA	90404	(310) 828-6016	34.02561448	-118.4730161																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4160	St. Lawrence Martyr Church	1940 S. Prospect Avenue		Redondo Beach	CA	90277	(310) 540-0329	33.8176497	-118.3768527																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4074	Toberman Neighborhood Center	131 N. Grand Avenue		San Pedro	CA	90731	(310) 832-1145	33.743862	-118.2901675																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4130	Hosanna Christian Fellowship/Lifeguard Relief Agency	16523 Bellflower Boulevard		Bellflower	CA	90706	(562) 925-5093	33.88439409	-118.1253591																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4221	San Francisco Solano Church Food Bank	29873 Comercio		Rancho Santa Margarita	CA	92688	(949) 589-7767	33.63383368	-117.606165																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4411	Sabil Al-Ihssan	907 S. Beach Boulevard		Anaheim	CA	92804	(714) 589-2613	33.818787	-117.9934175																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4410	Cypress Senior Citizen Center	9031 Grindlay Street		Cypress	CA	90630	(714) 229-6677	33.83042635	-118.0413937																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry\n(Seniors Only)	f											\N	\N	\N	Meals and Food Pantry\n(Seniors Only)	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4322	Calvary Chapel Cypress	5202 Lincoln Avenue		Cypress	CA	90630	(714) 493-9272	33.8316215	-118.0423824																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4433	Long Beach Community Table			Long Beach	CA		(562) 548-0774	33.76672	-118.1924																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4200	Christian Fellowship Foursquare Church	2421 W 48th Street		Los Angeles	CA	90043	(323) 292-9091	34.00004056	-118.3199502																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4167	St. Robert's Community Services Center	211 3rd Avenue		Venice	CA	90291	310-392-8701	33.94	-118.52																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals	f											\N	\N	\N	Meals	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4403	Our Redeemer Lutheran Church	8520 Winnetka Avenue		Winnetka	CA	91306	818-341-1629	33.94	-118.52																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals	f											\N	\N	\N	Meals	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3996	Stillman Sawyer Family Service Center - Salvation Army	820 Lomita Boulevard		Harbor City	CA	90710	310 835-1986	33.797385	-118.289619	http://www.torrancecorps.org/help.html																												\N	Provides supplemental food on a short-term bais to local residents in need. Clients are welcome once/month for a non-perishable food box and once/week for a perishable food box.	2019-12-06 19:50:00-08	108	\N	\N	\N	\N	Proof of Residency in Torrance, Lomita, Carson, Harbor City or Wilmington.	This is the only Salvation Army Food Pantry for these cities.	f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4179	Ministerios Cristianos Faro De Luz	2202 Center Street		Huntington Park	CA	90255	(323) 587-3082	33.96576972	-118.2323238																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4135	Guadalupe Homeless Project - Men's Shelter 	171 South Gless Street		Los Angeles	CA	90033	323-881-0032	33.94	-118.52	https://www.proyectopastoral.org																												\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals	f											\N	\N	\N	Meals	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4180	Helping Hands Pantry	2205 S Artesia Street		San Bernardino	CA	92408	(909) 796-4222	34.06140159	-117.2720047																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3102	S.A. Pearblossom United Methodist	34143 126th Street East		Pearblossom	CA	93553	(661)839-6123	34.505958	-117.905785						0900	1100																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3181	Valley Crossroads S.D.A. Church	11350 Glenoaks Boulevard		Pacoima	CA	91331	(818)896-4488	34.2771851	-118.4148709	https://valleycrossroadsca.adventistchurch.org/					1430	1600	Sat4th	1430	1600																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N		Unable to contact them by phone. But the regional foodbank la (https://www.lafoodbank.org/find-food/pantry-locator/) has them listed as providing food pantry 2nd & 4th Sat 2pm to 3:30 pm. There's an email of the pastor. Yet to email him	f			valleycrossroads.sda@gmail.com								\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3076	Palmdale Community Foundation-S.A.V.E.S.	1002 East Avenue 	Q12	Palmdale	CA	93550	(661)267-5191	34.5755254	-118.1114457						0800	1700	Tue	0800	1700	Wed	0800	1700	Thu	0800	1700													\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3103	S.A. Penney Lynn Wind	8300 Pearblossom Highway		Littlerock	CA	93543	(661)944-6100	34.5208321	-117.9811848						1200	1400																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4017	Family Assistance Ministries	1030 Calle Negocio		San Clemente	CA	92673	(949) 492-8477	33.4541471	-117.6017359																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4311	Corona Settlement House	507 S. Vicentia Avenue		Corona	CA	92882	(951) 737-3504	33.87733078	-117.5750986																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3165	The Bible Tabernacle	16301 Sierra Highway		Santa Clarita	CA	91351	(661)252-5087	34.4534526	-118.4252723						1230	1700	Mon	0900	1700	Tue	0900	1700	Wed	0900	1700	Thu	0900	1700	Fri	0900	1700	Sat	0900	1700				\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4298	Morningstar Christian Church	4518 San Bernardino Street		Montclair	CA	91763	(909) 625-0729	34.0778548	-117.7064288																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4154	Mission Of Hope	18842 Teller Avenue		Irvine	CA	92612	(949) 387-9445	33.66910053	-117.8541375																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4395	Salvation Army Santa Ana	818 E. 3rd Street		Santa Ana	CA	92701	(714) 542-9576	33.74710014	-117.8597127																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals Provided	f											\N	\N	\N	Meals Provided	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4162	St. Joachim c/o St. Vincent De Paul	1964 Orange Avenue		Costa Mesa	CA	92627	(949) 574-7400	33.642351	-117.9104985																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3156	St. Peter and Paul Poverty Program	943 Lagoon Avenue		Wilmington	CA	90744	(310)952-0144	33.7823374	-118.267995						0900	1100	Tue	0900	1100	Thu	0900	1100																\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4408	Friendly Center	900 S. Melrose Street		Placentia	CA	92870	(714) 769-8660	33.86091113	-117.8743636																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4155	Lighthouse Outreach Ministries	1885 Anaheim Avenue		Costa Mesa	CA	92627	(949) 548-7161	33.642765	-117.923733																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals Provided	f											\N	\N	\N	Meals Provided	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4156	Family Support Network	1894 N. Main Street		Orange	CA	92865	(714) 447-3301	33.81892139	-117.8673842																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3122	Santa Clarita Valley Food Pantry	24133 Railroad Avenue		Newhall	CA	91321	(661)255-9078	34.3765012	-118.5252054						0900	1200																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3121	San Pedro Temple Corps	138 S. Bandini Street		San Pedro	CA	90731	(310)832-7228	33.7426596	-118.2986098						0900	1200	Fri	1400	1500																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4145	CLC Worship Center	17601 Lassen Street		Northridge	CA	91325	(323) 229-9731	34.25036646	-118.5179625																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4212	Orange Coast College Foundation	2701 Fairview Road		Costa Mesa	CA	92626	(714) 432-6892	33.669846	-117.91332																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry (OCC\nStudents Only)	f											\N	\N	\N	Food Pantry (OCC\nStudents Only)	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4122	Annie Mae Tripp Southwest Community Center	1601 W. 2nd Street		Santa Ana	CA	92703	(714) 547-4073	33.7464	-117.8901585																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4057	St. Andrew's Church	1231 E. Chapman Avenue		Fullerton	CA	92831	(714) 870-4350	33.87413476	-117.9051929																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals Provided	f											\N	\N	\N	Meals Provided	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3118	San Gabriel Mission	428 South Mission Drive		San Gabriel	CA	91776	(626)457-3035	34.0971693	-118.1074142						0800	1000																						\N		2019-12-01 00:00:00-08	\N	2020-05-30 11:27:37.811433-07	108	\N	\N			f											\N	\N	110		2020-05-30 18:27:37.811433	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
4173	First Lutheran Church Fullerton	215 N. Lemon Street		Fullerton	CA	92832	(714) 871-7820	33.8715836	-117.9198786																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3095	Resting Place Church	10803 Cantara Street		Sun Valley	CA	91352	(818)588-1024	34.219583	-118.365132						1000	1300																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4063	Garden Grove 7th Day Adventist Church	12702 9th Street		Garden Grove	CA	92840	(714) 534-4376	33.77835372	-117.9322586																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4059	Lutheran Social Services	12432 9th Street		Garden Grove	CA	92840	(714) 534-6450	33.78195255	-117.9323433																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3184	Village Covenant	5607 N. Barranca Avenue		Azusa	CA	91702	(626)335-4013	34.11485	-117.8821589						0900	1500																						\N		2019-12-01 00:00:00-08	\N	2020-05-30 12:15:36.131634-07	108	\N	\N			f											\N	\N	110		2020-05-30 19:15:36.131634	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
4354	Pathways Of Hope	611 S. Ford Avenue		Fullerton	CA	92832	(714) 680-3691	33.86485879	-117.9299099																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4033	HOPE (Helping Others Prepare for Eternity)	11022 Acacia Parkway	#C	Garden Grove	CA	92840	(714) 539-4357	33.77591441	-117.9406633																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3187	Wesley United Methodist Church	112 West 52nd Street		Los Angeles	CA	90037	(323)298-0727	33.9953651	-118.2743249						1030	1200																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4182	His Raft	2209 E. Main Street		Stockton	CA	95205	(209) 460-1044	37.955466	-121.2589575																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4193	Ventura County Rescue Mission	234 E. 6th Street		Oxnard	CA	93030	(805) 487-1234	34.195779	-119.175471																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals Provided	f											\N	\N	\N	Meals Provided	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4253	Word International Ministries- Eagle Rock	3571 Eagle Rock Boulevard		Los Angeles	CA	90065	323.344.2337	34.117284	-118.234993																													\N		2020-03-29 18:39:28-07	\N	2020-05-30 15:00:07.415123-07	108	\N	\N			f											\N	\N	110		2020-05-30 17:53:18	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	f	f	f	f	f	f	2	f
4080	Christ Cathedral Community Outreach	13280 Chapman Avenue		Garden Grove	CA	92840	(714) 971-2141	33.78883054	-117.900873																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4047	First Presbyterian Church of Garden Grove	11832 Euclid Street		Garden Grove	CA	92840	(714) 534-2269	33.7909606	-117.9411337																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4023	St. Columban c/o St. Vincent de Paul	10801 Stanford Avenue		Garden Grove	CA	92840	(714) 539-9133	33.7778479	-117.9443355																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4249	Vista Community Clinic-The Gary Center	341 Hillcrest Street		La Habra	CA	90631	(562) 691-3263	33.92890643	-117.9532317																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4161	Calvary Chapel Beachside	19400 Beach Boulevard	Unit 26	Huntington Beach	CA	92648	(714) 465-3000	33.68070568	-117.9885434																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4105	Christ Second Baptist Church	1471 Martin Luther King Jr. Avenue		Long Beach	CA	90813	(562) 599-3421	33.78453149	-118.1807005																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3172	Trinity Baptist Church L.A.	2040 W. Jefferson Boulevard		Los Angeles	CA	90018	(323)735-0044	34.0251148	-118.3161						0930	1045																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3137	St. Cecilia Catholic Church	4230 S. Normandie Avenue		Los Angeles	CA	90037	((32)) 2-6628	34.0059447	-118.2998211						0900	1030																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3155	St. Paul's Methodist Church - Project: NEEDS	2600 Nelson Avenue		Redondo Beach	CA	90278	(310)370-4319	33.8745269	-118.3641598						0900	1100	Thu3rd	0900	1100																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3114	Salvation Army- South L.A.	7651 South Central Avenue		Los Angeles	CA	90001	(323)586-0759	33.9698411	-118.2567313						1100	1300																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3149	St. Lawrence of Brindisi	10122 Compton Avenue		Los Angeles	CA	90002	(323)567-1439	33.9443922	-118.2459688						0700	0830	Thu	0700	0830																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3136	St. Catherine Laboure Catholic	3846 Redondo Beach Boulevard		Torrance	CA	90504	(310)329-0993	33.8781235	-118.3402114						1100	1300																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3151	St. Margaret's Center	10217 Inglewood Avenue		Lennox	CA	90304	(310)672-2208	33.9429599	-118.3618262						0900	1600	Wed	0900	1600	Fri	0900	1600																\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3112	Salvation Army- Lancaster Corp	44517 Sierra Highway		Lancaster	CA	93534	(661)948-3418	34.6914947	-118.1362728						1200	1600	Wed	0900	1030																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3145	St. John Coptic Orthodox	21329 E. Cienega Avenue		Covina	CA	91724	(562)691-0299	34.103353	-117.838035						1700	1900	Thu4th	1700	1900																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3139	St. Ferdinand Church	1109 Coronel Street		San Fernando	CA	91340	(818)365-3194	34.2818972	-118.4436663						0900	1100	Fri4th	0900	1100																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4176	ICNA Relief USA	2180 W. Crescent Avenue	Suite B	Anaheim	CA	92801	(714) 399-4571	33.839487	-117.9580905																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4204	St. Margaret Mary Roman Catholic Church	25511 Eshelman Avenue		Lomita	CA	90717	(310) 326-3364	33.791769	-118.3146095																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3101	S.A. Mountain View Mobile	3255 E. Avenue R		Palmdale	CA	93550	(661)947-4700	34.5732114	-118.0702161						1200	1400																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3195	WSFB- St. Augustine SAVES	3820 Jasmine Avenue		Culver City	CA	90232	(310)838-2702	34.0212852	-118.4007884						0900	1145	Wed	0900	1145	Fri	0900	1145																\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3182	Vermont Avenue Baptist Church	23325 S. Vermont Avenue		Torrance	CA	90502	(310)530-0533	33.8134945	-118.2910208						1000	1300																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N		Unable to contact them by phone. They don't seem to have a website either. However, LA Food bank (https://www.lafoodbank.org/find-food/pantry-locator/) has them listed as a food pantry at the hours listed above.	f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3082	People for Community Improvement	13008 South Figueroa		Los Angeles	CA	90061	(310)538-4013	33.913935	-118.282263						1100	1330	Fri4th	1100	1500																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3077	Palmdale Foursquare Church	38325 10th Street East		Palmdale	CA	93550	(661)947-2938	34.5784049	-118.1120551						1000	1200																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3078	Palmdale S.D.A. Church	1758 E. Avenue R		Palmdale	CA	93550	(661)947-8496	34.5722471	-118.0963705						1000	1200	Wed3rd	1000	1200																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3108	Salvation Army Santa Clarita Valley Corps	22935 Lyons Avenue		Newhall	CA	91321	(661)799-7486	34.3805004	-118.5341693						0900	1500	Wed	0900	1500	Thu	0900	1500	Fri	0900	1500													\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3090	Project 2911, A Community Development Corporation	418 N. Second Avenue		Covina	CA	91723	(626)373-2976	34.0897447	-117.8874932						1400	1730	Wed	1400	1600	Thu	1400	1730	Fri	1400	1600													\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3083	Pico Rivera Iglesia Crece	14832 Valley Boulevard		La Puente	CA	91744	(562)895-4587	34.0317917	-117.970394						0830	1030																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3091	RCCG Victory House of California	6640 Van Nuys Boulevard		Van Nuys	CA	91411	(323)385-4442	34.191872	-118.4483031						1230	1400	Tue	1030	1230																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4148	Beach Cities Interfaith Services	18131 Gothard Street		Huntington Beach	CA	92648	(714) 375-6400	33.69918321	-117.9999281																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3197	St. Joseph's Center	204 Hampton Drive		Venice	CA	90291	(310)396-6468	33.9979527	-118.4779718						1000	1200	Tue	1300	1500	Wed	1000	1200	Thu	1000	1200	Fri	1300	1500										\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3084	Pilgrim's Hope Baptist Church	7016 S. Compton Avenue		Los Angeles	CA	90001	(323)581-7672	33.9759009	-118.2473905						0900	1100																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3196	St. Gerard's Social Services	4439 Inglewood Boulevard		Los Angeles	CA	90066	(310)390-5034	33.9952899	-118.4191511						0900	1200	Tue	1300	1500	Thu	1300	1500																\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3040	Living Springs Foursquare Church - St. Vincent de Paul Society of Palmdale	17134 E. Avenue O		Palmdale	CA	93591	(661)264-1717	34.616048	-117.824428						0800	1000	Wed3rd	0800	1000	Wed4th	0800	1000																\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3050	Loveship Community Outreach	836 E. Avenue I		Lancaster	CA	93535	(661)729-4106	34.7039815	-118.1135045						1430	1630																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3020	Inglewood Church of Christ	323 S. Eucalyptus Avenue		Inglewood	CA	90301	(310)674-7690	33.9595172	-118.3598898						1000	1200																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3051	Lutheran Social Services of Southern California	21430 Strathern Street		Canoga Park	CA	91304	(818)901-9480	34.214903	-118.5986508						1000	1445	Wed	1000	1445	Thu	1000	1445	Fri	1000	1445													\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3042	Loaves & Fishes-Canoga Park	21600 Hart Street		Canoga Park	CA	91303	(818)340-2050	34.1973704	-118.6002723						0900	1200	Wed	0900	1200	Fri	0900	1200																\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4055	Garden Grove Friends Church	12211 Magnolia Street		Garden Grove	CA	92841	(714) 539-7735	33.785163	-117.976581																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3180	Vallejo Drive S.D.A. Church	311-B Vallejo Drive		Glendale	CA	91206	(818)409-8056	34.1507659	-118.2285903						1200	1500																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4398	Giving Children Hope	8332 Commonwealth Avenue		Buena Park	CA	90621	(714) 523-4454	33.86986265	-117.9877114																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4432	HOPE Inc			Gardena	CA	90249	(310) 357-4563	33.90193	-118.31599																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4309	Eagle Rock Lutheran Church	5032 N. Maywood Avenue		Los Angeles	CA	90041	323.255.4622	34.137041	-118.211589																													\N		2020-03-29 18:39:28-07	\N	2020-05-30 14:59:16.470233-07	108	\N	\N			f											\N	\N	110		2020-05-30 17:00:51	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	f	f	f	f	f	f	2	f
2982	Greater New Unity Baptist Church	9719 S. Avalon Boulevard		Los Angeles	CA	90003	(323)757-5094	33.9476946	-118.2655116	http://www.greaternewunity.net					0830	1000																						\N		2019-12-01 00:00:00-08	\N	2020-05-23 19:28:28.104809-07	108	\N	\N		Response from fb msg: "Good Morning. Thank you for reaching out. At this time due to the Covid 19 we have decided to shutdown our food distribution. If I hear of any other details someone will give you a call. Thank you for reaching out"	f			gnubc@att.net			https://m.facebook.com/GreaterNewUnityBC/					2020-05-24 02:28:27.457	108	110		2020-05-23 15:56:28	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	t	t	f	4	t
3063	New Covenant Tabernacle of Antelope Valley	38626 9th Street East		Palmdale	CA	93550	(661)965-4588	34.585386	-118.114029						0900	1200	Sat4th	0900	1200																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3123	Servants Arms Community Based Organization	1720 N. Walnut Avenue		La Puente	CA	91744	(626)918-3227	34.018972	-117.95118						1500	1800	Thu	1500	1800																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
2939	Evergreen Baptist Church of San Gabriel Valley	323 Workman Mill Road		La Puente	CA	91746	(626)363-0300	34.0435729	-117.9991561						1200	1500	Fri3rd	1200	1500																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4051	ASI-Beach Pantry at CSULB	1212 N. Bellflower Boulevard		Long Beach	CA	90815	(562) 985-4834	33.781743	-118.1209185	https://www.asicsulb.org/corporate/discover/beach-pantry																												\N	Hours of the pantry\nFall/Spring\nMonday - Friday: 10AM - 2PM & 5 - 7PM\nSaturday: 10AM - 2PM\n\nWinter\nMonday & Wednesday: 10 AM - 2 PM	2020-03-29 18:39:28-07	\N	2020-05-23 19:33:04.964963-07	108	\N	\N	CSULB Students Only - "For access to the food pantry program, students must be currently enrolled and come prepared to present a CSULB ID. Students can use the ASI Beach Pantry three times a week and receive no more than five items* per visit."		f			asi-studentunion@csulb.edu								2020-05-24 02:33:04.783	108	110	Food Pantry (CSULB\nStudents Only)	2020-05-23 15:56:31	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	t	t	t	4	t
4386	Jewish Family Service of Los Angeles: JFS Hope North (Formerly Haven House) 	7843 Lankershim Blvd		North Hollywood	CA	91605	(818) 982-4091	34.213356000000005	-118.38780797657091	http://lafh.org																												\N		2020-03-29 18:39:28-07	\N	2020-05-25 16:11:01.040061-07	108	\N	\N		Meals	f											\N	\N	\N	Meals	\N	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	t	t	t	f	t	f	1	f
4392	St. Polycarp	8100 Chapman Avenue		Stanton	CA	90680	(714) 890-5203	33.78836182	-117.9907364																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
2967	Foothill Unity Center	415 W. Chestnut Avenue	91 N. Oak Ave Pasadena, CA 91107	Monrovia	CA	91016	626-358-3486	34.14254822012215	-118.008134219401	https://foothillunitycenter.org/					1300	1530	Wed	0900	1130	Fri	0900	1130																\N	COVID Updates: Still providing essential services during COVID-19 through drive and walk through delivery. Monrovia Food Distribution:  Mon 1pm-330pm and Wed and Friday: 9-11:30  \nPasedena:: Tues 9am to 11am  and Wed and Friday 1pm to 3:30 pm, Pasedena.  Other social services are available by phoneemail or appointment.\n\nFamily Food Program:   The Family Food Program is designed for individuals and families who have access to a kitchen or other food preparation/storage area. Each month, seniors, singles and families* receive enough food to supplement their nutritional needs for about ten days (a balanced mix of canned, dry, frozen, refrigerated food, bread, bakery, dairy products, and fresh produce and USDA must-haves). Families then return to one of our centers once a week for additional, perishable foods. Food is distributed at both the Pasadena and main Monrovia locations. If you are in need of help, please contact the center or call us at 626-358-3486 to find out how to participate.\n\nBag Lunch Program:  Within the San Gabriel Valley, there are many homeless people without access to appropriate food preparation or storage facilities. Our Monrovia site distributes substantial bag lunches three times a week, providing enough food to last for about two days. These lunches, made up of sandwiches, instant soups, snack foods, fresh fruit, drinks, flip-top canned foods, canned meats and sweets, are given to people and families who are homeless or have no place to store or cook food. We also provide toiletry items weekly as available to help with hygiene needs.\n\nHomebound Grocery Delivery:  With the help of volunteer and part-time drivers, Foothill Unity Center makes it a point to reach shut-ins, such as homebound seniors and disabled persons, by delivering groceries to their homes once a month. 	2019-12-01 00:00:00-08	\N	2020-05-25 16:45:52.764049-07	108	\N	\N	To be eligible, clients must live within our 11-city service area (Altadena, Arcadia, Azusa, Baldwin Park, Bradbury, Duarte, Irwindale, Monrovia, Pasadena, Sierra Madre, South Pasadena and Temple City), and have an income at or below 150% of the national poverty level.	There is a Pasedena location and Monrovia location.  Wasn't sure how to present this on the site.  Check out the public notes for the hours for both locations.  The Website is very detailed and up to date- included Covid updates  I called  626-358-3486  just to confirm all is up to date on the site, but got a voice message that the office is closed.  I sent an email tot info@foothillunitycenter.org to just verify that the site it up to date.  	f	Community Action Organization 		info@foothillunitycenter.org	 Pet Food Bank	Support and Crisis Services, Health Services, Back to School Distribution, Thanksgiving Dirstribution, Holiday Distribution, Pet Food Bank	https://www.facebook.com/FoothillUnityCenter/	https://twitter.com/foothill_unity			Foothill Unity Center is committed to providing the San Gabriel Valley with a multi-service approach to the problem of poverty. They serve clients in three key ways: food, case management/crisis help, and access to health care resources.  At Foothill Unity Center, all services are free to those who are eligible.	\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	f	f	t	t	f	1	f
3154	St. Mary's Place	7215 Newlin Avenue		Whittier	CA	90602	(562)698-0107	33.9768912	-118.0412114						0900	1200	Tue	0900	1200	Wed	0900	1200	Sat3rd	1200	1400													\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3056	Metropolitan Community Churchof L.A.-Hope Net	4607 Prospect Avenue		Los Angeles	CA	90027	(323)669-3436	34.102074	-118.2897866						0900	1100																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3057	Mexican-American Opportunity Foundation	401 N. Garfield Avenue		Montebello	CA	90640	(323)890-9600	34.0192364	-118.1337064						0730	1200																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4028	Watts Labor Community Action Committee (Meals on Wheels Program)	10950 S. Central Avenue		Los Angeles	CA	90059	(323)749-5389	33.93558	-118.25418247316672	http://www.wlcac.org																												\N	COVID: no changes\nHot Meals provided\nThis location also has a food pantry open 8:30 am - 5:30 pm *hours may have changed due to COVID. Go to their website, www.westvalleyfoodpantry.org.\n\n	2020-03-29 18:39:28-07	\N	2020-05-25 17:32:25.928019-07	108	\N	\N	Recipients for the meal program specifically must be at least 60 years of age and live in the Greater Los Angeles Area	(323)749-5389 is the number for the meals on wheels program specifically, but (323) 357-6271 is the number for the general WLCAC office\n\n	f	Watts Labor Community Action Committee 		wlcac09@gmail.com		programs on transportation, lawyers, in house support services, Re-entry, employments	https://www.facebook.com/WLCAC/					\N	\N	110	Meals	2020-05-26 00:32:25.928019	\N		\N	2020-03-30 01:39:28						kjhgk		f	f	f	f	kjhgk			mkhk				English	t	t	t	t	t	t	2	f
2992	Full Gospel Community Church Of God & Christ	5014 S. Avalon Boulevard		Los Angeles	CA	90011	(323)232-7256	33.9970819	-118.2650011						0930	1130																						\N		2019-12-01 00:00:00-08	\N	2020-05-30 18:41:44.907621-07	108	\N	\N			f											\N	\N	\N		\N	\N		\N	2019-12-01 08:00:00								f	f	f	f								English	t	t	t	f	t	t	1	f
3062	My Friends House	3533 W. 58th Place		Los Angeles	CA	90043	(323)292-4939	33.988368	-118.334148						0900	1100																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
2872	Blood of Jesus Prayer and Deliverance Ministry	11001 S. Broadway		Los Angeles	CA	90061	(323)752-3048	33.935441	-118.278724						1500	1600																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4369	South County Outreach	7 Whatney	Ste B	Irvine	CA	92618	(949) 380-8144	33.63683792	-117.7203908																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4380	Lutheran Social Services	7400 Tujunga Avenue		North Hollywood	CA	91605	(818) 901-9480	34.20488973	-118.3789716																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3138	St. Charles Service Center	10825 Moorpark Street		North Hollywood	CA	91602	(818)985-7365	34.1503878	-118.3663839						0900	1145	Wed	0900	1145	Thu	0900	1145	Sat	0900	1145													\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3115	Salvation Army- Whittier Corp.	7926 Pickering Avenue		Whittier	CA	90602	(562)698-8348	33.9691227	-118.0417514						1300	1445	Tue	1300	1445	Wed	1300	1445	Thu	1300	1445	Fri	1300	1445										\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3113	Salvation Army- Santa Fe Springs	12000 E. Washington Boulevard		Whittier	CA	90606	(562)696-9562	33.9676128	-118.0553469						1300	1600	Wed	1300	1600	Thu	1300	1600	Fri	1300	1600													\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
2879	Catholic Charities of Los Angeles, Inc.	5014 Passons Boulevard		Pico Rivera	CA	90660	(562)949-0937	33.9980359	-118.0777582	http://catholiccharitiesla.org/where-we-are/program-directory-by-city/					0900	1200	Tue	0900	1200	Wed	0900	1200	Thu	0900	1200													\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4076	Care For The Children	13128 Telegraph Road		Santa Fe Springs	CA	90670	(888) 490-9751	33.94173894	-118.0525374																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4245	Children's Network International	333 S. 4th Street		Montebello	CA	90640	(323) 980-9870	34.00475299	-118.1051154																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4348	Heart of Compassion	600 S. Maple Avenue		Montebello	CA	90640	(323) 727-7997	34.0044842	-118.119257																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4170	God Is Love	2121 W. Crescent Avenue	Ste D	Anaheim	CA	92801	(714) 272-0289	33.83979948	-117.9547524																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals Provided	f											\N	\N	\N	Meals Provided	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4093	St. Paul Of The Cross Church	14020 Foster Road		La Mirada	CA	90638	(562) 921-2914	33.90968847	-118.032723																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4353	Fellowship Of The Light	6042 Whittier Boulevard		Los Angeles	CA	90022	(323) 952-0844	34.01688156	-118.140769																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4214	New Life Community Church	275 E. Foothill Boulevard		Pomona	CA	91767	(909) 593-5000	34.1073148	-117.744861																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4053	Rosewood Revitalization Group	1220 West Whittier Boulevard		Montebello	CA	90640	323.662.1194	34.011737	-118.113475																													\N		2020-03-29 18:39:28-07	\N	2020-05-30 14:59:28.538005-07	108	\N	\N			f											\N	\N	110		2020-05-30 17:00:51	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	f	f	f	f	f	f	2	f
3060	Montebello Watch	1033 South Maple Avenue		Montebello	CA	90640	(626)810-5833	33.9953919	-118.124677						1500	1800	Wed	1500	1800	Thu	1500	1800																\N		2019-12-01 00:00:00-08	\N	2020-05-30 13:58:24.002571-07	108	\N	\N			f											\N	\N	110		2020-05-30 20:58:24.002571	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
3194	Ocean Park Community Center Food Pantry	503 Olympic Boulevard		Santa Monica	CA	90401	(310)450-4050	34.0135455	-118.4890914						1300	1430																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3177	United African Church	1745 W. 55th Street		Los Angeles	CA	90062	(323)766-0001	33.9924976	-118.3084069						1300	1400	Sun3rd	1300	1400																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3164	Testimonial Community Love Ctr	5721 S. Western Avenue		Los Angeles	CA	90062	(323)291-6753	33.9902077	-118.3094489						0800	1030																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3174	Trinity Pantry Ministry	1450 West 7th Street		San Pedro	CA	90732	(310)742-3279	33.738369	-118.308972						0930	1050	Sun	1300	1500	Fri	0930	1050	Fri	1300	1500	Sat	0930	1050	Sat	1300	1500							\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3099	S.A. Friendly Village Mobile Park	1301 East Avenue I		Lancaster	CA	93535	(661)946-6267	34.7088457	-118.1055901						0900	1100																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3162	Sunland Tujunga T.A.C.	7747 Foothill Boulevard		Tujunga	CA	91042	(818)352-2421	34.2577962	-118.3009158						0900	1130	Thu	0900	1130	Fri	0900	1130																\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3092	Redeemer Lutheran Outreach	20025 Chase Street		Winnetka	CA	91306	(818)341-1629	34.2248564	-118.5698672						1000	1430	Thu	1000	1430	Fri	1000	1430																\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3097	Rosewood Church	10115 E. Rose Street		Bellflower	CA	90706	(562)925-1443	33.8705097	-118.1180147						1500	1600																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3168	The Lord's Church	9701 Flower Street		Bellflower	CA	90706	(562)866-8283	33.882343	-118.12727						2000	2100	Wed4th	2000	2100																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3096	Rock Solid Christian Assembly	867 W. 10th Street		San Pedro	CA	90731	(310)832-2788	33.734896	-118.296113						1030	1130	Sat4th	1030	1130																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3065	New Life Community Church	5009 W. 119th Street		Hawthorne	CA	90250	(310)676-6859	33.9258706	-118.3660822						1200	1330	Wed	1400	1530																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3039	Living Hope Community Partnership	18500 Farjardo Street		Rowland Heights	CA	91748	(714)202-7333	33.979196	-117.902383						0900	1100	Sat3rd	0900	1100																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3030	Khalsa Care Foundation	9989 Laurel Canyon Boulevard		Pacoima	CA	91331	(805)402-5050	34.2511562	-118.4252181						1800	1900																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3070	Nuevo Amanecer	1035 N. Avalon Boulevard		Wilmington	CA	90744	(310)847-6937	33.784017	-118.263126						1800	1930	Wed3rd	1800	1930																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3023	Interfaith Food Center	11819 Burke Street		Sante Fe Springs	CA	90670	(562)903-1478	33.962938	-118.0650479						0830	1200	Tue	1630	1900	Tue	0830	1200	Thu	0830	1200	Fri	0830	1200										\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3069	Norwalk Church of the Nazarene	15000 Studebaker Road		Norwalk	CA	90650	(562)863-0911	33.8944743	-118.0995643						1700	1900																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3046	Los Angeles Central City S.D.A. Church	650 W. 21st Street		Los Angeles	CA	90007	((21)) 7-9646	34.0327067	-118.2752257						1200	1400																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	t	f	t	f	t	f	1	f
3049	Love & Faith Christian Center	8505 S. Western Avenue		Los Angeles	CA	90047	(323)753-8300	33.9606268	-118.3093646						0830	1000	Fri	0830	1000																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
2991	His Helping Hands - Calvary Assembly of God	25501 Oak Street		Lomita	CA	90717	(310)326-2757	33.7919156	-118.3176793						1800	1900	Thu4th	1800	1900																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
2986	Harbor Christian Center	1602 N. Wilmington Boulevard		Wilmington	CA	90744	(310)835-5661	33.7950143	-118.2748789						1800	1930	Wed3rd	1800	1930																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
2965	Food Net-Santa Clarita Service Center	24271 Main Street		Newhall	CA	91321	(661)254-0070	34.3783287	-118.5278635						0900	1600	Tue	0900	1600	Wed	0900	1600	Thu	0900	1600	Fri	0900	1600										\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
2952	First New Christian Fellowship	1555 W. 108th Street		Los Angeles	CA	90047	(323)756-2541	33.9384572	-118.3040285						0900	1100																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3066	New Region For Christ	520 S. La Brea Avenue		Inglewood	CA	90301	(424)227-8657	33.9569988	-118.3527848						1130	1300																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3116	Salvation Army - Pasadena Tabernacle	1000 E.Walnut Street		Pasadena	CA	91106	(626)773-4400	34.1493046	-118.1297902						0900	1130	Tue	0900	1130	Wed	0900	1130	Thu	0900	1130	Fri	0900	1130										\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
2941	Family Mennonite Church	6520 S. Normandie Avenue		Los Angeles	CA	90044	(323)750-1744	33.9799881	-118.2999294						1300	1330																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
2996	Holy Cross Center	104 W. 47th Place		Los Angeles	CA	90037	(323)232-3333	33.9997088	-118.2742456						0900	1100	Wed	0900	1100	Fri	0900	1100																\N		2019-12-01 00:00:00-08	\N	2020-05-26 12:25:12.765348-07	108	\N	\N			f											\N	\N	110		2020-05-26 19:25:12.765348	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
2948	First Church of the Nazarene-Altadena	9 W. Mendocino Street		Altadena	CA	91001	(626)798-2361	34.1915246	-118.1491785						1400	1600	Thu3rd	1400	1600																			\N		2019-12-01 00:00:00-08	\N	2020-05-26 16:53:29.165364-07	108	\N	\N			f											\N	\N	110		2020-05-26 23:53:29.165364	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
4082	Placentia Senior Center	134 N. Bradford Avenue		Placentia	CA	92870	(714) 986-2332	33.87316916	-117.8700888																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry\n(Seniors Only)	f											\N	\N	\N	Meals and Food Pantry\n(Seniors Only)	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4045	Desert Reign	11610 Lakewood Boulevard		Downey	CA	90241	(562) 861-6011	33.931062	-118.126143																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3179	University S.D.A. Church	1135 Martin Luther King Jr. Boulevard		Los Angeles	CA	90037	(323)766-9889	34.0111729	-118.2955869						1300	1430																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4310	SSS Good Samaritan Assoc	5035 Hedda Street		Lakewood	CA	90712	(562) 467-8926 or (562) 619-0467?	33.86416146	-118.1344255																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4165	St. Anne Social Services	2011 Colorado Avenue		Santa Monica	CA	90404	(310) 829-4411	34.02631079	-118.4765831																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4337	Recycled Resources	5619 Monte Vista Street (Parish Hall behind All Saints Episcopal Church)		Los Angeles	CA	90042	323-255-6806	33.94	-118.52																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals	f											\N	\N	\N	Meals	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4327	Vineyard Christian Fellowship Of Anaheim	5310 E. La Palma Avenue		Anaheim	CA	92807	(714) 777-4777	33.85945393	-117.8009189																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4050	Beacon Of H.O.P.E.	1200 W. Alvarez Avenue		Orange	CA	92868	(714) 288-1777	33.79808898	-117.8649897																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4429	Faith Food Ministries			Fullerton	CA		(714) 905-2444	33.87033	-117.92896																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4254	Rio Hondo College	3600 Workman Mill Road		Whittier	CA	90601	(562) 908-3476	34.019406	-118.034271																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry (RHC\nStudents Only)	f											\N	\N	\N	Food Pantry (RHC\nStudents Only)	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4288	More For Students at Wilson High School	4400 E. 10th Street		Long Beach	CA	90804	(562) 433-0481	33.7779	-118.139886																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry (Wilson\nStudents Only)	f											\N	\N	\N	Food Pantry (Wilson\nStudents Only)	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4217	Temple Baptist Church	2825 E. 10th Street		Long Beach	CA	90804	(562) 434-3217	33.779178	-118.158048																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4043	Long Beach Senior Center	1150 E. 4th Street		Long Beach	CA	90802	(562) 570-3506	33.771195	-118.176957																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry\n(Seniors Only)	f											\N	\N	\N	Meals and Food Pantry\n(Seniors Only)	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4374	Venice Community Housing	720 Rose Avenue		Venice	CA	90291	(310) 399-4100	34.0008074	-118.4688355																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals Provided (VCH\nStudents Only)	f											\N	\N	\N	Meals Provided (VCH\nStudents Only)	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4054	St. Paul's Episcopal Church	1221 Wass Street		Tustin	CA	92780	(714) 544-3141	33.74869239	-117.8066118																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4394	New Direction Community Program	8124 S. Western Avenue		Los Angeles	CA	90047	323-291-0035	33.94	-118.52																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals	f											\N	\N	\N	Meals	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4420	Salvation Army Pasadena	960 E. Walnut Street		Pasadena	CA	91106	(626) 529-0503	34.149078	-118.1304405																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4422	Salvation Army Bellflower	9644 Cedar Street		Bellflower	CA	90706	(562) 804-0808	33.87114219	-118.1274009																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4198	Urban Community Outreach (Drop-In Center)	241 Cedar Avenue		Long Beach	CA	90802	(562) 582-1000	33.770124	-118.1954385																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals and Food Pantry	f											\N	\N	\N	Meals and Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4079	First Southern Baptist Church Of Sylmar	13261 Glenoaks Boulevard		Sylmar	CA	91342	(818) 367-2362	34.311492	-118.4554305																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4101	St. Anthony Claret - SVDP	1450 E. La Palma Avenue		Anaheim	CA	92805	(714) 563-1652	33.846363	-117.899217																													\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Food Pantry	f											\N	\N	\N	Food Pantry	\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
2953	First Presbyterian Church	1809 West Boulevard		Los Angeles	CA	90019	(323)935-5204	34.0405644	-118.3372555	http://fpcofla.org/					1300	1400	Sat	0900	1100																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3143	St. Helen Church	9314 Madison Avenue		South Gate	CA	90280	(323)563-3522	33.9506409	-118.2138075						0800	1000																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3170	Total Deliverance Church	45124 10th Street West		Lancaster	CA	93535	(661)951-9881	34.7030871	-118.1472077						1100	1230	Fri4th	1100	1230																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3117	Salvation Army-Pomona	490 E. La Verne Anenue		Pomona	CA	91767-2800	(909)623-1579	34.0806833	-117.7434276						0800	1600	Tue	0800	1200	Wed	0800	1600	Thu	0800	1200	Fri	0800	1600										\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3135	St. Brigid Catholic Church	5214 S. Western Avenue		Los Angeles	CA	90062	(323)292-0781	33.9945347	-118.3086059						0930	1100																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3130	Sowing Seeds for Life	1350 Arrow Highway		La Verne	CA	91750	(909)392-5777	34.100366	-117.785848						1100	1600	Wed3rd	1100	1600																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3153	St. Mary & St. Athanasius Coptic Church	17431 Roscoe Boulevard		Northridge	CA	91325	(818)342-4414	34.2216778	-118.513091						0900	1400	Tue3rd	0900	1400																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3119	San Gabriel Valley Y.W.C.A.	510 N. Vineland Avenue		La Puente	CA	91746	(626)333-0294	34.051539	-117.986823						0900	1100																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3128	Silverlake Community Church-Hope Net	2930 Hyperion Avenue		Los Angeles	CA	90027	(323)663-3151	34.1098951	-118.2702749						1730	1830																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3198	WSFB-St. Anne's Social Service	2013 Colorado Avenue		Santa Monica	CA	90404	(310)829-4411	34.0266996	-118.4766044						1600	1730																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3079	Paramount Care Foundation	8303 Alondra Boulevard		Paramount	CA	90723	(562)531-6820	33.889572	-118.154455						0900	1000	Fri2nd	0900	1000	Fri3rd	0900	1000	Fri4th	0900	1000													\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3176	Twin Lakes Community Church	17213 Lake Los Angeles Avenue		Lake Los Angeles	CA	93591	(661)264-1215	34.6072723	-117.8233091						0800	1130																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3100	S.A. Mayflower Gardens	6570 West Avenue L-12		Quartz Hill	CA	93536	(661)943-3228	34.6638843	-118.2231208						0900	1100																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3080	Peace Lutheran Church	11690 Fenton Avenue		Lake View Terrace	CA	91342	(818)899-3950	34.2823569	-118.3916075						0900	1100	Sat3rd	0900	1100																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3032	La Puente Spanish S.D.A. Church	18047 Valley Boulevard		La Puente	CA	91744	(626)912-9408	34.0065174	-117.9088863						2030	2100																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3175	Tujunga United Methodist Church	9901 Tujunga Canyon Boulevard		Tujunga	CA	91042	(818)352-1481	34.2480625	-118.2772395						1100	1300	Fri	1100	1300	Sat2nd	1000	1200	Sat4th	1000	1200													\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3088	Prince of Peace/Family Rescue	22103 Van Owen Street		Canoga Park	CA	91303	(818)887-9386	34.1940869	-118.6085261						0900	1300	Tue	0900	1300	Wed	0900	1300	Thu	0900	1300	Fri	0900	1300										\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3189	West Angeles Community Corporation	3045 South Crenshaw Boulevard		Los Angeles	CA	90016	(323)751-3440	34.026398	-118.335492						0900	1300	Tues	0900	1300	Wed	0900	1300																\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3106	Saint Mark Food Pantry	8305 S. Gramercy Place		Los Angeles	CA	90047	(323)753-3535	33.9632286	-118.3136076						1100	1130	Wed3rd	1100	1130																			\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
3061	Mt. Sinai C.O.G.I.C.	936 W. Ninth Street		Pomona	CA	91766	(909)868-0224	34.0510185	-117.7596455						1200	1400																						\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
2962	Food Net-Los Nietos Service Center	11640 W. Slauson Avenue		Whittier	CA	90606	(562)699-9898	33.9643446	-118.0676089						1100	1400	Fri	1300	1330	Fri	1430	1600																\N		2019-12-01 00:00:00-08	\N	\N	\N	\N	\N			f											\N	\N	\N		\N	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	1	f
4100	The Center at Blessed Sacrament 	14424 Sherman Way		Van Nuys	CA	91405	818-779-8000	34.20117550233728	-118.447416	http://www.urm.org																												\N		2020-03-29 18:39:28-07	\N	\N	\N	\N	\N		Meals	f											\N	\N	\N	Meals	\N	\N		\N	2020-03-30 01:39:28								f	f	f	f								English	f	f	f	f	f	f	1	f
2915	Shepherd's Pantry - Baldwin Park (Formally Cory's Kitchen-New Beginnings)	13020 Francisquito Avenue		Baldwin Park	CA	91706	(626) 671-0090	34.0791001	-117.9893116	https://www.shepherdspantry.com					1700	1900																						\N	COVID Updates: \nLocation used to be called "Cory's Kitchen-New Beginnings"	2019-12-01 00:00:00-08	\N	2020-05-30 10:06:17.363779-07	108	2020-05-28 13:22:12-07	110	Clients need ID showing proof of residency in LA County. Clients may receive food two times per month from any Shepherd’s Pantry location - the pantry keeps a database of clients to track usage.	Food Donations: Name and Contact\nDonors include LA Regional Food Bank, private donors, supermarkets.	f			info@shepherdspantry.org	Canned and boxed food, produce, fresh fruits, dairy/deli, frozen meat and bakery items	Food Pantry, Prayer Support, Praise and Worship	https://www.facebook.com/shepherdspantry/			https://www.linkedin.com/company/shepherds-pantry		2020-05-30 17:06:16.916	108	110		2020-05-24 03:55:17	\N		\N	2019-12-01 08:00:00					Craig Cerro	626-852-7630	ccerro@shepherdspantry.com	t	t	t	t	Mon and Tues 9-11, Wed and Thu 4-6. Call ahead to schedule a different time	Call ahead if donating anything frozen -- cannot be defrosted. Frozen donations generally not encouraged for this reason. 		info is the same for the glendora location				English	t	t	t	t	t	t	4	f
3075	Our Saviour Center	4368 Santa Anita Avenue		EL Monte	CA	91731	(626)579-2190	34.0853655	-118.0293332						1000	1300	Thu	1000	1300																			\N		2019-12-01 00:00:00-08	\N	2020-05-30 11:57:51.096775-07	108	\N	\N			f											\N	\N	110		2020-05-30 18:57:51.096775	\N		\N	\N								f	f	f	f								English	f	f	f	f	f	f	2	f
\.


--
-- TOC entry 3213 (class 0 OID 19369)
-- Dependencies: 219
-- Data for Name: stakeholder_category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.stakeholder_category (stakeholder_id, category_id) FROM stdin;
3179	1
2800	2
3112	1
3113	1
3114	1
3115	1
3116	1
3117	1
3118	1
3119	1
3121	1
3122	1
3124	1
3128	1
3130	1
4243	1
3135	1
3136	1
3137	1
3138	1
3139	1
3141	1
3142	1
3143	1
3145	1
3147	1
3149	1
3144	1
3151	1
3152	1
3153	1
3154	1
3155	1
3156	1
3110	1
3162	1
3164	1
3165	1
3013	1
2914	1
3167	1
3168	1
3169	1
3170	1
3172	1
3174	1
3187	1
3189	1
3194	1
3195	1
3196	1
3197	1
3198	1
3200	1
3075	1
3076	1
3077	1
3078	1
3079	1
3080	1
3082	1
3083	1
3084	1
3088	1
3089	1
3090	1
3091	1
3092	1
3093	1
3095	1
3096	1
3097	1
3099	1
3100	1
3101	1
3102	1
3103	1
3104	1
3106	1
3108	1
3109	1
2998	1
3007	1
3008	1
2996	1
3019	1
3020	1
3177	1
3023	1
3030	1
3031	1
3032	1
3039	1
3040	1
3042	1
3048	1
3049	1
3050	1
3051	1
3043	1
2949	1
3056	1
3057	1
3060	1
3061	1
3062	1
3063	1
3065	1
3067	1
3069	1
3070	1
3071	1
2872	1
2878	1
2879	1
2924	1
2925	1
2926	1
2939	1
2962	1
2965	1
3066	1
2920	1
2986	1
2991	1
2997	1
2948	1
2903	1
2934	1
4329	9
2990	1
2935	1
2952	1
2953	1
4035	1
2867	1
3191	1
3073	1
2944	1
2861	1
2974	1
4213	1
4324	1
3126	1
4004	9
3181	1
3182	1
2904	1
3133	1
3046	1
2697	2
2722	2
2721	2
2699	2
2698	2
2736	2
2735	2
2734	2
2733	2
2732	2
2731	2
2730	2
2729	2
2728	2
2727	2
2726	2
2725	2
2724	2
2723	2
2720	2
2718	2
2717	2
2716	2
2715	2
2714	2
2713	2
2712	2
2711	2
2710	2
2709	2
2708	2
2707	2
2706	2
2705	2
2704	2
2703	2
2702	2
2701	2
2700	2
2719	2
3175	1
3176	1
3184	1
3123	1
2863	1
3996	1
4095	1
4075	1
2992	1
4242	9
2941	1
4316	1
4242	1
2865	1
4017	1
4021	1
4023	1
4026	1
4033	1
4043	1
4045	1
4047	1
4050	1
4054	1
4055	1
4059	1
4062	1
4063	1
4064	1
4070	1
4073	1
4074	1
4076	1
4079	1
4080	1
4082	1
4087	1
4090	1
4093	1
4094	1
4101	1
4102	1
4104	1
4105	1
3002	1
4122	1
4130	1
4136	1
4138	1
4145	1
4148	1
4154	1
4156	1
4160	1
4161	1
4162	1
4165	1
4168	1
4173	1
4174	1
4176	1
4177	1
4179	1
4180	1
4182	1
4186	1
4198	1
4200	1
4201	1
4204	1
4205	1
4208	1
4209	1
4210	1
4212	1
4214	1
4217	1
4219	1
4221	1
4227	1
4234	1
4245	1
4246	1
4249	1
4252	1
4254	1
3134	1
4258	1
4265	1
4266	1
4267	1
4281	1
4282	1
4285	1
4287	1
4288	1
4295	1
4298	1
4310	1
4311	1
4314	1
4315	1
4317	1
4321	1
4322	1
4323	1
4327	1
4309	1
4332	1
4341	1
4343	1
4348	1
4353	1
4354	1
4357	1
4359	1
4360	1
4363	1
4369	1
4380	1
2984	1
4387	1
4392	1
4398	1
4408	1
4410	1
4411	1
4420	1
4422	1
4423	1
4427	1
4429	1
4432	1
4433	1
4026	9
4043	9
4047	9
4052	9
4054	9
4055	9
4057	9
4080	9
4082	9
4087	9
4105	9
4122	9
4128	9
4135	9
4145	9
4155	9
4161	9
2909	1
4167	9
4170	9
4173	9
4174	9
4176	9
3018	1
4190	9
3157	1
3186	1
2877	1
3166	1
3127	1
3161	1
4069	1
2994	1
4158	1
4402	1
4193	9
4198	9
4205	9
4219	9
4234	9
4246	9
4266	9
4270	9
4287	9
4295	9
4302	9
4314	9
4323	9
4335	9
2921	1
2933	1
4337	9
4341	9
4345	9
4353	9
4374	9
4375	9
3163	1
4106	9
4388	9
4394	9
4395	9
4403	9
4410	9
4420	9
4422	9
4427	9
4106	1
4312	9
3178	1
2995	1
2871	1
2966	1
2963	1
2905	1
4127	9
4231	9
2913	1
3158	1
3132	1
2956	1
2964	1
4053	1
3180	1
4366	1
3087	1
4028	9
2989	1
4326	9
3053	1
4428	1
4238	1
2940	1
4061	9
4061	8
4370	9
2916	1
3045	1
3064	1
4124	9
4273	1
2922	1
2898	1
2958	1
4027	9
4027	1
3148	1
3036	1
3011	1
2880	1
3012	1
2870	1
4002	1
2950	1
2957	9
4328	8
4372	1
2993	1
3014	1
2891	1
2980	1
3125	1
4191	9
4137	9
2887	1
3041	1
2957	1
2959	1
3009	1
4088	1
4455	1
4289	1
4086	9
3183	1
4142	1
4381	1
4078	1
2893	1
3120	1
4379	9
3098	1
4379	1
3034	1
2936	1
2910	1
3004	1
3005	1
2983	1
2915	1
2938	1
3094	1
2929	9
3001	1
3001	9
2929	1
2881	1
2999	8
3000	1
2929	8
2932	1
3150	1
2888	1
3044	1
3140	1
3038	1
3025	1
2928	8
2928	9
2884	1
3072	1
3160	9
3010	1
4386	9
3160	1
2902	1
3059	1
3055	1
3055	8
4239	1
2970	1
3107	1
2895	1
4085	9
3037	1
2923	1
4437	1
4382	9
3068	1
3131	1
4188	9
4188	1
4308	1
4308	8
4001	1
3058	1
2985	1
4115	1
3021	1
3086	1
4382	1
3111	1
3190	1
4331	9
3054	1
4261	1
3022	1
2917	1
2979	9
2979	1
4181	1
4425	9
3033	1
2942	1
4032	1
4185	9
4185	1
2931	9
2945	1
2943	1
2890	1
3074	1
2858	1
2858	8
2859	1
2869	9
2869	1
2875	1
2885	1
2896	1
2897	1
2901	1
2951	1
2968	9
2968	1
3028	1
4344	9
2972	1
4084	1
4215	1
2971	1
2954	1
4228	9
2874	1
4361	9
2864	1
3188	1
4364	1
2955	1
3003	1
4368	9
4368	1
3193	9
3193	1
2978	1
2981	1
3997	8
2908	1
4066	1
2862	1
4271	1
4091	1
3192	1
4291	9
2907	1
2977	1
3105	1
4164	9
3047	1
3081	1
2988	1
4384	1
2982	1
2894	1
3052	1
3146	1
4051	1
2919	1
2967	1
2967	8
3017	1
2912	1
2866	1
3171	1
2975	1
3029	1
4044	1
3016	1
2969	1
2906	1
2911	1
2873	1
4100	9
4456	1
4253	1
4256	1
4003	1
3173	1
3085	1
2960	1
4184	9
4184	1
4355	1
4247	1
4338	9
4251	1
3129	1
4077	1
2900	1
2876	1
4373	1
4401	9
4401	1
2987	1
4401	8
3035	1
3199	1
4431	9
2899	2
2899	8
3006	1
2868	1
4119	1
2886	1
3024	1
2860	9
4255	8
4255	1
4430	9
4031	9
4031	1
4072	1
4011	9
3015	1
4415	9
2889	1
3026	1
3027	1
4008	1
4216	9
3159	1
2918	1
4089	1
4132	1
4150	9
4203	1
4022	1
4097	1
4116	1
4147	1
4417	1
4248	9
4232	1
4020	9
4339	9
4339	1
4365	1
2937	9
2937	1
4163	9
2883	1
2946	1
2947	1
2961	1
2973	1
2976	1
\.


--
-- TOC entry 3214 (class 0 OID 19372)
-- Dependencies: 220
-- Data for Name: stakeholder_donor; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.stakeholder_donor (id, name, address_1, address_2, city, state, zip, phone, latitude, longitude, website, daycode, open, close, daycode1, day1_open, day1_close, daycode2, day2_open, day2_close, daycode3, day3_open, day3_close, daycode4, day4_open, day4_close, daycode5, day5_open, day5_close, daycode6, day6_open, day6_close, daycode7, day7_open, day7_close, year_round, season_open, season_close, fm_id, notes, created_date, created_login_id, modified_date, modified_login_id, submitted_date, submitted_login_id, requirements, admin_notes, inactive, parent_organization, physical_access, email, items, services, facebook, twitter, pinterest, linkedin, description, approved_date, reviewed_login_id, assigned_login_id, agency_type, assigned_date, rejected_date, review_notes, claimed_login_id, claimed_date, instagram, admin_contact_name, admin_contact_phone, admin_contact_email, donation_contact_name, donation_contact_phone, donation_contact_email, donation_pickup, donation_accept_frozen, donation_accept_refrigerated, donation_accept_perishable, donation_schedule, donation_delivery_instructions, covid_notes, donation_notes, category_notes, eligibility_notes, food_types, languages, v_name, v_categories, v_address, v_email, v_phone, v_hours, verification_status_id, inactive_temporary) FROM stdin;
\.


--
-- TOC entry 3217 (class 0 OID 19420)
-- Dependencies: 223
-- Data for Name: stakeholder_schedule; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.stakeholder_schedule (id, stakeholder_id, day_of_week, open, close, week_of_month, season_id) FROM stdin;
7792	3996	Mon	09:30:00	12:30:00	0	\N
7793	3996	Tue	09:30:00	12:30:00	0	\N
7794	3996	Wed	09:30:00	12:30:00	0	\N
7795	3996	Thu	09:30:00	12:30:00	0	\N
7796	3996	Fri	09:30:00	12:30:00	0	\N
8102	3179	Wed	11:00:00	12:00:00	0	\N
2970	2878	Tue	10:00:00	15:00:00	0	\N
2971	2879	Tue	09:00:00	12:00:00	0	\N
2977	2953	Sat	09:00:00	11:00:00	0	\N
2992	3112	Wed	09:00:00	10:30:00	0	\N
2993	3113	Wed	13:00:00	16:00:00	0	\N
2994	3115	Tue	13:00:00	14:45:00	0	\N
2995	3116	Tue	09:00:00	11:30:00	0	\N
2996	3117	Tue	08:00:00	12:00:00	0	\N
3085	3123	Thu	15:00:00	18:00:00	0	\N
8039	4004	Mon	11:30:00	12:30:00	0	\N
8040	4004	Tue	11:30:00	12:30:00	0	\N
8041	4004	Wed	11:30:00	12:30:00	0	\N
8042	4004	Thu	11:30:00	12:30:00	0	\N
8043	4004	Fri	11:30:00	12:30:00	0	\N
8108	3181	Sat	14:00:00	15:30:00	4	\N
8109	3181	Sat	14:00:00	15:30:00	2	\N
8110	3182	Sat	10:00:00	13:00:00	3	\N
8080	2863	Sat	09:00:00	11:00:00	-1	\N
3924	3117	Wed	08:00:00	16:00:00	0	\N
3926	3138	Thu	09:00:00	11:45:00	0	\N
2049	3075	Tue	10:00:00	13:00:00	0	\N
2050	3076	Mon	08:00:00	17:00:00	0	\N
2057	3083	Sat	08:30:00	10:30:00	0	\N
2062	3088	Mon	09:00:00	13:00:00	0	\N
2064	3090	Tue	14:00:00	17:30:00	0	\N
2065	3091	Sun	12:30:00	14:00:00	0	\N
2066	3092	Wed	10:00:00	14:30:00	0	\N
2067	3093	Sat	10:00:00	13:00:00	0	\N
2069	3095	Wed	10:00:00	13:00:00	0	\N
2080	3106	Wed	11:00:00	11:30:00	0	\N
7901	2904	Thu	13:00:00	15:00:00	4	\N
12280	4401	Sun	11:00:00	12:00:00	0	\N
12281	4401	Mon	11:00:00	12:00:00	0	\N
12282	4401	Tue	11:00:00	12:00:00	0	\N
3003	3139	Fri	09:00:00	11:00:00	4	\N
3005	3141	Thu	16:00:00	18:00:00	4	\N
3006	3142	Fri	11:00:00	13:00:00	4	\N
3007	3145	Thu	17:00:00	19:00:00	4	\N
3023	3168	Wed	20:00:00	21:00:00	4	\N
3025	3170	Fri	11:00:00	12:30:00	4	\N
3047	3082	Fri	11:00:00	15:00:00	4	\N
3106	2924	Sat	08:15:00	10:30:00	0	\N
3121	2962	Fri	13:00:00	13:30:00	0	\N
3123	2965	Tue	09:00:00	16:00:00	0	\N
3907	2878	Wed	10:00:00	15:00:00	0	\N
3908	2879	Wed	09:00:00	12:00:00	0	\N
3921	3113	Thu	13:00:00	16:00:00	0	\N
3922	3115	Wed	13:00:00	14:45:00	0	\N
3923	3116	Wed	09:00:00	11:30:00	0	\N
3929	3151	Fri	09:00:00	16:00:00	0	\N
3930	3154	Wed	09:00:00	12:00:00	0	\N
3931	3156	Thu	09:00:00	11:00:00	0	\N
3933	3162	Fri	09:00:00	11:30:00	0	\N
3934	3165	Tue	09:00:00	17:00:00	0	\N
3936	3174	Fri	09:30:00	10:50:00	0	\N
3938	3189	Wed	09:00:00	13:00:00	0	\N
3939	3195	Fri	09:00:00	11:45:00	0	\N
3940	3196	Thu	13:00:00	15:00:00	0	\N
3941	3197	Wed	10:00:00	12:00:00	0	\N
3942	3076	Wed	08:00:00	17:00:00	0	\N
3945	3088	Wed	09:00:00	13:00:00	0	\N
3946	3090	Thu	14:00:00	17:30:00	0	\N
3947	3092	Fri	10:00:00	14:30:00	0	\N
3948	3108	Thu	09:00:00	15:00:00	0	\N
3951	3008	Wed	09:00:00	10:00:00	0	\N
3954	3023	Tue	08:30:00	12:00:00	0	\N
3956	3042	Fri	09:00:00	12:00:00	0	\N
3959	3051	Thu	10:00:00	14:45:00	0	\N
3961	3060	Thu	15:00:00	18:00:00	0	\N
3971	2924	Sat	19:30:00	20:30:00	0	\N
3972	2925	Sat	12:00:00	12:45:00	0	\N
12283	4401	Wed	11:00:00	12:00:00	0	\N
3979	2962	Fri	14:30:00	16:00:00	0	\N
3981	2965	Wed	09:00:00	16:00:00	0	\N
3937	3175	Sat	10:00:00	12:00:00	2	\N
12284	4401	Thu	23:00:00	12:00:00	0	\N
3955	3040	Wed	08:00:00	10:00:00	4	\N
1766	2878	Mon	10:00:00	15:00:00	0	\N
1767	2879	Mon	09:00:00	12:00:00	0	\N
1785	2800	Wed	15:00:00	19:00:00	0	\N
1780	2953	Sun	13:00:00	14:00:00	3	\N
1961	3113	Tue	13:00:00	16:00:00	0	\N
1962	3114	Wed	11:00:00	13:00:00	0	\N
1963	3115	Mon	13:00:00	14:45:00	0	\N
1964	3116	Mon	09:00:00	11:30:00	0	\N
1965	3117	Mon	08:00:00	16:00:00	0	\N
1966	3118	Sun	08:00:00	10:00:00	0	\N
1967	3119	Fri	09:00:00	11:00:00	0	\N
1969	3121	Fri	09:00:00	12:00:00	0	\N
1975	3128	Wed	17:30:00	18:30:00	0	\N
1983	3138	Tue	09:00:00	11:45:00	0	\N
1992	3147	Tue	07:00:00	08:30:00	0	\N
1994	3149	Tue	07:00:00	08:30:00	0	\N
1996	3151	Mon	09:00:00	16:00:00	0	\N
1997	3152	Wed	08:00:00	10:00:00	0	\N
1999	3154	Mon	09:00:00	12:00:00	0	\N
2001	3156	Mon	09:00:00	11:00:00	0	\N
2007	3162	Wed	09:00:00	11:30:00	0	\N
2009	3164	Thu	08:00:00	10:30:00	0	\N
2010	3165	Sun	12:30:00	17:00:00	0	\N
2017	3172	Wed	09:30:00	10:45:00	0	\N
2019	3174	Sun	09:30:00	10:50:00	0	\N
2020	3175	Wed	11:00:00	13:00:00	0	\N
2029	3184	Fri	09:00:00	15:00:00	0	\N
2032	3187	Thu	10:30:00	12:00:00	0	\N
2034	3189	Mon	09:00:00	13:00:00	0	\N
2039	3194	Tue	13:00:00	14:30:00	0	\N
2040	3195	Mon	09:00:00	11:45:00	0	\N
2041	3196	Tue	09:00:00	12:00:00	0	\N
2042	3197	Mon	10:00:00	12:00:00	0	\N
2043	3198	Wed	16:00:00	17:30:00	0	\N
1984	3139	Fri	09:00:00	11:00:00	2	\N
1986	3141	Thu	16:00:00	18:00:00	2	\N
1987	3142	Fri	11:00:00	13:00:00	2	\N
1990	3145	Thu	17:00:00	19:00:00	2	\N
2013	3168	Wed	20:00:00	21:00:00	2	\N
1970	3122	Fri	09:00:00	12:00:00	3	\N
1980	3135	Fri	09:30:00	11:00:00	3	\N
1982	3137	Sat	09:00:00	10:30:00	3	\N
1998	3153	Sun	09:00:00	14:00:00	3	\N
1960	3112	Mon	12:00:00	16:00:00	4	\N
1988	3143	Sat	08:00:00	10:00:00	4	\N
1971	3124	Sat	13:30:00	14:30:00	-1	\N
1981	3136	Sat	11:00:00	13:00:00	-1	\N
2082	3108	Mon	09:00:00	15:00:00	0	\N
2083	3109	Thu	13:00:00	15:00:00	0	\N
2092	3007	Mon	19:00:00	21:00:00	0	\N
2093	3008	Sun	12:30:00	13:00:00	0	\N
10053	2941	Sun	13:00:00	13:30:00	2	\N
2105	3019	Sat	07:00:00	08:30:00	0	\N
2109	3023	Mon	08:30:00	12:00:00	0	\N
2114	3030	Fri	18:00:00	19:00:00	0	\N
2115	3031	Tue	08:30:00	11:30:00	0	\N
2116	3032	Tue	20:30:00	21:00:00	0	\N
2126	3042	Mon	09:00:00	12:00:00	0	\N
12285	4401	Fri	23:00:00	12:00:00	0	\N
2133	3049	Mon	08:30:00	10:00:00	0	\N
2135	3051	Tue	10:00:00	14:45:00	0	\N
2140	3056	Sat	09:00:00	11:00:00	0	\N
2141	3057	Thu	07:30:00	12:00:00	0	\N
2142	3060	Tue	15:00:00	18:00:00	0	\N
2144	3062	Wed	09:00:00	11:00:00	0	\N
2149	3065	Sun	12:00:00	13:30:00	0	\N
2151	3069	Wed	17:00:00	19:00:00	0	\N
2153	3071	Thu	08:00:00	09:00:00	0	\N
2166	2872	Wed	15:00:00	16:00:00	0	\N
2167	3123	Tue	15:00:00	18:00:00	0	\N
2054	3080	Sat	09:00:00	11:00:00	2	\N
2056	3082	Fri	11:00:00	13:30:00	2	\N
2058	3084	Wed	09:00:00	11:00:00	2	\N
2063	3089	Thu	11:00:00	13:00:00	2	\N
2070	3096	Sat	10:30:00	11:30:00	2	\N
2074	3100	Tue	09:00:00	11:00:00	2	\N
2075	3101	Tue	12:00:00	14:00:00	2	\N
2071	3097	Fri	15:00:00	16:00:00	3	\N
2076	3102	Mon	09:00:00	11:00:00	3	\N
2077	3103	Mon	12:00:00	14:00:00	3	\N
2078	3104	Thu	15:30:00	17:30:00	3	\N
2106	3020	Fri	10:00:00	12:00:00	3	\N
2222	2924	Wed	19:30:00	20:30:00	0	\N
2249	2952	Thu	09:00:00	11:00:00	0	\N
2259	2962	Thu	11:00:00	14:00:00	0	\N
2262	2965	Mon	09:00:00	16:00:00	0	\N
2266	3066	Sat	11:30:00	13:00:00	0	\N
2224	2926	Fri	09:00:00	11:00:00	3	\N
2292	2997	Mon	09:00:00	10:45:00	0	\N
12286	4401	Sat	11:00:00	12:00:00	0	\N
4757	2878	Thu	10:00:00	15:00:00	0	\N
4758	2879	Thu	09:00:00	12:00:00	0	\N
4770	3113	Fri	13:00:00	16:00:00	0	\N
4771	3115	Thu	13:00:00	14:45:00	0	\N
4772	3116	Thu	09:00:00	11:30:00	0	\N
4773	3117	Thu	08:00:00	12:00:00	0	\N
4775	3138	Sat	09:00:00	11:45:00	0	\N
4778	3165	Wed	09:00:00	17:00:00	0	\N
4779	3174	Fri	13:00:00	15:00:00	0	\N
4781	3197	Thu	10:00:00	12:00:00	0	\N
4782	3076	Thu	08:00:00	17:00:00	0	\N
4785	3088	Thu	09:00:00	13:00:00	0	\N
4786	3090	Fri	14:00:00	16:00:00	0	\N
4787	3108	Fri	09:00:00	15:00:00	0	\N
4791	3023	Thu	08:30:00	12:00:00	0	\N
4793	3051	Fri	10:00:00	14:45:00	0	\N
4802	2924	Sun	10:30:00	12:00:00	0	\N
4808	2965	Thu	09:00:00	16:00:00	0	\N
4780	3175	Sat	10:00:00	12:00:00	4	\N
4783	3079	Fri	09:00:00	10:00:00	4	\N
5581	2878	Fri	10:00:00	15:00:00	0	\N
5662	3115	Fri	13:00:00	14:45:00	0	\N
5663	3116	Fri	09:00:00	11:30:00	0	\N
5664	3117	Fri	08:00:00	16:00:00	0	\N
5666	3165	Thu	09:00:00	17:00:00	0	\N
5667	3174	Sat	09:30:00	10:50:00	0	\N
5668	3197	Fri	13:00:00	15:00:00	0	\N
5670	3088	Fri	09:00:00	13:00:00	0	\N
5673	3023	Fri	08:30:00	12:00:00	0	\N
5686	2965	Fri	09:00:00	16:00:00	0	\N
6381	3165	Fri	09:00:00	17:00:00	0	\N
6382	3174	Sat	13:00:00	15:00:00	0	\N
12287	2865	Thu	10:00:00	11:00:00	3	\N
7091	3165	Sat	09:00:00	17:00:00	0	\N
12288	4106	Tue	11:30:00	12:30:00	0	\N
1977	3130	Wed	11:00:00	16:00:00	1	\N
2000	3155	Thu	09:00:00	11:00:00	1	\N
2012	3167	Sat	07:00:00	08:00:00	1	\N
2014	3169	Tue	07:00:00	10:00:00	1	\N
2022	3177	Sun	13:00:00	14:00:00	1	\N
2045	3200	Tue	10:00:00	12:00:00	1	\N
2052	3078	Wed	10:00:00	12:00:00	1	\N
2053	3079	Fri	09:00:00	10:00:00	1	\N
9803	3025	Sat	11:00:00	12:00:00	0	\N
2123	3039	Sat	09:00:00	11:00:00	1	\N
2124	3040	Wed	08:00:00	10:00:00	1	\N
2152	3070	Wed	18:00:00	19:30:00	1	\N
2223	2925	Wed	17:30:00	18:30:00	1	\N
2238	2939	Fri	12:00:00	15:00:00	1	\N
2246	2948	Thu	14:00:00	16:00:00	1	\N
2282	2986	Wed	18:00:00	19:30:00	1	\N
3045	3079	Fri	09:00:00	10:00:00	2	\N
2015	3170	Fri	11:00:00	12:30:00	2	\N
2021	3176	Sat	08:00:00	11:30:00	2	\N
2134	3050	Sat	14:30:00	16:30:00	2	\N
2147	3063	Sat	09:00:00	12:00:00	2	\N
2286	2991	Thu	18:00:00	19:00:00	2	\N
3001	3130	Wed	11:00:00	16:00:00	3	\N
3012	3153	Tue	09:00:00	14:00:00	3	\N
3014	3155	Thu	09:00:00	11:00:00	3	\N
3022	3167	Sat	07:00:00	08:00:00	3	\N
3024	3169	Tue	07:00:00	10:00:00	3	\N
3028	3177	Sun	13:00:00	14:00:00	3	\N
3040	3200	Tue	10:00:00	12:00:00	3	\N
3044	3078	Wed	10:00:00	12:00:00	3	\N
3046	3080	Sat	09:00:00	11:00:00	3	\N
3056	3106	Wed	11:00:00	11:30:00	3	\N
3068	3039	Sat	09:00:00	11:00:00	3	\N
3069	3040	Wed	08:00:00	10:00:00	3	\N
3082	3070	Wed	18:00:00	19:30:00	3	\N
3107	2925	Wed	17:30:00	18:30:00	3	\N
3115	2939	Fri	12:00:00	15:00:00	3	\N
3116	2948	Thu	14:00:00	16:00:00	3	\N
3234	2986	Wed	18:00:00	19:30:00	3	\N
3943	3079	Fri	09:00:00	10:00:00	3	\N
4777	3154	Sat	12:00:00	14:00:00	3	\N
3050	3089	Thu	11:00:00	13:00:00	4	\N
3054	3096	Sat	10:30:00	11:30:00	4	\N
3079	3063	Sat	09:00:00	12:00:00	4	\N
3237	2991	Thu	18:00:00	19:00:00	4	\N
2997	3121	Fri	14:00:00	15:00:00	0	\N
3002	3138	Wed	09:00:00	11:45:00	0	\N
3008	3147	Thu	07:00:00	08:30:00	0	\N
3010	3149	Thu	07:00:00	08:30:00	0	\N
3011	3151	Wed	09:00:00	16:00:00	0	\N
3013	3154	Tue	09:00:00	12:00:00	0	\N
3015	3156	Tue	09:00:00	11:00:00	0	\N
3019	3162	Thu	09:00:00	11:30:00	0	\N
3020	3165	Mon	09:00:00	17:00:00	0	\N
3026	3174	Sun	13:00:00	15:00:00	0	\N
3027	3175	Fri	11:00:00	13:00:00	0	\N
3033	3189	Tue	09:00:00	13:00:00	0	\N
3036	3195	Wed	09:00:00	11:45:00	0	\N
3037	3196	Tue	13:00:00	15:00:00	0	\N
3038	3197	Tue	13:00:00	15:00:00	0	\N
3042	3075	Thu	10:00:00	13:00:00	0	\N
3043	3076	Tue	08:00:00	17:00:00	0	\N
3049	3088	Tue	09:00:00	13:00:00	0	\N
3051	3090	Wed	14:00:00	16:00:00	0	\N
3052	3091	Tue	10:30:00	12:30:00	0	\N
3053	3092	Thu	10:00:00	14:30:00	0	\N
3057	3108	Wed	09:00:00	15:00:00	0	\N
3061	3008	Tue	09:00:00	10:00:00	0	\N
3066	3023	Tue	16:30:00	19:00:00	0	\N
3071	3042	Wed	09:00:00	12:00:00	0	\N
3074	3049	Fri	08:30:00	10:00:00	0	\N
3075	3051	Wed	10:00:00	14:45:00	0	\N
3078	3060	Wed	15:00:00	18:00:00	0	\N
3081	3065	Wed	14:00:00	15:30:00	0	\N
2143	3061	Sat	12:00:00	14:00:00	3	\N
2051	3077	Tue	10:00:00	12:00:00	4	\N
2073	3099	Mon	09:00:00	11:00:00	4	\N
2150	3067	Sat	11:45:00	13:00:00	4	\N
2132	3048	Fri	16:00:00	17:00:00	-1	\N
10321	3180	Thu	12:00:00	15:00:00	3	\N
12569	4061	Sun	07:00:00	17:00:00	0	\N
12570	4061	Mon	07:00:00	17:00:00	0	\N
12571	4061	Tue	07:00:00	17:00:00	0	\N
12291	2929	Mon	08:30:00	17:30:00	0	\N
12292	2929	Tue	08:30:00	17:30:00	0	\N
12293	2929	Wed	08:30:00	17:30:00	0	\N
12294	2929	Thu	08:30:00	17:30:00	0	\N
12295	2929	Fri	08:30:00	12:30:00	0	\N
10335	3140	Thu	09:00:00	11:00:00	0	\N
10336	3140	Sat	09:00:00	11:00:00	0	\N
10337	3140	Wed	09:00:00	11:00:00	0	\N
12450	3009	Wed	19:00:00	19:30:00	0	\N
12496	4003	Thu	13:00:00	15:00:00	3	\N
12497	4003	Thu	13:00:00	15:00:00	4	\N
12560	2893	Mon	09:00:00	12:00:00	1	\N
12572	4061	Wed	07:00:00	17:00:00	0	\N
12573	4061	Thu	07:00:00	17:00:00	0	\N
12574	4061	Fri	07:00:00	17:00:00	0	\N
12296	3035	Sat	10:00:00	14:00:00	3	\N
10467	2877	Thu	09:30:00	15:00:00	0	\N
10468	2877	Tue	09:30:00	15:00:00	0	\N
12561	3085	Fri	18:00:00	19:00:00	0	\N
12575	4061	Sat	07:00:00	17:00:00	0	\N
12608	2974	Thu	11:00:00	13:00:00	2	\N
12609	2974	Thu	11:00:00	13:00:00	4	\N
10514	2916	Thu	12:00:00	13:00:00	4	\N
9896	3072	Tue	13:00:00	15:00:00	3	\N
10527	4366	Mon	09:00:00	17:00:00	0	\N
10528	4366	Tue	09:00:00	17:00:00	0	\N
10529	4366	Wed	09:00:00	17:00:00	0	\N
10530	4366	Thu	09:00:00	17:00:00	0	\N
10531	4366	Fri	09:00:00	17:00:00	0	\N
12676	2938	Wed	08:00:00	10:00:00	2	\N
10586	2936	Fri	16:00:00	18:00:00	0	\N
12677	2938	Wed	08:00:00	10:00:00	4	\N
10596	3004	Wed	16:00:00	17:00:00	0	\N
10598	3005	Tue	19:30:00	21:30:00	0	\N
10599	3005	Fri	19:30:00	21:30:00	0	\N
10600	3005	Sat	09:00:00	12:00:00	1	\N
10601	3005	Sat	09:00:00	12:00:00	3	\N
10602	2983	Wed	07:00:00	09:00:00	2	\N
10603	2983	Wed	07:00:00	09:00:00	4	\N
10629	2881	Tue	09:00:00	12:00:00	0	\N
10630	2881	Mon	09:00:00	12:00:00	0	\N
10631	2881	Wed	09:00:00	12:00:00	0	\N
10632	2881	Thu	09:00:00	12:00:00	0	\N
10633	2881	Fri	09:00:00	12:00:00	0	\N
10645	2999	Wed	09:00:00	12:00:00	0	\N
10646	2999	Wed	13:00:00	16:00:00	0	\N
10647	2999	Fri	09:00:00	12:00:00	0	\N
10648	2999	Fri	13:00:00	16:00:00	0	\N
10649	3000	Tue	09:00:00	17:00:00	0	\N
10650	3000	Wed	09:00:00	17:00:00	0	\N
10651	3000	Thu	09:00:00	17:00:00	0	\N
10652	3000	Fri	09:00:00	17:00:00	0	\N
10661	2932	Wed	10:00:00	15:00:00	0	\N
10662	2932	Tue	10:00:00	15:00:00	0	\N
10663	2932	Thu	10:00:00	13:00:00	0	\N
12794	3006	Thu	10:30:00	11:30:00	1	\N
12795	3006	Thu	10:30:00	11:30:00	3	\N
12853	3133	Sat	09:00:00	10:30:00	0	\N
10719	3010	Tue	19:00:00	20:00:00	0	\N
12878	3144	Thu	08:00:00	09:00:00	0	\N
12883	3173	Sat	11:00:00	13:00:00	0	\N
12562	2867	Wed	07:30:00	11:30:00	0	\N
10762	2959	Mon	08:00:00	17:00:00	0	\N
10763	2959	Tue	08:00:00	17:00:00	0	\N
10764	2959	Wed	08:00:00	17:00:00	0	\N
10765	2959	Thu	08:00:00	17:00:00	0	\N
10766	2959	Fri	08:00:00	17:00:00	0	\N
12576	2960	Fri	08:00:00	10:00:00	2	\N
12577	2960	Fri	08:00:00	10:00:00	4	\N
10789	3183	Fri	07:30:00	09:30:00	0	\N
12642	3011	Sun	13:00:00	14:00:00	0	\N
12643	3011	Sat	15:00:00	16:00:00	0	\N
10801	3036	Sat	08:00:00	11:00:00	0	\N
10810	3161	Sat	08:00:00	09:00:00	4	\N
10811	3161	Sat	08:00:00	09:00:00	2	\N
10812	3001	Mon	10:00:00	10:00:00	0	\N
10813	3001	Mon	16:00:00	16:00:00	0	\N
10814	3001	Tue	10:00:00	10:00:00	0	\N
10815	3001	Tue	16:00:00	16:00:00	0	\N
10816	3001	Wed	10:00:00	10:00:00	0	\N
10817	3001	Wed	16:00:00	16:00:00	0	\N
10818	3001	Thu	10:00:00	10:00:00	0	\N
10819	3001	Thu	16:00:00	16:00:00	0	\N
10820	3001	Fri	10:00:00	10:00:00	0	\N
10821	3001	Fri	16:00:00	16:00:00	0	\N
12714	3038	Wed	10:00:00	12:00:00	0	\N
10831	3098	Fri	15:30:00	16:30:00	3	\N
9906	3046	Tue	12:00:00	14:00:00	3	\N
12716	2928	Sat	09:00:00	12:00:00	0	\N
12732	4328	Tue	11:00:00	14:45:00	0	\N
12733	4328	Thu	00:00:00	14:45:00	0	\N
12734	4328	Thu	15:00:00	16:45:00	0	\N
12735	4328	Wed	10:00:00	12:00:00	1	\N
12736	4328	Wed	10:00:00	12:00:00	3	\N
12737	4328	Wed	10:00:00	12:00:00	3	\N
9501	2998	Sat	12:00:00	14:00:00	0	\N
9553	3044	Fri	10:00:00	13:30:00	0	\N
9554	3044	Mon	10:00:00	01:30:00	0	\N
9555	3044	Wed	10:00:00	13:30:00	0	\N
9556	2996	Wed	09:00:00	11:00:00	0	\N
9557	2996	Fri	09:00:00	11:00:00	0	\N
9558	2996	Mon	09:00:00	11:00:00	0	\N
12789	3059	Fri	15:30:00	17:00:00	0	\N
12797	3014	Fri	18:00:00	19:30:00	3	\N
12809	2868	Sun	11:00:00	13:00:00	1	\N
12810	2868	Sun	11:00:00	13:00:00	3	\N
12822	3037	Wed	12:00:00	14:00:00	2	\N
12823	3037	Wed	12:00:00	14:00:00	4	\N
12840	3054	Tue	10:00:00	11:30:00	2	\N
12841	3054	Tue	10:00:00	11:30:00	4	\N
12863	3134	Fri	08:00:00	10:00:00	0	\N
12879	2992	Thu	09:30:00	11:30:00	0	\N
12884	3110	Wed	09:00:00	16:00:00	0	\N
12885	3110	Mon	09:00:00	16:00:00	0	\N
12886	3110	Thu	09:00:00	16:00:00	0	\N
12887	3110	Fri	09:00:00	16:00:00	0	\N
12888	3110	Tue	09:00:00	16:00:00	0	\N
10952	2970	Sat	12:00:00	16:00:00	1	\N
10953	2970	Sat	12:00:00	16:00:00	3	\N
10986	4437	Sat	08:00:00	12:00:00	0	\N
10994	3068	Fri	07:30:00	11:00:00	0	\N
10995	3068	Mon	07:30:00	11:00:00	0	\N
10998	4188	Mon	07:30:00	18:00:00	0	\N
10999	4188	Tue	07:30:00	18:00:00	0	\N
11000	4188	Wed	07:30:00	18:00:00	0	\N
11001	4188	Thu	07:30:00	18:00:00	0	\N
11002	4188	Fri	07:30:00	18:00:00	0	\N
11003	4188	Sat	07:30:00	18:00:00	0	\N
11004	4188	Sun	07:30:00	18:00:00	0	\N
11005	4308	Mon	08:00:00	20:00:00	0	\N
11006	4308	Tue	08:00:00	20:00:00	0	\N
11007	4308	Wed	08:00:00	20:00:00	0	\N
11008	4308	Thu	08:00:00	20:00:00	0	\N
11009	4308	Fri	08:00:00	20:00:00	0	\N
11010	4308	Sat	08:00:00	20:00:00	0	\N
11011	4308	Sun	08:00:00	20:00:00	0	\N
11034	3021	Sat	10:00:00	12:00:00	2	\N
11039	3111	Wed	12:00:00	16:00:00	0	\N
11040	3111	Mon	09:00:00	16:00:00	0	\N
11041	3111	Thu	12:00:00	16:00:00	0	\N
11042	3111	Tue	09:00:00	16:00:00	0	\N
11045	3190	Tue	10:00:00	12:00:00	1	\N
11046	3190	Tue	10:00:00	12:00:00	3	\N
11052	4261	Tue	18:00:00	19:00:00	0	\N
11053	3022	Fri	14:00:00	16:00:00	0	\N
11054	3022	Mon	14:00:00	16:00:00	0	\N
11055	3022	Wed	14:00:00	16:00:00	0	\N
11056	2917	Wed	09:00:00	13:00:00	2	\N
11057	2979	Tue	10:00:00	13:00:00	0	\N
11058	2979	Wed	09:00:00	12:00:00	0	\N
11059	2979	Thu	10:00:00	13:00:00	0	\N
11060	2979	Wed	17:30:00	18:00:00	0	\N
11061	2979	Fri	17:30:00	18:00:00	0	\N
11062	2979	Sun	13:30:00	14:00:00	0	\N
11063	2979	Wed	10:00:00	11:00:00	0	\N
11068	4181	Thu	08:00:00	12:00:00	0	\N
11070	2942	Sun	08:00:00	10:30:00	2	\N
11071	2942	Sun	08:00:00	10:30:00	4	\N
11072	4032	Tue	09:00:00	15:30:00	0	\N
11073	4032	Wed	09:00:00	15:30:00	0	\N
11074	4032	Thu	09:00:00	15:30:00	0	\N
11075	4032	Fri	09:00:00	15:30:00	0	\N
11076	4032	Sat	09:00:00	12:00:00	0	\N
11098	2931	Tue	09:00:00	12:00:00	0	\N
11103	2945	Sat	10:00:00	11:00:00	2	\N
11104	2945	Sat	10:00:00	11:00:00	4	\N
11109	2943	Tue	07:30:00	11:00:00	0	\N
11113	2890	Sun	11:00:00	14:00:00	1	\N
11114	2890	Sun	11:00:00	14:00:00	2	\N
11115	2890	Sun	11:00:00	14:00:00	3	\N
11117	3074	Fri	08:00:00	11:00:00	0	\N
11156	2858	Fri	09:30:00	13:00:00	0	\N
11157	2859	Sat	09:00:00	11:00:00	1	\N
11158	2859	Sat	09:00:00	11:00:00	3	\N
11161	2869	Sat	08:00:00	09:00:00	2	\N
11162	2869	Sat	08:00:00	09:00:00	4	\N
11181	2875	Tue	09:00:00	12:00:00	0	\N
11182	2875	Wed	09:00:00	12:00:00	0	\N
11183	2875	Mon	09:00:00	12:00:00	0	\N
11184	2875	Thu	09:00:00	12:00:00	0	\N
11185	2875	Fri	09:00:00	12:00:00	0	\N
11186	2875	Mon	09:00:00	12:00:00	0	\N
11189	2885	Sat	11:30:00	13:00:00	3	\N
11190	2896	Fri	10:00:00	13:00:00	4	\N
11195	2897	Fri	10:00:00	13:00:00	3	\N
11196	2897	Sat	10:00:00	13:00:00	1	\N
11197	2897	Fri	10:00:00	13:00:00	1	\N
11198	2897	Sat	10:00:00	13:00:00	3	\N
11209	2901	Wed	09:00:00	12:00:00	0	\N
11210	2901	Mon	09:00:00	12:00:00	0	\N
11211	2901	Thu	09:00:00	12:00:00	0	\N
11212	2901	Fri	09:00:00	12:00:00	0	\N
11213	2901	Sat	07:00:00	09:00:00	-1	\N
11218	2951	Wed	11:00:00	12:30:00	2	\N
11219	2951	Wed	11:00:00	12:30:00	4	\N
11220	2968	Tue	09:30:00	12:00:00	0	\N
11221	2968	Wed	09:30:00	12:00:00	0	\N
11222	2968	Thu	09:30:00	12:00:00	0	\N
11223	2968	Fri	09:30:00	12:00:00	0	\N
11224	2968	Sat	09:30:00	12:00:00	2	\N
11225	2968	Tue	14:00:00	15:30:00	0	\N
11226	2968	Wed	14:00:00	15:30:00	0	\N
11227	2968	Thu	14:00:00	15:30:00	0	\N
11228	2968	Fri	14:00:00	15:30:00	0	\N
11257	4344	Sun	18:30:00	19:30:00	0	\N
11258	4344	Mon	18:30:00	19:30:00	0	\N
11259	4344	Wed	18:30:00	19:30:00	0	\N
11260	4344	Tue	18:30:00	19:30:00	0	\N
11261	4344	Thu	18:30:00	19:30:00	0	\N
11262	4344	Fri	18:30:00	19:30:00	0	\N
11263	4344	Sat	18:30:00	19:30:00	0	\N
12563	2994	Wed	11:00:00	12:30:00	0	\N
12578	3073	Sat	08:30:00	10:00:00	-1	\N
12579	3073	Fri	08:30:00	10:00:00	3	\N
12591	4355	Wed	10:30:00	12:00:00	0	\N
12592	4355	Wed	14:00:00	17:00:00	0	\N
12593	4355	Fri	10:30:00	12:00:00	2	\N
12594	4355	Fri	14:00:00	17:00:00	2	\N
12595	4355	Fri	10:30:00	12:00:00	3	\N
12596	4355	Fri	14:00:00	17:00:00	3	\N
12597	4355	Fri	10:30:00	12:00:00	4	\N
12598	4355	Fri	14:00:00	17:55:00	4	\N
12599	4355	Fri	10:30:00	12:00:00	-1	\N
12600	4355	Fri	14:00:00	17:00:00	-1	\N
12612	3126	Thu	12:00:00	14:00:00	1	\N
12613	3126	Thu	12:00:00	14:00:00	3	\N
12644	2915	Fri	17:00:00	19:00:00	0	\N
12661	3012	Sun	13:00:00	15:00:00	0	\N
12662	3012	Tue	19:00:00	21:00:00	0	\N
11264	2972	Wed	19:00:00	20:00:00	0	\N
11297	4215	Mon	16:00:00	16:30:00	0	\N
11298	4215	Wed	12:30:00	13:00:00	0	\N
11299	4215	Fri	12:30:00	13:00:00	0	\N
11319	2954	Mon	16:00:00	17:00:00	0	\N
11320	2954	Fri	16:00:00	17:00:00	0	\N
11321	4228	Mon	05:30:00	06:00:00	0	\N
11322	4228	Mon	12:30:00	13:00:00	0	\N
11323	4228	Mon	18:00:00	18:30:00	0	\N
11324	4228	Tue	05:30:00	06:00:00	0	\N
11325	4228	Tue	12:30:00	13:00:00	0	\N
11326	4228	Tue	18:00:00	18:30:00	0	\N
11327	4228	Wed	05:30:00	06:00:00	0	\N
11328	4228	Wed	12:30:00	13:00:00	0	\N
11329	4228	Wed	18:00:00	18:30:00	0	\N
11330	4228	Thu	05:30:00	06:00:00	0	\N
11331	4228	Thu	12:30:00	13:00:00	0	\N
11332	4228	Thu	18:00:00	18:30:00	0	\N
11333	4228	Fri	05:30:00	06:00:00	0	\N
11334	4228	Fri	12:30:00	13:00:00	0	\N
11335	4228	Fri	18:00:00	18:30:00	0	\N
11336	4228	Sat	05:30:00	06:00:00	0	\N
11337	4228	Sat	12:30:00	13:00:00	0	\N
11338	4228	Sat	18:00:00	18:30:00	0	\N
11343	2874	Thu	12:00:00	15:00:00	1	\N
11344	2874	Thu	12:00:00	15:00:00	3	\N
11348	4361	Tue	11:00:00	13:00:00	0	\N
11349	2864	Wed	16:00:00	19:00:00	0	\N
11350	3188	Sat	11:00:00	00:00:00	4	\N
11351	3188	Fri	09:00:00	00:00:00	3	\N
11352	4364	Mon	09:00:00	11:00:00	0	\N
11353	4364	Wed	09:00:00	11:00:00	0	\N
11354	4364	Fri	09:00:00	11:00:00	0	\N
11355	2955	Sat	08:00:00	10:00:00	0	\N
11356	3003	Tue	10:00:00	12:00:00	0	\N
11357	4368	Mon	15:30:00	18:30:00	0	\N
11358	4368	Tue	15:30:00	18:30:00	0	\N
11359	4368	Wed	15:30:00	18:30:00	0	\N
11360	4368	Thu	15:30:00	18:30:00	0	\N
11361	4368	Fri	15:30:00	18:30:00	0	\N
11362	3193	Sun	12:00:00	14:00:00	0	\N
11363	3193	Mon	06:00:00	13:00:00	0	\N
11364	2978	Fri	09:30:00	10:30:00	4	\N
11365	2978	Fri	09:30:00	10:30:00	2	\N
11366	2981	Sat	07:30:00	10:00:00	0	\N
11368	2908	Sat	12:00:00	17:00:00	0	\N
11373	2862	Thu	08:30:00	09:30:00	0	\N
11375	3192	Sun	08:00:00	09:30:00	0	\N
11376	2907	Mon	16:00:00	18:00:00	0	\N
11378	2977	Fri	16:30:00	18:30:00	0	\N
11379	3105	Thu	10:00:00	12:30:00	1	\N
11380	3105	Thu	10:00:00	12:30:00	3	\N
11381	3047	Fri	16:30:00	18:00:00	0	\N
11382	3047	Tue	11:30:00	12:30:00	0	\N
11383	3047	Wed	09:30:00	10:30:00	0	\N
11384	3047	Thu	11:30:00	12:30:00	0	\N
11397	3081	Wed	15:00:00	17:00:00	0	\N
11414	4384	Mon	09:00:00	17:00:00	0	\N
11415	4384	Tue	09:00:00	17:00:00	0	\N
11416	4384	Wed	09:00:00	17:00:00	0	\N
11417	4384	Thu	09:00:00	17:00:00	0	\N
11418	4384	Fri	09:00:00	17:00:00	0	\N
11419	2982	Sat	08:30:00	10:00:00	3	\N
11421	3052	Fri	20:30:00	21:30:00	0	\N
11423	4051	Mon	10:00:00	14:00:00	0	\N
11424	4051	Tue	10:00:00	14:00:00	0	\N
11425	4051	Wed	10:00:00	14:00:00	0	\N
11426	4051	Thu	10:00:00	14:00:00	0	\N
11427	4051	Fri	10:00:00	14:00:00	0	\N
11428	4051	Sat	14:00:00	14:00:00	0	\N
11431	2919	Fri	15:30:00	17:00:00	0	\N
11433	3017	Mon	11:00:00	12:00:00	0	\N
11434	2912	Mon	16:30:00	18:30:00	0	\N
11435	2866	Thu	09:00:00	11:00:00	3	\N
11436	3171	Wed	11:00:00	13:00:00	0	\N
11437	2975	Sat	10:00:00	12:00:00	3	\N
11439	3029	Mon	10:00:00	13:30:00	0	\N
11440	3029	Tue	10:00:00	13:30:00	0	\N
11441	3029	Sun	09:00:00	12:00:00	0	\N
11442	3029	Wed	10:00:00	13:30:00	0	\N
11443	3029	Thu	10:00:00	13:30:00	0	\N
11445	2969	Wed	12:00:00	15:00:00	0	\N
11446	2906	Sun	12:30:00	14:00:00	4	\N
11447	2906	Sun	12:30:00	14:00:00	2	\N
11448	2911	Thu	18:00:00	19:30:00	4	\N
11449	2911	Thu	18:00:00	19:30:00	2	\N
11450	2873	Wed	08:30:00	12:00:00	2	\N
11451	2873	Wed	08:30:00	12:00:00	4	\N
11453	3013	Thu	19:30:00	20:15:00	2	\N
11457	2898	Fri	19:00:00	21:00:00	0	\N
11458	2898	Sun	11:00:00	13:00:00	0	\N
11459	2914	Sun	17:00:00	19:00:00	3	\N
11460	2914	Sun	17:00:00	19:00:00	1	\N
11461	2909	Thu	09:00:00	10:00:00	0	\N
11462	2913	Wed	16:00:00	18:00:00	0	\N
11463	2895	Wed	10:30:00	13:30:00	0	\N
11476	3018	Sat	08:00:00	10:30:00	0	\N
11477	3018	Fri	08:00:00	12:00:00	0	\N
11478	3018	Thu	08:00:00	12:00:00	0	\N
11479	3018	Wed	08:00:00	12:00:00	0	\N
11480	3018	Tue	08:00:00	12:00:00	0	\N
11481	3018	Mon	08:00:00	12:00:00	0	\N
11482	3018	Mon	13:00:00	15:00:00	0	\N
11483	3018	Tue	13:00:00	15:00:00	0	\N
11484	3018	Wed	13:00:00	15:00:00	0	\N
11485	3018	Thu	13:00:00	15:00:00	0	\N
11486	3018	Fri	13:00:00	15:00:00	0	\N
11487	3018	Sat	13:00:00	15:00:00	0	\N
11488	3132	Tue	09:00:00	10:30:00	0	\N
11489	3132	Mon	09:00:00	10:30:00	0	\N
11490	3132	Fri	09:00:00	10:30:00	0	\N
11491	3132	Thu	09:00:00	10:30:00	0	\N
11497	2923	Mon	09:00:00	11:00:00	0	\N
11498	2923	Thu	09:00:00	11:00:00	0	\N
11503	3043	Wed	10:00:00	15:30:00	0	\N
11504	3043	Mon	10:00:00	15:30:00	0	\N
11505	3043	Fri	10:00:00	15:30:00	0	\N
11506	3043	Tue	10:00:00	15:30:00	0	\N
11507	3157	Tue	06:00:00	10:00:00	4	\N
11508	3157	Tue	06:00:00	10:00:00	2	\N
11515	2949	Wed	10:00:00	12:00:00	0	\N
11516	2870	Sat	09:00:00	11:00:00	4	\N
11517	3131	Wed	18:00:00	19:30:00	0	\N
11522	3186	Sat	10:00:00	12:00:00	4	\N
11523	3186	Sat	10:00:00	12:00:00	2	\N
11524	2989	Sun	15:30:00	17:30:00	0	\N
11528	3166	Fri	09:00:00	09:30:00	0	\N
11529	3166	Mon	09:00:00	09:30:00	0	\N
11530	3166	Wed	09:00:00	09:30:00	0	\N
11536	4001	Mon	11:00:00	12:00:00	0	\N
11537	4001	Wed	11:00:00	12:00:00	0	\N
11538	4001	Fri	11:00:00	12:00:00	0	\N
11539	2903	Thu	10:30:00	13:00:00	3	\N
11543	2940	Sun	12:15:00	12:30:00	0	\N
11544	2940	Sun	13:45:00	14:15:00	0	\N
11545	2940	Sun	10:15:00	10:45:00	0	\N
11548	2950	Thu	10:00:00	11:30:00	2	\N
11549	2950	Thu	10:00:00	11:30:00	4	\N
11563	2957	Tue	08:00:00	09:00:00	0	\N
11564	2957	Fri	08:00:00	09:00:00	0	\N
11565	3058	Tue	20:30:00	21:30:00	0	\N
11573	4329	Sun	06:00:00	17:30:00	0	\N
11574	4329	Mon	06:00:00	17:30:00	0	\N
11575	4329	Tue	06:00:00	17:30:00	0	\N
11576	4329	Wed	06:00:00	17:30:00	0	\N
11577	4329	Thu	06:00:00	17:30:00	0	\N
11578	4329	Fri	06:00:00	17:30:00	0	\N
11579	4329	Sat	06:00:00	17:30:00	0	\N
11582	2985	Thu	16:00:00	18:00:00	0	\N
11585	4273	Mon	14:00:00	15:00:00	0	\N
11586	4273	Tue	14:00:00	15:00:00	0	\N
11587	4273	Wed	14:00:00	15:00:00	0	\N
11588	4273	Thu	14:00:00	15:00:00	0	\N
11589	4273	Fri	14:00:00	15:00:00	0	\N
11590	4273	Sat	14:00:00	15:00:00	0	\N
11591	2935	Fri	09:00:00	17:00:00	4	\N
11601	2921	Sat	09:00:00	11:00:00	3	\N
11602	2933	Tue	12:00:00	13:00:00	3	\N
11603	2922	Sat	08:30:00	10:30:00	1	\N
11604	2922	Sat	08:30:00	10:30:00	2	\N
11605	2922	Sat	08:30:00	10:30:00	4	\N
11607	3086	Sat	07:30:00	08:30:00	3	\N
12477	2934	Tue	08:00:00	17:00:00	0	\N
12478	2934	Wed	08:00:00	17:00:00	0	\N
12479	2934	Mon	08:00:00	17:00:00	0	\N
12480	2934	Thu	08:00:00	17:00:00	0	\N
12481	2934	Fri	08:00:00	17:00:00	0	\N
12564	4238	Thu	17:00:00	19:00:00	1	\N
12580	3064	Fri	10:00:00	11:30:00	1	\N
12581	3064	Fri	10:00:00	11:30:00	3	\N
12601	2861	Tue	09:00:00	12:00:00	2	\N
12602	2861	Tue	09:00:00	12:00:00	4	\N
12680	3150	Fri	13:00:00	14:00:00	0	\N
12739	3160	Tue	18:30:00	19:30:00	1	\N
12798	3055	Tue	09:00:00	11:00:00	0	\N
12799	3055	Thu	08:00:00	14:00:00	0	\N
12800	3055	Fri	08:00:00	14:00:00	0	\N
12801	3055	Sat	09:00:00	12:00:00	0	\N
12824	2886	Mon	18:30:00	20:30:00	0	\N
12842	4031	Wed	10:00:00	14:00:00	0	\N
12855	3002	Sat	18:30:00	19:30:00	0	\N
11707	3024	Mon	14:00:00	17:00:00	0	\N
11708	2860	Sat	08:30:00	09:00:00	4	\N
11719	4072	Fri	17:00:00	19:00:00	0	\N
11789	3015	Sat	11:00:00	12:30:00	3	\N
11795	4415	Sun	09:00:00	17:00:00	0	\N
11796	4415	Mon	09:00:00	17:00:00	0	\N
11797	4415	Tue	09:00:00	17:00:00	0	\N
11798	4415	Wed	09:00:00	17:00:00	0	\N
11799	4415	Thu	09:00:00	17:00:00	0	\N
11800	4415	Fri	09:00:00	17:00:00	0	\N
11801	4415	Sat	09:00:00	17:00:00	0	\N
11804	2889	Sat	09:00:00	12:00:00	3	\N
11805	3026	Sat	10:00:00	11:00:00	1	\N
11806	3026	Sat	10:00:00	11:00:00	3	\N
11814	3027	Wed	12:00:00	16:00:00	3	\N
11815	3159	Sat	07:00:00	09:00:00	3	\N
11816	3159	Sat	07:00:00	09:00:00	1	\N
11817	3159	Sat	07:00:00	09:00:00	2	\N
11818	2918	Sat	10:00:00	12:00:00	3	\N
11819	2918	Sat	12:00:00	13:00:00	1	\N
11820	2918	Sat	12:00:00	13:00:00	2	\N
11821	2918	Sat	12:00:00	13:00:00	4	\N
11826	4089	Wed	18:00:00	20:00:00	0	\N
11827	4089	Fri	18:00:00	20:00:00	0	\N
11828	4132	Fri	11:30:00	13:00:00	2	\N
11829	4132	Fri	11:30:00	13:00:00	4	\N
11832	4150	Mon	11:30:00	12:30:00	0	\N
11833	4150	Tue	11:30:00	12:30:00	0	\N
11834	4150	Wed	11:30:00	12:30:00	0	\N
11835	4150	Thu	11:30:00	12:30:00	0	\N
11836	4150	Fri	11:30:00	12:30:00	0	\N
11837	4203	Wed	10:00:00	12:00:00	2	\N
11838	4203	Wed	10:00:00	12:00:00	4	\N
11841	4022	Thu	11:00:00	12:00:00	2	\N
11842	4022	Thu	11:00:00	12:00:00	4	\N
11843	4147	Mon	16:00:00	19:00:00	0	\N
11844	4147	Thu	11:00:00	13:00:00	0	\N
11846	4417	Sat	10:00:00	12:00:00	0	\N
11847	4232	Mon	09:00:00	15:00:00	0	\N
11848	4232	Tue	09:00:00	15:00:00	0	\N
11849	4232	Wed	09:00:00	15:00:00	0	\N
11850	4232	Thu	09:00:00	15:00:00	0	\N
11851	4232	Fri	09:00:00	15:00:00	0	\N
11856	4020	Thu	09:00:00	11:00:00	0	\N
11857	4339	Wed	12:00:00	14:00:00	1	\N
11858	4339	Wed	12:00:00	14:00:00	3	\N
12566	3120	Sat	08:00:00	09:30:00	3	\N
12582	3034	Tue	09:00:00	10:00:00	-1	\N
12603	2958	Tue	08:00:00	18:30:00	0	\N
12604	2958	Mon	08:00:00	18:30:00	0	\N
12605	2958	Thu	08:00:00	18:30:00	0	\N
12606	2958	Fri	08:00:00	18:30:00	0	\N
11881	2937	Wed	10:30:00	11:30:00	1	\N
11882	2937	Wed	10:30:00	11:30:00	3	\N
11886	2883	Sat	11:00:00	13:30:00	0	\N
12668	4251	Mon	10:00:00	16:00:00	0	\N
11890	2946	Sat	09:00:00	12:00:00	4	\N
12669	4251	Tue	10:00:00	16:00:00	0	\N
11892	2947	Fri	08:00:00	09:30:00	0	\N
12670	4251	Wed	10:00:00	16:00:00	0	\N
12671	4251	Thu	10:00:00	16:00:00	0	\N
12672	4251	Fri	10:00:00	16:00:00	0	\N
11899	2961	Tue	08:30:00	13:00:00	0	\N
11900	2961	Wed	08:30:00	13:00:00	0	\N
11901	2961	Fri	08:30:00	13:00:00	0	\N
11902	2973	Sat	08:30:00	11:00:00	0	\N
11919	2976	Wed	11:00:00	12:00:00	4	\N
11920	2976	Mon	11:00:00	12:00:00	0	\N
11921	2976	Tue	11:00:00	12:00:00	0	\N
11922	2976	Wed	11:00:00	12:00:00	0	\N
11923	2976	Thu	11:00:00	12:00:00	0	\N
11924	2976	Fri	11:00:00	12:00:00	0	\N
11931	2984	Mon	10:00:00	12:00:00	0	\N
12778	2899	Fri	10:30:00	11:30:00	4	\N
12779	2899	Fri	10:30:00	11:30:00	2	\N
12785	2902	Wed	09:30:00	12:00:00	0	\N
12786	2902	Tue	09:30:00	12:00:00	0	\N
11942	4027	Mon	08:30:00	17:30:00	0	\N
11943	4027	Tue	08:30:00	17:30:00	0	\N
11944	4027	Wed	08:30:00	17:30:00	0	\N
11945	4027	Thu	08:30:00	17:30:00	0	\N
11946	4027	Fri	08:30:00	17:30:00	0	\N
12825	3125	Wed	17:00:00	19:00:00	0	\N
12826	3125	Thu	17:00:00	19:00:00	0	\N
11953	3127	Thu	10:00:00	14:00:00	0	\N
12856	3158	Sat	09:30:00	11:30:00	0	\N
12866	3041	Tue	11:30:00	13:30:00	4	\N
12867	3041	Tue	11:30:00	13:30:00	3	\N
12872	2956	Thu	10:00:00	11:00:00	0	\N
11979	4158	Wed	10:00:00	01:00:00	4	\N
11989	3094	Sat	10:00:00	14:00:00	0	\N
11995	3163	Tue	09:00:00	12:00:00	4	\N
12008	2888	Sat	10:00:00	11:00:00	0	\N
12041	4338	Tue	18:30:00	20:00:00	0	\N
12042	4338	Sun	14:30:00	16:00:00	0	\N
12043	4312	Mon	09:00:00	14:00:00	0	\N
12044	4312	Tue	09:00:00	14:00:00	0	\N
12045	4312	Wed	09:00:00	14:00:00	0	\N
12046	4312	Thu	09:00:00	14:00:00	0	\N
12047	4312	Fri	09:00:00	14:00:00	0	\N
12048	4372	Wed	11:00:00	12:30:00	0	\N
12049	4372	Thu	13:00:00	15:00:00	0	\N
12051	3178	Wed	11:00:00	13:00:00	0	\N
12058	2993	Thu	15:30:00	17:30:00	0	\N
12066	3129	Wed	09:00:00	16:00:00	0	\N
12067	3129	Mon	09:00:00	16:00:00	0	\N
12068	3129	Thu	09:00:00	16:00:00	0	\N
12069	3129	Fri	09:00:00	16:00:00	0	\N
12070	3129	Tue	09:00:00	16:00:00	0	\N
12071	2995	Fri	16:00:00	18:00:00	3	\N
12073	2891	Sat	11:00:00	12:00:00	3	\N
12074	2871	Sat	09:00:00	12:00:00	0	\N
12080	4239	Tue	10:30:00	03:00:00	0	\N
12081	4239	Wed	10:30:00	03:00:00	0	\N
12082	4239	Thu	10:30:00	03:00:00	0	\N
12083	4239	Fri	10:30:00	03:00:00	0	\N
12084	4239	Sun	10:30:00	03:00:00	0	\N
12086	2900	Sat	10:00:00	12:00:00	3	\N
12567	3191	Wed	17:00:00	19:00:00	2	\N
12089	2966	Wed	10:00:00	12:00:00	2	\N
12090	2966	Wed	10:00:00	12:00:00	4	\N
12568	3191	Sat	10:00:00	12:00:00	3	\N
12092	2980	Sat	09:00:00	12:00:00	1	\N
12583	2944	Sat	10:00:00	13:00:00	3	\N
12607	2910	Tue	18:00:00	20:00:00	0	\N
12096	2971	Sun	12:30:00	13:30:00	0	\N
12102	2905	Tue	08:00:00	18:00:00	0	\N
12103	2905	Wed	08:00:00	18:00:00	0	\N
12104	2905	Mon	08:00:00	18:00:00	0	\N
12105	2905	Thu	08:00:00	18:00:00	0	\N
12106	2905	Fri	08:00:00	17:00:00	0	\N
12651	2880	Tue	09:00:00	13:00:00	0	\N
12110	2967	Wed	09:00:00	11:30:00	0	\N
12111	2967	Fri	09:00:00	11:30:00	0	\N
12112	2967	Mon	13:00:00	15:30:00	0	\N
12652	2880	Wed	09:00:00	13:00:00	0	\N
12653	2880	Mon	09:00:00	13:00:00	0	\N
12654	2880	Thu	09:00:00	13:00:00	0	\N
12655	2880	Fri	09:00:00	13:00:00	0	\N
12673	4002	Mon	11:00:00	12:00:00	0	\N
12674	4002	Wed	11:00:00	12:00:00	0	\N
12675	4002	Fri	11:00:00	12:00:00	0	\N
12710	3199	Sat	15:00:00	16:45:00	4	\N
12711	3199	Sat	15:00:00	15:45:00	2	\N
12725	2884	Tue	09:00:00	12:00:00	3	\N
12817	4119	Mon	10:00:00	12:30:00	0	\N
12818	4119	Tue	14:00:00	16:30:00	0	\N
12819	4119	Wed	10:00:00	12:30:00	0	\N
12820	4119	Thu	14:00:00	16:30:00	0	\N
12155	2987	Thu	09:30:00	15:30:00	0	\N
12156	2987	Wed	14:00:00	18:00:00	0	\N
12159	2887	Wed	10:00:00	13:00:00	0	\N
12832	4255	Mon	09:00:00	17:00:00	0	\N
12833	4255	Tue	09:00:00	17:00:00	0	\N
12834	4255	Wed	09:00:00	17:00:00	0	\N
12835	4255	Thu	09:00:00	17:00:00	0	\N
12836	4255	Fri	09:00:00	17:00:00	0	\N
12844	3033	Thu	18:00:00	19:00:00	0	\N
12873	4289	Mon	06:00:00	15:00:00	0	\N
12874	4289	Tue	06:00:00	15:00:00	0	\N
12875	4289	Wed	06:00:00	15:00:00	0	\N
12876	4289	Thu	06:00:00	15:00:00	0	\N
12877	4289	Fri	06:00:00	15:00:00	0	\N
12178	3087	Mon	10:00:00	15:00:00	0	\N
12179	3087	Wed	10:00:00	15:00:00	0	\N
12180	3087	Thu	10:00:00	15:00:00	0	\N
12181	3087	Fri	10:00:00	12:00:00	0	\N
12182	3087	Tue	10:00:00	15:00:00	0	\N
12204	4088	Thu	16:00:00	18:00:00	2	\N
12205	4088	Thu	16:00:00	18:00:00	4	\N
12206	4088	Thu	09:00:00	11:00:00	3	\N
12213	2920	Thu	09:30:00	13:00:00	4	\N
12214	2920	Thu	09:30:00	13:00:00	2	\N
12215	4028	Mon	08:00:00	14:30:00	0	\N
12216	4028	Tue	08:00:00	14:30:00	0	\N
12217	4028	Wed	08:00:00	14:30:00	0	\N
12218	4028	Thu	08:00:00	14:30:00	0	\N
12219	4028	Fri	08:00:00	14:30:00	0	\N
12239	3053	Wed	09:00:00	12:00:00	0	\N
12241	4035	Sat	10:00:00	12:00:00	0	\N
12254	3045	Thu	12:00:00	17:00:00	0	\N
\.


--
-- TOC entry 3219 (class 0 OID 19428)
-- Dependencies: 225
-- Data for Name: stakeholder_season; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.stakeholder_season (id, stakeholder_id, name, start_date, end_date) FROM stdin;
\.


--
-- TOC entry 3221 (class 0 OID 19437)
-- Dependencies: 227
-- Data for Name: stakeholderbu; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.stakeholderbu (id, name, address_1, address_2, city, state, zip, phone, latitude, longitude, website, daycode, open, close, daycode1, day1_open, day1_close, daycode2, day2_open, day2_close, daycode3, day3_open, day3_close, daycode4, day4_open, day4_close, daycode5, day5_open, day5_close, daycode6, day6_open, day6_close, daycode7, day7_open, day7_close, year_round, season_open, season_close, fm_id, notes, created_date, created_login_id, modified_date, modified_login_id, submitted_date, submitted_login_id, requirements, admin_notes, inactive, parent_organization, physical_access, email, items, services, facebook, twitter, pinterest, linkedin, description, approved_date, reviewed_login_id, assigned_login_id, agency_type, assigned_date, rejected_date, review_notes, claimed_login_id, claimed_date, instagram, admin_contact_name, admin_contact_phone, admin_contact_email, donation_contact_name, donation_contact_phone, donation_contact_email, donation_pickup, donation_accept_frozen, donation_accept_refrigerated, donation_accept_perishable, donation_schedule, donation_delivery_instructions, covid_notes, donation_notes, category_notes, eligibility_notes, food_types, languages, v_name, v_categories, v_address, v_email, v_phone, v_hours, verification_status_id) FROM stdin;
\.


--
-- TOC entry 3222 (class 0 OID 19480)
-- Dependencies: 228
-- Data for Name: updated_stakeholders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.updated_stakeholders (id, name, modified_date, verified_date) FROM stdin;
\.


--
-- TOC entry 3223 (class 0 OID 19486)
-- Dependencies: 229
-- Data for Name: verification_status; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.verification_status (id, name, code) FROM stdin;
\.


--
-- TOC entry 3224 (class 0 OID 19492)
-- Dependencies: 230
-- Data for Name: webinar_stakeholder; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.webinar_stakeholder (id, name, address_1, address_2, city, state, zip, phone, latitude, longitude, website, daycode, open, close, daycode1, day1_open, day1_close, daycode2, day2_open, day2_close, daycode3, day3_open, day3_close, daycode4, day4_open, day4_close, daycode5, day5_open, day5_close, daycode6, day6_open, day6_close, daycode7, day7_open, day7_close, year_round, season_open, season_close, fm_id, notes, created_date, created_login_id, modified_date, modified_login_id, verified_date, verified_login_id, requirements, admin_notes, inactive, parent_organization, physical_access, email, items, services, facebook, twitter, pinterest, linkedin, description, agency_type) FROM stdin;
\.


--
-- TOC entry 3225 (class 0 OID 19512)
-- Dependencies: 231
-- Data for Name: webinar_stakeholder_category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.webinar_stakeholder_category (stakeholder_id, category_id) FROM stdin;
\.


--
-- TOC entry 3227 (class 0 OID 19517)
-- Dependencies: 233
-- Data for Name: webinar_stakeholder_schedule; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.webinar_stakeholder_schedule (id, stakeholder_id, day_of_week, open, close, week_of_month, season_id) FROM stdin;
\.


--
-- TOC entry 3246 (class 0 OID 0)
-- Dependencies: 206
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.category_id_seq', 6, true);


--
-- TOC entry 3247 (class 0 OID 0)
-- Dependencies: 209
-- Name: faq_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.faq_id_seq', 19, true);


--
-- TOC entry 3248 (class 0 OID 0)
-- Dependencies: 215
-- Name: login_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.login_id_seq', 169, true);


--
-- TOC entry 3249 (class 0 OID 0)
-- Dependencies: 216
-- Name: organizations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.organizations_id_seq', 327, true);


--
-- TOC entry 3250 (class 0 OID 0)
-- Dependencies: 221
-- Name: stakeholder_donor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.stakeholder_donor_id_seq', 1, false);


--
-- TOC entry 3251 (class 0 OID 0)
-- Dependencies: 222
-- Name: stakeholder_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.stakeholder_id_seq', 4456, true);


--
-- TOC entry 3252 (class 0 OID 0)
-- Dependencies: 224
-- Name: stakeholder_schedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.stakeholder_schedule_id_seq', 12888, true);


--
-- TOC entry 3253 (class 0 OID 0)
-- Dependencies: 226
-- Name: stakeholder_season_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.stakeholder_season_id_seq', 69, true);


--
-- TOC entry 3254 (class 0 OID 0)
-- Dependencies: 232
-- Name: webinar_stakeholder_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.webinar_stakeholder_id_seq', 1, false);


--
-- TOC entry 3255 (class 0 OID 0)
-- Dependencies: 234
-- Name: webinar_stakeholder_schedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.webinar_stakeholder_schedule_id_seq', 1, false);


--
-- TOC entry 3043 (class 2606 OID 19772)
-- Name: category category_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pk PRIMARY KEY (id);


--
-- TOC entry 3045 (class 2606 OID 19774)
-- Name: day_of_week day_of_week_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.day_of_week
    ADD CONSTRAINT day_of_week_pk PRIMARY KEY (name);


--
-- TOC entry 3047 (class 2606 OID 19776)
-- Name: load_lapl_food_resource load_lapl_food_resource_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.load_lapl_food_resource
    ADD CONSTRAINT load_lapl_food_resource_pk PRIMARY KEY (name, addr);


--
-- TOC entry 3049 (class 2606 OID 19778)
-- Name: load_larfb load_larfb_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.load_larfb
    ADD CONSTRAINT load_larfb_pk PRIMARY KEY (lar_code);


--
-- TOC entry 3052 (class 2606 OID 19780)
-- Name: login pk_login; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.login
    ADD CONSTRAINT pk_login PRIMARY KEY (id);


--
-- TOC entry 3058 (class 2606 OID 19782)
-- Name: stakeholder_category stakeholder_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stakeholder_category
    ADD CONSTRAINT stakeholder_category_pkey PRIMARY KEY (stakeholder_id, category_id);


--
-- TOC entry 3060 (class 2606 OID 19784)
-- Name: stakeholder_donor stakeholder_donor_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stakeholder_donor
    ADD CONSTRAINT stakeholder_donor_pk PRIMARY KEY (id);


--
-- TOC entry 3056 (class 2606 OID 19786)
-- Name: stakeholder stakeholder_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stakeholder
    ADD CONSTRAINT stakeholder_pk PRIMARY KEY (id);


--
-- TOC entry 3062 (class 2606 OID 19788)
-- Name: stakeholder_schedule stakeholder_schedule_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stakeholder_schedule
    ADD CONSTRAINT stakeholder_schedule_pk PRIMARY KEY (id);


--
-- TOC entry 3064 (class 2606 OID 19790)
-- Name: stakeholder_season stakeholder_season_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stakeholder_season
    ADD CONSTRAINT stakeholder_season_pk PRIMARY KEY (id);


--
-- TOC entry 3054 (class 2606 OID 19792)
-- Name: security_token token_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.security_token
    ADD CONSTRAINT token_pk PRIMARY KEY (token);


--
-- TOC entry 3066 (class 2606 OID 19794)
-- Name: verification_status verification_status_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verification_status
    ADD CONSTRAINT verification_status_pk PRIMARY KEY (id);


--
-- TOC entry 3070 (class 2606 OID 19796)
-- Name: webinar_stakeholder_category webinar_stakeholder_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.webinar_stakeholder_category
    ADD CONSTRAINT webinar_stakeholder_category_pkey PRIMARY KEY (stakeholder_id, category_id);


--
-- TOC entry 3068 (class 2606 OID 19798)
-- Name: webinar_stakeholder webinar_stakeholder_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.webinar_stakeholder
    ADD CONSTRAINT webinar_stakeholder_pk PRIMARY KEY (id);


--
-- TOC entry 3072 (class 2606 OID 19800)
-- Name: webinar_stakeholder_schedule webinar_stakeholder_schedule_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.webinar_stakeholder_schedule
    ADD CONSTRAINT webinar_stakeholder_schedule_pk PRIMARY KEY (id);


--
-- TOC entry 3050 (class 1259 OID 19801)
-- Name: login_email_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX login_email_idx ON public.login USING btree (email);


-- Completed on 2020-06-01 15:52:24

--
-- PostgreSQL database dump complete
--

