package io.github.jhipster.travis.service.mapper;

import io.github.jhipster.travis.domain.*;
import io.github.jhipster.travis.service.dto.FieldTestMapstructEntityDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity FieldTestMapstructEntity and its DTO FieldTestMapstructEntityDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FieldTestMapstructEntityMapper extends EntityMapper <FieldTestMapstructEntityDTO, FieldTestMapstructEntity> {
    
    
    default FieldTestMapstructEntity fromId(Long id) {
        if (id == null) {
            return null;
        }
        FieldTestMapstructEntity fieldTestMapstructEntity = new FieldTestMapstructEntity();
        fieldTestMapstructEntity.setId(id);
        return fieldTestMapstructEntity;
    }
}
