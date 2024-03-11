package com.example.promact_customer_success.Entity;


import jakarta.persistence.*;

@Entity
@Table(name = "approved_team")
public class ApprovedTeam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer id;

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "id", nullable = false)
    private Project project;

    @Column(name = "no_of_resources")
    private int numberOfResources;

    @Column(name = "role")
    private String role;

    @Column(name = "availability_percentage")
    private double availabilityPercentage;

    @Column(name = "duration")
    private int duration;

    public ApprovedTeam() {
        // Default constructor required by JPA
    }

    public ApprovedTeam(Project project, int numberOfResources, String role, double availabilityPercentage, int duration) {
        this.project = project;
        this.numberOfResources = numberOfResources;
        this.role = role;
        this.availabilityPercentage = availabilityPercentage;
        this.duration = duration;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public int getNumberOfResources() {
        return numberOfResources;
    }

    public void setNumberOfResources(int numberOfResources) {
        this.numberOfResources = numberOfResources;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public double getAvailabilityPercentage() {
        return availabilityPercentage;
    }

    public void setAvailabilityPercentage(double availabilityPercentage) {
        this.availabilityPercentage = availabilityPercentage;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }
}
