const db = require("./db");
const camelcaseKeys = require("camelcase-keys");

/* 
This service is for getting data from the stakeholder table, which
is what we want for the administration UI. It represents the most recent
draft version of each stakeholder for data entry and administrators
to work with.

If you make changes to the database structure, be sure to update these
methods as well as the corresponding methods in the stakeholder-best-service.js.
*/

const trueFalseEitherClause = (columnName, value) => {
  return value === "true"
    ? ` and ${columnName} is not null `
    : value === "false"
    ? ` and ${columnName} is null `
    : "";
};

const booleanEitherClause = (columnName, value) => {
  return value === "true"
    ? ` and ${columnName} is true `
    : value === "false"
    ? ` and ${columnName} is false `
    : "";
};

const search = async (params) => {
  const {
    tenantId,
    name,
    categoryIds,
    isInactive,
    isAssigned,
    isSubmitted,
    isApproved,
    isClaimed,
    assignedLoginId,
    claimedLoginId,
    verificationStatusId,
    latitude,
    longitude,
    distance,
    isInactiveTemporary,
    stakeholderId,
    neighborhoodId,
    minCompleteCriticalPercent,
    maxCompleteCriticalPercent,
  } = params;

  const locationClause = buildLocationClause(latitude, longitude);
  const categoryClause = buildCTEClause(categoryIds, name || "", false);
  // false means search stakeholder table, not stakeholder_best, since this is
  // for the administrative dashboard

  const sql = `${categoryClause}
    select s.id, s.name, s.address_1, s.address_2, s.city, s.state, s.zip,
      s.phone, s.latitude, s.longitude, s.website,
      (select array(select row_to_json(category_row)
        from (
          select c.id, c.name, c.display_order
          from category c
            join stakeholder_category sc on c.id = sc.category_id
          where sc.stakeholder_id = s.id
          order by c.display_order
        ) category_row
      )) as categories,
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
      s.requirements, s.admin_notes, s.inactive, s.email, s.covid_notes,
      s.v_name, s.v_categories, s.v_address, s.v_phone, s.v_email,
      s.v_hours, s.v_food_types, s.verification_status_id, s.inactive_temporary,
      s.neighborhood_id, n.name as neighborhood_name,
      s.complete_critical_percent,
      ${locationClause ? `${locationClause} AS distance,` : ""}
      s.food_bakery, s.food_dry_goods, s.food_produce,
      s.food_dairy, s.food_prepared, s.food_meat,
      s.parent_organization_id,
    ${buildLoginSelectsClause()}
    from stakeholder_set as s
    left outer join neighborhood n on s.neighborhood_id = n.id
    ${buildLoginJoinsClause()}
    where 1 = 1
    ${buildTenantWhereClause(tenantId)}
    ${
      Number(distance) && locationClause
        ? `AND ${locationClause} < ${distance}`
        : ""
    }
    ${trueFalseEitherClause("s.assigned_date", isAssigned)}
    ${trueFalseEitherClause("s.submitted_date", isSubmitted)}
    ${trueFalseEitherClause("s.approved_date", isApproved)}
    ${trueFalseEitherClause("s.claimed_date", isClaimed)}
    ${booleanEitherClause("s.inactive", isInactive)}
    ${booleanEitherClause("s.inactive_temporary", isInactiveTemporary)}
    ${assignedLoginId ? ` and s.assigned_login_id = ${assignedLoginId} ` : ""}
    ${claimedLoginId ? ` and s.claimed_login_id = ${claimedLoginId} ` : ""}
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
    ${Number(stakeholderId) > 0 ? ` and s.id = ${stakeholderId} ` : " "}
    ${
      Number(minCompleteCriticalPercent) > 0
        ? ` and s.complete_critical_percent >= ${minCompleteCriticalPercent} `
        : ""
    }
    ${
      Number(maxCompleteCriticalPercent) > 0
        ? ` and s.complete_critical_percent <= ${maxCompleteCriticalPercent} `
        : ""
    }
    order by ${locationClause ? "distance" : "s.name"}

  `;
  let stakeholders = [];
  let categoriesResults = [];
  var rows, stakeholder_ids;
  try {
    rows = await db.manyOrNone(sql);
    stakeholder_ids = rows.map((a) => a.id);
    if (stakeholder_ids.length) {
      // Hoover up all the stakeholder categories
      // for all of our stakeholder row results.
      const categoriesSql = `select sc.stakeholder_id, c.id, c.name, c.display_order
        from category c
        join stakeholder_category sc on c.id = sc.category_id
        where sc.stakeholder_id in (${stakeholder_ids.join(",")})
        order by c.display_order`;
      categoriesResults = await db.manyOrNone(categoriesSql);
    }
  } catch (err) {
    return Promise.reject(err.message);
  }

  rows.forEach((row) => {
    stakeholders.push({
      id: row.id,
      name: row.name || "",
      address1: row.address_1 || "",
      address2: row.address_2 || "",
      city: row.city || "",
      state: row.state || "",
      zip: row.zip || "",
      phone: row.phone || "",
      latitude: row.latitude ? Number(row.latitude) : null,
      longitude: row.longitude ? Number(row.longitude) : null,
      distance: row.distance ? Number(row.distance) : null,
      website: row.website || "",
      createdDate: row.created_date,
      createdLoginId: row.created_login_id,
      modifiedDate: row.modified_date,
      modifiedLoginId: row.modified_login_id,
      submittedDate: row.submitted_date,
      submittedLoginId: row.submitted_login_id,
      assignedDate: row.assigned_date,
      assignedLoginId: row.assigned_login_id,
      approvedDate: row.approved_date,
      reviewedLoginId: row.reviewed_login_id,
      claimedDate: row.claimed_date,
      claimedLoginId: row.claimed_login_id,
      requirements: row.requirements || "",
      adminNotes: row.admin_notes || "",
      inactive: row.inactive,
      createdUser: row.created_user || "",
      modifiedUser: row.modified_user || "",
      submittedUser: row.submitted_user || "",
      reviewedUser: row.reviewed_user || "",
      assignedUser: row.assigned_user || "",
      claimedUser: row.claimed_user || "",
      categories: categoriesResults.filter(
        (cats) => cats.stakeholder_id === row.id
      ),
      email: row.email || "",
      covidNotes: row.covid_notes || "",
      confirmedName: row.v_name,
      confirmedCategories: row.v_categories,
      confirmedAddress: row.v_address,
      confirmedPhone: row.v_phone,
      confirmedEmail: row.v_email,
      confirmedHours: row.v_hours,
      confirmedFoodTypes: row.v_food_types,
      verificationStatusId: row.verification_status_id,
      inactiveTemporary: row.inactive_temporary,
      neighborhoodId: row.neighborhood_id,
      neighborhoodName: row.neighborhood_name,
      completeCriticalPercent: row.complete_critical_percent,
      foodBakery: row.food_bakery,
      foodDryGoods: row.food_dry_goods,
      foodProduce: row.food_produce,
      foodDairy: row.food_dairy,
      foodPrepared: row.food_prepared,
      foodMeat: row.food_meat,
      parentOrganizationId: row.parent_organization_id,
    });
  });

  return stakeholders;
};

const selectById = async (id) => {
  const sql = `select
      s.id, s.name, s.address_1, s.address_2, s.city, s.state, s.zip,
      s.phone, s.latitude, s.longitude, s.website,  s.notes,
      (select array(select row_to_json(row)
      from (
        select day_of_week as "dayOfWeek", open, close, week_of_month as "weekOfMonth"
        from stakeholder_schedule
        where stakeholder_id = s.id
      ) row
      )) as hours,
      (select array(select row_to_json(category_row)
        from (
          select c.id, c.name, c.display_order
          from category c
            join stakeholder_category sc on c.id = sc.category_id
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
      s.neighborhood_id, 
      s.food_bakery, s.food_dry_goods, s.food_produce,
      s.food_dairy, s.food_prepared, s.food_meat,
      s.parent_organization_id,
      ${buildLoginSelectsClause()}
    from stakeholder s
    ${buildLoginJoinsClause()}
    where s.id = ${id}`;
  const row = await db.one(sql);
  const stakeholder = {
    id: row.id,
    name: row.name || "",
    address1: row.address_1 || "",
    address2: row.address_2 || "",
    city: row.city || "",
    state: row.state || "",
    zip: row.zip || "",
    phone: row.phone || "",
    latitude: row.latitude ? Number(row.latitude) : null,
    longitude: row.longitude ? Number(row.longitude) : null,
    website: row.website || "",
    createdDate: row.created_date,
    notes: row.notes || "",
    createdLoginId: row.created_login_id,
    modifiedDate: row.modified_date,
    modifiedLoginId: row.modified_login_id,
    submittedDate: row.submitted_date,
    submittedLoginId: row.submitted_login_id,
    approvedDate: row.approved_date,
    reviewedLoginId: row.approved_login_id,
    assignedLoginId: row.assigned_login_id,
    assignedDate: row.assigned_date,
    claimedLoginId: row.claimed_login_id,
    claimedDate: row.claimed_date,
    requirements: row.requirements || "",
    adminNotes: row.admin_notes || "",
    inactive: row.inactive,
    createdUser: row.created_user || "",
    modifiedUser: row.modified_user || "",
    submittedUser: row.submitted_user || "",
    reviewedUser: row.reviewed_user || "",
    assignedUser: row.assigned_user || "",
    claimedUser: row.claimed_user || "",
    categories: row.categories,
    hours: row.hours,
    parentOrganization: row.parent_organization || "",
    physicalAccess: row.physical_access || "",
    email: row.email || "",
    items: row.items || "",
    services: row.services || "",
    facebook: row.facebook || "",
    twitter: row.twitter || "",
    pinterest: row.pinterest || "",
    linkedin: row.linkedin || "",
    description: row.description,
    reviewNotes: row.review_notes,
    instagram: row.instagram || "",
    adminContactName: row.admin_contact_name || "",
    adminContactPhone: row.admin_contact_phone || "",
    adminContactEmail: row.admin_contact_email || "",
    donationContactName: row.donation_contact_name || "",
    donationContactPhone: row.donation_contact_phone || "",
    donationContactEmail: row.donation_contact_email || "",
    donationPickup: row.donation_pickup || false,
    donationAcceptFrozen: row.donation_accept_frozen || false,
    donationAcceptRefrigerated: row.donation_accept_refrigerated || false,
    donationAcceptPerishable: row.donation_accept_perishable || false,
    donationSchedule: row.donation_schedule || "",
    donationDeliveryInstructions: row.donation_delivery_instructions || "",
    donationNotes: row.donation_notes || "",
    covidNotes: row.covid_notes || "",
    categoryNotes: row.category_notes || "",
    eligibilityNotes: row.eligibility_notes || "",
    foodTypes: row.food_types || "",
    languages: row.languages || "",
    confirmedName: row.v_name,
    confirmedCategories: row.v_categories,
    confirmedAddress: row.v_address,
    confirmedPhone: row.v_phone,
    confirmedEmail: row.v_email,
    confirmedHours: row.v_hours,
    confirmedFoodTypes: row.v_food_types,
    verificationStatusId: row.verification_status_id,
    inactiveTemporary: row.inactive_temporary,
    neighborhoodId: row.neighborhood_id,
    foodBakery: row.food_bakery,
    foodDryGoods: row.food_dry_goods,
    foodProduce: row.food_produce,
    foodDairy: row.food_dairy,
    foodPrepared: row.food_prepared,
    foodMeat: row.food_meat,
    parentOrganizationId: row.parent_organization_id,
  };

  // Don't have a distance, since we didn't specify origin
  stakeholder.distance = null;

  return stakeholder;
};

const selectCsv = async (ids) => {
  const sql = `select
  s.id, s.name, s.address_1, s.address_2, s.city, s.state, s.zip,
  s.phone, s.latitude, s.longitude, s.website,  s.notes,
  (select array(select row_to_json(row)
  from (
    select day_of_week as "dayOfWeek", open, close, week_of_month as "weekOfMonth"
    from stakeholder_schedule
    where stakeholder_id = s.id
  ) row
  )) as hours,
  (select string_agg(cc.name, ', ')
      from (
        select name from category c
        join stakeholder_category sc on c.id = sc.category_id
        where sc.stakeholder_id = s.id
        order by c.display_order
      ) as cc
  ) as categories,
  to_char(s.created_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS') as created_date, s.created_login_id,
  to_char(s.modified_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS') as modified_date, s.modified_login_id,
  to_char(s.submitted_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS') as submitted_date, s.submitted_login_id,
  to_char(s.approved_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS') as approved_date, s.reviewed_login_id,
  to_char(s.assigned_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS')as assigned_date, s.assigned_login_id,
  to_char(s.created_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS') as claimed_date, s.claimed_login_id,
  s.requirements::varchar, s.admin_notes, s.inactive,
  L1.first_name || ' ' || L1.last_name as created_user,
  L2.first_name || ' ' || L2.last_name as modified_user,
  L3.first_name || ' ' || L3.last_name as submitted_user,
  L4.first_name || ' ' || L4.last_name as reviewed_user,
  L5.first_name || ' ' || L5.last_name as assigned_user,
  L6.first_name || ' ' || L6.last_name as claimed_user,
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
  s.v_hours, s.verification_status_id, s.inactive_temporary,
  s.neighborhood_id, n.name as neighborhood_name
from stakeholder s
left join login L1 on s.created_login_id = L1.id
left join login L2 on s.modified_login_id = L2.id
left join login L3 on s.submitted_login_id = L3.id
left join login L4 on s.reviewed_login_id = L4.id
left join login L5 on s.assigned_login_id = L5.id
left join login L6 on s.claimed_login_id = L6.id
left join neighborhood n on s.neighborhood_id = n.id
where s.id in (${ids.join(", ")})`;
  const rows = await db.manyOrNone(sql);
  const stakeholders = rows.map((row) => {
    return {
      id: row.id,
      name: row.name || "",
      address1: row.address_1 || "",
      address2: row.address_2 || "",
      city: row.city || "",
      state: row.state || "",
      zip: row.zip || "",
      phone: row.phone || "",
      latitude: row.latitude ? Number(row.latitude) : null,
      longitude: row.longitude ? Number(row.longitude) : null,
      website: row.website || "",
      createdDate: row.created_date,
      notes: row.notes || "",
      createdLoginId: row.created_login_id,
      modifiedDate: row.modified_date,
      modifiedLoginId: row.modified_login_id,
      submittedDate: row.submitted_date,
      submittedLoginId: row.submitted_login_id,
      approvedDate: row.approved_date,
      reviewedLoginId: row.approved_login_id,
      assignedLoginId: row.assigned_login_id,
      assignedDate: row.assigned_date,
      claimedLoginId: row.claimed_login_id,
      claimedDate: row.claimed_date,
      requirements: row.requirements || "",
      adminNotes: row.admin_notes || "",
      inactive: row.inactive,
      createdUser: row.created_user || "",
      modifiedUser: row.modified_user || "",
      submittedUser: row.submitted_user || "",
      reviewedUser: row.reviewed_user || "",
      assignedUser: row.assigned_user || "",
      claimedUser: row.claimed_user || "",
      categories: row.categories,
      hours: row.hours,
      parentOrganization: row.parent_organization || "",
      physicalAccess: row.physical_access || "",
      email: row.email || "",
      items: row.items || "",
      services: row.services || "",
      facebook: row.facebook || "",
      twitter: row.twitter || "",
      pinterest: row.pinterest || "",
      linkedin: row.linkedin || "",
      description: row.description,
      reviewNotes: row.review_notes,
      instagram: row.instagram || "",
      adminContactName: row.admin_contact_name || "",
      adminContactPhone: row.admin_contact_phone || "",
      adminContactEmail: row.admin_contact_email || "",
      donationContactName: row.donation_contact_name || "",
      donationContactPhone: row.donation_contact_phone || "",
      donationContactEmail: row.donation_contact_email || "",
      donationPickup: row.donation_pickup || false,
      donationAcceptFrozen: row.donation_accept_frozen || false,
      donationAcceptRefrigerated: row.donation_accept_refrigerated || false,
      donationAcceptPerishable: row.donation_accept_perishable || false,
      donationSchedule: row.donation_schedule || "",
      donationDeliveryInstructions: row.donation_delivery_instructions || "",
      donationNotes: row.donation_notes || "",
      covidNotes: row.covid_notes || "",
      categoryNotes: row.category_notes || "",
      eligibilityNotes: row.eligibility_notes || "",
      foodTypes: row.food_types || "",
      languages: row.languages || "",
      confirmedName: row.v_name,
      confirmedCategories: row.v_categories,
      confirmedAddress: row.v_address,
      confirmedPhone: row.v_phone,
      confirmedEmail: row.v_email,
      confirmedHours: row.v_hours,
      verificationStatusId: row.verification_status_id,
      inactiveTemporary: row.inactive_temporary,
      neighborhoodId: row.neighborhood_id,
    };
  });
  return stakeholders;
};

const insert = async (model) => {
  // Array of catetory_ids is formatted as, e.g.,  '{1,9}'
  const categories = model.selectedCategoryIds
    ? "{" + model.selectedCategoryIds.join(",") + "}"
    : "{1}";

  // Array of hours if formatted as, e.g., `{"(0,Mon,10:00:00,13:00:00)","(3,Sat,08:00:00,10:30:00)"}
  let hoursSqlValues;
  if (typeof model.hours === "string") {
    hoursSqlValues = model.hours;
  } else if (model.hours && model.hours.length) {
    hoursSqlValues = model.hours
      .reduce((acc, cur) => {
        return (acc += `"(${cur.weekOfMonth},${cur.dayOfWeek},${cur.open},${cur.close})",`);
      }, "")
      .slice(0, -1);
  } else {
    hoursSqlValues = "";
  }

  const formattedHours = "{" + hoursSqlValues + "}";

  // create_stakeholder is a postgres stored procedure. Source of this stored
  // procedure is in the repo at db/stored_procs/create_stakeholder.sql.
  const params = [
    0,
    Number(model.tenantId),
    model.name || "",
    model.address1 || "",
    model.address2 || "",
    model.city || "",
    model.state || "",
    model.zip || "",
    model.phone || "",
    Number(model.latitude) || null, // numeric
    Number(model.longitude) || null, // numeric
    model.website || "",
    model.inactive || false, // bool
    model.notes || "",
    model.requirements || "",
    model.adminNotes || "",
    Number(model.loginId) || null, // numeric
    model.parentOrganization || "",
    model.physicalAccess || "",
    model.email || "",
    model.items || "",
    model.services || "",
    model.facebook || "",
    model.twitter || "",
    model.pinterest || "",
    model.linkedin || "",
    model.description || "",
    model.submittedDate || null, // TIMESTAMPTZ
    Number(model.submittedLoginId) || null, // INT
    model.approvedDate || null, // TIMESTAMP
    Number(model.reviewedLoginId) || null, // INT
    model.assignedDate || null, // TIMESTAMP
    Number(model.assignedLoginId) || null, // INT
    model.claimedDate || null, // TIMESTAMP
    Number(model.claimedLoginId) || null, // INT
    model.reviewNotes || "",
    model.instagram || "",
    model.adminContactName || "",
    model.adminContactPhone || "",
    model.adminContactEmail || "",
    model.donationContactName || "",
    model.donationContactPhone || "",
    model.donationContactEmail || "",
    model.donationPickup || false, // bool
    model.donationAcceptFrozen || false, // bool
    model.donationAcceptRefrigerated || false, // bool
    model.donationAcceptPerishable || false, // bool
    model.donationSchedule || "",
    model.donationDeliveryInstructions || "",
    model.donationNotes || "",
    model.covidNotes || "",
    model.categoryNotes || "",
    model.eligibilityNotes || "",
    model.foodTypes || "",
    model.languages || "",
    model.confirmedName || false, //  bool
    model.confirmedCategories || false, //  bool
    model.confirmedAddress || false, //  bool
    model.confirmedPhone || false, //  bool
    model.confirmedEmail || false, //  bool
    model.confirmedHours || false, //  bool
    model.confirmedFoodTypes || false, //  bool
    Number(model.verificationStatusId) || 1, // INT,
    model.inactiveTemporary || false, // bool
    categories,
    formattedHours,
    model.foodBakery || false,
    model.foodDryGoods || false,
    model.foodProduce || false,
    model.foodDairy || false,
    model.foodPrepared || false,
    model.foodMeat || false,
    Number(model.parentOrganizationId) || null, // INT
  ];

  const result = await db.proc("create_stakeholder", params);
  return { id: result.s_id };
};

const insertBulk = async (stakeholderArray, action, tenantId) => {
  if (!tenantId) return;
  if (action === "add") {
    for (let i = 0; i < stakeholderArray.length; i++) {
      const model = {
        ...camelcaseKeys(stakeholderArray[i]),
        id: "",
        tenantId,
      };
      await insert(model);
    }
  } else if (action === "update") {
    for (let i = 0; i < stakeholderArray.length; i++) {
      const model = {
        ...camelcaseKeys(stakeholderArray[i]),
        tenantId,
      };
      await insert(model);
      if (model.id && model.id.length) {
        await update(model);
      } else {
        await insert(model);
      }
    }
  } else if (action === "replace") {
    await removeAll(tenantId);
    for (let i = 0; i < stakeholderArray.length; i++) {
      const model = {
        ...camelcaseKeys(stakeholderArray[i]),
        id: "",
        tenantId,
      };
      await insert(model);
    }
  }
};

const requestAssignment = async (model) => {
  const sql = `with selected_stakeholder as (
    select distinct sh.id, sh.modified_date
    from stakeholder sh join stakeholder_category sc 
      on sh.id = sc.stakeholder_id
    join category c on sc.category_id = c.id
    where sh.verification_status_id = 1
    and sh.tenant_id = $<tenantId>
    and c.inactive = false
    order by sh.modified_date
    limit 1
  )
  update stakeholder set
    verification_status_id = 2,
    assigned_login_id = $<loginId>,
    assigned_date = current_timestamp,
    modified_date = current_timestamp,
    modified_login_id = $<loginId>
  where stakeholder.id in (select id from selected_stakeholder)`;

  const result = await db.result(sql, model);
  return result.rowCount;
};

const assign = async (model) => {
  const sql = `
    update stakeholder set
      assigned_login_id = $<loginId>,
      assigned_date = CURRENT_TIMESTAMP,
      submitted_date = null,
      submitted_login_id = null,
      modified_login_id = $<userLoginId>,
      modified_date = CURRENT_TIMESTAMP,
      approved_date = null,
      reviewed_login_id = null,
      verification_status_id = 2
    where id = $<id>`;

  const result = await db.result(sql, model);
  return result.rowCount;
};

const needsVerification = async (model) => {
  const sql =
    `update stakeholder set
                assigned_login_id = null,
                assigned_date = null,
                submitted_date = null,
                submitted_login_id = null,
                modified_login_id = $<userLoginId>,
                modified_date = CURRENT_TIMESTAMP,
                approved_date = null,
                reviewed_login_id = null,
                verification_status_id = 1,
                review_notes = CASE WHEN length(review_notes) > 0  THEN  review_notes ` +
    (model.message ? `|| chr(10) || chr(10) || $<message> ` : "") +
    ` ELSE $<message> END
              where id = $<id>`;

  const result = await db.result(sql, model);
  return result.rowCount;
};

const claim = async (model) => {
  // const { id, userLoginId, loginId, setClaimed } = model;
  const sql = `update stakeholder set
                claimed_login_id = $<loginId>,
                claimed_date = CASE $<setClaimed> THEN CURRENT_TIMESTAMP ELSE null END,
                modified_login_id = $<userLoginId>,
                modified_date = CURRENT_TIMESTAMP,,
              where id = $<id>`;

  const result = await db.result(sql, model);
  return result.rowCount;
};

const update = async (model) => {
  // Array of catetory_ids is formatted as, e.g.,  '{1,9}'
  const categories = "{" + model.selectedCategoryIds.join(",") + "}";
  // Array of hours if formatted as, e.g., `{"(0,Mon,10:00:00,13:00:00)","(3,Sat,08:00:00,10:30:00)"}
  let hoursSqlValues = model.hours.length
    ? model.hours
        .reduce((acc, cur) => {
          return (acc += `"(${cur.weekOfMonth},${cur.dayOfWeek},${cur.open},${cur.close})",`);
        }, "")
        .slice(0, -1)
    : "";
  const formattedHours = "{" + hoursSqlValues + "}";

  // update_stakeholder is a postgres stored procedure. Source of this stored
  // procedure is in the repo at db/stored_procs/update_stakeholder.sql.
  //
  // Currently, it updates stakeholder category and schedule by deleting the existing category/schedule rows,
  // and creating new ones.
  const params = [
    model.name || "",
    model.address1 || "",
    model.address2 || "",
    model.city || "",
    model.state || "",
    model.zip || "",
    model.phone || "",
    model.latitude, // numeric
    model.longitude, // numeric
    model.website || "",
    model.inactive, // bool
    model.notes || "",
    model.requirements || "",
    model.adminNotes || "",
    model.parentOrganization || "",
    model.physicalAccess || "",
    model.email || "",
    model.items || "",
    model.services || "",
    model.facebook || "",
    model.twitter || "",
    model.pinterest || "",
    model.linkedin || "",
    model.description || "",
    model.loginId || null, //INT
    model.submittedDate || null, // TIMESTAMPTZ
    model.submittedLoginId || null, //INT
    model.approvedDate || null, // TIMESTAMP
    model.reviewedLoginId || null, //INT
    model.assignedDate || null, // TIMESTAMP
    model.assignedLoginId || null, //INT
    model.claimedDate || null, // TIMESTAMP
    model.claimedLoginId || null, //INT
    model.reviewNotes || "",
    model.instagram || "",
    model.adminContactName || "",
    model.adminContactPhone || "",
    model.adminContactEmail || "",
    model.donationContactName || "",
    model.donationContactPhone || "",
    model.donationContactEmail || "",
    model.donationPickup, // bool
    model.donationAcceptFrozen, // bool
    model.donationAcceptRefrigerated, // bool
    model.donationAcceptPerishable, // bool
    model.donationSchedule || "",
    model.donationDeliveryInstructions || "",
    model.donationNotes || "",
    model.covidNotes || "",
    model.categoryNotes || "",
    model.eligibilityNotes || "",
    model.foodTypes || "",
    model.languages || "",
    model.confirmedName, //  bool
    model.confirmedCategories, //  bool
    model.confirmedAddress, //  bool
    model.confirmedPhone, //  bool
    model.confirmedEmail, //  bool
    model.confirmedHours, //  bool
    model.confirmedFoodTypes, //  bool
    model.verificationStatusId || null, //INT
    model.inactiveTemporary, // bool
    model.id, // int
    categories,
    formattedHours,
    model.foodBakery,
    model.foodDryGoods,
    model.foodProduce,
    model.foodDairy,
    model.foodPrepared,
    model.foodMeat,
    model.parentOrganizationId,
  ];

  await db.proc("update_stakeholder", params);
};

const remove = async (idParm) => {
  const id = Number(idParm);
  await db.tx(async (t) => {
    await t.none(
      "delete from stakeholder_schedule where stakeholder_id = $<id>",
      { id }
    );
    await t.none(
      "delete from stakeholder_category where stakeholder_id = $<id>",
      { id }
    );
    const result = await t.result("delete from stakeholder where id = $<id>", {
      id,
    });
    await t.none("delete from stakeholder_log where id = $<id>", {
      id,
    });
    await t.none("delete from stakeholder_best where id = $<id>", {
      id,
    });
    return result.rowCount;
  });
};

const removeAll = async (tenantId) => {
  await db.tx(async (t) => {
    await t.none(
      "delete from stakeholder_schedule where stakeholder_id in (select stakeholder_id from stakeholder where tenant_id = $<tenantId>)",
      { tenantId }
    );
    await t.none(
      "delete from stakeholder_category where stakeholder_id in (select stakeholder_id from stakeholder where tenant_id = $<tenantId>)",
      { tenantId }
    );
    const result = await t.result(
      "delete from stakeholder where tenant_id = $<tenantId>",
      { tenantId }
    );
    await t.none("delete from stakeholder_log where tenant_id = $<tenantId>", {
      tenantId,
    });
    await t.none("delete from stakeholder_best where tenant_id = $<tenantId>", {
      tenantId,
    });
    return result;
  });
};

const buildCTEClause = (categoryIds, name) => {
  const categoryClause = categoryIds
    ? `stakeholder_category_set AS (
       select * from stakeholder_category
       WHERE stakeholder_category.category_id in (${categoryIds.join(",")})),`
    : "";
  const nameClause = "'%" + name.replace(/'/g, "''") + "%'";
  const cteClause = `WITH ${categoryClause}
  stakeholder_set AS (
    select * from stakeholder where name ilike ${nameClause}
    and id in (
      select stakeholder_id from stakeholder_category_set
    )
  )`;
  return cteClause;
};

const buildLocationClause = (latitude, longitude) => {
  var locationClause = "";
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

const buildTenantWhereClause = (tenantId) => {
  return !tenantId || tenantId === "0" ? "" : ` AND s.tenant_id = ${tenantId}`;
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

module.exports = {
  search,
  selectById,
  selectCsv,
  insert,
  insertBulk,
  update,
  remove,
  needsVerification,
  assign,
  claim,
  requestAssignment,
};
