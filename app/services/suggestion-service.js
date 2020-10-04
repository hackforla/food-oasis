const { pool } = require("./postgres-pool");
const { toSqlString, toSqlNumeric } = require("./postgres-utils");

const selectAll = () => {
  const sql = `
		select sh.assigned_login_id, s.stakeholder_id, s.id, s.name, s.address_1 as address1, s.address_2 as address2, s.city, s.state, s.zip,
		s.phone, s.email, s.notes, s.tipster_name as tipsterName, s.tipster_phone as tipsterPhone, 
		s.tipster_email as tipsterEmail, s.hours, s.category, s.admin_notes
			from suggestion as s
			left join stakeholder as sh on sh.id = s.stakeholder_id
			order by s.stakeholder_id, s.created_date
	`;
  return pool.query(sql).then((res) => {
    return res.rows;
  });
};

const selectById = (id) => {
  const sql = `
  select id, name, address_1 as address1, address_2 as address3, city, state, zip,
  phone, email, notes,
  tipster_name as tipsterName, tipster_phone as tipsterPhone, tipster_email as tipsterEmail,
  hours, category, status, admin_notes
   from suggestion where id = ${id}`;
  return pool.query(sql).then((res) => {
    return res.rows[0];
  });
};

const selectByAssignedUser = (userId) => {
  const sql = `
		select s.stakeholder_id, s.id, s.name, s.address_1 as address1, s.address_2 as address2, s.city, s.state, s.zip,
		s.phone, s.email, s.notes, s.tipster_name as tipsterName, s.tipster_phone as tipsterPhone, 
		s.tipster_email as tipsterEmail, s.hours, s.category, s.admin_notes
			from suggestion as s
			join stakeholder as sh on sh.id = s.stakeholder_id
			where sh.assigned_login_id = ${userId}
	`;
  return pool.query(sql).then((res) => {
    return res.rows;
  });
};

const insert = (model) => {
  const {
    id,
    name,
    address1,
    address2,
    city,
    state,
    zip,
    phone,
    email,
    notes,
    tipsterName,
    tipsterPhone,
    tipsterEmail,
    hours,
    category,
  } = model;
  const sql = `insert into suggestion (
		stakeholder_id,
    name,
    address_1,
    address_2,
    city,
    state,
    zip,
    phone,
    email,
    notes,
    tipster_name,
    tipster_phone,
    tipster_email,
    hours,
    category
    ) values (
			${toSqlNumeric(id)},
      ${toSqlString(name)},
      ${toSqlString(address1)},
      ${toSqlString(address2)},
      ${toSqlString(city)},
      ${toSqlString(state)},
      ${toSqlString(zip)},
      ${toSqlString(phone)},
      ${toSqlString(email)},
      ${toSqlString(notes)},
      ${toSqlString(tipsterName)},
      ${toSqlString(tipsterPhone)},
      ${toSqlString(tipsterEmail)},
      ${toSqlString(hours)},
      ${toSqlString(category)}
    ) 
  returning id`;
  return pool.query(sql).then((res) => {
    return res.rows[0];
  });
};

// const update = (model) => {
//   const { id, name } = model;
//   // Partial implementation need to escape characters, add other columns
//   const sql = `update category
//                set name = ${toSqlString(name)}
//                 where id = ${id}`;
//   return pool.query(sql).then((res) => {
//     return res;
//   });
// };

const remove = (id) => {
  const sql = `delete from suggestion where id = ${id}`;
  return pool.query(sql).then((res) => {
    return res;
  });
};

module.exports = {
  selectAll,
  selectById,
  selectByAssignedUser,
  insert,
  remove,
  // update,
};
