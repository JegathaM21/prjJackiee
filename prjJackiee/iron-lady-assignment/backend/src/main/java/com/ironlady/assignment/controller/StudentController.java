package com.ironlady.assignment.controller;

import com.ironlady.assignment.entity.StudentEntity;
import com.ironlady.assignment.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<StudentEntity> getAllStudents() {
        return studentRepository.findAll();
    }

    @PostMapping
    public StudentEntity createStudent(@RequestBody StudentEntity student) {
        return studentRepository.save(student);
    }

    @PutMapping("/{id}")
    public StudentEntity updateStudent(@PathVariable Long id, @RequestBody StudentEntity studentDetails) {
        StudentEntity student = studentRepository.findById(id).orElseThrow();
        student.setName(studentDetails.getName());
        student.setEmail(studentDetails.getEmail());
        student.setProgram(studentDetails.getProgram());
        student.setStatus(studentDetails.getStatus());
        return studentRepository.save(student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentRepository.deleteById(id);
    }
}
