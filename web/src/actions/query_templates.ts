export const searchQuery = `
PREFIX text: <http://jena.apache.org/text#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#> 
PREFIX fbr: <http://localhost:3000/resource/> 

SELECT ?resource ?name ?image ?description ?hl
WHERE {
  ?resource fbo:name ?name .
  OPTIONAL  {?resource fbo:image ?image} .
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
	fbr:{resource} a ?type
}
`;

export const playerInfoQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#> 
PREFIX fbr: <http://localhost:3000/resource/> 

SELECT ?name ?image ?des ?position ?goals ?country ?countryName ?footballTeam ?footballTeamName 
WHERE {
  fbr:{player} a fbo:Player .
	fbr:{player} fbo:name ?name .
	OPTIONAL {fbr:{player} fbo:image ?image} .
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

SELECT ?name ?image ?des ?foundedYear ?coach ?coachName ?homeField ?homeFieldName{
  fbr:{footballTeam} a fbo:FootballTeam ;
    fbo:name ?name .
  OPTIONAL { fbr:{footballTeam} fbo:image ?image } .
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

SELECT ?name ?image ?des ?numTeams {
	fbr:{league} rdf:type fbo:FootballLeague .
	fbr:{league} fbo:name ?name .
	OPTIONAL  {fbr:{league} fbo:image ?image} .
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

SELECT ?name ?image ?des ?day ?homeTeam ?homeTeamName ?awayTeam ?awayTeamName ?stadium ?stadiumName ?result{
	fbr:{match} rdf:type fbo:FootballMatch .
	fbr:{match} fbo:name ?name .
  fbr:{match} fbo:homeTeam ?homeTeam . ?homeTeam fbo:name ?homeTeamName .
  fbr:{match} fbo:awayTeam ?awayTeam . ?awayTeam fbo:name ?awayTeamName .
  fbr:{match} fbo:heldsIn ?stadium . ?stadium  fbo:name ?stadiumName .
  fbr:{match} fbo:result ?result .
  OPTIONAL  {fbr:{match} fbo:matchDay ?day} .
	OPTIONAL  {fbr:{match} fbo:image ?image} .
	OPTIONAL {fbr:{match} fbo:description ?des} .
}
LIMIT 1
`;

export const coachInfoQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#> 
PREFIX fbr: <http://localhost:3000/resource/> 

SELECT ?name ?image ?des ?coachNationality ?age ?coachAchieves ?coachAchievesName
WHERE {
  fbr:{coach} a fbo:Coach . 
  fbr:{coach} fbo:name ?name .
  OPTIONAL {fbr:{coach} fbo:image ?image} .
  OPTIONAL {fbr:{coach} fbo:description ?des} .
  OPTIONAL {fbr:{coach} fbo:coachNationality ?coachNationality} .
  OPTIONAL {fbr:{coach} fbo:coachAge ?age} .
  OPTIONAL {fbr:{coach} fbo:coachAchieves ?coachAchieves . ?coachAchieves fbo:name ?coachAchievesName}
}
LIMIT 1
`;

export const stadiumQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#> 
PREFIX fbr: <http://localhost:3000/resource/> 

SELECT ?name ?image ?des ?stadiumCapacity ?stadiumAge 
WHERE {
  fbr:{stadium} a fbo:Stadium . 
  fbr:{stadium} fbo:name ?name .
  OPTIONAL {fbr:{stadium} fbo:image ?image} .
  OPTIONAL {fbr:{stadium} fbo:description ?des} .
  OPTIONAL {fbr:{stadium} fbo:stadiumCapacity ?stadiumCapacity} .
  OPTIONAL {fbr:{stadium} fbo:stadiumAge ?stadiumAge} .
  
}
LIMIT 1
`;

export const awardQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#> 
PREFIX fbr: <http://localhost:3000/resource/> 

SELECT ?name ?image ?des ?coachNationality ?age ?awardOfLeague ?awardOfLeagueName
WHERE {
  fbr:{award} a fbo:Award . 
  fbr:{award} fbo:name ?name .
  OPTIONAL {fbr:{award} fbo:image ?image} .
  OPTIONAL {fbr:{award} fbo:description ?des} .
  OPTIONAL {fbr:{award} fbo:awardOfLeague ?awardOfLeague . ?awardOfLeague fbo:name ?awardOfLeagueName}
}
LIMIT 1
`;