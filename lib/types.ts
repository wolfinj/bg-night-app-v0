export type User = {
  id: string;
  name: string;
  surname: string;
  bggName: string;
  discordId: string;
  profileImage: string;
  games: {
    bggId: string;
    dateOwned: Date;
    canTeachRules: boolean;
  }[];
  events: {
    date: Date;
    eventType: string;
    description: string;
  }[];
  calendarEvents: {
    date: Date;
    eventType: string;
    description: string;
  }[];
}

export type Group = {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  members: {
    userId: string;
    joinDate: Date;
    isOwner: boolean;
    isModerator: boolean;
    canCreateEvents: boolean;
    isPinned: boolean;
    pinnedItems?: string[];
  }[];
}

