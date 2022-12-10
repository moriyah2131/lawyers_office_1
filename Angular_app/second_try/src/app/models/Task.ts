export interface Task {
  id: number;
  actionPatternId?: number;
  actionPatternName: string;
  discription?: string;
  comments?: string;
  deadLine?: Date;
  linkName?: string;
  siteAddress?: string;
  actionState: string;
  actionFileId?: number;
  actionPriority: number;
  createdDate: Date;
}
