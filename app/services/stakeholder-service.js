const { pool } = require("./postgres-pool");
const {
  toSqlString,
  toSqlNumeric,
  toSqlBoolean,
  toSqlTimestamp,
} = require("./postgres-utils");

const milesPerLatitudeDegree = 69.097; // used for distance calculations

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

const search = async ({
  name,
  categoryIds,
  latitude,
  longitude,
  distance,
  isInactive,
  isAssigned,
  isSubmitted,
  isApproved,
  isRejected,
  isClaimed,
  assignedLoginId,
  claimedLoginId,
  verificationStatusId,
}) => {
  const locationClause = buildLocationClause(latitude, longitude, distance);
  const categoryClause = buildCTEClause(categoryIds, name);

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
      as approved_date,
    to_char(s.rejected_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS')
      as rejected_date, s.reviewed_login_id,
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
    s.v_hours, s.verification_status_id, s.inactive_temporary,
    ${buildLoginSelectsClause()}
    from stakeholder_set as s
    ${buildLoginJoinsClause()}
    ${locationClause}
    ${trueFalseEitherClause("s.assigned_date", isAssigned)}
    ${trueFalseEitherClause("s.submitted_date", isSubmitted)}
    ${trueFalseEitherClause("s.approved_date", isApproved)}
    ${trueFalseEitherClause("s.rejected_date", isRejected)}
    ${trueFalseEitherClause("s.claimed_date", isClaimed)}
    ${booleanEitherClause("s.inactive", isInactive)}
    ${assignedLoginId ? ` and s.assigned_login_id = ${assignedLoginId} ` : ""}
    ${claimedLoginId ? ` and s.claimed_login_id = ${claimedLoginId} ` : ""}
    ${
      Number(verificationStatusId) > 0
        ? ` and s.verification_status_id = ${verificationStatusId} `
        : ""
    }
    order by s.name
  `;
  // console.log(sql);
  let stakeholders = [];
  let hoursResults = [];
  let categoriesResults = [];
  var stakeholderResult, stakeholder_ids;
  try {
    stakeholderResult = await pool.query(sql);
    stakeholder_ids = stakeholderResult.rows.map((a) => a.id);

    if (stakeholder_ids.length) {
      // Hoover up all the stakeholder categories and hours
      // for all of our stakeholder row results.
      const hoursSql = `select stakeholder_id, day_of_week, open, close, week_of_month
            from stakeholder_schedule
            where stakeholder_id in (${stakeholder_ids.join(",")})`;
      hoursResults = await pool.query(hoursSql);
      const categoriesSql = `select sc.stakeholder_id, c.id, c.name
          from category c
          join stakeholder_category sc on c.id = sc.category_id
          where sc.stakeholder_id in (${stakeholder_ids.join(",")})`;
      categoriesResults = await pool.query(categoriesSql);
    }
  } catch (err) {
    return Promise.reject(err.message);
  }

  stakeholderResult.rows.forEach((row) => {
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
      website: row.website || "",
      notes: row.notes || "",
      createdDate: row.created_date,
      createdLoginId: row.created_login_id,
      modifiedDate: row.modified_date,
      modifiedLoginId: row.modified_login_id,
      submittedDate: row.submitted_date,
      submittedLoginId: row.submitted_login_id,
      assignedDate: row.assigned_date,
      assignedLoginId: row.assigned_login_id,
      approvedDate: row.approved_date,
      rejectedDate: row.rejected_date,
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
      categories: categoriesResults.rows.filter(
        (cats) => cats.stakeholder_id == row.id
      ),
      hours: hoursResults.rows.filter(
        (hours) => hours.stakeholder_id == row.id
      ),
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
    });
  });

  // Should move distance calc into stored proc
  stakeholders.forEach((stakeholder) => {
    if (stakeholder.latitude && stakeholder.longitude) {
      stakeholder.distance =
        Math.sqrt(
          (Math.abs(stakeholder.longitude - longitude) *
            Math.cos((latitude / 360) * 2 * Math.PI)) **
            2 +
            Math.abs(stakeholder.latitude - latitude) ** 2
        ) * milesPerLatitudeDegree;
    } else {
      stakeholder.distance = 999;
    }
  });
  // Should move sorting into stored proc
  stakeholders.sort((a, b) => a.distance - b.distance);
  // Should move distance filter into stored proc
  if (distance > 0) {
    stakeholders = stakeholders.filter(
      (stakeholder) => stakeholder.distance <= distance
    );
  }

  return stakeholders;
};

const searchDashboard = async ({
  name,
  categoryIds,
  isInactive,
  isAssigned,
  isSubmitted,
  isApproved,
  isRejected,
  isClaimed,
  assignedLoginId,
  claimedLoginId,
  verificationStatusId,
  latitude,
  longitude,
  distance,
  isInactiveTemporary,
  stakeholderId,
}) => {
  const locationClause = buildLocationClause(latitude, longitude, distance);
  const categoryClause = buildCTEClause(categoryIds, name);

  const sql = `${categoryClause}
    select s.id, s.name, s.address_1, s.address_2, s.city, s.state, s.zip,
      s.phone, s.latitude, s.longitude, s.website,
      (select array(select row_to_json(category_row)
        from (
          select c.id, c.name
          from category c
            join stakeholder_category sc on c.id = sc.category_id
          where sc.stakeholder_id = s.id
        ) category_row
      )) as categories,
      to_char(s.created_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS')
        as created_date, s.created_login_id,
      to_char(s.modified_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS')
        as modified_date, s.modified_login_id,
      to_char(s.submitted_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS')
        as submitted_date, s.submitted_login_id,
      to_char(s.approved_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS')
        as approved_date,
      to_char(s.rejected_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS')
        as rejected_date, s.reviewed_login_id,
      to_char(s.assigned_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS')
        as assigned_date, s.assigned_login_id,
      to_char(s.created_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS')
        as claimed_date, s.claimed_login_id,
      s.requirements, s.admin_notes, s.inactive, s.email, s.covid_notes,
      s.v_name, s.v_categories, s.v_address, s.v_phone, s.v_email,
      s.v_hours, s.verification_status_id, s.inactive_temporary,
      ${buildLoginSelectsClause()}
    from stakeholder_set as s
    ${buildLoginJoinsClause()}
    ${locationClause}
    ${trueFalseEitherClause("s.assigned_date", isAssigned)}
    ${trueFalseEitherClause("s.submitted_date", isSubmitted)}
    ${trueFalseEitherClause("s.approved_date", isApproved)}
    ${trueFalseEitherClause("s.rejected_date", isRejected)}
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
    ${Number(stakeholderId) > 0 ? ` and s.id = ${stakeholderId} ` : " "}
    order by s.name
  `;
  // console.log(sql);
  let stakeholders = [];
  let categoriesResults = [];
  var stakeholderResult, stakeholder_ids;
  try {
    stakeholderResult = await pool.query(sql);
    stakeholder_ids = stakeholderResult.rows.map((a) => a.id);
    if (stakeholder_ids.length) {
      // Hoover up all the stakeholder categories
      // for all of our stakeholder row results.
      const categoriesSql = `select sc.stakeholder_id, c.id, c.name
        from category c
        join stakeholder_category sc on c.id = sc.category_id
        where sc.stakeholder_id in (${stakeholder_ids.join(",")})`;
      categoriesResults = await pool.query(categoriesSql);
    }
  } catch (err) {
    return Promise.reject(err.message);
  }

  stakeholderResult.rows.forEach((row) => {
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
      rejectedDate: row.rejected_date,
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
      categories: categoriesResults.rows.filter(
        (cats) => cats.stakeholder_id == row.id
      ),
      email: row.email || "",
      covidNotes: row.covid_notes || "",
      confirmedName: row.v_name,
      confirmedCategories: row.v_categories,
      confirmedAddress: row.v_address,
      confirmedPhone: row.v_phone,
      confirmedEmail: row.v_email,
      confirmedHours: row.v_hours,
      verificationStatusId: row.verification_status_id,
      inactiveTemporary: row.inactive_temporary,
    });
  });

  if (latitude && longitude && distance) {
    // Should move distance calc into stored proc
    stakeholders.forEach((stakeholder) => {
      if (stakeholder.latitude && stakeholder.longitude) {
        stakeholder.distance =
          Math.sqrt(
            (Math.abs(stakeholder.longitude - longitude) *
              Math.cos((latitude / 360) * 2 * Math.PI)) **
              2 +
              Math.abs(stakeholder.latitude - latitude) ** 2
          ) * milesPerLatitudeDegree;
      } else {
        stakeholder.distance = 999;
      }
    });
    // Should move sorting into stored proc
    stakeholders.sort((a, b) => a.distance - b.distance);
    // Should move distance filter into stored proc
    if (distance > 0) {
      stakeholders = stakeholders.filter(
        (stakeholder) => stakeholder.distance <= distance
      );
    }
  }

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
          select c.id, c.name
          from category c
            join stakeholder_category sc on c.id = sc.category_id
          where sc.stakeholder_id = s.id
        ) category_row
      )) as categories,
      to_char(s.created_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS') as created_date, s.created_login_id,
      to_char(s.modified_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS') as modified_date, s.modified_login_id,
      to_char(s.submitted_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS') as submitted_date, s.submitted_login_id,
      to_char(s.approved_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS') as approved_date,
      to_char(s.rejected_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS') as rejected_date, s.reviewed_login_id,
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
      s.v_hours, s.verification_status_id, s.inactive_temporary
    from stakeholder s
    left join login L1 on s.created_login_id = L1.id
    left join login L2 on s.modified_login_id = L2.id
    left join login L3 on s.submitted_login_id = L3.id
    left join login L4 on s.reviewed_login_id = L4.id
    left join login L5 on s.assigned_login_id = L5.id
    left join login L6 on s.claimed_login_id = L6.id
    where s.id = ${id}`;
  const result = await pool.query(sql);
  const row = result.rows[0];
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
    rejectedDate: row.rejected_date,
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
  };

  // Don't have a distance, since we didn't specify origin
  stakeholder.distance = null;

  return stakeholder;
};

const insert = async (model) => {
  const {
    name,
    address1,
    address2,
    city,
    state,
    zip,
    phone,
    latitude,
    longitude,
    website,
    inactive,
    notes,
    requirements,
    adminNotes,
    selectedCategoryIds,
    hours,
    parentOrganization,
    physicalAccess,
    email,
    items,
    services,
    facebook,
    twitter,
    pinterest,
    linkedin,
    loginId,
    description,
    submittedDate,
    submittedLoginId,
    approvedDate,
    rejectedDate,
    reviewedLoginId,
    assignedDate,
    assignedLoginId,
    claimedDate,
    claimedLoginId,
    reviewNotes,
    instagram,
    adminContactName,
    adminContactPhone,
    adminContactEmail,
    donationContactName,
    donationContactPhone,
    donationContactEmail,
    donationPickup,
    donationAcceptFrozen,
    donationAcceptRefrigerated,
    donationAcceptPerishable,
    donationSchedule,
    donationDeliveryInstructions,
    donationNotes,
    covidNotes,
    categoryNotes,
    eligibilityNotes,
    foodTypes,
    languages,
    confirmedName,
    confirmedCategories,
    confirmedAddress,
    confirmedPhone,
    confirmedEmail,
    confirmedHours,
    verificationStatusId,
    inactiveTemporary,
  } = model;
  try {
    let hoursSqlValues = hours.length
      ? hours
          .reduce((acc, cur) => {
            return (acc += `'(${cur.weekOfMonth},${cur.dayOfWeek},${cur.open},${cur.close})', `);
          }, "")
          .slice(0, -2)
      : "";
    const categories = "ARRAY[" + selectedCategoryIds.join(",") + "]::int[]";
    const formattedHours = "ARRAY[" + hoursSqlValues + "]::stakeholder_hours[]";

    // create_stakeholder is a postgres stored procedure. Source of this stored
    // procedure is in the repo at db/stored_procs/create_stakeholder.sql.
    // We pass in category_ids and stakeholder hours like this:
    // ARRAY[3,5,7]::int[],                                                      --array of integer category_ids
    // (ARRAY['(2,Wed,13:02,13:04)', '(3,Thu,07:00,08:00)'])::stakeholder_hours[]); --array of stakeholder_hours
    // objects, which are defined as a postgres type (see repo file for more detail on this type).
    const invokeSprocSql = `CALL create_stakeholder(
      ${toSqlString(name)}::VARCHAR, ${toSqlString(
      address1
    )}::VARCHAR, ${toSqlString(address2)}::VARCHAR,
      ${toSqlString(city)}::VARCHAR, ${toSqlString(
      state
    )}::VARCHAR, ${toSqlString(zip)}::VARCHAR,
      ${toSqlString(phone)}::VARCHAR,
      ${toSqlNumeric(latitude)}::NUMERIC, ${toSqlNumeric(longitude)}::NUMERIC,
      ${toSqlString(website)}::VARCHAR, ${toSqlBoolean(inactive)},
      ${toSqlString(notes)}::VARCHAR, ${toSqlString(requirements)}::VARCHAR,
      ${toSqlString(adminNotes)}::VARCHAR, ${toSqlNumeric(loginId)}::INT,
      ${toSqlString(parentOrganization)}::VARCHAR, ${toSqlString(
      physicalAccess
    )}::VARCHAR,
      ${toSqlString(email)}::VARCHAR, ${toSqlString(items)}::VARCHAR,
      ${toSqlString(services)}::VARCHAR, ${toSqlString(facebook)}::VARCHAR,
      ${toSqlString(twitter)}::VARCHAR, ${toSqlString(pinterest)}::VARCHAR,
      ${toSqlString(linkedin)}::VARCHAR, ${toSqlString(description)}::VARCHAR,
      ${toSqlTimestamp(submittedDate)}::TIMESTAMPTZ, ${toSqlNumeric(
      submittedLoginId
    )}::INT,
      ${toSqlTimestamp(approvedDate)}::TIMESTAMP, ${toSqlTimestamp(
      rejectedDate
    )}::TIMESTAMP,
      ${toSqlNumeric(reviewedLoginId)}::INT,
      ${toSqlTimestamp(assignedDate)}::TIMESTAMP, ${toSqlNumeric(
      assignedLoginId
    )}::INT,
      ${toSqlTimestamp(claimedDate)}::TIMESTAMP, ${toSqlNumeric(
      claimedLoginId
    )}::INT,
      ${toSqlString(reviewNotes)}::VARCHAR, ${toSqlString(instagram)}::VARCHAR,
      ${toSqlString(adminContactName)}::VARCHAR, ${toSqlString(
      adminContactPhone
    )}::VARCHAR,
      ${toSqlString(adminContactEmail)}::VARCHAR,
      ${toSqlString(donationContactName)}::VARCHAR,
      ${toSqlString(donationContactPhone)}::VARCHAR,
      ${toSqlString(donationContactEmail)}::VARCHAR,
      ${toSqlBoolean(donationPickup)},
      ${toSqlBoolean(donationAcceptFrozen)},
      ${toSqlBoolean(donationAcceptRefrigerated)},
      ${toSqlBoolean(donationAcceptPerishable)},
      ${toSqlString(donationSchedule)}::VARCHAR,
      ${toSqlString(donationDeliveryInstructions)}::VARCHAR,
      ${toSqlString(donationNotes)}::VARCHAR,
      ${toSqlString(covidNotes)}::VARCHAR,
      ${toSqlString(categoryNotes)}::VARCHAR,
      ${toSqlString(eligibilityNotes)}::VARCHAR,
      ${toSqlString(foodTypes)}::VARCHAR,
      ${toSqlString(languages)}::VARCHAR,
      ${toSqlBoolean(confirmedName)},
      ${toSqlBoolean(confirmedCategories)},
      ${toSqlBoolean(confirmedAddress)},
      ${toSqlBoolean(confirmedPhone)},
      ${toSqlBoolean(confirmedEmail)},
      ${toSqlBoolean(confirmedHours)},
      ${toSqlNumeric(verificationStatusId)}::INT,
      ${toSqlBoolean(inactiveTemporary)},
      ${categories}, ${formattedHours})`;
    const stakeholderResult = await pool.query(invokeSprocSql);
    return stakeholderResult;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

const assign = async (model) => {
  const { id, userLoginId, loginId } = model;
  const sql = `update stakeholder set
                assigned_login_id = ${toSqlNumeric(loginId)},
                assigned_date = CURRENT_TIMESTAMP,
                submitted_date = null,
                submitted_login_id = null,
                modified_login_id = ${toSqlNumeric(userLoginId)},
                modified_date = CURRENT_TIMESTAMP,
                approved_date = null,
                reviewed_login_id = null,
                verification_status_id = 2
              where id = ${id}`;
  await pool.query(sql);
};

const needsVerification = async (model) => {
  const { id, userLoginId, message } = model;
  const sql = `update stakeholder set
                assigned_login_id = null,
                assigned_date = null,
                submitted_date = null,
                submitted_login_id = null,
                modified_login_id = ${toSqlNumeric(userLoginId)},
                modified_date = CURRENT_TIMESTAMP,
                approved_date = null,
                reviewed_login_id = null,
                verification_status_id = 1,
                review_notes = CASE WHEN length(review_notes) > 0  THEN review_notes ${
                  message
                    ? ` || chr(10) || chr(10) || ${toSqlString(message)} `
                    : ""
                } ELSE ${toSqlString(message)} END
              where id = ${id}`;
  await pool.query(sql);
};

const claim = async (model) => {
  const { id, userLoginId, loginId, setClaimed } = model;
  const sql = `update stakeholder set
                claimed_login_id = ${
                  setClaimed ? toSqlNumeric(loginId) : "null"
                },
                claimed_date = ${setClaimed ? "CURRENT_TIMESTAMP" : "null"},
                modified_login_id = ${toSqlNumeric(userLoginId)},
                modified_date = CURRENT_TIMESTAMP,
              where id = ${id}`;
  await pool.query(sql);
};

const update = async (model) => {
  const {
    id,
    name,
    address1,
    address2,
    city,
    state,
    zip,
    phone,
    latitude,
    longitude,
    website,
    inactive,
    notes,
    requirements,
    adminNotes,
    selectedCategoryIds,
    hours,
    parentOrganization,
    physicalAccess,
    email,
    items,
    services,
    facebook,
    twitter,
    pinterest,
    linkedin,
    loginId,
    description,
    submittedDate,
    submittedLoginId,
    approvedDate,
    rejectedDate,
    reviewedLoginId,
    assignedDate,
    assignedLoginId,
    claimedDate,
    claimedLoginId,
    reviewNotes,
    instagram,
    adminContactName,
    adminContactPhone,
    adminContactEmail,
    donationContactName,
    donationContactPhone,
    donationContactEmail,
    donationPickup,
    donationAcceptFrozen,
    donationAcceptRefrigerated,
    donationAcceptPerishable,
    donationSchedule,
    donationDeliveryInstructions,
    donationNotes,
    covidNotes,
    categoryNotes,
    eligibilityNotes,
    foodTypes,
    languages,
    confirmedName,
    confirmedCategories,
    confirmedAddress,
    confirmedPhone,
    confirmedEmail,
    confirmedHours,
    verificationStatusId,
    inactiveTemporary,
  } = model;

  let hoursSqlValues = hours.length
    ? hours
        .reduce((acc, cur) => {
          return (acc += `'(${cur.weekOfMonth},${cur.dayOfWeek},${cur.open},${cur.close})', `);
        }, "")
        .slice(0, -2)
    : "";
  const categories = "ARRAY[" + selectedCategoryIds.join(",") + "]::int[]";
  const formattedHours = "ARRAY[" + hoursSqlValues + "]::stakeholder_hours[]";

  // update_stakeholder is a postgres stored procedure. Source of this stored
  // procedure is in the repo at db/stored_procs/update_stakeholder.sql.
  //
  // Currently, it updates stakeholder category and schedule by deleting the existing category/schedule rows,
  // and creating new ones.
  //
  // We pass in category_ids and stakeholder hours like this:
  // ARRAY[3,5,7]::int[],                                                      --array of integer category_ids
  // (ARRAY['(2,Wed,13:02,13:04)', '(3,Thu,07:00,08:00)'])::stakeholder_hours[]); --array of stakeholder_hours
  // objects, which are defined as a postgres type (see repo file for more detail on this type).
  const invokeSprocSql = `CALL update_stakeholder (
    ${toSqlString(name)}::VARCHAR, ${toSqlString(
    address1
  )}::VARCHAR, ${toSqlString(address2)}::VARCHAR,
    ${toSqlString(city)}::VARCHAR, ${toSqlString(
    state
  )}::VARCHAR, ${toSqlString(zip)}::VARCHAR, ${toSqlString(phone)}::VARCHAR,
    ${toSqlNumeric(latitude)}::NUMERIC, ${toSqlNumeric(
    longitude
  )}::NUMERIC, ${toSqlString(website)}::VARCHAR,
    ${toSqlBoolean(inactive)}, ${toSqlString(notes)}::VARCHAR, ${toSqlString(
    requirements
  )}::VARCHAR,
    ${toSqlString(adminNotes)}::VARCHAR, ${toSqlString(
    parentOrganization
  )}::VARCHAR, ${toSqlString(physicalAccess)}::VARCHAR,
    ${toSqlString(email)}::VARCHAR, ${toSqlString(
    items
  )}::VARCHAR, ${toSqlString(services)}::VARCHAR, ${toSqlString(
    facebook
  )}::VARCHAR,
    ${toSqlString(twitter)}::VARCHAR, ${toSqlString(
    pinterest
  )}::VARCHAR, ${toSqlString(linkedin)}::VARCHAR, ${toSqlString(
    description
  )}::VARCHAR,
    ${toSqlNumeric(loginId)}::INT, ${toSqlTimestamp(
    submittedDate
  )}::TIMESTAMPTZ, ${toSqlNumeric(submittedLoginId)}::INT,
    ${toSqlTimestamp(approvedDate)}::TIMESTAMP, ${toSqlTimestamp(
    rejectedDate
  )}::TIMESTAMP, ${toSqlNumeric(reviewedLoginId)}::INT,
    ${toSqlTimestamp(assignedDate)}::TIMESTAMP, ${toSqlNumeric(
    assignedLoginId
  )}::INT, ${toSqlTimestamp(claimedDate)}::TIMESTAMP,
    ${toSqlNumeric(claimedLoginId)}::INT, ${toSqlString(
    reviewNotes
  )}::VARCHAR, ${toSqlString(instagram)}::VARCHAR,
    ${toSqlString(adminContactName)}::VARCHAR, ${toSqlString(
    adminContactPhone
  )}::VARCHAR, ${toSqlString(adminContactEmail)}::VARCHAR,
    ${toSqlString(donationContactName)}::VARCHAR, ${toSqlString(
    donationContactPhone
  )}::VARCHAR, ${toSqlString(donationContactEmail)}::VARCHAR,
    ${toSqlBoolean(donationPickup)}, ${toSqlBoolean(
    donationAcceptFrozen
  )}, ${toSqlBoolean(donationAcceptRefrigerated)},
    ${toSqlBoolean(donationAcceptPerishable)}, ${toSqlString(
    donationSchedule
  )}::VARCHAR, ${toSqlString(donationDeliveryInstructions)}::VARCHAR,
    ${toSqlString(donationNotes)}::VARCHAR, ${toSqlString(
    covidNotes
  )}::VARCHAR, ${toSqlString(categoryNotes)}::VARCHAR,
    ${toSqlString(eligibilityNotes)}::VARCHAR, ${toSqlString(
    foodTypes
  )}::VARCHAR, ${toSqlString(languages)}::VARCHAR,
    ${toSqlBoolean(confirmedName)}, ${toSqlBoolean(
    confirmedCategories
  )}, ${toSqlBoolean(confirmedAddress)},
    ${toSqlBoolean(confirmedPhone)}, ${toSqlBoolean(
    confirmedEmail
  )}, ${toSqlBoolean(confirmedHours)},
    ${toSqlNumeric(verificationStatusId)}::INT, ${toSqlBoolean(
    inactiveTemporary
  )},
    ${id}, ${categories}, ${formattedHours})`;

  await pool.query(invokeSprocSql);
};

const remove = (id) => {
  const sql = `delete from stakeholder where id = ${id}`;
  return pool.query(sql).then((res) => {
    return res;
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
    select * from stakeholder
    where stakeholder.name ilike ${nameClause}
    and stakeholder.id in (
      select stakeholder_id from stakeholder_category_set
    )
  )`;
  return cteClause;
};

const buildLocationClause = (latitude, longitude, distance) => {
  var locationClause = "";
  const radius = Number(distance || 0);
  if (latitude && longitude && radius) {
    // Calculate a bounding box to limit our search to only stakeholders
    // that are within our search distance.
    const degToRads = Math.PI / 180.0;
    const radsToDegs = 180.0 / Math.PI;
    const earthRadius = 3960.0; // since when it the earth a perfect sphere? Oh well.
    // r: radius of a circle around the earth at the given latitude
    const r = earthRadius * Math.cos(latitude * degToRads);
    const latitude_min = Number(latitude) - radius / milesPerLatitudeDegree;
    const latitude_max = Number(latitude) + radius / milesPerLatitudeDegree;
    const longitude_min = Number(longitude) - (radius / r) * radsToDegs;
    const longitude_max = Number(longitude) + (radius / r) * radsToDegs;
    locationClause =
      "AND (s.latitude >= " +
      latitude_min +
      " AND s.latitude <= " +
      latitude_max +
      " AND s.longitude >= " +
      longitude_min +
      " AND s.longitude <= " +
      longitude_max +
      ")";
  }
  return locationClause;
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
    concat(L2.first_name, ' ', L1.last_name) as modified_user,
    concat(L3.first_name, ' ', L1.last_name) as submitted_user,
    concat(L4.first_name, ' ', L1.last_name) as reviewed_user,
    concat(L5.first_name, ' ', L1.last_name) as assigned_user,
    concat(L6.first_name, ' ', L1.last_name) as claimed_user
  `;
};

module.exports = {
  search,
  searchDashboard,
  selectById,
  insert,
  update,
  remove,
  needsVerification,
  assign,
  claim,
};
