package io.github.jhipster.travis.repository;

import io.github.jhipster.travis.domain.TestTwoRelationshipsSameEntity;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TestTwoRelationshipsSameEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestTwoRelationshipsSameEntityRepository extends JpaRepository<TestTwoRelationshipsSameEntity,Long> {

}
