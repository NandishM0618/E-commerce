import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { Fragment } from "react";
import LocalShipping from "@mui/icons-material/LocalShipping";
import LibraryAddCheck from "@mui/icons-material/LibraryAdd";
import AccountBalance from "@mui/icons-material/AccountBalance";

export const Checkout = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShipping />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheck />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalance />,
    },
  ];
  const stepStyles = {
    boxSizing: "border-box",
  };
  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, idx) => {
          <Step
            key={idx}
            active={activeStep === idx ? true : false}
            completed={activeStep >= idx ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= idx ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>;
        })}
      </Stepper>
    </Fragment>
  );
};
