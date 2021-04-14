import React, { useEffect, useState } from 'react';
import { Alert } from '@material-ui/lab';
import Grow from '@material-ui/core/Grow';

const IRMAlert = ({text,show = true,severity}) => {  
    return (
            <Grow in={show} >
                <Alert severity={severity}>
                    {text}
                </Alert>
            </Grow>
    );
}

export default IRMAlert;
