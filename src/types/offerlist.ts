export interface Offer {
    offerId: number;
    customerName: string;
    offerDate: string;
    amount: number;
    status: 'Canceled' | 'Deal' | 'Negotiation' | 'Continue';
  }