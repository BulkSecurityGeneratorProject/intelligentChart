package com.intelligent.chart.service.impl;

import com.intelligent.chart.service.ChartService;
import com.intelligent.chart.domain.Chart;
import com.intelligent.chart.repository.ChartRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Service Implementation for managing Chart.
 */
@Service
@Transactional
public class ChartServiceImpl implements ChartService{

    private final Logger log = LoggerFactory.getLogger(ChartServiceImpl.class);
    
    @Inject
    private ChartRepository chartRepository;

    /**
     * Save a chart.
     *
     * @param chart the entity to save
     * @return the persisted entity
     */
    public Chart save(Chart chart) {
        log.debug("Request to save Chart : {}", chart);
        Chart result = chartRepository.save(chart);
        return result;
    }

    /**
     *  Get all the charts.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public Page<Chart> findAll(Pageable pageable) {
        log.debug("Request to get all Charts");
        Page<Chart> result = chartRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one chart by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Chart findOne(Long id) {
        log.debug("Request to get Chart : {}", id);
        Chart chart = chartRepository.findOne(id);
        return chart;
    }

    /**
     *  Delete the  chart by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Chart : {}", id);
        chartRepository.delete(id);
    }
}
