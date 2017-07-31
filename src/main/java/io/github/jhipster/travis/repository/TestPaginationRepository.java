package io.github.jhipster.travis.repository;

import io.github.jhipster.travis.domain.TestPagination;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the TestPagination entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestPaginationRepository extends JpaRepository<TestPagination,Long> {

    @Query("select test_pagination from TestPagination test_pagination where test_pagination.userOneToMany.login = ?#{principal.username}")
    List<TestPagination> findByUserOneToManyIsCurrentUser();
    
    @Query("select distinct test_pagination from TestPagination test_pagination left join fetch test_pagination.userManyToManies")
    List<TestPagination> findAllWithEagerRelationships();

    @Query("select test_pagination from TestPagination test_pagination left join fetch test_pagination.userManyToManies where test_pagination.id =:id")
    TestPagination findOneWithEagerRelationships(@Param("id") Long id);
    
}
