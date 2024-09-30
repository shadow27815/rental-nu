import { createSelector } from 'reselect';

// Selector สำหรับดึงข้อมูลสถานะของผู้ใช้จาก Redux store
const selectUserState = (state) => state.user;

// ตัวเลือกแบบแคชสำหรับดึงข้อมูลผู้ใช้ (user data)
export const selectUserData = createSelector(
    [selectUserState], // ใช้ selectUserState เป็น input
    (userState) => userState.data // ดึงข้อมูลจาก userState.data
);

// ตัวเลือกแบบแคชสำหรับดึงบทบาทของผู้ใช้ (user role)
export const selectUserRole = createSelector(
    [selectUserState], // ใช้ selectUserState เป็น input
    (userState) => userState.role // ดึงข้อมูลบทบาทผู้ใช้จาก userState.role
);

// ตัวเลือกแบบแคชสำหรับตรวจสอบว่าผู้ใช้เป็น Admin หรือไม่
export const selectIsAdmin = createSelector(
    [selectUserState], // ใช้ selectUserState เป็น input
    (userState) => userState.role === 'admin' // ตรวจสอบบทบาทว่าเป็น 'admin' หรือไม่
);
