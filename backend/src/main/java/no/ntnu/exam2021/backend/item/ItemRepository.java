package no.ntnu.exam2021.backend.item;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "items", path = "items")
public interface ItemRepository extends JpaRepository<Item, Long> {

  // On creating query methods:
  //
  // The Spring Data JPA documentation defines a method naming scheme
  // for creating queries. By following this scheme, Spring Boot will be
  // able to parse the method names and automatically create the corresponding
  // queries on the underlying database.
  //
  // From the Spring Data JPA docs:
  //
  // Parsing query method names is divided into subject and predicate.
  // The first part (find…By, exists…By, searchBy) defines the subject of the query, the
  // second part forms the predicate. The introducing clause (subject) can
  // contain further expressions. Any text between find (or other introducing keywords)
  // and By is considered to be descriptive unless using one of the result-limiting
  // keywords such as a Distinct to set a distinct flag on the query to be
  // created or Top/First to limit query results.

  // Source: https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.query-methods.query-creation
  // Full list of query keywords: https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repository-query-keywords

  List<Item> findByNameContaining(@Param("name")String name);

  // We can also define specialised queries using JPQL syntax.
  // JPQL is the Java Persistence API's specialized SQL-like query language
  // JPQL docs: https://docs.oracle.com/html/E13946_04/ejb3_langref.html
  @Query(
      "SELECT i from Item i " +
          "WHERE lower(i.name) LIKE lower(concat('%',:search,'%')) " +
          "OR " +
          "lower(i.description) LIKE lower(concat('%',:search,'%'))")
  List<Item> searchByNameOrDescription(@Param("search") String search );

}
