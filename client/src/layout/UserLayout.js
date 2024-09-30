import React from 'react';
import ResponsiveAppBar from './ResponsiveAppBar'; // นำเข้า ResponsiveAppBar สำหรับแถบนำทาง

// คอมโพเนนต์ UserLayout ใช้สำหรับจัดโครงร่างของหน้าผู้ใช้
const UserLayout = ({ children }) => {
    return (
        <>
            {/* แสดง ResponsiveAppBar ซึ่งเป็นแถบนำทางด้านบนในทุกหน้า */}
            <ResponsiveAppBar />

            {/* ส่วนเนื้อหาหลักของแต่ละหน้าที่จะแสดงเนื้อหาตามที่ถูกส่งผ่านมาจาก props */}
            <div>
                {children} {/* เนื้อหาของหน้าผู้ใช้จะแสดงในส่วนนี้ */}
            </div>
        </>
    );
};

export default UserLayout;
