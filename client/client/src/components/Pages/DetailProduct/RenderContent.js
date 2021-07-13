import React from 'react';

function RenderContent({ desItem, componentItem }) {
    return (
        <tbody className="show-detail">
            {
                desItem.map((item, index) => {
                    //console.log(limitRelated);
                    return <tr key={index}>
                        <td>{item}</td>
                        <td>{componentItem[index]}</td>
                    </tr>
                })
            }
        </tbody>
    );
}

export default RenderContent;