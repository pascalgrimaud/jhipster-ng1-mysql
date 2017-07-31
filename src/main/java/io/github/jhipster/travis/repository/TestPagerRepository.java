package io.github.jhipster.travis.repository;

import io.github.jhipster.travis.domain.TestPager;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the TestPager entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestPagerRepository extends JpaRepository<TestPager,Long> {

    @Query("select test_pager from TestPager test_pager where test_pager.userOneToMany.login = ?#{principal.username}")
    List<TestPager> findByUserOneToManyIsCurrentUser();
    
    @Query("select distinct test_pager from TestPager test_pager left join fetch test_pager.userManyToManies")
    List<TestPager> findAllWithEagerRelationships();

    @Query("select test_pager from TestPager test_pager left join fetch test_pager.userManyToManies where test_pager.id =:id")
    TestPager findOneWithEagerRelationships(@Param("id") Long id);
    
}
