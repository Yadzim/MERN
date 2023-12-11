import { Area, TinyArea } from '@ant-design/charts';
import React, { useState, useEffect } from 'react';

const data = [
  {
    "timePeriod": "2006 Q3",
    "value": 1
  },
  {
    "timePeriod": "2006 Q4",
    "value": 1.08
  },
  {
    "timePeriod": "2007 Q1",
    "value": 1.17
  },
  {
    "timePeriod": "2007 Q2",
    "value": 1.66
  },
  {
    "timePeriod": "2017 Q3",
    "value": 2.38
  },
  {
    "timePeriod": "2017 Q4",
    "value": 2.59
  },
  {
    "timePeriod": "2018 Q1",
    "value": 2.63
  },
  {
    "timePeriod": "2018 Q2",
    "value": 2.67
  },
  {
    "timePeriod": "2018 Q3",
    "value": 2.64
  },
  {
    "timePeriod": "2018 Q4",
    "value": 2.5
  },
  {
    "timePeriod": "2019 Q1",
    "value": 2.31
  },
  {
    "timePeriod": "2019 Q2",
    "value": 2.04
  },
  {
    "timePeriod": "2019 Q3",
    "value": 1.83
  },
  {
    "timePeriod": "2019 Q4",
    "value": 1.71
  },
  {
    "timePeriod": "2020 Q1",
    "value": 1.65
  },
  {
    "timePeriod": "2020 Q2",
    "value": 1.59
  },
  {
    "timePeriod": "2020 Q3",
    "value": 1.58
  }
]

const Chart = () => {
  const config = {
    data,
    xField: 'timePeriod',
    yField: 'value',
    // padding: 16,
    smooth: true,
    height: 80,
    // autoFit: false,
    style: { padding: 12 },
    xAxis: {
      range: [0, 1],
      // tickCount: 5,
    },
    yAxis: {
      range: [0, 1],
      // tickCount: 5,
    },
    // line: {
    //   size: 1,
    //   color: "red",
    //   style: () => {}
    // },
    areaStyle: () => {
      return  {
        fill: 'l(270) 0:rgba(255, 255, 255, 0.1) 0.4:rgba(126, 194, 243, 1) 1:#1890ff',
      };
    },
    tooltip: {
      customContent: (title: any, items: any) => {
        return (
          <>
            <h5 style={{ marginTop: 16 }}>{title}</h5>sdsdds
            <ul style={{ paddingLeft: 0 }}>
              {items?.map((item: any, index: number) => {
                const { name, value, color } = item;
                return (
                  <li
                    key={item.year}
                    className="g2-tooltip-list-item"
                    data-index={index}
                    style={{ marginBottom: 4, display: 'flex', alignItems: 'center' }}
                  >
                    <span className="g2-tooltip-marker" style={{ backgroundColor: color }}>sd</span>
                    <span
                      style={{ display: 'inline-flex', flex: 1, justifyContent: 'space-between' }}
                    >
                      <span style={{ marginRight: 16 }}>{name}:</span>
                      <span className="g2-tooltip-list-item-value">{value}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
        );
      },
    },
  };

  return (
    <div className="e-card m-4 p-4">
      <TinyArea {...config} data={[
        264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192,
      ]} />
      <br /><br />

      <Area limitInPlot {...config} height={240}  />
    </div>
  );
};

export default Chart;
