import React, { JSX } from "react";
import { OpportunityDto, OpportunityStage } from "@/api/apiDtos";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import { FaPhone, FaBriefcase, FaFileAlt, FaFileContract } from "react-icons/fa";
import { ProbabilityCircle } from "./ProbabilityCircle";

interface Props {
  opportunity: OpportunityDto;
  isDragging: boolean;
  onDragStart: (id: number) => void;
  onDragEnd: () => void;
  onDoubleClick?: (opportunityDto:OpportunityDto) => void;
  onClick?: (opportunityDto:OpportunityDto) => void;
}



// Stage badge icon mapping
const stageIcons: Record<OpportunityStage, JSX.Element> = {
  [OpportunityStage.New]: <FaFileAlt className="inline mr-1" />,
  [OpportunityStage.Qualification]: <FaPhone className="inline mr-1" />,
  [OpportunityStage.Negotiation]: <FaPhone className="inline mr-1" />,
  [OpportunityStage.Proposal]: <FaBriefcase className="inline mr-1" />,
  [OpportunityStage.Won]: <FaBriefcase className="inline mr-1" />,
  [OpportunityStage.Lost]: <FaFileAlt className="inline mr-1" />,
  [OpportunityStage.Contract]: <FaFileContract className="inline mr-1" />,
};

const KanbanCard: React.FC<Props> = ({ opportunity, isDragging, onDragStart, onDragEnd, onDoubleClick,onClick }) => {
 
  const icon = stageIcons[opportunity.opportunityStage?? OpportunityStage.New];

  return (
    <Tippy
      content={
        <div className="text-sm">
          <p>Açıklama: {opportunity.description}</p>
          <p>Kapanış: {opportunity.expectedCloseDate ? new Date(opportunity.expectedCloseDate).toLocaleDateString() : "-"}</p>
        </div>
      }
      placement="top"
      theme="light"
      arrow={true}
    >
      <div
      onDoubleClick={()=>onDoubleClick&&onDoubleClick(opportunity)}
      onClick={()=>onClick&&onClick(opportunity)}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("id", opportunity.id?.toString() || "");
          onDragStart(opportunity.id || 0);
        }}
         onContextMenu={e => e.preventDefault()}
        onDragEnd={onDragEnd}
          onTouchStart={e => e.preventDefault()} // dokunmatik menüyü engeller
  onTouchMove={e => e.preventDefault()}  
        className={`  border-1 rounded mb-2 p-3 shadow-sm transition-all duration-200 ease-in-out cursor-move bg-gray-100 ${
          isDragging ? "opacity-50 scale-95" : "opacity-100"
        }`}
      >
        <div className="flex justify-start gap-2 items-start flex-col  mb-1">
          <h5 className="font-bold wrap-anywhere">{opportunity.customerName}</h5>
          <h6 className="font-bold wrap-anywhere ">{opportunity.title}</h6>
           <span className="text-md font-bold text-gray-950">{opportunity.value?.toLocaleString("tr-TR", { style: "currency", currency: opportunity.currency??"TRY" })}</span>
           <span>{opportunity.expectedCloseDate ? new Date(opportunity.expectedCloseDate).toLocaleDateString() : "-"}</span>
           <ProbabilityCircle size={60} strokeWidth={10} value={opportunity.probability??0}  />
           {
            // opportunity.activity?.map(act=>(
            //   <div key={act.id} className="text-sm text-gray-600">
            //      <span className="text-red-600 font-bold font-md">{act.scheduledAt &&  new  Date(act.scheduledAt)?.toLocaleDateString()}</span>-{act.subject} 
            //   </div>
            // ))
           }
          {/* <span className={`px-2 py-0.5 rounded text-xs font-semibold`}>
            {icon}
            {opportunity.opportunityStage}
          </span> */}
        </div>
      </div>
    </Tippy>
  );
};

export default KanbanCard;
