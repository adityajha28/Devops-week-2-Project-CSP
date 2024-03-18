package com.example.promact_customer_success.Entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "project_updates")
public class ProjectUpdates {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "id", nullable = false)
    private Project project;
    @Column(name = "date", nullable = false)
    private String date;

    @Column(name = "general_updates", columnDefinition = "TEXT")
    private String generalUpdates;

    public ProjectUpdates() {
        // Default constructor required by JPA
    }

    public ProjectUpdates(Project project, String date, String generalUpdates) {
        this.project = project;
        this.date = date;
        this.generalUpdates = generalUpdates;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getGeneralUpdates() {
        return generalUpdates;
    }

    public void setGeneralUpdates(String generalUpdates) {
        this.generalUpdates = generalUpdates;
    }
}
