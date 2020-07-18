/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // Enable postgis extension
  pgm.createExtension("postgis", {
    options: {
      ifNotExists: true,
    },
  });

  // Rename current geometry column
  pgm.renameColumn("neighborhood", "geometry", "geometry_text");

  // Add a new geometry column with type `geometry`
  pgm.addColumns("neighborhood", { geometry: "geometry" });

  // Populate new geometry column with geometric shape data based on text in geometry_text
  pgm.sql(
    "UPDATE neighborhood SET geometry=ST_GeometryFromText(geometry_text)"
  );

  // Drop old geometry column
  pgm.dropColumns("neighborhood", "geometry_text");
};

exports.down = (pgm) => {
  // Rename current geometry column
  pgm.renameColumn("neighborhood", "geometry", "geometry_gis");

  // Add a new geometry column with type `char`
  pgm.addColumns("neighborhood", { geometry: "text" });

  // Populate new geometry column with geometric shape data based on text in geometry_text
  pgm.sql("UPDATE neighborhood SET geometry=ST_AsText(geometry_gis)");

  // Drop old geometry column
  pgm.dropColumns("neighborhood", "geometry_gis");

  // Disable extension
  pgm.dropExtension("postgis", {
    drop_options: {
      ifExists: true,
    },
  });
};
