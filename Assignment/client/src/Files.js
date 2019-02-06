import React from 'react';

const Files = (props) => {
    let fi = {
        key: props.id,
        id: props.id,
        nameWithFileType: props.nameWithFileType,
        original_author: props.original_author,
    }
    let editFile = props.ef;
    let boundEditFile = editFile.bind(this, fi);

    return (
        <tr>
            <td>{props.nameWithFileType}</td>
            <td>{props.original_author}</td>
            <td>
                <button 
                    onClick={boundEditFile} 
                    >
                    Edit
                </button>
            </td>
        </tr>
    );
}

export default Files
