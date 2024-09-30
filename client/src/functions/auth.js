import axios from "axios"; // นำเข้าไลบรารี axios สำหรับทำ HTTP requests

// ฟังก์ชัน register สำหรับส่งข้อมูลการลงทะเบียนไปยัง API
// ใช้ HTTP POST ไปที่ endpoint "/register"
// data คือข้อมูลที่ส่งไปพร้อมกับ request
export const register = async (data) =>
  await axios.post(process.env.REACT_APP_API + "/register", data);

// ฟังก์ชัน login สำหรับส่งข้อมูลการเข้าสู่ระบบไปยัง API
// ใช้ HTTP POST ไปที่ endpoint "/login"
// data คือข้อมูลที่ส่งไปพร้อมกับ request
export const login = async (data) =>
  await axios.post(process.env.REACT_APP_API + "/login", data);

// ฟังก์ชัน currentUser สำหรับตรวจสอบผู้ใช้ปัจจุบันโดยใช้โทเค็นที่ส่งมา
// ใช้ HTTP POST ไปที่ endpoint "/current-user"
// โทเค็นการตรวจสอบสิทธิ์ (authtoken) ถูกส่งผ่านใน headers ของ request
export const currentUser = async (authtoken) =>
  await axios.post(process.env.REACT_APP_API + "/current-user", {}, {
    headers: {
      authtoken // เพิ่มโทเค็นใน headers เพื่อใช้ในการตรวจสอบสิทธิ์
    }
  });

// ฟังก์ชัน currentAdmin สำหรับตรวจสอบผู้ใช้ปัจจุบันว่าเป็นแอดมินหรือไม่
// ใช้ HTTP POST ไปที่ endpoint "/current-admin"
// โทเค็นการตรวจสอบสิทธิ์ (authtoken) ถูกส่งผ่านใน headers ของ request
export const currentAdmin = async (authtoken) =>
  await axios.post(process.env.REACT_APP_API + "/current-admin", {}, {
    headers: {
      authtoken // เพิ่มโทเค็นใน headers เพื่อใช้ในการตรวจสอบสิทธิ์ของแอดมิน
    }
  });
