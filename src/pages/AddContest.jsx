import { useContext, useState } from "react";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../provider/AuthProvider";

const AddContest = () => {
    const { user } = useContext(AuthContext);
    const [deadline, setDeadline] = useState(null);
    const userEmail = user ? user.email : '';
    const creatorName = user ? user.displayName : '';
    const creatorImage = user ? user.photoURL : '';

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;

        const contestName = form.contestName.value;
        const image = form.image.files[0];
        const description = form.description.value;
        const price = form.price.value;
        const prizeMoney = form.prizeMoney.value;
        const taskInstruction = form.taskInstruction.value;
        const selectedTag = form.selectedTag.value;
        const email = userEmail;
        const creatorNames = creatorName;
        const creatorImages = creatorImage;

        try {
            // Step 1: Upload image to image hosting service
            const image_url = await uploadImage(image);

            // Step 2: Submit contest data with image URL
            const contestData = {
                contestName,
                image: image_url, // Use the hosted image URL
                description,
                price,
                prizeMoney,
                taskInstruction,
                selectedTag,
                deadline,
                email,
                creatorNames,
                creatorImages,
            };

            const response = await fetch("https://contesthub-server-gules.vercel.app/add-contest", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contestData),
            });

            if (response.ok) {
                Swal.fire({
                    title: "Success!",
                    text: "Contest added successfully",
                    icon: "success",
                    confirmButtonText: "Close",
                });
                form.reset();
                setDeadline(null);
            } else {
                throw new Error("Failed to add contest");
            }
        } catch (error) {
            console.error("Error adding contest:", error);
            Swal.fire({
                title: "Error!",
                text: "An error occurred while adding the contest",
                icon: "error",
                confirmButtonText: "Close",
            });
        }
    };

    // Function to upload image to image hosting service
    const uploadImage = async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append("image", imageFile);

            const response = await fetch(`https://api.imgbb.com/1/upload?key=e04b2c2c85ddbc2b9379722536771dca`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                return data.data.display_url; // Return the hosted image URL
            } else {
                throw new Error("Failed to upload image");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    };

    return (
        <div className="container mx-auto lg:px-20 px-5 py-5">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-semibold mb-8">Add Contest</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label>Contest Name:</label>
                            <input
                                type="text"
                                name="contestName"
                                placeholder="Contest Name"
                                className="input w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div>
                            <label>Image:</label>
                            <input
                                type="file"
                                name="image"
                                className="input w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div>
                            <label>Contest Description:</label>
                            <textarea
                                name="description"
                                placeholder="Contest Description"
                                className="input w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div>
                            <label>Contest Price:</label>
                            <input
                                type="number"
                                name="price"
                                placeholder="Contest Price"
                                className="input w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div>
                            <label>Prize Money:</label>
                            <input
                                type="number"
                                name="prizeMoney"
                                placeholder="Prize Money"
                                className="input w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div>
                            <label>Task Submission Text Instruction:</label>
                            <textarea
                                name="taskInstruction"
                                placeholder="Task Instruction"
                                className="input w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div>
                            <label>Contest Type/Tags:</label>
                            <select
                                name="selectedTag"
                                className="input w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            >
                                <option value="">Select Tag</option>
                                <option value="Image Design Contests">Image Design Contests</option>
                                <option value="Article Writing">Article Writing</option>
                                <option value="Marketing Strategy">Marketing Strategy</option>
                                <option value="Digital Advertisement Contests">Digital Advertisement Contests</option>
                                <option value="Gaming Review">Gaming Review</option>
                                <option value="Book Review">Book Review</option>
                                <option value="Business Idea Contests">Business Idea Contests</option>
                                <option value="Movie Review">Movie Review</option>
                            </select>
                        </div>
                        <div>
                            <label>Contest Deadline:</label>
                            <DatePicker
                                selected={deadline}
                                onChange={(date) => setDeadline(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                className="input w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        Add Contest
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddContest;
