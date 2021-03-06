package io.github.jhipster.travis.service;

import io.github.jhipster.travis.domain.FieldTestServiceClassEntity;
import io.github.jhipster.travis.repository.FieldTestServiceClassEntityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing FieldTestServiceClassEntity.
 */
@Service
@Transactional
public class FieldTestServiceClassEntityService {

    private final Logger log = LoggerFactory.getLogger(FieldTestServiceClassEntityService.class);

    private final FieldTestServiceClassEntityRepository fieldTestServiceClassEntityRepository;

    public FieldTestServiceClassEntityService(FieldTestServiceClassEntityRepository fieldTestServiceClassEntityRepository) {
        this.fieldTestServiceClassEntityRepository = fieldTestServiceClassEntityRepository;
    }

    /**
     * Save a fieldTestServiceClassEntity.
     *
     * @param fieldTestServiceClassEntity the entity to save
     * @return the persisted entity
     */
    public FieldTestServiceClassEntity save(FieldTestServiceClassEntity fieldTestServiceClassEntity) {
        log.debug("Request to save FieldTestServiceClassEntity : {}", fieldTestServiceClassEntity);
        return fieldTestServiceClassEntityRepository.save(fieldTestServiceClassEntity);
    }

    /**
     *  Get all the fieldTestServiceClassEntities.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<FieldTestServiceClassEntity> findAll() {
        log.debug("Request to get all FieldTestServiceClassEntities");
        return fieldTestServiceClassEntityRepository.findAll();
    }

    /**
     *  Get one fieldTestServiceClassEntity by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public FieldTestServiceClassEntity findOne(Long id) {
        log.debug("Request to get FieldTestServiceClassEntity : {}", id);
        return fieldTestServiceClassEntityRepository.findOne(id);
    }

    /**
     *  Delete the  fieldTestServiceClassEntity by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete FieldTestServiceClassEntity : {}", id);
        fieldTestServiceClassEntityRepository.delete(id);
    }
}
