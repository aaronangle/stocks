import React, { useEffect } from "react";
import Chart from "chart.js";
import styles from "./style.module.css";
import { useQuery } from '@apollo/react-hooks';
import { GET_EARNINGS } from "../../graphql/query";
import LoadingSpinner from "../../utititlyComponents/LoadingSpinner/LoadingSpinner";

const StockChart = (props) => {
    const { name } = props;
    const chartRef = React.createRef();

    const { loading, error, data } = useQuery(GET_EARNINGS, { variables: { name } });

    if (loading) return (
        <div className={styles.chart}>
            <div className={styles.loading}>
                <LoadingSpinner />
            </div>
        </div>
    );
    if (error) return `Error! ${error.message}`;
    (async function waitToSet() {
        let actualEarning = [];
        let estimateEarning = [];
        let firstColor = [];
        let secondColor = [];
        let period = [];

        await data.earnings.splice(0, 8).forEach(element => {
            actualEarning.push(element.actual);
            estimateEarning.push(element.estimate);
            firstColor.push("#5533ff");
            secondColor.push("#3297d3")
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
                            backgroundColor: firstColor
                        },
                        {
                            label: "Actual Earnings Per Share",
                            data: [...actualEarning],
                            backgroundColor: secondColor
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