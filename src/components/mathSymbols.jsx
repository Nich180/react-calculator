import React from "react";
import { Grid, Button } from "@material-ui/core";

export const MathSymbols = ({ inputMathOperation, arthermticOperation }) => (
  <Grid container>
    {["÷", "×", "-", "+", "="].map((symbol, index) => (
      <Grid item key={index} xs={12} style={{ padding: `1px` }}>
        <Button
          color={"secondary"}
          variant="contained"
          style={{ height: `75px`, borderRadius: `0px` }}
          fullWidth
          onClick={symbol !== "=" ? () => inputMathOperation(symbol) : () => arthermticOperation()}
        >
          {symbol}
        </Button>
      </Grid>
    ))}
  </Grid>
);