package io.github.jhipster.travis.repository;

import io.github.jhipster.travis.domain.TestServiceImpl;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the TestServiceImpl entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestServiceImplRepository extends JpaRepository<TestServiceImpl,Long> {

    @Query("select test_service_impl from TestServiceImpl test_service_impl where test_service_impl.userOneToMany.login = ?#{principal.username}")
    List<TestServiceImpl> findByUserOneToManyIsCurrentUser();
    @Query("select distinct test_service_impl from TestServiceImpl test_service_impl left join fetch test_service_impl.userManyToManies")
    List<TestServiceImpl> findAllWithEagerRelationships();

    @Query("select test_service_impl from TestServiceImpl test_service_impl left join fetch test_service_impl.userManyToManies where test_service_impl.id =:id")
    TestServiceImpl findOneWithEagerRelationships(@Param("id") Long id);

}
