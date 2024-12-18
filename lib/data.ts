import { User, Group } from './types';

export const users: User[] = [
  {
    id: '1',
    name: 'John',
    surname: 'Doe',
    bggName: 'JohnDoeGamer',
    discordId: 'johndoe#1234',
    profileImage: 'https://i.pravatar.cc/150?img=1',
    games: [
      { bggId: '13', dateOwned: new Date('2022-01-01'), canTeachRules: true },
      { bggId: '30549', dateOwned: new Date('2022-03-15'), canTeachRules: false },
    ],
    events: [
      { date: new Date('2023-06-01'), eventType: 'Game Night', description: 'Hosted weekly game night' },
      { date: new Date('2023-06-08'), eventType: 'Tournament', description: 'Participated in Catan tournament' },
    ],
    calendarEvents: [
      { date: new Date('2023-06-15'), eventType: 'Game Night', description: 'Hosting game night' },
      { date: new Date('2023-06-22'), eventType: 'Convention', description: 'Attending local board game convention' },
    ],
  },
  {
    id: '2',
    name: 'Jane',
    surname: 'Smith',
    bggName: 'JaneSmithGamer',
    discordId: 'janesmith#5678',
    profileImage: 'https://i.pravatar.cc/150?img=2',
    games: [
      { bggId: '30549', dateOwned: new Date('2022-02-14'), canTeachRules: true },
      { bggId: '167791', dateOwned: new Date('2022-05-20'), canTeachRules: true },
    ],
    events: [
      { date: new Date('2023-06-05'), eventType: 'Game Night', description: 'Attended weekly game night' },
      { date: new Date('2023-06-12'), eventType: 'Workshop', description: 'Hosted rules explanation workshop' },
    ],
    calendarEvents: [
      { date: new Date('2023-06-19'), eventType: 'Game Night', description: 'Attending game night' },
      { date: new Date('2023-06-26'), eventType: 'Tournament', description: 'Participating in Terraforming Mars tournament' },
    ],
  },
  {
    id: '3',
    name: 'Alice',
    surname: 'Johnson',
    bggName: 'AliceJGamer',
    discordId: 'alicejohnson#9012',
    profileImage: 'https://i.pravatar.cc/150?img=3',
    games: [
      { bggId: '174430', dateOwned: new Date('2022-07-01'), canTeachRules: true },
      { bggId: '224517', dateOwned: new Date('2022-08-15'), canTeachRules: true },
    ],
    events: [],
    calendarEvents: [],
  },
  {
    id: '4',
    name: 'Bob',
    surname: 'Williams',
    bggName: 'BobWGamer',
    discordId: 'bobwilliams#3456',
    profileImage: 'https://i.pravatar.cc/150?img=4',
    games: [
      { bggId: '167791', dateOwned: new Date('2022-09-01'), canTeachRules: false },
      { bggId: '266192', dateOwned: new Date('2022-10-15'), canTeachRules: true },
    ],
    events: [],
    calendarEvents: [],
  },
  {
    id: '5',
    name: 'Emma',
    surname: 'Brown',
    bggName: 'EmmaBGamer',
    discordId: 'emmabrown#7890',
    profileImage: 'https://i.pravatar.cc/150?img=5',
    games: [
      { bggId: '233078', dateOwned: new Date('2022-11-01'), canTeachRules: true },
      { bggId: '169786', dateOwned: new Date('2022-12-15'), canTeachRules: true },
    ],
    events: [],
    calendarEvents: [],
  },
];

export const groups: Group[] = [
  {
    id: '1',
    name: "Beasty Bar's",
    type: 'Local',
    description: 'A local board game group that meets weekly',
    image: 'https://picsum.photos/200?random=1',
    members: [
      { userId: '1', joinDate: new Date('2022-01-01'), isOwner: true, isModerator: true, canCreateEvents: true, isPinned: true },
      { userId: '2', joinDate: new Date('2022-01-15'), isOwner: false, isModerator: false, canCreateEvents: true, isPinned: true },
      { userId: '3', joinDate: new Date('2022-02-01'), isOwner: false, isModerator: false, canCreateEvents: false, isPinned: false },
      { userId: '4', joinDate: new Date('2022-02-15'), isOwner: false, isModerator: false, canCreateEvents: false, isPinned: true },
      { userId: '5', joinDate: new Date('2022-03-01'), isOwner: false, isModerator: true, canCreateEvents: true, isPinned: true },
    ],
  },
  {
    id: '2',
    name: 'Online Strategists',
    type: 'Online',
    description: 'An online group focused on strategy games',
    image: 'https://picsum.photos/200?random=2',
    members: [
      { userId: '1', joinDate: new Date('2022-02-01'), isOwner: false, isModerator: true, canCreateEvents: true, isPinned: true },
      { userId: '3', joinDate: new Date('2022-02-15'), isOwner: true, isModerator: true, canCreateEvents: true, isPinned: true },
      { userId: '5', joinDate: new Date('2022-03-01'), isOwner: false, isModerator: false, canCreateEvents: false, isPinned: true },
    ],
  },
  {
    id: '3',
    name: 'Casual Gamers Unite',
    type: 'Hybrid',
    description: 'A group for casual gamers, with both online and offline events',
    image: 'https://picsum.photos/200?random=3',
    members: [
      { userId: '2', joinDate: new Date('2022-03-01'), isOwner: true, isModerator: true, canCreateEvents: true, isPinned: true },
      { userId: '4', joinDate: new Date('2022-03-15'), isOwner: false, isModerator: false, canCreateEvents: true, isPinned: false },
      { userId: '5', joinDate: new Date('2022-04-01'), isOwner: false, isModerator: true, canCreateEvents: true, isPinned: true },
    ],
  },
  {
    id: '4',
    name: 'RPG Enthusiasts',
    type: 'Online',
    description: 'A group dedicated to role-playing games',
    image: 'https://picsum.photos/200?random=4',
    members: [
      { userId: '2', joinDate: new Date('2022-04-01'), isOwner: false, isModerator: false, canCreateEvents: true, isPinned: false },
      { userId: '3', joinDate: new Date('2022-04-15'), isOwner: true, isModerator: true, canCreateEvents: true, isPinned: true },
      { userId: '5', joinDate: new Date('2022-05-01'), isOwner: false, isModerator: true, canCreateEvents: true, isPinned: true },
    ],
  },
  {
    id: '5',
    name: 'Miniature Wargamers',
    type: 'Local',
    description: 'A group for fans of miniature wargaming',
    image: 'https://picsum.photos/200?random=5',
    members: [
      { userId: '1', joinDate: new Date('2022-05-01'), isOwner: false, isModerator: false, canCreateEvents: false, isPinned: false },
      { userId: '4', joinDate: new Date('2022-05-15'), isOwner: true, isModerator: true, canCreateEvents: true, isPinned: true },
      { userId: '5', joinDate: new Date('2022-06-01'), isOwner: false, isModerator: true, canCreateEvents: true, isPinned: false },
    ],
  },
  {
    id: '6',
    name: 'Euro Game Lovers',
    type: 'Hybrid',
    description: 'A group dedicated to European-style board games',
    image: 'https://picsum.photos/200?random=6',
    members: [
      { userId: '2', joinDate: new Date('2022-06-01'), isOwner: true, isModerator: true, canCreateEvents: true, isPinned: true },
      { userId: '3', joinDate: new Date('2022-06-15'), isOwner: false, isModerator: true, canCreateEvents: true, isPinned: false },
      { userId: '5', joinDate: new Date('2022-07-01'), isOwner: false, isModerator: false, canCreateEvents: true, isPinned: true },
    ],
  },
  {
    id: '7',
    name: 'Party Game Enthusiasts',
    type: 'Local',
    description: 'A group for fans of party and social games',
    image: 'https://picsum.photos/200?random=7',
    members: [
      { userId: '1', joinDate: new Date('2022-07-01'), isOwner: false, isModerator: true, canCreateEvents: true, isPinned: true },
      { userId: '4', joinDate: new Date('2022-07-15'), isOwner: true, isModerator: true, canCreateEvents: true, isPinned: true },
      { userId: '5', joinDate: new Date('2022-08-01'), isOwner: false, isModerator: false, canCreateEvents: true, isPinned: false },
    ],
  },
];

