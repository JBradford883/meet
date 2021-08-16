import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const EventGenre = ({ events }) => {

  const [data, setData] = useState([]);

  const getData = () => {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
    const data = genres.map((genre) => {
      const value = events.filter((event) => event.summary.split(' ').includes(genre)).length;
      return { name: genre, value };
    });
    return data;
  };

  useEffect(() => { setData(() => getData()); }, [events]);
  const colors = ['#d0427f', '#f8a01f', '#528272', '#f15f4b', '#7dbeb8', '#5c69a0'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer height={400} >
      <PieChart margin={{ top: 10, right: 10, bottom: 20, left: 10, }}>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          labelLine={false}
          legendType='square'
          outerRadius={130}
          fill="8884d8"
          dataKey="value"
          label={renderCustomizedLabel}>
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))
          }
        </Pie>
        <Legend layout="horizontal" align="center" verticalAlign="bottom"></Legend>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EventGenre;