# FoodOasis infrastructure configuration

This Terraform blueprint manages the infrastructure needed to run the 311 Data API project in AWS.

creates the complete network infrastructure including the VPC, subnets, gateway, network ACLs, and security groups across 2 availability zones

creates the Postgres RDS instance with the database and credentials (which are stored in a SSM parameter store)

creates the ECS cluster, service and the load balancer

# Installations:
--> AWS CLI
--> Terraform

# Pre-requisite:

Make a folder public_keys : mkdir -p public_keys

create an SSH key pair and copy the public key to the public_keys folder.

ssh-keygen -t rsa -m PEM -b 4096 -C "myname@example.com" -N "" -f myname


# Deployment: 
--> Manual Deployment

# Parameters:

The following parameters (at minimum) need to be set in order to run the blueprint. You can use, for example, a .tfvars file for these.

profile
account_id
db_name
db_username
db_password

# References:

For Network and Database stack refer https://github.com/100Automations/terraform-aws-postgres-vpc

# Commands:

terraform init
terraform apply