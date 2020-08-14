import React from 'react';
import {
    Grid,
    Typography,
} from '@material-ui/core'


export function Fallback(){


    return <>
        <Grid style={{fontSize: "16px",
            backgroundImage: `url("https://s3.ap-southeast-1.amazonaws.com/tailerp-attachment/brooky/2019/10/31/Document%20Brooky/LKZX3WE4_cities.png")`,
            height: "100vh",
            backgroundColor: "#2680EB",
            backgroundPosition: "center",
            backgroundRepeat: "repeat-x",
            backgroundAttachment: "fixed",
            backgroundSize: "auto 100vh"}}
            
            container
            spacing={3}
            direction="row"
            alignItems="center"
            justify="center"
            >
            <Grid container item xs={4}
            >
                <Typography variant="inherit" align={"center"} style={{color: "white"}}>
                    The transaction is either expired, deleted, already paid or does not exist
                </Typography>
            </Grid>
        </Grid>
    </>
}