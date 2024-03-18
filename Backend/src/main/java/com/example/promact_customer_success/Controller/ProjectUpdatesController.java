package com.example.promact_customer_success.Controller;

import com.example.promact_customer_success.Entity.ProjectUpdates;
import com.example.promact_customer_success.Repository.ProjectUpdatesRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/projectupdates")
public class ProjectUpdatesController {

    @Autowired
    private ProjectUpdatesRepository projectUpdatesRepository;

    // Create
    @PostMapping
    public ResponseEntity<ProjectUpdates> createProjectUpdates(@Valid @RequestBody ProjectUpdates projectUpdates) {
        ProjectUpdates savedProjectUpdates = projectUpdatesRepository.save(projectUpdates);
        return new ResponseEntity<>(savedProjectUpdates, HttpStatus.CREATED);
    }

    
    // Read all
    @GetMapping
    public ResponseEntity<List<ProjectUpdates>> getAllProjectUpdates() {
        List<ProjectUpdates> projectUpdates = (List<ProjectUpdates>) projectUpdatesRepository.findAll();
        return new ResponseEntity<>(projectUpdates, HttpStatus.OK);
    }

    // Read by id
    @GetMapping("/{id}")
    public ResponseEntity<ProjectUpdates> getProjectUpdatesById(@PathVariable Integer id) {
        Optional<ProjectUpdates> optionalProjectUpdates = projectUpdatesRepository.findById(id);
        return optionalProjectUpdates.map(projectUpdate ->
                new ResponseEntity<>(projectUpdate, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<ProjectUpdates> updateProjectUpdates(@PathVariable Integer id,
                                                               @Valid @RequestBody ProjectUpdates projectUpdates) {
        if (!projectUpdatesRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        projectUpdates.setId(id);
        ProjectUpdates updatedProjectUpdates = projectUpdatesRepository.save(projectUpdates);
        return new ResponseEntity<>(updatedProjectUpdates, HttpStatus.OK);
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProjectUpdates(@PathVariable Integer id) {
        if (!projectUpdatesRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        projectUpdatesRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
   
        
    }
}

    

