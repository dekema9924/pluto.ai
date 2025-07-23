const cloudinary = require('cloudinary').v2;
const Userdb = require('../../models/UserModel')




const uploadProfileImage = async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send("No file uploaded.");
    }
    console.log(file)

    // Upload an image
    try {
        // Wrap stream in a promise
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'profile_images',
                    public_id: file.originalname.split('.')[0], // remove extension
                    resource_type: 'auto'
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            stream.end(file.buffer); // Write the file buffer into the stream
        });


        //store url in database
        const userId = req.user.userId;
        if (!userId) {
            return res.status(400).json({ error: 'User ID not found' });
        }


        const saveUrl = await Userdb.findByIdAndUpdate(userId, {
            profileImage: result.secure_url
        })

        if (saveUrl) {
            console.log("Profile image URL saved:");
            return res.status(200).json({ message: ' upload successfully' });
        }



    } catch (error) {
        console.error("Cloudinary upload failed:", error);
        res.status(500).json({ error: 'Upload failed' });
    }


}

module.exports = uploadProfileImage;