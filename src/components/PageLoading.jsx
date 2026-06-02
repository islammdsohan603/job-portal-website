const PageLoading = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen bg-[#0B0B0F] px-4 py-28">
      <div className="flex min-h-[calc(100vh-14rem)] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-2 border-white/10 border-t-orange-500 border-b-blue-500" />
          <p className="mt-5 text-sm font-semibold tracking-wide text-zinc-400">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageLoading;
