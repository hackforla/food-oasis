import db from "./db";
import categoryService from "./category-service";
import { StakeholderLog } from "../../types/stakeholder-types";
import { Category } from "../../types/category-types";
import stakeholderHelpers from "./stakeholder-helpers";

/* 
This service is for getting data from the stakeholder_log table for
viewing the audit log for a particular stakeholder.
*/

const selectById = async (id: number): Promise<any[]> => {
  const sql = `select
      s.id, s.version,  s.name, s.address_1, s.address_2, s.city, s.state, s.zip,
      s.phone, s.latitude, s.longitude, s.website,  s.notes,
      s.hours,
      s.category_ids,
      to_char(s.created_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS') as created_date, s.created_login_id,
      to_char(s.modified_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS') as modified_date, s.modified_login_id,
      to_char(s.submitted_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS') as submitted_date, s.submitted_login_id,
      to_char(s.approved_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS') as approved_date, s.reviewed_login_id,
      to_char(s.assigned_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS')as assigned_date, s.assigned_login_id,
      to_char(s.created_date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS') as claimed_date, s.claimed_login_id,
      s.requirements::varchar, s.admin_notes, s.inactive,
      s.parent_organization, s.physical_access, s.email,
      s.items, s.services, s.facebook,
      s.twitter, s.pinterest, s.linkedin, s.description,
      s.review_notes, s.instagram, s.admin_contact_name,
      s.admin_contact_phone, s.admin_contact_email,
      s.donation_contact_name, s.donation_contact_phone,
      s.donation_contact_email, s.donation_pickup,
      s.donation_accept_frozen, s.donation_accept_refrigerated,
      s.donation_accept_perishable, s.donation_schedule,
      s.donation_delivery_instructions, s.donation_notes, s.covid_notes,
      s.category_notes, s.eligibility_notes, s.food_types, s.languages,
      s.v_name, s.v_categories, s.v_address, s.v_phone, s.v_email,
      s.v_hours, s.v_food_types, s.verification_status_id, s.inactive_temporary,
      s.neighborhood_id, 
      s.food_bakery, s.food_dry_goods, s.food_produce,
      s.food_dairy, s.food_prepared, s.food_meat,
      ${buildLoginSelectsClause()}
    from stakeholder_log s
    ${buildLoginJoinsClause()}
    where s.id = $<id>
    order by s.version desc`;

  const stakeholders: StakeholderLog[] = [];

  const rows = await db.manyOrNone(sql, { id: Number(id) });
  const categories: Category[] = await categoryService.selectAll();

  rows.forEach((row) => {
    const stakeholderCategories = row.category_ids
      .map((cid: number) => {
        return categories.find((cat) => cat.id === cid);
      })
      .map((c: any) => {
        return {
          id: c.id,
          name: c.name,
          displayOrder: c.displayOrder,
        };
      });
    stakeholders.push({
      ...stakeholderHelpers.rowToStakeholder(row, stakeholderCategories),
      version: row.version,
    });
  });

  return stakeholders;
};

const buildLoginJoinsClause = () => {
  return `
    left join login L1 on s.created_login_id = L1.id
    left join login L2 on s.modified_login_id = L2.id
    left join login L3 on s.submitted_login_id = L3.id
    left join login L4 on s.reviewed_login_id = L4.id
    left join login L5 on s.assigned_login_id = L5.id
    left join login L6 on s.claimed_login_id = L6.id
  `;
};

const buildLoginSelectsClause = () => {
  return `
    concat(L1.first_name, ' ', L1.last_name) as created_user,
    concat(L2.first_name, ' ', L2.last_name) as modified_user,
    concat(L3.first_name, ' ', L3.last_name) as submitted_user,
    concat(L4.first_name, ' ', L4.last_name) as reviewed_user,
    concat(L5.first_name, ' ', L5.last_name) as assigned_user,
    concat(L6.first_name, ' ', L6.last_name) as claimed_user
  `;
};

export default {
  selectById,
};
