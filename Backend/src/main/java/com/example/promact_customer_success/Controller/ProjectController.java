package com.example.promact_customer_success.Controller;

import com.example.promact_customer_success.Entity.Project;
import com.example.promact_customer_success.Repository.ProjectRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    // Create
    @PostMapping
    public ResponseEntity<Project> createProject(@Valid @RequestBody Project project) {
        Project savedProject = projectRepository.save(project);
        return new ResponseEntity<>(savedProject, HttpStatus.CREATED);
    }

    // Read all
    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = (List<Project>) projectRepository.findAll();
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    // Read by id
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Integer id) {
        Optional<Project> optionalProject = projectRepository.findById(id);
        if (optionalProject.isPresent()) {
            Project project = optionalProject.get();
            return new ResponseEntity<>(project, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Integer id, @RequestBody Project project) {
        if (!projectRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        project.setId(id);
        Project updatedProject = projectRepository.save(project);
        return new ResponseEntity<>(updatedProject, HttpStatus.OK);
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteProject(@PathVariable Integer id) {
        if (!projectRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        projectRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}


//        @GetMapping("/export/pdf/{id}")
//        public void exportProjectsToPdf(HttpServletResponse response,@PathVariable Integer id ) throws IOException {
//            Optional<Project> optionalProject = projectRepository.findById(id);
//            if (optionalProject.isPresent()) {
//                Project project = optionalProject.get();
//                try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
//                     Document document = new Document(PageSize.A4)) {
//                    PdfWriter.getInstance(document, byteArrayOutputStream);
//                    document.open();
//
//                    Font fontTitle = FontFactory.getFont(FontFactory.TIMES_ROMAN);
//                    fontTitle.setSize(20);
//                    Paragraph paragraph1 = new Paragraph("Project Details", fontTitle);
//                    paragraph1.setAlignment(Paragraph.ALIGN_CENTER);
//                    document.add(paragraph1);
//                    document.add(new Paragraph("Project Name: " + project.getName() + "\n Description: " + project.getDescription()+"\n"));
//                    document.close();
//                    response.setContentType("application/pdf");
//                    response.setHeader("Content-Disposition", "attachment; filename=projects.pdf");
//                    response.getOutputStream().write(byteArrayOutputStream.toByteArray());
//                }
//            }
//        }
//    }