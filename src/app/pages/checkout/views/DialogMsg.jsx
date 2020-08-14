import React, { Component } from "react"
import PropTypes from "prop-types"

import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"

class DialogMsg extends Component {
    render() {
        return (
            <div>
                <Dialog
                    open={this.props.dialog}
                    onClose={this.props.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Missing Value Required"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText color="textPrimary" id="alert-dialog-description">
                            {this.props.parentErr || this.props.parentNumberErr
                                ? "Fill up at least one of the three:"
                                : null}
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">{this.props.parentErr}</DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.parentNumberErr}
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.downPaymentError}
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">{this.props.nameError}</DialogContentText>
                        <DialogContentText id="alert-dialog-description">{this.props.emailOTCErr}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} variant="contained" color="primary" autoFocus>
                            Okay
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.props.dialogStatus}
                    onClose={this.props.handleCloseStatus}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle id="alert-dialog-title">{this.props.statusTitle}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">{this.props.statusMessage}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleCloseStatus} variant="contained" color="primary" autoFocus>
                            Okay
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={Boolean(this.props.ewalletError)}
                    onClose={this.props.handleCloseEWalletError}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {"GCash experienced an unexpected error. Please try again later."}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.props.handleCloseEWalletError}
                            variant="contained"
                            color="primary"
                            autoFocus
                        >
                            Okay
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={Boolean(this.props.creditErrorStat)}
                    onClose={this.props.handleCloseCreditError}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle id="alert-dialog-title">{"Missing/Wrong Input Value"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">{this.props.creditNameErr}</DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.creditNumberErr}
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">{this.props.creditMonthErr}</DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.creditMonthValueErr}
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">{this.props.creditYearErr}</DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.creditYearValueErr}
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">{this.props.creditCVVErr}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.props.handleCloseCreditError}
                            variant="contained"
                            color="primary"
                            autoFocus
                        >
                            Okay
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

DialogMsg.propTypes = {
    handleClose: PropTypes.func,
    dialog: PropTypes.bool,
    nameError: PropTypes.string,
    parentErr: PropTypes.string,
    parentNumberErr: PropTypes.string,
    downPaymentError: PropTypes.string,
    dialogStatus: PropTypes.bool,
    handleCloseStatus: PropTypes.func,
    statusTitle: PropTypes.string,
    statusMessage: PropTypes.string,
    ewalletError: PropTypes.number,
    emailOTCErr: PropTypes.string,
    creditErrorStat: PropTypes.bool,
    creditNameErr: PropTypes.string,
    creditNumberErr: PropTypes.string,
    creditMonthErr: PropTypes.string,
    creditYearErr: PropTypes.string,
    creditMonthValueErr: PropTypes.string,
    creditYearValueErr: PropTypes.string,
    creditCVVErr: PropTypes.string,
    handleCloseCreditError: PropTypes.func,
    handleCloseEWalletError: PropTypes.func,
}

export default DialogMsg
