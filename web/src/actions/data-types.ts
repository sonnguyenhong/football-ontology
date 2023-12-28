export type SearchResultItem = {
  resource: string;
  name: string;
  description: string | null;
  image: string | null;
  hl: string;
};

export type Player = {
  id: string;
  name: string;
  image: string | null;
  des: string | null;
  position: string | null;
  positionLabel : string | null;
  goals: string | null;
  footballTeam: string | null;
  footballTeamName: string | null;
  titles: Array<{ title: string; titleName: string }>;
  seasons: Array<{ ls: string; lsName: string; year: string | null }>;
  
};

export type Country = {
  id: string;
  name: string;
  image: string | null;
  des: string | null;
  area: string | null;
  areaName: string | null;
  team: string | null;
  teamName: string | null;
};

export type Continent = {
  id: string;
  name: string;
  image: string | null;
  des: string | null;
  area: string | null;
  population: string | null;
  league: string | null;
  leagueName: string | null;
};

export type Team = {
  id: string;
  name: string;
  image: string | null;
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
  image: string | null;
  des: string | null;
  area: string | null;
  areaName: string | null;
};

export type LeagueSeason = {
  id: string;
  name: string;
  image: string | null;
  des: string | null;
  league: string | null;
  leagueName: string | null;
  champion: string | null;
  championName: string | null;
};

export type Coach = {
  id: string;
  name: string;
  image: string | null;
  des: string | null;
  coachNationality: string | null;
  age: string | null;
  coachAchievesName: string | null;
};
export type Stadium = {
  id: string;
  name: string;
  image: string | null;
  des: string | null;
  stadiumCapacity: string | null;
  age: string | null;
};
export type Award = {
  id: string;
  name: string;
  image: string | null;
  des: string | null;
  awardOfLeague: string | null;
};