import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";

const Edit = () => {
  const contests = useLoaderData();
  const { id } = useParams();
  const contest = contests.find(contest => contest._id === id);
  const [deadline, setDeadline] = useState(new Date(contest.deadline));

  const handleUpdate = event => {
    event.preventDefault();
    const form = event.target;

    const contestName = form.contestName.value;
    const image = form.image.files[0];
    const description = form.description.value;
    const price = form.price.value;
    const prizeMoney = form.prizeMoney.value;
    const taskInstruction = form.taskInstruction.value;
    const selectedTag = form.selectedTag.value;
    const email = contest.email;

    const formData = new FormData();
    formData.append("contestName", contestName);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("prizeMoney", prizeMoney);
    formData.append("taskInstruction", taskInstruction);
    formData.append("selectedTag", selectedTag);
    formData.append("deadline", deadline.toISOString());
    formData.append("email", email);

    fetch(`https://contesthub-server-gules.vercel.app/pending/${contest._id}`, {
      method: 'PUT',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: 'Success!',
            text: 'Data updated',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        }
      })
      .catch(error => {
        console.error('Error updating contest:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update contest',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <div className="container mx-auto lg:px-20 px-5 py-5">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-8">Edit Contest</h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Contest Name:</label>
              <input
                type="text"
                defaultValue={contest.contestName}
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
                defaultValue={contest.description}
                placeholder="Contest Description"
                className="input w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label>Contest Price:</label>
              <input
                type="number"
                name="price"
                defaultValue={contest.price}
                placeholder="Contest Price"
                className="input w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label>Prize Money:</label>
              <input
                type="number"
                name="prizeMoney"
                defaultValue={contest.prizeMoney}
                placeholder="Prize Money"
                className="input w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label>Task Submission Text Instruction:</label>
              <textarea
                name="taskInstruction"
                defaultValue={contest.taskInstruction}
                placeholder="Task Instruction"
                className="input w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label>Contest Type/Tags:</label>
              <select
                name="selectedTag"
                defaultValue={contest.selectedTag}
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
                onChange={date => setDeadline(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="input w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label>Donator Email:</label>
              <input
                type="email"
                value={contest.email}
                readOnly
                name="email"
                id="email"
                placeholder="Donator Email"
                className="input w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
