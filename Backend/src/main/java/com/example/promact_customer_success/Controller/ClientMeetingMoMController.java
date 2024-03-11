package com.example.promact_customer_success.Controller;

import com.example.promact_customer_success.Entity.ClientMeetingMoM;
import com.example.promact_customer_success.Repository.ClientMeetingMoMRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clientmeetingmoms")
public class ClientMeetingMoMController {

    @Autowired
    private ClientMeetingMoMRepository clientMeetingMoMRepository;

    // Create
    @PostMapping
    public ResponseEntity<ClientMeetingMoM> createClientMeetingMoM(@Valid @RequestBody ClientMeetingMoM clientMeetingMoM) {
        ClientMeetingMoM savedClientMeetingMoM = clientMeetingMoMRepository.save(clientMeetingMoM);
        return new ResponseEntity<>(savedClientMeetingMoM, HttpStatus.CREATED);
    }

    // Read all
    @GetMapping
    public ResponseEntity<List<ClientMeetingMoM>> getAllClientMeetingMoMs() {
        List<ClientMeetingMoM> clientMeetingMoMs = (List<ClientMeetingMoM>) clientMeetingMoMRepository.findAll();
        return new ResponseEntity<>(clientMeetingMoMs, HttpStatus.OK);
    }
    // Read by id
    @GetMapping("/{id}")
    public ResponseEntity<ClientMeetingMoM> getClientMeetingMoMById(@PathVariable Integer id) {
        Optional<ClientMeetingMoM> optionalClientMeetingMoM = clientMeetingMoMRepository.findById(id);
        return optionalClientMeetingMoM.map(clientMeetingMoM ->
                        new ResponseEntity<>(clientMeetingMoM, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<ClientMeetingMoM> updateClientMeetingMoM(@PathVariable Integer id,
                                                                   @Valid @RequestBody ClientMeetingMoM clientMeetingMoM) {
        if (!clientMeetingMoMRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        clientMeetingMoM.setId(id);
        ClientMeetingMoM updatedClientMeetingMoM = clientMeetingMoMRepository.save(clientMeetingMoM);
        return new ResponseEntity<>(updatedClientMeetingMoM, HttpStatus.OK);
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClientMeetingMoM(@PathVariable Integer id) {
        if (!clientMeetingMoMRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        clientMeetingMoMRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
