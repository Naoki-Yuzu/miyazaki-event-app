export type Post = {
  id: string;
  authorId: string;
  title: string;
  thumbnailURL: string | null;
  text: string;
  maxParticipation: string;
  participationNumber: string | null;
  eventDate: number;
  deadlineDate: number;
  location: object | null;
  createdAt: number;
  updatedAt: number | null;
}