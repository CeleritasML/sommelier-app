import React from 'react';
import { Select } from '@douyinfe/semi-ui';

export const Selector = () => {
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
    return (
        <Select
            placeholder="Example description"
            style={{ width: 180 }}
            optionList={list}
        ></Select>
    );
};
