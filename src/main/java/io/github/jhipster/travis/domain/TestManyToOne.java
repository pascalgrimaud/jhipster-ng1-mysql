package io.github.jhipster.travis.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A TestManyToOne.
 */
@Entity
@Table(name = "test_many_to_one")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TestManyToOne implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private TestEntity testEntity;

    @ManyToOne
    private TestMapstruct testMapstruct;

    @ManyToOne
    private TestServiceClass testServiceClass;

    @ManyToOne
    private TestServiceImpl testServiceImpl;

    @ManyToOne
    private TestInfiniteScroll testInfiniteScroll;

    @ManyToOne
    private TestPager testPager;

    @ManyToOne
    private TestPagination testPagination;

    @ManyToOne
    private TestCustomTableName testCustomTableName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TestEntity getTestEntity() {
        return testEntity;
    }

    public TestManyToOne testEntity(TestEntity testEntity) {
        this.testEntity = testEntity;
        return this;
    }

    public void setTestEntity(TestEntity testEntity) {
        this.testEntity = testEntity;
    }

    public TestMapstruct getTestMapstruct() {
        return testMapstruct;
    }

    public TestManyToOne testMapstruct(TestMapstruct testMapstruct) {
        this.testMapstruct = testMapstruct;
        return this;
    }

    public void setTestMapstruct(TestMapstruct testMapstruct) {
        this.testMapstruct = testMapstruct;
    }

    public TestServiceClass getTestServiceClass() {
        return testServiceClass;
    }

    public TestManyToOne testServiceClass(TestServiceClass testServiceClass) {
        this.testServiceClass = testServiceClass;
        return this;
    }

    public void setTestServiceClass(TestServiceClass testServiceClass) {
        this.testServiceClass = testServiceClass;
    }

    public TestServiceImpl getTestServiceImpl() {
        return testServiceImpl;
    }

    public TestManyToOne testServiceImpl(TestServiceImpl testServiceImpl) {
        this.testServiceImpl = testServiceImpl;
        return this;
    }

    public void setTestServiceImpl(TestServiceImpl testServiceImpl) {
        this.testServiceImpl = testServiceImpl;
    }

    public TestInfiniteScroll getTestInfiniteScroll() {
        return testInfiniteScroll;
    }

    public TestManyToOne testInfiniteScroll(TestInfiniteScroll testInfiniteScroll) {
        this.testInfiniteScroll = testInfiniteScroll;
        return this;
    }

    public void setTestInfiniteScroll(TestInfiniteScroll testInfiniteScroll) {
        this.testInfiniteScroll = testInfiniteScroll;
    }

    public TestPager getTestPager() {
        return testPager;
    }

    public TestManyToOne testPager(TestPager testPager) {
        this.testPager = testPager;
        return this;
    }

    public void setTestPager(TestPager testPager) {
        this.testPager = testPager;
    }

    public TestPagination getTestPagination() {
        return testPagination;
    }

    public TestManyToOne testPagination(TestPagination testPagination) {
        this.testPagination = testPagination;
        return this;
    }

    public void setTestPagination(TestPagination testPagination) {
        this.testPagination = testPagination;
    }

    public TestCustomTableName getTestCustomTableName() {
        return testCustomTableName;
    }

    public TestManyToOne testCustomTableName(TestCustomTableName testCustomTableName) {
        this.testCustomTableName = testCustomTableName;
        return this;
    }

    public void setTestCustomTableName(TestCustomTableName testCustomTableName) {
        this.testCustomTableName = testCustomTableName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TestManyToOne testManyToOne = (TestManyToOne) o;
        if (testManyToOne.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testManyToOne.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestManyToOne{" +
            "id=" + getId() +
            "}";
    }
}
