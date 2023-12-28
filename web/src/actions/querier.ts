import { Continent, Country, League, LeagueSeason, Player, SearchResultItem, Team } from "./data-types";
import {
  continentInfoQuery,
  countryInfoQuery,
  footballTeamInfoQuery,
  leagueInfoQuery,
  leagueMatchInfoQuery,
  footballTeamLeagueSeasonQuery,
  footballTeamMatchSeasonQuery,
  playerInfoQuery,
  playerLeagueSeasonQuery,
  playerTitleQuery,
  resourceTypeQuery,
  searchQuery,
} from "./query_templates";

export type QuerierResponse = {
  head: {
    vars: string[];
  };
  results: {
    bindings: Array<{
      [k: string]: {
        type: string;
        value: string;
        datatype?: string;
      };
    }>;
  };
};

export class Querier {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  private async query(q: string): Promise<QuerierResponse> {
    // const fd = new FormData();
    // fd.append("query", q);
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        Accept: "application/sparql-results+json",
        "Content-Type": "application/sparql-query",
      },
      body: q,
    });

    let data;
    try {
      data = await response.json();
    } catch (error) {
      // pass
    }

    // response.ok is true when res.status is 2xx
    // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
    if (response.ok) {
      return data;
    }

    throw new FetchError({
      message: response.statusText,
      response,
      data,
    });
  }

  public async search(search: string): Promise<SearchResultItem[]> {
    const q = searchQuery.replaceAll(/{search}/g, search);
    const data = await this.query(q);
    return data.results.bindings.map((item) => ({
      name: item.name.value,
      resource: item.resource.value,
      description: item.description?.value ?? null,
      img: item.img?.value ?? null,
      hl: item.hl.value,
    }));
  }

  public async resourceType(resource: string): Promise<string[]> {
    const q = resourceTypeQuery.replaceAll(/{resource}/g, resource);
    const data = await this.query(q);
    return data.results.bindings.map((item) => item.type.value);
  }

  public async player(player: string): Promise<Player | null> {
    const q1 = playerInfoQuery.replaceAll(/{player}/g, player);
    const q2 = playerTitleQuery.replaceAll(/{player}/g, player);
    const q3 = playerLeagueSeasonQuery.replaceAll(/{player}/g, player);
    const [d1, d2, d3] = await Promise.all([this.query(q1), this.query(q2), this.query(q3)]);
    if (d1.results.bindings.length === 0) return null;
    const info = d1.results.bindings[0];
    console.log(d2);
    return {
      id: player,
      des: info.des?.value ?? null,
      goals: info.goals?.value ?? null,
      img: info.img?.value ?? null,
      name: info.name.value,
      footballTeam: info.footballTeam?.value ?? null,
      footballTeamName: info.footballTeamName?.value ?? null,
      position: info.position?.value ?? null,
      titles: d2.results.bindings.map((item) => ({ title: item.title.value, titleName: item.titleName.value })),
      seasons: d3.results.bindings.map((item) => ({
        ls: item.ls.value,
        lsName: item.lsName.value,
        year: item.year?.value ?? null,
      })),
    };
  }

  public async country(country: string): Promise<Country | null> {
    const q = countryInfoQuery.replaceAll(/{country}/g, country);
    const data = await this.query(q);
    if (data.results.bindings.length === 0) return null;
    const info = data.results.bindings[0];
    return {
      id: country,
      area: info.area?.value ?? null,
      areaName: info.areaName?.value ?? null,
      des: info.des?.value ?? null,
      img: info.img?.value ?? null,
      name: info.name.value,
      team: info.team?.value ?? null,
      teamName: info.teamName?.value ?? null,
    };
  }

  public async continent(continent: string): Promise<Continent | null> {
    const q = continentInfoQuery.replaceAll(/{continent}/g, continent);
    const data = await this.query(q);
    if (data.results.bindings.length === 0) return null;
    const info = data.results.bindings[0];
    return {
      id: continent,
      des: info.des?.value ?? null,
      img: info.img?.value ?? null,
      name: info.name.value,
      area: info.area?.value ?? null,
      population: info.population?.value ?? null,
      league: info.league?.value ?? null,
      leagueName: info.leagueName?.value ?? null,
    };
  }

  public async team(team: string): Promise<Team | null> {
    const q1 = footballTeamInfoQuery.replaceAll(/{footballTeam}/g, team);
    const q2 = footballTeamLeagueSeasonQuery.replaceAll(/{footballTeam}/g, team);
    const q3 = footballTeamMatchSeasonQuery.replaceAll(/{footballTeam}/g, team);
    const [d1, d2, d3] = await Promise.all([this.query(q1), this.query(q2), this.query(q3)]);
    if (d1.results.bindings.length === 0) return null;
    const info = d1.results.bindings[0];
    console.log(d2);
    return {
      id: team,
      des: info.des?.value ?? null,
      img: info.img?.value ?? null,
      name: info.name.value,
      foundedYear: info.foundedYear?.value ?? null,
      coach: info.coach?.value ?? null,
      coachName: info.coachName?.value ?? null,
      homeField: info.homeField?.value ?? null,
      homeFieldName: info.homeFieldName?.value ?? null,
      League: d2.results.bindings.map((item) => ({ ls: item.ls.value, lsName: item.lsName.value })),
      Match: d3.results.bindings.map((item) => ({ ms: item.ms.value, msName: item.msName.value })),
    };
  }

  public async league(league: string): Promise<League | null> {
    const q1 = leagueInfoQuery.replaceAll(/{league}/g, league);
    const q2 = leagueMatchInfoQuery.replaceAll(/{league}/g, league);
    const [d1, d2] = await Promise.all([this.query(q1), this.query(q2)]);
    if (d1.results.bindings.length === 0) return null;
    const info = d1.results.bindings[0];
    return {
      id: league,
      des: info.des?.value ?? null,
      img: info.img?.value ?? null,
      name: info.name.value,
      numTeams: info.numTeams?.value ?? null,
      Match: d2.results.bindings.map((item) => ({ match: item.match.value, matchName: item.matchName.value })),
    };
  }

  public async leagueSeason(ls: string): Promise<LeagueSeason | null> {
    const q = leagueInfoQuery.replaceAll(/{leagueSeason}/g, ls);
    const data = await this.query(q);
    if (data.results.bindings.length === 0) return null;
    const info = data.results.bindings[0];
    return {
      id: ls,
      des: info.des?.value ?? null,
      img: info.img?.value ?? null,
      name: info.name.value,
      league: info.league?.value ?? null,
      leagueName: info.leagueName?.value ?? null,
      champion: info.champion?.value ?? null,
      championName: info.championName?.value ?? null,
    };
  }
}

export class FetchError extends Error {
  response: Response;
  data: {
    message: string;
  };
  constructor({
    message,
    response,
    data,
  }: {
    message: string;
    response: Response;
    data: {
      message: string;
    };
  }) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = "FetchError";
    this.response = response;
    this.data = data ?? { message: message };
  }
}

export const querier = new Querier("http://localhost:3030/dataset/query");
