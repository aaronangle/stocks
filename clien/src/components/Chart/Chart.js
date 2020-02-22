import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js";
import styles from "./style.module.css"
const StockChart = (props) => {
    const { name } = props;
    const chartRef = React.createRef();

    useEffect(() => {
        let earningsData;
        let actualEarning = [];
        let estimateEarning = [];
        let period = [];

        axios.get(`/api/earnings/${name}`)
            .then(async response => {
                earningsData = response.data.data
                await earningsData.forEach(element => {
                    actualEarning.push(element.actual)
                    estimateEarning.push(element.estimate)
                    period.push(element.period)
                })
                await setChart();
            })
        const myChartRef = chartRef.current.getContext("2d");
        function setChart() {
            new Chart(myChartRef, {
                type: "bar",
                data: {
                    labels: [...period],
                    datasets: [
                        {
                            label: "Estimated Earnings Per Share",
                            data: [...estimateEarning],
                            backgroundColor: ["#5533ff", "#5533ff", "#5533ff", "#5533ff", "#5533ff", "#5533ff", "#5533ff", "#5533ff"]
                        },
                        {
                            label: "Actual Earnings Per Share",
                            data: [...actualEarning],
                            backgroundColor: ["#3297d3", "#3297d3", "#3297d3", "#3297d3", "#3297d3", "#3297d3", "#3297d3",]
                        }
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Earnings Per Share'
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: function (value, index, values) {
                                    return '$' + value.toFixed(2);
                                }
                            }
                        }]
                    }
                }
            })
        }
    }, [])

    return (
        <div className={styles.chart}>
            <canvas id="myChart" ref={chartRef} />
        </div>
    )
}

export default StockChart;