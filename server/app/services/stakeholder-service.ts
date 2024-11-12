import db from "./db";
import camelcaseKeys from "camelcase-keys";
import {
  Stakeholder,
  StakeholderWithDistance,
  StakeholderCategory,
  StakeholderSearchParams,
  InsertStakeholderParams,
  UpdateStakeholderParams,
  ClaimParams,
  RequestAssignmentParams,
  AssignParams,
  NeedsVerificationParams,
} from "../../types/stakeholder-types";
import stakeholderHelpers from "./stakeholder-helpers";

/* 
This service is for getting data from the stakeholder table, which
is what we want for the administration UI. It represents the most recent
draft version of each stakeholder for data entry and administrators
to work with.

If you make changes to the database structure, be sure to update these
methods as well as the corresponding methods in the stakeholder-best-service.js.
*/

const trueFalseEitherClause = (columnName: string, value?: string) => {
  return value === "true"
    ? ` and ${columnName} is not null `
    : value === "false"
    ? ` and ${columnName} is null `
    : "";
};

const booleanEitherClause = (columnName: string, value?: string) => {
  return value === "true"
    ? ` and ${columnName} is true `
    : value === "false"
    ? ` and ${columnName} is false `
    : "";
};

const search = async (
  params: StakeholderSearchParams
): Promise<StakeholderWithDistance[]> => {
  const {
    assignedLoginId,
    categoryIds,
    claimedLoginId,
    distance,
    isApproved,
    isAssigned,
    isClaimed,
    isInactive,
    isInactiveTemporary,
    isSubmitted,
    latitude,
    longitude,
    maxCompleteCriticalPercent,
    minCompleteCriticalPercent,
    name,
    neighborhoodId,
    stakeholderId,
    tag,
    tenantId,
    verificationStatusId,
  } = params;

  const locationClause = buildLocationClause(latitude, longitude);
  const categoryClause = buildCTEClause(name || "", categoryIds);

  const sql = `${categoryClause}
    select   s.id, s.name, s.address_1, s.address_2, s.city, s.state, s.zip,
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
    s.neighborhood_id, n.name as neighborhood_name,
    s.food_bakery, s.food_dry_goods, s.food_produce,
    s.food_dairy, s.food_prepared, s.food_meat,
    s.parent_organization_id,
    s.hours_notes, s.allow_walkins, s.tags, s.complete_critical_percent,
    sug.sug_count,
    ${locationClause ? `${locationClause} AS distance,` : ""}
    ${buildLoginSelectsClause()}
    
    from stakeholder_set as s
    left outer join neighborhood n on s.neighborhood_id = n.id
    ${buildLoginJoinsClause()}
    left outer join(select stakeholder_id, count(*) sug_count from suggestion GROUP BY stakeholder_id) sug on s.id = sug.stakeholder_id
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
    ${tag ? ` and '${tag}' = ANY (s.tags) ` : ""}
    order by ${locationClause ? "distance" : "s.name"}

  `;

  const stakeholders: StakeholderWithDistance[] = [];
  let categoriesResults: StakeholderCategory[];
  let rows, stakeholder_ids;
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
  } catch (err: any) {
    return Promise.reject(err.message);
  }

  rows.forEach((row) => {
    const stakeholder = {
      ...stakeholderHelpers.rowToStakeholder(
        row,
        categoriesResults
          .filter((cr) => cr.stakeholder_id === row.id)
          .map((c) => {
            return { id: c.id, name: c.name, displayOrder: c.display_order };
          })
      ),
      distance: row.distance,
    };
    stakeholders.push(stakeholder);
  });

  return stakeholders;
};

const selectById = async (id: string): Promise<Stakeholder> => {
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
      s.neighborhood_id, n.name as neighborhood_name,
      s.food_bakery, s.food_dry_goods, s.food_produce,
      s.food_dairy, s.food_prepared, s.food_meat,
      s.parent_organization_id,
      s.hours_notes, s.allow_walkins, s.tags,
      ${buildLoginSelectsClause()}
      from stakeholder s
    left join neighborhood n on s.neighborhood_id = n.id
    ${buildLoginJoinsClause()}
    where s.id = ${Number(id)}`;
  const row = await db.one(sql);

  return stakeholderHelpers.rowToStakeholder(row);
};

const selectCsv = async (ids: string[]): Promise<Stakeholder[]> => {
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
  s.neighborhood_id, n.name as neighborhood_name,
  s.food_bakery, s.food_dry_goods, s.food_produce,
  s.food_dairy, s.food_prepared, s.food_meat,
  s.parent_organization_id,
  s.hours_notes, s.allow_walkins, s.tags
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
    return stakeholderHelpers.rowToStakeholder(row);
  });
  return stakeholders;
};

const insert = async (model: InsertStakeholderParams) => {
  // Array of catetory_ids is formatted as, e.g.,  '{1,9}'
  const categories = model.selectedCategoryIds
    ? "{" + model.selectedCategoryIds.join(",") + "}"
    : "{1}";

  // Array of tags is formatted as, e.g.,  '{"tag1","tag2"}'
  const tags = model.tags
    ? "{" +
      model.tags
        .sort()
        .map((t) => `"${t}"`)
        .join(",") +
      "}"
    : null;

  // Array of hours is formatted as, e.g., `{"(0,Mon,10:00:00,13:00:00)","(3,Sat,08:00:00,10:30:00)"}
  let hoursSqlValues: string;
  if (typeof model.hours === "string") {
    hoursSqlValues = model.hours;
  } else if (model.hours && Array.isArray(model.hours)) {
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
    model.hoursNotes || "",
    model.allowWalkins || false,
    tags,
  ];

  const result = await db.proc("create_stakeholder", params);
  return { id: result.s_id };
};

const insertBulk = async (
  stakeholderArray: InsertStakeholderParams[],
  action: "add" | "update" | "replace",
  tenantId: number
) => {
  if (!tenantId) return;
  if (action === "add") {
    for (let i = 0; i < stakeholderArray.length; i++) {
      const model: InsertStakeholderParams = {
        ...camelcaseKeys(stakeholderArray[i]),
        id: 0,
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
      if (model.id && model.id !== 0) {
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
        id: 0,
        tenantId,
      };
      await insert(model);
    }
  }
};

const requestAssignment = async (model: RequestAssignmentParams) => {
  const sql = `with selected_stakeholder as (
    select distinct sh.id, sh.modified_date
    from stakeholder sh join stakeholder_category sc 
      on sh.id = sc.stakeholder_id
    join category c on sc.category_id = c.id
    where sh.verification_status_id = 1
    and sh.tenant_id = $<tenantId>
    and c.inactive = false
    and (ARRAY[1,4] && sh.category_ids)
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

const checkAvailableAssignmentsAdmin = async (
  tenantId: number
): Promise<boolean> => {
  const sql = `
    select exists (
      select 1
      from stakeholder sh 
      join stakeholder_category sc on sh.id = sc.stakeholder_id
      join category c on sc.category_id = c.id
      where sh.verification_status_id = 1
      and sh.tenant_id = $<tenantId>
      and c.inactive = false
      and (ARRAY[1,9] && sh.category_ids)
    ) as available;
  `;

  try {
    const result = await db.one(sql, { tenantId });
    return result.available;
  } catch (err: any) {
    throw new Error(`Error checking available assignments: ${err.message}`);
  }
};

const assign = async (model: AssignParams) => {
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

const needsVerification = async (model: NeedsVerificationParams) => {
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
                v_name = v_name and $<preserveConfirmations>,
                v_categories = v_categories and $<preserveConfirmations>,
                v_address = v_address and $<preserveConfirmations>,
                v_email = v_email and $<preserveConfirmations>,
                v_phone = v_phone and $<preserveConfirmations>,
                v_hours = v_hours and $<preserveConfirmations>,
                v_food_types = v_food_types and $<preserveConfirmations>,
                review_notes = CASE WHEN length(review_notes) > 0  THEN  review_notes ` +
    (model.message ? `|| chr(10) || chr(10) || $<message> ` : "") +
    ` ELSE $<message> END
              where id = $<id>`;

  const result = await db.result(sql, model);
  return result.rowCount;
};

const claim = async (model: ClaimParams) => {
  const sql = `update stakeholder set
                claimed_login_id = $<loginId>,
                claimed_date = CASE WHEN $<setClaimed> THEN CURRENT_TIMESTAMP ELSE null END,
                modified_login_id = $<userLoginId>,
                modified_date = CURRENT_TIMESTAMP
              where id = $<id>`;

  const result = await db.result(sql, model);
  return result.rowCount;
};

const update = async (model: UpdateStakeholderParams) => {
  // Array of catetory_ids is formatted as, e.g.,  '{1,9}'
  const categories = "{" + model.selectedCategoryIds.join(",") + "}";

  // Array of tags is formatted as, e.g.,  '{"tag1","tag2"}'
  const tags = model.tags
    ? "{" +
      model.tags
        .sort()
        .map((t) => `"${t}"`)
        .join(",") +
      "}"
    : null;

  // Array of hours if formatted as, e.g., `{"(0,Mon,10:00:00,13:00:00)","(3,Sat,08:00:00,10:30:00)"}
  const hoursSqlValues = Array.isArray(model.hours)
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
    model.parentOrganizationId || null, // INT
    model.hoursNotes || "",
    model.allowWalkins || false,
    tags,
  ];

  await db.proc("update_stakeholder", params);
};

const remove = async (idParam: string) => {
  const id = Number(idParam);
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

const removeAll = async (tenantId: number) => {
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

const buildCTEClause = (name: string, categoryIds?: string[]) => {
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

const buildLocationClause = (latitude?: string, longitude?: string) => {
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

const buildTenantWhereClause = (tenantId?: string) => {
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

export default {
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
  checkAvailableAssignmentsAdmin,
};
