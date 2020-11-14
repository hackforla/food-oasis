output "region" {
  description = "Region for ECS and DB"
  value       = var.region
}


output "vpc_id" {
  description  = "Vpc Id"
  value       = module.network.vpc_id
}



output "bastion_security_group_id" {
  description = "the security group id of the bastion server. Add this id to other services that run within the vpc to which you want to access externally."
  value       = module.bastion.security_group_id
}

output "bastion_asg_id" {
  description = "The auto-scaling group id of the bastion server"
  value       = module.bastion.asg_id
}

output "eip_public_address" {
  description = "the public ip address of the Elastic IP fronting the bastion server"
  value       = aws_eip.eip.public_ip
}

output db_address {
  description = "The aws provided URL of the database"
  value       = module.db.this_db_instance_address
}

output db_instance_hosted_zone_id {
  value = module.db.this_db_instance_hosted_zone_id
}

output db_instance_endpoint {
  description = "The db adress and port for this RDS instance"
  value       = module.db.this_db_instance_endpoint
}

output db_security_group_id {
  description = "The security group id for this RDS instance"
  value = aws_security_group.db.id
}

output network_public_subnet_ids {
  description = "public vpc subnets"
  value       = module.network.public_subnet_ids
}

output network_private_subnet_ids {
  description = "private vpc subnets"
  value       = module.network.private_subnet_ids
}

output bastion_ssh_public_keys_bucket {
  description = "The name of the bucket where the bastion server gets its allowed public keys. Copy new users RSA public key to this bucket in order to grant them SSH access to the bastion."
  value       = aws_s3_bucket.ssh_public_keys.id
}
