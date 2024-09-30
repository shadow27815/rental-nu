import React, { useEffect, useState } from "react";
import { listby } from "../../functions/product";  // ฟังก์ชันที่ดึงข้อมูลพื้นที่จากฐานข้อมูล
import CategoryGrid from "./CategoryGrid";  // ส่วนประกอบที่จะแสดงข้อมูลพื้นที่ในรูปแบบตาราง

const SpaceNew = ({ searchTerm, filter }) => {
  const [products, setProducts] = useState([]);  // เก็บข้อมูลพื้นที่ทั้งหมด
  const [hasResults, setHasResults] = useState(true);  // เก็บสถานะว่ามีผลการค้นหาหรือไม่

  // useEffect ทำงานเมื่อ searchTerm หรือ filter เปลี่ยนแปลง
  useEffect(() => {
    loadData();  // เรียกฟังก์ชันโหลดข้อมูล
  }, [searchTerm, filter]);

  // ฟังก์ชันโหลดข้อมูลพื้นที่
  const loadData = async () => {
    try {
      // ดึงข้อมูลพื้นที่ทั้งหมดด้วยการเรียงตาม 'createdAt' และจำกัดจำนวน 100 รายการ
      const res = await listby(100, "createdAt", "asc");

      // เรียกใช้ฟังก์ชันกรองข้อมูลและจัดประเภทพื้นที่
      const filteredProducts = filterAndCategorizeProducts(res.data, searchTerm, filter);

      // อัปเดตสถานะของพื้นที่ที่ผ่านการกรอง
      setProducts(filteredProducts);

      // ตรวจสอบว่ามีข้อมูลพื้นที่หรือไม่
      setHasResults(Object.keys(filteredProducts).length > 0);
    } catch (err) {
      console.error(err);  // แสดงข้อผิดพลาดในกรณีที่โหลดข้อมูลล้มเหลว
    }
  };

  // ฟังก์ชันกรองข้อมูลพื้นที่และจัดประเภทตามสถานที่
  const filterAndCategorizeProducts = (products, searchTerm, filter) => {
    let filtered = products;

    // กรองข้อมูลตามคำค้นหา
    if (searchTerm) {
      filtered = filtered.filter(product => ['price', 'name', 'detail', 'location']
        .some(key => product[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())));  // ตรวจสอบข้อมูลใน price, name, detail, หรือ location ว่าตรงกับคำค้นหาหรือไม่
    }

    // กรองข้อมูลตามตัวกรองราคา
    if (filter.price) {
      filtered.sort((a, b) => filter.price === 'low-to-high' ? a.price - b.price : b.price - a.price);  // กรองตามราคาจากต่ำไปสูงหรือสูงไปต่ำ
    }

    // กรองข้อมูลตามสถานที่
    if (filter.location) {
      filtered = filtered.filter(product => product.location.toLowerCase() === filter.location.toLowerCase());  // กรองตามสถานที่ที่เลือก
    }

    // กรองข้อมูลตามสถานะ (ว่าง, มีผู้เช่า, กำลังปรับปรุง)
    if (filter.status) {
      filtered = filtered.filter(product => product.status === filter.status);  // กรองตามสถานะที่เลือก
    }

    // จัดประเภทพื้นที่ตามสถานที่
    return filtered.reduce((categories, product) => {
      const location = product.location || 'Other';  // ถ้าไม่มี location ให้ใช้ 'Other'
      if (!categories[location]) categories[location] = [];  // ถ้า location ยังไม่มีในหมวดหมู่ ให้สร้าง array ใหม่
      categories[location].push(product);  // เพิ่มพื้นที่เข้าไปในหมวดหมู่ของสถานที่นั้น ๆ
      return categories;
    }, {});  // {} คือค่าเริ่มต้นสำหรับการเก็บหมวดหมู่ของพื้นที่
  };

  return (
    <div style={{ padding: '20px', overflow: 'auto' }}>
      <CategoryGrid products={products} hasResults={hasResults} />  {/* แสดงข้อมูลพื้นที่ */}
    </div>
  );
};

export default SpaceNew;
