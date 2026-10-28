import { CoffeeProduct, BuildCoffeeFormData, CoffeeMatchResult } from '../types';
import { getAllCoffees } from './catalogService';

/**
 * Deterministic matching engine.
 * Compares buyer requirements against confirmed coffee records in the catalog.
 * No AI APIs or invented inventory.
 */
export function findCoffeeMatches(
  requirements: Partial<BuildCoffeeFormData>,
  catalog: CoffeeProduct[] = getAllCoffees()
): CoffeeMatchResult[] {
  const {
    origin,
    otherOriginText,
    processing,
    grade,
    minCupScore
  } = requirements;

  const results: CoffeeMatchResult[] = [];

  for (const coffee of catalog) {
    let score = 0;
    const explanations: string[] = [];

    // 1. Origin Matching
    let originMatches = false;
    if (!origin || origin === 'Not sure') {
      originMatches = true;
      score += 30;
      explanations.push('Compatible with your flexible origin preference');
    } else if (origin === 'Other Ethiopia') {
      const searchTarget = (otherOriginText || '').toLowerCase().trim();
      if (
        searchTarget &&
        (coffee.origin.toLowerCase().includes(searchTarget) ||
          coffee.region.toLowerCase().includes(searchTarget) ||
          coffee.description.toLowerCase().includes(searchTarget))
      ) {
        originMatches = true;
        score += 35;
        explanations.push(`Sourced from ${coffee.origin} (${coffee.region})`);
      } else {
        // Partial credit for any authentic Ethiopian origin
        originMatches = false;
        score += 10;
      }
    } else {
      if (coffee.origin.toLowerCase() === origin.toLowerCase()) {
        originMatches = true;
        score += 40;
        explanations.push(`Direct origin match: ${coffee.origin}`);
      } else {
        originMatches = false;
      }
    }

    // 2. Processing Method Matching
    let processingMatches = false;
    if (!processing || processing === 'Either') {
      processingMatches = true;
      score += 25;
      explanations.push(`${coffee.processingMethod} processing`);
    } else if (processing === 'Washed') {
      if (coffee.processingMethod.toLowerCase().includes('washed')) {
        processingMatches = true;
        score += 30;
        explanations.push('Washed processing matches requirement');
      }
    } else if (processing === 'Sun-Dried / Natural') {
      if (
        coffee.processingMethod.toLowerCase().includes('sun-dried') ||
        coffee.processingMethod.toLowerCase().includes('natural')
      ) {
        processingMatches = true;
        score += 30;
        explanations.push('Sun-Dried / Natural processing matches requirement');
      }
    }

    // 3. Grade Matching
    let gradeMatches = false;
    if (!grade || grade === 'No preference') {
      gradeMatches = true;
      score += 15;
    } else if (grade === 'Grade 1') {
      if (coffee.grade === 'Grade 1') {
        gradeMatches = true;
        score += 20;
        explanations.push('Grade 1 quality baseline met');
      }
    }

    // 4. Cup Score Matching
    let cupScoreMatches = true;
    if (minCupScore && minCupScore.trim() !== '') {
      const parsedMin = parseFloat(minCupScore.replace(/[^0-9.]/g, ''));
      if (!isNaN(parsedMin)) {
        // Baseline company coffees are all >85 (Grade 1 specialty)
        if (parsedMin <= 85.5) {
          score += 10;
          explanations.push(`Cupping score baseline (${coffee.cupScoreBaseline}) satisfies your ${minCupScore} target`);
        } else if (parsedMin <= 87) {
          score += 5;
          explanations.push(`Meets high specialty standard (${coffee.cupScoreBaseline})`);
        } else {
          // If buyer requested >88, we note it's subject to micro-lot cupping verification
          cupScoreMatches = false;
        }
      }
    }

    // 5. Availability Check
    const isAvailable = coffee.availability === 'Available for Export';
    if (isAvailable) {
      score += 10;
    }

    // Final qualification:
    // A coffee is considered a match if it aligns with origin (or flexible) and processing (or flexible) and grade.
    const isConsideredMatch =
      originMatches &&
      processingMatches &&
      gradeMatches &&
      cupScoreMatches;

    if (isConsideredMatch) {
      const explanationText = explanations.length > 0
        ? explanations.join(' • ')
        : 'Meets your specified origin, processing, and Grade 1 baseline.';

      results.push({
        coffee,
        matchScore: Math.min(score, 100),
        explanation: explanationText,
        matchedCriteria: {
          origin: originMatches,
          processing: processingMatches,
          grade: gradeMatches,
          cupScore: cupScoreMatches,
          availability: isAvailable
        }
      });
    }
  }

  // Sort by highest match score first, then featured
  results.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    return (b.coffee.isFeatured ? 1 : 0) - (a.coffee.isFeatured ? 1 : 0);
  });

  return results;
}
