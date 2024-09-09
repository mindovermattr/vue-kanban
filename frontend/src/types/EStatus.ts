export enum EStatus {
  NoStatus = 'noStatus',
  NeedDone = 'needDone',
  InProgress = 'inProgress',
  Testing = 'testing',
  Done = 'done',
}

export type EStatusKeys = keyof typeof EStatus
