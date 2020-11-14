variable project_name {
  type        = string
  description = "The overall name of the project using this infrastructure; used to group related resources by"
  default     = "foodoasis"
}

variable allowed_security_groups {
  description = "security group ids that are allowed to the bastion server"
  type        = list(string)
  default     = []
}

variable bastion_instance_type {
  description = "The ec2 instance type of the bastion server"
  default     = "t2.small"
}

variable account_id {
  description = "the aws account id # that this is provisioned into"
}
variable stage {
  type        = string
  default     = "dev"
  description = "a short name describing the lifecyle or stage of development that this is running for; ex: 'dev', 'qa', 'prod', 'test'"
}
variable region {
  description = "the aws region code where this is deployed; ex: 'us-west-2', 'us-east-1', 'us-east-2'"
  default     = "us-east-2"
}

variable cron_key_update_schedule {
  default     = "5,0,*,* * * * *"
  description = "The cron schedule that public keys are synced from the bastion s3 bucket to the server; default to once every hour"
}

variable cidr_block {
  default     = "10.10.0.0/16"
  description = "The range of IP addresses this vpc will reside in"
}

variable availability_zones {
  type        = list(string)
  default     = ["us-east-2a","us-east-2b","us-east-2c"]
  description = "The region + identifiers for the zones that the vpc will cover. Ex: ['us-west-2a', 'us-west-2b', 'us-west-2c']. Varies between regions."
}

variable tags {
  default = { terraform_managed = "true" }
  type    = map
}

variable db_username {
  type        = string
  default     = "dbuser"
  description = "The name of the default postgres user created by RDS when the instance is booted"
}

variable db_name {
  type        = string
  default     = "foodoasisdev"
  description = "The name of the default postgres database created by RDS when the instance is booted"
}
variable db_password {
  type        = string
  default     = "password"
  description = "The postgres database password created for the default database when the instance is booted"
}
variable db_instance_class {
  description = "The instance type of the db; defaults to db.t2.small"
  default     = "db.t2.small"
}
variable db_engine_version {
  description = "the semver major and minor version of postgres; default to 11.8"
  default = "11.8"
}
variable db_allow_major_engine_version_upgrade {
  default = true
}

variable db_major_version {
  default = "11"
}

variable ssh_public_key_names {
  description = "the name of the public key files in ./public_keys without the file extension; example ['alice', 'bob', 'carol']"
  type        = list(string)
}
