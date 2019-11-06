const { pool } = require("./postgres-pool");

const selectAll = () => {
  const sql = `
    select id, question, answer
    from faq
    order by id
  `;
  return pool.query(sql).then(res => {
    return res.rows;
  });
};

const selectById = id => {
  const sql = `select id, question, answer from faq where id = $1`;
  return pool.query(sql, [id]).then(res => {
    return res.rows[0];
  });
};

const insert = model => {
  const { question, answer } = model;
  const sql = `insert into faq (question, answer) values ($1, $2) returning id`;
  return pool.query(sql, [question, answer]).then(res => {
    return res.rows[0];
  });
};

const update = (id, model) => {
  const { question, answer } = model;
  const sql = `
    update faq
    set question = $1, answer = $2
    where id = $3 returning *
  `;
  return pool.query(sql, [question, answer, id]).then(res => {
    return res.rows[0];
  });
};

const remove = id => {
  const sql = `delete from faq where id = $1`;
  return pool.query(sql, [id]).then(res => {
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
