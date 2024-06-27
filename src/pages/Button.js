import React from 'react'
import { Button } from '@material-ui/core'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Container from '@material-ui/core/Container'
export default function ButtonPage() {
    return (
        <Container>
            <Button type='submit'>Submit</Button>
            <Button type='submit' color="secondary" variant='outlined' >Submit</Button>
            <ButtonGroup color="secondary" variant="contained">
                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
            </ButtonGroup>
            <Button type='submit' variant='contained' color='primary' disableElevation onClick={() => console.log("You Cliked it")}>
                Submit
            </Button>
        </Container>
    )
}
