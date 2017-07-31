package io.github.jhipster.travis.service.impl;

import io.github.jhipster.travis.service.EntityWithServiceImplAndDTOService;
import io.github.jhipster.travis.domain.EntityWithServiceImplAndDTO;
import io.github.jhipster.travis.repository.EntityWithServiceImplAndDTORepository;
import io.github.jhipster.travis.service.dto.EntityWithServiceImplAndDTODTO;
import io.github.jhipster.travis.service.mapper.EntityWithServiceImplAndDTOMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing EntityWithServiceImplAndDTO.
 */
@Service
@Transactional
public class EntityWithServiceImplAndDTOServiceImpl implements EntityWithServiceImplAndDTOService{

    private final Logger log = LoggerFactory.getLogger(EntityWithServiceImplAndDTOServiceImpl.class);

    private final EntityWithServiceImplAndDTORepository entityWithServiceImplAndDTORepository;

    private final EntityWithServiceImplAndDTOMapper entityWithServiceImplAndDTOMapper;

    public EntityWithServiceImplAndDTOServiceImpl(EntityWithServiceImplAndDTORepository entityWithServiceImplAndDTORepository, EntityWithServiceImplAndDTOMapper entityWithServiceImplAndDTOMapper) {
        this.entityWithServiceImplAndDTORepository = entityWithServiceImplAndDTORepository;
        this.entityWithServiceImplAndDTOMapper = entityWithServiceImplAndDTOMapper;
    }

    /**
     * Save a entityWithServiceImplAndDTO.
     *
     * @param entityWithServiceImplAndDTODTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EntityWithServiceImplAndDTODTO save(EntityWithServiceImplAndDTODTO entityWithServiceImplAndDTODTO) {
        log.debug("Request to save EntityWithServiceImplAndDTO : {}", entityWithServiceImplAndDTODTO);
        EntityWithServiceImplAndDTO entityWithServiceImplAndDTO = entityWithServiceImplAndDTOMapper.toEntity(entityWithServiceImplAndDTODTO);
        entityWithServiceImplAndDTO = entityWithServiceImplAndDTORepository.save(entityWithServiceImplAndDTO);
        return entityWithServiceImplAndDTOMapper.toDto(entityWithServiceImplAndDTO);
    }

    /**
     *  Get all the entityWithServiceImplAndDTOS.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<EntityWithServiceImplAndDTODTO> findAll() {
        log.debug("Request to get all EntityWithServiceImplAndDTOS");
        return entityWithServiceImplAndDTORepository.findAll().stream()
            .map(entityWithServiceImplAndDTOMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get one entityWithServiceImplAndDTO by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public EntityWithServiceImplAndDTODTO findOne(Long id) {
        log.debug("Request to get EntityWithServiceImplAndDTO : {}", id);
        EntityWithServiceImplAndDTO entityWithServiceImplAndDTO = entityWithServiceImplAndDTORepository.findOne(id);
        return entityWithServiceImplAndDTOMapper.toDto(entityWithServiceImplAndDTO);
    }

    /**
     *  Delete the  entityWithServiceImplAndDTO by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete EntityWithServiceImplAndDTO : {}", id);
        entityWithServiceImplAndDTORepository.delete(id);
    }
}
