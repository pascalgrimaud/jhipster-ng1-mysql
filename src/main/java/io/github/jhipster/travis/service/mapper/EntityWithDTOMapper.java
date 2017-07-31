package io.github.jhipster.travis.service.mapper;

import io.github.jhipster.travis.domain.*;
import io.github.jhipster.travis.service.dto.EntityWithDTODTO;

import org.mapstruct.*;

/**
 * Mapper for the entity EntityWithDTO and its DTO EntityWithDTODTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EntityWithDTOMapper extends EntityMapper <EntityWithDTODTO, EntityWithDTO> {
    
    
    default EntityWithDTO fromId(Long id) {
        if (id == null) {
            return null;
        }
        EntityWithDTO entityWithDTO = new EntityWithDTO();
        entityWithDTO.setId(id);
        return entityWithDTO;
    }
}
