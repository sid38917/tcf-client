import React from 'react';

import {Table} from 'antd'

const MeasurementTable = ({data}) => {
    const columns = [
        {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
        },
        {
            title: 'value',
            dataIndex: 'value',
            key: 'value'
        }
    ]

    //GUI
    return (
        <>
            
        <Table columns = {columns} dataSource={data} pagination={false}/>

        {/* {JSON.stringify} */}

        </>
    )

}

export default MeasurementTable