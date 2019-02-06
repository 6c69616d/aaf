import React from 'react';

const Files = (props) => {
    let fi = {
        key: props.id,
        id: props.id,
        nameWithFileType: props.nameWithFileType,
        original_author: props.original_author,
    }

    return (
        <tr>
            <td>{props.nameWithFileType}</td>
            <td>{props.original_author}</td>
        </tr>
    );
}

export default Files