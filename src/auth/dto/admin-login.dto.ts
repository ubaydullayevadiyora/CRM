export class LoginDto {
  email: string;
  password: string;
  role: "admin" | "teacher";
}
