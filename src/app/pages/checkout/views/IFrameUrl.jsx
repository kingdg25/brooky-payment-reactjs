import React, { Component } from "react"
import PropTypes from "prop-types"

import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import Dialog from "@material-ui/core/Dialog"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

class IFrameUrl extends Component {
    render() {
        return (
            <div>
                <Dialog
                    disableBackdropClick
                    open={this.props.IFrame}
                    onClose={this.props.action}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                            <Grid item xs={10}>
                                <Typography style={{ textAlign: "start" }} variant="h6" gutterBottom>
                                    3D Secure Authentication
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton onClick={this.props.action}>
                                    <CloseIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </DialogTitle>
                    <DialogContent>
                        <iframe title="Authorization" width="500" height="300" src={this.props.IFrameResURL}>
                            {"Your browser doesn't support IFrame"}
                        </iframe>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

IFrameUrl.propTypes = {
    action: PropTypes.func,
    IFrame: PropTypes.bool,
    IFrameResURL: PropTypes.string,
}

export default IFrameUrl
