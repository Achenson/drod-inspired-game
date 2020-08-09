import React from 'react'

interface Props {
    text: string;
    number: number;
}

function Test({text, number}: Props): React.ReactNode {
    return (
        <div className="test-div">
            testtest{text}{number}
        </div>
    )
}

export default Test;