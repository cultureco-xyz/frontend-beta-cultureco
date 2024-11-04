export enum UserRole {
  CREATOR = "creator",
  USER = "user",
}

export enum CREATOR_TYPES {
  ARTIST = "Artist",
  MUSICIAN = "Musician",
}

// Interface for TypeScript to enforce schema typing
export interface UserData {
  _id?: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  profilePicture: string;
  role: UserRole;
  creatorType?: CREATOR_TYPES;
  isDemo?: boolean;
  demoCreatorEmail?: string;
  createdAt: Date;
  updatedAt: Date;
  isClaimed: boolean;
}
