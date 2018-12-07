import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  processColor
} from "react-native";
import update from "immutability-helper";

import { LineChart } from "react-native-charts-wrapper";

class LineChartScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      data: {},

      marker: {
        enabled: true,
        digits: 2,
        backgroundTint: processColor("teal"),
        markerColor: processColor("#F0C0FF8C"),
        textColor: processColor("white")
      },
      xAxis: {
        granularityEnabled: true,
        granularity: 1
      }
      // visibleRange: {x: {min: 1, max: 2}}
    };
  }

  componentDidMount() {
    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [
              {
                values: [
                  { x: 4, y: 135 },
                  { x: 5, y: 0.88 },
                  { x: 6, y: 0.77 },
                  { x: 7, y: 105 }
                ],
                label: "A"
              },
              {
                values: [
                  { x: 4, y: 105 },
                  { x: 5, y: 90 },
                  { x: 6, y: 130 },
                  { x: 7, y: 100 }
                ],
                label: "B"
              },
              {
                values: [
                  { x: 4, y: 110 },
                  { x: 5, y: 110 },
                  { x: 6, y: 105 },
                  { x: 7, y: 115 }
                ],
                label: "C"
              },
              {
                values: [
                  { x: 4, y: 125 },
                  { x: 5, y: 0.9 },
                  { x: 6, y: 0.75 },
                  { x: 7, y: 100 }
                ],
                label: "D"
              },
              {
                values: [
                  { x: 4, y: 110 },
                  { x: 5, y: 95 },
                  { x: 6, y: 135 },
                  { x: 7, y: 105 }
                ],
                label: "E"
              },
              {
                values: [
                  { x: 4, y: 120 },
                  { x: 5, y: 120 },
                  { x: 6, y: 110 },
                  { x: 7, y: 125 }
                ],
                label: "F"
              },
              {
                values: [
                  { x: 4, y: 130 },
                  { x: 5, y: 0.85 },
                  { x: 6, y: 0.7 },
                  { x: 7, y: 110 }
                ],
                label: "G"
              },
              {
                values: [
                  { x: 4, y: 110 },
                  { x: 5, y: 95 },
                  { x: 6, y: 135 },
                  { x: 7, y: 105 }
                ],
                label: "H"
              },
              {
                values: [
                  { x: 4, y: 120 },
                  { x: 5, y: 120 },
                  { x: 6, y: 110 },
                  { x: 7, y: 120 }
                ],
                label: "I"
              },
              {
                values: [
                  { x: 4, y: 130 },
                  { x: 5, y: 0.85 },
                  { x: 6, y: 0.7 },
                  { x: 7, y: 110 }
                ],
                label: "J"
              },
              {
                values: [
                  { x: 4, y: 110 },
                  { x: 5, y: 95 },
                  { x: 6, y: 135 },
                  { x: 7, y: 115 }
                ],
                label: "K"
              },
              {
                values: [
                  { x: 4, y: 120 },
                  { x: 5, y: 120 },
                  { x: 6, y: 110 },
                  { x: 7, y: 110 }
                ],
                label: "L"
              },
              {
                values: [
                  { x: 4, y: 130 },
                  { x: 5, y: 0.83 },
                  { x: 6, y: 0.79 },
                  { x: 7, y: 95 }
                ],
                label: "M"
              }
            ]
          }
        }
      })
    );
  }

  onPressLearnMore() {
    this.refs.chart.setDataAndLockIndex({
      dataSets: [
        {
          values: [
            { x: 1, y: 0.88 },
            { x: 2, y: 0.77 },
            { x: 3, y: 105 },
            { x: 4, y: 135 },
            { x: 5, y: 0.88 },
            { x: 6, y: 0.77 },
            { x: 7, y: 105 },
            { x: 8, y: 135 }
          ],
          label: "A"
        },
        {
          values: [
            { x: 1, y: 90 },
            { x: 2, y: 130 },
            { x: 3, y: 100 },
            { x: 4, y: 105 },
            { x: 5, y: 90 },
            { x: 6, y: 130 },
            { x: 7, y: 100 },
            { x: 8, y: 105 }
          ],
          label: "B"
        },
        {
          values: [
            { x: 1, y: 110 },
            { x: 2, y: 105 },
            { x: 3, y: 115 },
            { x: 4, y: 110 },
            { x: 5, y: 110 },
            { x: 6, y: 105 },
            { x: 7, y: 115 },
            { x: 8, y: 110 }
          ],
          label: "C"
        }
      ]
    });
  }

  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({ ...this.state, selectedEntry: null });
    } else {
      this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) });
    }

    console.log(event.nativeEvent);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Button
          onPress={this.onPressLearnMore.bind(this)}
          title="Press to load more"
        /> */}

        <View>
          <Text> selected entry</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View>

        <View style={styles.container}>
          <LineChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{ text: "LINECHART" }}
            legend={this.state.legend}
            marker={this.state.marker}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            drawGridBackground={false}
            borderColor={processColor("white")}
            borderWidth={1}
            backgroundColor={"#f15922"}
            drawBorders={true}
            autoScaleMinMaxEnabled={false}
            touchEnabled={true}
            dragEnabled={true}
            scaleEnabled={true}
            scaleXEnabled={true}
            scaleYEnabled={true}
            pinchZoom={true}
            doubleTapToZoomEnabled={true}
            highlightPerTapEnabled={true}
            highlightPerDragEnabled={false}
            // visibleRange={this.state.visibleRange}
            dragDecelerationEnabled={true}
            dragDecelerationFrictionCoef={0.99}
            ref="chart"
            keepPositionOnRotation={false}
            onSelect={this.handleSelect.bind(this)}
            onChange={event => console.log(event.nativeEvent)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  chart: {
    flex: 1
  }
});

export default LineChartScreen;
