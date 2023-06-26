export type IPagination = {
  page?: number;
  limit?: number;
};

export type dependOnIAcademicData<T> = {
  meta: {
    page?: number;
    limit?: number;
    total?: number;
  };
  data: T;
};
