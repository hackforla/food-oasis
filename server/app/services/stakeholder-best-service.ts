import {
  StakeholderCategory,
  StakeholderBestSearchParams,
  StakeholderBest,
} from "../../types/stakeholder-types";
import db from "./db";
import stakeholderHelpers from "./stakeholder-helpers";

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
    // stakeholders.push({
    //   address1: row.address_1 || "",
    //   address2: row.address_2 || "",
    //   adminContactEmail: row.admin_contact_email || "",
    //   adminContactName: row.admin_contact_name || "",
    //   adminContactPhone: row.admin_contact_phone || "",
    //   adminNotes: row.admin_notes || "",
    //   allowWalkins: row.allow_walkins,
    //   approvedDate: row.approved_date,
    //   assignedDate: row.assigned_date,
    //   assignedLoginId: row.assigned_login_id,
    //   assignedUser: row.assigned_user || "",
    //   categories: categories.filter((cat) => cat.stakeholder_id === row.id),
    //   categoryNotes: row.category_notes || "",
    //   city: row.city || "",
    //   claimedDate: row.claimed_date,
    //   claimedLoginId: row.claimed_login_id,
    //   claimedUser: row.claimed_user || "",
    //   confirmedAddress: row.v_address,
    //   confirmedCategories: row.v_categories,
    //   confirmedEmail: row.v_email,
    //   confirmedFoodTypes: row.v_food_types,
    //   confirmedHours: row.v_hours,
    //   confirmedName: row.v_name,
    //   confirmedPhone: row.v_phone,
    //   covidNotes: row.covid_notes || "",
    //   createdDate: row.created_date,
    //   createdLoginId: row.created_login_id,
    //   createdUser: row.created_user || "",
    //   description: row.description,
    //   distance: Number(row.distance) ? Number(row.distance) : 0,
    //   donationAcceptFrozen: row.donation_accept_frozen || false,
    //   donationAcceptPerishable: row.donation_accept_perishable || false,
    //   donationAcceptRefrigerated: row.donation_accept_refrigerated || false,
    //   donationContactEmail: row.donation_contact_email || "",
    //   donationContactName: row.donation_contact_name || "",
    //   donationContactPhone: row.donation_contact_phone || "",
    //   donationDeliveryInstructions: row.donation_delivery_instructions || "",
    //   donationNotes: row.donation_notes || "",
    //   donationPickup: row.donation_pickup || false,
    //   donationSchedule: row.donation_schedule || "",
    //   eligibilityNotes: row.eligibility_notes || "",
    //   email: row.email || "",
    //   facebook: row.facebook || "",
    //   foodBakery: row.food_bakery,
    //   foodDairy: row.food_dairy,
    //   foodDryGoods: row.food_dry_goods,
    //   foodMeat: row.food_meat,
    //   foodPrepared: row.food_prepared,
    //   foodProduce: row.food_produce,
    //   foodTypes: row.food_types || "",
    //   hours: row.hours || [],
    //   hoursNotes: row.hours_notes,
    //   id: row.id,
    //   inactive: row.inactive,
    //   inactiveTemporary: row.inactive_temporary,
    //   instagram: row.instagram || "",
    //   isVerified: row.is_verified,
    //   items: row.items || "",
    //   languages: row.languages || "",
    //   latitude: Number(row.latitude) ? Number(row.latitude) : null,
    //   linkedin: row.linkedin || "",
    //   longitude: Number(row.longitude) ? Number(row.longitude) : null,
    //   modifiedDate: row.modified_date,
    //   modifiedLoginId: row.modified_login_id,
    //   modifiedUser: row.modified_user || "",
    //   name: row.name || "",
    //   neighborhoodId: row.neighborhood_id,
    //   notes: row.notes || "",
    //   parentOrganization: row.parent_organization || "",
    //   parentOrganizationId: row.parent_organization_id,
    //   phone: row.phone || "",
    //   physicalAccess: row.physical_access || "",
    //   pinterest: row.pinterest || "",
    //   requirements: row.requirements || "",
    //   reviewedLoginId: row.reviewed_login_id,
    //   reviewedUser: row.reviewed_user || "",
    //   reviewNotes: row.review_notes,
    //   services: row.services || "",
    //   state: row.state || "",
    //   submittedDate: row.submitted_date,
    //   submittedLoginId: row.submitted_login_id,
    //   submittedUser: row.submitted_user || "",
    //   tags: row.tags,
    //   twitter: row.twitter || "",
    //   verificationStatusId: row.verification_status_id,
    //   website: row.website || "",
    //   zip: row.zip || "",
    // });
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

  // const stakeholder = {
  //   id: row.id,
  //   name: row.name || "",
  //   address1: row.address_1 || "",
  //   address2: row.address_2 || "",
  //   city: row.city || "",
  //   state: row.state || "",
  //   zip: row.zip || "",
  //   phone: row.phone || "",
  //   latitude: row.latitude ? Number(row.latitude) : null,
  //   longitude: row.longitude ? Number(row.longitude) : null,
  //   website: row.website || "",
  //   createdDate: row.created_date,
  //   notes: row.notes || "",
  //   createdLoginId: row.created_login_id,
  //   modifiedDate: row.modified_date,
  //   modifiedLoginId: row.modified_login_id,
  //   submittedDate: row.submitted_date,
  //   submittedLoginId: row.submitted_login_id,
  //   approvedDate: row.approved_date,
  //   reviewedLoginId: row.approved_login_id,
  //   assignedLoginId: row.assigned_login_id,
  //   assignedDate: row.assigned_date,
  //   claimedLoginId: row.claimed_login_id,
  //   claimedDate: row.claimed_date,
  //   requirements: row.requirements || "",
  //   adminNotes: row.admin_notes || "",
  //   inactive: row.inactive,
  //   createdUser: row.created_user || "",
  //   modifiedUser: row.modified_user || "",
  //   submittedUser: row.submitted_user || "",
  //   reviewedUser: row.reviewed_user || "",
  //   assignedUser: row.assigned_user || "",
  //   claimedUser: row.claimed_user || "",
  //   categories: row.categories,
  //   hours: row.hours,
  //   parentOrganization: row.parent_organization || "",
  //   physicalAccess: row.physical_access || "",
  //   email: row.email || "",
  //   items: row.items || "",
  //   services: row.services || "",
  //   facebook: row.facebook || "",
  //   twitter: row.twitter || "",
  //   pinterest: row.pinterest || "",
  //   linkedin: row.linkedin || "",
  //   description: row.description,
  //   reviewNotes: row.review_notes,
  //   instagram: row.instagram || "",
  //   adminContactName: row.admin_contact_name || "",
  //   adminContactPhone: row.admin_contact_phone || "",
  //   adminContactEmail: row.admin_contact_email || "",
  //   donationContactName: row.donation_contact_name || "",
  //   donationContactPhone: row.donation_contact_phone || "",
  //   donationContactEmail: row.donation_contact_email || "",
  //   donationPickup: row.donation_pickup || false,
  //   donationAcceptFrozen: row.donation_accept_frozen || false,
  //   donationAcceptRefrigerated: row.donation_accept_refrigerated || false,
  //   donationAcceptPerishable: row.donation_accept_perishable || false,
  //   donationSchedule: row.donation_schedule || "",
  //   donationDeliveryInstructions: row.donation_delivery_instructions || "",
  //   donationNotes: row.donation_notes || "",
  //   covidNotes: row.covid_notes || "",
  //   categoryNotes: row.category_notes || "",
  //   eligibilityNotes: row.eligibility_notes || "",
  //   foodBakery: row.food_bakery,
  //   foodDryGoods: row.food_dry_goods,
  //   foodProduce: row.food_produce,
  //   foodDairy: row.food_dairy,
  //   foodPrepared: row.food_prepared,
  //   foodMeat: row.food_meat,
  //   foodTypes: row.food_types || "",
  //   languages: row.languages || "",
  //   confirmedName: row.v_name,
  //   confirmedCategories: row.v_categories,
  //   confirmedAddress: row.v_address,
  //   confirmedPhone: row.v_phone,
  //   confirmedEmail: row.v_email,
  //   confirmedHours: row.v_hours,
  //   confirmedFoodTypes: row.v_food_types,
  //   verificationStatusId: row.verification_status_id,
  //   inactiveTemporary: row.inactive_temporary,
  //   neighborhoodId: row.neighborhood_id,
  //   isVerified: row.is_verified,
  //   parentOrganizationId: row.parent_organization_id,
  //   allowWalkins: row.allow_walkins,
  //   hoursNotes: row.hours_notes,
  //   tags: row.tags,
  //   // Don't have a distance, since we didn't specify origin
  //   distance: 0,
  // };

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
  search,
  selectById,
};
