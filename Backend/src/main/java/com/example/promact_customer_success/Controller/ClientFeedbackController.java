package com.example.promact_customer_success.Controller;

import com.example.promact_customer_success.Entity.ClientFeedback;
import com.example.promact_customer_success.Repository.ClientFeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clientfeedbacks")
public class ClientFeedbackController {

    @Autowired
    private ClientFeedbackRepository clientFeedbackRepository;

    // Create
    @PostMapping
    public ResponseEntity<ClientFeedback> createClientFeedback(@Valid @RequestBody ClientFeedback clientFeedback) {
        ClientFeedback savedClientFeedback = clientFeedbackRepository.save(clientFeedback);
        return new ResponseEntity<>(savedClientFeedback, HttpStatus.CREATED);
    }

    // Read all
    @GetMapping
    public ResponseEntity<List<ClientFeedback>> getAllClientFeedbacks() {
        List<ClientFeedback> clientFeedbacks = (List<ClientFeedback>) clientFeedbackRepository.findAll();
        return new ResponseEntity<>(clientFeedbacks, HttpStatus.OK);
    }

    // Read by id
    @GetMapping("/{id}")
    public ResponseEntity<ClientFeedback> getClientFeedbackById(@PathVariable Integer id) {
        Optional<ClientFeedback> optionalClientFeedback = clientFeedbackRepository.findById(id);
        return optionalClientFeedback.map(clientFeedback ->
                        new ResponseEntity<>(clientFeedback, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<ClientFeedback> updateClientFeedback(@PathVariable Integer id,
                                                               @Valid @RequestBody ClientFeedback clientFeedback) {
        if (!clientFeedbackRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        clientFeedback.setId(id);
        ClientFeedback updatedClientFeedback = clientFeedbackRepository.save(clientFeedback);
        return new ResponseEntity<>(updatedClientFeedback, HttpStatus.OK);
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClientFeedback(@PathVariable Integer id) {
        if (!clientFeedbackRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        clientFeedbackRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
