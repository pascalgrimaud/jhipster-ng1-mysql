package io.github.jhipster.travis.repository;

import io.github.jhipster.travis.domain.EntityWithPagination;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EntityWithPagination entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntityWithPaginationRepository extends JpaRepository<EntityWithPagination,Long> {
    
}
