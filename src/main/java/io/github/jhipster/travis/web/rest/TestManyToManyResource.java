package io.github.jhipster.travis.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.travis.domain.TestManyToMany;

import io.github.jhipster.travis.repository.TestManyToManyRepository;
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
 * REST controller for managing TestManyToMany.
 */
@RestController
@RequestMapping("/api")
public class TestManyToManyResource {

    private final Logger log = LoggerFactory.getLogger(TestManyToManyResource.class);

    private static final String ENTITY_NAME = "testManyToMany";

    private final TestManyToManyRepository testManyToManyRepository;

    public TestManyToManyResource(TestManyToManyRepository testManyToManyRepository) {
        this.testManyToManyRepository = testManyToManyRepository;
    }

    /**
     * POST  /test-many-to-manies : Create a new testManyToMany.
     *
     * @param testManyToMany the testManyToMany to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testManyToMany, or with status 400 (Bad Request) if the testManyToMany has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-many-to-manies")
    @Timed
    public ResponseEntity<TestManyToMany> createTestManyToMany(@RequestBody TestManyToMany testManyToMany) throws URISyntaxException {
        log.debug("REST request to save TestManyToMany : {}", testManyToMany);
        if (testManyToMany.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new testManyToMany cannot already have an ID")).body(null);
        }
        TestManyToMany result = testManyToManyRepository.save(testManyToMany);
        return ResponseEntity.created(new URI("/api/test-many-to-manies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-many-to-manies : Updates an existing testManyToMany.
     *
     * @param testManyToMany the testManyToMany to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testManyToMany,
     * or with status 400 (Bad Request) if the testManyToMany is not valid,
     * or with status 500 (Internal Server Error) if the testManyToMany couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-many-to-manies")
    @Timed
    public ResponseEntity<TestManyToMany> updateTestManyToMany(@RequestBody TestManyToMany testManyToMany) throws URISyntaxException {
        log.debug("REST request to update TestManyToMany : {}", testManyToMany);
        if (testManyToMany.getId() == null) {
            return createTestManyToMany(testManyToMany);
        }
        TestManyToMany result = testManyToManyRepository.save(testManyToMany);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testManyToMany.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-many-to-manies : get all the testManyToManies.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of testManyToManies in body
     */
    @GetMapping("/test-many-to-manies")
    @Timed
    public List<TestManyToMany> getAllTestManyToManies() {
        log.debug("REST request to get all TestManyToManies");
        return testManyToManyRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /test-many-to-manies/:id : get the "id" testManyToMany.
     *
     * @param id the id of the testManyToMany to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testManyToMany, or with status 404 (Not Found)
     */
    @GetMapping("/test-many-to-manies/{id}")
    @Timed
    public ResponseEntity<TestManyToMany> getTestManyToMany(@PathVariable Long id) {
        log.debug("REST request to get TestManyToMany : {}", id);
        TestManyToMany testManyToMany = testManyToManyRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(testManyToMany));
    }

    /**
     * DELETE  /test-many-to-manies/:id : delete the "id" testManyToMany.
     *
     * @param id the id of the testManyToMany to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-many-to-manies/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestManyToMany(@PathVariable Long id) {
        log.debug("REST request to delete TestManyToMany : {}", id);
        testManyToManyRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
