package com.example.promact_customer_success.Entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "project")
public class    Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private String name;

    @NotNull
    private String description;
    private String Status;
    // Constructors, getters, and setters

    private String ProjectManger;

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public String getProjectManger() {
        return ProjectManger;
    }

    public void setProjectManger(String projectManger) {
        ProjectManger = projectManger;
    }

    public String getMember() {
        return Member;
    }

    public void setMember(String member) {
        Member = member;
    }


    private String Member;

    public Project() {
        // Default constructor required by JPA
    }

    public Project(String name, String description, String status, String projectManger, String member) {
        this.name = name;
        this.description = description;
        Status = status;
        ProjectManger = projectManger;
        Member = member;
    }


    // Getters and setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }



    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
