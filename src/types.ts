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

export interface IProductData {
  _id: string;
  title: string;
  description: string;
  productType: string;
  productFormat: string;
  imageURL: string;
  creator: UserData;
  dropDate: Date;
  quantity: number;
  regularPrice: number;
  memberPrice: number;
  rarity: string;
  productIsLive: boolean;
  category: string[];
  membersOnly: boolean;
  isDemo: boolean;
  fanlimit: number;
  printSize: string;
  audioUrl: string;
  artist: string;
  songName: string;
  duration: number; //in minutes
  location: string;
  enabled: boolean;
  collaborator: string;
  album: string;
}

export interface IComment {
  _id?: string;
  productId: string | IProductData;
  userId: string | UserData;
  content: string;
  isDeleted?: boolean; // Soft delete functionality
}
