import { GeneAssembly } from '../types';

export const mockGeneAssemblies: GeneAssembly[] = [
  {
    id: '1',
    name: 'Enhanced Drought Assembly v1',
    components: ['DREB1A', 'HSF3', 'ABA1'],
    predictedPerformance: {
      stressTolerance: 0.85,
      growthRate: 0.92,
      yield: 0.88,
    },
    validationStatus: 'validated',
    createdAt: '2025-02-28T10:00:00Z',
    updatedAt: '2025-02-28T14:30:00Z',
  },
  {
    id: '2',
    name: 'Salt Resistance Assembly v2',
    components: ['SOS1', 'NHX1', 'HKT1'],
    predictedPerformance: {
      stressTolerance: 0.78,
      growthRate: 0.85,
      yield: 0.82,
    },
    validationStatus: 'in_progress',
    createdAt: '2025-02-28T11:00:00Z',
    updatedAt: '2025-02-28T15:30:00Z',
  },
];

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
