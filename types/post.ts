export type Post = {
  id: string;
  authorId: string;
  title: string;
  thumbnailURL: string | null | undefined;
  text: string;
  maxParticipation: string;
  participationNumber: number | undefined;
  eventDate: number;
  deadlineDate: number;
  location: object | null;
  createdAt: number;
  updatedAt: number | null;
}