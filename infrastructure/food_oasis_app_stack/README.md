# ballotnav infrastructure configuration

These files describe the load balancer and webserver infrastructure of the ballotnav app using [`terraform`](https://www.terraform.io/) HCL. 

Additional configuration and environment-specific values are stored in a private
github repo.

# Getting started
To apply this configuration in a new environment:

## prerequisites
- `terraform` v0.12.0+
- aws account and credentials created 
- `awscli` installed and configured [see docs here](https://aws.amazon.com/cli/)
- all required secrets are created & stored in SSM, see below:

### secrets stored in SSM
This configuration should create the initial deployment and infra for a load
balancer and ecs cluster running the ballotnav app at the given version. It
injects some secrets that the app requires to boot, .e.g `POSTGRES_PASSWORD` and
`TOKEN_SECRET`. 

When applying this configuration these values are fetched securely from AWS
Systems Manager Param Store (AWS SSM), and so they must be created there first.

[See the aws guide that describes a this in more detail](https://aws.amazon.com/premiumsupport/knowledge-center/ecs-data-security-container-task/#Complete_prerequisites)

#### secrets path name
AWS SSM values lookup are path-based, i.e. /path/to/my/SECRET_VALUE, and so values are stored using the convention
of `/environment/region/secret_name = secret value`

For example in deploying ballotnav configuration in a "dev" environment of AWS's
Oregon region (coded as `us-west-2`) we would use the SSM path prefix of
`/dev/us-west-2/`

**example**
creating a secret called `DB_PASSWORD` for a dev environment
```bash
aws ssm put-paramter --type SecureString --name /dev/us-west-2/DB_PASSWORD
--value secret123x234
```

**example**
creating that same secret for the prod deployment environment, note the `/prod`
path.

```bash
aws ssm put-paramter --type SecureString --name /prod/us-west-2/DB_PASSWORD
--value secret123x234
```

## Plan & apply
Run `terraform plan` to preview the configuration

```bash
terraform plan
```

Run `apply` to apply it to the cloud and deploy the infrastructure.
```bash
terraform apply
```
