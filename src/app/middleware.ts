import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  // Nếu không có token, redirect đến trang đăng nhập
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Giải mã JWT
    jwt.verify(token, process.env.JWT_SECRET as string);
    // Nếu token hợp lệ, tiếp tục cho phép truy cập
    return NextResponse.next();
  } catch (error) {
    // Nếu token không hợp lệ hoặc hết hạn, redirect đến trang đăng nhập
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Cấu hình middleware để bảo vệ các route cần thiết
export const config = {
  matcher: ["/admin", "/profile"], // Những route cần bảo vệ
};
