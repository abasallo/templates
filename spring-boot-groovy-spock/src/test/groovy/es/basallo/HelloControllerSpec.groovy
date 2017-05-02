package hello

import es.basallo.Application
import org.springframework.boot.SpringApplication
import org.springframework.context.ConfigurableApplicationContext
import org.springframework.http.HttpStatus
import org.springframework.web.client.RestTemplate
import spock.lang.AutoCleanup
import spock.lang.Shared
import spock.lang.Specification

import java.util.concurrent.Callable
import java.util.concurrent.Executors
import java.util.concurrent.Future
import java.util.concurrent.TimeUnit

class HelloControllerSpec extends Specification {

    @Shared
    @AutoCleanup
    ConfigurableApplicationContext context

    def setupSpec() {

        Future future = Executors.newSingleThreadExecutor().submit(new Callable() {
            @Override
            ConfigurableApplicationContext call() throws Exception {
                (ConfigurableApplicationContext) SpringApplication.run(Application.class)
            }
        })
        context = future.get(60, TimeUnit.SECONDS)
    }

    def 'should return Greetings from Spring Boot!'() {

        setup:
            def entity = new RestTemplate().getForEntity('http://localhost:8080', String.class)

        expect:
            entity.statusCode == HttpStatus.OK
            entity.body == 'Greetings from Spring Boot!'
    }
}