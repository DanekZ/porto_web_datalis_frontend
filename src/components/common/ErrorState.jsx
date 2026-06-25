const ErrorState = ({ message = "Gagal memuat data.", onRetry }) => (
  <div className="py-16 text-center">
    <div className="mb-4">
      <svg className="mx-auto w-16 h-16 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    </div>
    <h3 className="mb-2 text-xl font-medium text-slate-300">Oops, terjadi kesalahan</h3>
    <p className="mb-6 text-slate-400">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
        Coba Lagi
      </button>
    )}
  </div>
);

export default ErrorState;
