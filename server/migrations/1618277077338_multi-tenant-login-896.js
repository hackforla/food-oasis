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
        CONSTRAINT login_tenant_pk PRIMARY KEY (login_id,tenant_id),
        CONSTRAINT login_tenant_login_fk FOREIGN KEY (login_id) REFERENCES public.login(id),
        CONSTRAINT login_tenant_tenantfk FOREIGN KEY (tenant_id) REFERENCES public.tenant(id)
    );
    `);

  pgm.sql(`
    ALTER TABLE public.login ADD is_global_admin bool NULL DEFAULT false;
    ALTER TABLE public.login ADD is_global_reporting bool NULL DEFAULT false;
    `);

  pgm.sql(`
    INSERT INTO public.login_tenant (login_id, tenant_id, is_admin, is_security_admin, is_data_entry, is_coordinator)
    SELECT id, 1, is_admin, is_security_admin, is_data_entry, is_coordinator
    FROM public.login
    `);

  pgm.sql(`
    UPDATE public.login set is_global_admin = true
    WHERE email in ('adminuser@dispostable.com', 'securityuser@dispostable.com', 'foodoasis@hackforla.org')
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE public.login_tenant;

    ALTER TABLE public.login 
        DROP COLUMN IF EXISTS is_global_admin,
        DROP COLUMN IF EXISTS is_global_reporting;
    `);
};
