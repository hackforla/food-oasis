const { pool } = require("./postgres-pool");

const selectAll = () => {
  const sql = `
    select id, question, answer, language, identifier
    from faq
  `;
  return pool.query(sql, []).then(res => {
    return res.rows;
  });
};

// Identifier Table in DB follows `#:identifier` scheme, for both identifying and also ordering
const selectAllByLanguage = language => {
  const sql = `
    select id, question, answer, language, identifier
    from faq
    where language = $1
    order by identifier desc
  `;
  return pool.query(sql, [language]).then(res => {
    return res.rows;
  });
};

const selectById = id => {
  const sql = `select id, question, answer, language, identifier from faq where id = $1`;
  return pool.query(sql, [id]).then(res => {
    return res.rows[0];
  });
};

const selectByIdentifier = identifier => {
  const sql = `select id, question, answer, language, identifier from faq where identifier = $1`;
  return pool.query(sql, [identifier]).then(res => {
    return res.rows;
  });
};

/* 
Assuming Admins will have enough bandwidth, make multiple requests at the same time to insert the different language FAQs
ex. [{question: "", answer: "", language: "en", identifier: "example"}, {question: "", answer: "", language: "es", identifier: "example"}]
Do 2 requests to POST /api/faqs/
*/

const insert = model => {
  const { question, answer, language, identifier } = model;
  const sql = `insert into faq (question, answer, language, identifier) values ($1, $2, $3, $4) returning id`;
  return pool.query(sql, [question, answer, language, identifier]).then(res => {
    return res.rows[0];
  });
};

/* 
Assuming Admins will have enough bandwidth, make multiple requests at the same time to update the different language FAQs
ex. [{question: "", answer: "", language: "en"}, {question: "", answer: "", language: "es"}]
Do 2 requests to PUT /api/faqs/
*/
const update = (id, model) => {
  const { question, answer, language, identifier } = model;
  const sql = `
    update faq
    set question = $1, answer = $2, language = $3, identifier = $4
    where id = $5 returning *
  `;
  return pool
    .query(sql, [question, answer, language, identifier, id])
    .then(res => {
      return res.rows[0];
    });
};

/*
Deletes all FAQs from identifier
ex. {identifier: ""}
Verify that admin wants to delete FAQs, as it will delete all languages for FAQ.
*/
const remove = identifier => {
  const sql = `delete from faq where identifier = $1`;
  return pool.query(sql, [identifier]).then(res => {
    return res;
  });
};

module.exports = {
  selectAll,
  selectAllByLanguage,
  selectById,
  selectByIdentifier,
  insert,
  update,
  remove
};
