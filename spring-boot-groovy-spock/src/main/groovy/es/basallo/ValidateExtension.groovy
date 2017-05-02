package es.basallo

import javax.validation.Constraint
import javax.validation.Payload
import java.lang.annotation.*

@Documented
@Constraint(validatedBy = ExtensionValidator.class)
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@interface ValidateExtension {

    abstract String message() default 'Invalid Extension'

    abstract Class<?>[] groups() default []

    abstract Class<? extends Payload>[] payload() default []
}