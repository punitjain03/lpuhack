import React from "react";
import "./index.css";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

const Charts = () => {
  const data = [
    { name: "Confirmed", users: 32249900 },
    { name: "Recovered", users: 31441260 },
    { name: "Deaths", users: 432112 },
    { name: "Active", users: 363849 },
  ];

  return (
    <div style={{ textAlign: "center" ,background: "pink"}}>
      <br />
	   <h1>Analytics</h1>
	   <br />
	   <br />
	  <div className="Charts">
       
        <BarChart
          width={500}
          height={300}
          data={data}
		  textAlign="center"
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
		<br />
		<br />
      </div>
    </div>
  );
};

export default Charts;