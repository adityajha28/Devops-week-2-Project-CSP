package com.example.promact_customer_success.Entity;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "phases_milestones")
public class PhaseMilestone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    private Project project;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "start_date")
    private String startDate;

    @Column(name = "completion_date")
    private String completionDate;

    @Column(name = "approval_date")
    private String approvalDate;

    @Column(name = "status")
    private String status;

    @Column(name = "revised_completion_date")
    private String revisedCompletionDate;

    @Column(name = "comments", columnDefinition = "TEXT")
    private String comments;

    // Constructors

    public PhaseMilestone() {
    }

    public PhaseMilestone(Project project, String title) {
        this.project = project;
        this.title = title;
    }

    // Getters and Setters

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(String completionDate) {
        this.completionDate = completionDate;
    }

    public String getApprovalDate() {
        return approvalDate;
    }

    public void setApprovalDate(String approvalDate) {
        this.approvalDate = approvalDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRevisedCompletionDate() {
        return revisedCompletionDate;
    }

    public void setRevisedCompletionDate(String revisedCompletionDate) {
        this.revisedCompletionDate = revisedCompletionDate;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}
