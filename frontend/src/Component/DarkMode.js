import React from "react";
import { Button } from '@douyinfe/semi-ui';

export const DarkMode = () => {

    const toggleDarkMode = () => {
        const body = document.body;
        if (body.hasAttribute('theme-mode')) {
            body.removeAttribute('theme-mode');
        } else {
            body.setAttribute('theme-mode', 'dark');
        }
    }

    return (
        <Button onClick={toggleDarkMode}>Dark Mode</Button>
    );
};
