package io.github.jhipster.travis.repository;

import io.github.jhipster.travis.domain.FieldTestPagerEntity;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FieldTestPagerEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldTestPagerEntityRepository extends JpaRepository<FieldTestPagerEntity,Long> {

}
