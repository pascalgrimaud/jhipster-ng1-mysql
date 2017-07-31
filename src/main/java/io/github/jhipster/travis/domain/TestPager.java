package io.github.jhipster.travis.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TestPager.
 */
@Entity
@Table(name = "test_pager")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TestPager implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "testPager")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TestManyToOne> testManyToOnes = new HashSet<>();

    @ManyToMany(mappedBy = "testPagers")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TestManyToMany> testManyToManies = new HashSet<>();

    @OneToOne(mappedBy = "testPager")
    @JsonIgnore
    private TestOneToOne testOneToOne;

    @ManyToOne
    private User userOneToMany;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "test_pager_user_many_to_many",
               joinColumns = @JoinColumn(name="test_pagers_id", referencedColumnName="id"),
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

    public TestPager testManyToOnes(Set<TestManyToOne> testManyToOnes) {
        this.testManyToOnes = testManyToOnes;
        return this;
    }

    public TestPager addTestManyToOne(TestManyToOne testManyToOne) {
        this.testManyToOnes.add(testManyToOne);
        testManyToOne.setTestPager(this);
        return this;
    }

    public TestPager removeTestManyToOne(TestManyToOne testManyToOne) {
        this.testManyToOnes.remove(testManyToOne);
        testManyToOne.setTestPager(null);
        return this;
    }

    public void setTestManyToOnes(Set<TestManyToOne> testManyToOnes) {
        this.testManyToOnes = testManyToOnes;
    }

    public Set<TestManyToMany> getTestManyToManies() {
        return testManyToManies;
    }

    public TestPager testManyToManies(Set<TestManyToMany> testManyToManies) {
        this.testManyToManies = testManyToManies;
        return this;
    }

    public TestPager addTestManyToMany(TestManyToMany testManyToMany) {
        this.testManyToManies.add(testManyToMany);
        testManyToMany.getTestPagers().add(this);
        return this;
    }

    public TestPager removeTestManyToMany(TestManyToMany testManyToMany) {
        this.testManyToManies.remove(testManyToMany);
        testManyToMany.getTestPagers().remove(this);
        return this;
    }

    public void setTestManyToManies(Set<TestManyToMany> testManyToManies) {
        this.testManyToManies = testManyToManies;
    }

    public TestOneToOne getTestOneToOne() {
        return testOneToOne;
    }

    public TestPager testOneToOne(TestOneToOne testOneToOne) {
        this.testOneToOne = testOneToOne;
        return this;
    }

    public void setTestOneToOne(TestOneToOne testOneToOne) {
        this.testOneToOne = testOneToOne;
    }

    public User getUserOneToMany() {
        return userOneToMany;
    }

    public TestPager userOneToMany(User user) {
        this.userOneToMany = user;
        return this;
    }

    public void setUserOneToMany(User user) {
        this.userOneToMany = user;
    }

    public Set<User> getUserManyToManies() {
        return userManyToManies;
    }

    public TestPager userManyToManies(Set<User> users) {
        this.userManyToManies = users;
        return this;
    }

    public TestPager addUserManyToMany(User user) {
        this.userManyToManies.add(user);
        return this;
    }

    public TestPager removeUserManyToMany(User user) {
        this.userManyToManies.remove(user);
        return this;
    }

    public void setUserManyToManies(Set<User> users) {
        this.userManyToManies = users;
    }

    public User getUserOneToOne() {
        return userOneToOne;
    }

    public TestPager userOneToOne(User user) {
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
        TestPager testPager = (TestPager) o;
        if (testPager.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testPager.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestPager{" +
            "id=" + getId() +
            "}";
    }
}
