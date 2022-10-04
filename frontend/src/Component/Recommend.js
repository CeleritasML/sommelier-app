import React from 'react';
import { Descriptions, Space, Tag } from '@douyinfe/semi-ui';

export const Recommend = ({ recommend }) => {

    const style = {
        boxShadow: 'var(--semi-shadow-elevated)',
        borderRadius: '4px',
        padding: '10px',
        margin: '10px',
        width: '30%',
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
                        <Space wrap>
                            {item.common_keywords.map((keyword, idx) => (
                                <Tag key={idx}>{keyword}</Tag>
                            ))}
                        </Space>
                    </Descriptions.Item>
                    <Descriptions.Item itemKey="Special Keywords">
                        <Space wrap>
                            {item.special_keywords.map((keyword, idx) => (
                                <Tag key={idx}>{keyword}</Tag>
                            ))}
                        </Space>
                    </Descriptions.Item>
                    <Descriptions.Item itemKey="Score">{(item.probability * 100).toFixed(2)}</Descriptions.Item>
                </Descriptions>
            ))
            }
        </div >
    );
}
