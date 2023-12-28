export const searchQuery = `
PREFIX text: <http://jena.apache.org/text#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#>
PREFIX fbr: <http://localhost:3000/resource/>

SELECT ?resource ?name ?img ?description ?hl
WHERE {
  ?resource fbo:name ?name .
  OPTIONAL  {?resource fbo:img ?img} .
  OPTIONAL {?resource fbo:description ?description} .
  (?resource ?score ?hl)  text:query ("{search}" "highlight:s:<b> | e:</b>") ;
}
ORDER BY DESC(?score)
LIMIT 10
`;

export const resourceTypeQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#>
PREFIX fbr: <http://localhost:3000/resource/>

SELECT ?type
WHERE {
	fbr:{resource} rdf:type ?type
}
`;

export const playerInfoQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#>
PREFIX fbr: <http://localhost:3000/resource/>

SELECT ?name ?img ?des ?position ?goals ?footballTeam ?footballTeamName
WHERE {
  fbr:{player} a fbo:Player .
	fbr:{player} fbo:name ?name .
	OPTIONAL {fbr:{player} fbo:image ?img} .
	OPTIONAL {fbr:{player} fbo:description ?des} .
  OPTIONAL {fbr:{player} fbo:goals ?goals} .
  OPTIONAL {fbr:{player} fbo:hasPosition ?position} .
  OPTIONAL {fbr:{player} fbo:playsFor ?footballTeam . ?footballTeam fbo:name ?footballTeamName } .
}
LIMIT 1
`;

export const playerTitleQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#>
PREFIX fbr: <http://localhost:3000/resource/>

SELECT ?title ?titleName
WHERE {
	fbr:{player} a fbo:Player .
	fbr:{player} fbo:hasTitle ?title .
	?title fbo:name ?titleName
}
`;

export const playerLeagueSeasonQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#>
PREFIX fbr: <http://localhost:3000/resource/>

SELECT ?ls ?lsName ?year
WHERE {
	fbr:{player} a fbo:Player .
	fbr:{player} fbo:joinedLeagueSeason ?ls .
	?ls fbo:name ?lsName .
  OPTIONAL {?ls fbo:heldInYear ?year}
}
ORDER BY ASC(?year)
`;

export const footballTeamInfoQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#>
PREFIX fbr: <http://localhost:3000/resource/>

SELECT ?name ?img ?des ?foundedYear ?coach ?coachName ?homeField ?homeFieldName{
  fbr:{footballTeam} a fbo:FootballTeam ;
    fbo:name ?name .
  OPTIONAL { fbr:{footballTeam} fbo:image ?img } .
  OPTIONAL { fbr:{footballTeam} fbo:description ?des } .
  OPTIONAL { fbr:{footballTeam} fbo:foundedYear ?foundedYear } .
  OPTIONAL { fbr:{footballTeam} fbo:coachedBy ?coach . ?coach fbo:name ?coachName } .
  OPTIONAL { fbr:{footballTeam} fbo:hasHomeField ?homeField . ?homeField fbo:name ?homeFieldName } .
}
`;

export const footballTeamLeagueSeasonQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#>
PREFIX fbr: <http://localhost:3000/resource/>

SELECT ?ls ?lsName
WHERE {
	fbr:{footballTeam} a fbo:FootballTeam .
	fbr:{footballTeam} fbo:participatesIn ?ls .
	?ls fbo:name ?lsName
}
`;

export const footballTeamMatchSeasonQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#>
PREFIX fbr: <http://localhost:3000/resource/>

SELECT ?ms ?msName
WHERE {
	fbr:{footballTeam} a fbo:FootballTeam .
	fbr:{footballTeam} fbo:joins ?ms .
	?ms fbo:name ?msName
}
`;

export const leagueInfoQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#>
PREFIX fbr: <http://localhost:3000/resource/>

SELECT ?name ?img ?des ?numTeams {
	fbr:{league} rdf:type fbo:FootballLeague .
	fbr:{league} fbo:name ?name .
	OPTIONAL  {fbr:{league} fbo:image ?img} .
	OPTIONAL {fbr:{league} fbo:description ?des} .
	OPTIONAL {fbr:{league} fbo:numTeams ?numTeams} .
}
LIMIT 1
`;

export const leagueMatchInfoQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#>
PREFIX fbr: <http://localhost:3000/resource/>

SELECT ?match ?matchName {
	fbr:{league} fbo:includes ?match .
	?match fbo:name ?matchName .
}
`;

export const leagueTeamInfoQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#>
PREFIX fbr: <http://localhost:3000/resource/>

SELECT ?fbTeam ?fbTeamName {
	?fbTeam rdf:type fbo:FootballTeam ;
    fbo:participatesIn fbr:{league} .
		?fbTeam fbo:name ?fbTeamName .
}
`;

export const matchInfoQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#>
PREFIX fbr: <http://localhost:3000/resource/>

SELECT ?name ?img ?des ?day ?homeTeam ?homeTeamName ?awayTeam ?awayTeamName  ?result{
	fbr:{match} rdf:type fbo:FootballMatch .
	fbr:{match} fbo:name ?name .
  fbr:{match} fbo:homeTeam ?homeTeam . ?homeTeam fbo:name ?homeTeamName .
  fbr:{match} fbo:awayTeam ?awayTeam . ?awayTeam fbo:name ?awayTeamName .
  fbr:{match} fbo:result ?result .
  OPTIONAL  {fbr:{match} fbo:matchDay ?day} .
	OPTIONAL  {fbr:{match} fbo:image ?img} .
	OPTIONAL {fbr:{match} fbo:description ?des} .
}
LIMIT 1
`;
