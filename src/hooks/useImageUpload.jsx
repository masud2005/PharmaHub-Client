import useAxiosPublic from "./useAxiosPublic";

const useImageUpload = () => {
    const axiosPublic = useAxiosPublic();

    const uploadImage = async (imageFile) => {
        const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
        const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

        try {
            const formData = new FormData();
            formData.append("image", imageFile);

            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return res.data.data.display_url; // Return uploaded image URL
        } catch (error) {
            console.error("Image upload failed:", error);
            throw new Error("Failed to upload image.");
        }
    };

    return { uploadImage }; // Return the function
};

export default useImageUpload;
