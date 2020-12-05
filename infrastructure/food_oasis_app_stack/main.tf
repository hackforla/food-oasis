provider "aws" {
  version = "2.64.0"
  region  = var.region
}

module "network" {
  source             = "./network"
  region             = var.region
  namespace          = substr(var.project_name, 0, 6)
  stage              = var.stage
  name               = "${var.project_name}-${var.stage}vpc"
  cidr_block         = var.cidr_block
  availability_zones = var.availability_zones
}

module "rds" {
  source = "./rds"

  project_name = var.project_name
  stage        = var.stage
  region       = var.region
  datetime     = local.datetime

  db_username = var.db_username
  db_name     = var.db_name
  db_password = var.db_password

  // Use either instance to pull latest snaphsot for DB
  // !! Does not currently work if AWS Provider is in a different region
  db_instance_id_migration     = var.db_instance_id_migration
  db_instance_region_migration = var.db_instance_region_migration

  // OR specify snapshot directly
  db_snapshot_migration = var.db_snapshot_migration

  // Module Network variables
  vpc_id                    = module.network.vpc_id
  private_subnet_ids        = module.network.private_subnet_ids
  private_subnet_cidrs      = module.network.private_subnet_cidrs
  bastion_security_group_id = module.bastion.security_group_id
}

module "applicationlb" {
  source = "./applicationlb"

  // Input from other Modules
  vpc_id            = module.network.vpc_id
  public_subnet_ids = module.network.public_subnet_ids

  // Input from Variables
  account_id = var.account_id
  region     = var.region
  stage      = var.stage

  // Container Variables
  container_port = var.container_port
  task_name      = var.task_name
  tags           = var.tags
}

module "ecs" {
  source = "./ecs-fargate"

  // Input from other Modules
  vpc_id                    = module.network.vpc_id
  public_subnet_ids         = module.network.public_subnet_ids
  db_security_group_id      = module.rds.db_security_group_id
  bastion_security_group_id = module.bastion.security_group_id
  aws_ssm_db_hostname_arn   = module.rds.aws_ssm_db_hostname_arn
  aws_ssm_db_password_arn   = module.rds.aws_ssm_db_password_arn
  alb_security_group_id     = module.applicationlb.security_group_id
  alb_target_group_arn      = module.applicationlb.alb_target_group_arn

  // Input from Variables
  account_id = var.account_id
  region     = var.region
  stage      = var.stage

  // Container Variables
  desired_count    = var.desired_count
  container_memory = var.container_memory
  container_cpu    = var.container_cpu
  container_port   = var.container_port
  container_name   = var.container_name
  cluster_name     = var.cluster_name
  task_name        = var.task_name
  image_tag        = var.image_tag

  depends_on = [ module.applicationlb ]
}

module "bastion" {
  source = "./bastion"

  // Input from other Modules
  vpc_id            = module.network.vpc_id
  public_subnet_ids = module.network.public_subnet_ids

  // Input from Variables
  account_id = var.account_id
  region     = var.region

  bastion_name             = "bastion-${var.project_name}-${var.stage}"
  bastion_instance_type    = var.bastion_instance_type
  cron_key_update_schedule = var.cron_key_update_schedule
  ssh_public_key_names     = var.ssh_public_key_names
}