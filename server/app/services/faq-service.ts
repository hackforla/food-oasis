import db from "./db";
import camelcaseKeys from "camelcase-keys";
import { Faq } from "../types/faq-types";

const selectAll = async () => {
  const sql = `
    select id, question, answer, language, identifier
    from faq
  `;
  const result: Faq[] = await db.manyOrNone(sql);
  return result.map((r) => camelcaseKeys(r));
};

// Identifier Table in DB follows `#:identifier` scheme, for both identifying and also ordering
const selectAllByLanguage = async (language: string) => {
  const sql = `
    select id, question, answer, language, identifier
    from faq
    where language = $<language>
    order by identifier desc
  `;
  const result: Faq[] = await db.manyOrNone(sql, { language });
  return result.map((r) => camelcaseKeys(r));
};

const selectById = async (faqId: string) => {
  // Need to cast id to number so pg-promise knows how
  // to format SQL
  const id = Number(faqId);
  const sql = `select id, question, answer, language, identifier 
  from faq where id = $<id>`;

  const row: Faq = await db.one(sql, { id });
  return camelcaseKeys(row);
};

const selectByIdentifier = async (identifier: string) => {
  const sql = `select id, question, answer, language, identifier 
  from faq where identifier = $1`;
  const result: Faq[] = await db.manyOrNone(sql, {
    identifier: Number(identifier),
  });
  return result.map((r) => camelcaseKeys(r));
};

/* 
Assuming Admins will have enough bandwidth, make multiple requests at the same time to insert the different language FAQs
ex. [{question: "", answer: "", language: "en", identifier: "example"}, {question: "", answer: "", language: "es", identifier: "example"}]
Do 2 requests to POST /api/faqs/
*/

const insert = async (data: Faq) => {
  const sql = `insert into faq (question, answer, language, identifier) 
  values ($<question>, $<answer>, $<language>, $<identifier>) 
  returning id`;

  const result: Faq = await db.one(sql, data);
  return { id: result.id };
};

/* 
Assuming Admins will have enough bandwidth, make multiple requests at the same time to update the different language FAQs
ex. [{question: "", answer: "", language: "en"}, {question: "", answer: "", language: "es"}]
Do 2 requests to PUT /api/faqs/
*/

const update = async (id: string, data: Faq) => {
  const sql = `
    update faq
    set question = $1, answer = $2, language = $3, identifier = $4
    where id = $5 returning *
  `;
  return await db.one(sql, { ...data, id: Number(id) });
};

/*
Deletes all FAQs from identifier
ex. {identifier: ""}
Verify that admin wants to delete FAQs, as it will delete all languages for FAQ.
*/
const remove = async (identifier: string) => {
  const sql = `delete from faq where identifier = $<identifier>`;
  return await db.none(sql, { identifier: Number(identifier) });
};

export default {
  selectAll,
  selectAllByLanguage,
  selectById,
  selectByIdentifier,
  insert,
  update,
  remove,
};
