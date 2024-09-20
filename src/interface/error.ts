export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
