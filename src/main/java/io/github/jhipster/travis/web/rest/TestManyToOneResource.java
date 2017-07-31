package io.github.jhipster.travis.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.travis.domain.TestManyToOne;

import io.github.jhipster.travis.repository.TestManyToOneRepository;
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
 * REST controller for managing TestManyToOne.
 */
@RestController
@RequestMapping("/api")
public class TestManyToOneResource {

    private final Logger log = LoggerFactory.getLogger(TestManyToOneResource.class);

    private static final String ENTITY_NAME = "testManyToOne";

    private final TestManyToOneRepository testManyToOneRepository;

    public TestManyToOneResource(TestManyToOneRepository testManyToOneRepository) {
        this.testManyToOneRepository = testManyToOneRepository;
    }

    /**
     * POST  /test-many-to-ones : Create a new testManyToOne.
     *
     * @param testManyToOne the testManyToOne to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testManyToOne, or with status 400 (Bad Request) if the testManyToOne has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-many-to-ones")
    @Timed
    public ResponseEntity<TestManyToOne> createTestManyToOne(@RequestBody TestManyToOne testManyToOne) throws URISyntaxException {
        log.debug("REST request to save TestManyToOne : {}", testManyToOne);
        if (testManyToOne.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new testManyToOne cannot already have an ID")).body(null);
        }
        TestManyToOne result = testManyToOneRepository.save(testManyToOne);
        return ResponseEntity.created(new URI("/api/test-many-to-ones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-many-to-ones : Updates an existing testManyToOne.
     *
     * @param testManyToOne the testManyToOne to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testManyToOne,
     * or with status 400 (Bad Request) if the testManyToOne is not valid,
     * or with status 500 (Internal Server Error) if the testManyToOne couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-many-to-ones")
    @Timed
    public ResponseEntity<TestManyToOne> updateTestManyToOne(@RequestBody TestManyToOne testManyToOne) throws URISyntaxException {
        log.debug("REST request to update TestManyToOne : {}", testManyToOne);
        if (testManyToOne.getId() == null) {
            return createTestManyToOne(testManyToOne);
        }
        TestManyToOne result = testManyToOneRepository.save(testManyToOne);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testManyToOne.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-many-to-ones : get all the testManyToOnes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of testManyToOnes in body
     */
    @GetMapping("/test-many-to-ones")
    @Timed
    public List<TestManyToOne> getAllTestManyToOnes() {
        log.debug("REST request to get all TestManyToOnes");
        return testManyToOneRepository.findAll();
    }

    /**
     * GET  /test-many-to-ones/:id : get the "id" testManyToOne.
     *
     * @param id the id of the testManyToOne to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testManyToOne, or with status 404 (Not Found)
     */
    @GetMapping("/test-many-to-ones/{id}")
    @Timed
    public ResponseEntity<TestManyToOne> getTestManyToOne(@PathVariable Long id) {
        log.debug("REST request to get TestManyToOne : {}", id);
        TestManyToOne testManyToOne = testManyToOneRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(testManyToOne));
    }

    /**
     * DELETE  /test-many-to-ones/:id : delete the "id" testManyToOne.
     *
     * @param id the id of the testManyToOne to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-many-to-ones/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestManyToOne(@PathVariable Long id) {
        log.debug("REST request to delete TestManyToOne : {}", id);
        testManyToOneRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
