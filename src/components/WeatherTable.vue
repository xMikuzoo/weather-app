<script lang="ts" setup>
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Weather } from "@/models";
import type { PropType } from "vue";

defineProps({
  weatherData: {
    type: Object as PropType<Weather>,
    required: true,
  },
});
</script>
<template>
  <Card>
    <CardContent class="overflow-y-auto max-h-[50dvh]">
      <Table class="relative">
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Godzina</TableHead>
            <TableHead>Temperatura</TableHead>
            <TableHead>Prędkość wiatru</TableHead>
            <TableHead>Warunki</TableHead>
            <TableHead>Ciśnienie</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-for="(day, index) in weatherData.days" :key="index">
            <TableRow v-for="(hour, index) in day.hours" :key="index">
              <TableCell>{{ day.datetime }}</TableCell>
              <TableCell>
                {{ hour.datetime }}
              </TableCell>
              <TableCell>{{ hour.temp }} °C</TableCell>
              <TableCell>{{ hour.windspeed }} </TableCell>
              <TableCell>{{ hour.conditions }} </TableCell>
              <TableCell>{{ hour.pressure }} </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>
