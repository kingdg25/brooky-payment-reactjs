import React, { Component } from "react"
import PropTypes from "prop-types"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

class Footer extends Component {
    render() {
        return (
            <div>
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{ borderTop: "1px solid gray", flexGrow: "1" }}
                >
                    <Grid item xs={12}></Grid>
                </Grid>
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ border: "1px solid gray", flexGrow: "1" }}
                >
                    <Grid item xs={12}>
                        <Typography style={{ textAlign: "center" }} variant="h6" gutterBottom>
                            WITHDRAWAL REQUIRES ADVANCE NOTICE
                        </Typography>
                        <Typography
                            style={{ textAlign: "start", backgroundColor: "lightgray" }}
                            variant="subtitle1"
                            gutterBottom
                        >
                            Withdrawal shall be charged as follows:
                        </Typography>
                        <Typography style={{ textAlign: "start" }} variant="body1" gutterBottom>
                            Before start of class
                        </Typography>
                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            justify="center"
                            alignItems="center"
                            style={{ flexGrow: "1" }}
                        >
                            <Grid item xs={6}>
                                <Typography style={{ textAlign: "start" }} variant="body2" gutterBottom>
                                    Within the 1st week of classes
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography style={{ textAlign: "start" }} variant="body2" gutterBottom>
                                    10% of Tuition & Fees Due for the SY
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            justify="center"
                            alignItems="center"
                            style={{ flexGrow: "1" }}
                        >
                            <Grid item xs={6}>
                                <Typography style={{ textAlign: "start" }} variant="body2" gutterBottom>
                                    Within the 2nd week of classes
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography style={{ textAlign: "start" }} variant="body2" gutterBottom>
                                    20% of Tuition & Fees Due for the SY
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            justify="center"
                            alignItems="center"
                            style={{ flexGrow: "1" }}
                        >
                            <Grid item xs={6}>
                                <Typography style={{ textAlign: "start" }} variant="body2" gutterBottom>
                                    Within the 3rd week of classes
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography style={{ textAlign: "start" }} variant="body2" gutterBottom>
                                    30% of Tuition & Fees Due for the SY
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            justify="center"
                            alignItems="center"
                            style={{ flexGrow: "1" }}
                        >
                            <Grid item xs={6}>
                                <Typography style={{ textAlign: "start" }} variant="body2" gutterBottom>
                                    After the 3rd week of classes
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography style={{ textAlign: "start" }} variant="body2" gutterBottom>
                                    100% of Tuition & Fees Due for the SY
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{ flexGrow: "1" }}
                >
                    <Grid item xs={12}></Grid>
                </Grid>
                <Grid container spacing={3} direction="row" justify="flex-end" alignItems="center">
                    <Grid item md={1}>
                        <Button
                            variant="contained"
                            disabled={this.props.status}
                            type="submit"
                            color="primary"
                            style={{ textTransform: "None" }}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Footer.proptTypes = {
    status: PropTypes.bool,
}

export default Footer
