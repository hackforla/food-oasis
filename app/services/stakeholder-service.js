const { pool } = require("./postgres-pool");
const { toSqlString, toSqlNumeric, toSqlBoolean } = require("./postgres-utils");

const selectAll = async (name, categoryIds, latitude, longitude, distance) => {
  const categoryClause = "(" + categoryIds.join(",") + ")";
  const nameClause = "'%" + name + "%'";
  const sql = `
    select s.id, s.name, s.address_1, s.address_2, s.city, s.state, s.zip,
      s.phone, s.latitude, s.longitude, s.website, s.active, s.notes
    from stakeholder s
    left join stakeholder_category sc on s.id = sc.stakeholder_id
    left join category c on sc.category_id = c.id 
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
      active: row.active || true,
      notes: row.notes || "",
      categories: []
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

const getStakeholderCategories = async stakeholderId => {
  const sql = `select sc.stakeholder_id, sc.category_id, c.name
  from stakeholder_category sc 
  join category c on sc.category_id = c.id
  where sc.stakeholder_id = ${stakeholderId} `;
  const stakeholderCategoriesResult = await pool.query(sql);
  return stakeholderCategoriesResult;
};

const selectById = async id => {
  const sql = `select s.* 
    from stakeholder s 
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
    active: row.active || true,
    notes: row.notes || "",
    categories: []
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
    active,
    notes,
    selectedCategoryIds
  } = model;
  try {
    const sql = `insert into stakeholder 
    (name, address_1, address_2, 
      city, state, zip, 
      phone, latitude, longitude, 
      website, active, notes) 
    values (
    ${toSqlString(name)}, ${toSqlString(address1)}, ${toSqlString(address2)}, 
    ${toSqlString(city)}, ${toSqlString(state)}, ${toSqlString(zip)}, 
    ${toSqlString(phone)}, 
    ${toSqlNumeric(latitude)}, ${toSqlNumeric(longitude)}, 
    ${toSqlString(website)}, ${toSqlBoolean(active)}, 
    ${toSqlString(notes)}) returning id`;
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
    active,
    notes,
    selectedCategoryIds
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
               active = ${toSqlBoolean(active)}, 
               notes = ${toSqlString(notes)}
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
