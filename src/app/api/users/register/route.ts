import { NextRequest, NextResponse } from "next/server";
import { testConnection, executeQuery } from "@/lib/db";
import bcrypt from "bcrypt";
interface User {
  username: string;
  email: string;
  password: string;
  fullName: string;
  birthday: string;
}
export async function POST(request: NextRequest) {
  try {
    const { username, email, password, fullName, birthday } =
      await request.json();

    // Kiểm tra xem email đã tồn tại chưa
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    const existingUsers: User[] = await executeQuery(checkUserQuery, [email]);
   
    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: "Email đã được sử dụng" },
        { status: 400 }
      );
    }

    // Mã hóa mật khẩu
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Thêm người dùng mới vào cơ sở dữ liệu
    const insertUserQuery =
      "INSERT INTO users (username, email, password, full_name, birthday) VALUES (?, ?, ?, ?, ?)";
    await executeQuery(insertUserQuery, [
      username,
      email,
      hashedPassword,
      fullName,
      birthday,
    ]);

    return NextResponse.json(
      { message: "Đăng ký thành công" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
