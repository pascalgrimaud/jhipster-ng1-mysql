package io.github.jhipster.travis.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.travis.domain.TestServiceImpl;
import io.github.jhipster.travis.service.TestServiceImplService;
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
 * REST controller for managing TestServiceImpl.
 */
@RestController
@RequestMapping("/api")
public class TestServiceImplResource {

    private final Logger log = LoggerFactory.getLogger(TestServiceImplResource.class);

    private static final String ENTITY_NAME = "testServiceImpl";

    private final TestServiceImplService testServiceImplService;

    public TestServiceImplResource(TestServiceImplService testServiceImplService) {
        this.testServiceImplService = testServiceImplService;
    }

    /**
     * POST  /test-service-impls : Create a new testServiceImpl.
     *
     * @param testServiceImpl the testServiceImpl to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testServiceImpl, or with status 400 (Bad Request) if the testServiceImpl has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-service-impls")
    @Timed
    public ResponseEntity<TestServiceImpl> createTestServiceImpl(@RequestBody TestServiceImpl testServiceImpl) throws URISyntaxException {
        log.debug("REST request to save TestServiceImpl : {}", testServiceImpl);
        if (testServiceImpl.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new testServiceImpl cannot already have an ID")).body(null);
        }
        TestServiceImpl result = testServiceImplService.save(testServiceImpl);
        return ResponseEntity.created(new URI("/api/test-service-impls/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-service-impls : Updates an existing testServiceImpl.
     *
     * @param testServiceImpl the testServiceImpl to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testServiceImpl,
     * or with status 400 (Bad Request) if the testServiceImpl is not valid,
     * or with status 500 (Internal Server Error) if the testServiceImpl couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-service-impls")
    @Timed
    public ResponseEntity<TestServiceImpl> updateTestServiceImpl(@RequestBody TestServiceImpl testServiceImpl) throws URISyntaxException {
        log.debug("REST request to update TestServiceImpl : {}", testServiceImpl);
        if (testServiceImpl.getId() == null) {
            return createTestServiceImpl(testServiceImpl);
        }
        TestServiceImpl result = testServiceImplService.save(testServiceImpl);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testServiceImpl.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-service-impls : get all the testServiceImpls.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of testServiceImpls in body
     */
    @GetMapping("/test-service-impls")
    @Timed
    public List<TestServiceImpl> getAllTestServiceImpls(@RequestParam(required = false) String filter) {
        if ("testonetoone-is-null".equals(filter)) {
            log.debug("REST request to get all TestServiceImpls where testOneToOne is null");
            return testServiceImplService.findAllWhereTestOneToOneIsNull();
        }
        log.debug("REST request to get all TestServiceImpls");
        return testServiceImplService.findAll();
    }

    /**
     * GET  /test-service-impls/:id : get the "id" testServiceImpl.
     *
     * @param id the id of the testServiceImpl to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testServiceImpl, or with status 404 (Not Found)
     */
    @GetMapping("/test-service-impls/{id}")
    @Timed
    public ResponseEntity<TestServiceImpl> getTestServiceImpl(@PathVariable Long id) {
        log.debug("REST request to get TestServiceImpl : {}", id);
        TestServiceImpl testServiceImpl = testServiceImplService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(testServiceImpl));
    }

    /**
     * DELETE  /test-service-impls/:id : delete the "id" testServiceImpl.
     *
     * @param id the id of the testServiceImpl to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-service-impls/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestServiceImpl(@PathVariable Long id) {
        log.debug("REST request to delete TestServiceImpl : {}", id);
        testServiceImplService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
