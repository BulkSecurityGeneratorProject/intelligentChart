package com.intelligent.chart.repository;

import com.intelligent.chart.domain.PersonTaxiActivity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the PersonTaxiActivity entity.
 */
@SuppressWarnings("unused")
public interface PersonTaxiActivityRepository extends JpaRepository<PersonTaxiActivity,Long> {

    Page<PersonTaxiActivity> findByPerson_Id(Long id, Pageable pageable);
}