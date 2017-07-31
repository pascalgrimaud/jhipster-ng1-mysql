package io.github.jhipster.travis.repository;

import io.github.jhipster.travis.domain.TestOneToOne;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TestOneToOne entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestOneToOneRepository extends JpaRepository<TestOneToOne,Long> {
    
}
