package io.github.jhipster.travis.repository;

import io.github.jhipster.travis.domain.FieldTestInfiniteScrollEntity;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FieldTestInfiniteScrollEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldTestInfiniteScrollEntityRepository extends JpaRepository<FieldTestInfiniteScrollEntity,Long> {

}
