import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  RadialLinearScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Radar, Pie } from 'react-chartjs-2';
import './App.css';

ChartJS.register(
  CategoryScale,
  RadialLinearScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

const defaultXAxisInput = 'January, February, March, April, May';
const defaultYAxisInput = '1, 5, 10, 1, 2';
const defaultlabels = defaultXAxisInput.split(', ');
const defaultvalues = defaultYAxisInput.split(', ');
const radioButtons = [
  {name: 'bar', label: 'Bar Chart'},
  {name: 'line', label: 'Line Chart'},
  {name: 'radar', label: 'Radar Chart'},
  {name: 'pie', label: 'Pie Chart'},
];

function App() {
  const [xAxisInput, setXAxisInput] = useState(defaultXAxisInput);
  const [yAxisInput, setYAxisInput] = useState(defaultYAxisInput);
  const [labels, setLabels] = useState(defaultlabels);
  const [values, setValues] = useState(defaultvalues);
  const [chartType, setChartType] = useState('bar');

  const data = {
    labels,
    datasets: [
      {
        label: 'Months',
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const onInputChange = (event, setInput) => {
    setInput(event.target.value);
  }

  const onInputUpdate = (event, setValues) => {
    const values = event.target.value.split(', ');
  
    setValues(values);
  }

  const onInputKeyUp = (event, setValues) => {
    console.log(event.target.value);
    if (event.key === 'Enter' || event.keyCode === 13) {
      onInputUpdate(event, setValues);
    }
  }

  const onRadioButtonChange = (event) => {
    setChartType(event.target.name);
  }

  const getChart = (data) => {
    switch (chartType) {
      case 'bar':
        return Bar;
      
      case 'line':
        return Line;
      
      case 'radar':
        return Radar;

      case 'pie':
        return Pie;

      default:
        break;
    }
  }

  const getRadioButton = (name, label) => {
    return (
      <div key={name} className="radioButtons__item">
        <input
          type="radio"
          name={name}
          id={name}
          checked={chartType === name}
          onChange={onRadioButtonChange}
        />
        <label htmlFor={name}>{label}</label>
      </div>
    )
  }

  const Chart = getChart(data);

  return (
    <div className='app'>
      <div className='container'>
        <div className="axisValues">
          <label htmlFor="x-axis">X axis labels:</label><br />
          <input 
            className="axisValues__input" 
            type="text" 
            id="x-axis"
            value={xAxisInput}
            onChange={(event) => onInputChange(event, setXAxisInput)}
            onBlur={(event) => onInputUpdate(event, setLabels)}
            onKeyUp={(event) => onInputKeyUp(event, setLabels)}
          />
        </div>

        <div className="axisValues">
          <label htmlFor="y-axis">Y axis values:</label><br />
          <input 
            className="axisValues__input" 
            type="text" 
            id="y-axis"
            value={yAxisInput}
            onChange={(event) => onInputChange(event, setYAxisInput)}
            onBlur={(event) => onInputUpdate(event, setValues)}
            onKeyUp={(event) => onInputKeyUp(event, setValues)}
          />

          <div className="chart">
            <Chart data={data} />
          </div>
        </div>

        <div className='radioButtons'>
          {radioButtons.map(radioButton => {
            const { name, label } = radioButton;

            return getRadioButton(name, label);
          })}
        </div>
      </div>     
    </div>
  )
}

export default App;
