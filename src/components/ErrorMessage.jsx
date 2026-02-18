const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="w-full max-w-2xl fade-in">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-red-200 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 rounded-full p-4">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
