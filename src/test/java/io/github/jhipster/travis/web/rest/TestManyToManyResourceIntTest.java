package io.github.jhipster.travis.web.rest;

import io.github.jhipster.travis.TravisMysqlApp;

import io.github.jhipster.travis.domain.TestManyToMany;
import io.github.jhipster.travis.repository.TestManyToManyRepository;
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
 * Test class for the TestManyToManyResource REST controller.
 *
 * @see TestManyToManyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisMysqlApp.class)
public class TestManyToManyResourceIntTest {

    @Autowired
    private TestManyToManyRepository testManyToManyRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestManyToManyMockMvc;

    private TestManyToMany testManyToMany;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TestManyToManyResource testManyToManyResource = new TestManyToManyResource(testManyToManyRepository);
        this.restTestManyToManyMockMvc = MockMvcBuilders.standaloneSetup(testManyToManyResource)
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
    public static TestManyToMany createEntity(EntityManager em) {
        TestManyToMany testManyToMany = new TestManyToMany();
        return testManyToMany;
    }

    @Before
    public void initTest() {
        testManyToMany = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestManyToMany() throws Exception {
        int databaseSizeBeforeCreate = testManyToManyRepository.findAll().size();

        // Create the TestManyToMany
        restTestManyToManyMockMvc.perform(post("/api/test-many-to-manies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testManyToMany)))
            .andExpect(status().isCreated());

        // Validate the TestManyToMany in the database
        List<TestManyToMany> testManyToManyList = testManyToManyRepository.findAll();
        assertThat(testManyToManyList).hasSize(databaseSizeBeforeCreate + 1);
        TestManyToMany testTestManyToMany = testManyToManyList.get(testManyToManyList.size() - 1);
    }

    @Test
    @Transactional
    public void createTestManyToManyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testManyToManyRepository.findAll().size();

        // Create the TestManyToMany with an existing ID
        testManyToMany.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestManyToManyMockMvc.perform(post("/api/test-many-to-manies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testManyToMany)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<TestManyToMany> testManyToManyList = testManyToManyRepository.findAll();
        assertThat(testManyToManyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTestManyToManies() throws Exception {
        // Initialize the database
        testManyToManyRepository.saveAndFlush(testManyToMany);

        // Get all the testManyToManyList
        restTestManyToManyMockMvc.perform(get("/api/test-many-to-manies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testManyToMany.getId().intValue())));
    }

    @Test
    @Transactional
    public void getTestManyToMany() throws Exception {
        // Initialize the database
        testManyToManyRepository.saveAndFlush(testManyToMany);

        // Get the testManyToMany
        restTestManyToManyMockMvc.perform(get("/api/test-many-to-manies/{id}", testManyToMany.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testManyToMany.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTestManyToMany() throws Exception {
        // Get the testManyToMany
        restTestManyToManyMockMvc.perform(get("/api/test-many-to-manies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestManyToMany() throws Exception {
        // Initialize the database
        testManyToManyRepository.saveAndFlush(testManyToMany);
        int databaseSizeBeforeUpdate = testManyToManyRepository.findAll().size();

        // Update the testManyToMany
        TestManyToMany updatedTestManyToMany = testManyToManyRepository.findOne(testManyToMany.getId());

        restTestManyToManyMockMvc.perform(put("/api/test-many-to-manies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestManyToMany)))
            .andExpect(status().isOk());

        // Validate the TestManyToMany in the database
        List<TestManyToMany> testManyToManyList = testManyToManyRepository.findAll();
        assertThat(testManyToManyList).hasSize(databaseSizeBeforeUpdate);
        TestManyToMany testTestManyToMany = testManyToManyList.get(testManyToManyList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingTestManyToMany() throws Exception {
        int databaseSizeBeforeUpdate = testManyToManyRepository.findAll().size();

        // Create the TestManyToMany

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTestManyToManyMockMvc.perform(put("/api/test-many-to-manies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testManyToMany)))
            .andExpect(status().isCreated());

        // Validate the TestManyToMany in the database
        List<TestManyToMany> testManyToManyList = testManyToManyRepository.findAll();
        assertThat(testManyToManyList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTestManyToMany() throws Exception {
        // Initialize the database
        testManyToManyRepository.saveAndFlush(testManyToMany);
        int databaseSizeBeforeDelete = testManyToManyRepository.findAll().size();

        // Get the testManyToMany
        restTestManyToManyMockMvc.perform(delete("/api/test-many-to-manies/{id}", testManyToMany.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestManyToMany> testManyToManyList = testManyToManyRepository.findAll();
        assertThat(testManyToManyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestManyToMany.class);
        TestManyToMany testManyToMany1 = new TestManyToMany();
        testManyToMany1.setId(1L);
        TestManyToMany testManyToMany2 = new TestManyToMany();
        testManyToMany2.setId(testManyToMany1.getId());
        assertThat(testManyToMany1).isEqualTo(testManyToMany2);
        testManyToMany2.setId(2L);
        assertThat(testManyToMany1).isNotEqualTo(testManyToMany2);
        testManyToMany1.setId(null);
        assertThat(testManyToMany1).isNotEqualTo(testManyToMany2);
    }
}
