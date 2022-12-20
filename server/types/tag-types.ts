export interface Tag {
  id: number;
  name: string;
}
export interface StakeholderTag extends Tag {
  tenantId: number;
}
