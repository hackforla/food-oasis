# .taskDefinitionArn
# .containerDefinitions.image
# .revision
# .status

aws ecs describe-task-definition \
  --task-definition foodoasis-dev-td \
  --query taskDefinition | \
  jq 'del(.taskDefinitionArn,.revision,.status)'