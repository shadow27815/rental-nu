import axios from 'axios'; // นำเข้า axios สำหรับทำ HTTP requests

// กำหนด URL ของ API โดยใช้ environment variable หรือใช้ URL เริ่มต้นที่ localhost
const API_URL = process.env.REACT_APP_API || 'http://localhost:5000/api';

// ฟังก์ชัน fetchTenants ใช้ในการดึงข้อมูลผู้เช่าทั้งหมดจากเซิร์ฟเวอร์ โดยใช้ HTTP GET
export const fetchTenants = async () => {
    try {
        const response = await axios.get(`${API_URL}/tenants`); // ทำการเรียก API เพื่อดึงข้อมูลผู้เช่า
        return response; // ส่งข้อมูลกลับ
    } catch (error) {
        console.error('Error fetching tenants', error); // แสดงข้อผิดพลาดในกรณีที่ไม่สามารถดึงข้อมูลได้
        throw error; // ส่งข้อผิดพลาดกลับไป
    }
};

// ฟังก์ชัน deleteTenant ใช้สำหรับลบข้อมูลผู้เช่าตาม id โดยใช้ HTTP DELETE
export const deleteTenant = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/tenant/${id}`); // เรียก API เพื่อลบผู้เช่าตาม id
        return response; // ส่งผลลัพธ์กลับ
    } catch (error) {
        console.error('Error deleting tenant', error); // แสดงข้อผิดพลาดหากเกิดปัญหาในการลบ
        throw error; // ส่งข้อผิดพลาดกลับไป
    }
};

// ฟังก์ชัน updateTenant ใช้ในการอัปเดตข้อมูลผู้เช่าตาม id และข้อมูลใหม่ที่ส่งไป โดยใช้ HTTP PUT
export const updateTenant = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/tenant/${id}`, data); // เรียก API เพื่ออัปเดตข้อมูลผู้เช่าตาม id
        return response; // ส่งผลลัพธ์กลับ
    } catch (error) {
        console.error('Error updating tenant', error); // แสดงข้อผิดพลาดหากเกิดปัญหาในการอัปเดต
        throw error; // ส่งข้อผิดพลาดกลับไป
    }
};

// ฟังก์ชัน updateTenantStatus ใช้สำหรับอัปเดตสถานะของผู้เช่าตาม id โดยใช้ HTTP PUT
export const updateTenantStatus = async (id, status) => {
    try {
        const response = await axios.put(`${API_URL}/tenant/${id}/status`, { status }); // เรียก API เพื่ออัปเดตสถานะผู้เช่าตาม id
        return response; // ส่งผลลัพธ์กลับ
    } catch (error) {
        console.error('Error updating tenant status', error); // แสดงข้อผิดพลาดหากเกิดปัญหาในการอัปเดตสถานะ
        throw error; // ส่งข้อผิดพลาดกลับไป
    }
};
