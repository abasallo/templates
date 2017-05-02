package es.basallo

import javax.validation.ConstraintValidator
import javax.validation.ConstraintValidatorContext

class ExtensionValidator implements ConstraintValidator<ValidateExtension, Document> {

    @Override
    void initialize(ValidateExtension constraintAnnotation) {}

    @Override
    boolean isValid(Document document, ConstraintValidatorContext context) {
        document.extension
    }
}