const apiKey = '5442d5f5030f4596aa5c7356da6708fe';
const apiUrl = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&apiKey=${apiKey}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {

    // You can now display this in your frontend
  })
  .catch(error => {
    console.error('Error fetching diet plan:', error);
  });
