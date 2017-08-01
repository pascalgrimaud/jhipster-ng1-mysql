package io.github.jhipster.travis.repository;

import io.github.jhipster.travis.domain.TestManyToMany;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the TestManyToMany entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestManyToManyRepository extends JpaRepository<TestManyToMany,Long> {
    @Query("select distinct test_many_to_many from TestManyToMany test_many_to_many left join fetch test_many_to_many.testEntities left join fetch test_many_to_many.testMapstructs left join fetch test_many_to_many.testServiceClasses left join fetch test_many_to_many.testServiceImpls left join fetch test_many_to_many.testInfiniteScrolls left join fetch test_many_to_many.testPagers left join fetch test_many_to_many.testPaginations left join fetch test_many_to_many.testCustomTableNames")
    List<TestManyToMany> findAllWithEagerRelationships();

    @Query("select test_many_to_many from TestManyToMany test_many_to_many left join fetch test_many_to_many.testEntities left join fetch test_many_to_many.testMapstructs left join fetch test_many_to_many.testServiceClasses left join fetch test_many_to_many.testServiceImpls left join fetch test_many_to_many.testInfiniteScrolls left join fetch test_many_to_many.testPagers left join fetch test_many_to_many.testPaginations left join fetch test_many_to_many.testCustomTableNames where test_many_to_many.id =:id")
    TestManyToMany findOneWithEagerRelationships(@Param("id") Long id);

}
