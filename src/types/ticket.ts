export interface Creator {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone1: string;
  image: string;
}

export interface Ticket {
  id: number;
  topic: string;
  priority: 'veryimportant' | 'important' | 'normal';
  title: string;
  description: string;
  status: 'active' | 'waiting' | 'closed';
  createdTime: string;
  updatedTime: string;
  resolutionDate: string | null;
  satisfactionRate: number | null;
  creator: Creator;
}

export interface CreateTicket {
  topic: string;
  priority: 'veryimportant' | 'important' | 'normal';
  title: string;
  description: string;
}

export interface UpdateTicket {
  topic: string;
  priority: 'veryimportant' | 'important' | 'normal';
  title: string;
  description: string;
  status: 'active' | 'waiting' | 'closed';
  resolutionDate: string;
  satisfactionRate: number;
}

export interface UpdateTicketPass{
  id: number;
  Updates : Partial<UpdateTicket>;
}

export interface TicketLogMessage {
  message: string;
  ticketId: number;
}

export interface TicketLogEntry {
  id: number;
  message: string;
  type: "closed" | "priority" | "update" | "status" | "message";
  createdTime: string;
  creator: Creator;
}

export interface TicketLog extends Ticket {
  ticketLogs: TicketLogEntry[];
}