import React from 'react';
import axios from 'axios'

// Customized code from https://codepen.io/hartzis/pen/VvNGZP
class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {imageFile: '', imagePreviewUrl: ''};
    }


    // Getting POST https://localhost:5001/upload 500 (Internal Server Error) when trying to upload file to the API for some reason.
    // POST Request from Postman with an image file works as intended, and the file gets saved to wwwroot/images.
    _handleSubmit(e) {
        e.preventDefault();

        console.log(this.state.imageFile);

        const image = this.state.imageFile[0];
        console.log(image);

        const data = new FormData();
        data.append('Name', image);
        console.log(data);

        axios({
            method: 'post',
            url: 'https://localhost:5001/upload',
            data: data,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        });
    }


    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        console.log(file)

        reader.onloadend = () => {
            this.setState({
                imageFile: [file],
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} alt="error"/>);
        }

        return (
            <div className="previewComponent">
                <form onSubmit={(e) => this._handleSubmit(e)}>
                    <input className="fileInput"
                           type="file"
                           onChange={(e) => this._handleImageChange(e)}/>
                    <button className="submitButton"
                            type="submit"
                            onClick={(e) => this._handleSubmit(e)}>Upload Image
                    </button>
                </form>
                {this.state.imageFile ? (
                    <div className="imgPreview">
                        {$imagePreview}
                    </div>
                ) : ('')}
            </div>
        )
    }
}

export default ImageUpload;
