package io.github.jhipster.travis.repository;

import io.github.jhipster.travis.domain.FieldTestServiceClassEntity;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FieldTestServiceClassEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldTestServiceClassEntityRepository extends JpaRepository<FieldTestServiceClassEntity,Long> {
    
}
