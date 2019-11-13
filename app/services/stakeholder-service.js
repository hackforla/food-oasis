const { pool } = require("./postgres-pool");

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
      name: row.name,
      address1: row.address_1,
      address2: row.address_2,
      city: row.city,
      state: row.state,
      zip: row.zip,
      phone: row.phone,
      latitude: row.latitude ? Number(row.latitude) : null,
      longitude: row.longitude ? Number(row.longitude) : null,
      website: row.website,
      active: row.active,
      notes: row.notes,
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
    stakeholder.distance =
      Math.sqrt(
        (Math.abs(stakeholder.longitude - longitude) *
          Math.cos((latitude / 360) * 2 * Math.PI)) **
          2 +
          Math.abs(stakeholder.latitude - latitude) ** 2
      ) * 69.097;
  });
  // Should move sorting into stored proc
  stakeholders.sort((a, b) => a.distance - b.distance);
  // Should move distance filter into stored proc
  if (distance) {
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

const selectById = id => {
  const sql = `select s.* 
    from stakeholder s 
    where s.id = ${id}`;
  return pool.query(sql).then(res => {
    return res.rows[0];
  });
};

const insert = model => {
  const { name } = model;
  const sql = `insert into stakeholder (name) values ('${name}') returning id`;
  return pool.query(sql).then(res => {
    return res.rows[0];
  });
};

const update = model => {
  const { id, name } = model;
  const sql = `update stakeholder
               set name = '${name}'
                where id = ${id}`;
  return pool.query(sql).then(res => {
    return res;
  });
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
