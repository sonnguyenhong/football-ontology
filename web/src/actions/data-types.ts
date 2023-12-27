export type SearchResultItem = {
  resource: string;
  name: string;
  description: string | null;
  img: string | null;
  hl: string;
};

export type Player = {
  id: string;
  name: string;
  img: string | null;
  des: string | null;
  position: string | null;
  goals: string | null;
  birthDate: string | null;
  birthPlace: string | null;
  height: string | null;
  area: string | null;
  areaName: string | null;
  country: string | null;
  countryName: string | null;
  nationalTeam: string | null;
  nationalTeamName: string | null;
  joinedYear: string | null;
  leftYear: string | null;
  titles: Array<{ title: string; titleName: string }>;
  seasons: Array<{ ls: string; lsName: string; year: string | null }>;
};

export type Country = {
  id: string;
  name: string;
  img: string | null;
  des: string | null;
  area: string | null;
  areaName: string | null;
  team: string | null;
  teamName: string | null;
};

export type Continent = {
  id: string;
  name: string;
  img: string | null;
  des: string | null;
  area: string | null;
  population: string | null;
  league: string | null;
  leagueName: string | null;
};

export type Team = {
  id: string;
  name: string;
  img: string | null;
  des: string | null;
  rank: string | null;
  fifaCode: string | null;
  area: string | null;
  areaName: string | null;
  country: string | null;
  countryName: string | null;
  titles: Array<{ title: string; titleName: string }>;
  seasons: Array<{ ls: string; lsName: string; year: string | null }>;
};

export type League = {
  id: string;
  name: string;
  img: string | null;
  des: string | null;
  area: string | null;
  areaName: string | null;
};

export type LeagueSeason = {
  id: string;
  name: string;
  img: string | null;
  des: string | null;
  league: string | null;
  leagueName: string | null;
  champion: string | null;
  championName: string | null;
};
