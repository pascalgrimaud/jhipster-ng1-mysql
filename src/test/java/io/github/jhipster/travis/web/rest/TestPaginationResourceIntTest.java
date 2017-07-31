package io.github.jhipster.travis.web.rest;

import io.github.jhipster.travis.TravisMysqlApp;

import io.github.jhipster.travis.domain.TestPagination;
import io.github.jhipster.travis.repository.TestPaginationRepository;
import io.github.jhipster.travis.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TestPaginationResource REST controller.
 *
 * @see TestPaginationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisMysqlApp.class)
public class TestPaginationResourceIntTest {

    @Autowired
    private TestPaginationRepository testPaginationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestPaginationMockMvc;

    private TestPagination testPagination;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TestPaginationResource testPaginationResource = new TestPaginationResource(testPaginationRepository);
        this.restTestPaginationMockMvc = MockMvcBuilders.standaloneSetup(testPaginationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TestPagination createEntity(EntityManager em) {
        TestPagination testPagination = new TestPagination();
        return testPagination;
    }

    @Before
    public void initTest() {
        testPagination = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestPagination() throws Exception {
        int databaseSizeBeforeCreate = testPaginationRepository.findAll().size();

        // Create the TestPagination
        restTestPaginationMockMvc.perform(post("/api/test-paginations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testPagination)))
            .andExpect(status().isCreated());

        // Validate the TestPagination in the database
        List<TestPagination> testPaginationList = testPaginationRepository.findAll();
        assertThat(testPaginationList).hasSize(databaseSizeBeforeCreate + 1);
        TestPagination testTestPagination = testPaginationList.get(testPaginationList.size() - 1);
    }

    @Test
    @Transactional
    public void createTestPaginationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testPaginationRepository.findAll().size();

        // Create the TestPagination with an existing ID
        testPagination.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestPaginationMockMvc.perform(post("/api/test-paginations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testPagination)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<TestPagination> testPaginationList = testPaginationRepository.findAll();
        assertThat(testPaginationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTestPaginations() throws Exception {
        // Initialize the database
        testPaginationRepository.saveAndFlush(testPagination);

        // Get all the testPaginationList
        restTestPaginationMockMvc.perform(get("/api/test-paginations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testPagination.getId().intValue())));
    }

    @Test
    @Transactional
    public void getTestPagination() throws Exception {
        // Initialize the database
        testPaginationRepository.saveAndFlush(testPagination);

        // Get the testPagination
        restTestPaginationMockMvc.perform(get("/api/test-paginations/{id}", testPagination.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testPagination.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTestPagination() throws Exception {
        // Get the testPagination
        restTestPaginationMockMvc.perform(get("/api/test-paginations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestPagination() throws Exception {
        // Initialize the database
        testPaginationRepository.saveAndFlush(testPagination);
        int databaseSizeBeforeUpdate = testPaginationRepository.findAll().size();

        // Update the testPagination
        TestPagination updatedTestPagination = testPaginationRepository.findOne(testPagination.getId());

        restTestPaginationMockMvc.perform(put("/api/test-paginations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestPagination)))
            .andExpect(status().isOk());

        // Validate the TestPagination in the database
        List<TestPagination> testPaginationList = testPaginationRepository.findAll();
        assertThat(testPaginationList).hasSize(databaseSizeBeforeUpdate);
        TestPagination testTestPagination = testPaginationList.get(testPaginationList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingTestPagination() throws Exception {
        int databaseSizeBeforeUpdate = testPaginationRepository.findAll().size();

        // Create the TestPagination

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTestPaginationMockMvc.perform(put("/api/test-paginations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testPagination)))
            .andExpect(status().isCreated());

        // Validate the TestPagination in the database
        List<TestPagination> testPaginationList = testPaginationRepository.findAll();
        assertThat(testPaginationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTestPagination() throws Exception {
        // Initialize the database
        testPaginationRepository.saveAndFlush(testPagination);
        int databaseSizeBeforeDelete = testPaginationRepository.findAll().size();

        // Get the testPagination
        restTestPaginationMockMvc.perform(delete("/api/test-paginations/{id}", testPagination.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestPagination> testPaginationList = testPaginationRepository.findAll();
        assertThat(testPaginationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestPagination.class);
        TestPagination testPagination1 = new TestPagination();
        testPagination1.setId(1L);
        TestPagination testPagination2 = new TestPagination();
        testPagination2.setId(testPagination1.getId());
        assertThat(testPagination1).isEqualTo(testPagination2);
        testPagination2.setId(2L);
        assertThat(testPagination1).isNotEqualTo(testPagination2);
        testPagination1.setId(null);
        assertThat(testPagination1).isNotEqualTo(testPagination2);
    }
}
