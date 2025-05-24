export class UpdateTeacherDto {
  first_name?: string;
  last_name?: string;
  phone?: string;
  role?: "lecturer" | "assistant";
  is_active?: boolean;
}
