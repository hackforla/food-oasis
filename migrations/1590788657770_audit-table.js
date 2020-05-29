/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(
    { schema: "public", name: "stakeholder_log" },
    {
      id: "id",
      stakeholder_id: "integer",
      version: "integer",
      name: { type: "text" },
      address_2: { type: "text" },
      city: { type: "text" },
      state: { type: "text" },
      zip: { type: "text" },
      phone: { type: "text" },
      latitude: { type: "numeric" },
      longitude: { type: "numeric" },
      website: { type: "text" },
      fm_id: { type: "numeric" },
      notes: { type: "text" },
      created_date: {
        type: "timestamp with time zone",
        default: pgm.func("current_timestamp"),
        notNull: true,
      },
      created_login_id: "integer",
      modified_date: {
        type: "timestamp with time zone",
      },
      modified_login_id: "integer",
      verified_date: {
        type: "timestamp with time zone",
      },
      verified_login_id: "integer",
      requirements: { type: "text", default: "", notNull: true },
      admin_notes: { type: "text", default: "", notNull: true },
      inactive: { type: "boolean", default: false, notNull: true },
      parent_organization: { type: "text", default: "", notNull: true },
      physical_access: { type: "text", default: "", notNull: true },
      email: { type: "text", default: "", notNull: true },
      items: { type: "text", default: "", notNull: true },
      services: { type: "text", default: "", notNull: true },
      facebook: { type: "text", default: "", notNull: true },
      twitter: { type: "text", default: "", notNull: true },
      pinterest: { type: "text", default: "", notNull: true },
      linkedin: { type: "text", default: "", notNull: true },
      description: { type: "text", default: "", notNull: true },
      approved_date: { type: "timestamp without time zone" },
      reviewed_login_id: "integer",
      assigned_login_id: "integer",
      agency_type: "text",
      assigned_date: { type: "timestamp(6) without time zone" },
      rejected_date: { type: "timestamp without time zone" },
      review_notes: { type: "text", default: "", notNull: true },
      claimed_login_id: "integer",
      claimed_date: { type: "timestamp without time zone" },
      instagram: { type: "text", default: "", notNull: true },
      admin_contact_name: { type: "text", default: "" },
      admin_contact_phone: { type: "text", default: "" },
      admin_contact_email: { type: "text", default: "" },
      donation_contact_name: { type: "text", default: "" },
      donation_contact_phone: { type: "text", default: "" },
      donation_contact_email: { type: "text", default: "" },
      donation_pickup: { type: "boolean" },
      donation_accept_frozen: { type: "boolean" },
      donation_accept_refrigerated: { type: "boolean" },
      donation_accept_perishable: { type: "boolean" },
      donation_schedule: { type: "text", default: "", notNull: true },
      donation_delivery_instructions: {
        type: "text",
        default: "",
        notNull: true,
      },
      covid_notes: { type: "text", default: "", notNull: true },
      donation_notes: { type: "text", default: "", notNull: true },
      category_notes: { type: "text", default: "", notNull: true },
      eligibility_notes: { type: "text", default: "", notNull: true },
      food_types: { type: "text", default: "", notNull: true },
      languages: { type: "text", default: "English", notNull: true },
      verification_status_id: { type: "integer", default: 1, notNull: true },
      inactive_temporary: { type: "boolean", default: false, notNull: true },
    }
  );
};

exports.down = (pgm) => {
  pgm.dropTable({ schema: "public", name: "stakeholder_log" });
};
