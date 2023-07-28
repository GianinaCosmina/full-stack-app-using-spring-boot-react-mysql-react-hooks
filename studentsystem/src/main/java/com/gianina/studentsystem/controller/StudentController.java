package com.gianina.studentsystem.controller;

import com.gianina.studentsystem.model.Student;
import com.gianina.studentsystem.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/students")
    public String add(@RequestBody Student student) {
        studentService.saveStudent(student);
        return "New student is added";
    }

    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }
}
