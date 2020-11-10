output "cluster_name" {
  value = aws_ecs_cluster.cluster.name
}

output "ecs_service_security_group_id" {
  value = aws_security_group.svc_sg.id
}

output lb_dns_name {
  value = aws_lb.alb.dns_name
}

output lb_arn {
  value = aws_lb.alb.arn
}

output service_id {
  value = aws_ecs_service.svc.id
}

output service_name {
  value = aws_ecs_service.svc.name
}

output service_iam_role {
  value = aws_ecs_service.svc.iam_role
}

output service_desired_count {
  value = aws_ecs_service.svc.desired_count
}
