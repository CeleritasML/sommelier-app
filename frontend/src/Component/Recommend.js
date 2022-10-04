import React from 'react';
import { Descriptions, Typography } from '@douyinfe/semi-ui';

export const Recommend = ({ recommend }) => {

    const { Text } = Typography;

    const style = {
        boxShadow: 'var(--semi-shadow-elevated)',
        borderRadius: '4px',
        padding: '10px',
        margin: '10px',
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {recommend.map((item, idx) => (
                <Descriptions key={idx} align="center" style={style}>
                    <Descriptions.Item itemKey="Rank">{idx + 1}</Descriptions.Item>
                    <Descriptions.Item itemKey="Variety">{item.variety}</Descriptions.Item>
                    <Descriptions.Item itemKey="Country">{item.country}</Descriptions.Item>
                    <Descriptions.Item itemKey="Province">{item.province}</Descriptions.Item>
                    <Descriptions.Item itemKey="Keywords">
                        <Text ellipsis={{ showTooltip: true }} style={{ width: '200px' }}>
                            {JSON.stringify(item.keywords)}
                        </Text>
                    </Descriptions.Item>
                    <Descriptions.Item itemKey="Score">{(item.probability * 100).toFixed(2)}</Descriptions.Item>
                </Descriptions>
            ))}
        </div>
    );
}
