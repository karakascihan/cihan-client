import React, { useEffect, useState } from "react";
import { FiMenu, FiBell } from "react-icons/fi";
import { useUI } from "../context/UIContext";
import { Badge } from "./Badge";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { UserMenu } from "./UserMenu";
import { apiRequest } from "@/services/apiRequestService";
import { ApiResponseClient } from "@/types/apiResponse";
import { URL } from "@/api";
import MenuButton, { MenuItem } from "./MenuButton";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const { toggleSidebar,toggleCollapsed } = useUI();
  const userData= useSelector((state:RootState) => state.login.user);
  const [educationState,setEducationState] = useState(0);
   const user = useSelector<RootState>((x) => x.login);
   const navigate=useNavigate();
  useEffect(() => {
   apiRequest<ApiResponseClient<number>>("GET", URL+"/education/GetAssignToPersonel?state=0", {
        Authorization: "Bearer " + user.accessToken,
      }).then(result=>{
        if (result.isSuccess) {
          setEducationState(result.result);
        }
      });
  }, [])
  
const buttons :MenuItem [] =[];
if (educationState !=0) {
  buttons.push({
    icon:<FiBell/>,
    label: "Tarafınıza atanmış "+educationState+" adet eğitim bulunmaktadır.",
    onClick: function (): void {
      navigate("/egitimler");
    }
  });
}
  return (
    <header className="flex justify-between items-center p-1 bg-gray-200 dark:bg-gray-800 border-b md:ml-0">
      <button className="md:hidden" onClick={toggleSidebar}>
        <FiMenu size={24} />
      </button>
       <button className="hidden sm:block cursor-pointer" onClick={toggleCollapsed}>
        <FiMenu size={24} />
      </button>
      <div className="flex items-center gap-4">
       <MenuButton
  items={buttons}
  buttonIcon={
    <div className="relative mt-2">
      <FiBell size={22} />
      {educationState !== 0 && <Badge count={1} />}
    </div>
  }
/>

       
        <UserMenu user={userData} />
      </div>
    </header>
  );
};
