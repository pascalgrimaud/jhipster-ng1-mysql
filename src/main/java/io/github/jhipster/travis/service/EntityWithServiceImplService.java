package io.github.jhipster.travis.service;

import io.github.jhipster.travis.domain.EntityWithServiceImpl;
import java.util.List;

/**
 * Service Interface for managing EntityWithServiceImpl.
 */
public interface EntityWithServiceImplService {

    /**
     * Save a entityWithServiceImpl.
     *
     * @param entityWithServiceImpl the entity to save
     * @return the persisted entity
     */
    EntityWithServiceImpl save(EntityWithServiceImpl entityWithServiceImpl);

    /**
     *  Get all the entityWithServiceImpls.
     *
     *  @return the list of entities
     */
    List<EntityWithServiceImpl> findAll();

    /**
     *  Get the "id" entityWithServiceImpl.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    EntityWithServiceImpl findOne(Long id);

    /**
     *  Delete the "id" entityWithServiceImpl.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
