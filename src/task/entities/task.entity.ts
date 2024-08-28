import { Task } from '@prisma/client';
export class TaskEntity implements Task {
  id: number;
  title: string;
  description: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  ownerId: number;
}
