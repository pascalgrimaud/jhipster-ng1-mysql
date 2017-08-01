package io.github.jhipster.travis.repository;

import io.github.jhipster.travis.domain.FieldTestPaginationEntity;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FieldTestPaginationEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldTestPaginationEntityRepository extends JpaRepository<FieldTestPaginationEntity,Long> {

}
