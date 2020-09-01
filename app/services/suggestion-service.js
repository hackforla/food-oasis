const { pool } = require("./postgres-pool");
const { toSqlString } = require("./postgres-utils");

const selectAll = () => {
  const sql = `
    select id, name, address_1 as address1, address_2 as address3, city, state, zip,
    phone, email, notes,
    tipster_name as tipsterName, tipster_phone as tipsterPhone, tipster_email as tipsterEmail,
    hours, category, status, admin_notes
    from suggestion
    order by created_date
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

const insert = (model) => {
  const {
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

// const remove = (id) => {
//   const sql = `delete from category where id = ${id}`;
//   return pool.query(sql).then((res) => {
//     return res;
//   });
// };

module.exports = {
  selectAll,
  selectById,
  insert,
  // update,
  // remove,
};
