package io.github.jhipster.travis.repository;

import io.github.jhipster.travis.domain.TestMapstruct;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the TestMapstruct entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestMapstructRepository extends JpaRepository<TestMapstruct,Long> {

    @Query("select test_mapstruct from TestMapstruct test_mapstruct where test_mapstruct.userOneToMany.login = ?#{principal.username}")
    List<TestMapstruct> findByUserOneToManyIsCurrentUser();
    @Query("select distinct test_mapstruct from TestMapstruct test_mapstruct left join fetch test_mapstruct.userManyToManies")
    List<TestMapstruct> findAllWithEagerRelationships();

    @Query("select test_mapstruct from TestMapstruct test_mapstruct left join fetch test_mapstruct.userManyToManies where test_mapstruct.id =:id")
    TestMapstruct findOneWithEagerRelationships(@Param("id") Long id);

}
