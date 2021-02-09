/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(
    `
    alter table category add display_order int default 1000;

    update category set display_order = id * 10;

    update category set display_order = 15
    where id = 9;

    update category set display_order = 18
    where id = 8;

    update category set display_order = 20
    where id =  7;

    update category set display_order = 25
    where id =  2;

    update category set display_order = 30
    where id =  11;

    update category set display_order = 40
    where id =  10;

    update category set display_order = 45
    where id =  6;

    update category set display_order = 45
    where id =  5;

    update category set display_order = 50
    where id =  12;

    update category set display_order = 55
    where id =  3;

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
