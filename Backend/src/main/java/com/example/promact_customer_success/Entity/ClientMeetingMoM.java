package com.example.promact_customer_success.Entity;

import jakarta.persistence.*;
import java.lang.*;

@Entity
@Table(name = "client_meeting_mom")
public class ClientMeetingMoM {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "id", nullable = false)
    private Project project;
    @Column(name = "meeting_date", nullable = false)
    private String meetingDate;

    @Column(name = "duration")
    private String duration;

    @Column(name = "mom_link", nullable = false)
    private String momLink;

    @Column(name = "comments", columnDefinition = "TEXT")
    private String comments;

    public ClientMeetingMoM() {
        // Default constructor required by JPA
    }

    public ClientMeetingMoM(Project project, String meetingDate, String duration, String momLink, String comments) {
        this.project = project;
        this.meetingDate = meetingDate;
        this.duration = duration;
        this.momLink = momLink;
        this.comments = comments;
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

    public String getMeetingDate() {
        return meetingDate;
    }

    public void setMeetingDate(String meetingDate) {
        this.meetingDate = meetingDate;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getMomLink() {
        return momLink;
    }

    public void setMomLink(String momLink) {
        this.momLink = momLink;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}
