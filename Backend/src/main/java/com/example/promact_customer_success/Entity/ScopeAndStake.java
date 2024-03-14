package com.example.promact_customer_success.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "scopeandstake")
public class ScopeAndStake {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @ManyToOne
        @JoinColumn(name = "project_id", nullable = false)
        private Project project;

        private String stake;
        private String scope;


    public ScopeAndStake(Project project, String stake, String scope) {
        this.project = project;
        this.stake = stake;
        this.scope = scope;
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

    public String getStake() {
        return stake;
    }

    public void setStake(String stake) {
        this.stake = stake;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public ScopeAndStake() {

    }


}
