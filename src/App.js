import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import FunctionButton from "./components/functionButton";
import NumberButton from "./components/numberButton";
import { MathSymbols } from "./components/mathSymbols";

import "./App.css";

export default class App extends React.Component {
  state = {
    displayValue: "currentValue",
    currentValue: "0",
    mathOperationValue: "",
    result: "",
    isNegative: false,
    mathOperation: null,
  };


  //Operations are "AC", +/-, and %
  inputOperation = (operation) => {
    switch (operation) {
      case "AC":
        this.setState({
          displayValue: "currentValue",
          currentValue: "0",
          isNegative: false,
          mathOperation: null,
          mathOperationValue: "",
          result: "",
        });
        break;
      case "+/-":
        break;
      case "%":
        break;
      default:
        return;
    }
    return;
  };

  //initial starting point to check number input
  inputValue = (value) => {
    //prevents duplication of decimals
    if (value === ".") return this.inputDecimal(value);

    //limit the number of numbers you can enter
    if (this.state.currentValue.length >= 12 || this.state.currentValue === value) return;

    //appends values inputted to current value string
    return this.valueFormatter(value);
  };

  valueFormatter = (value) => {
    //appends letter to string
    if (this.state.currentValue === "0") return this.setState({ currentValue: String(value), displayValue: "currentValue" });

    const { currentValue, mathOperationValue, result, mathOperation } = this.state;

    //mathOperation not being a null means that the user has enabled an arthemtic function
    if (this.state.mathOperation !== null)
      return this.setState({
        mathOperationValue: mathOperationValue.concat(String(value)),
        displayValue: "mathOperationValue",
      });

    //if mathOperation is null then user is inputing a set of numbers
    return this.setState({
      currentValue: currentValue.concat(String(value)),
      displayValue: "currentValue",
    });
  };


  //Called when user fires "=" input
  arthermticOperation = () => {
    const { currentValue, mathOperationValue, mathOperation, result } = this.state;
    let value = null;
    let parseValue;

    if("" !== result ){
      parseValue = result;
    }else{
      parseValue = currentValue
    }

    switch (mathOperation) {
      case "÷":
        value = parseFloat(parseValue) / parseFloat(mathOperationValue);
        break;
      case "×":
        value = parseFloat(parseValue) * parseFloat(mathOperationValue);
        break;
      case "-":
        value = parseFloat(parseValue) - parseFloat(mathOperationValue);
        break;
      case "+":
        value = parseFloat(parseValue) + parseFloat(mathOperationValue);
        break;
      default:
        return;
    }

    const parseResult = String(value)
      .toString();


    return this.setState({ result: parseResult, displayValue: "result" });
  };

  //sets the math operation i.e. +, -, /, *
  inputMathOperation = (mathOperation) => {

    if(this.state.result !== "") return this.setState({ mathOperation, currentValue: this.state.result, mathOperationValue: "" })

    return this.setState({ mathOperation });
  };


  //can only have one decimal
  inputDecimal = (value) => {
    const { currentValue, mathOperationValue, mathOperation } = this.state;

    //checks mathoperation has a decimal
    if (mathOperation !== null) {
      if (mathOperationValue.indexOf(".") === -1) {
        return this.setState({ mathOperationValue: mathOperationValue.concat(String(value)) });
      }
    }

    //checks currentValue has a decimal
    if (currentValue.indexOf(".") === -1) {
      return this.setState({ currentValue: currentValue.concat(String(value)) });
    }

    return;
  };

  render() {
    const { mathOperationValue, result, currentValue, displayValue } = this.state;

    return (
      <Container maxWidth="xs" style={{ background: "#646464", padding: 0 }}>
        <Typography variant={"h2"} align={"right"} style={{ color: `white`, paddingRight: `1rem` }}>
          {   
              displayValue === "currentValue" ? currentValue
            : displayValue === "mathOperationValue" ? mathOperationValue
            : displayValue === "result" ? result
            : currentValue
          }
        </Typography>

        <Grid container>
          <Grid item xs={9}>
            <FunctionButton currentValue={this.state.currentValue} inputOperation={this.inputOperation} />
            <NumberButton inputValue={this.inputValue} />
          </Grid>

          <Grid item xs={3}>
            <MathSymbols
              inputMathOperation={this.inputMathOperation}
              arthermticOperation={this.arthermticOperation}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}
