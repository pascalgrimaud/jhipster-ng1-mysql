package io.github.jhipster.travis.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.travis.domain.TestTwoRelationshipsSameEntity;

import io.github.jhipster.travis.repository.TestTwoRelationshipsSameEntityRepository;
import io.github.jhipster.travis.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TestTwoRelationshipsSameEntity.
 */
@RestController
@RequestMapping("/api")
public class TestTwoRelationshipsSameEntityResource {

    private final Logger log = LoggerFactory.getLogger(TestTwoRelationshipsSameEntityResource.class);

    private static final String ENTITY_NAME = "testTwoRelationshipsSameEntity";

    private final TestTwoRelationshipsSameEntityRepository testTwoRelationshipsSameEntityRepository;

    public TestTwoRelationshipsSameEntityResource(TestTwoRelationshipsSameEntityRepository testTwoRelationshipsSameEntityRepository) {
        this.testTwoRelationshipsSameEntityRepository = testTwoRelationshipsSameEntityRepository;
    }

    /**
     * POST  /test-two-relationships-same-entities : Create a new testTwoRelationshipsSameEntity.
     *
     * @param testTwoRelationshipsSameEntity the testTwoRelationshipsSameEntity to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testTwoRelationshipsSameEntity, or with status 400 (Bad Request) if the testTwoRelationshipsSameEntity has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-two-relationships-same-entities")
    @Timed
    public ResponseEntity<TestTwoRelationshipsSameEntity> createTestTwoRelationshipsSameEntity(@RequestBody TestTwoRelationshipsSameEntity testTwoRelationshipsSameEntity) throws URISyntaxException {
        log.debug("REST request to save TestTwoRelationshipsSameEntity : {}", testTwoRelationshipsSameEntity);
        if (testTwoRelationshipsSameEntity.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new testTwoRelationshipsSameEntity cannot already have an ID")).body(null);
        }
        TestTwoRelationshipsSameEntity result = testTwoRelationshipsSameEntityRepository.save(testTwoRelationshipsSameEntity);
        return ResponseEntity.created(new URI("/api/test-two-relationships-same-entities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-two-relationships-same-entities : Updates an existing testTwoRelationshipsSameEntity.
     *
     * @param testTwoRelationshipsSameEntity the testTwoRelationshipsSameEntity to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testTwoRelationshipsSameEntity,
     * or with status 400 (Bad Request) if the testTwoRelationshipsSameEntity is not valid,
     * or with status 500 (Internal Server Error) if the testTwoRelationshipsSameEntity couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-two-relationships-same-entities")
    @Timed
    public ResponseEntity<TestTwoRelationshipsSameEntity> updateTestTwoRelationshipsSameEntity(@RequestBody TestTwoRelationshipsSameEntity testTwoRelationshipsSameEntity) throws URISyntaxException {
        log.debug("REST request to update TestTwoRelationshipsSameEntity : {}", testTwoRelationshipsSameEntity);
        if (testTwoRelationshipsSameEntity.getId() == null) {
            return createTestTwoRelationshipsSameEntity(testTwoRelationshipsSameEntity);
        }
        TestTwoRelationshipsSameEntity result = testTwoRelationshipsSameEntityRepository.save(testTwoRelationshipsSameEntity);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testTwoRelationshipsSameEntity.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-two-relationships-same-entities : get all the testTwoRelationshipsSameEntities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of testTwoRelationshipsSameEntities in body
     */
    @GetMapping("/test-two-relationships-same-entities")
    @Timed
    public List<TestTwoRelationshipsSameEntity> getAllTestTwoRelationshipsSameEntities() {
        log.debug("REST request to get all TestTwoRelationshipsSameEntities");
        return testTwoRelationshipsSameEntityRepository.findAll();
    }

    /**
     * GET  /test-two-relationships-same-entities/:id : get the "id" testTwoRelationshipsSameEntity.
     *
     * @param id the id of the testTwoRelationshipsSameEntity to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testTwoRelationshipsSameEntity, or with status 404 (Not Found)
     */
    @GetMapping("/test-two-relationships-same-entities/{id}")
    @Timed
    public ResponseEntity<TestTwoRelationshipsSameEntity> getTestTwoRelationshipsSameEntity(@PathVariable Long id) {
        log.debug("REST request to get TestTwoRelationshipsSameEntity : {}", id);
        TestTwoRelationshipsSameEntity testTwoRelationshipsSameEntity = testTwoRelationshipsSameEntityRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(testTwoRelationshipsSameEntity));
    }

    /**
     * DELETE  /test-two-relationships-same-entities/:id : delete the "id" testTwoRelationshipsSameEntity.
     *
     * @param id the id of the testTwoRelationshipsSameEntity to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-two-relationships-same-entities/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestTwoRelationshipsSameEntity(@PathVariable Long id) {
        log.debug("REST request to delete TestTwoRelationshipsSameEntity : {}", id);
        testTwoRelationshipsSameEntityRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
