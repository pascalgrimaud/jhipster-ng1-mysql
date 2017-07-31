package io.github.jhipster.travis.repository;

import io.github.jhipster.travis.domain.EntityWithServiceImplAndDTO;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EntityWithServiceImplAndDTO entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntityWithServiceImplAndDTORepository extends JpaRepository<EntityWithServiceImplAndDTO,Long> {
    
}
