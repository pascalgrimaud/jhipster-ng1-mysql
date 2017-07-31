package io.github.jhipster.travis.web.rest;

import io.github.jhipster.travis.TravisMysqlApp;

import io.github.jhipster.travis.domain.TestServiceClass;
import io.github.jhipster.travis.repository.TestServiceClassRepository;
import io.github.jhipster.travis.service.TestServiceClassService;
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
 * Test class for the TestServiceClassResource REST controller.
 *
 * @see TestServiceClassResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisMysqlApp.class)
public class TestServiceClassResourceIntTest {

    @Autowired
    private TestServiceClassRepository testServiceClassRepository;

    @Autowired
    private TestServiceClassService testServiceClassService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestServiceClassMockMvc;

    private TestServiceClass testServiceClass;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TestServiceClassResource testServiceClassResource = new TestServiceClassResource(testServiceClassService);
        this.restTestServiceClassMockMvc = MockMvcBuilders.standaloneSetup(testServiceClassResource)
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
    public static TestServiceClass createEntity(EntityManager em) {
        TestServiceClass testServiceClass = new TestServiceClass();
        return testServiceClass;
    }

    @Before
    public void initTest() {
        testServiceClass = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestServiceClass() throws Exception {
        int databaseSizeBeforeCreate = testServiceClassRepository.findAll().size();

        // Create the TestServiceClass
        restTestServiceClassMockMvc.perform(post("/api/test-service-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testServiceClass)))
            .andExpect(status().isCreated());

        // Validate the TestServiceClass in the database
        List<TestServiceClass> testServiceClassList = testServiceClassRepository.findAll();
        assertThat(testServiceClassList).hasSize(databaseSizeBeforeCreate + 1);
        TestServiceClass testTestServiceClass = testServiceClassList.get(testServiceClassList.size() - 1);
    }

    @Test
    @Transactional
    public void createTestServiceClassWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testServiceClassRepository.findAll().size();

        // Create the TestServiceClass with an existing ID
        testServiceClass.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestServiceClassMockMvc.perform(post("/api/test-service-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testServiceClass)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<TestServiceClass> testServiceClassList = testServiceClassRepository.findAll();
        assertThat(testServiceClassList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTestServiceClasses() throws Exception {
        // Initialize the database
        testServiceClassRepository.saveAndFlush(testServiceClass);

        // Get all the testServiceClassList
        restTestServiceClassMockMvc.perform(get("/api/test-service-classes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testServiceClass.getId().intValue())));
    }

    @Test
    @Transactional
    public void getTestServiceClass() throws Exception {
        // Initialize the database
        testServiceClassRepository.saveAndFlush(testServiceClass);

        // Get the testServiceClass
        restTestServiceClassMockMvc.perform(get("/api/test-service-classes/{id}", testServiceClass.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testServiceClass.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTestServiceClass() throws Exception {
        // Get the testServiceClass
        restTestServiceClassMockMvc.perform(get("/api/test-service-classes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestServiceClass() throws Exception {
        // Initialize the database
        testServiceClassService.save(testServiceClass);

        int databaseSizeBeforeUpdate = testServiceClassRepository.findAll().size();

        // Update the testServiceClass
        TestServiceClass updatedTestServiceClass = testServiceClassRepository.findOne(testServiceClass.getId());

        restTestServiceClassMockMvc.perform(put("/api/test-service-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestServiceClass)))
            .andExpect(status().isOk());

        // Validate the TestServiceClass in the database
        List<TestServiceClass> testServiceClassList = testServiceClassRepository.findAll();
        assertThat(testServiceClassList).hasSize(databaseSizeBeforeUpdate);
        TestServiceClass testTestServiceClass = testServiceClassList.get(testServiceClassList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingTestServiceClass() throws Exception {
        int databaseSizeBeforeUpdate = testServiceClassRepository.findAll().size();

        // Create the TestServiceClass

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTestServiceClassMockMvc.perform(put("/api/test-service-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testServiceClass)))
            .andExpect(status().isCreated());

        // Validate the TestServiceClass in the database
        List<TestServiceClass> testServiceClassList = testServiceClassRepository.findAll();
        assertThat(testServiceClassList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTestServiceClass() throws Exception {
        // Initialize the database
        testServiceClassService.save(testServiceClass);

        int databaseSizeBeforeDelete = testServiceClassRepository.findAll().size();

        // Get the testServiceClass
        restTestServiceClassMockMvc.perform(delete("/api/test-service-classes/{id}", testServiceClass.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestServiceClass> testServiceClassList = testServiceClassRepository.findAll();
        assertThat(testServiceClassList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestServiceClass.class);
        TestServiceClass testServiceClass1 = new TestServiceClass();
        testServiceClass1.setId(1L);
        TestServiceClass testServiceClass2 = new TestServiceClass();
        testServiceClass2.setId(testServiceClass1.getId());
        assertThat(testServiceClass1).isEqualTo(testServiceClass2);
        testServiceClass2.setId(2L);
        assertThat(testServiceClass1).isNotEqualTo(testServiceClass2);
        testServiceClass1.setId(null);
        assertThat(testServiceClass1).isNotEqualTo(testServiceClass2);
    }
}
