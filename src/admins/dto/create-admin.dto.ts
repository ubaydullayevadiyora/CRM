export class CreateAdminDto {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  is_creator?: boolean;
}
