## Semantic Web

Building a simple football ontology, dataset and web search.

### References

- [Apache Jena Fuseki](https://jena.apache.org/documentation/fuseki2/index.html)
- [Jena Full Text Search](https://jena.apache.org/documentation/query/text-query.html)

### Get started

1. Build the Text Index

```
  java -cp $FUSEKI_HOME/fuseki-server.jar jena.textindexer --desc=<path_to_fuseki-config.ttl>
```

2. Run fuseki server

```
  $FUSEKI_HOME/fuseki-server --update --config <path_to_fuseki-config.ttl>
```

3. Import data to fuseki server
4. Run web server

```
  cd web/
  yarn install
  yarn dev
```
