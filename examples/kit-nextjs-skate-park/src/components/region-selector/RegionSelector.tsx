import { useEffect, useState } from 'react';
import { event } from '@sitecore-cloudsdk/events/browser';

const regions = ['West', 'Midwest', 'South'];

export default function RegionSelector() {
  const [selectedRegion, setSelectedRegion] = useState('');

  const eventCalled = (region: string) => {
    try {
      event({
        type: 'Region',
        channel: 'web',
        pointOfSale: 'play-finance',
        extensionData: { regionSelected: region },
      }).catch((e) => console.debug(e));
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    const savedRegion = localStorage.getItem('selectedRegion');
    if (savedRegion) {
      setSelectedRegion(savedRegion);
    }
  }, []);

  const handleChange = (region: string) => {
    setSelectedRegion(region);
    localStorage.setItem('selectedRegion', region);
    eventCalled(region);
    window.location.reload();
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Select a Region</h2>

      <select
        value={selectedRegion}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">-- Select Region --</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      {selectedRegion && (
        <div className="mt-4 text-green-600 font-medium">Selected Region: {selectedRegion}</div>
      )}
    </div>
  );
}
