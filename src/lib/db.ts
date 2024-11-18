import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: parseInt(process.env.MYSQL_PORT || "8889", 10),
  connectionLimit: 10,
});



export async function executeQuery<T>(
  query: string,
  values: any[] = []
): Promise<T> {
  try {
    const [results] = await pool.query(query, values);
    return results as T;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}
export async function testConnection() {
  try {
    console.log("Attempting to connect with config:", {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT,
    });
    const connection = await pool.getConnection();
    await connection.query("SELECT 1");
    connection.release();
    return { success: true, message: "Kết nối MySQL thành công!" };
  } catch (error) {
    console.error("Lỗi kết nối MySQL:", error);
    return {
      success: false,
      message: "Kết nối MySQL thất bại",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}


