function calculateCalories(sex, units, method, height, weight, age, activityLevel) {
    let caloriesNeeded = 1;
    const activityFactors = { A: 1.15, B: 1.3, C: 1.4, D: 1.6, E: 1.75 };
    activityLevel = activityFactors[activityLevel];

    if (sex === 'A') { // Male
        if (units === 'A') { // Imperial
            height = (height.feet * 12) + height.inches; // Convert to inches
            caloriesNeeded = 9.99 * weight + 6.25 * height - 4.92 * age + 5;
        } else if (units === 'B') { // Metric
            caloriesNeeded = 9.99 * weight + 6.25 * height - 4.92 * age + 5;
        }
    } else if (sex === 'B') { // Female
        if (units === 'A') { // Imperial
            height = (height.feet * 12) + height.inches; // Convert to inches
            caloriesNeeded = 9.99 * weight + 6.25 * height - 4.92 * age - 161;
        } else if (units === 'B') { // Metric
            caloriesNeeded = 9.99 * weight + 6.25 * height - 4.92 * age - 161;
        }
    }

    caloriesNeeded *= activityLevel;

    if (method === 'A') { // Cut
        caloriesNeeded -= 500;
    } else if (method === 'B') { // Bulk
        caloriesNeeded += 250;
    }

    return Math.round(caloriesNeeded);
}

function calculateProtein(weight, units) {
    const factor = units === 'A' ? 1 : 2.2;
    const proteinMin = Math.round(weight * 0.85 * factor);
    const proteinMax = Math.round(weight * 1.0 * factor);
    return { proteinMin, proteinMax };
}

module.exports = { calculateCalories, calculateProtein };
