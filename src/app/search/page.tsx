import { Suspense } from 'react';
import SearchPageContent from './search-content';

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Searching...</h1>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
