package io.github.jhipster.travis.service;

import io.github.jhipster.travis.domain.EntityWithServiceImplAndPagination;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing EntityWithServiceImplAndPagination.
 */
public interface EntityWithServiceImplAndPaginationService {

    /**
     * Save a entityWithServiceImplAndPagination.
     *
     * @param entityWithServiceImplAndPagination the entity to save
     * @return the persisted entity
     */
    EntityWithServiceImplAndPagination save(EntityWithServiceImplAndPagination entityWithServiceImplAndPagination);

    /**
     *  Get all the entityWithServiceImplAndPaginations.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<EntityWithServiceImplAndPagination> findAll(Pageable pageable);

    /**
     *  Get the "id" entityWithServiceImplAndPagination.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    EntityWithServiceImplAndPagination findOne(Long id);

    /**
     *  Delete the "id" entityWithServiceImplAndPagination.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
