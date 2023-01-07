export interface MyFile {
  id: number;
  bagId: number;
  filePatternId: number;
  document: ArrayBuffer | string;
  fileName: string;
  creatorId: number;
  uploadingDate: Date;
  access: number;
}
