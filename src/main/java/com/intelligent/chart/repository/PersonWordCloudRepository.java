package com.intelligent.chart.repository;

import com.intelligent.chart.domain.PersonWordCloud;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the PersonWordCloud entity.
 */
@SuppressWarnings("unused")
public interface PersonWordCloudRepository extends JpaRepository<PersonWordCloud,Long> {

}