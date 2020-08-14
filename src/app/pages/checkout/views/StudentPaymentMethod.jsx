import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import PaymentInformation from "./PaymentInformation"
import StudentCreditCard from "./StudentCreditCard"
import StudentGCash from "./StudentGCash"
import StudentOTC from "./StudentOTC"
import PaymentSummary from "./PaymentSummary"

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}))

function getSteps() {
    return ["Payment Information", "Summary", "Payment"]
}

function getStepContent(step, props, handleNext, handleBack) {
    switch (step) {
        case 0:
            return <PaymentInformation props={props} handleNext={handleNext} />
        case 1:
            return <PaymentSummary props={props} handleNext={handleNext} handleBack={handleBack} />
        case 2:
            return props.paymentType === "credit" ? (
                <StudentCreditCard handleBack={handleBack} props={props} />
            ) : props.paymentType === "gcash" ? (
                <StudentGCash handleBack={handleBack} props={props} />
            ) : (
                <StudentOTC handleBack={handleBack} props={props} />
            )
        default:
            return "Unknown step"
    }
}

export default function StudentPaymentMethod(props) {
    const classes = useStyles()
    const [activeStep, setActiveStep] = React.useState(0)
    const [skipped, setSkipped] = React.useState(new Set())
    const steps = getSteps()

    const isStepSkipped = step => {
        return skipped.has(step)
    }

    const handleNext = () => {
        let newSkipped = skipped
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values())
            newSkipped.delete(activeStep)
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1)
        setSkipped(newSkipped)
    }

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }

    const handleReset = () => {
        setActiveStep(0)
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {}
                    const labelProps = {}
                    if (isStepSkipped(index)) {
                        stepProps.completed = false
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={handleReset} className={classes.button}>
                            Reset
                        </Button>
                    </div>
                ) : (
                    <div style={{ marginTop: "2%" }}>
                        {getStepContent(activeStep, props, handleNext, handleBack)}
                        {/*<div style={{ padding: "24px" }}>*/}
                        {/*    {activeStep === 0 ? null : (*/}
                        {/*        <div>*/}
                        {/*            <Button onClick={handleBack} className={classes.button}>*/}
                        {/*                Back*/}
                        {/*            </Button>*/}
                        {/*            <Button*/}
                        {/*                variant="contained"*/}
                        {/*                color="primary"*/}
                        {/*                onClick={handleNext}*/}
                        {/*                className={classes.button}*/}
                        {/*            >*/}
                        {/*                {"Pay"}*/}
                        {/*            </Button>*/}
                        {/*        </div>*/}
                        {/*    )}*/}
                        {/*</div>*/}
                    </div>
                )}
            </div>
        </div>
    )
}
