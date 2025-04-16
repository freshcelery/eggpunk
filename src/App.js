import React, { useState } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (formData.name) {
        setSubmitMessage(`No, ${formData.name} is not Egg Punk`);
        setIsSubmitted(true);
      } else {
        setSubmitMessage("Please fill in all fields.");
        setIsSubmitted(false);
      }
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again.');
      setIsSubmitted(false);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: ''});
    setIsSubmitted(false);
    setSubmitMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10">
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          Is the band Egg Punk?
        </h1>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter the band name"
                className="bg-black/20 text-white border-gray-700 placeholder:text-gray-400 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className={`material-button ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-green-400 font-semibold">{submitMessage}</p>
            <button
              onClick={resetForm}
              className="bg-gray-700/90 text-white hover:bg-gray-700 transition-colors duration-200 rounded-md py-2"
            >
              Reset Form
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
