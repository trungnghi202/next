import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import { executeQuery } from "@/lib/db";
import { useRouter } from "next/router";
import { parse } from "cookie";
import { useEffect } from "react";

interface User {
  id: number;
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  // Truy vấn lấy người dùng từ database
  const checkUserQuery = "SELECT * FROM users WHERE email = ?";
  const existingUsers: User[] = await executeQuery(checkUserQuery, [email]);

  if (existingUsers.length === 0) {
    return NextResponse.json(
      { error: "Email hoặc mật khẩu không đúng" },
      { status: 400 }
    );
  }

  const user = existingUsers[0];
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return NextResponse.json(
      { error: "Email hoặc mật khẩu không đúng" },
      { status: 400 }
    );
  }

  // Tạo JWT token chứa thông tin người dùng
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h", // Token có hiệu lực trong 1 giờ
    }
  );

  // Tạo cookie chứa JWT
  const serializedCookie = serialize("auth_token", token, {
    httpOnly: true, // Ngăn không cho JavaScript truy cập cookie
    secure: process.env.NODE_ENV === "production", // Bật https chỉ trong production
    maxAge: 60 * 60, // 1 giờ
    path: "/", // Cookie có hiệu lực cho toàn bộ trang
  });

  const response = NextResponse.json(
    { message: "Đăng nhập thành công" },
    { status: 200 }
  );

  // Thêm cookie vào response
  response.headers.set("Set-Cookie", serializedCookie);
  return response;
}
