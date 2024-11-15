import React,{useEffect} from "react";
import css from "./Layout.module.css";
import moment from "moment/moment";
import { BiSearch } from "react-icons/bi";
import Sidebar from "../Sidebar/Sidebar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth, UserButton,useUser } from "@clerk/clerk-react";
import api from "../../utils/axiosConfig";

const Layout = () => {
  const { pathname } = useLocation();
  const { user } = useUser();
  const { getToken} = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      if (user) {
        try {
          const token = await getToken();
          await api.post('/users/sync', null, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      }
    };

    syncUser();
  }, [user, getToken]);


  return (
    <div className={css.container}>
      <Sidebar />

      {/* making a dashboard as the deafult route */}
      {pathname === "/" && <Navigate to="/dashboard" />}

      <div className={css.dashboard}>
        <div className={css.topBaseGradients}>
          <div className="gradient-red"></div>
          <div className="gradient-orange"></div>
          <div className="gradient-blue"></div>
        </div>

        {/* header */}
        <div className={css.header}>
          {/* for present date */}
          <span>{moment().format("dddd, Do MMM YYYY")}</span>

          <div className={css.searchBar}>
            <BiSearch size={20} />
            <input type="text" placeholder="Search" />
          </div>
          <div className={css.profile}>
            <UserButton />
            <div className={css.details}>
            {user && <span>{user.primaryEmailAddress?.emailAddress}</span>}
            </div>
          </div>
        </div>
        <div className={css.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
