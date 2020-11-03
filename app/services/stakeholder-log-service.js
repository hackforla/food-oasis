const { pool } = require("./postgres-pool");
const categoryService = require("./category-service");

/* 
This service is for getting data from the stakeholder_log table for
viewing the audit log for a particular stakeholder.
*/

const selectById = async (id) => {
  const sql = `select
      s.id, s.version, s.name, s.address_1, s.address_2, s.city, s.state, s.zip,
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
    where s.id = $1
    order by s.version desc`;

  let stakeholders = [];
  let categories = [];
  var stakeholderResult;
  try {
    stakeholderResult = await pool.query(sql, [id]);
    categories = await categoryService.selectAll();
    // stakeholder_ids = stakeholderResult.rows.map((a) => a.id);
    // if (stakeholder_ids.length) {
    //   // Hoover up all the stakeholder categories
    //   // for all of our stakeholder row results.
    //   const categoriesSql = `select sc.stakeholder_id, c.id, c.name, c.display_order
    //     from category c
    //     join stakeholder_category sc on c.id = sc.category_id
    //     where sc.stakeholder_id in (${stakeholder_ids.join(",")})
    //     order by c.display_order`;
    //   categoriesResults = await pool.query(categoriesSql);
    //}
  } catch (err) {
    return Promise.reject(err.message);
  }

  stakeholderResult.rows.forEach((row) => {
    stakeholders.push({
      id: row.id,
      version: row.version,
      name: row.name || "",
      address1: row.address_1 || "",
      address2: row.address_2 || "",
      city: row.city || "",
      state: row.state || "",
      zip: row.zip || "",
      phone: row.phone || "",
      latitude: row.latitude ? Number(row.latitude) : null,
      longitude: row.longitude ? Number(row.longitude) : null,
      distance: row.distance ? Number(row.distance) : null,
      website: row.website || "",
      createdDate: row.created_date,
      createdLoginId: row.created_login_id,
      modifiedDate: row.modified_date,
      modifiedLoginId: row.modified_login_id,
      submittedDate: row.submitted_date,
      submittedLoginId: row.submitted_login_id,
      assignedDate: row.assigned_date,
      assignedLoginId: row.assigned_login_id,
      approvedDate: row.approved_date,
      reviewedLoginId: row.reviewed_login_id,
      claimedDate: row.claimed_date,
      claimedLoginId: row.claimed_login_id,
      requirements: row.requirements || "",
      adminNotes: row.admin_notes || "",
      inactive: row.inactive,
      createdUser: row.created_user || "",
      modifiedUser: row.modified_user || "",
      submittedUser: row.submitted_user || "",
      reviewedUser: row.reviewed_user || "",
      assignedUser: row.assigned_user || "",
      claimedUser: row.claimed_user || "",
      categories: row.category_ids
        .map((cat) => categories.find((c) => c.id === cat))
        .sort((c) => c.displayOrder),
      email: row.email || "",
      covidNotes: row.covid_notes || "",
      confirmedName: row.v_name,
      confirmedCategories: row.v_categories,
      confirmedAddress: row.v_address,
      confirmedPhone: row.v_phone,
      confirmedEmail: row.v_email,
      confirmedHours: row.v_hours,
      confirmedFoodTypes: row.v_food_types,
      verificationStatusId: row.verification_status_id,
      inactiveTemporary: row.inactive_temporary,
      neighborhoodId: row.neighborhood_id,
      neighborhoodName: row.neighborhood_name,
      completeCriticalPercent: row.complete_critical_percent,
      foodBakery: row.food_bakery,
      foodDryGoods: row.food_dry_goods,
      foodProduce: row.food_produce,
      foodDairy: row.food_dairy,
      foodPrepared: row.food_prepared,
      foodMeat: row.food_meat,
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

module.exports = {
  selectById,
};
