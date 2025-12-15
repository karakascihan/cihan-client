export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
  }
  export interface ApiResponseClient<T> {
    result: T;
    statusCode: number;
    message?: string;
    isSuccess:boolean
  }