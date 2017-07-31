package io.github.jhipster.travis.web.rest;

import io.github.jhipster.travis.TravisMysqlApp;

import io.github.jhipster.travis.domain.TestMapstruct;
import io.github.jhipster.travis.repository.TestMapstructRepository;
import io.github.jhipster.travis.service.dto.TestMapstructDTO;
import io.github.jhipster.travis.service.mapper.TestMapstructMapper;
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
 * Test class for the TestMapstructResource REST controller.
 *
 * @see TestMapstructResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisMysqlApp.class)
public class TestMapstructResourceIntTest {

    @Autowired
    private TestMapstructRepository testMapstructRepository;

    @Autowired
    private TestMapstructMapper testMapstructMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestMapstructMockMvc;

    private TestMapstruct testMapstruct;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TestMapstructResource testMapstructResource = new TestMapstructResource(testMapstructRepository, testMapstructMapper);
        this.restTestMapstructMockMvc = MockMvcBuilders.standaloneSetup(testMapstructResource)
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
    public static TestMapstruct createEntity(EntityManager em) {
        TestMapstruct testMapstruct = new TestMapstruct();
        return testMapstruct;
    }

    @Before
    public void initTest() {
        testMapstruct = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestMapstruct() throws Exception {
        int databaseSizeBeforeCreate = testMapstructRepository.findAll().size();

        // Create the TestMapstruct
        TestMapstructDTO testMapstructDTO = testMapstructMapper.toDto(testMapstruct);
        restTestMapstructMockMvc.perform(post("/api/test-mapstructs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testMapstructDTO)))
            .andExpect(status().isCreated());

        // Validate the TestMapstruct in the database
        List<TestMapstruct> testMapstructList = testMapstructRepository.findAll();
        assertThat(testMapstructList).hasSize(databaseSizeBeforeCreate + 1);
        TestMapstruct testTestMapstruct = testMapstructList.get(testMapstructList.size() - 1);
    }

    @Test
    @Transactional
    public void createTestMapstructWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testMapstructRepository.findAll().size();

        // Create the TestMapstruct with an existing ID
        testMapstruct.setId(1L);
        TestMapstructDTO testMapstructDTO = testMapstructMapper.toDto(testMapstruct);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestMapstructMockMvc.perform(post("/api/test-mapstructs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testMapstructDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<TestMapstruct> testMapstructList = testMapstructRepository.findAll();
        assertThat(testMapstructList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTestMapstructs() throws Exception {
        // Initialize the database
        testMapstructRepository.saveAndFlush(testMapstruct);

        // Get all the testMapstructList
        restTestMapstructMockMvc.perform(get("/api/test-mapstructs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testMapstruct.getId().intValue())));
    }

    @Test
    @Transactional
    public void getTestMapstruct() throws Exception {
        // Initialize the database
        testMapstructRepository.saveAndFlush(testMapstruct);

        // Get the testMapstruct
        restTestMapstructMockMvc.perform(get("/api/test-mapstructs/{id}", testMapstruct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testMapstruct.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTestMapstruct() throws Exception {
        // Get the testMapstruct
        restTestMapstructMockMvc.perform(get("/api/test-mapstructs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestMapstruct() throws Exception {
        // Initialize the database
        testMapstructRepository.saveAndFlush(testMapstruct);
        int databaseSizeBeforeUpdate = testMapstructRepository.findAll().size();

        // Update the testMapstruct
        TestMapstruct updatedTestMapstruct = testMapstructRepository.findOne(testMapstruct.getId());
        TestMapstructDTO testMapstructDTO = testMapstructMapper.toDto(updatedTestMapstruct);

        restTestMapstructMockMvc.perform(put("/api/test-mapstructs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testMapstructDTO)))
            .andExpect(status().isOk());

        // Validate the TestMapstruct in the database
        List<TestMapstruct> testMapstructList = testMapstructRepository.findAll();
        assertThat(testMapstructList).hasSize(databaseSizeBeforeUpdate);
        TestMapstruct testTestMapstruct = testMapstructList.get(testMapstructList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingTestMapstruct() throws Exception {
        int databaseSizeBeforeUpdate = testMapstructRepository.findAll().size();

        // Create the TestMapstruct
        TestMapstructDTO testMapstructDTO = testMapstructMapper.toDto(testMapstruct);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTestMapstructMockMvc.perform(put("/api/test-mapstructs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testMapstructDTO)))
            .andExpect(status().isCreated());

        // Validate the TestMapstruct in the database
        List<TestMapstruct> testMapstructList = testMapstructRepository.findAll();
        assertThat(testMapstructList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTestMapstruct() throws Exception {
        // Initialize the database
        testMapstructRepository.saveAndFlush(testMapstruct);
        int databaseSizeBeforeDelete = testMapstructRepository.findAll().size();

        // Get the testMapstruct
        restTestMapstructMockMvc.perform(delete("/api/test-mapstructs/{id}", testMapstruct.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestMapstruct> testMapstructList = testMapstructRepository.findAll();
        assertThat(testMapstructList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestMapstruct.class);
        TestMapstruct testMapstruct1 = new TestMapstruct();
        testMapstruct1.setId(1L);
        TestMapstruct testMapstruct2 = new TestMapstruct();
        testMapstruct2.setId(testMapstruct1.getId());
        assertThat(testMapstruct1).isEqualTo(testMapstruct2);
        testMapstruct2.setId(2L);
        assertThat(testMapstruct1).isNotEqualTo(testMapstruct2);
        testMapstruct1.setId(null);
        assertThat(testMapstruct1).isNotEqualTo(testMapstruct2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestMapstructDTO.class);
        TestMapstructDTO testMapstructDTO1 = new TestMapstructDTO();
        testMapstructDTO1.setId(1L);
        TestMapstructDTO testMapstructDTO2 = new TestMapstructDTO();
        assertThat(testMapstructDTO1).isNotEqualTo(testMapstructDTO2);
        testMapstructDTO2.setId(testMapstructDTO1.getId());
        assertThat(testMapstructDTO1).isEqualTo(testMapstructDTO2);
        testMapstructDTO2.setId(2L);
        assertThat(testMapstructDTO1).isNotEqualTo(testMapstructDTO2);
        testMapstructDTO1.setId(null);
        assertThat(testMapstructDTO1).isNotEqualTo(testMapstructDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(testMapstructMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(testMapstructMapper.fromId(null)).isNull();
    }
}
