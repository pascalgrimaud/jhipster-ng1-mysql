package io.github.jhipster.travis.service;

import io.github.jhipster.travis.domain.TestServiceImpl;
import java.util.List;

/**
 * Service Interface for managing TestServiceImpl.
 */
public interface TestServiceImplService {

    /**
     * Save a testServiceImpl.
     *
     * @param testServiceImpl the entity to save
     * @return the persisted entity
     */
    TestServiceImpl save(TestServiceImpl testServiceImpl);

    /**
     *  Get all the testServiceImpls.
     *
     *  @return the list of entities
     */
    List<TestServiceImpl> findAll();
    /**
     *  Get all the TestServiceImplDTO where TestOneToOne is null.
     *
     *  @return the list of entities
     */
    List<TestServiceImpl> findAllWhereTestOneToOneIsNull();

    /**
     *  Get the "id" testServiceImpl.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    TestServiceImpl findOne(Long id);

    /**
     *  Delete the "id" testServiceImpl.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
