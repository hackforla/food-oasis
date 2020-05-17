const { pool } = require("./postgres-pool");
const {
  toSqlString,
  toSqlNumeric,
  toSqlBoolean,
  toSqlTimestamp,
} = require("./postgres-utils");

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
  const categoryClause = `(select sc.stakeholder_id 
    from stakeholder_category sc 
    where sc.category_id in (${categoryIds.join(",")}))`;
  const nameClause = "'%" + name.replace(/'/g, "''") + "%'";
  const sql = `
    select s.id, s.name, s.address_1, s.address_2, s.city, s.state, s.zip,
      s.phone, s.latitude, s.longitude, s.website,  s.notes,
      (select array(select row_to_json(row) 
        from (
          select day_of_week, open, close, week_of_month 
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
    where s.name ilike ${nameClause} 
    ${
      categoryIds && categoryIds.length > 0
        ? ` and s.id in ${categoryClause} `
        : ""
    }
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
  //console.log(sql);
  const stakeholderResult = await pool.query(sql);
  let stakeholders = [];
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
        ) * 69.097;
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
    const sql = `insert into stakeholder 
    (name, address_1, address_2, 
      city, state, zip, 
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
    values (
      ${toSqlString(name)}, ${toSqlString(address1)}, ${toSqlString(address2)}, 
      ${toSqlString(city)}, ${toSqlString(state)}, ${toSqlString(zip)}, 
      ${toSqlString(phone)}, 
      ${toSqlNumeric(latitude)}, ${toSqlNumeric(longitude)}, 
      ${toSqlString(website)}, ${toSqlBoolean(inactive)}, 
      ${toSqlString(notes)}, ${toSqlString(requirements)},
      ${toSqlString(adminNotes)}, ${toSqlNumeric(loginId)},
      ${toSqlString(parentOrganization)}, ${toSqlString(physicalAccess)},
      ${toSqlString(email)}, ${toSqlString(items)},
      ${toSqlString(services)}, ${toSqlString(facebook)},
      ${toSqlString(twitter)}, ${toSqlString(pinterest)},
      ${toSqlString(linkedin)}, ${toSqlString(description)},
      ${toSqlTimestamp(submittedDate)}, ${toSqlNumeric(submittedLoginId)},
      ${toSqlTimestamp(approvedDate)}, ${toSqlTimestamp(rejectedDate)}, 
      ${toSqlNumeric(reviewedLoginId)},
      ${toSqlTimestamp(assignedDate)}, ${toSqlNumeric(assignedLoginId)},
      ${toSqlTimestamp(claimedDate)}, ${toSqlNumeric(claimedLoginId)},
      ${toSqlString(reviewNotes)}, ${toSqlString(instagram)}, 
      ${toSqlString(adminContactName)}, ${toSqlString(adminContactPhone)}, 
      ${toSqlString(adminContactEmail)}, 
      ${toSqlString(donationContactName)}, 
      ${toSqlString(donationContactPhone)}, 
      ${toSqlString(donationContactEmail)}, 
      ${toSqlBoolean(donationPickup)}, 
      ${toSqlBoolean(donationAcceptFrozen)}, 
      ${toSqlBoolean(donationAcceptRefrigerated)}, 
      ${toSqlBoolean(donationAcceptPerishable)}, 
      ${toSqlString(donationSchedule)}, 
      ${toSqlString(donationDeliveryInstructions)}, 
      ${toSqlString(donationNotes)},
      ${toSqlString(covidNotes)},
      ${toSqlString(categoryNotes)},
      ${toSqlString(eligibilityNotes)},
      ${toSqlString(foodTypes)},
      ${toSqlString(languages)},
      ${toSqlBoolean(confirmedName)},
      ${toSqlBoolean(confirmedCategories)},
      ${toSqlBoolean(confirmedAddress)},
      ${toSqlBoolean(confirmedPhone)},
      ${toSqlBoolean(confirmedEmail)},
      ${toSqlBoolean(confirmedHours)},
      ${toSqlNumeric(verificationStatusId)},
      ${toSqlBoolean(inactiveTemporary)}
    ) returning id`;
    const stakeholderResult = await pool.query(sql);
    const retObject = stakeholderResult.rows[0];
    const id = retObject.id;

    for (let i = 0; i < selectedCategoryIds.length; i++) {
      const categoryId = selectedCategoryIds[i];
      const sqlInsert = `insert into stakeholder_category 
    (stakeholder_id, category_id) 
    values (${id}, ${categoryId})`;
      await pool.query(sqlInsert);
    }

    let hoursSqlValues = hours.length
      ? hours
          .reduce((acc, cur) => {
            return (acc += `(${id}, '${cur.dayOfWeek}', '${cur.open}', '${cur.close}', ${cur.weekOfMonth}), `);
          }, "")
          .slice(0, -2)
      : null;

    const hoursSqlInsert = `insert into stakeholder_schedule 
      (stakeholder_id, day_of_week, open, close, week_of_month) 
      values ${hoursSqlValues}`;

    if (hoursSqlValues) {
      pool.query(hoursSqlInsert, (insertErr) => {
        if (insertErr) {
          throw new Error(insertErr);
        }
      });
    }

    return retObject;
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

  // update_stakeholder_schedule_category is a postgres stored procedure. Source of this stored
  // procedure is in the repo at db/stored_procs/update_stakeholder_schedule_category.sql.
  //
  // Here's an example invocation:
  // CALL update_stakeholder_schedule_category(4437,                           --stakeholder.id
  // ARRAY[3,5,7]::int[],                                                      --array of integer category_ids
  // (ARRAY['(2,Wed,13:02,13:04)', '(3,Thu,07:00,08:00)'])::stakeholder_hours[]); --array of stakeholder_hours
  // objects, which are defined as a postgres type (see repo file for more detail on this type).
  //
  // Currently, it updates stakeholder category and schedule by deleting the existing category/schedule rows,
  // and creating new ones.
  const invokeSprocSql = `CALL update_stakeholder_schedule_category(${id}, ${categories}, ${formattedHours})`;
  try {
    await pool.query(invokeSprocSql);
  } catch (e) {
    console.error(e);
    // If this fails we don't update anything
    return Promise.reject(e.message);
  }
  try {
    const sql = `
    update stakeholder set
      name = ${toSqlString(name)}, 
      address_1 = ${toSqlString(address1)}, 
      address_2 = ${toSqlString(address2)}, 
      city = ${toSqlString(city)}, 
      state = ${toSqlString(state)}, 
      zip = ${toSqlString(zip)}, 
      phone = ${toSqlString(phone)}, 
      latitude = ${toSqlNumeric(latitude)}, 
      longitude = ${toSqlNumeric(longitude)}, 
      website = ${toSqlString(website)}, 
      inactive = ${toSqlBoolean(inactive)}, 
      notes = ${toSqlString(notes)},
      requirements = ${toSqlString(requirements)},
      admin_notes = ${toSqlString(adminNotes)},
      parent_organization = ${toSqlString(parentOrganization)},
      physical_access = ${toSqlString(physicalAccess)},
      email = ${toSqlString(email)},
      items = ${toSqlString(items)},
      services = ${toSqlString(services)},
      facebook = ${toSqlString(facebook)},
      twitter = ${toSqlString(twitter)},
      pinterest = ${toSqlString(pinterest)},
      linkedin = ${toSqlString(linkedin)},
      description = ${toSqlString(description)},
      modified_login_id = ${toSqlNumeric(loginId)},
      modified_date = CURRENT_TIMESTAMP,
      submitted_date = ${toSqlTimestamp(submittedDate)}, 
      submitted_login_id = ${toSqlNumeric(submittedLoginId)},
      approved_date = ${toSqlTimestamp(approvedDate)}, 
      rejected_date = ${toSqlTimestamp(rejectedDate)}, 
      reviewed_login_id = ${toSqlNumeric(reviewedLoginId)},
      assigned_date = ${toSqlTimestamp(assignedDate)}, 
      assigned_login_id = ${toSqlNumeric(assignedLoginId)},
      claimed_date = ${toSqlTimestamp(claimedDate)}, 
      claimed_login_id = ${toSqlNumeric(claimedLoginId)},
      review_notes = ${toSqlString(reviewNotes)}, 
      instagram = ${toSqlString(instagram)}, 
      admin_contact_name = ${toSqlString(adminContactName)}, 
      admin_contact_phone = ${toSqlString(adminContactPhone)}, 
      admin_contact_email = ${toSqlString(adminContactEmail)}, 
      donation_contact_name = ${toSqlString(donationContactName)}, 
      donation_contact_phone = ${toSqlString(donationContactPhone)}, 
      donation_contact_email = ${toSqlString(donationContactEmail)}, 
      donation_pickup = ${toSqlBoolean(donationPickup)}, 
      donation_accept_frozen = ${toSqlBoolean(donationAcceptFrozen)}, 
      donation_accept_refrigerated = ${toSqlBoolean(
        donationAcceptRefrigerated
      )}, 
      donation_accept_perishable = ${toSqlBoolean(donationAcceptPerishable)}, 
      donation_schedule = ${toSqlString(donationSchedule)}, 
      donation_delivery_instructions = ${toSqlString(
        donationDeliveryInstructions
      )}, 
      donation_notes = ${toSqlString(donationNotes)},
      covid_notes = ${toSqlString(covidNotes)},
      category_notes = ${toSqlString(categoryNotes)},
      eligibility_notes = ${toSqlString(eligibilityNotes)},
      food_types = ${toSqlString(foodTypes)},
      languages = ${toSqlString(languages)},
      v_name = ${toSqlBoolean(confirmedName)},
      v_categories = ${toSqlBoolean(confirmedCategories)},
      v_address = ${toSqlBoolean(confirmedAddress)},
      v_phone = ${toSqlBoolean(confirmedPhone)},
      v_email = ${toSqlBoolean(confirmedEmail)},
      v_hours = ${toSqlBoolean(confirmedHours)},
      verification_status_id = ${toSqlNumeric(verificationStatusId)},
      inactive_temporary = ${toSqlBoolean(inactiveTemporary)}
    where id = ${id}`;
    await pool.query(sql);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const remove = (id) => {
  const sql = `delete from stakeholder where id = ${id}`;
  return pool.query(sql).then((res) => {
    return res;
  });
};

module.exports = {
  search,
  selectById,
  insert,
  update,
  remove,
  needsVerification,
  assign,
  claim,
};
