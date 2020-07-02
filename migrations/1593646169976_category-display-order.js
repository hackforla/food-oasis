/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(
    `
    alter table category add display_order int default 1000;

    update category set display_order = id * 10;

    update category set display_order = 15
    where id = 9;
    `
  );
};

exports.down = (pgm) => {
  pgm.sql(
    `
      alter table category drop column display_order;
    `
  );
};
