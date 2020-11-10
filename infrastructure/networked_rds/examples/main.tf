provider "aws" {
  region  = var.region
}

module "networked_rds" {
  source = "./.."

  project_name = "ballotnav"
  stage = "dev"
  region = "us-west-2"
  account_id = "0123456789"

  ssh_public_key_names = ["alice", "bob", "carol"]
  availability_zones = ["us-west-2a", "us-west-2b", "us-west-2c"]

  db_username = "ballotnav"
  db_name = "ballotnavdb"
  db_password = var.db_password
}

variable db_password {
  description = "The postgres database password created for the default database when the instance is booted"
}

variable region {
  description = "The AWS region where infrastructure is to be deployed"
}
