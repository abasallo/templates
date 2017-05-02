package es.basallo

import org.springframework.data.repository.PagingAndSortingRepository

public interface DocumentRepository extends PagingAndSortingRepository<Document, Long> {}
