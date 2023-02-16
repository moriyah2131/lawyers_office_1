export interface Task {
  id: number;
  actionPatternId?: number;
  actionPatternName: string;
  discription?: string;
  comments?: string;
  deadLine?: Date;
  linkID?: number;
  linkName?: string;
  siteAddress?: string;
  actionState: string;
  actionFileId?: number;
  actionPriority: number;
  createdDate: Date;
  bag?: { id: Number; bagName: string };
}
