import React from "react";
import { Button, TextArea, Toast } from '@douyinfe/semi-ui';

export const Input = ({ setRecommend }) => {

    const [text, setText] = React.useState('I would like a wine that is');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if the description is longer than 10 characters
        if (text.length <= 10) {
            Toast.error('Description must be at least 10 characters');
            return
        }
        fetch("/api/recommend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: text }),
        })
            .then((res) => res.json())
            .then((data) => {
                // Check if error is returned
                if (data.error) {
                    Toast.error(data.error);
                    return
                }
                setRecommend(data);
            });
    };

    return (
        <div>
            <TextArea maxCount={200} showClear value={text} onChange={setText} />
            <Button onClick={handleSubmit}>Get Recommendation</Button>
        </div>
    );
}
