const { pool } = require('./postgres-pool');
const { toSqlString, toSqlNumeric } = require('./postgres-utils');

const selectAll = () => {
	const sql = `select * from load_211`;
	console.log('service');
	return pool.query(sql).then((res) => {
		return res;
	});
};

const insert = (row) => {
	let {
		agency_description,
		agency_id,
		agency_name,
		agency_overview,
		geometry,
		is_agency,
		public_school,
		school_district,
		score,
		site_addresses,
		site_aliases,
		site_cross_and_access,
		site_hours,
		site_id,
		site_name,
		site_phones,
		site_services,
		site_url
	} = row;

	const sql = `insert into load_211 (
        agency_description,
    agency_id,
    agency_name,
    agency_overview,
    geometry,
    is_agency,
    public_school,
    school_district,
    score,
    site_addresses,
    site_aliases,
    site_cross_and_access,
    site_hours,
    site_id,
    site_name,
    site_phones,
    site_services,
    site_url
    )
    values (
        ${agency_description},
    ${agency_id},
    ${agency_name},
    ${agency_overview},
    ${geometry},
    ${is_agency},
    ${public_school},
    ${school_district},
    ${score},
    ${site_addresses},
    ${site_aliases},
    ${site_cross_and_access},
    ${site_hours},
    ${site_id},
    ${site_name},
    ${site_phones},
    ${site_services},
    ${site_url}
    )`;

	return pool.query(sql).catch((err) => {
		msg = err.message;
		console.log(msg);
	});
};

module.exports = {
    selectAll,
    insert
};
