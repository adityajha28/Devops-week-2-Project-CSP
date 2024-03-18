package com.example.promact_customer_success.Entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "client_feedback")
public class ClientFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "id", nullable = false)
    private Project project;
    @Column(name = "feedback_type", nullable = false)
    private String feedbackType;

    @Column(name = "date_received", nullable = false)
        private String dateReceived;

    @Column(name = "detailed_feedback", columnDefinition = "TEXT")
    private String detailedFeedback;

    @Column(name = "action_taken", columnDefinition = "TEXT")
    private String actionTaken;

    @Column(name = "closure_date")
    private String closureDate;

    public ClientFeedback() {
        // Default constructor required by JPA
    }

    public ClientFeedback(Project project, String feedbackType, String dateReceived, String detailedFeedback, String actionTaken, String closureDate) {
        this.project = project;
        this.feedbackType = feedbackType;
        this.dateReceived = dateReceived;
        this.detailedFeedback = detailedFeedback;
        this.actionTaken = actionTaken;
        this.closureDate = closureDate;
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

    public String getFeedbackType() {
        return feedbackType;
    }

    public void setFeedbackType(String feedbackType) {
        this.feedbackType = feedbackType;
    }

    public String getDateReceived() {
        return dateReceived;
    }

    public void setDateReceived(String dateReceived) {
        this.dateReceived = dateReceived;
    }

    public String getDetailedFeedback() {
        return detailedFeedback;
    }

    public void setDetailedFeedback(String detailedFeedback) {
        this.detailedFeedback = detailedFeedback;
    }

    public String getActionTaken() {
        return actionTaken;
    }

    public void setActionTaken(String actionTaken) {
        this.actionTaken = actionTaken;
    }

    public String getClosureDate() {
        return closureDate;
    }

    public void setClosureDate(String closureDate) {
        this.closureDate = closureDate;
    }
}
