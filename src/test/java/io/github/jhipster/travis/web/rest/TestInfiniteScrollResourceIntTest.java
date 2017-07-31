package io.github.jhipster.travis.web.rest;

import io.github.jhipster.travis.TravisMysqlApp;

import io.github.jhipster.travis.domain.TestInfiniteScroll;
import io.github.jhipster.travis.repository.TestInfiniteScrollRepository;
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
 * Test class for the TestInfiniteScrollResource REST controller.
 *
 * @see TestInfiniteScrollResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisMysqlApp.class)
public class TestInfiniteScrollResourceIntTest {

    @Autowired
    private TestInfiniteScrollRepository testInfiniteScrollRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestInfiniteScrollMockMvc;

    private TestInfiniteScroll testInfiniteScroll;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TestInfiniteScrollResource testInfiniteScrollResource = new TestInfiniteScrollResource(testInfiniteScrollRepository);
        this.restTestInfiniteScrollMockMvc = MockMvcBuilders.standaloneSetup(testInfiniteScrollResource)
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
    public static TestInfiniteScroll createEntity(EntityManager em) {
        TestInfiniteScroll testInfiniteScroll = new TestInfiniteScroll();
        return testInfiniteScroll;
    }

    @Before
    public void initTest() {
        testInfiniteScroll = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestInfiniteScroll() throws Exception {
        int databaseSizeBeforeCreate = testInfiniteScrollRepository.findAll().size();

        // Create the TestInfiniteScroll
        restTestInfiniteScrollMockMvc.perform(post("/api/test-infinite-scrolls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testInfiniteScroll)))
            .andExpect(status().isCreated());

        // Validate the TestInfiniteScroll in the database
        List<TestInfiniteScroll> testInfiniteScrollList = testInfiniteScrollRepository.findAll();
        assertThat(testInfiniteScrollList).hasSize(databaseSizeBeforeCreate + 1);
        TestInfiniteScroll testTestInfiniteScroll = testInfiniteScrollList.get(testInfiniteScrollList.size() - 1);
    }

    @Test
    @Transactional
    public void createTestInfiniteScrollWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testInfiniteScrollRepository.findAll().size();

        // Create the TestInfiniteScroll with an existing ID
        testInfiniteScroll.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestInfiniteScrollMockMvc.perform(post("/api/test-infinite-scrolls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testInfiniteScroll)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<TestInfiniteScroll> testInfiniteScrollList = testInfiniteScrollRepository.findAll();
        assertThat(testInfiniteScrollList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTestInfiniteScrolls() throws Exception {
        // Initialize the database
        testInfiniteScrollRepository.saveAndFlush(testInfiniteScroll);

        // Get all the testInfiniteScrollList
        restTestInfiniteScrollMockMvc.perform(get("/api/test-infinite-scrolls?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testInfiniteScroll.getId().intValue())));
    }

    @Test
    @Transactional
    public void getTestInfiniteScroll() throws Exception {
        // Initialize the database
        testInfiniteScrollRepository.saveAndFlush(testInfiniteScroll);

        // Get the testInfiniteScroll
        restTestInfiniteScrollMockMvc.perform(get("/api/test-infinite-scrolls/{id}", testInfiniteScroll.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testInfiniteScroll.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTestInfiniteScroll() throws Exception {
        // Get the testInfiniteScroll
        restTestInfiniteScrollMockMvc.perform(get("/api/test-infinite-scrolls/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestInfiniteScroll() throws Exception {
        // Initialize the database
        testInfiniteScrollRepository.saveAndFlush(testInfiniteScroll);
        int databaseSizeBeforeUpdate = testInfiniteScrollRepository.findAll().size();

        // Update the testInfiniteScroll
        TestInfiniteScroll updatedTestInfiniteScroll = testInfiniteScrollRepository.findOne(testInfiniteScroll.getId());

        restTestInfiniteScrollMockMvc.perform(put("/api/test-infinite-scrolls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestInfiniteScroll)))
            .andExpect(status().isOk());

        // Validate the TestInfiniteScroll in the database
        List<TestInfiniteScroll> testInfiniteScrollList = testInfiniteScrollRepository.findAll();
        assertThat(testInfiniteScrollList).hasSize(databaseSizeBeforeUpdate);
        TestInfiniteScroll testTestInfiniteScroll = testInfiniteScrollList.get(testInfiniteScrollList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingTestInfiniteScroll() throws Exception {
        int databaseSizeBeforeUpdate = testInfiniteScrollRepository.findAll().size();

        // Create the TestInfiniteScroll

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTestInfiniteScrollMockMvc.perform(put("/api/test-infinite-scrolls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testInfiniteScroll)))
            .andExpect(status().isCreated());

        // Validate the TestInfiniteScroll in the database
        List<TestInfiniteScroll> testInfiniteScrollList = testInfiniteScrollRepository.findAll();
        assertThat(testInfiniteScrollList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTestInfiniteScroll() throws Exception {
        // Initialize the database
        testInfiniteScrollRepository.saveAndFlush(testInfiniteScroll);
        int databaseSizeBeforeDelete = testInfiniteScrollRepository.findAll().size();

        // Get the testInfiniteScroll
        restTestInfiniteScrollMockMvc.perform(delete("/api/test-infinite-scrolls/{id}", testInfiniteScroll.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestInfiniteScroll> testInfiniteScrollList = testInfiniteScrollRepository.findAll();
        assertThat(testInfiniteScrollList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestInfiniteScroll.class);
        TestInfiniteScroll testInfiniteScroll1 = new TestInfiniteScroll();
        testInfiniteScroll1.setId(1L);
        TestInfiniteScroll testInfiniteScroll2 = new TestInfiniteScroll();
        testInfiniteScroll2.setId(testInfiniteScroll1.getId());
        assertThat(testInfiniteScroll1).isEqualTo(testInfiniteScroll2);
        testInfiniteScroll2.setId(2L);
        assertThat(testInfiniteScroll1).isNotEqualTo(testInfiniteScroll2);
        testInfiniteScroll1.setId(null);
        assertThat(testInfiniteScroll1).isNotEqualTo(testInfiniteScroll2);
    }
}
