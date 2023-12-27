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
	fbr:{resource} a ?type
}
`;

export const playerInfoQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX fbo: <http://localhost:3000/ontology#> 
PREFIX fbr: <http://localhost:3000/resource/> 

SELECT ?name ?img ?des ?position ?goals ?birthDate ?birthPlace ?height ?area ?areaName ?country ?countryName ?nationalTeam ?nationalTeamName ?joinedYear ?leftYear
WHERE {
  fbr:{player} a fbo:Player . 
	fbr:{player} fbo:name ?name .
	OPTIONAL  {fbr:{player} fbo:img ?img} .
	OPTIONAL {fbr:{player} fbo:description ?des} .
  OPTIONAL {fbr:{player} fbo:goals ?goals} .
  OPTIONAL {fbr:{player} fbo:birthDate ?birthDate} .
  OPTIONAL {fbr:{player} fbo:birthPlace ?birthPlace} .
  OPTIONAL {fbr:{player} fbo:hasPosition ?pos . ?pos rdfs:label ?position } .
  OPTIONAL {fbr:{player} fbo:height ?height} .
  OPTIONAL {fbr:{player} fbo:belongToArea ?area . ?area fbo:name ?areaName} .
  OPTIONAL {fbr:{player} fbo:belongToCountry ?country . ?country fbo:name ?countryName} .
  OPTIONAL {?country fbo:hasTeam ?nationalTeam . ?nationalTeam fbo:name ?nationalTeamName}
  OPTIONAL {fbr:{player} fbo:joinedYear ?joinedYear} .
  OPTIONAL {fbr:{player} fbo:leftYear ?leftYear} .
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

SELECT ?name ?img ?des ?area ?areaName ?team ?teamName {
	fbr:{country} a fbo:Country .
  fbr:{country} fbo:name ?name .
	OPTIONAL {fbr:{country} fbo:img ?img} .
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

SELECT ?name ?img ?des ?area ?population ?league ?leagueName {
	fbr:{continent} a fbo:Area .
  fbr:{continent} fbo:name ?name .
	OPTIONAL {fbr:{continent} fbo:img ?img} .
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

SELECT ?name ?img ?des ?rank ?fifaCode ?area ?areaName ?country ?countryName {
	fbr:{nationalTeam} a fbo:NationalTeam .
  fbr:{nationalTeam} fbo:name ?name .
	OPTIONAL  {fbr:{nationalTeam} fbo:img ?img} .
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

SELECT ?name ?img ?des ?area ?areaName {
	fbr:{league} a fbo:League .
	fbr:{league} fbo:name ?name .
	OPTIONAL  {fbr:{league} fbo:img ?img} .
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

SELECT ?name ?img ?des ?league ?leagueName ?champion ?championName {
	fbr:{leagueSeason} a fbo:LeagueSeason .
	fbr:{leagueSeason} fbo:name ?name .
	fbr:{leagueSeason} fbo:aSeasonOf ?league . ?league fbo:name ?leagueName .
	OPTIONAL  {fbr:{leagueSeason} fbo:img ?img} .
	OPTIONAL {fbr:{leagueSeason} fbo:description ?des} .
  OPTIONAL {fbr:{leagueSeason} fbo:heldInYear ?year} .
	OPTIONAL {fbr:{leagueSeason} fbo:hasChampion ?champion . ?champion fbo:name ?championName} .
}
LIMIT 1
`;
