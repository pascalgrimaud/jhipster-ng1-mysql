package io.github.jhipster.travis.repository;

import io.github.jhipster.travis.domain.Label;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Label entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LabelRepository extends JpaRepository<Label,Long> {
    
}
