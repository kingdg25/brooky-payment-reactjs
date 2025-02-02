import React, { Component } from "react"
import PropTypes from "prop-types"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import {
    Divider
} from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import isURL from 'validator/lib/isURL'

const paymentDict = {
    credit: "Credit/Debit Card",
    gcash: "GCash",
    dragonPay: "Other Payment Channels",
}

const styles = {
    divider: {
      background: 'white',
      marginTop: "15px",
      marginBottom: "15px"
    },
};

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = { width: 0, height: 0 }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener("resize", this.updateWindowDimensions)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions)
        styles.divider.background = `${this.props.headerDetails.textColor}`
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
    }

    render() {
        // console.log(window.innerWidth)
        const { classes } = this.props
        return (
            <div>
                <Container maxWidth={false} disableGutters>
                    <Grid
                        container
                        spacing={3}
                        direction="row"
                        justify="center"
                        alignItems="center"
                        style={{ backgroundColor: `${this.props.headerDetails.backgroundColor}`, color: "white", flexGrow: 1 }}
                    >
                        <Grid item md={12}>
                            <Container maxWidth="md" disableGutters>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    alignContent="space-between"
                                    style={{ backgroundColor: `${this.props.headerDetails.backgroundColor}`, color: `${this.props.headerDetails.textColor}`, flexGrow: 1 }}
                                >
                                    <Grid item md={12} justify="flex-start" alignItems="center" container>
                                        <Typography style={{ textAlign: "start" }} variant="h5" gutterBottom>
                                            <img
                                                src={!isURL(this.props.headerDetails.logo) ? `/${this.props.headerDetails.logo}` : `${this.props.headerDetails.logo}`}
                                                alt="Brooky Logo"
                                                style={{maxHeight: "28px", marginTop: "24px" }}
                                                // style={{ height: "100px", width: "250px", marginTop: "24px" }}
                                            />
                                        </Typography>
                                        <Divider style={{background: `${this.props.headerDetails.textColor}`, marginTop: "15px", marginBottom: "15px"}} variant="middle" orientation="vertical" flexItem light ></Divider>
                                        <Typography style={{ marginTop: "4px" }} variant="body1" align="center">
                                            Checkout
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>
                    </Grid>
                </Container>
                <Grid
                    container
                    spacing={0}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ backgroundColor: "white", color: "black", padding: "8px" }}
                >
                    <Container maxWidth={"md"} disableGutters style={{ padding: "8px" }}>
                        <Grid item md={12} spacing={2} direction="row" container>
                            <Grid md={6} direction="row" alignContent="flex-start" alignItems="flex-start" item container>
                                <Grid md={12} spacing={3} direction="row" item container>
                                    <Grid item md={6}>
                                        <Typography
                                            style={{ textAlign: "start", color: "lightslategray" }}
                                            variant="subtitle2"
                                            gutterBottom
                                        >
                                            {this.state.width > 630 ? "Refrence Number" : "Ref. No."}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Typography
                                            style={{
                                                textAlign: window.innerWidth > 450 ? "start" : "center",
                                                color: "#2680EB",
                                                fontWeight: "bold",
                                            }}
                                            variant="subtitle2"
                                            gutterBottom
                                        >
                                            {this.props.transactionID}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid md={12} spacing={3} direction="row" item container>
                                    <Grid item md={6}>
                                        <Typography
                                            style={{ textAlign: "start", color: "lightslategray" }}
                                            variant="subtitle2"
                                            gutterBottom
                                        >
                                            Document ID
                                        </Typography>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Typography
                                            style={{
                                                textAlign: window.innerWidth > 450 ? "start" : "center",
                                                color: "#2680EB",
                                                fontWeight: "bold",
                                            }}
                                            variant="subtitle2"
                                            gutterBottom
                                        >
                                            {this.props.data.doc_reference || ""}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid md={6} direction="row" item container>
                                <Grid md={12} spacing={3} direction="row" item container>
                                    <Grid item md={6}>
                                        <Typography
                                            style={{ textAlign: "start", color: "#4b4b4b" }}
                                            variant="subtitle1"
                                            gutterBottom
                                        >
                                            <b>Buyer Details</b>
                                        </Typography>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Grid item md={12}>
                                            <Typography
                                                style={{
                                                    textAlign: "start",
                                                    color: "#707070",
                                                    fontWeight: "bold",
                                                }}
                                                variant="body1"
                                                gutterBottom
                                            >
                                                {this.props.data.buyers_first_name} {this.props.data.buyers_last_name}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={12}>
                                            <Typography
                                                style={{
                                                    textAlign: "start",
                                                    color: "#707070",
                                                }}
                                                variant="subtitle1"
                                                gutterBottom
                                            >
                                                {this.props.data.buyers_email}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={12}>
                                            <Typography
                                                style={{
                                                    textAlign: "start",
                                                    color: "#707070",
                                                }}
                                                variant="subtitle2"
                                                gutterBottom
                                            >
                                                {this.props.data.buyers_mobile_number}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid md={12} spacing={3} direction="row" item container>
                                    <Grid item md={6}>
                                        <Typography
                                            style={{ textAlign: "start", color: "#4b4b4b" }}
                                            variant="subtitle1"
                                            gutterBottom
                                        >
                                            <b>Unit Details</b>
                                        </Typography>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Grid item md={12}>
                                            <Typography
                                                style={{
                                                    textAlign: "start",
                                                    color: "#707070",
                                                }}
                                                variant="subtitle2"
                                                gutterBottom
                                            >
                                                <b>Project:</b> {this.props.data.project}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={12}>
                                            <Typography
                                                style={{
                                                    textAlign: "start",
                                                    color: "#707070",
                                                }}
                                                variant="subtitle2"
                                                gutterBottom
                                            >
                                                <b>Phase/Condo/Tower:</b> {this.props.data.phase}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={12}>
                                            <Typography
                                                style={{
                                                    textAlign: "start",
                                                    color: "#707070",
                                                }}
                                                variant="subtitle2"
                                                gutterBottom
                                            >
                                                <b>Block/Floor:</b> {this.props.data.block}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={12}>
                                            <Typography
                                                style={{
                                                    textAlign: "start",
                                                    color: "#707070",
                                                }}
                                                variant="subtitle2"
                                                gutterBottom
                                            >
                                                <b>Lot/Unit:</b> {this.props.data.lot}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* <Grid item md={12} spacing={2} direction="row" container>
                            <TableContainer component={Paper}>
                            <Table elevation={0} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell><b>Project</b></TableCell>
                                    <TableCell align="right"><b>Phase/Tower</b></TableCell>
                                    <TableCell align="right"><b>Block/Floor</b></TableCell>
                                    <TableCell align="right"><b>Lot</b></TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={1}>
                                        <TableCell component="th" scope="row">
                                            <b>Royale Homes Batangas</b>
                                        </TableCell>
                                        <TableCell align="left">1</TableCell>
                                        <TableCell align="left">2</TableCell>
                                        <TableCell align="left">3</TableCell>
                                    </TableRow>
                                    <TableRow key={2}>
                                        <TableCell component="th" scope="row">
                                            <b>Royale Homes Batangas</b>
                                        </TableCell>
                                        <TableCell align="left">1</TableCell>
                                        <TableCell align="left">2</TableCell>
                                        <TableCell align="left">4</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            </TableContainer>
                        </Grid> */}
                    </Container>
                </Grid>
            </div>
        )
    }
}

Header.propTypes = {
    paymentType: PropTypes.string,
    transactionID: PropTypes.string,
}

export default withStyles(styles)(Header)
