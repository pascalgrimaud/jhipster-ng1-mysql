package io.github.jhipster.travis.web.rest;

import io.github.jhipster.travis.TravisMysqlApp;

import io.github.jhipster.travis.domain.TestPager;
import io.github.jhipster.travis.repository.TestPagerRepository;
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
 * Test class for the TestPagerResource REST controller.
 *
 * @see TestPagerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisMysqlApp.class)
public class TestPagerResourceIntTest {

    @Autowired
    private TestPagerRepository testPagerRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestPagerMockMvc;

    private TestPager testPager;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TestPagerResource testPagerResource = new TestPagerResource(testPagerRepository);
        this.restTestPagerMockMvc = MockMvcBuilders.standaloneSetup(testPagerResource)
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
    public static TestPager createEntity(EntityManager em) {
        TestPager testPager = new TestPager();
        return testPager;
    }

    @Before
    public void initTest() {
        testPager = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestPager() throws Exception {
        int databaseSizeBeforeCreate = testPagerRepository.findAll().size();

        // Create the TestPager
        restTestPagerMockMvc.perform(post("/api/test-pagers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testPager)))
            .andExpect(status().isCreated());

        // Validate the TestPager in the database
        List<TestPager> testPagerList = testPagerRepository.findAll();
        assertThat(testPagerList).hasSize(databaseSizeBeforeCreate + 1);
        TestPager testTestPager = testPagerList.get(testPagerList.size() - 1);
    }

    @Test
    @Transactional
    public void createTestPagerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testPagerRepository.findAll().size();

        // Create the TestPager with an existing ID
        testPager.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestPagerMockMvc.perform(post("/api/test-pagers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testPager)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<TestPager> testPagerList = testPagerRepository.findAll();
        assertThat(testPagerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTestPagers() throws Exception {
        // Initialize the database
        testPagerRepository.saveAndFlush(testPager);

        // Get all the testPagerList
        restTestPagerMockMvc.perform(get("/api/test-pagers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testPager.getId().intValue())));
    }

    @Test
    @Transactional
    public void getTestPager() throws Exception {
        // Initialize the database
        testPagerRepository.saveAndFlush(testPager);

        // Get the testPager
        restTestPagerMockMvc.perform(get("/api/test-pagers/{id}", testPager.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testPager.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTestPager() throws Exception {
        // Get the testPager
        restTestPagerMockMvc.perform(get("/api/test-pagers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestPager() throws Exception {
        // Initialize the database
        testPagerRepository.saveAndFlush(testPager);
        int databaseSizeBeforeUpdate = testPagerRepository.findAll().size();

        // Update the testPager
        TestPager updatedTestPager = testPagerRepository.findOne(testPager.getId());

        restTestPagerMockMvc.perform(put("/api/test-pagers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestPager)))
            .andExpect(status().isOk());

        // Validate the TestPager in the database
        List<TestPager> testPagerList = testPagerRepository.findAll();
        assertThat(testPagerList).hasSize(databaseSizeBeforeUpdate);
        TestPager testTestPager = testPagerList.get(testPagerList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingTestPager() throws Exception {
        int databaseSizeBeforeUpdate = testPagerRepository.findAll().size();

        // Create the TestPager

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTestPagerMockMvc.perform(put("/api/test-pagers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testPager)))
            .andExpect(status().isCreated());

        // Validate the TestPager in the database
        List<TestPager> testPagerList = testPagerRepository.findAll();
        assertThat(testPagerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTestPager() throws Exception {
        // Initialize the database
        testPagerRepository.saveAndFlush(testPager);
        int databaseSizeBeforeDelete = testPagerRepository.findAll().size();

        // Get the testPager
        restTestPagerMockMvc.perform(delete("/api/test-pagers/{id}", testPager.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestPager> testPagerList = testPagerRepository.findAll();
        assertThat(testPagerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestPager.class);
        TestPager testPager1 = new TestPager();
        testPager1.setId(1L);
        TestPager testPager2 = new TestPager();
        testPager2.setId(testPager1.getId());
        assertThat(testPager1).isEqualTo(testPager2);
        testPager2.setId(2L);
        assertThat(testPager1).isNotEqualTo(testPager2);
        testPager1.setId(null);
        assertThat(testPager1).isNotEqualTo(testPager2);
    }
}
