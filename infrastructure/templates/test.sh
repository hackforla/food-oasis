# .taskDefinitionArn
# .containerDefinitions.image
# .revision
# .status
# .registeredBy
# .registeredAt


aws ecs describe-task-definition \
  --task-definition foodoasis-dev-td \
  --query taskDefinition | \
  jq 'del(.taskDefinitionArn,.revision,.status,.registeredAt,.registeredBy)'