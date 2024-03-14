package com.example.promact_customer_success.Controller;

import com.example.promact_customer_success.Entity.ScopeAndStake;
import com.example.promact_customer_success.Repository.ScopeAndStakeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/scopeandstake")
public class ScopeAndStakeController {

    @Autowired
    private ScopeAndStakeRepository scopeAndStakeRepository;

    // Create
    @PostMapping
    public ResponseEntity<ScopeAndStake> createScopeAndStake(@RequestBody ScopeAndStake scopeAndStake) {
        ScopeAndStake savedScopeAndStake = scopeAndStakeRepository.save(scopeAndStake);
        return new ResponseEntity<>(savedScopeAndStake, HttpStatus.CREATED);
    }

    // Read all
    @GetMapping
    public ResponseEntity<List<ScopeAndStake>> getAllScopeAndStakes() {
        List<ScopeAndStake> scopeAndStakes = (List<ScopeAndStake>) scopeAndStakeRepository.findAll();
        return new ResponseEntity<>(scopeAndStakes, HttpStatus.OK);
    }

    // Read by id
    @GetMapping("/{id}")
    public ResponseEntity<ScopeAndStake> getScopeAndStakeById(@PathVariable Integer id) {
        Optional<ScopeAndStake> optionalScopeAndStake = scopeAndStakeRepository.findById(id);
        return optionalScopeAndStake.map(scopeAndStake -> new ResponseEntity<>(scopeAndStake, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<ScopeAndStake> updateScopeAndStake(@PathVariable Integer id, @RequestBody ScopeAndStake updatedScopeAndStake) {
        if (!scopeAndStakeRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        updatedScopeAndStake.setId(id);
        ScopeAndStake savedScopeAndStake = scopeAndStakeRepository.save(updatedScopeAndStake);
        return new ResponseEntity<>(savedScopeAndStake, HttpStatus.OK);
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteScopeAndStake(@PathVariable Integer id) {
        if (!scopeAndStakeRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        scopeAndStakeRepository.deleteById(id);
        return new ResponseEntity<>(true, HttpStatus.NO_CONTENT);
    }
}
