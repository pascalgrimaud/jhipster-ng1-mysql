package io.github.jhipster.travis.repository;

import io.github.jhipster.travis.domain.TestManyToOne;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TestManyToOne entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestManyToOneRepository extends JpaRepository<TestManyToOne,Long> {
    
}
