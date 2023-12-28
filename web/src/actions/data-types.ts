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
  positionName: string | null;
  goals: string | null;
  footballTeam: string | null;
  footballTeamName: string | null;
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
  foundedYear: string | null;
  coach: string | null;
  coachName: string | null;
  homeField: string | null;
  homeFieldName: string | null;
  League: Array<{ ls: string; lsName: string }>;
  Match: Array<{ ms: string; msName: string }>;
};

export type League = {
  id: string;
  name: string;
  img: string | null;
  des: string | null;
  numTeams: string | null;
  Teams: Array<{ fbTeam: string; fbTeamName: string }>;
  Match: Array<{ match: string; matchName: string }>;
};

export type Match = {
  id: string;
  name: string;
  img: string | null;
  des: string | null;
  matchDay: string | null;
  homeTeam: string;
  homeTeamName: string;
  awayTeam: string;
  awayTeamName: string;
  result: string | null;
};
