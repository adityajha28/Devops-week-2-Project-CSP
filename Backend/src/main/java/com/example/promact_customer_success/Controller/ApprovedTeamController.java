package com.example.promact_customer_success.Controller;
import com.example.promact_customer_success.Entity.ApprovedTeam;
import com.example.promact_customer_success.Repository.ApprovedTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/approvedteams")
public class ApprovedTeamController {

    @Autowired
    private ApprovedTeamRepository approvedTeamRepository;

    // Create
    @PostMapping
    public ResponseEntity<ApprovedTeam> createApprovedTeam(@RequestBody ApprovedTeam approvedTeam) {
        ApprovedTeam savedApprovedTeam = approvedTeamRepository.save(approvedTeam);
        return new ResponseEntity<>(savedApprovedTeam, HttpStatus.CREATED);
    }

    // Read all
    @GetMapping
    public ResponseEntity<List<ApprovedTeam>> getAllApprovedTeams() {
        List<ApprovedTeam> approvedTeams = (List<ApprovedTeam>) approvedTeamRepository.findAll();
        return new ResponseEntity<>(approvedTeams, HttpStatus.OK);
    }

    // Read by id
    @GetMapping("/{id}")
    public ResponseEntity<ApprovedTeam> getApprovedTeamById(@PathVariable Integer id) {
        Optional<ApprovedTeam> optionalApprovedTeam = approvedTeamRepository.findById(id);
        return optionalApprovedTeam.map(approvedTeam -> new ResponseEntity<>(approvedTeam, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<ApprovedTeam> updateApprovedTeam(@PathVariable Integer id, @RequestBody ApprovedTeam updatedTeam) {
        if (!approvedTeamRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        updatedTeam.setId(id);
        ApprovedTeam savedApprovedTeam = approvedTeamRepository.save(updatedTeam);
        return new ResponseEntity<>(savedApprovedTeam, HttpStatus.OK);
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteApprovedTeam(@PathVariable Integer id) {
        if (!approvedTeamRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        approvedTeamRepository.deleteById(id);
        return new ResponseEntity<>(true, HttpStatus.NO_CONTENT);
    }
}
