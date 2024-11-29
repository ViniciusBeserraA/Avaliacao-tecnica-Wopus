export class UserDto {
  id: string;
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data?: T;
}
