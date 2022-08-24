import { React, useState } from 'react';
import { Typography } from '@mui/material';

export default Footer => {
    const author = 'ellukasion';

    return (
        <Typography align="center" sx={{ my: '10px' }}>Copyright &copy; 2022 - { author }</Typography>
    )
}