import { FiUser } from "react-icons/fi";

export const Avatar = ({ name,onClick }: { name: string,onClick:()=>void }) => (
  <div className="flex items-center gap-2 " onClick={onClick} style={{cursor:"pointer"}}>
    <FiUser className="w-6 h-6 rounded-full"/>
    {/* <img
      src="https://i.pravatar.cc/40"
      alt="User"
      className="w-8 h-8 rounded-full"
    /> */}
    <span className="hidden md:inline text-sm font-medium">{name}</span>
  </div>
);
