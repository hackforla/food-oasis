module "network" {
  source             = "git::https://github.com/jafow/terraform-modules.git//aws-blueprints/network?ref=network-0.1.2"
  region             = var.region
  namespace          = local.namespace
  stage              = var.stage
  name               = local.vpc_name
  cidr_block         = var.cidr_block
  availability_zones = var.availability_zones
}

resource "aws_security_group" "db" {
  name_prefix = substr(local.db_name, 0, 6)
  description = "Ingress and egress for ${local.db_name} RDS"
  vpc_id      = module.network.vpc_id
  tags        = merge({ Name = local.db_name }, var.tags)

  ingress {
    description = "db ingress from private subnets"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = tolist(module.network.private_subnet_cidrs)
  }

  # allow ingress from bastion server
  ingress {
    description     = "inbound from bastion server"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [module.bastion.security_group_id]
  }

  egress {
    description = "db egress to private subnets"
    self        = true
    from_port   = 22
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = tolist(module.network.private_subnet_cidrs)
  }
}


module "db" {
  source     = "terraform-aws-modules/rds/aws"
  version    = "~> 2.0"
  identifier = "${local.db_name}-${var.stage}"

  allow_major_version_upgrade = var.db_allow_major_engine_version_upgrade
  engine            = "postgres"
  engine_version    = var.db_engine_version
  instance_class    = var.db_instance_class
  allocated_storage = 20

  name     = var.db_name
  username = var.db_username
  password = var.db_password
  port     = "5432"

  vpc_security_group_ids = [aws_security_group.db.id]

  maintenance_window = "Mon:00:00-Mon:03:00"
  backup_window      = "03:00-06:00"

  # disable backups to create DB faster
  backup_retention_period = 0

  tags = var.tags

  enabled_cloudwatch_logs_exports = ["postgresql", "upgrade"]

  # DB subnet group
  subnet_ids = tolist(module.network.private_subnet_ids)

  # DB parameter group
  family = "postgres${var.db_major_version}"

  # DB option group
  major_engine_version = var.db_major_version

  # Database Deletion Protection
  deletion_protection = false
}
