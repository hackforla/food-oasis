const { pool } = require("./postgres-pool");

const selectAll = language => {
  const sql = `
    select id, question, answer, language, identifier
    from faq
    order by id
    where language = $1
  `;
  return pool.query(sql, [language]).then(res => {
    return res.rows;
  });
};

const selectById = (id, language) => {
  const sql = `select id, question, answer, language, identifier from faq where id = $1 and language = $2`;
  return pool.query(sql, [id, language]).then(res => {
    return res.rows[0];
  });
};

// Assuming Admins will have enough bandwidth, make multiple requests at the same time to insert the different language FAQs
const insert = model => {
  const { question, answer, language, identifier } = model;
  const sql = `insert into faq (question, answer, language, identifier) values ($1, $2, $3, $4) returning id`;
  return pool.query(sql, [question, answer, language, identifier]).then(res => {
    return res.rows[0];
  });
};

const update = (id, model) => {
  const { question, answer, language } = model;
  const sql = `
    update faq
    set question = $1, answer = $2, language = $3
    where id = $4 returning *
  `;
  return pool.query(sql, [question, answer, language, id]).then(res => {
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

/*
Concern: when I add a new FAQ, I need both (ex.) English and Spanish to be posted.
Will need to query to last identifier and increment by 1
ex. [
  {question: "", answer: "", language: "en", identifier: 1}, {question: "", answer: "", language: "es", identifier: 1}
]
How I see it, is that I do a map on the array coming in, and add a new FAQ with a new id for each.
When I update, I want to pull both English and Spanish versions from one of the ids.
Then do a map and update both objects from their specific ids.
When I delete, I want to delete both English and Spanish versions from one of the ids.

1 idea
Data Tables

faq_identifier
unique key -- general question

faq
unique key -- primary key(faq_identifier) -- question -- answer -- language
*/