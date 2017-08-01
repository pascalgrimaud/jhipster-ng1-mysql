package io.github.jhipster.travis.repository;

import io.github.jhipster.travis.domain.TestEntity;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the TestEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestEntityRepository extends JpaRepository<TestEntity,Long> {

    @Query("select test_entity from TestEntity test_entity where test_entity.userOneToMany.login = ?#{principal.username}")
    List<TestEntity> findByUserOneToManyIsCurrentUser();
    @Query("select distinct test_entity from TestEntity test_entity left join fetch test_entity.userManyToManies")
    List<TestEntity> findAllWithEagerRelationships();

    @Query("select test_entity from TestEntity test_entity left join fetch test_entity.userManyToManies where test_entity.id =:id")
    TestEntity findOneWithEagerRelationships(@Param("id") Long id);

}
