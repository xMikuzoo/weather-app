<script lang="ts" setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Weather, Coordinates } from "@/models";
import { onMounted, ref } from "vue";
import WeatherTable from "./WeatherTable.vue";
import TableSkeleton from "./TableSkeleton.vue";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebounceFn } from "@vueuse/core";
import Button from "./ui/button/Button.vue";
import { RefreshCw } from "lucide-vue-next";
const weather = ref<Weather>();
const currentCoordinates = ref<Coordinates>();
const lastCity = ref<string>("");
const isLoading = ref(false);
const currentDate = new Date();
const oneDayBefore = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];
const oneDayAfter = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];

async function fetchWeatherByCity(city: string) {
  isLoading.value = true;
  lastCity.value = city;
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lastCity}/${oneDayBefore}/${oneDayAfter}?unitGroup=metric&lang=pl&key=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    weather.value = await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
  isLoading.value = false;
}

async function fetchWeatherByCoordinates(coordinates: Coordinates) {
  isLoading.value = true;
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${
        coordinates.latitude
      },${
        coordinates.longitude
      }/${oneDayBefore}/${oneDayAfter}?unitGroup=metric&lang=pl&key=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    weather.value = await response.json();
    console.log(weather.value);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
  isLoading.value = false;
}

async function setCurrentLocation() {
  return new Promise<void>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentCoordinates.value = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        resolve();
      },
      (error) => {
        console.error("Error getting location:", error);
        reject(error);
      }
    );
  });
}

const debouncedFetchWeatherByCiity = useDebounceFn((city: string) => {
  if (city.trim() === "") {
    weather.value = undefined;
    return;
  }
  fetchWeatherByCity(city);
}, 500);

onMounted(async () => {
  await setCurrentLocation();

  if (!currentCoordinates.value) {
    return;
  }
  await fetchWeatherByCoordinates(currentCoordinates.value);
});
</script>
<template>
  <Card>
    <CardHeader>
      <CardTitle> Pogoda </CardTitle>
      <CardDescription>
        Sprawdź aktualną pogodę w swojej lokalizacji lub wprowadź miasto.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p v-if="!currentCoordinates">
        Pobieranie lokalizacji... Proszę poczekać.
      </p>
      <div class="space-y-4">
        <div class="space-y-2 w-fit min-w-[200px]">
          <Label for="location">Wprowadź lokalizację</Label>
          <div class="flex gap-2 items-center">
            <Input
              @input="debouncedFetchWeatherByCiity($event.target.value)"
              id="location"
              :placeholder="`${currentCoordinates?.latitude}, ${currentCoordinates?.longitude}`"
            />
            <Button
              size="sm"
              @click="fetchWeatherByCity(lastCity)"
              :disabled="isLoading"
            >
              <RefreshCw
                class="size-4"
                :class="{ 'animate-spin': isLoading }"
              />
              Odśwież
            </Button>
          </div>
        </div>

        <TableSkeleton v-if="isLoading" />
        <WeatherTable v-else-if="weather" :weatherData="weather" />
      </div>
    </CardContent>
  </Card>
</template>
