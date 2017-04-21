package com.intelligent.chart.service;

import com.gargoylesoftware.htmlunit.WebClient;
import com.intelligent.chart.domain.Movie;
import com.intelligent.chart.service.dto.DoubanMovieSubject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing Movie.
 */
public interface MovieService {

    /**
     * Save a movie.
     *
     * @param movie the entity to save
     * @return the persisted entity
     */
    Movie save(Movie movie);

    /**
     *  Get all the movies.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Movie> findAll(Pageable pageable);

    /**
     *  Get the "id" movie.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Movie findOne(Long id);

    /**
     *  Delete the "id" movie.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    Movie grabSingleMovieWithUrl(DoubanMovieSubject doubanMovieSubject, WebClient client);
}