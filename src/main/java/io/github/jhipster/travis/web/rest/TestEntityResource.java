package io.github.jhipster.travis.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.travis.domain.TestEntity;

import io.github.jhipster.travis.repository.TestEntityRepository;
import io.github.jhipster.travis.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing TestEntity.
 */
@RestController
@RequestMapping("/api")
public class TestEntityResource {

    private final Logger log = LoggerFactory.getLogger(TestEntityResource.class);

    private static final String ENTITY_NAME = "testEntity";

    private final TestEntityRepository testEntityRepository;

    public TestEntityResource(TestEntityRepository testEntityRepository) {
        this.testEntityRepository = testEntityRepository;
    }

    /**
     * POST  /test-entities : Create a new testEntity.
     *
     * @param testEntity the testEntity to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testEntity, or with status 400 (Bad Request) if the testEntity has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-entities")
    @Timed
    public ResponseEntity<TestEntity> createTestEntity(@Valid @RequestBody TestEntity testEntity) throws URISyntaxException {
        log.debug("REST request to save TestEntity : {}", testEntity);
        if (testEntity.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new testEntity cannot already have an ID")).body(null);
        }
        TestEntity result = testEntityRepository.save(testEntity);
        return ResponseEntity.created(new URI("/api/test-entities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-entities : Updates an existing testEntity.
     *
     * @param testEntity the testEntity to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testEntity,
     * or with status 400 (Bad Request) if the testEntity is not valid,
     * or with status 500 (Internal Server Error) if the testEntity couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-entities")
    @Timed
    public ResponseEntity<TestEntity> updateTestEntity(@Valid @RequestBody TestEntity testEntity) throws URISyntaxException {
        log.debug("REST request to update TestEntity : {}", testEntity);
        if (testEntity.getId() == null) {
            return createTestEntity(testEntity);
        }
        TestEntity result = testEntityRepository.save(testEntity);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testEntity.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-entities : get all the testEntities.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of testEntities in body
     */
    @GetMapping("/test-entities")
    @Timed
    public List<TestEntity> getAllTestEntities(@RequestParam(required = false) String filter) {
        if ("testonetoone-is-null".equals(filter)) {
            log.debug("REST request to get all TestEntitys where testOneToOne is null");
            return StreamSupport
                .stream(testEntityRepository.findAll().spliterator(), false)
                .filter(testEntity -> testEntity.getTestOneToOne() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all TestEntities");
        return testEntityRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /test-entities/:id : get the "id" testEntity.
     *
     * @param id the id of the testEntity to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testEntity, or with status 404 (Not Found)
     */
    @GetMapping("/test-entities/{id}")
    @Timed
    public ResponseEntity<TestEntity> getTestEntity(@PathVariable Long id) {
        log.debug("REST request to get TestEntity : {}", id);
        TestEntity testEntity = testEntityRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(testEntity));
    }

    /**
     * DELETE  /test-entities/:id : delete the "id" testEntity.
     *
     * @param id the id of the testEntity to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-entities/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestEntity(@PathVariable Long id) {
        log.debug("REST request to delete TestEntity : {}", id);
        testEntityRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
