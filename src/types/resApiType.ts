export type ApiDataType = {
  data: ResApiType;
};
export type ResApiType = {
  statusCode: number;
  message?: string;
  results: unknown;
};
export interface ResErrorType {
  message?: string;
  name?: string;
  response: errorDataType;
  code?: string;
  status?: number;
}
export type errorDataType = {
  data: {
    error: string;
    message: string;
    statusCode: number;
  };
};
