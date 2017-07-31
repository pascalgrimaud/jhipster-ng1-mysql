package io.github.jhipster.travis.service.mapper;

import io.github.jhipster.travis.domain.*;
import io.github.jhipster.travis.service.dto.TestMapstructDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TestMapstruct and its DTO TestMapstructDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, })
public interface TestMapstructMapper extends EntityMapper <TestMapstructDTO, TestMapstruct> {

    @Mapping(source = "userOneToMany.id", target = "userOneToManyId")
    @Mapping(source = "userOneToMany.login", target = "userOneToManyLogin")

    @Mapping(source = "userOneToOne.id", target = "userOneToOneId")
    @Mapping(source = "userOneToOne.login", target = "userOneToOneLogin")
    TestMapstructDTO toDto(TestMapstruct testMapstruct); 
    @Mapping(target = "testManyToOnes", ignore = true)
    @Mapping(target = "testManyToManies", ignore = true)
    @Mapping(target = "testOneToOne", ignore = true)

    @Mapping(source = "userOneToManyId", target = "userOneToMany")

    @Mapping(source = "userOneToOneId", target = "userOneToOne")
    TestMapstruct toEntity(TestMapstructDTO testMapstructDTO); 
    default TestMapstruct fromId(Long id) {
        if (id == null) {
            return null;
        }
        TestMapstruct testMapstruct = new TestMapstruct();
        testMapstruct.setId(id);
        return testMapstruct;
    }
}
