package io.github.jhipster.travis.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.travis.domain.TestInfiniteScroll;

import io.github.jhipster.travis.repository.TestInfiniteScrollRepository;
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
 * REST controller for managing TestInfiniteScroll.
 */
@RestController
@RequestMapping("/api")
public class TestInfiniteScrollResource {

    private final Logger log = LoggerFactory.getLogger(TestInfiniteScrollResource.class);

    private static final String ENTITY_NAME = "testInfiniteScroll";

    private final TestInfiniteScrollRepository testInfiniteScrollRepository;

    public TestInfiniteScrollResource(TestInfiniteScrollRepository testInfiniteScrollRepository) {
        this.testInfiniteScrollRepository = testInfiniteScrollRepository;
    }

    /**
     * POST  /test-infinite-scrolls : Create a new testInfiniteScroll.
     *
     * @param testInfiniteScroll the testInfiniteScroll to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testInfiniteScroll, or with status 400 (Bad Request) if the testInfiniteScroll has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-infinite-scrolls")
    @Timed
    public ResponseEntity<TestInfiniteScroll> createTestInfiniteScroll(@RequestBody TestInfiniteScroll testInfiniteScroll) throws URISyntaxException {
        log.debug("REST request to save TestInfiniteScroll : {}", testInfiniteScroll);
        if (testInfiniteScroll.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new testInfiniteScroll cannot already have an ID")).body(null);
        }
        TestInfiniteScroll result = testInfiniteScrollRepository.save(testInfiniteScroll);
        return ResponseEntity.created(new URI("/api/test-infinite-scrolls/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-infinite-scrolls : Updates an existing testInfiniteScroll.
     *
     * @param testInfiniteScroll the testInfiniteScroll to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testInfiniteScroll,
     * or with status 400 (Bad Request) if the testInfiniteScroll is not valid,
     * or with status 500 (Internal Server Error) if the testInfiniteScroll couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-infinite-scrolls")
    @Timed
    public ResponseEntity<TestInfiniteScroll> updateTestInfiniteScroll(@RequestBody TestInfiniteScroll testInfiniteScroll) throws URISyntaxException {
        log.debug("REST request to update TestInfiniteScroll : {}", testInfiniteScroll);
        if (testInfiniteScroll.getId() == null) {
            return createTestInfiniteScroll(testInfiniteScroll);
        }
        TestInfiniteScroll result = testInfiniteScrollRepository.save(testInfiniteScroll);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testInfiniteScroll.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-infinite-scrolls : get all the testInfiniteScrolls.
     *
     * @param pageable the pagination information
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of testInfiniteScrolls in body
     */
    @GetMapping("/test-infinite-scrolls")
    @Timed
    public ResponseEntity<List<TestInfiniteScroll>> getAllTestInfiniteScrolls(@ApiParam Pageable pageable, @RequestParam(required = false) String filter) {
        if ("testonetoone-is-null".equals(filter)) {
            log.debug("REST request to get all TestInfiniteScrolls where testOneToOne is null");
            return new ResponseEntity<>(StreamSupport
                .stream(testInfiniteScrollRepository.findAll().spliterator(), false)
                .filter(testInfiniteScroll -> testInfiniteScroll.getTestOneToOne() == null)
                .collect(Collectors.toList()), HttpStatus.OK);
        }
        log.debug("REST request to get a page of TestInfiniteScrolls");
        Page<TestInfiniteScroll> page = testInfiniteScrollRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/test-infinite-scrolls");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /test-infinite-scrolls/:id : get the "id" testInfiniteScroll.
     *
     * @param id the id of the testInfiniteScroll to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testInfiniteScroll, or with status 404 (Not Found)
     */
    @GetMapping("/test-infinite-scrolls/{id}")
    @Timed
    public ResponseEntity<TestInfiniteScroll> getTestInfiniteScroll(@PathVariable Long id) {
        log.debug("REST request to get TestInfiniteScroll : {}", id);
        TestInfiniteScroll testInfiniteScroll = testInfiniteScrollRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(testInfiniteScroll));
    }

    /**
     * DELETE  /test-infinite-scrolls/:id : delete the "id" testInfiniteScroll.
     *
     * @param id the id of the testInfiniteScroll to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-infinite-scrolls/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestInfiniteScroll(@PathVariable Long id) {
        log.debug("REST request to delete TestInfiniteScroll : {}", id);
        testInfiniteScrollRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
