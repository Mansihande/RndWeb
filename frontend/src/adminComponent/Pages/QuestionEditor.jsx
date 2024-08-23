import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
      [{ 'font': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['clean']
  ],
  clipboard: {
      matchVisual: false,
  }
};

const QuestionEditor = ({ questions, setQuestions }) => {
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', answer: '' }]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 font-bold">Questions</label>
      {questions.map((q, index) => (
        <div key={index} className="mb-4">
          <ReactQuill
            value={q.question}
            onChange={(value) => handleQuestionChange(index, 'question', value)}
            modules={modules}
            className="border border-gray-300 rounded-md mb-2"
          />
          <ReactQuill
            value={q.answer}
            onChange={(value) => handleQuestionChange(index, 'answer', value)}
            modules={modules}
            className="border border-gray-300 rounded-md"
          />
          <button
            type="button"
            onClick={() => handleRemoveQuestion(index)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md mt-2"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddQuestion}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
      >
        Add Question
      </button>
    </div>
  );
};

export default QuestionEditor;
