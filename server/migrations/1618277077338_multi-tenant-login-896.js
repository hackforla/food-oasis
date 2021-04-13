/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE public.login_tenant (
        login_id int NOT NULL,
        tenant_id int NOT NULL,
        is_admin bool NULL DEFAULT false,
        is_security_admin bool NULL DEFAULT false,
        is_data_entry bool NULL DEFAULT false,
        is_coordinator bool NULL DEFAULT false,
        CONSTRAINT login_tenant_login_fk FOREIGN KEY (login_id) REFERENCES public.login(id),
        CONSTRAINT login_tenant_tenantfk FOREIGN KEY (tenant_id) REFERENCES public.tenant(id)
    );
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE public.login_tenant
    `);
};
