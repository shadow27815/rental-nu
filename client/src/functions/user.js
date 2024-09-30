import axios from "axios"; // นำเข้า axios สำหรับทำ HTTP requests

// ฟังก์ชัน list ใช้เพื่อดึงข้อมูลผู้ใช้ทั้งหมด โดยแนบโทเค็นสำหรับการตรวจสอบสิทธิ์ใน headers
export const list = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API + "/user", {
    headers: {
      authtoken, // ส่งโทเค็นการตรวจสอบสิทธิ์ผ่าน headers
    },
  });

// ฟังก์ชัน changeRole ใช้เพื่อเปลี่ยนบทบาทของผู้ใช้ โดยส่งข้อมูลที่ต้องการเปลี่ยนแปลงและโทเค็นใน headers
export const changeRole = async (authtoken, data) =>
  await axios.post(process.env.REACT_APP_API + "/change-role", { data }, {
    headers: {
      authtoken, // ส่งโทเค็นการตรวจสอบสิทธิ์ผ่าน headers
    },
  });

// ฟังก์ชัน getUserWithForms ใช้เพื่อดึงข้อมูลผู้ใช้และฟอร์มที่เกี่ยวข้อง โดยดึงโทเค็นจาก localStorage
export const getUserWithForms = async () =>
  await axios.get(process.env.REACT_APP_API + "/user/forms", {
    headers: {
      authtoken: localStorage.getItem("authtoken"), // ดึงโทเค็นจาก localStorage เพื่อใช้ในการตรวจสอบสิทธิ์
    },
  });
