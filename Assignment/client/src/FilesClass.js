import React, { Component } from 'react';
import Files from './Files';

class FilesClass extends Component {
    constructor(props) {
        super(props);
    }  

    render() {
        return (
            <div>
                <ul>
                    <Files name="Test" />
                </ul>
            </div>
        );
    }

}

export default FilesClass

