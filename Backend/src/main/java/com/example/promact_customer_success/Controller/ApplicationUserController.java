package com.example.promact_customer_success.Controller;

import com.example.promact_customer_success.Entity.ApplicationUser;
import com.example.promact_customer_success.Entity.ApprovedTeam;
import com.example.promact_customer_success.Repository.ApplicationUserRepository;
import com.example.promact_customer_success.Repository.ApprovedTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/application-user")
public class ApplicationUserController {
    @Autowired
    private ApplicationUserRepository applicationUserRepository;

    // Create
    @PostMapping
    public ResponseEntity<ApplicationUser> createApprovedTeam(@RequestBody ApplicationUser applicationUser) {
        ApplicationUser savedApplicatoinUser = applicationUserRepository.save(applicationUser);
        return new ResponseEntity<>(savedApplicatoinUser, HttpStatus.CREATED);
    }

    // Read all
    @GetMapping
    public ResponseEntity<List<ApplicationUser>> getAllApprovedTeams() {
        List<ApplicationUser> applicationUsers = (List<ApplicationUser>) applicationUserRepository.findAll();
        return new ResponseEntity<>(applicationUsers, HttpStatus.OK);
    }

    // Read by id
    @GetMapping("/{email}")
    public ResponseEntity<ApplicationUser> getApprovedTeamById(@PathVariable String email) {
        List<ApplicationUser> applicationUsers =(List<ApplicationUser>) applicationUserRepository.findAll();
        for (ApplicationUser user : applicationUsers) {
            if (user.getEmail().equals(email)) {
                return new ResponseEntity<>(user, HttpStatus.OK);
            }
        }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<ApplicationUser> updateApprovedTeam(@PathVariable Integer id, @RequestBody ApplicationUser updatedUser) {
        if (!applicationUserRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        updatedUser.setId(id);
        ApplicationUser savedApplicationUser = applicationUserRepository.save(updatedUser);
        return new ResponseEntity<>(savedApplicationUser, HttpStatus.OK);
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteApprovedTeam(@PathVariable Integer id) {
        if (!applicationUserRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        applicationUserRepository.deleteById(id);
        return new ResponseEntity<>(true, HttpStatus.NO_CONTENT);
    }
}
