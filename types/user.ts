export type User = {
  uid: string;
  name: string;
  profileText: string | undefined;
  profileImage: string | undefined | null;
  livingStatusType: string | undefined;
};