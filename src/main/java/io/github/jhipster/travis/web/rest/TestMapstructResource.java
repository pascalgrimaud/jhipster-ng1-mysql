package io.github.jhipster.travis.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.travis.domain.TestMapstruct;

import io.github.jhipster.travis.repository.TestMapstructRepository;
import io.github.jhipster.travis.web.rest.util.HeaderUtil;
import io.github.jhipster.travis.service.dto.TestMapstructDTO;
import io.github.jhipster.travis.service.mapper.TestMapstructMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing TestMapstruct.
 */
@RestController
@RequestMapping("/api")
public class TestMapstructResource {

    private final Logger log = LoggerFactory.getLogger(TestMapstructResource.class);

    private static final String ENTITY_NAME = "testMapstruct";

    private final TestMapstructRepository testMapstructRepository;

    private final TestMapstructMapper testMapstructMapper;

    public TestMapstructResource(TestMapstructRepository testMapstructRepository, TestMapstructMapper testMapstructMapper) {
        this.testMapstructRepository = testMapstructRepository;
        this.testMapstructMapper = testMapstructMapper;
    }

    /**
     * POST  /test-mapstructs : Create a new testMapstruct.
     *
     * @param testMapstructDTO the testMapstructDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testMapstructDTO, or with status 400 (Bad Request) if the testMapstruct has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-mapstructs")
    @Timed
    public ResponseEntity<TestMapstructDTO> createTestMapstruct(@RequestBody TestMapstructDTO testMapstructDTO) throws URISyntaxException {
        log.debug("REST request to save TestMapstruct : {}", testMapstructDTO);
        if (testMapstructDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new testMapstruct cannot already have an ID")).body(null);
        }
        TestMapstruct testMapstruct = testMapstructMapper.toEntity(testMapstructDTO);
        testMapstruct = testMapstructRepository.save(testMapstruct);
        TestMapstructDTO result = testMapstructMapper.toDto(testMapstruct);
        return ResponseEntity.created(new URI("/api/test-mapstructs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-mapstructs : Updates an existing testMapstruct.
     *
     * @param testMapstructDTO the testMapstructDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testMapstructDTO,
     * or with status 400 (Bad Request) if the testMapstructDTO is not valid,
     * or with status 500 (Internal Server Error) if the testMapstructDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-mapstructs")
    @Timed
    public ResponseEntity<TestMapstructDTO> updateTestMapstruct(@RequestBody TestMapstructDTO testMapstructDTO) throws URISyntaxException {
        log.debug("REST request to update TestMapstruct : {}", testMapstructDTO);
        if (testMapstructDTO.getId() == null) {
            return createTestMapstruct(testMapstructDTO);
        }
        TestMapstruct testMapstruct = testMapstructMapper.toEntity(testMapstructDTO);
        testMapstruct = testMapstructRepository.save(testMapstruct);
        TestMapstructDTO result = testMapstructMapper.toDto(testMapstruct);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testMapstructDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-mapstructs : get all the testMapstructs.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of testMapstructs in body
     */
    @GetMapping("/test-mapstructs")
    @Timed
    public List<TestMapstructDTO> getAllTestMapstructs(@RequestParam(required = false) String filter) {
        if ("testonetoone-is-null".equals(filter)) {
            log.debug("REST request to get all TestMapstructs where testOneToOne is null");
            return StreamSupport
                .stream(testMapstructRepository.findAll().spliterator(), false)
                .filter(testMapstruct -> testMapstruct.getTestOneToOne() == null)
                .map(testMapstructMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
        }
        log.debug("REST request to get all TestMapstructs");
        List<TestMapstruct> testMapstructs = testMapstructRepository.findAllWithEagerRelationships();
        return testMapstructMapper.toDto(testMapstructs);
    }

    /**
     * GET  /test-mapstructs/:id : get the "id" testMapstruct.
     *
     * @param id the id of the testMapstructDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testMapstructDTO, or with status 404 (Not Found)
     */
    @GetMapping("/test-mapstructs/{id}")
    @Timed
    public ResponseEntity<TestMapstructDTO> getTestMapstruct(@PathVariable Long id) {
        log.debug("REST request to get TestMapstruct : {}", id);
        TestMapstruct testMapstruct = testMapstructRepository.findOneWithEagerRelationships(id);
        TestMapstructDTO testMapstructDTO = testMapstructMapper.toDto(testMapstruct);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(testMapstructDTO));
    }

    /**
     * DELETE  /test-mapstructs/:id : delete the "id" testMapstruct.
     *
     * @param id the id of the testMapstructDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-mapstructs/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestMapstruct(@PathVariable Long id) {
        log.debug("REST request to delete TestMapstruct : {}", id);
        testMapstructRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
