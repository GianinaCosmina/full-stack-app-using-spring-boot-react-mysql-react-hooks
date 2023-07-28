import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Container, Paper} from "@mui/material";
import {useEffect, useState} from "react";

export default function Student() {
    const  paperStyle={padding:'50px 20px', width:600, margin:'20px auto'}
    const[name, setName] = useState('');
    const[address, setAddress]=useState('');
    const[students, setStudents]=useState([])

    useEffect(()=>{
        fetch("http://localhost:8080/api/students",{
            method:"GET"
        })
        .then(res=>res.json())
        .then(result=>{
            setStudents(result);
        })
    })

    const handleClick=(e)=> {
        e.preventDefault()
        const student={name, address}
        console.log(student)
        fetch("http://localhost:8080/api/students",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        }).then(()=>
        console.log("Student added.")
        )
    }

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{color:"blue"}}><u>Add Student</u></h1>

                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Student Name" variant="outlined" style={{ width: '100%' }}
                    value={name} onChange={(e)=>setName(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Student Address" variant="outlined" style={{ width: '100%' }}
                     value={address} onChange={(e)=>setAddress(e.target.value)}
                    />
                </Box>

                <Button variant="contained" color="secondary" onClick={handleClick}>
                    Submit
                </Button>
            </Paper>

            <Paper elevation={3} style={paperStyle}>
                <h1>Students</h1>

                {students.map(student=>(
                    <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={student.id}>
                        Id: {student.id} <br/>
                        Name: {student.name} <br/>
                        Address: {student.address}
                    </Paper>
                ))}
            </Paper>
        </Container>
    );
}
