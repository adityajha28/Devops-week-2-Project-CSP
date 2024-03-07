package com.example.promact_customer_success.Entity;
import jakarta.persistence.*;
import java.lang.String;

@Entity
@Table(name = "version_history")
public class VersionHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    private Project project;

    @Column(name = "version", nullable = false)
    private Integer version;

    @Column(name = "change_type", nullable = false, length = 20)
    private String changeType;

    @Column(name = "change_reason")
    private String changeReason;

    @Column(name = "created_by", nullable = false, length = 255)
    private String createdBy;

    @Column(name = "revision_date", nullable = false)
    private String revisionDate;

    @Column(name = "approval_date")
    private String approvalDate;

    @Column(name = "approved_by", length = 255)
    private String approvedBy;

    public VersionHistory() {
        // Default constructor
    }

    // Constructor with mandatory fields
    public VersionHistory(Project project, Integer version, String changeType, String createdBy, String revisionDate,String approvalDate) {
        this.project = project;
        this.version = version;
        this.changeType = changeType;
        this.createdBy = createdBy;
        this.revisionDate = revisionDate;
        this.approvalDate = approvalDate;
    }

    // Getters and setters

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

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public String getChangeType() {
        return changeType;
    }

    public void setChangeType(String changeType) {
        this.changeType = changeType;
    }

    public String getChangeReason() {
        return changeReason;
    }

    public void setChangeReason(String changeReason) {
        this.changeReason = changeReason;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getRevisionDate() {
        return revisionDate;
    }

    public void setRevisionDate(String revisionDate) {
        this.revisionDate = revisionDate;
    }

    public String getApprovalDate() {
        return approvalDate;
    }

    public void setApprovalDate(String approvalDate) {
        this.approvalDate = approvalDate;
    }

    public String getApprovedBy() {
        return approvedBy;
    }

    public void setApprovedBy(String approvedBy) {
        this.approvedBy = approvedBy;
    }
}
