import axios from 'axios' // นำเข้า axios สำหรับทำ HTTP requests

// ฟังก์ชัน remove ใช้ในการลบข้อมูลพื้นที่ตาม id โดยใช้ HTTP DELETE
export const remove = async (id) =>
    await axios.delete(process.env.REACT_APP_API + '/product/' + id)

// ฟังก์ชัน create ใช้สำหรับสร้างพื้นที่หรือเพิ่มข้อมูลใหม่ โดยใช้ HTTP POST
export const create = async (data) =>
    await axios.post(process.env.REACT_APP_API + '/product', data)

// ฟังก์ชัน listby ใช้เพื่อดึงรายการพื้นที่ตามเงื่อนไข limit, sort, และ order โดยใช้ HTTP POST
export const listby = async (limit, sort, order) =>
    await axios.post(process.env.REACT_APP_API + '/productby', {
        limit,
        sort,
        order,
    })

// ฟังก์ชัน getdata ใช้เพื่อดึงรายการพื้นที่ทั้งหมด โดยใช้ HTTP GET
export const getdata = async () => {
    return await axios.get(process.env.REACT_APP_API + '/product')
}

// ฟังก์ชัน read ใช้สำหรับดึงข้อมูลพื้นที่ตาม id ที่ส่งมา โดยใช้ HTTP GET
export const read = async (id) => {
    return await axios.get(process.env.REACT_APP_API + '/product/' + id)
}

// ฟังก์ชัน update ใช้สำหรับแก้ไขข้อมูลพื้นที่ตาม id โดยส่งข้อมูลใหม่ไปพร้อมกัน โดยใช้ HTTP PUT
export const update = async (id, data) => {
    return await axios.put(process.env.REACT_APP_API + '/product/' + id, data)
}
