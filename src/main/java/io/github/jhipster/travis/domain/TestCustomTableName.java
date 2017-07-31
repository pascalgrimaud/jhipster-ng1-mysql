package io.github.jhipster.travis.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TestCustomTableName.
 */
@Entity
@Table(name = "test_custom_table_name_entity")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TestCustomTableName implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "testCustomTableName")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TestManyToOne> testManyToOnes = new HashSet<>();

    @ManyToMany(mappedBy = "testCustomTableNames")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TestManyToMany> testManyToManies = new HashSet<>();

    @OneToOne(mappedBy = "testCustomTableName")
    @JsonIgnore
    private TestOneToOne testOneToOne;

    @ManyToOne(optional = false)
    @NotNull
    private TestEntity testEntity;

    @ManyToOne
    private User userOneToMany;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "test_custom_table_name_user_many_to_many",
               joinColumns = @JoinColumn(name="test_custom_table_names_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="user_many_to_manies_id", referencedColumnName="id"))
    private Set<User> userManyToManies = new HashSet<>();

    @OneToOne
    @JoinColumn(unique = true)
    private User userOneToOne;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<TestManyToOne> getTestManyToOnes() {
        return testManyToOnes;
    }

    public TestCustomTableName testManyToOnes(Set<TestManyToOne> testManyToOnes) {
        this.testManyToOnes = testManyToOnes;
        return this;
    }

    public TestCustomTableName addTestManyToOne(TestManyToOne testManyToOne) {
        this.testManyToOnes.add(testManyToOne);
        testManyToOne.setTestCustomTableName(this);
        return this;
    }

    public TestCustomTableName removeTestManyToOne(TestManyToOne testManyToOne) {
        this.testManyToOnes.remove(testManyToOne);
        testManyToOne.setTestCustomTableName(null);
        return this;
    }

    public void setTestManyToOnes(Set<TestManyToOne> testManyToOnes) {
        this.testManyToOnes = testManyToOnes;
    }

    public Set<TestManyToMany> getTestManyToManies() {
        return testManyToManies;
    }

    public TestCustomTableName testManyToManies(Set<TestManyToMany> testManyToManies) {
        this.testManyToManies = testManyToManies;
        return this;
    }

    public TestCustomTableName addTestManyToMany(TestManyToMany testManyToMany) {
        this.testManyToManies.add(testManyToMany);
        testManyToMany.getTestCustomTableNames().add(this);
        return this;
    }

    public TestCustomTableName removeTestManyToMany(TestManyToMany testManyToMany) {
        this.testManyToManies.remove(testManyToMany);
        testManyToMany.getTestCustomTableNames().remove(this);
        return this;
    }

    public void setTestManyToManies(Set<TestManyToMany> testManyToManies) {
        this.testManyToManies = testManyToManies;
    }

    public TestOneToOne getTestOneToOne() {
        return testOneToOne;
    }

    public TestCustomTableName testOneToOne(TestOneToOne testOneToOne) {
        this.testOneToOne = testOneToOne;
        return this;
    }

    public void setTestOneToOne(TestOneToOne testOneToOne) {
        this.testOneToOne = testOneToOne;
    }

    public TestEntity getTestEntity() {
        return testEntity;
    }

    public TestCustomTableName testEntity(TestEntity testEntity) {
        this.testEntity = testEntity;
        return this;
    }

    public void setTestEntity(TestEntity testEntity) {
        this.testEntity = testEntity;
    }

    public User getUserOneToMany() {
        return userOneToMany;
    }

    public TestCustomTableName userOneToMany(User user) {
        this.userOneToMany = user;
        return this;
    }

    public void setUserOneToMany(User user) {
        this.userOneToMany = user;
    }

    public Set<User> getUserManyToManies() {
        return userManyToManies;
    }

    public TestCustomTableName userManyToManies(Set<User> users) {
        this.userManyToManies = users;
        return this;
    }

    public TestCustomTableName addUserManyToMany(User user) {
        this.userManyToManies.add(user);
        return this;
    }

    public TestCustomTableName removeUserManyToMany(User user) {
        this.userManyToManies.remove(user);
        return this;
    }

    public void setUserManyToManies(Set<User> users) {
        this.userManyToManies = users;
    }

    public User getUserOneToOne() {
        return userOneToOne;
    }

    public TestCustomTableName userOneToOne(User user) {
        this.userOneToOne = user;
        return this;
    }

    public void setUserOneToOne(User user) {
        this.userOneToOne = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TestCustomTableName testCustomTableName = (TestCustomTableName) o;
        if (testCustomTableName.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testCustomTableName.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestCustomTableName{" +
            "id=" + getId() +
            "}";
    }
}
