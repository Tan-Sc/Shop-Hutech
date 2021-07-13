import React, { useContext, useState } from 'react';
import { XYPlot, VerticalBarSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines } from 'react-vis';

import { GlobalState } from '../../GlobalState'

import './AdminHome.css'

function AdminHome() {
    const state = useContext(GlobalState)
    const [history] = state.UserAPI.history
    const checked = history.filter(item => item.status === true)

    const [date, setDate] = useState(Date())
    let data = []
    const gidoll = checked.filter((item) => {
        if (new Date(item.updatedAt).getFullYear() === new Date(date).getFullYear() && new Date(item.updatedAt).getMonth() === new Date(date).getMonth())
            return item
    })
    gidoll.map((item, index) => {
        data.push({ x: index, y: item.total })
    })
    console.log(data);
    return (
        <div className="chart">
            <XYPlot height={400} width={400}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis width={80} />
                <YAxis width={50} />
                <VerticalBarSeries data={data} width={40} />
            </XYPlot>
        </div>
    );
}

export default AdminHome;