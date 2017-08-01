package io.github.jhipster.travis.repository;

import io.github.jhipster.travis.domain.TestServiceClass;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the TestServiceClass entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestServiceClassRepository extends JpaRepository<TestServiceClass,Long> {

    @Query("select test_service_class from TestServiceClass test_service_class where test_service_class.userOneToMany.login = ?#{principal.username}")
    List<TestServiceClass> findByUserOneToManyIsCurrentUser();
    @Query("select distinct test_service_class from TestServiceClass test_service_class left join fetch test_service_class.userManyToManies")
    List<TestServiceClass> findAllWithEagerRelationships();

    @Query("select test_service_class from TestServiceClass test_service_class left join fetch test_service_class.userManyToManies where test_service_class.id =:id")
    TestServiceClass findOneWithEagerRelationships(@Param("id") Long id);

}
