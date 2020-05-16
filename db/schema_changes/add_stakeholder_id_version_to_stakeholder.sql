BEGIN;

-- add new columns: stakeholder_id and version
-- initially we need to allow stakeholder_id to be null, until we backfill it
ALTER TABLE stakeholder
ADD COLUMN stakeholder_id int4;
ALTER TABLE stakeholder
ADD COLUMN version int4 NOT NULL DEFAULT 1;

-- add a unique index on stakeholder_id and version
ALTER TABLE stakeholder
ADD CONSTRAINT stakeholder_id_version UNIQUE (stakeholder_id, version);

-- backfill stakeholder_id to equal current id
update stakeholder set stakeholder_id = id;

--make stakeholder_id not null
ALTER TABLE stakeholder ALTER COLUMN stakeholder_id SET NOT NULL;

COMMIT;

