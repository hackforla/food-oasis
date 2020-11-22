variable profile {}

variable region {
  type        = string
  default     = "us-east-2"
}

variable availability_zones {
  description = "Available cidr blocks for public subnets."
  type        = list(string)  
  default     = [
    "us-east-2a",
    "us-east-2b"
    ]
}

variable stage {
  type        = string
  default     = "dev"
}

variable account_id {}

variable db_name {}
variable db_username {}
variable db_password {}

variable container_cpu {
  type        = number
  default     = 256
}

variable container_memory {
  type        = number
  default     = 512
}

variable container_port {
  type        = number
  default     = 5000
}

variable task_name {
  type        = string
  default     = "foodoasis-task"
}

variable health_check_path {
  type        = string
  default     = "/health"
}  


variable tags {
  default     = {}
  type        = map
}

variable container_name {
  default     = "foodoasis-container"
  type        = string
}

variable cluster_name {
  default     = "foodoasis-cluster"
  type        = string
}

variable image_tag {}

variable desired_count {
  default     = 2
  type        = number
}