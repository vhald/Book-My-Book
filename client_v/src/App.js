import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TopNav from "./components/TopNav";
import PrivateRoute from "./components/PrivateRoute";

// components
import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./user/Dashboard";
import DashboardSeller from "./user/DashboardSeller";
import NewBook from "./books/NewBook";
import StripeCallback from "./stripe/StripeCallback";
import EditBook from "./books/EditBook";
import ViewBook from "./books/ViewBook";
import StripeSuccess from "./stripe/StripeSuccess";
import StripeCancel from "./stripe/StripeCancel";
import Search from "./components/forms/Search";



function App() {
    return (
        <Router>
            <TopNav />
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
            />
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/" element={<Home />} />
                <Route exact path="/book/:bookid" element={<ViewBook />} />
                <Route exact path="/search" element={<Search />} />
                {/* <PrivateRoute exact path="/dashboard" element={<Dashboard />} /> */}
                <Route exact path='/' element={<PrivateRoute />}>
                    <Route exact path='/dashboard' element={<Dashboard />} />
                    <Route exact path='/dashboard/seller' element={<DashboardSeller />} />
                    <Route exact path='/books/new' element={<NewBook />} />
                    <Route exact path='/stripe/callback' element={<StripeCallback />} />
                    <Route exact path="/book/edit/:bookId" element={<EditBook />} />
                    <Route exact path="/stripe/success/:bookId" element={<StripeSuccess />} />
                    <Route exact path="/stripe/cancel" element={<StripeCancel />} />
                </Route>

            </Routes>
        </Router>
    );
}

export default App;
