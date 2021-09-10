import cloudinary from 'cloudinary';

import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config ({ 
    cloud_name : 'dqsdwvs5c' , 
    api_key : '986725797492998' , 
    api_secret : 'z2a3JCA7xNUSEoEIjbRTlKSeiOg' ,
    secure : true 
});

describe('Pruebas en fileUpload', () => {

    test('Debe de cargar un archivo y retornar el URL ', async() => {
        
        const resp = await fetch('https://st2.depositphotos.com/1852625/5395/i/600/depositphotos_53954927-stock-photo-beautiful-landscape-of-scottish-nature.jpg');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');

        const url = await fileUpload(file);

        expect(typeof url).toBe( 'string' );

        const segment = url.split('/');
        const imageId = segment[ segment.length - 1 ].replace('.jpg','');

        cloudinary.v2.api.delete_resources(imageId);

    })

    test('Debe de mostrar una respuesta incorrecta', async() => {
        
        const file = new File([], 'foto.png');

        const url = await fileUpload(file);

        expect( url ).toBe( null );
    })
    
    
})
