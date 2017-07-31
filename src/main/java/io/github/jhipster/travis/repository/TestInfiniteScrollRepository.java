package io.github.jhipster.travis.repository;

import io.github.jhipster.travis.domain.TestInfiniteScroll;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the TestInfiniteScroll entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestInfiniteScrollRepository extends JpaRepository<TestInfiniteScroll,Long> {

    @Query("select test_infinite_scroll from TestInfiniteScroll test_infinite_scroll where test_infinite_scroll.userOneToMany.login = ?#{principal.username}")
    List<TestInfiniteScroll> findByUserOneToManyIsCurrentUser();
    
    @Query("select distinct test_infinite_scroll from TestInfiniteScroll test_infinite_scroll left join fetch test_infinite_scroll.userManyToManies")
    List<TestInfiniteScroll> findAllWithEagerRelationships();

    @Query("select test_infinite_scroll from TestInfiniteScroll test_infinite_scroll left join fetch test_infinite_scroll.userManyToManies where test_infinite_scroll.id =:id")
    TestInfiniteScroll findOneWithEagerRelationships(@Param("id") Long id);
    
}
