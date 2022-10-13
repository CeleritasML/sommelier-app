import React from 'react';
import { Button, Space, TextArea, Toast, Select } from '@douyinfe/semi-ui';

export const Input = ({ setRecommend }) => {
    const [text, setText] = React.useState(
        'Subtle aromas of dark cherry, toasted mahogany and roasted nut are very balanced on the nose of this bottling.'
    );

    const list = [
        {
            value: 'Subtle aromas of dark cherry, toasted mahogany and roasted nut are very balanced on the nose of this bottling.',
            label: 'Example 1',
            otherKey: 0,
        },
        {
            value: "From one of the producer's highest-elevation sites, this wine is perfumed in white pepper and rose petal, beguiling from the start. Fresh acidity punctuates layers of strawberry, cardamom and forest pine, taking on a slate-like texture that evokes minerality and tones of dark tea.",
            label: 'Example 2',
            otherKey: 1,
        },
        {
            value: "Toasted wood and nut aromas meet with focused graphite and dark berry on the nose of this bottling, which is led by Cabernet Sauvignon but also includes 14% Petit Verdot. There's a gritty grip to the sip, where roasted oak flavors wrap around espresso bean and fresh blackberry paste.",
            label: 'Example 3',
            otherKey: 2,
        },
        {
            value: 'Pear-flesh aromas are cut by sharp lime, grapefruit and wet rock elements on the sharp nose of this bottling. The palate is precise with a sizzling acidity and chalky texture, which give an edge to the honeydew-melon flavors.',
            label: 'Example 4',
            otherKey: 3,
        },
        {
            value: 'This wine has been given time to mature in bottle and still has years to go. Cedar, pencil shavings, crushed rock and firm tannin accentuate the savory, complex concentration and intensity. Black olive, grilled meat and game contribute additional flavor and texture.',
            label: 'Example 5',
            otherKey: 4,
        },
    ];

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
            <Select
                placeholder="Example description"
                optionList={list}
                style={{ width: '180px' }}
                onChange={(value) => setText(value)}
            ></Select>
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
