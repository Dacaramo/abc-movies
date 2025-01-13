export type PaginatedResponse<T> = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Array<T>;
};

export type QueryStringParams = {
  page: number;
};
