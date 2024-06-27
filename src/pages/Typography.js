import React from 'react'
import Typography from '@material-ui/core/Typography'


export default function TypographyPage() {
    return (
        <div>
            <Typography
                variant="h1"
                color="secondary"
                gutterBottom // If true, the text will have a bottom margin.
            >
                New One 1
            </Typography>
            <Typography
                noWrap
                color="secondary"
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
            </Typography>
            <Typography
                color="textSecondary"
                variant='h4'
                component="h2"
            >
                Hello World
            </Typography>
        </div>
    )
}
