import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import ScheduleIcon from '@mui/icons-material/Schedule';


// Source: https://mui.com/components/slider
// I just changed the min/max and input blur numbers

const Input = styled(MuiInput)`
    width: 42px;
`;

export default function InputSlider() {
    const [value, setValue] = React.useState(30);

    const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    };

    const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 6) {
            setValue(6);
        } else if (value > 60) {
            setValue(60);
        }
    };

    return (
    <Box sx={{ width: 250 }} className="input-slider">
        <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
                <ScheduleIcon />
            </Grid>
            <Grid item xs>
                <Slider
                variant="outlined"
                value={typeof value === 'number' ? value : 0}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
                min={6}
                max={60}
                />
            </Grid>
            <Grid item>
                <Input
                value={value}
                size="small"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                    step: 1,
                    min: 6,
                    max: 60,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                }}
                />
            </Grid>
        </Grid>
    </Box>
    );
}