/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(
    { schema: "public", name: "logins" },
    {
      id: "id",
      login_id: {
        type: "integer",
        notNull: true,
        references: "login",
        onDelete: "cascade",
      },
      tenant_id: {
        type: "integer",
        notNull: true,
        references: "tenant",
        onDelete: "cascade",
      },
      login_time: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    }
  );
};

exports.down = (pgm) => {
  pgm.dropTable("logins");
};
