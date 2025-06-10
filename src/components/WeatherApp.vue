<script lang="ts" setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Weather } from "@/models";
import { onMounted, ref } from "vue";

const weather = ref<Weather>();
const location = ref<GeolocationPosition | null>(null);

async function fetchWeather(city: string) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  weather.value = await response.json();
}

async function tryFetchWeather(city: string) {
  try {
    await fetchWeather(city);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function setCurrentLocation() {}
onMounted(async () => {
  setCurrentLocation();
  await tryFetchWeather("Tarnow");
});
</script>
<template>
  <Card
    >{{ weather?.address }}
    <CardHeader>
      <CardTitle>Weather App</CardTitle>
      <CardDescription> Get the current weather for any city </CardDescription>
    </CardHeader>
    <CardContent>
      <p>Weather data will be displayed here.</p>
    </CardContent>
    <CardFooter>sdasdfas </CardFooter>
  </Card>
</template>
