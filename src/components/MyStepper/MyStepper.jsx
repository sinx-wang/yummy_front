import React from "react";
import { Stepper, Step, StepLabel } from "@material-ui/core";

class MyStepper extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  getSteps = (step) => {
    let steps = ["等待接单...", "等待备货", "等待运输", "等待签收"];
    switch (step) {
      case 1:
        steps = ["已接单", "商家备货中...", "等待运输", "等待签收"];
        break;
      case 2:
        steps = ["已接单", "商家备货完成", "运输中...", "等待签收"];
        break;
      case 3:
        steps = ["已接单", "商家备货完成", "运输中", "已签收"];
        break;
      default:
        break
    }
    return steps;
  }

  render() {
    const activeStep = this.props.step;
    const steps = this.getSteps(activeStep);

    return (
      <div style={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    )
  }

}

export default MyStepper;