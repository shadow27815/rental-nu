import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';

// สร้าง Redux store โดยใช้ configureStore จาก Redux Toolkit
export const store = configureStore({
  reducer: {
    user: userSlice, // กำหนดตัว reducer สำหรับจัดการข้อมูลของ user โดยใช้ userSlice
  },
});
