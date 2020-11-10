variable vpc_id {}
# variable region {}
variable tags {
  default = {}
  type    = map
}
variable stage {
  type = string
  default = "dev"
}
variable namespace {}

variable cluster_name {
  type    = string
  default = "foodoasis-cluster"
}

variable container_cpu {
  type    = number
  default = 256
}

variable container_memory {
  type    = number
  default = 512
}

variable task_name {
  type    = string
  default = "foodoasis-task"
}

variable project_name {}

variable container_name {
  type    = string
  default = "foodoasis-container"
}
variable container_port {}
variable image_tag {}

variable account_id {}

variable public_subnet_ids {
  default = [""]
  type = list(string)
}
variable private_subnet_ids {
  default = []
  type = list(string)
}
variable db_security_group_id {}

variable desired_count {
  type = number
  default = 2
}

# variable acm_certificate_arn  {}
#
variable bastion_security_group_id {}
variable task_memory {
  type = number
  default = 512
}
variable task_cpu {
  type = number
  default = 256
}

variable attributes {
  default = ["0"]
}
variable delimiter {
  default = "-"
}
