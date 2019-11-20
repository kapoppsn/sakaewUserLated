import React, { Component } from 'react';

class ImageUpload extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render () {
        return(
            <div>
                <input type="file" />
                <button>Upload</button>
            </div>
        )
    }
}


export default ImageUpload;