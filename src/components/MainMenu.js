import React, { useState } from 'react';
import Grid from '@mui/material/Grid'
import { Button, Typography } from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import TuneIcon from '@mui/icons-material/Tune';
import { Box } from '@mui/system';

const MainMenu = () => {
    return(
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh">
            <Grid container direction="column" alignItems="center" justifyItems="center" justifyContent="center" justifySelf="center" mt={1} xs={12}>
                    <Grid item m={2} >
                        <Typography variant="overline" align="center">App created by xarmar</Typography>
                        <Typography variant="h6" align="center">‌CONFERENCE‌‌ TRACK‌‌ MANAGEMENT‌ ‌APP</Typography>
                        <Typography variant="caption" display="block" align="right">Plan Your Conference Today!</Typography>
                    </Grid>
                    <Grid item m={2} alignItems="center">
                            <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit" 
                            startIcon={<TuneIcon/>}>
                            <Typography>Insert Talks with Slider</Typography>
                            </Button>
                    </Grid>
                    <Grid item m={2}>
                            <Button 
                            variant="contained" 
                            color="success" 
                            type="submit" 
                            startIcon={<TextSnippetIcon/>}>
                            <Typography>Insert Talks with TextArea</Typography>
                            </Button>
                        </Grid>
                </Grid>
        </Box>
    )
}

export default MainMenu