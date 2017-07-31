package io.github.jhipster.travis.repository;

import io.github.jhipster.travis.domain.EntityWithServiceClassAndPagination;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EntityWithServiceClassAndPagination entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntityWithServiceClassAndPaginationRepository extends JpaRepository<EntityWithServiceClassAndPagination,Long> {
    
}
