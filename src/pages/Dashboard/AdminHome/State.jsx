
import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, ResponsiveContainer, Sector } from 'recharts';

const barColors = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042', 'red', 'pink'];
const pieColors = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042'];

const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
};

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const State = ({ stats }) => {

    const monthlyRevenueData = [
        { name: 'Jan', revenue: 550 },
        { name: 'Feb', revenue: 430 },
        { name: 'Mar', revenue: 400 },
        { name: 'Apr', revenue: 200 },
        { name: 'May', revenue: 100 },
        { name: 'Jun', revenue: 170 },
        { name: 'Jul', revenue: 490 },
        { name: 'Aug', revenue: 410 },
        { name: 'Sep', revenue: 350 },
        { name: 'Oct', revenue: 200 },
        { name: 'Nov', revenue: 90 },
        { name: 'Dec', revenue: 190 },
    ];

    const pieData = [
        { name: 'Total Revenue', value: stats.totalRevenue || 0 },
        { name: 'Paid Total', value: stats.paidTotal || 0 },
        { name: 'Pending Total', value: stats.pendingTotal || 0 },
    ];

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-5">Revenue Overview</h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-white  rounded-lg shadow-md">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart
                            // width="100%"
                            // height={300}
                            data={monthlyRevenueData}
                            margin={{ top: 30, right: 30,  bottom: 10 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="revenue" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                                {monthlyRevenueData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default State;