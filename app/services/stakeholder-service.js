const { pool } = require("./postgres-pool");

const selectAll = async (categories, latitude, longitude) => {
  const categoryClause = "(" + categories.join(",") + ")";
  const sql = `
    select s.id, s.name, s.address_1, s.address_2, s.city, s.state, s.zip,
      s.phone, s.latitude, s.longitude, s.website, s.active, s.notes
    from stakeholder s
    left join stakeholder_category sc on s.id = sc.stakeholder_id
    left join category c on sc.category_id = c.id 
    where c.id in ${categoryClause}
    order by s.name
  `;
  const stakeholderResult = await pool.query(sql);
  const stakeholders = [];
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
  // we have to hit the server a second time to get organizations' regions.
  const stakeholderCategoryResult = await getAllStakeholderCategories(
    categoryClause
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
    if (parent.categories) {
      parent.categories.push(category);
    } else {
      parent.categories = [category];
    }
  });

  return stakeholders;
};

const getAllStakeholderCategories = async categoryClause => {
  const sql = `select sc.stakeholder_id, sc.category_id, c.name
  from stakeholder_category sc 
  join category c on sc.category_id = c.id
  join stakeholder s on s.id = sc.stakeholder_id
  where c.id in ${categoryClause}`;
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
