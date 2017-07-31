package io.github.jhipster.travis.service;

import io.github.jhipster.travis.service.dto.EntityWithServiceImplPaginationAndDTODTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing EntityWithServiceImplPaginationAndDTO.
 */
public interface EntityWithServiceImplPaginationAndDTOService {

    /**
     * Save a entityWithServiceImplPaginationAndDTO.
     *
     * @param entityWithServiceImplPaginationAndDTODTO the entity to save
     * @return the persisted entity
     */
    EntityWithServiceImplPaginationAndDTODTO save(EntityWithServiceImplPaginationAndDTODTO entityWithServiceImplPaginationAndDTODTO);

    /**
     *  Get all the entityWithServiceImplPaginationAndDTOS.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<EntityWithServiceImplPaginationAndDTODTO> findAll(Pageable pageable);

    /**
     *  Get the "id" entityWithServiceImplPaginationAndDTO.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    EntityWithServiceImplPaginationAndDTODTO findOne(Long id);

    /**
     *  Delete the "id" entityWithServiceImplPaginationAndDTO.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
