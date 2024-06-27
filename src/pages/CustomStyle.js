import { Button, Container } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    btn: {
        fontSize: 10,
        backgroundColor: 'violet',
        '&:hover':{
            backgroundColor:'blue',
            color:'white'
        }
    }
})
export default function CustomStyle() {
    const classes = useStyles()
    return (
        <Container>
            <Button
            className={classes.btn}
            >
                Hello
            </Button>
        </Container>
    )
}
