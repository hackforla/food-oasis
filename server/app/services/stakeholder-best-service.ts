import {
  StakeholderCategory,
  StakeholderBestSearchParams,
  StakeholderBest,
  FoodSeekerStakeholder,
} from "../../types/stakeholder-types";
import db from "./db";
import stakeholderHelpers from "./stakeholder-helpers";
import camelcaseKeys from "camelcase-keys";

/*

This service is for getting data from the stakeholder_best table, which
is what we want for the food seeker UI. It represents the "best" version of
each stakeholder to show end users, which is either the last approved version
(as indicated by is_verified = true) or if no version of the stakeholder
record has been approved, it will be the most recent version (i.e., have
  the same values as the stakeholder table for that id.)

If you make changes to the database structure, be sure to update these
methods as well as the corresponding methods in the stakeholder-service.js.

You can search by max/min lat, lng bounds or by a center and radius(distance),
with bounds taking precedence.

*/

const booleanEitherClause = (columnName: string, value?: string) => {
  return value === "true"
    ? ` and ${columnName} is true `
    : value === "false"
    ? ` and ${columnName} is false `
    : "";
};

const selectAll = async ({ tenantId }: { tenantId: string }) => {
  const sql = `
  SELECT 
  s.id, s.name, s.address_1, s.address_2, s.city, s.state, s.zip,
  s.phone, s.latitude, s.longitude, s.website,  s.notes,
  to_char(s.created_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS')
    as created_date, 
  to_char(s.modified_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS')
    as modified_date,
  to_char(s.approved_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS')
    as approved_date, 
  s.requirements, s.inactive,
  s.parent_organization, s.physical_access, s.email,
  s.items, s.services, s.facebook,
  s.twitter, s.pinterest, s.linkedin, s.description,
  s.review_notes, s.instagram, s.admin_contact_name,
  s.admin_contact_phone, s.admin_contact_email,
  s.covid_notes, s.food_types, s.languages,
  s.verification_status_id, s.inactive_temporary,
  array_to_json(s.hours) as hours, s.category_ids,
  s.neighborhood_id, n.name as neighborhood_name, s.is_verified,
  s.parent_organization_id,
  s.allow_walkins, s.hours_notes, s.tags
  FROM stakeholder_best s
  LEFT JOIN neighborhood n on s.neighborhood_id = n.id
  WHERE 1 = ANY(s.category_ids)
  OR 9 = ANY(s.category_ids)
  AND s.tenant_id = ${tenantId}
  `;

  const stakeholders: FoodSeekerStakeholder[] = [];
  let categories: StakeholderCategory[] = [];

  const rows = await db.manyOrNone(sql);
  const stakeholder_ids = rows.map((a) => a.id);
  if (stakeholder_ids.length) {
    // Hoover up all the stakeholder categories
    // for all of our stakeholder row results.
    const categoriesSql = `select sc.stakeholder_id, c.id, c.name, c.display_order
          from category c
          join stakeholder_best_category sc on c.id = sc.category_id
          where sc.stakeholder_id in (${stakeholder_ids.join(",")})
          order by c.display_order, c.name`;
    categories = await db.manyOrNone(categoriesSql);
  }

  rows.forEach((row) => {
    stakeholders.push({
      ...camelcaseKeys(row),
      isVerified: row.is_verified,
      categories: categories
        .filter((cr) => cr.stakeholder_id === row.id)
        .map((c) => {
          return { id: c.id, name: c.name, displayOrder: c.display_order };
        }),
    });
  });
  return stakeholders;
};

const search = async ({
  categoryIds,
  latitude,
  longitude,
  distance,
  maxLat,
  maxLng,
  minLat,
  minLng,
  isInactive,
  verificationStatusId,
  tenantId,
  name,
  neighborhoodId,
  tag,
}: StakeholderBestSearchParams): Promise<StakeholderBest[]> => {
  const locationClause = buildLocationClause(latitude, longitude);
  const categoryClause = buildCTEClause(categoryIds, name || "");
  const sql = `${categoryClause}
    select s.id, s.name, s.address_1, s.address_2, s.city, s.state, s.zip,
    s.phone, s.latitude, s.longitude, s.website,  s.notes,
    to_char(s.created_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS')
      as created_date, s.created_login_id,
    to_char(s.modified_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS')
      as modified_date, s.modified_login_id,
    to_char(s.submitted_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS')
      as submitted_date, s.submitted_login_id,
    to_char(s.approved_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS')
      as approved_date, s.reviewed_login_id,
    to_char(s.assigned_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS')
      as assigned_date, s.assigned_login_id,
    to_char(s.created_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS')
      as claimed_date, s.claimed_login_id,
    s.requirements, s.admin_notes, s.inactive,
    s.parent_organization, s.physical_access, s.email,
    s.items, s.services, s.facebook,
    s.twitter, s.pinterest, s.linkedin, s.description,
    s.review_notes, s.instagram, s.admin_contact_name,
    s.admin_contact_phone, s.admin_contact_email,
    s.donation_contact_name, s.donation_contact_phone,
    s.donation_contact_email, s.donation_pickup,
    s.donation_accept_frozen, s.donation_accept_refrigerated,
    s.donation_accept_perishable, s.donation_schedule,
    s.donation_delivery_instructions, s.donation_notes, s.covid_notes,
    s.category_notes, s.eligibility_notes, s.food_types, s.languages,
    s.v_name, s.v_categories, s.v_address, s.v_phone, s.v_email,
    s.v_hours, s.v_food_types, s.verification_status_id, s.inactive_temporary,
    array_to_json(s.hours) as hours, s.category_ids,
    s.neighborhood_id, n.name as neighborhood_name, s.is_verified,
    s.food_bakery, s.food_dry_goods, s.food_produce,
    s.food_dairy, s.food_prepared, s.food_meat,
    s.parent_organization_id,
    s.allow_walkins, s.hours_notes, s.tags,
    ${locationClause ? `${locationClause} AS distance,` : ""}
    ${buildLoginSelectsClause()}
    from stakeholder_set as s
    left outer join neighborhood n on s.neighborhood_id = n.id
    ${buildLoginJoinsClause()}
    where s.tenant_id = ${tenantId}
    ${
      maxLat && maxLng && minLat && minLng
        ? buildBounds({ maxLat, maxLng, minLat, minLng })
        : Number(distance) && locationClause
        ? `AND ${locationClause} < ${distance}`
        : ""
    }
    ${booleanEitherClause("s.inactive", isInactive)}
    ${
      Number(verificationStatusId) > 0
        ? ` and s.verification_status_id = ${verificationStatusId} `
        : ""
    }
    ${
      Number(neighborhoodId) > 0
        ? ` and s.neighborhood_id = ${neighborhoodId} `
        : ""
    }
    ${tag ? ` and '${tag}' = ANY (s.tags) ` : ""}
    order by distance
  `;
  const stakeholders: StakeholderBest[] = [];
  let categories: StakeholderCategory[] = [];

  const rows = await db.manyOrNone(sql);
  const stakeholder_ids = rows.map((a) => a.id);

  if (stakeholder_ids.length) {
    // Hoover up all the stakeholder categories
    // for all of our stakeholder row results.
    const categoriesSql = `select sc.stakeholder_id, c.id, c.name, c.display_order
          from category c
          join stakeholder_best_category sc on c.id = sc.category_id
          where sc.stakeholder_id in (${stakeholder_ids.join(",")})
          order by c.display_order, c.name`;
    categories = await db.manyOrNone(categoriesSql);
  }

  rows.forEach((row) => {
    stakeholders.push({
      ...stakeholderHelpers.rowToStakeholder(
        row,
        categories
          .filter((cr) => cr.stakeholder_id === row.id)
          .map((c) => {
            return { id: c.id, name: c.name, displayOrder: c.display_order };
          })
      ),
      isVerified: row.is_verified,
      distance: row.distance,
    });
  });
  return stakeholders;
};

const selectById = async (id: string): Promise<StakeholderBest> => {
  const sql = `select
      s.id, s.name, s.address_1, s.address_2, s.city, s.state, s.zip,
      s.phone, s.latitude, s.longitude, s.website,  s.notes,
      array_to_json(s.hours) as hours,
      (select array(select row_to_json(category_row)
        from (
          select c.id, c.name, c.display_order
          from category c
            join stakeholder_best_category sc on c.id = sc.category_id
          where sc.stakeholder_id = s.id
          order by c.display_order
        ) category_row
      )) as categories,
      to_char(s.created_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS') as created_date, s.created_login_id,
      to_char(s.modified_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS') as modified_date, s.modified_login_id,
      to_char(s.submitted_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS') as submitted_date, s.submitted_login_id,
      to_char(s.approved_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS') as approved_date, s.reviewed_login_id,
      to_char(s.assigned_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS')as assigned_date, s.assigned_login_id,
      to_char(s.created_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS') as claimed_date, s.claimed_login_id,
      s.requirements::varchar, s.admin_notes, s.inactive,
      s.parent_organization, s.physical_access, s.email,
      s.items, s.services, s.facebook,
      s.twitter, s.pinterest, s.linkedin, s.description,
      s.review_notes, s.instagram, s.admin_contact_name,
      s.admin_contact_phone, s.admin_contact_email,
      s.donation_contact_name, s.donation_contact_phone,
      s.donation_contact_email, s.donation_pickup,
      s.donation_accept_frozen, s.donation_accept_refrigerated,
      s.donation_accept_perishable, s.donation_schedule,
      s.donation_delivery_instructions, s.donation_notes, s.covid_notes,
      s.category_notes, s.eligibility_notes, s.food_types, s.languages,
      s.v_name, s.v_categories, s.v_address, s.v_phone, s.v_email,
      s.v_hours, s.v_food_types, s.verification_status_id, s.inactive_temporary,
      s.neighborhood_id,  n.name as neighborhood_name, s.is_verified,
      s.food_bakery, s.food_dry_goods, s.food_produce,
      s.food_dairy, s.food_prepared, s.food_meat,
      s.parent_organization_id,
      s.allow_walkins, s.hours_notes, s.tags,
      ${buildLoginSelectsClause()}
    from stakeholder_best s
    left outer join neighborhood n on s.neighborhood_id = n.id
    ${buildLoginJoinsClause()}
    where s.id = ${Number(id)}`;
  const row = await db.one(sql);

  return {
    ...stakeholderHelpers.rowToStakeholder(row),
    isVerified: row.is_verified,
    distance: row.distance,
  };
};

const buildCTEClause = (categoryIds: string[], name: string) => {
  const categoryClause = categoryIds
    ? `stakeholder_category_set AS (
       select * from stakeholder_best_category
       where stakeholder_best_category.category_id in (${categoryIds.join(
         ","
       )})),`
    : "";
  const nameClause = "'%" + name.replace(/'/g, "''") + "%'";
  const cteClause = `WITH ${categoryClause}
  stakeholder_set AS (
    select * from stakeholder_best
    where name ilike ${nameClause}
    and id in (
      select stakeholder_id from stakeholder_category_set
    )
  )`;
  return cteClause;
};

const buildLocationClause = (latitude: string, longitude: string) => {
  let locationClause = "";
  if (latitude && longitude) {
    locationClause =
      " point(" +
      longitude +
      ", " +
      latitude +
      ") <@> point(s.longitude, s.latitude) ";
  }
  return locationClause;
};

const buildBounds = ({
  maxLat,
  maxLng,
  minLat,
  minLng,
}: Pick<
  StakeholderBestSearchParams,
  "maxLat" | "maxLng" | "minLat" | "minLng"
>) => {
  return `
    AND s.latitude BETWEEN ${minLat} AND ${maxLat}
    AND s.longitude BETWEEN ${minLng} AND ${maxLng}
  `;
};

const buildLoginJoinsClause = () => {
  return `
    left join login L1 on s.created_login_id = L1.id
    left join login L2 on s.modified_login_id = L2.id
    left join login L3 on s.submitted_login_id = L3.id
    left join login L4 on s.reviewed_login_id = L4.id
    left join login L5 on s.assigned_login_id = L5.id
    left join login L6 on s.claimed_login_id = L6.id
  `;
};

const buildLoginSelectsClause = () => {
  return `
    concat(L1.first_name, ' ', L1.last_name) as created_user,
    concat(L2.first_name, ' ', L2.last_name) as modified_user,
    concat(L3.first_name, ' ', L3.last_name) as submitted_user,
    concat(L4.first_name, ' ', L4.last_name) as reviewed_user,
    concat(L5.first_name, ' ', L5.last_name) as assigned_user,
    concat(L6.first_name, ' ', L6.last_name) as claimed_user
  `;
};

export default {
  selectAll,
  search,
  selectById,
};
