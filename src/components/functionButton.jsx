import React from "react";
import { Button, Grid } from "@material-ui/core";

export default class FunctionButton extends React.Component {
  render() {
    
    return (
      <Grid container>
        {["AC", "+/-", "%"].map((operation, index) => (
          <Grid style={{ padding: `1px` }} key={index} item xs={4}>
            <Button
              fullWidth
              variant="contained"
              style={{ height: `75px`, borderRadius: `0px` }}
              color={"primary"}
              onClick={() => this.props.inputOperation(operation)}
            >
                {operation === "AC" && this.props.currentValue === "0" ? "AC" : operation !== "AC" ? operation : "C"}
            </Button>
          </Grid>
        ))}
      </Grid>
    );
  }
}
