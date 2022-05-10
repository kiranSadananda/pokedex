import React, { useEffect, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

// Define data

const PokeStats = ({ stats, types }) => {
    const chartRef = useRef(null);
    let data = []
    const getStatsData = () => {
        stats.forEach(element => {
            data.push({"stat-name": element.stat.name,"base-stat": element.base_stat})
        });
    }
    useEffect(() => {
        getStatsData();
        let root = am5.Root.new("chartdiv");
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        let chart = root.container.children.push(am5radar.RadarChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX"
        }));
        // Add cursor
        let cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
            behavior: "zoomX"
        }));
        cursor.lineY.set("visible", false);

        var xRenderer = am5radar.AxisRendererCircular.new(root, {});
        xRenderer.labels.template.setAll({
        radius: 25
        });
        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0,
            categoryField: "stat-name",
            renderer: xRenderer
        }));
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5radar.AxisRendererRadial.new(root, {})
        }));
        let series = chart.series.push(am5radar.RadarLineSeries.new(root, {
            name: "Series",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "base-stat",
            categoryXField: "stat-name",
            tooltip:am5.Tooltip.new(root, {
              labelText:"{valueY}"
            })
        }));
        series.strokes.template.setAll({
            strokeWidth: 2
        });

        series.bullets.push(function () {
            return am5.Bullet.new(root, {
              sprite: am5.Circle.new(root, {
                radius: 5,
                fill: series.get("fill")
              })
            });
        });
        series.data.setAll(data);
        xAxis.data.setAll(data);
        series.appear(1000);
        chart.appear(1000, 100);
        chartRef.current = root;
        return () => {
          chartRef.current && chartRef.current.dispose();
        };
      }, []);
    return (
      <div className="container-bar mt-0">
        <h4 className="w-100 mb-4 section-title">Stats</h4>
        <div id="chartdiv" style={{width: '100%', height:'500px', margin: '35px 0'}}></div>
      </div>
    );
};

export default PokeStats;