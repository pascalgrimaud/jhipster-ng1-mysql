package io.github.jhipster.travis.service.mapper;

import io.github.jhipster.travis.domain.*;
import io.github.jhipster.travis.service.dto.EntityWithServiceClassAndDTODTO;

import org.mapstruct.*;

/**
 * Mapper for the entity EntityWithServiceClassAndDTO and its DTO EntityWithServiceClassAndDTODTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EntityWithServiceClassAndDTOMapper extends EntityMapper <EntityWithServiceClassAndDTODTO, EntityWithServiceClassAndDTO> {
    
    
    default EntityWithServiceClassAndDTO fromId(Long id) {
        if (id == null) {
            return null;
        }
        EntityWithServiceClassAndDTO entityWithServiceClassAndDTO = new EntityWithServiceClassAndDTO();
        entityWithServiceClassAndDTO.setId(id);
        return entityWithServiceClassAndDTO;
    }
}
