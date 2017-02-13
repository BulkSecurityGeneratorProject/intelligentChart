package com.intelligent.chart.repository;

import com.intelligent.chart.domain.PersonConnectionLevel;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the PersonConnectionLevel entity.
 */
@SuppressWarnings("unused")
public interface PersonConnectionLevelRepository extends JpaRepository<PersonConnectionLevel,Long> {

}