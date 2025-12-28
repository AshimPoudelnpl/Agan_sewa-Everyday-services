const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-blue-600 font-medium">{text}</span>
    </div>
  );
};

export default Loading;
