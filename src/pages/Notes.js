import { Container, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import TaskCard from '../Component/TaskCard'

export default function Notes() {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    fetch('http://localhost:8080/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
    // .catch(err => console.log(err.message))
  })

  const handleDelete = async (id) => {
    await fetch('http://localhost:8080/notes/' + id,{
      method:'DELETE'
    })
    const newNotes = notes.filter(notes => notes.id !== id)
    setNotes(newNotes)
  }
  return (
    <Container>
      
      <Grid container spacing={3}>
        {notes.map(notes => (
          <Grid item key={notes.id} xs={12} md={6} lg={4} >
            <TaskCard newnote={notes} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
