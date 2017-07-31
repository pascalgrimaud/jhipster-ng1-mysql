package io.github.jhipster.travis.service;

import io.github.jhipster.travis.domain.TestServiceClass;
import io.github.jhipster.travis.repository.TestServiceClassRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing TestServiceClass.
 */
@Service
@Transactional
public class TestServiceClassService {

    private final Logger log = LoggerFactory.getLogger(TestServiceClassService.class);

    private final TestServiceClassRepository testServiceClassRepository;

    public TestServiceClassService(TestServiceClassRepository testServiceClassRepository) {
        this.testServiceClassRepository = testServiceClassRepository;
    }

    /**
     * Save a testServiceClass.
     *
     * @param testServiceClass the entity to save
     * @return the persisted entity
     */
    public TestServiceClass save(TestServiceClass testServiceClass) {
        log.debug("Request to save TestServiceClass : {}", testServiceClass);
        return testServiceClassRepository.save(testServiceClass);
    }

    /**
     *  Get all the testServiceClasses.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<TestServiceClass> findAll() {
        log.debug("Request to get all TestServiceClasses");
        return testServiceClassRepository.findAllWithEagerRelationships();
    }


    /**
     *  get all the testServiceClasses where TestOneToOne is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<TestServiceClass> findAllWhereTestOneToOneIsNull() {
        log.debug("Request to get all testServiceClasses where TestOneToOne is null");
        return StreamSupport
            .stream(testServiceClassRepository.findAll().spliterator(), false)
            .filter(testServiceClass -> testServiceClass.getTestOneToOne() == null)
            .collect(Collectors.toList());
    }

    /**
     *  Get one testServiceClass by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public TestServiceClass findOne(Long id) {
        log.debug("Request to get TestServiceClass : {}", id);
        return testServiceClassRepository.findOneWithEagerRelationships(id);
    }

    /**
     *  Delete the  testServiceClass by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete TestServiceClass : {}", id);
        testServiceClassRepository.delete(id);
    }
}
