export interface PartyPhoto {
  id: number;
  partyId: number;
  photoUrl: string;
  descriptions: string;
  dateAdded: Date;
  isMain: boolean;
}
