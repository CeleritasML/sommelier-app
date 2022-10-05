import React from 'react';
import { Button, Space, TextArea, Toast } from '@douyinfe/semi-ui';

export const Input = ({ setRecommend }) => {
    const [text, setText] = React.useState(
        'Subtle aromas of dark cherry, toasted mahogany and roasted nut are very balanced on the nose of this bottling.'
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if the description is longer than 10 characters
        if (text.length <= 10) {
            Toast.error('Description must be at least 10 characters');
            return;
        } else if (text.length > 500) {
            Toast.error('Description must be no more than 500 characters');
            return;
        }
        fetch('/api/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text }),
        })
            .then((res) => res.json())
            .then((data) => {
                // Check if error is returned
                if (data.error) {
                    Toast.error(data.error);
                    return;
                }
                setRecommend(data);
            });
    };

    return (
        <Space wrap style={{ width: '100%' }}>
            <TextArea
                maxCount={500}
                autosize
                showClear
                value={text}
                onChange={setText}
            />
            <Button onClick={handleSubmit} theme="solid" type="primary">
                🍷 Hear me out!
            </Button>
        </Space>
    );
};
