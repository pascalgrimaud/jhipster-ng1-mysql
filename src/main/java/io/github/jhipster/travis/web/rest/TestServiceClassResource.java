package io.github.jhipster.travis.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.travis.domain.TestServiceClass;
import io.github.jhipster.travis.service.TestServiceClassService;
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
import java.util.stream.StreamSupport;

/**
 * REST controller for managing TestServiceClass.
 */
@RestController
@RequestMapping("/api")
public class TestServiceClassResource {

    private final Logger log = LoggerFactory.getLogger(TestServiceClassResource.class);

    private static final String ENTITY_NAME = "testServiceClass";

    private final TestServiceClassService testServiceClassService;

    public TestServiceClassResource(TestServiceClassService testServiceClassService) {
        this.testServiceClassService = testServiceClassService;
    }

    /**
     * POST  /test-service-classes : Create a new testServiceClass.
     *
     * @param testServiceClass the testServiceClass to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testServiceClass, or with status 400 (Bad Request) if the testServiceClass has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-service-classes")
    @Timed
    public ResponseEntity<TestServiceClass> createTestServiceClass(@RequestBody TestServiceClass testServiceClass) throws URISyntaxException {
        log.debug("REST request to save TestServiceClass : {}", testServiceClass);
        if (testServiceClass.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new testServiceClass cannot already have an ID")).body(null);
        }
        TestServiceClass result = testServiceClassService.save(testServiceClass);
        return ResponseEntity.created(new URI("/api/test-service-classes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-service-classes : Updates an existing testServiceClass.
     *
     * @param testServiceClass the testServiceClass to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testServiceClass,
     * or with status 400 (Bad Request) if the testServiceClass is not valid,
     * or with status 500 (Internal Server Error) if the testServiceClass couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-service-classes")
    @Timed
    public ResponseEntity<TestServiceClass> updateTestServiceClass(@RequestBody TestServiceClass testServiceClass) throws URISyntaxException {
        log.debug("REST request to update TestServiceClass : {}", testServiceClass);
        if (testServiceClass.getId() == null) {
            return createTestServiceClass(testServiceClass);
        }
        TestServiceClass result = testServiceClassService.save(testServiceClass);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testServiceClass.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-service-classes : get all the testServiceClasses.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of testServiceClasses in body
     */
    @GetMapping("/test-service-classes")
    @Timed
    public List<TestServiceClass> getAllTestServiceClasses(@RequestParam(required = false) String filter) {
        if ("testonetoone-is-null".equals(filter)) {
            log.debug("REST request to get all TestServiceClasss where testOneToOne is null");
            return testServiceClassService.findAllWhereTestOneToOneIsNull();
        }
        log.debug("REST request to get all TestServiceClasses");
        return testServiceClassService.findAll();
    }

    /**
     * GET  /test-service-classes/:id : get the "id" testServiceClass.
     *
     * @param id the id of the testServiceClass to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testServiceClass, or with status 404 (Not Found)
     */
    @GetMapping("/test-service-classes/{id}")
    @Timed
    public ResponseEntity<TestServiceClass> getTestServiceClass(@PathVariable Long id) {
        log.debug("REST request to get TestServiceClass : {}", id);
        TestServiceClass testServiceClass = testServiceClassService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(testServiceClass));
    }

    /**
     * DELETE  /test-service-classes/:id : delete the "id" testServiceClass.
     *
     * @param id the id of the testServiceClass to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-service-classes/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestServiceClass(@PathVariable Long id) {
        log.debug("REST request to delete TestServiceClass : {}", id);
        testServiceClassService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
