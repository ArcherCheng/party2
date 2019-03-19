export interface PartySummary {
  partyId: number;
  partyName: string;
  marry: number;
  partyDate: Date;
  restaurant: string;

  totalPersons: number;
  avgOlds: number;

  totalMen: number;
  avgMenOlds: number;

  totalWomen: number;
  avgWomenOlds: number;

  totalVotes: number;
  totalMatch: number;
}
