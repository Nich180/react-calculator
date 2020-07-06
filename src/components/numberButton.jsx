import React from "react";
import { Button, Grid } from "@material-ui/core";

export default class NumberButton extends React.Component {
  render() {
    const Buttons = ({number, calculation}) => {

      return (
        <Button
          color={this.props.color}
          variant="contained"
          style={{ height: `75px`, borderRadius: `0px` }}
          fullWidth
          onClick={() => calculation(number)}
        >
            {number}
        </Button>
      );
    };

    return (
      <Grid container>
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.'].map((number, index) => (
          <Grid style={{ padding: `1px` }} key={index} item xs={index === 9 ? 8 : 4}>
            <Buttons color={"primary"} calculation={this.props.inputValue} number={number} />
          </Grid>
        ))}
      </Grid>
    );
  }
}
