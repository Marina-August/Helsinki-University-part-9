import  express  from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
const app_= express();
app_.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req, res): void => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
  
    if (isNaN(height) || isNaN(weight)) {
      res.status(400).json({ error: "malformatted parameters" });
      return;
    }
  
    const bmi = calculateBmi(height, weight);
  
    res.json({
      weight,
      height,
      bmi,
    });
  });

  app_.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
  
    if (!daily_exercises || !target) {
      return res.status(400).json({ error: "parameters missing" });
    }
  
    if (!Array.isArray(daily_exercises) || !daily_exercises.every((value) => typeof value === "number") || typeof target !== "number") {
      return res.status(400).json({ error: "malformatted parameters" });
    }
     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(target, daily_exercises);
  
    res.json(result);
    return;
  });

const PORT = 3003;
const PORT_ = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app_.listen(PORT_, () => {
    console.log(`Server running on port ${PORT_}`);
});