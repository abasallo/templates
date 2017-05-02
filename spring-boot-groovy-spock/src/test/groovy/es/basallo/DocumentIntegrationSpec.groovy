package es.basallo

import javax.validation.ConstraintViolationException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ContextConfiguration
import spock.lang.Specification

@ContextConfiguration
@SpringBootTest
class DocumentIntegrationSpec extends Specification {

    @Autowired DocumentRepository documentRepository

    def 'Validate Document extension with custom validator through annotation'() {

        given:
            def document = new Document(extension: null)

        when:
            documentRepository.save(document)

        then:
            thrown ConstraintViolationException
            !document.id

        and:

        when:
            document.extension = 'extension'
            documentRepository.save(document)

        then:
            notThrown Exception
            document.id
    }
}
