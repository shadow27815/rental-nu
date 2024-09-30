import { createSlice } from "@reduxjs/toolkit";

// กำหนดค่าเริ่มต้นของ state ใน Redux store
const initialState = {
  value: "tam korat 5555+", // ข้อมูลเริ่มต้นของค่า value
  user: [] // ข้อมูลเริ่มต้นของ user ซึ่งเป็น array ว่าง
};

// สร้าง slice ชื่อว่า user โดยใช้ createSlice จาก Redux Toolkit
export const userSlice = createSlice({
  name: "user", // ชื่อของ slice
  initialState, // กำหนดค่าเริ่มต้นจาก initialState
  reducers: {
    // ฟังก์ชัน reducer สำหรับจัดการการ login
    login: (state, action) => {
      state.value = 'tam login'; // เปลี่ยนค่า value เมื่อผู้ใช้ล็อกอิน
      state.user = action.payload; // อัปเดตข้อมูลผู้ใช้ด้วย payload ที่ส่งมา
    },
    // ฟังก์ชัน reducer สำหรับจัดการการ logout
    logout: (state) => {
      state.user = []; // ล้างข้อมูลผู้ใช้เมื่อผู้ใช้ออกจากระบบ
      localStorage.clear(); // ล้างข้อมูลใน localStorage
    },
    // ฟังก์ชัน reducer สำหรับเพิ่มค่าใน state ด้วย payload ที่ส่งมา
    incrementByAmount: (state, action) => {
      state.value += action.payload; // เพิ่มค่า value ด้วยค่า payload
    },
  },
});

// สร้าง Action creators สำหรับแต่ละ reducer
export const { login, logout, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;
