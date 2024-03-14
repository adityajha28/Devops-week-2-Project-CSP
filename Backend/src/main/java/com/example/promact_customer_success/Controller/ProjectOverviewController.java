package com.example.promact_customer_success.Controller;

import com.example.promact_customer_success.Entity.ProjectOverview;
import com.example.promact_customer_success.Repository.ProjectOverviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/projectoverviews")
public class ProjectOverviewController {

    @Autowired
    private ProjectOverviewRepository projectOverviewRepository;

    // Create
    @PostMapping
    public ResponseEntity<ProjectOverview> createProjectOverview(@RequestBody ProjectOverview projectOverview) {
        ProjectOverview savedProjectOverview = projectOverviewRepository.save(projectOverview);
        return new ResponseEntity<>(savedProjectOverview, HttpStatus.CREATED);
    }

    // Read all
    @GetMapping
    public ResponseEntity<List<ProjectOverview>> getAllProjectOverviews() {
        List<ProjectOverview> projectOverviews = (List<ProjectOverview>) projectOverviewRepository.findAll();
        return new ResponseEntity<>(projectOverviews, HttpStatus.OK);
    }

    // Read by id
    @GetMapping("/{id}")
    public ResponseEntity<ProjectOverview> getProjectOverviewById(@PathVariable Integer id) {
        Optional<ProjectOverview> optionalProjectOverview = projectOverviewRepository.findById(id);
        return optionalProjectOverview.map(projectOverview -> new ResponseEntity<>(projectOverview, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<ProjectOverview> updateProjectOverview(@PathVariable Integer id, @RequestBody ProjectOverview updatedOverview) {
        if (!projectOverviewRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        updatedOverview.setId(id);
        ProjectOverview savedProjectOverview = projectOverviewRepository.save(updatedOverview);
        return new ResponseEntity<>(savedProjectOverview, HttpStatus.OK);
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteProjectOverview(@PathVariable Integer id) {
        if (!projectOverviewRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        projectOverviewRepository.deleteById(id);
        return new ResponseEntity<>(true, HttpStatus.NO_CONTENT);
    }
}
