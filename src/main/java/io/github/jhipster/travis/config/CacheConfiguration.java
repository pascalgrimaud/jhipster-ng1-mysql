package io.github.jhipster.travis.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(io.github.jhipster.travis.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.BankAccount.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.BankAccount.class.getName() + ".operations", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.Label.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.Label.class.getName() + ".operations", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.Operation.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.Operation.class.getName() + ".labels", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.FieldTestPaginationEntity.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.FieldTestServiceImplEntity.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.FieldTestServiceClassEntity.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.FieldTestPagerEntity.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.FieldTestMapstructEntity.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.FieldTestInfiniteScrollEntity.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.FieldTestEntity.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestCustomTableName.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestCustomTableName.class.getName() + ".testManyToOnes", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestCustomTableName.class.getName() + ".testManyToManies", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestCustomTableName.class.getName() + ".userManyToManies", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestTwoRelationshipsSameEntity.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestServiceImpl.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestServiceImpl.class.getName() + ".testManyToOnes", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestServiceImpl.class.getName() + ".testManyToManies", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestServiceImpl.class.getName() + ".userManyToManies", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestServiceClass.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestServiceClass.class.getName() + ".testManyToOnes", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestServiceClass.class.getName() + ".testManyToManies", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestServiceClass.class.getName() + ".userManyToManies", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestPagination.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestPagination.class.getName() + ".testManyToOnes", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestPagination.class.getName() + ".testManyToManies", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestPagination.class.getName() + ".userManyToManies", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestPager.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestPager.class.getName() + ".testManyToOnes", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestPager.class.getName() + ".testManyToManies", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestPager.class.getName() + ".userManyToManies", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestMapstruct.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestMapstruct.class.getName() + ".testManyToOnes", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestMapstruct.class.getName() + ".testManyToManies", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestMapstruct.class.getName() + ".userManyToManies", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestInfiniteScroll.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestInfiniteScroll.class.getName() + ".testManyToOnes", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestInfiniteScroll.class.getName() + ".testManyToManies", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestInfiniteScroll.class.getName() + ".userManyToManies", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestEntity.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestEntity.class.getName() + ".testManyToOnes", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestEntity.class.getName() + ".testManyToManies", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestEntity.class.getName() + ".userManyToManies", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestEntity.class.getName() + ".testCustomTableNames", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestManyToMany.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestManyToMany.class.getName() + ".testEntities", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestManyToMany.class.getName() + ".testMapstructs", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestManyToMany.class.getName() + ".testServiceClasses", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestManyToMany.class.getName() + ".testServiceImpls", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestManyToMany.class.getName() + ".testInfiniteScrolls", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestManyToMany.class.getName() + ".testPagers", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestManyToMany.class.getName() + ".testPaginations", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestManyToMany.class.getName() + ".testCustomTableNames", jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestManyToOne.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.TestOneToOne.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.EntityWithDTO.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.EntityWithServiceClass.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.EntityWithServiceImpl.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.EntityWithPagination.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.EntityWithServiceClassAndPagination.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.EntityWithServiceImplAndPagination.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.EntityWithServiceClassAndDTO.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.EntityWithServiceImplAndDTO.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.EntityWithPaginationAndDTO.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.EntityWithServiceClassPaginationAndDTO.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.travis.domain.EntityWithServiceImplPaginationAndDTO.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
