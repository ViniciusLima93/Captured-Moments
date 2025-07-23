class UploadFileService {

    async execute( {file}: any) {
        try {

            const imageUrl = `http://localhost:8000/uploads/${file.filename}`;
            return  imageUrl ;


        }catch (error) {

            throw new Error("Error while uploading file");
        }
    }
 }
export {
    UploadFileService
}