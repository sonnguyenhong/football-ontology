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
	OPTIONAL  {fbr:{player} fbo:image ?image} .
	OPTIONAL {fbr:{player} fbo:description ?des} .
  OPTIONAL {fbr:{player} fbo:goals ?goals} .
  OPTIONAL {fbr:{player} fbo:hasPosition ?pos . ?pos rdfs:label ?position } .
  OPTIONAL {fbr:{player} fbo:height ?height} .
  OPTIONAL {fbr:{player} fbo:playsFor ?footballTeam . ?footballTeam fbo:name ?footballTeamName}
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

export const countryInfoQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#> 
PREFIX fbr: <http://localhost:3000/resource/> 

SELECT ?name ?image ?des ?area ?areaName ?team ?teamName {
	fbr:{country} a fbo:Country .
  fbr:{country} fbo:name ?name .
	OPTIONAL {fbr:{country} fbo:image ?image} .
	OPTIONAL {fbr:{country} fbo:description ?des} .
  OPTIONAL {fbr:{country} fbo:belongToArea ?area . ?area fbo:name ?areaName} .
  OPTIONAL {fbr:{country} fbo:hasTeam ?team . ?team fbo:name ?teamName }
}
LIMIT 1
`;

export const continentInfoQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#> 
PREFIX fbr: <http://localhost:3000/resource/> 

SELECT ?name ?image ?des ?area ?population ?league ?leagueName {
	fbr:{continent} a fbo:Area .
  fbr:{continent} fbo:name ?name .
	OPTIONAL {fbr:{continent} fbo:image ?image} .
	OPTIONAL {fbr:{continent} fbo:description ?des} .
  OPTIONAL {fbr:{continent} fbo:area ?area} .
  OPTIONAL {fbr:{continent} fbo:population ?population} .
  OPTIONAL {fbr:{continent} fbo:hasLeague ?league . ?league fbo:name ?leagueName }
}
LIMIT 1
`;

export const nationalTeamInfoQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#> 
PREFIX fbr: <http://localhost:3000/resource/> 

SELECT ?name ?image ?des ?rank ?fifaCode ?area ?areaName ?country ?countryName {
	fbr:{nationalTeam} a fbo:NationalTeam .
  fbr:{nationalTeam} fbo:name ?name .
	OPTIONAL  {fbr:{nationalTeam} fbo:image ?image} .
	OPTIONAL {fbr:{nationalTeam} fbo:description ?des} .
	OPTIONAL {fbr:{nationalTeam} fbo:rank ?rank} .
	OPTIONAL {fbr:{nationalTeam} fbo:fifaCode ?fifaCode} .
  OPTIONAL {fbr:{nationalTeam} fbo:belongToArea ?area . ?area fbo:name ?areaName} .
  OPTIONAL {?country fbo:hasTeam fbr:{nationalTeam} . ?country fbo:name ?countryName} .
}
LIMIT 1
`;

export const nationalTeamLeagueSeasonQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#> 
PREFIX fbr: <http://localhost:3000/resource/> 

SELECT ?ls ?lsName 
WHERE {
	fbr:{nationalTeam} a fbo:NationalTeam .
	fbr:{nationalTeam} fbo:joinedLeagueSeason ?ls .
	?ls fbo:name ?lsName
}
`;

export const nationalTeamTitleQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#> 
PREFIX fbr: <http://localhost:3000/resource/> 

SELECT ?title ?titleName 
WHERE {
	fbr:{nationalTeam} a fbo:NationalTeam .
	fbr:{nationalTeam} fbo:isChampionOf ?title .
	?title fbo:name ?titleName
}
`;

export const leagueInfoQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#> 
PREFIX fbr: <http://localhost:3000/resource/> 

SELECT ?name ?image ?des ?area ?areaName {
	fbr:{league} a fbo:League .
	fbr:{league} fbo:name ?name .
	OPTIONAL  {fbr:{league} fbo:image ?image} .
	OPTIONAL {fbr:{league} fbo:description ?des} .
	OPTIONAL {fbr:{league} fbo:belongToArea ?area . ?area fbo:name ?areaName} .
}
LIMIT 1
`;

export const leagueSeasonInfoQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#> 
PREFIX fbr: <http://localhost:3000/resource/> 

SELECT ?name ?image ?des ?league ?leagueName ?champion ?championName {
	fbr:{leagueSeason} a fbo:LeagueSeason .
	fbr:{leagueSeason} fbo:name ?name .
	fbr:{leagueSeason} fbo:aSeasonOf ?league . ?league fbo:name ?leagueName .
	OPTIONAL  {fbr:{leagueSeason} fbo:image ?image} .
	OPTIONAL {fbr:{leagueSeason} fbo:description ?des} .
  OPTIONAL {fbr:{leagueSeason} fbo:heldInYear ?year} .
	OPTIONAL {fbr:{leagueSeason} fbo:hasChampion ?champion . ?champion fbo:name ?championName} .
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