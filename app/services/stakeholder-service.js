const { pool } = require("./postgres-pool");
const { toSqlString, toSqlNumeric, toSqlBoolean } = require("./postgres-utils");

const selectAll = async (name, categoryIds, latitude, longitude, distance) => {
  const categoryClause = "(" + categoryIds.join(",") + ")";
  const nameClause = "'%" + name + "%'";
  const sql = `
    select s.id, s.name, s.address_1, s.address_2, s.city, s.state, s.zip,
      s.phone, s.latitude, s.longitude, s.website,  s.notes,
      s.created_date, s.created_login_id, 
      s.modified_date, s.modified_login_id,
      s.verified_date, s.verified_login_id,
      s.requirements, s.admin_notes, s.inactive,
      L1.email as created_user,
      L2.email as modified_user,
      L3.email as verified_user
    from stakeholder s
    left join stakeholder_category sc on s.id = sc.stakeholder_id
    left join category c on sc.category_id = c.id 
    left join login L1 on s.created_login_id = L1.id
    left join login L2 on s.modified_login_id = L2.id
    left join login L3 on s.verified_login_id = L3.id
    where c.id in ${categoryClause}
    and s.name ilike ${nameClause} 
    order by s.name
  `;
  const stakeholderResult = await pool.query(sql);
  let stakeholders = [];
  stakeholderResult.rows.forEach(row => {
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
      verifiedDate: row.verified_date,
      verfiedLoginId: row.verified_login_id,
      requirements: row.requirements || "",
      adminNotes: row.admin_notes || "",
      inactive: row.inactive,
      createdUser: row.created_user || "",
      modifiedUser: row.modified_user || "",
      verifiedUser: row.verified_user || "",
      categories: [],
      schedules: []
    });
  });

  // unfortunately, pg doesn't support multiple result sets, so
  // we have to hit the server a second time to get stakeholders' categories
  const stakeholderCategoryResult = await getAllStakeholderCategories(
    categoryClause,
    nameClause
  );
  stakeholderCategories = [];
  stakeholderCategoryResult.rows.forEach(stakeholderCategory => {
    const parent = stakeholders.find(
      stakeholder => stakeholder.id == stakeholderCategory.stakeholder_id
    );
    const category = {
      id: stakeholderCategory.category_id,
      name: stakeholderCategory.name
    };
    if (parent && parent.categories) {
      parent.categories.push(category);
    } else {
      parent.categories = [category];
    }
  });

  // Should move distance calc into stored proc
  stakeholders.forEach(stakeholder => {
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
      stakeholder => stakeholder.distance <= distance
    );
  }

  // and a third query to get schedules
  const stakeholderScheduleResult = await getAllStakeholderSchedules(
    categoryClause,
    nameClause
  );
  stakeholderCategories = [];
  stakeholderScheduleResult.rows.forEach(stakeholderSchedule => {
    const parent = stakeholders.find(
      stakeholder => stakeholder.id == stakeholderSchedule.stakeholder_id
    );
    const schedule = {
      dayOfWeek: stakeholderSchedule.day_of_week,
      open: stakeholderSchedule.open,
      close: stakeholderSchedule.close,
      weekOfMonth: stakeholderSchedule.week_of_month,
      seasonId: stakeholderSchedule.season_id
    };
    if (parent && parent.schedules) {
      parent.schedules.push(schedule);
    } else {
      parent.schedules = [schedule];
    }
  });

  return stakeholders;
};

const getAllStakeholderCategories = async (categoryClause, nameClause) => {
  const sql = `select sc.stakeholder_id, sc.category_id, c.name
  from stakeholder_category sc 
  join category c on sc.category_id = c.id
  join stakeholder s on s.id = sc.stakeholder_id
  where c.id in ${categoryClause}
  and s.name ilike ${nameClause} `;
  const stakeholderCategoriesResult = await pool.query(sql);
  return stakeholderCategoriesResult;
};

const getAllStakeholderSchedules = async (categoryClause, nameClause) => {
  const sql = `select 
    ss.stakeholder_id, ss.day_of_week, ss.open, ss.close, 
    ss.week_of_month, ss.season_id, 
    se.name, se.start_date, se.end_date, dow.display_order
  from stakeholder_category sc 
  join category c on sc.category_id = c.id
  join stakeholder s on s.id = sc.stakeholder_id
  join stakeholder_schedule ss on s.id = ss.stakeholder_id
  left join stakeholder_season se on ss.season_id = se.id
  left join day_of_week dow on ss.day_of_week = dow.name
  where c.id in ${categoryClause}
  and s.name ilike ${nameClause}
  order by s.id, dow.display_order `;
  const stakeholderCategoriesResult = await pool.query(sql);
  return stakeholderCategoriesResult;
};

const getStakeholderCategories = async stakeholderId => {
  const sql = `select sc.stakeholder_id, sc.category_id, c.name
  from stakeholder_category sc 
  join category c on sc.category_id = c.id
  where sc.stakeholder_id = ${stakeholderId} `;
  const stakeholderCategoriesResult = await pool.query(sql);
  return stakeholderCategoriesResult;
};

const getStakeholderSchedules = async stakeholderId => {
  const sql = `select 
    ss.stakeholder_id, ss.day_of_week, ss.open, ss.close, 
    ss.week_of_month, ss.season_id, 
    se.name, se.start_date, se.end_date,
    dow.display_order
  from stakeholder_schedule ss
  left join stakeholder_season se on ss.season_id = se.id
  left join day_of_week dow on ss.day_of_week = dow.name
  where ss.stakeholder_id = ${stakeholderId}
  order by dow.display_order `;
  const stakeholderCategoriesResult = await pool.query(sql);
  return stakeholderCategoriesResult;
};

const selectById = async id => {
  const sql = `select 
      s.id, s.name, s.address_1, s.address_2, s.city, s.state, s.zip,
      s.phone, s.latitude, s.longitude, s.website,  s.notes,
      s.created_date, s.created_login_id, 
      s.modified_date, s.modified_login_id,
      s.verified_date, s.verified_login_id,
      s.requirements, s.admin_notes, s.inactive,
      L1.email as created_user,
      L2.email as modified_user,
      L3.email as verified_user
    from stakeholder s 
    left join login L1 on s.created_login_id = L1.id
    left join login L2 on s.modified_login_id = L2.id
    left join login L3 on s.verified_login_id = L3.id
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
    verifiedDate: row.verified_date,
    verfiedLoginId: row.verified_login_id,
    requirements: row.requirements || "",
    adminNotes: row.admin_notes || "",
    inactive: row.inactive,
    createdUser: row.created_user || "",
    modifiedUser: row.modified_user || "",
    verifiedUser: row.verified_user || "",
    categories: [],
    schedules: []
  };

  // unfortunately, pg doesn't support multiple result sets, so
  // we have to hit the server a second time to get stakeholders' categories
  const stakeholderCategoryResult = await getStakeholderCategories(id);
  stakeholderCategories = [];
  stakeholderCategoryResult.rows.forEach(stakeholderCategory => {
    const category = {
      id: stakeholderCategory.category_id,
      name: stakeholderCategory.name
    };
    if (stakeholder && stakeholder.categories) {
      stakeholder.categories.push(category);
    } else {
      stakeholder.categories = [category];
    }
  });

  // Don't have a distance, since we didn't specify origin
  stakeholder.distance = null;

  // Third query for schedule
  const stakeholderSchduleResult = await getStakeholderSchedules(id);
  stakeholderSchduleResult.rows.forEach(stakeholderSchedule => {
    const schedule = {
      dayOfWeek: stakeholderSchedule.day_of_week,
      open: stakeholderSchedule.open,
      close: stakeholderSchedule.close,
      weekOfMonth: stakeholderSchedule.week_of_month,
      seasonId: stakeholderSchedule.season_id
    };
    if (stakeholder && stakeholder.schedules) {
      stakeholder.schedules.push(schedule);
    } else {
      stakeholder.schedules = [schedule];
    }
  });

  return stakeholder;
};

const insert = async model => {
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
    schedules,
    loginId
  } = model;
  try {
    const sql = `insert into stakeholder 
    (name, address_1, address_2, 
      city, state, zip, 
      phone, latitude, longitude, 
      website, inactive, notes, requirements, adminNotes, created_login_id) 
    values (
    ${toSqlString(name)}, ${toSqlString(address1)}, ${toSqlString(address2)}, 
    ${toSqlString(city)}, ${toSqlString(state)}, ${toSqlString(zip)}, 
    ${toSqlString(phone)}, 
    ${toSqlNumeric(latitude)}, ${toSqlNumeric(longitude)}, 
    ${toSqlString(website)}, ${toSqlBoolean(inactive)}, 
    ${toSqlString(notes)}, ${toSqlString(requirements)},
    ${toSqlString(adminNotes)}, ${toSqlNumeric(loginId)}) returning id`;
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

    return retObject;
  } catch (err) {
    return new Error(err.message);
  }
};

const update = async model => {
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
    schedules,
    loginId
  } = model;
  const sql = `update stakeholder
               set name = ${toSqlString(name)}, 
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
               modified_login_id = ${toSqlNumeric(loginId)},
               modified_date = CURRENT_TIMESTAMP
              where id = ${id}`;
  const result = await pool.query(sql);

  const sqlDelete = `delete from stakeholder_category 
    where stakeholder_id = ${id}`;
  await pool.query(sqlDelete);

  for (let i = 0; i < selectedCategoryIds.length; i++) {
    const categoryId = selectedCategoryIds[i];
    const sqlInsert = `insert into stakeholder_category 
      (stakeholder_id, category_id) 
      values (${id}, ${categoryId})`;
    await pool.query(sqlInsert);
  }
};

const remove = id => {
  const sql = `delete from stakeholder where id = ${id}`;
  return pool.query(sql).then(res => {
    return res;
  });
};

module.exports = {
  selectAll,
  selectById,
  insert,
  update,
  remove
};
