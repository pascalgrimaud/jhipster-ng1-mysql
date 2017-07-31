package io.github.jhipster.travis.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A TestTwoRelationshipsSameEntity.
 */
@Entity
@Table(name = "test_multiple_rel")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TestTwoRelationshipsSameEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private TestEntity firstRelationship;

    @ManyToOne
    private TestEntity secondRelationship;

    @OneToOne
    @JoinColumn(unique = true)
    private User userOne;

    @OneToOne
    @JoinColumn(unique = true)
    private User userTwo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TestEntity getFirstRelationship() {
        return firstRelationship;
    }

    public TestTwoRelationshipsSameEntity firstRelationship(TestEntity testEntity) {
        this.firstRelationship = testEntity;
        return this;
    }

    public void setFirstRelationship(TestEntity testEntity) {
        this.firstRelationship = testEntity;
    }

    public TestEntity getSecondRelationship() {
        return secondRelationship;
    }

    public TestTwoRelationshipsSameEntity secondRelationship(TestEntity testEntity) {
        this.secondRelationship = testEntity;
        return this;
    }

    public void setSecondRelationship(TestEntity testEntity) {
        this.secondRelationship = testEntity;
    }

    public User getUserOne() {
        return userOne;
    }

    public TestTwoRelationshipsSameEntity userOne(User user) {
        this.userOne = user;
        return this;
    }

    public void setUserOne(User user) {
        this.userOne = user;
    }

    public User getUserTwo() {
        return userTwo;
    }

    public TestTwoRelationshipsSameEntity userTwo(User user) {
        this.userTwo = user;
        return this;
    }

    public void setUserTwo(User user) {
        this.userTwo = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TestTwoRelationshipsSameEntity testTwoRelationshipsSameEntity = (TestTwoRelationshipsSameEntity) o;
        if (testTwoRelationshipsSameEntity.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testTwoRelationshipsSameEntity.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestTwoRelationshipsSameEntity{" +
            "id=" + getId() +
            "}";
    }
}
