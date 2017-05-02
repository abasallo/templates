package es.basallo

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
@ValidateExtension
public class Document {

    @Id @GeneratedValue Long id

    String extension
}
