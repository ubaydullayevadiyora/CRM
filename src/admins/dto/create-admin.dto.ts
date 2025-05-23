export class CreateAdminDto {
  first_name: string;
  last_name: number;
  email: string;
  phone: string;
  password: string;
  is_creator?: boolean;
  is_active?: boolean;
}
