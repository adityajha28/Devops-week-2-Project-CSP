package com.example.promact_customer_success.Entity;
import jakarta.persistence.*;

@Entity
@Table(name = "project_overview")
public class ProjectOverview{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    private String brief;
    private String purpose;
    private String goals;
    private String objectives;
    private double budget;

    public ProjectOverview() {
    }

    public ProjectOverview(Project project, String brief, String purpose, String goals, String objectives, double budget) {
        this.project = project;
        this.brief = brief;
        this.purpose = purpose;
        this.goals = goals;
        this.objectives = objectives;
        this.budget = budget;
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

    public String getBrief() {
        return brief;
    }

    public void setBrief(String brief) {
        this.brief = brief;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getGoals() {
        return goals;
    }

    public void setGoals(String goals) {
        this.goals = goals;
    }

    public String getObjectives() {
        return objectives;
    }

    public void setObjectives(String objectives) {
        this.objectives = objectives;
    }

    public double getBudget() {
        return budget;
    }

    public void setBudget(double budget) {
        this.budget = budget;
    }
}
