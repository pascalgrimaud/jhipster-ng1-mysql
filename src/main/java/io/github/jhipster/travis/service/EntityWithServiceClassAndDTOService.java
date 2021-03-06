package io.github.jhipster.travis.service;

import io.github.jhipster.travis.domain.EntityWithServiceClassAndDTO;
import io.github.jhipster.travis.repository.EntityWithServiceClassAndDTORepository;
import io.github.jhipster.travis.service.dto.EntityWithServiceClassAndDTODTO;
import io.github.jhipster.travis.service.mapper.EntityWithServiceClassAndDTOMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing EntityWithServiceClassAndDTO.
 */
@Service
@Transactional
public class EntityWithServiceClassAndDTOService {

    private final Logger log = LoggerFactory.getLogger(EntityWithServiceClassAndDTOService.class);

    private final EntityWithServiceClassAndDTORepository entityWithServiceClassAndDTORepository;

    private final EntityWithServiceClassAndDTOMapper entityWithServiceClassAndDTOMapper;

    public EntityWithServiceClassAndDTOService(EntityWithServiceClassAndDTORepository entityWithServiceClassAndDTORepository, EntityWithServiceClassAndDTOMapper entityWithServiceClassAndDTOMapper) {
        this.entityWithServiceClassAndDTORepository = entityWithServiceClassAndDTORepository;
        this.entityWithServiceClassAndDTOMapper = entityWithServiceClassAndDTOMapper;
    }

    /**
     * Save a entityWithServiceClassAndDTO.
     *
     * @param entityWithServiceClassAndDTODTO the entity to save
     * @return the persisted entity
     */
    public EntityWithServiceClassAndDTODTO save(EntityWithServiceClassAndDTODTO entityWithServiceClassAndDTODTO) {
        log.debug("Request to save EntityWithServiceClassAndDTO : {}", entityWithServiceClassAndDTODTO);
        EntityWithServiceClassAndDTO entityWithServiceClassAndDTO = entityWithServiceClassAndDTOMapper.toEntity(entityWithServiceClassAndDTODTO);
        entityWithServiceClassAndDTO = entityWithServiceClassAndDTORepository.save(entityWithServiceClassAndDTO);
        return entityWithServiceClassAndDTOMapper.toDto(entityWithServiceClassAndDTO);
    }

    /**
     *  Get all the entityWithServiceClassAndDTOS.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<EntityWithServiceClassAndDTODTO> findAll() {
        log.debug("Request to get all EntityWithServiceClassAndDTOS");
        return entityWithServiceClassAndDTORepository.findAll().stream()
            .map(entityWithServiceClassAndDTOMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get one entityWithServiceClassAndDTO by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public EntityWithServiceClassAndDTODTO findOne(Long id) {
        log.debug("Request to get EntityWithServiceClassAndDTO : {}", id);
        EntityWithServiceClassAndDTO entityWithServiceClassAndDTO = entityWithServiceClassAndDTORepository.findOne(id);
        return entityWithServiceClassAndDTOMapper.toDto(entityWithServiceClassAndDTO);
    }

    /**
     *  Delete the  entityWithServiceClassAndDTO by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete EntityWithServiceClassAndDTO : {}", id);
        entityWithServiceClassAndDTORepository.delete(id);
    }
}
