import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Không tìm thấy token" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      email: string;
    };
    return NextResponse.json(
      { id: decoded.id, email: decoded.email },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Token không hợp lệ" }, { status: 401 });
  }
}
