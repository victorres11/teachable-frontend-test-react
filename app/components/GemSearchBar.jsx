import React from 'react';
import request from 'superagent';


const GemSearchBar = React.createClass({

  handleImageUpload: function(file) {
    /** POST the uploaded file using backend API which will end up storing
    the file on S3.
    **/


    // let upload = request.post(this.props.apiVersion + this.props.storeImageRoute)
    //                     .field('file', file);
    //
    // upload.end((err, response) => {
    //   if (err) {
    //     console.error("there was an error: " + err);
    //   }
    // });
    //
    // this.props.onDrop(file);
  },


    render: function () {

    const formInstance = (
            <form>
              <FormGroup bsSize="large">
                <FormControl type="text" placeholder="Large text" />
              </FormGroup>
            </form>

      return (

          <div>
              {formInstance}

            {/*<Dropzone*/}
              {/*className='dropzone'*/}
              {/*onDrop={this.handleImageUpload}*/}
              {/*multiple={false}*/}
              {/*>*/}
              {/*{this.props.uploadedFile ? <i className="fa fa-check-circle fa-5x" aria-hidden="true"> </i> : <p className="dropzone-contents"> Try dropping some files here, or click to select files to upload. </p>}*/}
            {/*</Dropzone>*/}
          </div>
      );
    }
});

export default GemSearchBar;
