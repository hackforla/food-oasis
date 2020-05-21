BEGIN;

-- rename id to stakeholder_version_id
ALTER TABLE stakeholder
RENAME COLUMN id TO stakeholder_version_id;

-- add a new id column (which used to be stakeholder_id)
-- add new columns: id and version
-- initially we need to allow id to be null, until we backfill it
ALTER TABLE stakeholder
ADD COLUMN id int4;
ALTER TABLE stakeholder
ADD COLUMN version int4 NOT NULL DEFAULT 1;

-- add a unique index on stakeholder_id and version
ALTER TABLE stakeholder
ADD CONSTRAINT stakeholder_id_version UNIQUE (id, version);

-- backfill id to equal current stakeholder_version_id
update stakeholder set id = stakeholder_version_id;

--make id not null
ALTER TABLE stakeholder ALTER COLUMN id SET NOT NULL;

COMMIT;
