import React from 'react'

interface IContent {
    contentHeaderName: string
}


const CustomContentHeader: React.FC<IContent> = ({
    contentHeaderName
}) => {
    return (
        <React.Fragment>
            <h5>{contentHeaderName}</h5>
        </React.Fragment>
    )
}

export default CustomContentHeader
