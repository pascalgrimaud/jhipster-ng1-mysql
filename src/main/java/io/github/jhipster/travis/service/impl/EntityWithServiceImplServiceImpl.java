package io.github.jhipster.travis.service.impl;

import io.github.jhipster.travis.service.EntityWithServiceImplService;
import io.github.jhipster.travis.domain.EntityWithServiceImpl;
import io.github.jhipster.travis.repository.EntityWithServiceImplRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing EntityWithServiceImpl.
 */
@Service
@Transactional
public class EntityWithServiceImplServiceImpl implements EntityWithServiceImplService{

    private final Logger log = LoggerFactory.getLogger(EntityWithServiceImplServiceImpl.class);

    private final EntityWithServiceImplRepository entityWithServiceImplRepository;

    public EntityWithServiceImplServiceImpl(EntityWithServiceImplRepository entityWithServiceImplRepository) {
        this.entityWithServiceImplRepository = entityWithServiceImplRepository;
    }

    /**
     * Save a entityWithServiceImpl.
     *
     * @param entityWithServiceImpl the entity to save
     * @return the persisted entity
     */
    @Override
    public EntityWithServiceImpl save(EntityWithServiceImpl entityWithServiceImpl) {
        log.debug("Request to save EntityWithServiceImpl : {}", entityWithServiceImpl);
        return entityWithServiceImplRepository.save(entityWithServiceImpl);
    }

    /**
     *  Get all the entityWithServiceImpls.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<EntityWithServiceImpl> findAll() {
        log.debug("Request to get all EntityWithServiceImpls");
        return entityWithServiceImplRepository.findAll();
    }

    /**
     *  Get one entityWithServiceImpl by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public EntityWithServiceImpl findOne(Long id) {
        log.debug("Request to get EntityWithServiceImpl : {}", id);
        return entityWithServiceImplRepository.findOne(id);
    }

    /**
     *  Delete the  entityWithServiceImpl by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete EntityWithServiceImpl : {}", id);
        entityWithServiceImplRepository.delete(id);
    }
}
