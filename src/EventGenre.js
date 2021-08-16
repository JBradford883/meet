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

  return (
    <ResponsiveContainer height={400} >
      <PieChart margin={{ top: 10, right: 10, bottom: 20, left: 10, }}>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          labelLine={false}
          legendType='square'
          outerRadius={80}
          fill="8884d8"
          dataKey="value"
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
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