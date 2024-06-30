const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { calculateCalories, calculateProtein } = require('./calculator');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/calculate', (req, res) => {
    console.log('Request body:', req.body);

    const { gender, units, goal, heightMetric, heightFeet, heightInches, weightImperial, weightMetric, age, activityLevel } = req.body;

    let heightObject, weight;
    if (units === 'A') { // Imperial
        heightObject = {
            feet: parseFloat(heightFeet),
            inches: parseFloat(heightInches)
        };
        weight = parseFloat(weightImperial);
    } else { // Metric
        heightObject = parseFloat(heightMetric);
        weight = parseFloat(weightMetric);
    }

    const calories = calculateCalories(gender, units, goal, heightObject, weight, parseInt(age), activityLevel);
    const { proteinMin, proteinMax } = calculateProtein(weight, units);

    res.json({
        calories: calories,
        protein_min: proteinMin,
        protein_max: proteinMax
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
