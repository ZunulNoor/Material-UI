import React from 'react'
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import AndroidIcon from '@mui/icons-material/Android';
import SendIcon from '@mui/icons-material/Send';

import { Button, Container } from '@mui/material';
export default function IconPage() {
    return (
        <Container>
            <AlignVerticalBottomIcon />
            <br />
            <AndroidIcon
                color='secondary'
                fontSize='large'
            />
            <br />
            <Button
                type='submit'
                color="secondary"
                variant='contained'
                startIcon={<SendIcon/>}
            >
                Submit
            </Button>
        </Container>

    )
}
