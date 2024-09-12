import React from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';

const UserLayout = ({ children }) => {
    return (
        <>
            <ResponsiveAppBar /> {/* แสดง AppBar ในทุกหน้า */}
            <div>
                {children} {/* เนื้อหาของหน้าผู้ใช้จะถูกแสดงตรงนี้ */}
            </div>
        </>
    );
};

export default UserLayout;
