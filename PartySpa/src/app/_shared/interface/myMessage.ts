export interface MyMessage {
  id: number;
  partyId: number;
  senderId: number;
  senderName: string;
  senderPhotoUrl: string;
  recipientId: number;
  recipientName: string;
  recipientPhotoUrl: string;
  contents: string;
  isRead: boolean;
  readDate: Date;
  sendDate: Date;
}
