export interface User {
  login: string;
  password: any;
  userName?: string;
  token?: Date;
  lifetime?: number | undefined;
}

export interface HeroItem {
  image:  Record<string, string>;
  id: number;
  name: string;
  powerstats: Record<string, string>;
  isSelected?: boolean;
  occupation: string;
  work: Record<string, string>
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

export interface HeroItemFullInfo {
  image:  {
    url: string;
  };
  id: number;
  name: string;
  powerstats: {
    intelligence: string;
    strength: string;
    speed: string;
    durability: string;
    power: string;
    combat: string;
  }
  biography: {
    "full-name": string;
    "alter-egos": string;
    aliases: string[];
    "place-of-birth": string;
    "first-appearance": string;
    publisher: string;
    alignment: string;
  };
  appearance: {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    "eye-color": string;
    "hair-color": string;
  };
  work: {
    occupation: string;
    base: string;
  };
  connections: {
    "group-affiliation": string;
    "relatives": string;
  }
}
