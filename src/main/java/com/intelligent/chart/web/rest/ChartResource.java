package com.intelligent.chart.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.intelligent.chart.domain.Chart;
import com.intelligent.chart.service.ChartService;
import com.intelligent.chart.vo.ChartData;
import com.intelligent.chart.web.rest.util.HeaderUtil;
import com.intelligent.chart.web.rest.util.PaginationUtil;

import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Chart.
 */
@RestController
@RequestMapping("/api")
public class ChartResource {

    private final Logger log = LoggerFactory.getLogger(ChartResource.class);

    @Inject
    private ChartService chartService;

    @PersistenceContext
    private EntityManager entityManager;

    /**
     * POST  /charts : Create a new chart.
     *
     * @param chart the chart to create
     * @return the ResponseEntity with status 201 (Created) and with body the new chart, or with status 400 (Bad Request) if the chart has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/charts")
    @Timed
    public ResponseEntity<Chart> createChart(@RequestBody Chart chart) throws URISyntaxException {
        log.debug("REST request to save Chart : {}", chart);
        if (chart.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("chart", "idexists", "A new chart cannot already have an ID")).body(null);
        }
        Chart result = chartService.save(chart);
        return ResponseEntity.created(new URI("/api/charts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("chart", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /charts : Updates an existing chart.
     *
     * @param chart the chart to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated chart,
     * or with status 400 (Bad Request) if the chart is not valid,
     * or with status 500 (Internal Server Error) if the chart couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/charts")
    @Timed
    public ResponseEntity<Chart> updateChart(@RequestBody Chart chart) throws URISyntaxException {
        log.debug("REST request to update Chart : {}", chart);
        if (chart.getId() == null) {
            return createChart(chart);
        }
        Chart result = chartService.save(chart);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("chart", chart.getId().toString()))
            .body(result);
    }

    /**

     * @return the ResponseEntity with status 200 (OK) and the list of charts in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/charts/{id}/data")
    @Timed
    public ResponseEntity<ChartData> getChartDataToDisplay(@PathVariable Long id)
        throws URISyntaxException {

        log.debug("REST request to get a page of Charts");

        Chart chart = chartService.findOne(id);
        ChartData chartData = new ChartData();
        Query titleQuery = entityManager.createNativeQuery(chart.getTitleSql());
        Query dataQuery = entityManager.createNativeQuery(chart.getDataSourceSql());

        List<String> titleResult = titleQuery.getResultList();
        List<Float> dataResult = dataQuery.getResultList();

        chartData.setTitles(titleResult);
        chartData.setNumbers(dataResult);

        return new ResponseEntity<ChartData>(chartData, HttpStatus.OK);
    }

    /**
     * GET  /charts : get all the charts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of charts in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/charts")
    @Timed
    public ResponseEntity<List<Chart>> getAllCharts(@ApiParam Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Charts");
        Page<Chart> page = chartService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/charts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /charts/:id : get the "id" chart.
     *
     * @param id the id of the chart to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the chart, or with status 404 (Not Found)
     */
    @GetMapping("/charts/{id}")
    @Timed
    public ResponseEntity<Chart> getChart(@PathVariable Long id) {
        log.debug("REST request to get Chart : {}", id);
        Chart chart = chartService.findOne(id);
        return Optional.ofNullable(chart)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /charts/:id : delete the "id" chart.
     *
     * @param id the id of the chart to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/charts/{id}")
    @Timed
    public ResponseEntity<Void> deleteChart(@PathVariable Long id) {
        log.debug("REST request to delete Chart : {}", id);
        chartService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("chart", id.toString())).build();
    }

}
