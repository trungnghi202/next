import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Đăng xuất thành công" },
    { status: 200 }
  );

  // Xóa cookie bằng cách đặt maxAge thành 0
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  return response;
}
