export interface User {
  login: string,
  password: any,
  userName?: string,
  token?: Date,
  lifetime?: number | undefined,
}

export interface HeroItem {
  image:  Record<string, string>
  id: number,
  name: string,
  powerstats: Record<string, number>
}
