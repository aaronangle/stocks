import React, { useEffect } from "react";
import axios from "axios";
import Chart from "chart.js";
import styles from "./style.module.css";
import { useQuery } from '@apollo/react-hooks';
import { GET_EARNINGS } from "../../graphql/query";

const StockChart = (props) => {
    const { name } = props;
    const chartRef = React.createRef();

    const { loading, error, data } = useQuery(GET_EARNINGS, { variables: { name } });

    if (loading) return '';
    if (error) return `Error! ${error.message}`;
    (async function waitToSet() {
        let actualEarning = [];
        let estimateEarning = [];
        let period = [];

        await data.earnings.splice(0, 8).forEach(element => {
            actualEarning.push(element.actual);
            estimateEarning.push(element.estimate);
            period.push(element.period)
        })

        await setChart();

        function setChart() {
            const myChartRef = chartRef.current.getContext("2d");
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
                            backgroundColor: ["#3297d3", "#3297d3", "#3297d3", "#3297d3", "#3297d3", "#3297d3", "#3297d3", "#3297d3"]
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
    })();

    return (
        <div className={styles.chart}>
            <canvas id="myChart" ref={chartRef} />
        </div>
    )
}

export default StockChart;