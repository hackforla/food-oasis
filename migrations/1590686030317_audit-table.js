/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(
    { schema: "public", name: "stakeholder_log" },
    {
      id: "id",
      stakeholder_id: "integer",
      version: "integer",
      name: { type: "varchar(255)" },
      address_2: { type: "varchar(255)" },
      city: { type: "varchar(255)" },
      state: { type: "varchar(255)" },
      zip: { type: "varchar(255)" },
      phone: { type: "varchar(255)" },
      latitude: { type: "numeric" },
      longitude: { type: "numeric" },
      website: { type: "varchar(255)" },
      fm_id: { type: "numeric" },
      notes: { type: "varchar(255)" },
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
      requirements: { type: "varchar(255)", default: "", notNull: true },
      admin_notes: { type: "varchar(255)", default: "", notNull: true },
      inactive: { type: "boolean", default: false, notNull: true },
      parent_organization: { type: "varchar(255)", default: "", notNull: true },
      physical_access: { type: "varchar(255)", default: "", notNull: true },
      email: { type: "varchar(255)", default: "", notNull: true },
      items: { type: "varchar(255)", default: "", notNull: true },
      services: { type: "varchar(255)", default: "", notNull: true },
      facebook: { type: "varchar(255)", default: "", notNull: true },
      twitter: { type: "varchar(255)", default: "", notNull: true },
      pinterest: { type: "varchar(255)", default: "", notNull: true },
      linkedin: { type: "varchar(255)", default: "", notNull: true },
      description: { type: "varchar(255)", default: "", notNull: true },
      approved_date: { type: "timestamp without time zone" },
      reviewed_login_id: "integer",
      assigned_login_id: "integer",
      agency_type: "varchar(255)",
      assigned_date: { type: "timestamp(6) without time zone" },
      rejected_date: { type: "timestamp without time zone" },
      review_notes: { type: "varchar(255)", default: "", notNull: true },
      claimed_login_id: "integer",
      claimed_date: { type: "timestamp without time zone" },
      instagram: { type: "varchar(255)", default: "", notNull: true },
      admin_contact_name: { type: "varchar(255)", default: "" },
      admin_contact_phone: { type: "varchar(255)", default: "" },
      admin_contact_email: { type: "varchar(255)", default: "" },
      donation_contact_name: { type: "varchar(255)", default: "" },
      donation_contact_phone: { type: "varchar(255)", default: "" },
      donation_contact_email: { type: "varchar(255)", default: "" },
      donation_pickup: { type: "boolean" },
      donation_accept_frozen: { type: "boolean" },
      donation_accept_refrigerated: { type: "boolean" },
      donation_accept_perishable: { type: "boolean" },
      donation_schedule: { type: "varchar(255)", default: "", notNull: true },
      donation_delivery_instructions: {
        type: "varchar(255)",
        default: "",
        notNull: true,
      },
      covid_notes: { type: "varchar(255)", default: "", notNull: true },
      donation_notes: { type: "varchar(255)", default: "", notNull: true },
      category_notes: { type: "varchar(255)", default: "", notNull: true },
      eligibility_notes: { type: "varchar(255)", default: "", notNull: true },
      food_types: { type: "varchar(255)", default: "", notNull: true },
      languages: { type: "varchar(255)", default: "English", notNull: true },
      verification_status_id: { type: "integer", default: 1, notNull: true },
      inactive_temporary: { type: "boolean", default: false, notNull: true },
    }
  );
};

exports.down = (pgm) => {
  pgm.dropTable({ schema: "public", name: "stakeholder_log" });
};
