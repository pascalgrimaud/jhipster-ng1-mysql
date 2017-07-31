package io.github.jhipster.travis.web.rest;

import io.github.jhipster.travis.TravisMysqlApp;

import io.github.jhipster.travis.domain.TestServiceImpl;
import io.github.jhipster.travis.repository.TestServiceImplRepository;
import io.github.jhipster.travis.service.TestServiceImplService;
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
 * Test class for the TestServiceImplResource REST controller.
 *
 * @see TestServiceImplResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisMysqlApp.class)
public class TestServiceImplResourceIntTest {

    @Autowired
    private TestServiceImplRepository testServiceImplRepository;

    @Autowired
    private TestServiceImplService testServiceImplService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestServiceImplMockMvc;

    private TestServiceImpl testServiceImpl;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TestServiceImplResource testServiceImplResource = new TestServiceImplResource(testServiceImplService);
        this.restTestServiceImplMockMvc = MockMvcBuilders.standaloneSetup(testServiceImplResource)
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
    public static TestServiceImpl createEntity(EntityManager em) {
        TestServiceImpl testServiceImpl = new TestServiceImpl();
        return testServiceImpl;
    }

    @Before
    public void initTest() {
        testServiceImpl = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestServiceImpl() throws Exception {
        int databaseSizeBeforeCreate = testServiceImplRepository.findAll().size();

        // Create the TestServiceImpl
        restTestServiceImplMockMvc.perform(post("/api/test-service-impls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testServiceImpl)))
            .andExpect(status().isCreated());

        // Validate the TestServiceImpl in the database
        List<TestServiceImpl> testServiceImplList = testServiceImplRepository.findAll();
        assertThat(testServiceImplList).hasSize(databaseSizeBeforeCreate + 1);
        TestServiceImpl testTestServiceImpl = testServiceImplList.get(testServiceImplList.size() - 1);
    }

    @Test
    @Transactional
    public void createTestServiceImplWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testServiceImplRepository.findAll().size();

        // Create the TestServiceImpl with an existing ID
        testServiceImpl.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestServiceImplMockMvc.perform(post("/api/test-service-impls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testServiceImpl)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<TestServiceImpl> testServiceImplList = testServiceImplRepository.findAll();
        assertThat(testServiceImplList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTestServiceImpls() throws Exception {
        // Initialize the database
        testServiceImplRepository.saveAndFlush(testServiceImpl);

        // Get all the testServiceImplList
        restTestServiceImplMockMvc.perform(get("/api/test-service-impls?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testServiceImpl.getId().intValue())));
    }

    @Test
    @Transactional
    public void getTestServiceImpl() throws Exception {
        // Initialize the database
        testServiceImplRepository.saveAndFlush(testServiceImpl);

        // Get the testServiceImpl
        restTestServiceImplMockMvc.perform(get("/api/test-service-impls/{id}", testServiceImpl.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testServiceImpl.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTestServiceImpl() throws Exception {
        // Get the testServiceImpl
        restTestServiceImplMockMvc.perform(get("/api/test-service-impls/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestServiceImpl() throws Exception {
        // Initialize the database
        testServiceImplService.save(testServiceImpl);

        int databaseSizeBeforeUpdate = testServiceImplRepository.findAll().size();

        // Update the testServiceImpl
        TestServiceImpl updatedTestServiceImpl = testServiceImplRepository.findOne(testServiceImpl.getId());

        restTestServiceImplMockMvc.perform(put("/api/test-service-impls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestServiceImpl)))
            .andExpect(status().isOk());

        // Validate the TestServiceImpl in the database
        List<TestServiceImpl> testServiceImplList = testServiceImplRepository.findAll();
        assertThat(testServiceImplList).hasSize(databaseSizeBeforeUpdate);
        TestServiceImpl testTestServiceImpl = testServiceImplList.get(testServiceImplList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingTestServiceImpl() throws Exception {
        int databaseSizeBeforeUpdate = testServiceImplRepository.findAll().size();

        // Create the TestServiceImpl

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTestServiceImplMockMvc.perform(put("/api/test-service-impls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testServiceImpl)))
            .andExpect(status().isCreated());

        // Validate the TestServiceImpl in the database
        List<TestServiceImpl> testServiceImplList = testServiceImplRepository.findAll();
        assertThat(testServiceImplList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTestServiceImpl() throws Exception {
        // Initialize the database
        testServiceImplService.save(testServiceImpl);

        int databaseSizeBeforeDelete = testServiceImplRepository.findAll().size();

        // Get the testServiceImpl
        restTestServiceImplMockMvc.perform(delete("/api/test-service-impls/{id}", testServiceImpl.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestServiceImpl> testServiceImplList = testServiceImplRepository.findAll();
        assertThat(testServiceImplList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestServiceImpl.class);
        TestServiceImpl testServiceImpl1 = new TestServiceImpl();
        testServiceImpl1.setId(1L);
        TestServiceImpl testServiceImpl2 = new TestServiceImpl();
        testServiceImpl2.setId(testServiceImpl1.getId());
        assertThat(testServiceImpl1).isEqualTo(testServiceImpl2);
        testServiceImpl2.setId(2L);
        assertThat(testServiceImpl1).isNotEqualTo(testServiceImpl2);
        testServiceImpl1.setId(null);
        assertThat(testServiceImpl1).isNotEqualTo(testServiceImpl2);
    }
}
