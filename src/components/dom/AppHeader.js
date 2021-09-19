import React, { useState } from 'react';
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material';


const AppHeader = () => {

        return(
            <Grid container item>
                <div id="header-div">
                    <Typography variant="h4" align="center">Conference Planner App</Typography>
                </div>
            </Grid>
        )
}

export default AppHeader