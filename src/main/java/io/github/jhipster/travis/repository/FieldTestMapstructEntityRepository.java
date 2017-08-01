package io.github.jhipster.travis.repository;

import io.github.jhipster.travis.domain.FieldTestMapstructEntity;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FieldTestMapstructEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldTestMapstructEntityRepository extends JpaRepository<FieldTestMapstructEntity,Long> {

}
