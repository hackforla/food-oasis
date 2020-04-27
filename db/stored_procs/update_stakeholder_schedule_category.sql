
-- drop previous stored proc and stakeholder_hours datatype (to prevent errors if recreating this proc)
drop type stakeholder_hours CASCADE;

-- handy struct to represent the various fields we'll need to set in the stakeholder hours table
CREATE TYPE stakeholder_hours AS (week_of_month INT, day_of_week VARCHAR, open VARCHAR, close VARCHAR);

CREATE OR REPLACE PROCEDURE update_stakeholder_schedule_category(s_id INT, categories INT[], hours_array stakeholder_hours[])
AS $$
DECLARE cat INT;
DECLARE hours_element stakeholder_hours;
BEGIN
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
