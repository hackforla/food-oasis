const { pool } = require("./postgres-pool");
const { toSqlString, toSqlNumeric, toSqlBoolean } = require("./postgres-utils");

const selectAll = async (name, categoryIds, latitude, longitude, distance) => {
  const categoryClause = "(" + categoryIds.join(",") + ")";
  const nameClause = "'%" + name + "%'";
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
      s.created_date, s.created_login_id, 
      s.modified_date, s.modified_login_id,
      s.verified_date, s.verified_login_id,
      s.requirements, s.admin_notes, s.inactive,
      L1.first_name || ' ' || L1.last_name as created_user,
      L2.first_name || ' ' || L2.last_name as modified_user,
      L3.first_name || ' ' || L3.last_name as verified_user,
      s.parent_organization, s.physical_access, s.email,
      s.items, s.services, s.facebook,
      s.twitter, s.pinterest, s.linkedin, s.description
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
      description: row.description
    });
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

const selectById = async id => {
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
      s.created_date, s.created_login_id, 
      s.modified_date, s.modified_login_id,
      s.verified_date, s.verified_login_id,
      s.requirements, s.admin_notes, s.inactive,
      L1.first_name || ' ' || L1.last_name as created_user,
      L2.first_name || ' ' || L2.last_name as modified_user,
      L3.first_name || ' ' || L3.last_name as verified_user,
      s.parent_organization, s.physical_access, s.email,
      s.items, s.services, s.facebook,
      s.twitter, s.pinterest, s.linkedin, s.description
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
    description: row.description
  };

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
    description
  } = model;
  try {
    const sql = `insert into stakeholder 
    (name, address_1, address_2, 
      city, state, zip, 
      phone, latitude, longitude, 
      website, inactive, notes, requirements, admin_notes, created_login_id,
      parent_organization, physical_access, email,
      items, services, facebook, twitter, pinterest, linkedin, description) 
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
      ${toSqlString(linkedin)}, ${toSqlString(description)}
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
      console.log('hitttttttt')
      pool.query(hoursSqlInsert, (insertErr, insertRes) => {
        if (insertErr) {
          console.log("sql insert error", insertErr);
        }
      })
    }

    return retObject;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

const verify = async model => {
  const { id, loginId, setVerified } = model;
  const sql = `update stakeholder set
               verified_login_id = ${
                 setVerified ? toSqlNumeric(loginId) : "null"
               },
               verified_date = ${setVerified ? "CURRENT_TIMESTAMP" : "null"}
              where id = ${id}`;
  const result = await pool.query(sql);
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
    description
  } = model;

  const hoursSqlDelete = `delete from stakeholder_schedule where stakeholder_id = ${id}`;

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

  pool.query(hoursSqlDelete, (deleteErr, deleteRes) => {
    if (deleteErr) {
      console.log("sql delete error", deleteErr);
    } else {
      if (hoursSqlValues) {
        pool.query(hoursSqlInsert, (insertErr, insertRes) => {
          if (insertErr) {
            console.log("sql insert error", insertErr);
          }
        });
      }
    }
  });
}

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
  remove,
  verify
};
