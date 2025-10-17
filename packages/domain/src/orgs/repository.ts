/**
 * Organizations Domain - Repository Interface
 */

import type { Organization, OrgMember, OrgRole, Plan } from '@prisma/client';

export interface OrgWithMembers extends Organization {
  members?: OrgMember[];
}

export interface OrgFilters {
  plan?: Plan;
  city?: string;
  isDeleted?: boolean;
}

export interface CreateOrgData {
  name: string;
  slug: string;
  plan: Plan;
  contact?: any;
  location?: any;
  about?: string;
  logoUrl?: string;
  quotas?: any;
}

export interface UpdateOrgData extends Partial<CreateOrgData> {}

export interface OrganizationRepository {
  findById(id: string): Promise<Organization | null>;
  findBySlug(slug: string): Promise<Organization | null>;
  findMany(filters: OrgFilters): Promise<Organization[]>;
  create(data: CreateOrgData): Promise<Organization>;
  update(id: string, data: UpdateOrgData): Promise<Organization>;
  softDelete(id: string): Promise<void>;

  // Membership
  findMembership(userId: string, orgId: string): Promise<OrgMember | null>;
  addMember(userId: string, orgId: string, role: OrgRole): Promise<OrgMember>;
  updateMemberRole(userId: string, orgId: string, role: OrgRole): Promise<OrgMember>;
  removeMember(userId: string, orgId: string): Promise<void>;
  listMembers(orgId: string): Promise<OrgMember[]>;
}
