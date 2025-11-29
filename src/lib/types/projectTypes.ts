export type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  members: ProjectMember[];
};

export type ProjectCardType = Project;

export type ProjectCardProps = Pick<
  ProjectCardType,
  'id' | 'name' | 'description' | 'createdAt' | 'members'
>;

export type ProjectMember = { name: string; image: string };
