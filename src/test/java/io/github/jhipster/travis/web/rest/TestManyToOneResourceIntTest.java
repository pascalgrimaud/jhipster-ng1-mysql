package io.github.jhipster.travis.web.rest;

import io.github.jhipster.travis.TravisMysqlApp;

import io.github.jhipster.travis.domain.TestManyToOne;
import io.github.jhipster.travis.repository.TestManyToOneRepository;
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
 * Test class for the TestManyToOneResource REST controller.
 *
 * @see TestManyToOneResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisMysqlApp.class)
public class TestManyToOneResourceIntTest {

    @Autowired
    private TestManyToOneRepository testManyToOneRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestManyToOneMockMvc;

    private TestManyToOne testManyToOne;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TestManyToOneResource testManyToOneResource = new TestManyToOneResource(testManyToOneRepository);
        this.restTestManyToOneMockMvc = MockMvcBuilders.standaloneSetup(testManyToOneResource)
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
    public static TestManyToOne createEntity(EntityManager em) {
        TestManyToOne testManyToOne = new TestManyToOne();
        return testManyToOne;
    }

    @Before
    public void initTest() {
        testManyToOne = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestManyToOne() throws Exception {
        int databaseSizeBeforeCreate = testManyToOneRepository.findAll().size();

        // Create the TestManyToOne
        restTestManyToOneMockMvc.perform(post("/api/test-many-to-ones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testManyToOne)))
            .andExpect(status().isCreated());

        // Validate the TestManyToOne in the database
        List<TestManyToOne> testManyToOneList = testManyToOneRepository.findAll();
        assertThat(testManyToOneList).hasSize(databaseSizeBeforeCreate + 1);
        TestManyToOne testTestManyToOne = testManyToOneList.get(testManyToOneList.size() - 1);
    }

    @Test
    @Transactional
    public void createTestManyToOneWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testManyToOneRepository.findAll().size();

        // Create the TestManyToOne with an existing ID
        testManyToOne.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestManyToOneMockMvc.perform(post("/api/test-many-to-ones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testManyToOne)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<TestManyToOne> testManyToOneList = testManyToOneRepository.findAll();
        assertThat(testManyToOneList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTestManyToOnes() throws Exception {
        // Initialize the database
        testManyToOneRepository.saveAndFlush(testManyToOne);

        // Get all the testManyToOneList
        restTestManyToOneMockMvc.perform(get("/api/test-many-to-ones?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testManyToOne.getId().intValue())));
    }

    @Test
    @Transactional
    public void getTestManyToOne() throws Exception {
        // Initialize the database
        testManyToOneRepository.saveAndFlush(testManyToOne);

        // Get the testManyToOne
        restTestManyToOneMockMvc.perform(get("/api/test-many-to-ones/{id}", testManyToOne.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testManyToOne.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTestManyToOne() throws Exception {
        // Get the testManyToOne
        restTestManyToOneMockMvc.perform(get("/api/test-many-to-ones/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestManyToOne() throws Exception {
        // Initialize the database
        testManyToOneRepository.saveAndFlush(testManyToOne);
        int databaseSizeBeforeUpdate = testManyToOneRepository.findAll().size();

        // Update the testManyToOne
        TestManyToOne updatedTestManyToOne = testManyToOneRepository.findOne(testManyToOne.getId());

        restTestManyToOneMockMvc.perform(put("/api/test-many-to-ones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestManyToOne)))
            .andExpect(status().isOk());

        // Validate the TestManyToOne in the database
        List<TestManyToOne> testManyToOneList = testManyToOneRepository.findAll();
        assertThat(testManyToOneList).hasSize(databaseSizeBeforeUpdate);
        TestManyToOne testTestManyToOne = testManyToOneList.get(testManyToOneList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingTestManyToOne() throws Exception {
        int databaseSizeBeforeUpdate = testManyToOneRepository.findAll().size();

        // Create the TestManyToOne

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTestManyToOneMockMvc.perform(put("/api/test-many-to-ones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testManyToOne)))
            .andExpect(status().isCreated());

        // Validate the TestManyToOne in the database
        List<TestManyToOne> testManyToOneList = testManyToOneRepository.findAll();
        assertThat(testManyToOneList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTestManyToOne() throws Exception {
        // Initialize the database
        testManyToOneRepository.saveAndFlush(testManyToOne);
        int databaseSizeBeforeDelete = testManyToOneRepository.findAll().size();

        // Get the testManyToOne
        restTestManyToOneMockMvc.perform(delete("/api/test-many-to-ones/{id}", testManyToOne.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestManyToOne> testManyToOneList = testManyToOneRepository.findAll();
        assertThat(testManyToOneList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestManyToOne.class);
        TestManyToOne testManyToOne1 = new TestManyToOne();
        testManyToOne1.setId(1L);
        TestManyToOne testManyToOne2 = new TestManyToOne();
        testManyToOne2.setId(testManyToOne1.getId());
        assertThat(testManyToOne1).isEqualTo(testManyToOne2);
        testManyToOne2.setId(2L);
        assertThat(testManyToOne1).isNotEqualTo(testManyToOne2);
        testManyToOne1.setId(null);
        assertThat(testManyToOne1).isNotEqualTo(testManyToOne2);
    }
}
