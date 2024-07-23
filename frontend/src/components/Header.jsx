import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import useMyProfile from "../hooks/useMyProfile";
import getUserAvatar from "../utils/getUserAvatar";
import Dropdown from "antd/lib/dropdown";
import {
   MenuOutlined
} from "@ant-design/icons";
import useSocket from "../hooks/useSocket";
import { ACCESS_TOKEN, removeLocalStorageItem, USER_DATA } from "../utils/localStroageManager";

const Header = ({ showDrawer }) => {
   const navigate = useNavigate();
   const {
      myProfile,
   } = useSelector(state => state.appConfigReducer);

   useMyProfile();
   useSocket();

   const profilePic = useMemo(() => {
      return getUserAvatar(myProfile);
   }, [myProfile])

   const logout = () => {
      removeLocalStorageItem(ACCESS_TOKEN, USER_DATA);
      navigate("/login");
   }

   return (
      <div className="h-[60px] px-4 flex justify-between items-center">
         <div className="flex justify-center items-center gap-2">
            <MenuOutlined
               className="block md:hidden leading-[0] text-light-primary text-2xl cursor-pointer"
               onClick={showDrawer}
            />
            <img
               className="w-[40px] object-cover"
               src="logo.svg"
               alt="logo"
            />
         </div>
         <div className="flex justify-center items-center gap-4">
            <Dropdown
               menu={{
                  items: [
                     {
                        key: '1',
                        label: <p className="p-1 rounded-md bg-dark-secondary  text-red-400 font-semibold text-center">Logout</p>,
                        style: { background: "none", padding: "0" },
                        onClick: logout
                     },
                  ],
               }}
               overlayStyle={{ top: "3.5rem", overflow: "hidden" }}
               trigger={['click']}
               placement="bottomRight"
            >
               <div className="flex justify-center items-center gap-2 cursor-pointer">
                  <Avatar src={profilePic} />
                  <span
                     className="hidden md:inline text-light-primary"
                  >
                     {myProfile?.nickname}
                  </span>
               </div>
            </Dropdown>
         </div>
      </div>
   )
};

export default Header;
