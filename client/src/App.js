import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layouts
import UserLayout from "./layout/UserLayout"; // Layout สำหรับผู้ใช้

// pages
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";

// admin
import HomePageAdmin from "./components/pages/admin/HomePageAdmin";
import AdminTenantView from "./components/pages/admin/AdminTenantView";
import FormProduct from "./components/pages/admin/FormProduct";
import FormEditProduct from "./components/pages/admin/FormEditProduct";

// user
import HomepageUser from "./components/pages/user/HomepageUser";
import ProductDetail from './components/pages/user/ProductDetail';
import MapPage from "./components/pages/user/MapPage";
import ContractPage from "./components/pages/user/ContractPage";
import TenantForm from "./components/pages/user/TenantForm";
import UserFormsView from "./components/pages/user/UserFormsView";
import SpaceDetailPage from "./components/pages/user/SpaceDetailPage";
import CalendarView from "./components/pages/user/CalendarView";

// routes
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";

// notify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Error page
import Notfound404 from "./components/pages/Notfound404";


function App() {
  return (
    <BrowserRouter>
      <>
        <ToastContainer position="top-left" />

        <Routes>
          {/* Page not found */}
          <Route path="*" element={<Notfound404 text="The page you’re looking for doesn’t exist." />} />

          {/* Public routes */}
          <Route path="/" element={
            <UserLayout>
              <HomepageUser />
            </UserLayout>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* User pages */}
          <Route
            path="/user/index"
            element={
              <UserLayout>
                <HomepageUser />
              </UserLayout>
            }
          />

          <Route
            path="/product/:id"
            element={
              <UserLayout>
                <ProductDetail />
              </UserLayout>
            }
          />

          <Route
            path="/tenant-form"
            element={
              <UserRoute>
                <UserLayout>
                  <TenantForm />
                </UserLayout>
              </UserRoute>
            }
          />

          <Route
            path="/map"
            element={
              <UserLayout>
                <MapPage />
              </UserLayout>
            }
          />

          <Route
            path="/spacedetail"
            element={
              <UserLayout>
                <SpaceDetailPage />
              </UserLayout>
            }
          />

          <Route
            path="/user/forms"
            element={
              <UserRoute>
                <UserLayout>
                  <UserFormsView />
                </UserLayout>
              </UserRoute>
            }
          />

          <Route
            path="/contract"
            element={
              <UserLayout>
                <ContractPage />
              </UserLayout>
            }
          />

          <Route
            path="/calendar"
            element={
              <UserLayout>
                <CalendarView />
              </UserLayout>
            }
          />

          {/* Admin pages */}
          <Route
            path="/admin/index"
            element={
              <AdminRoute>
                <HomePageAdmin />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/viewtable"
            element={
              <AdminRoute>
                <FormProduct />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/tenants"
            element={
              <AdminRoute>
                <AdminTenantView />
              </AdminRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <AdminRoute>
                <FormEditProduct />
              </AdminRoute>
            }
          />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
