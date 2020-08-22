import React, { Component } from "react"
import PropTypes from "prop-types"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import {
    Divider
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core'

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
                        style={{ backgroundColor: "#2680EB", color: "white", flexGrow: 1 }}
                    >
                        <Grid item md={12}>
                            <Container maxWidth="md" disableGutters>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    alignContent="space-between"
                                    style={{ backgroundColor: "#2680EB", color: "white", flexGrow: 1 }}
                                >
                                    <Grid item md={12} justify="flex-start" alignItems="center" container>
                                        <Typography style={{ textAlign: "start" }} variant="h5" gutterBottom>
                                            <img
                                                src="/brooky-logo.png"
                                                alt="Brooky Logo"
                                                style={{width: "100px", marginTop: "24px" }}
                                                // style={{ height: "100px", width: "250px", marginTop: "24px" }}
                                            />
                                        </Typography>
                                        <Divider className={classes.divider} variant="middle" orientation="vertical" flexItem light ></Divider>
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
                    spacing={3}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ backgroundColor: "white", color: "black", padding: "8px" }}
                >
                    <Container maxWidth={"md"} disableGutters style={{ padding: "8px" }}>
                        <Grid item md={12}>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                style={{ backgroundColor: "white", color: "black" }}
                            >
                                <Grid item xs={2}>
                                    <Typography
                                        style={{ textAlign: "start", color: "lightslategray" }}
                                        variant="subtitle2"
                                        gutterBottom
                                    >
                                        {this.state.width > 630 ? "Refrence Number" : "Ref. No."}
                                    </Typography>
                                </Grid>
                                <Grid item xs={7}>
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
                                <Grid
                                    item
                                    xs={3}
                                    style={{
                                        textAlign: "end",
                                    }}
                                >
                                    <Typography
                                        style={{
                                            textAlign: window.innerWidth > 450 ? "end" : "center",
                                            color: "black",
                                            // border: "1px solid blue",
                                            // maxWidth: "max-content",
                                            // borderRadius: "5px 5px 5px 5px",
                                        }}
                                        variant="subtitle2"
                                        gutterBottom
                                    >
                                        {paymentDict[this.props.paymentType]}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                style={{ backgroundColor: "white", color: "black" }}
                            >
                                <Grid item xs={2}>
                                    <Typography
                                        style={{ textAlign: "start", color: "lightslategray" }}
                                        variant="subtitle2"
                                        gutterBottom
                                    >
                                        Document ID:
                                    </Typography>
                                </Grid>
                                <Grid item xs={7}>
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
                                <Grid
                                    item
                                    xs={3}
                                    style={{
                                        textAlign: "end",
                                    }}
                                >
                                    <Typography
                                        style={{
                                            textAlign: window.innerWidth > 450 ? "end" : "center",
                                            color: "black",
                                            // border: "1px solid blue",
                                            // maxWidth: "max-content",
                                            // borderRadius: "5px 5px 5px 5px",
                                        }}
                                        variant="subtitle2"
                                        gutterBottom
                                    >
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
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
