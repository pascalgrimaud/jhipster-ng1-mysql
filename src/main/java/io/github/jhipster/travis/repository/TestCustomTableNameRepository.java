package io.github.jhipster.travis.repository;

import io.github.jhipster.travis.domain.TestCustomTableName;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the TestCustomTableName entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestCustomTableNameRepository extends JpaRepository<TestCustomTableName,Long> {

    @Query("select test_custom_table_name_entity from TestCustomTableName test_custom_table_name_entity where test_custom_table_name_entity.userOneToMany.login = ?#{principal.username}")
    List<TestCustomTableName> findByUserOneToManyIsCurrentUser();
    
    @Query("select distinct test_custom_table_name_entity from TestCustomTableName test_custom_table_name_entity left join fetch test_custom_table_name_entity.userManyToManies")
    List<TestCustomTableName> findAllWithEagerRelationships();

    @Query("select test_custom_table_name_entity from TestCustomTableName test_custom_table_name_entity left join fetch test_custom_table_name_entity.userManyToManies where test_custom_table_name_entity.id =:id")
    TestCustomTableName findOneWithEagerRelationships(@Param("id") Long id);
    
}
