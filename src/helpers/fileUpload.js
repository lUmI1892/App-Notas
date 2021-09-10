

export const fileUpload = async (file)=>{

    const cluodUrl = 'https://api.cloudinary.com/v1_1/dqsdwvs5c/upload';

    const formData = new FormData();

    formData.append( 'upload_preset','react-journal' );
    formData.append( 'file',file );

    try {
        
        const resp = await fetch( cluodUrl, {
            method: 'POST',
            body: formData
        });

        if( resp.ok ){
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        }else{
            return null;
        }



    } catch (err) {
        throw err;
    }

}