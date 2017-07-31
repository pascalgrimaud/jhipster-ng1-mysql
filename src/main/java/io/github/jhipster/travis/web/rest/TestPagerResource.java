package io.github.jhipster.travis.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.travis.domain.TestPager;

import io.github.jhipster.travis.repository.TestPagerRepository;
import io.github.jhipster.travis.web.rest.util.HeaderUtil;
import io.github.jhipster.travis.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing TestPager.
 */
@RestController
@RequestMapping("/api")
public class TestPagerResource {

    private final Logger log = LoggerFactory.getLogger(TestPagerResource.class);

    private static final String ENTITY_NAME = "testPager";

    private final TestPagerRepository testPagerRepository;

    public TestPagerResource(TestPagerRepository testPagerRepository) {
        this.testPagerRepository = testPagerRepository;
    }

    /**
     * POST  /test-pagers : Create a new testPager.
     *
     * @param testPager the testPager to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testPager, or with status 400 (Bad Request) if the testPager has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-pagers")
    @Timed
    public ResponseEntity<TestPager> createTestPager(@RequestBody TestPager testPager) throws URISyntaxException {
        log.debug("REST request to save TestPager : {}", testPager);
        if (testPager.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new testPager cannot already have an ID")).body(null);
        }
        TestPager result = testPagerRepository.save(testPager);
        return ResponseEntity.created(new URI("/api/test-pagers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-pagers : Updates an existing testPager.
     *
     * @param testPager the testPager to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testPager,
     * or with status 400 (Bad Request) if the testPager is not valid,
     * or with status 500 (Internal Server Error) if the testPager couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-pagers")
    @Timed
    public ResponseEntity<TestPager> updateTestPager(@RequestBody TestPager testPager) throws URISyntaxException {
        log.debug("REST request to update TestPager : {}", testPager);
        if (testPager.getId() == null) {
            return createTestPager(testPager);
        }
        TestPager result = testPagerRepository.save(testPager);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testPager.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-pagers : get all the testPagers.
     *
     * @param pageable the pagination information
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of testPagers in body
     */
    @GetMapping("/test-pagers")
    @Timed
    public ResponseEntity<List<TestPager>> getAllTestPagers(@ApiParam Pageable pageable, @RequestParam(required = false) String filter) {
        if ("testonetoone-is-null".equals(filter)) {
            log.debug("REST request to get all TestPagers where testOneToOne is null");
            return new ResponseEntity<>(StreamSupport
                .stream(testPagerRepository.findAll().spliterator(), false)
                .filter(testPager -> testPager.getTestOneToOne() == null)
                .collect(Collectors.toList()), HttpStatus.OK);
        }
        log.debug("REST request to get a page of TestPagers");
        Page<TestPager> page = testPagerRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/test-pagers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /test-pagers/:id : get the "id" testPager.
     *
     * @param id the id of the testPager to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testPager, or with status 404 (Not Found)
     */
    @GetMapping("/test-pagers/{id}")
    @Timed
    public ResponseEntity<TestPager> getTestPager(@PathVariable Long id) {
        log.debug("REST request to get TestPager : {}", id);
        TestPager testPager = testPagerRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(testPager));
    }

    /**
     * DELETE  /test-pagers/:id : delete the "id" testPager.
     *
     * @param id the id of the testPager to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-pagers/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestPager(@PathVariable Long id) {
        log.debug("REST request to delete TestPager : {}", id);
        testPagerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
