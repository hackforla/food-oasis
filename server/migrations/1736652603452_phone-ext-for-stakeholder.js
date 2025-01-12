/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  
  pgm.addColumn('stakeholder', {
    phone_ext: {
      type: 'VARCHAR(255)', 
      notNull: false, 
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('stakeholder', 'phone_ext');
};
