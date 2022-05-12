export interface User {
  login: string;
  password: any;
  userName?: string;
  token?: Date;
  lifetime?: number | undefined;
}

export interface HeroItem {
  image:  Image;
  id: number;
  name: string;
  powerstats: PowerStats;
  isSelected?: boolean;
  occupation: string;
  work: Work;
}

export interface Response {
  results: HeroItem[];
}

export interface PowerUpsItem {
  title: string;
  benefit: string;
  value: string;
  image: string;
  usesLeft: number;
  hasPowerUps?: boolean;
}

export interface PowerStats {
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string;
}

export interface Biography {
  "full-name": string;
  "alter-egos": string;
  aliases: string[];
  "place-of-birth": string;
  "first-appearance": string;
  publisher: string;
  alignment: string;
}

export interface Appearance {
  gender: string;
  race: string;
  height: string[];
  weight: string[];
  "eye-color": string;
  "hair-color": string;
}

export interface Work {
  occupation: string;
  base: string;
}

export interface Connections {
  "group-affiliation": string;
  "relatives": string;
}

export interface Image {
  url: string;
}

export interface HeroItemFullInfo {
  image: Image;
  id: number;
  name: string;
  powerstats: PowerStats;
  biography: Biography;
  appearance: Appearance;
  work: Work;
  connections: Connections;
}
