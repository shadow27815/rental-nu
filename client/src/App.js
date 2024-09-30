import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layouts
import UserLayout from "./layout/UserLayout"; // Layout สำหรับหน้าผู้ใช้

// pages
import Register from "./components/pages/auth/Register"; // หน้า Register
import Login from "./components/pages/auth/Login"; // หน้า Login

// admin pages
import HomePageAdmin from "./components/pages/admin/HomePageAdmin"; // หน้าแดชบอร์ดของแอดมิน
import AdminTenantView from "./components/pages/admin/AdminTenantView"; // หน้าแสดงผู้เช่าสำหรับแอดมิน
import FormProduct from "./components/pages/admin/FormProduct"; // หน้าฟอร์มพื้นที่สำหรับแอดมิน
import FormEditProduct from "./components/pages/admin/FormEditProduct"; // หน้าแก้ไขฟอร์มพื้นที่

// user pages
import HomepageUser from "./components/pages/user/HomepageUser"; // หน้าแรกของผู้ใช้
import ProductDetail from './components/pages/user/ProductDetail'; // หน้ารายละเอียดพื้นที่
import MapPage from "./components/pages/user/MapPage"; // หน้าแผนที่
import ContractPage from "./components/pages/user/ContractPage"; // หน้าช่องทางการติดต่อ
import TenantForm from "./components/pages/user/TenantForm"; // แบบฟอร์มผู้เช่า
import UserFormsView from "./components/pages/user/UserFormsView"; // หน้าดูฟอร์มของผู้ใช้
import SpaceDetailPage from "./components/pages/user/SpaceDetailPage"; // หน้ารายละเอียดพื้นที่
import CalendarView from "./components/pages/user/CalendarView"; // หน้าปฏิทิน

// routes
import AdminRoute from "./routes/AdminRoute"; // เส้นทางสำหรับผู้ดูแลระบบ (ตรวจสอบสิทธิ์)
import UserRoute from "./routes/UserRoute"; // เส้นทางสำหรับผู้ใช้ที่เข้าสู่ระบบ (ตรวจสอบสิทธิ์)

// notify
import { ToastContainer } from 'react-toastify'; // สำหรับแสดงข้อความแจ้งเตือน
import 'react-toastify/dist/ReactToastify.css'; // สไตล์สำหรับ ToastContainer

// Error page
import Notfound404 from "./components/pages/Notfound404"; // หน้าแสดงเมื่อไม่พบเพจที่ค้นหา

function App() {
  return (
    <BrowserRouter>
      <>
        {/* แสดงข้อความแจ้งเตือน */}
        <ToastContainer position="top-left" />

        <Routes>
          {/* แสดงหน้าไม่พบเพจถ้า URL ไม่ตรงกับที่กำหนด */}
          <Route path="*" element={<Notfound404 text="The page you’re looking for doesn’t exist." />} />

          {/* เส้นทางสาธารณะ */}
          <Route path="/" element={
            <UserLayout>
              <HomepageUser /> {/* หน้าแรกของผู้ใช้ */}
            </UserLayout>
          } />
          <Route path="/register" element={<Register />} /> {/* หน้า Register */}
          <Route path="/login" element={<Login />} /> {/* หน้า Login */}

          {/* เส้นทางสำหรับผู้ใช้ */}
          <Route path="/user/index" element={
            <UserLayout>
              <HomepageUser /> {/* หน้าแรกของผู้ใช้ */}
            </UserLayout>
          } />

          <Route path="/product/:id" element={
            <UserLayout>
              <ProductDetail /> {/* หน้ารายละเอียดพื้นที่ */}
            </UserLayout>
          } />

          <Route path="/tenant-form" element={
            <UserRoute> {/* ตรวจสอบสิทธิ์การเข้าถึง */}
              <UserLayout>
                <TenantForm /> {/* แบบฟอร์มผู้เช่า */}
              </UserLayout>
            </UserRoute>
          } />

          <Route path="/map" element={
            <UserLayout>
              <MapPage /> {/* หน้าแผนที่ */}
            </UserLayout>
          } />

          <Route path="/spacedetail" element={
            <UserLayout>
              <SpaceDetailPage /> {/* หน้ารายละเอียดพื้นที่ */}
            </UserLayout>
          } />

          <Route path="/user/forms" element={
            <UserRoute> {/* ตรวจสอบสิทธิ์การเข้าถึง */}
              <UserLayout>
                <UserFormsView /> {/* หน้าฟอร์มของผู้ใช้ */}
              </UserLayout>
            </UserRoute>
          } />

          <Route path="/contract" element={
            <UserLayout>
              <ContractPage /> {/* หน้าช่องทางการติดต่อ */}
            </UserLayout>
          } />

          <Route path="/calendar" element={
            <UserLayout>
              <CalendarView /> {/* หน้าปฏิทิน */}
            </UserLayout>
          } />

          {/* เส้นทางสำหรับแอดมิน */}
          <Route path="/admin/index" element={
            <AdminRoute> {/* ตรวจสอบสิทธิ์การเข้าถึงผู้ดูแลระบบ */}
              <HomePageAdmin /> {/* หน้าแดชบอร์ดแอดมิน */}
            </AdminRoute>
          } />

          <Route path="/admin/viewtable" element={
            <AdminRoute> {/* ตรวจสอบสิทธิ์การเข้าถึงผู้ดูแลระบบ */}
              <FormProduct /> {/* ตารางฟอร์มพื้นที่ */}
            </AdminRoute>
          } />

          <Route path="/admin/tenants" element={
            <AdminRoute> {/* ตรวจสอบสิทธิ์การเข้าถึงผู้ดูแลระบบ */}
              <AdminTenantView /> {/* รายการผู้เช่าสำหรับแอดมิน */}
            </AdminRoute>
          } />

          <Route path="/edit/:id" element={
            <AdminRoute> {/* ตรวจสอบสิทธิ์การเข้าถึงผู้ดูแลระบบ */}
              <FormEditProduct /> {/* แก้ไขฟอร์มพื้นที่ */}
            </AdminRoute>
          } />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
